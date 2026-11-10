import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, Scale, ShieldCheck, FileText, Building2 } from "lucide-react";
import PageHero from "@/components/site/PageHero";
import Reveal from "@/components/site/Reveal";
import Counter from "@/components/site/Counter";
import InvestorForm from "@/components/forms/InvestorForm";
import { engines, companiesByEngine, stats, IMG } from "@/data/group";
import { applyPublishedContent, usePublishedContent } from "@/lib/site-preview";

export const Route = createFileRoute("/_site/investors")({
  component: InvestorsPage,
  head: () => ({
    meta: [
      { title: "Investors — Pusapati Group" },
      {
        name: "description",
        content:
          "Group overview, business divisions, verified achievements and governance for investors — request group information from the Pusapati Group desk.",
      },
    ],
  }),
});

const governance = [
  {
    icon: Building2,
    title: "Promoter-led board oversight",
    body: "Strategy, capital allocation and approvals sit with the promoter-led board and functional directors for each engine.",
  },
  {
    icon: ShieldCheck,
    title: "Statutory audit and compliance",
    body: "Each company maintains statutory audit, tax and ROC compliance appropriate to its entity structure and scale.",
  },
  {
    icon: Scale,
    title: "Vendor and procurement code",
    body: "Vendor registration, verification and purchase orders follow a documented process across the group.",
  },
  {
    icon: FileText,
    title: "Information on request",
    body: "Entity-level financials, registrations and certifications are shared with qualified investors under confidentiality.",
  },
];

function InvestorsPage() {
  const publishedInvestorInfo = usePublishedContent("investor-info");
  const investorRecords = applyPublishedContent(
    [{ id: "investor-overview" }],
    publishedInvestorInfo,
    "investor-info",
    (record) => record.id,
    (record, fields) => ({ ...record, ...fields }),
  );
  const investorInfo = investorRecords[0] || {};
  const investorOverviewDeleted = publishedInvestorInfo.some((record) => record.id === "investor-overview" && record.deleted);
  return (
    <>
      {!investorOverviewDeleted && <>
      <PageHero
        eyebrow="Investors"
        title={investorInfo.heroTitle || "An integrated building group, built to compound."}
        intro={investorInfo.heroIntroduction || "Four engines, eight companies and one material chain. This page summarises the group's structure and achievements for investors. No financial projections, returns or forecasts are published here."}
        image={IMG.plant}
        imageAlt="Industrial plant at golden hour"
        meta={[
          { label: "Entities", value: investorInfo.entityCount || "8 companies" },
          { label: "Engines", value: investorInfo.engineCount || "4" },
          { label: "Horizon", value: investorInfo.horizon || "Vision 2032" },
          { label: "Reporting", value: investorInfo.reporting || "On request" },
        ]}
      />

      <section className="bg-paper">
        <div className="container-x py-16 lg:py-20">
          <div className="grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <p className="eyebrow">Group overview</p>
              <h2 className="mt-4 font-display text-[clamp(1.8rem,3.2vw,2.6rem)] font-semibold leading-[1.06] tracking-[-0.03em] text-ink">
                {investorInfo.overviewTitle || "Industrial cash flow, connected."}
              </h2>
            </div>
            <div className="lg:col-span-7">
              <div className="space-y-5 text-[15px] leading-[1.8] text-slate">
                <p>{investorInfo.overviewFirst || "Pusapati Group operates across the construction value chain: crushed aggregates and manufactured sand, GGBS, engineered ready-mix concrete, multi-category material trade, contracting and hospitality villas. Edge colocation is planned as the fourth engine."}</p>
                <p>{investorInfo.overviewSecond || "Because the material businesses supply the contracting and villa businesses, group demand supports plant utilisation, and margin is retained at more than one point in the chain. Cross-company governance and a shared quality system are the mechanisms that keep the model coherent."}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      </>}

      <section className="border-y border-ink/10 bg-concrete">
        <div className="container-x py-14 lg:py-16">
          <div className="grid gap-px bg-ink/10 sm:grid-cols-2 lg:grid-cols-5">
            {stats.map((s, i) => (
              <div key={s.label} className="bg-concrete px-5 py-6">
                <p className="font-display text-[clamp(1.6rem,2.6vw,2.1rem)] font-semibold leading-none tracking-[-0.03em] text-ink">
                  <Counter value={s.value} prefix={s.prefix} suffix={s.suffix} decimals={s.decimals} />
                </p>
                <p className="mt-2 text-[12px] font-medium text-ink/80">{s.label}</p>
                <p className="mt-1 text-[10px] leading-relaxed text-slate/70">{s.detail}</p>
                {i === 0 && <span className="sr-only">Source: group brief</span>}
              </div>
            ))}
          </div>
          <p className="mt-5 text-[11px] leading-relaxed text-slate">
            Figures are as provided in the group brief and pending independent verification. No revenue,
            EBITDA, valuation or return projections are published.
          </p>
        </div>
      </section>

      <section className="bg-paper">
        <div className="container-x py-16 lg:py-20">
          <p className="eyebrow">Business divisions</p>
          <div className="mt-6 grid gap-5 sm:grid-cols-2">
            {engines.map((e, i) => (
              <Reveal key={e.id} delay={i * 60} className="border border-ink/12 p-6">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] tracking-[0.16em]" style={{ color: e.accent }}>
                    {e.index}
                  </span>
                  <span className="font-mono text-[9px] uppercase tracking-[0.14em] text-slate/60">
                    {companiesByEngine(e.id).length} companies
                  </span>
                </div>
                <h3 className="mt-3 text-[17px] font-semibold tracking-tight text-ink">{e.name}</h3>
                <p className="mt-2 text-[13px] leading-relaxed text-slate">{e.blurb}</p>
                <Link
                  to="/companies"
                  hash={e.id}
                  className="mt-4 inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-ink/70 hover:text-orange"
                >
                  View companies
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-ink text-paper">
        <div className="blueprint-dark">
          <div className="container-x py-16 lg:py-20">
            <div className="grid gap-10 lg:grid-cols-12">
              <div className="lg:col-span-4">
                <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-paper/45">Governance</p>
                <h2 className="mt-4 font-display text-[clamp(1.8rem,3.2vw,2.6rem)] font-semibold leading-[1.06] tracking-[-0.03em]">
                  Structured for scrutiny.
                </h2>
                <p className="mt-4 text-[13px] leading-relaxed text-paper/50">
                  Governance and investor reporting are being formalised as the group scales. Current
                  structure is described below.
                </p>
              </div>
              <div className="lg:col-span-8">
                <div className="grid gap-px bg-paper/10 sm:grid-cols-2">
                  {governance.map((g) => {
                    const Icon = g.icon;
                    return (
                      <div key={g.title} className="bg-ink p-6">
                        <Icon className="h-4 w-4 text-orange" aria-hidden="true" />
                        <h3 className="mt-4 text-[15px] font-semibold tracking-tight">{g.title}</h3>
                        <p className="mt-2 text-[13px] leading-relaxed text-paper/55">{g.body}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-paper">
        <div className="container-x py-16 lg:py-24">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <p className="eyebrow">Request information</p>
              <h2 className="mt-4 font-display text-[clamp(1.7rem,3vw,2.4rem)] font-semibold leading-tight tracking-[-0.03em] text-ink">
                Investor information request.
              </h2>
              <p className="mt-4 text-[14px] leading-relaxed text-slate">
                Tell us who you are and what you need. Requests are reviewed before information is shared,
                and entity-level documents are provided under confidentiality.
              </p>

              <div className="mt-8 border border-ink/12 bg-concrete/50 p-5">
                <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-slate">Important</p>
                <p className="mt-3 text-[12px] leading-relaxed text-slate">
                  Nothing on this page is an offer, solicitation or recommendation to invest. Forward-looking
                  statements describe intent, not commitments. Past execution does not guarantee future
                  performance.
                </p>
              </div>
            </div>

            <div className="lg:col-span-7">
              <InvestorForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}