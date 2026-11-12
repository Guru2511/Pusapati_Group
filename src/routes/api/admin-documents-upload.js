import { createFileRoute } from "@tanstack/react-router";
import { handleUpload } from "@vercel/blob/client";
import { verifyAdminIdToken } from "@/lib/admin-auth.server";

const DOCUMENT_CONTENT_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/vnd.ms-excel",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  "text/csv",
];
const FILE_PATH = /^admin-documents\/[a-f0-9-]{36}\.(pdf|doc|docx|xls|xlsx|csv)$/;

export const Route = createFileRoute("/api/admin-documents-upload")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const idToken = request.headers.get("authorization")?.match(/^Bearer\s+(.+)$/i)?.[1];
        if (!idToken) {
          return Response.json({ error: "Admin authentication is required." }, { status: 401 });
        }
        await verifyAdminIdToken(idToken);
        const body = await request.json();
        const result = await handleUpload({
          request,
          body,
          onBeforeGenerateToken: async (pathname) => {
            if (!FILE_PATH.test(pathname)) {
              throw new Error("Invalid document upload path.");
            }
            return {
              allowedContentTypes: DOCUMENT_CONTENT_TYPES,
              maximumSizeInBytes: 20 * 1024 * 1024,
              addRandomSuffix: false,
              validUntil: Date.now() + 15 * 60 * 1000,
            };
          },
        });
        return Response.json(result, { headers: { "cache-control": "no-store" } });
      },
    },
  },
});
