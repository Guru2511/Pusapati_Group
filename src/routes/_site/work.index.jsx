import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, MapPin } from "lucide-react";
import { Image } from "@/components/ui/image";
import PageHero from "@/components/site/PageHero";
import Reveal from "@/components/site/Reveal";
import { projects } from "@/data/catalogue";
import { companies, companyBySlug, IMG } from "@/data/group";

export const Route = createFileRoute("/_site/work/")({
  component: WorkPage,
  head: () => ({
    meta: [
      { title: "Our Work — Pusapati Group" },
      {
        name: "description",
        content:
          "Selected projects supplied and built by Pusapati Group companies — with company, sector, location and status.",
      },
    ],
  }),
});

const all = "all";

function WorkPage() {
  const [filters, setFilters] = useState({
    company: all,
    sector: all,
    location: all,
    status: all,
  });

  const unique = (key) => Array.from(new Set(projects.map((p) => p[key])));
  const companyOptions = companies
    .filter((c) => projects.some((p) => p.companySlug === c.slug))
    .map((c) => ({ value: c.slug, label: c.name }));

  const visible = projects.filter(
    (p) =>
      (filters.company === all || p.companySlug === filters.company) &&
      (filters.sector === all || p.sector === filters.sector) &&
      (filters.location === all || p.location === filters.location) &&
      (filters.status === all || p.status === filters.status)
  );

  const set = (key) => (e) => setFilters((f) => ({ ...f, [key]: e.target.value }));
  const active = Object.values(filters).some((v) => v !== all);

  const selectClass =
    "min-h-[44px] w-full appearance-none border border-ink/15 bg-paper px-3 pr-8 text-[12px] text-ink focus:border-orange focus:outline-none";

  return (
    <>
      <PageHero
        eyebrow="Our work"
        title="Projects that carry the group's name."
        intro="A reference set across residential, data centre and hospitality work. Filter by company, sector, location or status — each project opens as a short case study."
        image={IMG.candeur}
        imageAlt="Residential tower at blue hour"
        meta={[
          { label: "References", value: `${projects.length}` },
          { label: "Companies involved", value: `${new Set(projects.map((p) => p.companySlug)).size}` },
          { label: "Sectors", value: `${new Set(projects.map((p) => p.sector)).size}` },
        ]}
      />

      <section className="bg-paper">
        <div className="container-x py-12 lg:py-16">
          <div className="grid gap-3 border-y border-ink/10 py-5 sm:grid-cols-2 lg:grid-cols-[1fr_1fr_1fr_1fr_auto] lg:items-end">
            <label className="block">
              <span className="mb-1.5 block font-mono text-[9px] uppercase tracking-[0.18em] text-slate">
                Company
              </span>
              <select value={filters.company} onChange={set("company")} className={selectClass}>
                <option value={all}>All companies</option>
                {companyOptions.map((c) => (
                  <option key={c.value} value={c.value}>
                    {c.label}
                  </option>
                ))}
              </select>
            </label>

            <label className="block">
              <span className="mb-1.5 block font-mono text-[9px] uppercase tracking-[0.18em] text-slate">
                Sector
              </span>
              <select value={filters.sector} onChange={set("sector")} className={selectClass}>
                <option value={all}>All sectors</option>
                {unique("sector").map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </label>

            <label className="block">
              <span className="mb-1.5 block font-mono text-[9px] uppercase tracking-[0.18em] text-slate">
                Location
              </span>
              <select value={filters.location} onChange={set("location")} className={selectClass}>
                <option value={all}>All locations</option>
                {unique("location").map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </label>

            <label className="block">
              <span className="mb-1.5 block font-mono text-[9px] uppercase tracking-[0.18em] text-slate">
                Status
              </span>
              <select value={filters.status} onChange={set("status")} className={selectClass}>
                <option value={all}>All statuses</option>
                {unique("status").map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </label>

            <button
              type="button"
              onClick={() => setFilters({ company: all, sector: all, location: all, status: all })}
              disabled={!active}
              className="min-h-[44px] border border-ink/15 px-4 text-[11px] font-semibold uppercase tracking-[0.12em] text-ink/70 transition-colors hover:border-ink hover:text-ink disabled:opacity-40"
            >
              Reset
            </button>
          </div>

          <p className="mt-5 font-mono text-[10px] uppercase tracking-[0.16em] text-slate">
            {visible.length} of {projects.length} projects
          </p>

          {visible.length === 0 ? (
            <div className="mt-10 border border-dashed border-ink/20 p-10 text-center">
              <p className="text-[15px] font-medium text-ink">No projects match these filters.</p>
              <button
                type="button"
                onClick={() => setFilters({ company: all, sector: all, location: all, status: all })}
                className="mt-3 text-[12px] font-semibold uppercase tracking-[0.12em] text-orange"
              >
                Clear filters
              </button>
            </div>
          ) : (
            <div className="mt-8 grid gap-8 md:grid-cols-2">
              {visible.map((p, i) => {
                const company = companyBySlug(p.companySlug);
                return (
                  <Reveal key={p.slug} delay={i * 60}>
                    <Link to="/work/$project" params={{ project: p.slug }} className="group block">
                      <div className="relative aspect-[16/11] overflow-hidden bg-concrete">
                        <Image
                          src={p.image}
                          alt={p.name}
                          className="h-full w-full object-cover transition-transform duration-[1000ms] group-hover:scale-[1.035]"
                        />
                        <div
                          className="absolute inset-0 bg-gradient-to-t from-ink/35 to-transparent opacity-70"
                          aria-hidden="true"
                        />
                        <span className="absolute left-4 top-4 bg-paper/95 px-3 py-1.5 font-mono text-[9px] uppercase tracking-[0.16em] text-ink">
                          {p.status}
                        </span>
                      </div>
                      <div className="mt-4 flex items-start justify-between gap-4">
                        <div>
                          <h2 className="text-[20px] font-semibold tracking-tight text-ink">{p.name}</h2>
                          <p className="mt-1.5 flex items-center gap-1.5 text-[12px] text-slate">
                            <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
                            {p.location} · {p.sector}
                          </p>
                          <p className="mt-1 text-[12px] text-slate/80">
                            Client: {p.client || "To be confirmed"}
                          </p>
                          <p className="mt-1 text-[11px] text-slate/60">{company?.name}</p>
                          {p.scope && <p className="mt-1 text-[11px] text-slate/70">{p.scope}</p>}
                        </div>
                        <ArrowUpRight className="mt-1 h-5 w-5 text-ink/40 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-ink" />
                      </div>
                    </Link>
                  </Reveal>
                );
              })}
            </div>
          )}

          <p className="mt-12 max-w-3xl border-t border-ink/10 pt-5 text-[11px] leading-relaxed text-slate/80">
            Project names, status and scope are reproduced from the group brief and must be confirmed before
            launch. Written client clearance is required before publishing restricted names, logos or renders.
            Images are representative; progress figures and testimonials are withheld until verified.
          </p>
        </div>
      </section>
    </>
  );
}