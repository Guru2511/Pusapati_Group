import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/_site/quality")({
  beforeLoad: () => {
    throw redirect({ to: "/products" });
  },
});
