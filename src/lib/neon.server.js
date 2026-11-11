import { neon } from "@neondatabase/serverless";
import { getSecret } from "@/lib/secrets.server";

export async function saveIntakeSubmission(type, payload) {
  const connectionString = await getSecret("DATABASE_URL");
  if (typeof connectionString !== "string" || !connectionString.trim()) {
    throw new Error("Missing required DATABASE_URL secret for Neon.");
  }

  const sql = neon(connectionString);

  if (type === "enquiry" && payload.source_page === "/contact") {
    await sql`
      INSERT INTO contact_messages (
        name, phone, email, company, requirement, source_page
      ) VALUES (
        ${payload.name}, ${payload.phone}, ${payload.email}, ${payload.company},
        ${payload.requirement}, ${payload.source_page}
      )
    `;
    return;
  }

  if (type === "enquiry") {
    const items = payload.requirement_items?.length ? payload.requirement_items : [payload];
    await sql`
      WITH inserted AS (
        INSERT INTO quote_enquiries (
          name, phone, email, company, category, location, interest, quantity,
          timeline, pour_date, pour_time, pump_required, incoterms, requirement, source_page
        ) VALUES (
          ${payload.name}, ${payload.phone}, ${payload.email}, ${payload.company},
          ${payload.category}, ${payload.location}, ${payload.interest}, ${payload.quantity},
          ${payload.timeline}, ${payload.pour_date}, ${payload.pour_time}, ${payload.pump_required},
          ${payload.incoterms}, ${payload.requirement}, ${payload.source_page}
        )
        RETURNING id
      )
      INSERT INTO quote_enquiry_items (
        enquiry_id, item_order, category, location, interest, quantity, timeline,
        pour_date, pour_time, pump_required, incoterms, requirement
      )
      SELECT inserted.id, item.ordinality::integer, item.value->>'category',
        item.value->>'location', item.value->>'interest', item.value->>'quantity',
        item.value->>'timeline', item.value->>'pour_date', item.value->>'pour_time',
        item.value->>'pump_required', item.value->>'incoterms', item.value->>'requirement'
      FROM inserted
      CROSS JOIN LATERAL jsonb_array_elements(${JSON.stringify(items)}::jsonb)
        WITH ORDINALITY AS item(value, ordinality)
    `;
    return;
  }

  if (type === "vendor") {
    await sql`
      INSERT INTO vendor_applications (
        company_name, contact_name, phone, email, category, city, gstin,
        website, years_in_business, description
      ) VALUES (
        ${payload.company_name}, ${payload.contact_name}, ${payload.phone}, ${payload.email},
        ${payload.category}, ${payload.city}, ${payload.gstin}, ${payload.website},
        ${payload.years_in_business}, ${payload.description}
      )
    `;
    return;
  }

  if (type === "career") {
    await sql`
      INSERT INTO career_applications (
        full_name, phone, email, role, department, experience, portfolio_url,
        cover_note, is_internship, cv_pathname, cv_filename, cv_content_type, cv_size
      ) VALUES (
        ${payload.full_name}, ${payload.phone}, ${payload.email}, ${payload.role},
        ${payload.department}, ${payload.experience}, ${payload.portfolio_url},
        ${payload.cover_note}, ${payload.is_internship}, ${payload.cv_pathname ?? null},
        ${payload.cv_filename ?? null}, ${payload.cv_content_type ?? null}, ${payload.cv_size ?? null}
      )
    `;
    return;
  }

  if (type === "investor") {
    await sql`
      INSERT INTO investor_requests (
        full_name, email, phone, organisation, investor_type, areas_of_interest, message
      ) VALUES (
        ${payload.full_name}, ${payload.email}, ${payload.phone}, ${payload.organisation},
        ${payload.investor_type}, ${payload.areas_of_interest}, ${payload.message}
      )
    `;
    return;
  }

  throw new Error(`Unsupported intake submission type: ${type}`);
}
