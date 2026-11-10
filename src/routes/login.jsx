import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/login")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "Admin sign in — Pusapati Group" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
});
