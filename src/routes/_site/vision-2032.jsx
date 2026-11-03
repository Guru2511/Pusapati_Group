import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, ArrowUpRight, Droplets, Leaf, Recycle, Users } from "lucide-react";
import { Image } from "@/components/ui/image";
import PageHero from "@/components/site/PageHero";
import Reveal from "@/components/site/Reveal";
import { PrimaryLink } from "@/components/site/CTA";
import { IMG, engines } from "@/data/group";
import { sustainability, visionPhases } from "@/data/catalogue";

export const Route = createFileRoute("/_site/vision-2032")({
  component: VisionPage,
  head: () => ({
    meta: [
      { title: "Vision 2032 — Pusapati Group" },
      {
        name: "description",
        content:
          "The Pusapati Group strategic direction to FY2031–32: Foundation, Scale and Conglomerate phases across four business engines.",
      },
    ],
  }),
});

const sustainabilityIcons = { Recycle, Leaf, Droplets, Users };

const coverage = [
  {
    zone: "Core",
    label: "Hyderabad",
    detail: "Group headquarters, plants, crusher, Anaya and BrikBox form the current operating core.",
    width: "w-[46%]",
  },
  {
    zone: "Phase 02",
    label: "Vizag · Vijayawada · Bangalore",
    detail: "Planned concrete supply in Vizag, a BrikBox network in Vijayawada and villas with RMC in Bangalore.",
    width: "w-[70%]",
  },
  {
    zone: "Phase 03",
    label: "Goa · Coorg · global export lanes · tier-2 city",
    detail: "Planned Anaya locations, export lanes and an Edge Colo feasibility search; locations depend on demand and approvals.",
    width: "w-[92%]",
  },
];

function VisionPage() {
  const [active, setActive] = useState(visionPhases[0].id);
  const phase = visionPhases.find((p) => p.id === active) || visionPhases[0];

  return (
    <>
      <PageHero
        eyebrow="Vision 2032"
        title="A group built for the decade ahead."
        intro="Three phases to FY2031–32: consolidate the materials core, scale the model across regions and categories, then operate as a four-engine conglomerate. Direction, not projections — no financial forecasts are published here."
        image={IMG.vision}
        imageAlt="Layered concrete structure under construction"
        meta={[
          { label: "Horizon", value: "FY2031–32" },
          { label: "Phases", value: "3" },
          { label: "Engines", value: "4" },
          { label: "Status", value: "Planned" },
        ]}
      />

      {/* Interactive timeline */}
      <section className="bg-paper">
        <div className="container-x py-16 lg:py-24">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
            <div className="lg:col-span-4">
              <p className="eyebrow">The phases</p>
              <h2 className="mt-4 font-display text-[clamp(1.8rem,3.2vw,2.6rem)] font-semibold leading-[1.06] tracking-[-0.03em] text-ink">
                Foundation, scale,
                <br />
                then conglomerate.
              </h2>
              <p className="mt-4 text-[14px] leading-relaxed text-slate">
                Select a phase to see what the group intends to build in that window. Everything described
                is planned, not completed.
              </p>

              <div className="mt-8 border-l border-ink/15">
                {visionPhases.map((p) => {
                  const isActive = p.id === active;
                  return (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => setActive(p.id)}
                      aria-pressed={isActive}
                      className={`group relative -ml-px flex w-full items-start gap-4 border-l-2 py-5 pl-5 text-left transition-colors ${
                        isActive ? "border-l-2 bg-concrete/60" : "border-transparent hover:bg-concrete/30"
                      }`}
                      style={{ borderLeftColor: isActive ? p.accent : "transparent" }}
                    >
                      <span
                        className="mt-1 h-2 w-2 shrink-0 rounded-full transition-colors"
                        style={{ backgroundColor: isActive ? p.accent : "#C9C5BF" }}
                        aria-hidden="true"
                      />
                      <span>
                        <span className="block font-mono text-[10px] uppercase tracking-[0.18em] text-slate">
                          {p.phase} · {p.years}
                        </span>
                        <span className="mt-1 block text-[17px] font-semibold tracking-tight text-ink">
                          {p.name}
                        </span>
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="lg:col-span-8">
              <div className="border border-ink/12 bg-paper p-7 lg:p-10">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <span
                    className="inline-flex items-center gap-2 px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.16em]"
                    style={{ backgroundColor: `${phase.accent}14`, color: phase.accent }}
                  >
                    <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: phase.accent }} />
                    {phase.years}
                  </span>
                  <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-slate">
                    Planned phase
                  </span>
                </div>

                <h3 className="mt-6 font-display text-[clamp(1.9rem,3.4vw,2.8rem)] font-semibold leading-[1.02] tracking-[-0.035em] text-ink">
                  {phase.name}
                </h3>
                <p className="mt-4 max-w-xl text-[15px] leading-[1.8] text-slate">{phase.summary}</p>

                <p className="mt-8 font-mono text-[10px] uppercase tracking-[0.18em] text-slate">
                  Focus areas
                </p>
                <ul className="mt-4 grid gap-px bg-ink/10 sm:grid-cols-2">
                  {phase.moves.map((m) => (
                    <li key={m} className="flex items-start gap-3 bg-paper p-4 text-[14px] leading-snug text-ink/85">
                      <ArrowRight
                        className="mt-0.5 h-4 w-4 shrink-0"
                        style={{ color: phase.accent }}
                        aria-hidden="true"
                      />
                      {m}
                    </li>
                  ))}
                </ul>

                <div className="mt-8 flex flex-wrap items-center gap-4 border-t border-ink/10 pt-6">
                  <p className="text-[11px] leading-relaxed text-slate/80">
                    Initiatives listed are planned and subject to approvals, capital availability and market
                    conditions.
                  </p>
                  <Link
                    to="/companies"
                    className="ml-auto inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-ink hover:text-orange"
                  >
                    Companies
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Ecosystem diagram */}
      <section className="border-y border-ink/10 bg-ink text-paper">
        <div className="blueprint-dark">
          <div className="container-x py-16 lg:py-24">
            <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
              <div className="lg:col-span-7">
                <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-paper/45">
                  The ecosystem
                </p>
                <h2 className="mt-4 max-w-[24ch] font-display text-[clamp(1.9rem,3.4vw,2.8rem)] font-semibold leading-[1.05] tracking-[-0.03em]">
                  How the engines connect.
                </h2>
              </div>
              <p className="text-[13px] leading-relaxed text-paper/50 lg:col-span-5">
                Material flows one way, demand flows the other. The group's advantage is owning both ends of
                that loop without losing accountability in the middle.
              </p>
            </div>

            <div className="mt-12 grid gap-px bg-paper/10 sm:grid-cols-2">
              {engines.map((e, i) => (
                <div key={e.id} className="bg-ink p-6">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[10px] tracking-[0.16em]" style={{ color: e.accent }}>
                      {e.index}
                    </span>
                    <span className="font-mono text-[9px] uppercase tracking-[0.14em] text-paper/35">
                      {e.companies.length} {e.companies.length === 1 ? "company" : "companies"}
                    </span>
                  </div>
                  <h3 className="mt-3 text-[16px] font-semibold tracking-tight">{e.name}</h3>
                  <p className="mt-2 text-[13px] leading-relaxed text-paper/55">{e.capabilities.join(" · ")}</p>
                  {i < engines.length - 1 && (
                    <div className="mt-4 h-px w-full" style={{ backgroundColor: `${e.accent}40` }} />
                  )}
                </div>
              ))}
            </div>

            <div className="mt-px bg-paper/5 p-6">
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-paper/40">
                Shared across engines
              </p>
              <div className="mt-4 flex flex-wrap gap-x-8 gap-y-2 text-[13px] text-paper/70">
                <span>Quality system</span>
                <span>Procurement & vendor base</span>
                <span>Governance & reporting</span>
                <span>Brand and customer relationships</span>
                <span>Digital infrastructure (planned)</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Regional expansion */}
      <section className="bg-paper">
        <div className="container-x py-16 lg:py-24">
          <div className="grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <p className="eyebrow">Regional expansion</p>
              <h2 className="mt-4 font-display text-[clamp(1.8rem,3.2vw,2.6rem)] font-semibold leading-[1.06] tracking-[-0.03em] text-ink">
                From one belt
                <br />
                outward.
              </h2>
              <p className="mt-4 text-[14px] leading-relaxed text-slate">
                Expansion is planned in rings: deepen the core, extend into adjacent districts, then open
                export corridors. Coverage shown is schematic, not a geographic claim.
              </p>
            </div>

            <div className="lg:col-span-8">
              <div className="border border-ink/12 bg-concrete/40 p-6 lg:p-8">
                <div className="space-y-7">
                  {coverage.map((c, i) => (
                    <div key={c.zone}>
                      <div className="flex items-baseline justify-between gap-4">
                        <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-slate">
                          0{i + 1} — {c.zone}
                        </p>
                        <p className="text-[11px] text-slate/70">
                          {i === 0 ? "Current" : "Planned"}
                        </p>
                      </div>
                      <p className="mt-2 text-[15px] font-medium tracking-tight text-ink">{c.label}</p>
                      <div className="mt-3 h-10 border border-dashed border-ink/25 p-1.5">
                        <div
                          className={`h-full ${c.width}`}
                          style={{
                            backgroundColor: i === 0 ? "#E2701B" : i === 1 ? "#2A52BE" : "#7F00FF",
                            opacity: i === 0 ? 1 : 0.35,
                          }}
                        />
                      </div>
                      <p className="mt-2 text-[12px] leading-relaxed text-slate">{c.detail}</p>
                    </div>
                  ))}
                </div>
                <p className="mt-6 border-t border-ink/10 pt-4 text-[11px] leading-relaxed text-slate/70">
                  Expansion is subject to statutory approvals, land and capacity availability.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sustainability */}
      <section className="border-t border-ink/10 bg-concrete">
        <div className="container-x py-16 lg:py-20">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="eyebrow">Sustainability</p>
              <h2 className="mt-3 max-w-[28ch] font-display text-[clamp(1.7rem,3vw,2.4rem)] font-semibold leading-tight tracking-[-0.03em] text-ink">
                Material choices with a long tail.
              </h2>
            </div>
            <p className="max-w-xs text-[11px] leading-relaxed text-slate">
              Emissions, water and waste targets are being formalised. Current measures are described without
              verified performance claims.
            </p>
          </div>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {sustainability.map((s, i) => {
              const Icon = sustainabilityIcons[s.icon] || Leaf;
              return (
                <Reveal key={s.title} delay={i * 60} className="border border-ink/10 bg-paper p-6">
                  <Icon className="h-5 w-5 text-orange" strokeWidth={1.5} aria-hidden="true" />
                  <h3 className="mt-4 text-[15px] font-semibold tracking-tight text-ink">{s.title}</h3>
                  <p className="mt-2 text-[13px] leading-relaxed text-slate">{s.body}</p>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-paper">
        <div className="container-x flex flex-col gap-6 py-14 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="font-display text-[clamp(1.5rem,2.6vw,2.1rem)] font-semibold tracking-[-0.03em] text-ink">
              Following the group's direction?
            </h2>
            <p className="mt-2 max-w-lg text-[14px] text-slate">
              Investor information, partnerships and vendor opportunities are handled through the group desk.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <PrimaryLink to="/investors">Investor information</PrimaryLink>
            <Link
              to="/vendors"
              className="inline-flex min-h-[44px] items-center gap-2 border border-ink/25 px-6 text-[11px] font-semibold uppercase tracking-[0.14em] text-ink transition-colors hover:bg-ink hover:text-paper"
            >
              Vendors
              <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}