import React from "react";
import { clients } from "@/data/catalogue";

export default function ClientsStrip() {
  const marquee = [...clients, ...clients];

  return (
    <section className="border-y border-ink/10 bg-sand">
      <div className="container-x py-14">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-3">
              <span className="h-1.5 w-1.5 rounded-full bg-orange" aria-hidden="true" />
              <p className="eyebrow">Trusted by</p>
            </div>
            <h2 className="mt-4 max-w-[26ch] font-heading text-[clamp(1.5rem,2.4vw,2rem)] font-semibold leading-tight tracking-tight text-ink">
              Builders, developers and operators across the region.
            </h2>
          </div>
          <p className="max-w-xs text-[11px] leading-relaxed text-slate/70">
            Client marks are published only with written approval. The slots below are reserved for approved
            brand logos.
          </p>
        </div>
      </div>

      <div className="pg-marquee-wrap mask-fade-x relative overflow-hidden border-t border-ink/10">
        <div className="pg-marquee flex w-max gap-3 py-6">
          {marquee.map((c, i) => (
            <div
              key={`${c}-${i}`}
              className="flex h-[86px] w-[220px] shrink-0 flex-col justify-center rounded-2xl border border-ink/10 bg-white/70 px-5 backdrop-blur-sm transition-colors duration-300 hover:border-orange/40 sm:w-[250px]"
            >
              <span className="text-[13px] font-medium text-ink/70">{c}</span>
              <span className="mt-1 font-mono text-[8.5px] uppercase tracking-[0.14em] text-slate/50">
                Logo pending approval
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}