import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { del, head } from "@vercel/blob";
import { verifyAdminIdToken } from "@/lib/admin-auth.server";
import { fetchPublishedSiteContent } from "@/lib/public-site-content.server";
import { neon } from "@neondatabase/serverless";
import { getSecret } from "@/lib/secrets.server";

const idTokenSchema = z.object({ idToken: z.string().min(1).max(8192) });
const contentSchema = z.object({
  idToken: z.string().min(1).max(8192),
  id: z.string().trim().min(1).max(200),
  category: z.enum(["home", "companies", "products", "quality", "projects", "news", "investor-info", "settings"]),
  title: z.string().trim().min(1).max(200),
  path: z.string().trim().max(400),
  fields: z.record(z.string(), z.string().max(20000)).refine((fields) => Object.keys(fields).length <= 80),
  status: z.enum(["draft", "published", "deleted"]),
  previousId: z.string().trim().min(1).max(200).optional(),
});
const submissionSchema = z.object({
  idToken: z.string().min(1).max(8192),
  id: z.string().regex(/^(enquiry|contact|vendor|career|investor):\d{1,19}$/),
  status: z.string().trim().min(1).max(40).optional(),
  assignedTo: z.string().trim().max(160).optional(),
  payload: z.record(z.string(), z.unknown()).optional()
    .refine((payload) => !payload || (Object.keys(payload).length <= 50 && JSON.stringify(payload).length <= 30000)),
  notes: z.array(z.object({
    text: z.string().trim().min(1).max(2000),
    at: z.string().datetime(),
  })).max(100).optional(),
});
const deleteSubmissionSchema = z.object({
  idToken: z.string().min(1).max(8192),
  id: z.string().regex(/^(enquiry|contact|vendor|career|investor):\d{1,19}$/),
});
const createDocumentSchema = z.object({
  idToken: z.string().min(1).max(8192),
  pathname: z.string().regex(/^admin-documents\/[a-f0-9-]{36}\.(pdf|doc|docx|xls|xlsx|csv)$/),
  title: z.string().trim().min(1).max(200),
  category: z.string().trim().min(1).max(80),
  filename: z.string().trim().min(1).max(255).refine((value) => !/[\r\n]/.test(value)),
});
const deleteDocumentSchema = z.object({
  idToken: z.string().min(1).max(8192),
  id: z.string().regex(/^[a-f0-9-]{36}$/),
});
const dailyReportSchema = z.object({
  idToken: z.string().min(1).max(8192),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).refine((value) => {
    const parsed = new Date(`${value}T00:00:00.000Z`);
    return !Number.isNaN(parsed.getTime()) && parsed.toISOString().slice(0, 10) === value;
  }, "Choose a valid report date."),
});

const adminDocumentTypes = new Set([
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/vnd.ms-excel",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  "text/csv",
]);

async function getSql() {
  const connectionString = await getSecret("DATABASE_URL");
  if (typeof connectionString !== "string" || !connectionString.trim()) {
    throw new Error("Missing required DATABASE_URL secret for the admin dashboard.");
  }
  return neon(connectionString);
}

async function getAdminReportRecords(date) {
  const sql = await getSql();
  const start = date ? new Date(`${date}T00:00:00.000+05:30`) : null;
  const end = start ? new Date(start.getTime() + 24 * 60 * 60 * 1000) : null;
  const startAt = start?.toISOString() ?? null;
  const endAt = end?.toISOString() ?? null;
  const records = await sql`
    SELECT type, id, name, status, "createdAt"
    FROM (
      SELECT 'enquiry'::text AS type, id::text AS id, name, status,
        created_at AS "createdAt"
      FROM quote_enquiries
      WHERE status <> 'deleted'
      UNION ALL
      SELECT 'contact'::text, id::text, name, status, created_at
      FROM contact_messages
      WHERE status <> 'deleted'
      UNION ALL
      SELECT 'vendor'::text, id::text, contact_name, status, created_at
      FROM vendor_applications
      WHERE status <> 'deleted'
      UNION ALL
      SELECT 'career'::text, id::text, full_name, status, created_at
      FROM career_applications
      WHERE status <> 'deleted'
      UNION ALL
      SELECT 'investor'::text, id::text, full_name, status, created_at
      FROM investor_requests
      WHERE status <> 'deleted'
    ) AS submissions
    WHERE (${startAt}::timestamptz IS NULL OR "createdAt" >= ${startAt}::timestamptz)
      AND (${endAt}::timestamptz IS NULL OR "createdAt" < ${endAt}::timestamptz)
    ORDER BY "createdAt" ASC
    LIMIT 5001
  `;
  if (records.length > 5000) {
    throw new Error("This report contains more than 5,000 submissions. Please narrow the date range.");
  }
  return records;
}

function mapSubmission(row, type) {
  return {
    ...row,
    id: `${type}:${row.recordId}`,
    type,
    name: row.name || row.contact_name || row.full_name || row.company_name || "",
    company: row.company || row.organisation || row.company_name || "",
    summary: row.requirement || row.description || row.cover_note || row.message || "",
  };
}

export const verifyAdminSession = createServerFn({ method: "POST" })
  .validator(idTokenSchema)
  .handler(async ({ data }) => verifyAdminIdToken(data.idToken));

export const getAdminDashboardData = createServerFn({ method: "POST" })
  .validator(idTokenSchema)
  .handler(async ({ data }) => {
    await verifyAdminIdToken(data.idToken);
    const sql = await getSql();
    const [content, enquiries, contacts, vendors, careers, investors, documents] = await Promise.all([
      sql`
        SELECT content_id AS id, category, title, path, fields, status,
          published_fields AS "publishedFields",
          updated_at AS "updatedAt", published_at AS "publishedAt"
        FROM admin_site_content
        ORDER BY updated_at DESC
      `,
      sql`
        SELECT e.id AS "recordId", e.name, e.phone, e.email, e.company, e.category,
          e.location, e.interest, e.quantity, e.timeline, e.pour_date, e.pour_time,
          e.pump_required, e.incoterms, e.requirement, e.source_page,
          e.status, e.assigned_to AS "assignedTo", e.notes, e.created_at AS "createdAt",
          COALESCE((
            SELECT jsonb_agg(jsonb_build_object(
              'category', i.category, 'location', i.location, 'interest', i.interest,
              'quantity', i.quantity, 'timeline', i.timeline, 'pour_date', i.pour_date,
              'pour_time', i.pour_time, 'pump_required', i.pump_required,
              'incoterms', i.incoterms, 'requirement', i.requirement
            ) ORDER BY i.item_order)
            FROM quote_enquiry_items AS i WHERE i.enquiry_id = e.id
          ), '[]'::jsonb) AS requirement_items
        FROM quote_enquiries AS e
        WHERE e.status <> 'deleted'
        ORDER BY e.created_at DESC
        LIMIT 500
      `,
      sql`
        SELECT id AS "recordId", name, phone, email, company, requirement, source_page,
          status, assigned_to AS "assignedTo", notes, created_at AS "createdAt"
        FROM contact_messages
        WHERE status <> 'deleted'
        ORDER BY created_at DESC
        LIMIT 500
      `,
      sql`
        SELECT id AS "recordId", company_name, contact_name, phone, email, category,
          city, gstin, website, years_in_business, description, status,
          assigned_to AS "assignedTo", notes, created_at AS "createdAt"
        FROM vendor_applications
        WHERE status <> 'deleted'
        ORDER BY created_at DESC
        LIMIT 500
      `,
      sql`
        SELECT id AS "recordId", full_name, phone, email, role, department, experience,
          portfolio_url, cover_note, is_internship, cv_pathname AS "cvPathname",
          cv_filename AS "cvFilename", cv_content_type AS "cvContentType",
          cv_size AS "cvSize", status, assigned_to AS "assignedTo",
          notes, created_at AS "createdAt"
        FROM career_applications
        WHERE status <> 'deleted'
        ORDER BY created_at DESC
        LIMIT 500
      `,
      sql`
        SELECT id AS "recordId", full_name, email, phone, organisation, investor_type,
          areas_of_interest, message, status, assigned_to AS "assignedTo", notes,
          created_at AS "createdAt"
        FROM investor_requests
        WHERE status <> 'deleted'
        ORDER BY created_at DESC
        LIMIT 500
      `,
      sql`
        SELECT document_id AS id, title, category, filename,
          content_type AS "contentType", file_size AS "fileSize",
          uploaded_by AS "uploadedBy", uploaded_at AS "uploadedAt"
        FROM admin_documents
        ORDER BY uploaded_at DESC
        LIMIT 1000
      `,
    ]);
    const submissions = [
      ...enquiries.map((row) => mapSubmission(row, "enquiry")),
      ...contacts.map((row) => mapSubmission(row, "contact")),
      ...vendors.map((row) => mapSubmission(row, "vendor")),
      ...careers.map((row) => mapSubmission(row, "career")),
      ...investors.map((row) => mapSubmission(row, "investor")),
    ].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).slice(0, 500);
    return { content, submissions, documents };
  });

export const createAdminDocument = createServerFn({ method: "POST" })
  .validator(createDocumentSchema)
  .handler(async ({ data }) => {
    const admin = await verifyAdminIdToken(data.idToken);
    const blob = await head(data.pathname);
    if (
      blob.pathname !== data.pathname
      || !adminDocumentTypes.has(blob.contentType)
      || blob.size < 1
      || blob.size > 20 * 1024 * 1024
    ) {
      throw new Error("The uploaded file does not meet the document centre requirements.");
    }

    const sql = await getSql();
    const [document] = await sql`
      INSERT INTO admin_documents (
        document_id, pathname, title, category, filename, content_type,
        file_size, uploaded_by
      ) VALUES (
        ${data.pathname.slice("admin-documents/".length).replace(/\.[^.]+$/, "")},
        ${data.pathname}, ${data.title}, ${data.category},
        ${data.filename}, ${blob.contentType}, ${blob.size},
        ${admin.email}
      )
      RETURNING document_id AS id, title, category, filename,
        content_type AS "contentType", file_size AS "fileSize",
        uploaded_by AS "uploadedBy", uploaded_at AS "uploadedAt"
    `;
    return { document };
  });

export const deleteAdminDocument = createServerFn({ method: "POST" })
  .validator(deleteDocumentSchema)
  .handler(async ({ data }) => {
    await verifyAdminIdToken(data.idToken);
    const sql = await getSql();
    const [record] = await sql`
      SELECT pathname
      FROM admin_documents
      WHERE document_id = ${data.id}
    `;
    if (!record) throw new Error("The requested document was not found.");
    if (!/^admin-documents\/[a-f0-9-]{36}\.(pdf|doc|docx|xls|xlsx|csv)$/.test(record.pathname)) {
      throw new Error("The document record has an invalid storage path.");
    }

    await del(record.pathname);
    const [deleted] = await sql`
      DELETE FROM admin_documents
      WHERE document_id = ${data.id}
      RETURNING document_id
    `;
    if (!deleted) throw new Error("The document record was not found after its file was removed.");
    return { ok: true };
  });

export const getDailyAdminReport = createServerFn({ method: "POST" })
  .validator(dailyReportSchema)
  .handler(async ({ data }) => {
    await verifyAdminIdToken(data.idToken);
    const records = await getAdminReportRecords(data.date);
    return { date: data.date, records };
  });

export const getOverallAdminReport = createServerFn({ method: "POST" })
  .validator(idTokenSchema)
  .handler(async ({ data }) => {
    await verifyAdminIdToken(data.idToken);
    const records = await getAdminReportRecords();
    return { generatedAt: new Date().toISOString(), records };
  });

export const deleteAdminSubmission = createServerFn({ method: "POST" })
  .validator(deleteSubmissionSchema)
  .handler(async ({ data }) => {
    await verifyAdminIdToken(data.idToken);
    const sql = await getSql();
    const [type, id] = data.id.split(":");
    let deleted;

    if (type === "enquiry") {
      [deleted] = await sql`
        UPDATE quote_enquiries SET status = 'deleted'
        WHERE id = ${id}::bigint AND status <> 'deleted'
        RETURNING id
      `;
    } else if (type === "contact") {
      [deleted] = await sql`
        UPDATE contact_messages SET status = 'deleted'
        WHERE id = ${id}::bigint AND status <> 'deleted'
        RETURNING id
      `;
    } else if (type === "vendor") {
      [deleted] = await sql`
        UPDATE vendor_applications SET status = 'deleted'
        WHERE id = ${id}::bigint AND status <> 'deleted'
        RETURNING id
      `;
    } else if (type === "career") {
      [deleted] = await sql`
        UPDATE career_applications SET status = 'deleted'
        WHERE id = ${id}::bigint AND status <> 'deleted'
        RETURNING id
      `;
    } else if (type === "investor") {
      [deleted] = await sql`
        UPDATE investor_requests SET status = 'deleted'
        WHERE id = ${id}::bigint AND status <> 'deleted'
        RETURNING id
      `;
    }

    if (!deleted) throw new Error("The requested submission was not found.");
    return { ok: true };
  });

export const getPublishedSiteContent = createServerFn({ method: "GET" }).handler(fetchPublishedSiteContent);

export const saveAdminContent = createServerFn({ method: "POST" })
  .validator(contentSchema)
  .handler(async ({ data }) => {
    const admin = await verifyAdminIdToken(data.idToken);
    const sql = await getSql();
    await sql`
      WITH saved AS (
      INSERT INTO admin_site_content (
        content_id, category, title, path, fields, status, published_fields, updated_by, published_at
      )
      VALUES (
        ${data.id}, ${data.category}, ${data.title}, ${data.path},
        ${JSON.stringify(data.fields)}::jsonb, ${data.status},
        CASE WHEN ${data.status} = 'published' THEN ${JSON.stringify(data.fields)}::jsonb ELSE NULL END,
        ${admin.email},
        CASE WHEN ${data.status} = 'published' THEN now() ELSE NULL END
      )
      ON CONFLICT (content_id) DO UPDATE SET
        category = EXCLUDED.category,
        title = EXCLUDED.title,
        path = EXCLUDED.path,
        fields = EXCLUDED.fields,
        status = CASE
          WHEN EXCLUDED.status = 'draft' AND admin_site_content.status = 'published' THEN 'published'
          ELSE EXCLUDED.status
        END,
        published_fields = CASE
          WHEN EXCLUDED.status = 'published' THEN EXCLUDED.fields
          ELSE admin_site_content.published_fields
        END,
        updated_by = EXCLUDED.updated_by,
        updated_at = now(),
        published_at = CASE
          WHEN EXCLUDED.status = 'published' THEN COALESCE(admin_site_content.published_at, now())
          WHEN EXCLUDED.status = 'draft' AND admin_site_content.status = 'published' THEN admin_site_content.published_at
          ELSE NULL
        END
      RETURNING content_id
      )
      UPDATE admin_site_content
      SET status = 'deleted', updated_by = ${admin.email}, updated_at = now()
      WHERE content_id = ${data.previousId ?? null}
        AND ${data.previousId ?? null} IS NOT NULL
        AND content_id <> ${data.id}
    `;
    return { ok: true };
  });

export const updateAdminSubmission = createServerFn({ method: "POST" })
  .validator(submissionSchema)
  .handler(async ({ data }) => {
    await verifyAdminIdToken(data.idToken);
    const sql = await getSql();
    const [type, id] = data.id.split(":");
    const textField = (key) => {
      const value = data.payload?.[key];
      if (value === undefined) return null;
      if (typeof value !== "string" || value.length > 20000) {
        throw new Error(`Invalid submission field: ${key}`);
      }
      return value;
    };
    const status = data.status ?? null;
    const assignedTo = data.assignedTo ?? null;
    const notes = data.notes ? JSON.stringify(data.notes) : null;
    let updated;

    if (type === "enquiry") {
      const payload = data.payload ?? {};
      const hasItems = Object.hasOwn(payload, "requirement_items");
      const items = payload.requirement_items;
      if (hasItems && (!Array.isArray(items) || items.length > 20)) {
        throw new Error("Invalid quote requirement items.");
      }
      if (hasItems) {
        for (const item of items) {
          if (!item || typeof item !== "object" || Array.isArray(item)) {
            throw new Error("Invalid quote requirement item.");
          }
          for (const key of ["category", "location", "interest", "quantity", "timeline", "pour_date", "pour_time", "pump_required", "incoterms", "requirement"]) {
            if (item[key] !== undefined && (typeof item[key] !== "string" || item[key].length > 3000)) {
              throw new Error(`Invalid quote requirement item field: ${key}`);
            }
          }
        }
      }

      const queries = [
        sql`
          UPDATE quote_enquiries SET
            name = COALESCE(${textField("name")}, name),
            phone = COALESCE(${textField("phone")}, phone),
            email = COALESCE(${textField("email")}, email),
            company = COALESCE(${textField("company")}, company),
            category = COALESCE(${textField("category")}, category),
            location = COALESCE(${textField("location")}, location),
            interest = COALESCE(${textField("interest")}, interest),
            quantity = COALESCE(${textField("quantity")}, quantity),
            timeline = COALESCE(${textField("timeline")}, timeline),
            pour_date = COALESCE(${textField("pour_date")}, pour_date),
            pour_time = COALESCE(${textField("pour_time")}, pour_time),
            pump_required = COALESCE(${textField("pump_required")}, pump_required),
            incoterms = COALESCE(${textField("incoterms")}, incoterms),
            requirement = COALESCE(${textField("requirement")}, requirement),
            source_page = COALESCE(${textField("source_page")}, source_page),
            status = COALESCE(${status}, status),
            assigned_to = COALESCE(${assignedTo}, assigned_to),
            notes = COALESCE(${notes}::jsonb, notes)
          WHERE id = ${id}::bigint
          RETURNING id
        `,
      ];
      if (hasItems) {
        queries.push(sql`DELETE FROM quote_enquiry_items WHERE enquiry_id = ${id}::bigint`);
        queries.push(sql`
          INSERT INTO quote_enquiry_items (
            enquiry_id, item_order, category, location, interest, quantity, timeline,
            pour_date, pour_time, pump_required, incoterms, requirement
          )
          SELECT ${id}::bigint, item.ordinality::integer, item.value->>'category',
            item.value->>'location', item.value->>'interest', item.value->>'quantity',
            item.value->>'timeline', item.value->>'pour_date', item.value->>'pour_time',
            item.value->>'pump_required', item.value->>'incoterms', item.value->>'requirement'
          FROM jsonb_array_elements(${JSON.stringify(items)}::jsonb)
            WITH ORDINALITY AS item(value, ordinality)
        `);
      }
      const results = await sql.transaction(queries);
      [updated] = results[0];
    } else if (type === "contact") {
      [updated] = await sql`
        UPDATE contact_messages SET
          name = COALESCE(${textField("name")}, name),
          phone = COALESCE(${textField("phone")}, phone),
          email = COALESCE(${textField("email")}, email),
          company = COALESCE(${textField("company")}, company),
          requirement = COALESCE(${textField("requirement")}, requirement),
          source_page = COALESCE(${textField("source_page")}, source_page),
          status = COALESCE(${status}, status),
          assigned_to = COALESCE(${assignedTo}, assigned_to),
          notes = COALESCE(${notes}::jsonb, notes)
        WHERE id = ${id}::bigint
        RETURNING id
      `;
    } else if (type === "vendor") {
      [updated] = await sql`
        UPDATE vendor_applications SET
          company_name = COALESCE(${textField("company_name")}, company_name),
          contact_name = COALESCE(${textField("contact_name")}, contact_name),
          phone = COALESCE(${textField("phone")}, phone),
          email = COALESCE(${textField("email")}, email),
          category = COALESCE(${textField("category")}, category),
          city = COALESCE(${textField("city")}, city),
          gstin = COALESCE(${textField("gstin")}, gstin),
          website = COALESCE(${textField("website")}, website),
          years_in_business = COALESCE(${textField("years_in_business")}, years_in_business),
          description = COALESCE(${textField("description")}, description),
          status = COALESCE(${status}, status),
          assigned_to = COALESCE(${assignedTo}, assigned_to),
          notes = COALESCE(${notes}::jsonb, notes)
        WHERE id = ${id}::bigint
        RETURNING id
      `;
    } else if (type === "career") {
      const internship = data.payload?.is_internship;
      if (internship !== undefined && typeof internship !== "boolean") {
        throw new Error("Invalid internship flag.");
      }
      [updated] = await sql`
        UPDATE career_applications SET
          full_name = COALESCE(${textField("full_name")}, full_name),
          phone = COALESCE(${textField("phone")}, phone),
          email = COALESCE(${textField("email")}, email),
          role = COALESCE(${textField("role")}, role),
          department = COALESCE(${textField("department")}, department),
          experience = COALESCE(${textField("experience")}, experience),
          portfolio_url = COALESCE(${textField("portfolio_url")}, portfolio_url),
          cover_note = COALESCE(${textField("cover_note")}, cover_note),
          is_internship = COALESCE(${internship ?? null}, is_internship),
          status = COALESCE(${status}, status),
          assigned_to = COALESCE(${assignedTo}, assigned_to),
          notes = COALESCE(${notes}::jsonb, notes)
        WHERE id = ${id}::bigint
        RETURNING id
      `;
    } else {
      [updated] = await sql`
        UPDATE investor_requests SET
          full_name = COALESCE(${textField("full_name")}, full_name),
          email = COALESCE(${textField("email")}, email),
          phone = COALESCE(${textField("phone")}, phone),
          organisation = COALESCE(${textField("organisation")}, organisation),
          investor_type = COALESCE(${textField("investor_type")}, investor_type),
          areas_of_interest = COALESCE(${textField("areas_of_interest")}, areas_of_interest),
          message = COALESCE(${textField("message")}, message),
          status = COALESCE(${status}, status),
          assigned_to = COALESCE(${assignedTo}, assigned_to),
          notes = COALESCE(${notes}::jsonb, notes)
        WHERE id = ${id}::bigint
        RETURNING id
      `;
    }
    if (!updated) throw new Error("The requested submission was not found.");
    return { ok: true };
  });
