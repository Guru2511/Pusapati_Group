import { createFileRoute } from "@tanstack/react-router";
import { ArrowUpRight, MessageCircle, ShieldCheck, Sparkles } from "lucide-react";
import IntelligenceChat from "@/components/intelligence/IntelligenceChat";

export const Route = createFileRoute("/_site/intelligence")({
  component: IntelligencePage,
  head: () => ({
    meta: [
      { title: "Pusapati Intelligence — Pusapati Group" },
      { name: "description", content: "Ask Pusapati Intelligence about the Group, its companies, products and enquiry channels." },
    ],
  }),
});

function IntelligencePage() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-ink/10 bg-paper">
        <div className="pointer-events-none absolute inset-0 blueprint-light opacity-40" aria-hidden="true" />
        <div className="container-x relative py-14 sm:py-20 lg:py-24">
          <div className="max-w-[780px]">
            <div className="inline-flex items-center gap-2 rounded-full border border-ink/10 bg-white/70 px-3 py-1.5">
              <Sparkles className="h-3.5 w-3.5 text-orange" aria-hidden="true" />
              <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-slate">Pusapati Intelligence</span>
            </div>
            <h1 className="mt-6 font-heading text-[clamp(2.5rem,6.6vw,5.25rem)] font-semibold leading-[0.94] tracking-[-0.05em] text-ink">
              Answers, with the <span className="text-orange">Group</span> in context.
            </h1>
            <p className="mt-5 max-w-[58ch] text-[15px] leading-[1.75] text-slate sm:text-[17px]">
              Ask about Pusapati Group, its operating companies, products and how to get in touch. The assistant uses public website information and will say when something needs confirmation.
            </p>
            <div className="mt-6 flex flex-wrap gap-4 font-mono text-[9px] uppercase tracking-[0.12em] text-slate">
              <span className="inline-flex items-center gap-1.5"><ShieldCheck className="h-3.5 w-3.5 text-orange" aria-hidden="true" /> Public information only</span>
              <span className="inline-flex items-center gap-1.5"><MessageCircle className="h-3.5 w-3.5 text-orange" aria-hidden="true" /> English · తెలుగు · हिन्दी</span>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-paper py-10 sm:py-14">
        <div className="container-x grid gap-8 lg:grid-cols-[minmax(0,1fr)_300px] lg:gap-10">
          <IntelligenceChat />
          <aside className="space-y-5">
            <div className="rounded-2xl border border-ink/10 bg-white p-5 sm:p-6">
              <p className="eyebrow">What it can help with</p>
              <ul className="mt-4 space-y-3 text-[13px] leading-relaxed text-slate">
                <li>Understand the Group and its business engines</li>
                <li>Explore operating companies and public product information</li>
                <li>Find the right enquiry or contact channel</li>
              </ul>
            </div>
            <div className="rounded-2xl bg-ink p-5 text-paper sm:p-6">
              <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-paper/50">Need a person?</p>
              <h2 className="mt-3 text-[20px] font-semibold leading-tight tracking-tight">We’ll connect you to the right team.</h2>
              <p className="mt-2 text-[12px] leading-relaxed text-paper/65">For quotes, availability or anything that needs confirmation, send the Group desk an enquiry.</p>
              <a href="/contact" className="mt-5 inline-flex items-center gap-2 border-b border-orange pb-1 text-[10px] font-semibold uppercase tracking-[0.13em] text-paper hover:text-orange">
                Contact the group <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
              </a>
            </div>
            <p className="px-1 text-[10px] leading-relaxed text-slate/70">
              AI responses are informational, may be incomplete and do not replace an official quote, approval or company policy.
            </p>
          </aside>
        </div>
      </section>
    </>
  );
}
