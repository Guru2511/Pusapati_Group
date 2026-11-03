import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/_site/vision")({
  beforeLoad: () => {
    throw redirect({ to: "/vision-2032" });
  },
});
