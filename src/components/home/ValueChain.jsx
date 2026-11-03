import React from "react";
import Reveal from "@/components/site/Reveal";

const chain = [
  { step: "Quarry", body: "Rock, aggregates and manufactured sand from the group's crushing capacity." },
  { step: "Materials", body: "GGBS and engineered ready-mix concrete batched to project design mixes." },
  { step: "Build", body: "Contracting delivery and material trade across residential and industrial work." },
  { step: "Stay", body: "Anaya villas developed, built and managed as a hospitality product." },
];

export default function ValueChain() {
  return (
    <section className="border-y border-ink/10 bg-sand">
      <div className="container-x py-14 lg:py-20">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-start">
          <div className="lg:col-span-3">
            <div className="flex items-center gap-3">
              <span className="h-1.5 w-1.5 rounded-full bg-orange" aria-hidden="true" />
              <p className="eyebrow">Vertical integration</p>
            </div>
            <h2 className="mt-4 font-heading text-[26px] font-semibold leading-tight tracking-tight text-ink">
              One quality system,
              <br />
              end to end.
            </h2>
          </div>

          <div className="lg:col-span-9">
            <ol className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {chain.map((item, i) => (
                <Reveal key={item.step} as="li" delay={i * 80} className="h-full">
                  <div className="group relative h-full rounded-2xl border border-ink/10 bg-white/70 p-5 backdrop-blur-sm transition-all duration-500 hover:-translate-y-1 hover:border-ink/20 hover:bg-white hover:shadow-soft">
                    <div className="flex items-center gap-2.5">
                      <span className="font-mono text-[10px] text-orange">0{i + 1}</span>
                      <span
                        className="h-px flex-1 bg-ink/12 transition-colors duration-500 group-hover:bg-orange/50"
                        aria-hidden="true"
                      />
                    </div>
                    <p className="mt-4 font-heading text-[16px] font-semibold tracking-tight text-ink">
                      {item.step}
                    </p>
                    <p className="mt-2 text-[12.5px] leading-relaxed text-slate">{item.body}</p>
                  </div>
                </Reveal>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}