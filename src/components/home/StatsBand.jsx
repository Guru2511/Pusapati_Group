import React from "react";
import Counter from "@/components/site/Counter";
import Reveal from "@/components/site/Reveal";
import { stats } from "@/data/group";

export default function StatsBand() {
  return (
    <section className="relative overflow-hidden bg-ink text-paper">
      <div
        className="pointer-events-none absolute -left-24 top-0 h-[380px] w-[380px] rounded-full bg-orange/20 blur-[130px]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -right-20 bottom-0 h-[320px] w-[320px] rounded-full bg-blue/20 blur-[130px]"
        aria-hidden="true"
      />
      <div className="blueprint-dark relative">
        <div className="container-x py-14 lg:py-20">
          <div className="flex flex-wrap items-baseline justify-between gap-3">
            <div className="flex items-center gap-3">
              <span className="h-1.5 w-1.5 rounded-full bg-orange" aria-hidden="true" />
              <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-paper/45">
                The group in numbers
              </p>
            </div>
            <p className="font-mono text-[9.5px] uppercase tracking-[0.18em] text-paper/30">
              Figures provided by the group
            </p>
          </div>

          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {stats.map((s, i) => (
              <Reveal key={s.label} delay={i * 70}>
                <div className="group h-full rounded-2xl border border-paper/10 bg-paper/[0.04] p-5 transition-colors duration-500 hover:border-orange/40 hover:bg-paper/[0.07]">
                  <div className="h-px w-8 bg-orange/60 transition-all duration-500 group-hover:w-14" aria-hidden="true" />
                  <p className="mt-5 font-heading text-[clamp(1.9rem,3vw,2.5rem)] font-semibold leading-none tracking-[-0.03em] text-paper">
                    <Counter value={s.value} prefix={s.prefix} suffix={s.suffix} decimals={s.decimals} />
                  </p>
                  <p className="mt-3 text-[13px] font-medium text-paper/85">{s.label}</p>
                  <p className="mt-1 text-[11px] leading-relaxed text-paper/40">{s.detail}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <p className="mt-8 border-t border-paper/10 pt-4 text-[11px] leading-relaxed text-paper/30">
            Figures shown are as provided in the group brief and remain subject to independent verification.
            Verified disclosures will replace these values.
          </p>
        </div>
      </div>
    </section>
  );
}