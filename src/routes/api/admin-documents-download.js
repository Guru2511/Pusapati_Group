import { createFileRoute } from "@tanstack/react-router";
import { get } from "@vercel/blob";
import { neon } from "@neondatabase/serverless";
import { verifyAdminIdToken } from "@/lib/admin-auth.server";
import { getSecret } from "@/lib/secrets.server";

export const Route = createFileRoute("/api/admin-documents-download")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const idToken = request.headers.get("authorization")?.match(/^Bearer\s+(.+)$/i)?.[1];
        if (!idToken) {
          return Response.json({ error: "Admin authentication is required." }, { status: 401 });
        }
        await verifyAdminIdToken(idToken);

        const id = new URL(request.url).searchParams.get("id") || "";
        if (!/^[a-f0-9-]{36}$/.test(id)) {
          return Response.json({ error: "Invalid document ID." }, { status: 400 });
        }

        const connectionString = await getSecret("DATABASE_URL");
        if (typeof connectionString !== "string" || !connectionString.trim()) {
          throw new Error("Missing required DATABASE_URL secret for document downloads.");
        }
        const sql = neon(connectionString);
        const [record] = await sql`
          SELECT pathname, filename, content_type AS "contentType"
          FROM admin_documents
          WHERE document_id = ${id}
        `;
        if (!record) {
          return Response.json({ error: "The requested document was not found." }, { status: 404 });
        }
        if (!/^admin-documents\/[a-f0-9-]{36}\.(pdf|doc|docx|xls|xlsx|csv)$/.test(record.pathname)) {
          throw new Error("The document record has an invalid storage path.");
        }

        const blob = await get(record.pathname, { access: "private" });
        if (!blob || blob.statusCode !== 200 || !blob.stream) {
          return Response.json({ error: "The stored document could not be found." }, { status: 404 });
        }

        const safeFilename = record.filename.replace(/[\r\n"]/g, "_");
        return new Response(blob.stream, {
          headers: {
            "Content-Type": record.contentType,
            "Content-Disposition": `attachment; filename="${safeFilename}"; filename*=UTF-8''${encodeURIComponent(record.filename)}`,
            "Cache-Control": "private, no-store",
            "X-Content-Type-Options": "nosniff",
          },
        });
      },
    },
  },
});
