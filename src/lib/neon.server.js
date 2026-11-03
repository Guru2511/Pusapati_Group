import { neon } from "@neondatabase/serverless";
import { secrets } from "base44:runtime";

export async function saveIntakeSubmission(type, payload) {
  const connectionString = await secrets.get("DATABASE_URL");
  if (typeof connectionString !== "string" || !connectionString.trim()) {
    throw new Error("Missing required DATABASE_URL secret for Neon.");
  }

  const sql = neon(connectionString);
  await sql`
    INSERT INTO intake_submissions (submission_type, payload)
    VALUES (${type}, ${JSON.stringify(payload)}::jsonb)
  `;
}
