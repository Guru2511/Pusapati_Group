import React from "react";
import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { engines, companiesByEngine } from "@/data/group";

export default function MegaMenu({ onNavigate }) {
  return (
    <div
      className="absolute left-0 right-0 top-full hidden border-b border-ink/10 bg-paper shadow-[0_40px_80px_-50px_rgba(22,24,28,0.45)] xl:block"
      role="region"
      aria-label="Pusapati Group companies"
    >
      <div className="container-x py-10">
        <div className="grid grid-cols-4 gap-8">
          {engines.map((engine) => {
            const list = companiesByEngine(engine.id);
            return (
              <div key={engine.id} className="border-t pt-4" style={{ borderColor: engine.accent }}>
                <div className="flex items-baseline justify-between">
                  <h3 className="text-[13px] font-semibold uppercase tracking-[0.1em] text-ink">{engine.name}</h3>
                  <span className="font-mono text-[10px] text-slate">{engine.index}</span>
                </div>
                <ul className="mt-4 space-y-3">
                  {list.map((c) => (
                    <li key={c.slug}>
                      <Link
                        to="/companies/$company"
                        params={{ company: c.slug }}
                        onClick={onNavigate}
                        className="group flex items-start justify-between gap-3 text-[14px] leading-snug text-ink/80 transition-colors hover:text-ink"
                      >
                        <span>
                          {c.name}
                          {c.status.startsWith("Planned") && (
                            <span className="ml-2 align-middle font-mono text-[9px] uppercase tracking-[0.14em] text-slate">
                              Planned
                            </span>
                          )}
                        </span>
                        <ArrowUpRight className="mt-0.5 h-3.5 w-3.5 shrink-0 text-slate/50 transition-colors group-hover:text-ink" />
                      </Link>
                    </li>
                  ))}
                </ul>
                <Link
                  to="/companies"
                  hash={engine.id}
                  onClick={onNavigate}
                  className="mt-5 inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-slate transition-colors hover:text-ink"
                >
                  Engine overview
                  <ArrowUpRight className="h-3 w-3" />
                </Link>
              </div>
            );
          })}
        </div>

        <div className="mt-9 flex flex-wrap items-center justify-between gap-4 border-t border-ink/10 pt-5">
          <p className="max-w-lg text-[13px] leading-relaxed text-slate">
            Eight companies, four engines — quarry to skyline to stay, under one quality system.
          </p>
          <div className="flex items-center gap-6">
            <Link
              to="/companies"
              onClick={onNavigate}
              className="text-[11px] font-medium uppercase tracking-[0.16em] text-ink underline decoration-ink/30 underline-offset-4 transition-colors hover:decoration-orange"
            >
              All eight companies
            </Link>
            <Link
              to="/quote"
              onClick={onNavigate}
              className="text-[11px] font-medium uppercase tracking-[0.16em] text-orange transition-colors hover:text-ink"
            >
              Get a quote
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}