import { neon } from "@neondatabase/serverless";
import { getSecret } from "@/lib/secrets.server";

export async function fetchPublishedSiteContent() {
  const connectionString = await getSecret("DATABASE_URL");
  if (typeof connectionString !== "string" || !connectionString.trim()) return [];

  const sql = neon(connectionString);
  const [table] = await sql`SELECT to_regclass('public.admin_site_content') AS name`;
  if (!table?.name) return [];

  const rows = await sql`
    SELECT content_id AS id, category, COALESCE(published_fields, fields) AS fields, status
    FROM admin_site_content
    WHERE status IN ('published', 'deleted')
  `;
  return rows.map((row) => ({
    id: row.id,
    category: row.category,
    fields: typeof row.fields === "string" ? JSON.parse(row.fields) : row.fields,
    deleted: row.status === "deleted",
  }));
}
