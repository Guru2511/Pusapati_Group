import { createFileRoute } from "@tanstack/react-router";
import { get } from "@vercel/blob";
import { neon } from "@neondatabase/serverless";
import { secrets } from "base44:runtime";
import { verifyAdminIdToken } from "@/lib/admin-auth.server";

export const Route = createFileRoute("/api/cv-download")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const idToken = request.headers.get("authorization")?.match(/^Bearer\s+(.+)$/i)?.[1];
        if (!idToken) {
          return Response.json({ error: "Admin authentication is required." }, { status: 401 });
        }
        await verifyAdminIdToken(idToken);

        const id = new URL(request.url).searchParams.get("id") || "";
        const recordId = /^career:(\d{1,19})$/.exec(id)?.[1];
        if (!recordId) {
          return Response.json({ error: "Invalid career application ID." }, { status: 400 });
        }

        const connectionString = await secrets.get("DATABASE_URL");
        if (typeof connectionString !== "string" || !connectionString.trim()) {
          throw new Error("Missing required DATABASE_URL secret for CV downloads.");
        }
        const sql = neon(connectionString);
        const [record] = await sql`
          SELECT cv_pathname AS pathname, cv_filename AS filename, cv_content_type AS content_type
          FROM career_applications
          WHERE id = ${recordId}::bigint AND status <> 'deleted'
        `;
        if (!record?.pathname || !record.filename || !record.content_type) {
          return Response.json({ error: "No CV is available for this application." }, { status: 404 });
        }
        if (!/^career-cvs\/[a-f0-9-]{36}\.(pdf|doc|docx)$/.test(record.pathname)) {
          throw new Error("The CV record has an invalid storage path.");
        }

        const blob = await get(record.pathname, { access: "private" });
        if (!blob || blob.statusCode !== 200 || !blob.stream) {
          return Response.json({ error: "The stored CV could not be found." }, { status: 404 });
        }

        const safeFilename = record.filename.replace(/[\r\n"]/g, "_");
        return new Response(blob.stream, {
          headers: {
            "Content-Type": record.content_type,
            "Content-Disposition": `attachment; filename="${safeFilename}"; filename*=UTF-8''${encodeURIComponent(record.filename)}`,
            "Cache-Control": "private, no-store",
            "X-Content-Type-Options": "nosniff",
          },
        });
      },
    },
  },
});
