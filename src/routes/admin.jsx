import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/admin")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "Admin Dashboard — Pusapati Group" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
});
