import { createFileRoute } from "@tanstack/react-router";
import { handleUpload } from "@vercel/blob/client";

const CV_CONTENT_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];
const FILE_PATH = /^career-cvs\/[a-f0-9-]{36}\.(pdf|doc|docx)$/;

export const Route = createFileRoute("/api/cv-upload")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const body = await request.json();
        const result = await handleUpload({
          request,
          body,
          onBeforeGenerateToken: async (pathname) => {
            if (!FILE_PATH.test(pathname)) {
              throw new Error("Invalid CV upload path.");
            }
            return {
              allowedContentTypes: CV_CONTENT_TYPES,
              maximumSizeInBytes: 5 * 1024 * 1024,
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
