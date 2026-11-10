import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { Image } from "@/components/ui/image";
import PageHero from "@/components/site/PageHero";
import Reveal from "@/components/site/Reveal";
import { companies, engines, companiesByEngine } from "@/data/group";
import { projects } from "@/data/catalogue";
import { applyPublishedContent, usePublishedContent } from "@/lib/site-preview";

export const Route = createFileRoute("/_site/companies/")({
  component: CompaniesPage,
  head: () => ({
    meta: [
      { title: "Companies — Pusapati Group" },
      {
        name: "description",
        content:
          "The eight Pusapati Group companies, organised under four business engines: materials and manufacturing, trade and technology, real estate and hospitality, digital infrastructure.",
      },
    ],
  }),
});

function CompaniesPage() {
  const publishedCompanies = usePublishedContent("companies");
  const liveCompanies = applyPublishedContent(companies, publishedCompanies, "companies", (company) => `company-${company.slug}`, (company, fields) => ({
    ...company,
    slug: fields.slug || company.slug,
    name: fields.name,
    engine: fields.engine || company.engine,
    status: fields.status,
    tagline: fields.tagline,
    intro: fields.description,
    services: fields.services.split("\n").filter(Boolean),
    products: fields.products.split("\n").filter(Boolean),
    highlights: fields.highlights.split("\n").filter(Boolean),
    groupConnection: fields.groupConnection,
    propertyDetails: (fields.propertyDetails || "").split("\n").filter(Boolean).map((line) => {
      const [label, ...value] = line.split(" — ");
      return { label, value: value.join(" — ") };
    }),
    image: fields.image,
  }), (fields) => ({
    ...fields,
    slug: fields.slug,
    services: (fields.services || "").split("\n").filter(Boolean),
    products: (fields.products || "").split("\n").filter(Boolean),
    highlights: (fields.highlights || "").split("\n").filter(Boolean),
    propertyDetails: (fields.propertyDetails || "").split("\n").filter(Boolean).map((line) => {
      const [label, ...value] = line.split(" — ");
      return { label, value: value.join(" — ") };
    }),
  }));
  const operatingCount = liveCompanies.filter((company) => company.status === "Operating").length;
  const plannedCount = liveCompanies.filter((company) => company.status.startsWith("Planned")).length;
  const proposedCount = liveCompanies.filter((company) => company.status.startsWith("Proposed")).length;

  return (
    <>
      <PageHero
        eyebrow="Companies"
        title="Eight companies, four engines."
        intro="Each company runs its own operation and customer base. Together they cover the material chain, the structure built with it, and the stay that follows. Planned ventures are marked clearly as future businesses."
        meta={[
          { label: "Operating", value: `${operatingCount} companies` },
          { label: "Planned", value: `${plannedCount} ventures` },
          { label: "Proposed", value: `${proposedCount} venture` },
          { label: "Engines", value: "4" },
          { label: "Projects", value: `${projects.length} references` },
        ]}
      />

      <div className="border-b border-ink/10 bg-paper">
        <div className="container-x flex flex-wrap gap-2 py-4">
          {engines.map((e) => (
            <a
              key={e.id}
              href={`#${e.id}`}
              className="inline-flex min-h-[38px] items-center gap-2 border border-ink/15 px-3.5 text-[11px] font-medium uppercase tracking-[0.12em] text-ink/70 transition-colors hover:border-ink hover:text-ink"
            >
              <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: e.accent }} />
              {e.name}
            </a>
          ))}
        </div>
      </div>

      {engines.map((engine, ei) => {
        const list = liveCompanies.filter((company) => company.engine === engine.id);
        return (
          <section
            key={engine.id}
            id={engine.id}
            className={`scroll-mt-24 border-b border-ink/10 ${ei % 2 === 1 ? "bg-concrete" : "bg-paper"}`}
          >
            <div className="container-x py-16 lg:py-20">
              <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
                <div className="lg:col-span-7">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-[10px] tracking-[0.18em]" style={{ color: engine.accent }}>
                      {engine.index}
                    </span>
                    <span className="h-px w-10" style={{ backgroundColor: `${engine.accent}80` }} />
                    <span className="eyebrow">{list.length} companies</span>
                  </div>
                  <h2 className="mt-4 font-display text-[clamp(1.8rem,3.4vw,2.8rem)] font-semibold leading-[1.04] tracking-[-0.035em] text-ink">
                    {engine.name}
                  </h2>
                </div>
                <div className="lg:col-span-5">
                  <p className="text-[15px] leading-relaxed text-slate">{engine.blurb}</p>
                  <ul className="mt-4 flex flex-wrap gap-x-4 gap-y-1">
                    {engine.capabilities.map((c) => (
                      <li key={c} className="font-mono text-[10px] uppercase tracking-[0.14em] text-slate/80">
                        {c}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                {list.map((c, i) => (
                  <Reveal key={c.slug} delay={i * 60}>
                    <Link
                      to="/companies/$company"
                      params={{ company: c.slug }}
                      className="group flex h-full flex-col border border-ink/12 bg-paper transition-all duration-500 hover:-translate-y-1 hover:border-ink/30 hover:shadow-[0_30px_60px_-45px_rgba(22,24,28,0.55)]"
                    >
                      <div className="relative aspect-[16/10] overflow-hidden bg-ink/5">
                        <Image
                          src={c.image}
                          alt={c.name}
                          className="h-full w-full object-cover transition-transform duration-[900ms] group-hover:scale-[1.04]"
                        />
                        <span
                          className="absolute left-3 top-3 px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.14em]"
                          style={{
                            backgroundColor: c.status.startsWith("Planned") ? "#16181C" : "#FBFAF8",
                            color: c.status.startsWith("Planned") ? "#FBFAF8" : "#16181C",
                          }}
                        >
                          {c.status}
                        </span>
                      </div>
                      <div className="flex flex-1 flex-col p-5">
                        <div className="h-px w-10" style={{ backgroundColor: engine.accent }} />
                        <h3 className="mt-3 text-[17px] font-semibold leading-snug tracking-tight text-ink">
                          {c.name}
                        </h3>
                        <p className="mt-2 text-[13px] leading-relaxed text-slate">{c.tagline}</p>
                        <div className="mt-auto flex items-center justify-between pt-5">
                          <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-ink/60">
                            Company profile
                          </span>
                          <ArrowUpRight className="h-4 w-4 text-ink/40 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-ink" />
                        </div>
                      </div>
                    </Link>
                  </Reveal>
                ))}
              </div>
            </div>
          </section>
        );
      })}

      <section className="bg-paper">
        <div className="container-x py-14">
          <p className="max-w-3xl text-[12px] leading-relaxed text-slate/80">
            Company descriptions reflect the group structure as briefed. Planned ventures — including BrikBox
            Edge Colo — are identified as future businesses and currently offer no products or capacity.
            Registration details, certifications and statutory identifiers are available on request.
          </p>
        </div>
      </section>
    </>
  );
}