import { Link, useRouterState } from "@tanstack/react-router";
import { MessageCircle, Sparkles } from "lucide-react";

export default function IntelligenceLauncher() {
  const pathname = useRouterState({ select: (state) => state.location.pathname });

  if (pathname.startsWith("/intelligence")) return null;

  return (
    <Link
      to="/intelligence"
      aria-label="Ask Pusapati Intelligence"
      className="fixed bottom-5 right-5 z-40 inline-flex min-h-14 items-center gap-3 rounded-full border border-ink/10 bg-ink px-5 text-paper shadow-[0_16px_40px_-16px_rgba(16,18,22,0.65)] transition-all hover:-translate-y-0.5 hover:bg-orange hover:text-ink sm:bottom-7 sm:right-7"
    >
      <span className="relative grid h-8 w-8 place-items-center rounded-full bg-paper/10">
        <MessageCircle className="h-4 w-4" aria-hidden="true" />
        <Sparkles className="absolute -right-1 -top-1 h-3 w-3 text-orange" aria-hidden="true" />
      </span>
      <span className="text-left">
        <span className="block text-[11px] font-semibold uppercase tracking-[0.12em]">Ask Intelligence</span>
        <span className="mt-0.5 block text-[10px] text-paper/60">Pusapati Group AI</span>
      </span>
    </Link>
  );
}
