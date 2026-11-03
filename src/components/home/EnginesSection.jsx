import React from "react";
import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { Image } from "@/components/ui/image";
import Reveal from "@/components/site/Reveal";
import { engines, companiesByEngine } from "@/data/group";

export default function EnginesSection() {
  return (
    <section id="engines" className="scroll-mt-24 bg-paper">
      <div className="container-x section-y">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <div className="flex items-center gap-3">
              <span className="h-1.5 w-1.5 rounded-full bg-orange" aria-hidden="true" />
              <span className="eyebrow">Business engines</span>
            </div>
            <h2 className="mt-5 max-w-[19ch] font-heading text-[clamp(2.1rem,4.4vw,3.6rem)] font-semibold leading-[1] tracking-[-0.04em] text-ink">
              Four engines.
              <br />
              One integrated chain.
            </h2>
          </div>
          <div className="lg:col-span-5">
            <p className="text-[15px] leading-[1.75] text-slate">
              Each engine has its own market, team and discipline. Together they cover the full arc of a
              building — the material beneath it, the structure itself and the stay that follows.
            </p>
            <Link
              to="/companies"
              className="group mt-5 inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-ink"
            >
              <span className="link-underline">See all eight companies</span>
              <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
          </div>
        </div>

        <div className="mt-12 grid gap-4 md:grid-cols-2">
          {engines.map((engine, i) => {
            const list = companiesByEngine(engine.id);
            return (
              <Reveal key={engine.id} delay={i * 80}>
                <Link
                  to="/companies"
                  hash={engine.id}
                  className="group relative block h-full overflow-hidden rounded-[26px] border border-ink/10 bg-ink"
                >
                  <div className="relative aspect-[4/3] w-full sm:aspect-[16/11]">
                    <Image
                      src={engine.image}
                      alt={engine.name}
                      className="h-full w-full object-cover opacity-90 transition-transform duration-[1400ms] ease-out group-hover:scale-[1.07]"
                    />
                    <div
                      className="absolute inset-0 bg-gradient-to-t from-ink via-ink/55 to-ink/5"
                      aria-hidden="true"
                    />
                    <div
                      className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                      style={{ background: `linear-gradient(to top, ${engine.accent}33, transparent 65%)` }}
                      aria-hidden="true"
                    />

                    <div className="absolute inset-0 flex flex-col justify-between p-5 sm:p-7">
                      <div className="flex items-center justify-between">
                        <span className="rounded-full border border-paper/25 bg-ink/30 px-3 py-1.5 font-mono text-[9px] uppercase tracking-[0.2em] text-paper/80 backdrop-blur">
                          {engine.index} — Engine
                        </span>
                        <span
                          className="grid h-10 w-10 place-items-center rounded-full border border-paper/25 text-paper transition-all duration-500 group-hover:border-transparent group-hover:bg-paper group-hover:text-ink"
                          aria-hidden="true"
                        >
                          <ArrowUpRight className="h-4 w-4 transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                        </span>
                      </div>

                      <div>
                        <h3 className="max-w-[16ch] font-heading text-[clamp(1.5rem,2.6vw,2.05rem)] font-semibold leading-[1.05] tracking-[-0.03em] text-paper">
                          {engine.name}
                        </h3>
                        <p className="mt-3 max-w-[42ch] text-[13.5px] leading-relaxed text-paper/65">
                          {engine.blurb}
                        </p>

                        <div className="mt-5 flex flex-wrap items-center gap-1.5">
                          {list.map((c) => (
                            <span
                              key={c.slug}
                              className="rounded-full border border-paper/20 bg-paper/5 px-2.5 py-1 text-[10.5px] text-paper/75 backdrop-blur"
                            >
                              {c.name}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </Reveal>
            );
          })}
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-ink/10 pt-5">
          <p className="text-[12.5px] leading-relaxed text-slate">
            Companies marked <span className="font-mono text-[10px] uppercase tracking-[0.14em]">Planned</span>{" "}
            are future ventures under development — no capacity is currently offered.
          </p>
          <Link
            to="/companies"
            className="group inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-ink"
          >
            <span className="link-underline">Explore companies</span>
            <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}