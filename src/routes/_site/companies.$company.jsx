import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowUpRight, Check } from "lucide-react";
import { Image } from "@/components/ui/image";
import Reveal from "@/components/site/Reveal";
import ProjectLink from "@/components/site/ProjectLink";
import { PrimaryLink, TextLink } from "@/components/site/CTA";
import { companies, companyBySlug, engineById } from "@/data/group";
import { projects } from "@/data/catalogue";
import { applyPublishedContent, usePublishedContent } from "@/lib/site-preview";

export const Route = createFileRoute("/_site/companies/$company")({
  component: CompanyPage,
  head: ({ params }) => {
    const c = companyBySlug(params.company);
    return {
      meta: [
        { title: `${c?.name || "Company"} — Pusapati Group` },
        { name: "description", content: c?.tagline || "Pusapati Group company profile." },
      ],
    };
  },
});

function CompanyPage() {
  const { company: slug } = Route.useParams();
  const publishedCompanies = usePublishedContent("companies");
  const liveCompanies = applyPublishedContent(companies, publishedCompanies, "companies", (record) => `company-${record.slug}`, (record, fields) => ({
    ...record,
    slug: fields.slug || record.slug,
    name: fields.name,
    engine: fields.engine || record.engine,
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
  const company = liveCompanies.find((record) => record.slug === slug) || companyBySlug(slug);
  if (!company) throw notFound();

  const engine = engineById(company.engine);
  const related = projects.filter((p) => p.companySlug === company.slug);
  const index = liveCompanies.findIndex((c) => c.slug === company.slug);
  const next = liveCompanies[(index + 1) % liveCompanies.length];

  return (
    <>
      <section className="border-b border-ink/10 bg-paper">
        <div className="container-x pb-14 pt-10 lg:pb-20 lg:pt-14">
          <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-2 font-mono text-[10px] uppercase tracking-[0.16em] text-slate">
            <Link to="/companies" className="hover:text-ink">
              Companies
            </Link>
            <span aria-hidden="true">/</span>
            <Link to="/companies" hash={engine.id} className="hover:text-ink">
              {engine.name}
            </Link>
          </nav>

          <div className="mt-8 grid gap-10 lg:grid-cols-12 lg:gap-14">
            <div className="lg:col-span-6">
              <div className="flex flex-wrap items-center gap-3">
                <span
                  className="inline-flex items-center gap-2 border px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.14em]"
                  style={{ borderColor: `${engine.accent}66`, color: engine.accent }}
                >
                  <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: engine.accent }} />
                  {engine.name}
                </span>
                <span className="font-mono text-[9px] uppercase tracking-[0.14em] text-slate">
                  {company.status}
                </span>
              </div>

              <h1 className="mt-6 font-display text-[clamp(2.2rem,4.6vw,3.8rem)] font-semibold leading-[0.98] tracking-[-0.04em] text-ink">
                {company.name}
              </h1>
              <p className="mt-4 max-w-xl text-[17px] leading-snug text-slate">{company.tagline}</p>
              <p className="mt-6 max-w-xl text-[15px] leading-[1.8] text-slate">{company.intro}</p>

              <div className="mt-8 flex flex-wrap gap-3">
                <PrimaryLink to="/quote">Send an enquiry</PrimaryLink>
                <Link
                  to="/work"
                  className="inline-flex min-h-[44px] items-center gap-2 border border-ink/25 px-6 text-[11px] font-semibold uppercase tracking-[0.14em] text-ink transition-colors hover:bg-ink hover:text-paper"
                >
                  Related work
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="relative aspect-[4/3] overflow-hidden bg-concrete">
                <Image src={company.image} alt={company.name} className="h-full w-full object-cover" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-paper">
        <div className="container-x py-16 lg:py-20">
          <div className="grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <p className="eyebrow">Services & activities</p>
              <ul className="mt-6 grid gap-px bg-ink/10 sm:grid-cols-2">
                {company.services.map((s) => (
                  <li key={s} className="flex items-start gap-3 bg-paper p-4 text-[14px] leading-snug text-ink/85">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-orange" aria-hidden="true" />
                    {s}
                  </li>
                ))}
              </ul>

              <p className="eyebrow mt-12">Products & solutions</p>
              <ul className="mt-6 flex flex-wrap gap-2">
                {company.products.map((p) => (
                  <li
                    key={p}
                    className="border border-ink/15 px-3.5 py-2 text-[13px] text-ink/80"
                  >
                    {p}
                  </li>
                ))}
              </ul>
            </div>

            <div className="lg:col-span-5">
              <div className="border border-ink/12 bg-concrete/60 p-6">
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-slate">Capabilities</p>
                <ul className="mt-5 space-y-4">
                  {company.highlights.map((h) => (
                    <li key={h} className="border-b border-ink/10 pb-4 text-[14px] leading-snug text-ink/85 last:border-0 last:pb-0">
                      {h}
                    </li>
                  ))}
                </ul>
                <p className="mt-6 text-[11px] leading-relaxed text-slate/80">
                  Capacity and performance figures are as provided by the group and subject to verification.
                  Technical documentation is shared on request.
                </p>
              </div>

              <div className="mt-6 border border-ink/12 p-6">
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-slate">Enquiries</p>
                <p className="mt-3 text-[14px] leading-relaxed text-slate">
                  Technical requirements, supply schedules and documentation requests are routed to the
                  company team through one group desk.
                </p>
                <div className="mt-4">
                  <TextLink to="/quote">Start an enquiry</TextLink>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {company.propertyDetails && (
        <section className="border-y border-ink/10 bg-concrete">
          <div className="container-x py-14 lg:py-18">
            <p className="eyebrow">Anaya Exclusive Villas</p>
            <h2 className="mt-3 font-display text-[clamp(1.7rem,3vw,2.4rem)] font-semibold tracking-[-0.03em] text-ink">
              Property details
            </h2>
            <dl className="mt-7 grid gap-px bg-ink/10 sm:grid-cols-2 lg:grid-cols-3">
              {company.propertyDetails.map((detail) => (
                <div key={detail.label} className="bg-paper p-5">
                  <dt className="font-mono text-[9px] uppercase tracking-[0.16em] text-slate">
                    {detail.label}
                  </dt>
                  <dd className="mt-2 text-[14px] leading-relaxed text-ink">{detail.value}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-4 max-w-3xl text-[11px] leading-relaxed text-slate/80">
              Specifications and indicative pricing are from the draft group brief and must be reconfirmed
              before publication. Rental, return and owner-benefit claims are omitted pending legal review.
            </p>
          </div>
        </section>
      )}

      {company.groupConnection && (
        <section className="bg-ink text-paper">
          <div className="blueprint-dark">
            <div className="container-x py-12 lg:py-16">
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-paper/45">
                How it connects to the group
              </p>
              <p className="mt-4 max-w-3xl font-display text-[clamp(1.25rem,2.4vw,1.8rem)] leading-snug tracking-[-0.02em] text-paper/85">
                {company.groupConnection}
              </p>
            </div>
          </div>
        </section>
      )}

      {related.length > 0 && (
        <section className="border-y border-ink/10 bg-concrete">
          <div className="container-x py-16">
            <p className="eyebrow">Related projects</p>
            <div className="mt-8 grid gap-5 md:grid-cols-2">
              {related.map((p, i) => (
                <Reveal key={p.slug} delay={i * 60}>
                  <ProjectLink project={p} className="group flex gap-4 border border-ink/10 bg-paper p-3">
                    <div className="relative h-24 w-28 shrink-0 overflow-hidden bg-concrete">
                      <Image src={p.image} alt={p.name} className="h-full w-full object-cover" />
                    </div>
                    <div className="min-w-0 flex-1 py-1">
                      <p className="font-mono text-[9px] uppercase tracking-[0.14em] text-slate">
                        {p.status}
                      </p>
                      <h3 className="mt-1 text-[15px] font-semibold leading-snug tracking-tight text-ink">
                        {p.name}
                      </h3>
                      <p className="mt-0.5 text-[12px] text-slate">
                        {p.location} · {p.sector}
                      </p>
                    </div>
                    <ArrowUpRight className="mt-1 h-4 w-4 shrink-0 text-ink/40 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </ProjectLink>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="bg-paper">
        <div className="container-x flex flex-wrap items-center justify-between gap-4 py-10">
          <p className="text-[12px] text-slate">Next company</p>
          <Link
            to="/companies/$company"
            params={{ company: next.slug }}
            className="group inline-flex items-center gap-2 text-[15px] font-semibold tracking-tight text-ink"
          >
            {next.name}
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>
      </section>
    </>
  );
}