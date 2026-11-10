import React from "react";
import { Link } from "@tanstack/react-router";
import { ArrowUpRight, MapPin } from "lucide-react";
import { Image } from "@/components/ui/image";
import Reveal from "@/components/site/Reveal";
import { projects } from "@/data/catalogue";
import { companyBySlug } from "@/data/group";
import { applyPublishedContent, usePublishedContent } from "@/lib/site-preview";

export default function ProjectsSection() {
  const publishedProjects = usePublishedContent("projects");
  const liveProjects = applyPublishedContent(projects, publishedProjects, "projects", (project) => `project-${project.slug}`, (project, fields) => ({
    ...project,
    slug: fields.slug || project.slug,
    name: fields.name,
    client: fields.client,
    location: fields.location,
    sector: fields.sector,
    companySlug: fields.companySlug || project.companySlug,
    status: fields.status,
    scope: fields.scope,
    summary: fields.summary,
    overview: fields.overview || fields.summary,
    image: fields.image,
    gallery: (fields.gallery || "").split("\n").filter(Boolean),
  }), (fields) => ({
    ...fields,
    companySlug: fields.companySlug || "pipl-concrete",
    overview: fields.overview || fields.summary,
    gallery: (fields.gallery || "").split("\n").filter(Boolean),
  }));
  return (
    <section className="border-t border-ink/10 bg-paper">
      <div className="container-x section-y">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <div className="flex items-center gap-3">
              <span className="h-1.5 w-1.5 rounded-full bg-orange" aria-hidden="true" />
              <span className="eyebrow">Projects across the group</span>
            </div>
            <h2 className="mt-5 max-w-[22ch] font-heading text-[clamp(2.1rem,4.4vw,3.6rem)] font-semibold leading-[1] tracking-[-0.04em] text-ink">
              Every project,
              <br />
              in one place.
            </h2>
          </div>
          <Link
            to="/work"
            className="group inline-flex items-center gap-2 rounded-full border border-ink/15 bg-white/60 px-5 py-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-ink backdrop-blur transition-all duration-300 hover:border-ink hover:bg-ink hover:text-paper"
          >
            All projects
            <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Link>
        </div>

        <p className="mt-4 max-w-2xl text-sm leading-6 text-slate">
          Browse the complete project list, including active work, delivered references, and upcoming projects.
        </p>

        <div className="mt-12 grid gap-6 md:grid-cols-2 md:gap-7 xl:grid-cols-3">
          {liveProjects.map((p, i) => {
            const company = companyBySlug(p.companySlug);
            return (
              <Reveal key={p.slug} delay={i * 90} className={i % 2 === 1 ? "md:mt-14" : ""}>
                <Link to="/work/$project" params={{ project: p.slug }} className="group block">
                  <div className="relative aspect-[4/3] overflow-hidden rounded-[24px] border border-ink/10 bg-concrete">
                    <Image
                      src={p.image}
                      alt={p.name}
                      className="h-full w-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.06]"
                    />
                    <div
                      className="absolute inset-0 bg-gradient-to-t from-ink/55 via-transparent to-transparent opacity-80 transition-opacity duration-500 group-hover:opacity-95"
                      aria-hidden="true"
                    />
                    <span className="absolute left-4 top-4 rounded-full bg-paper/95 px-3 py-1.5 font-mono text-[9px] uppercase tracking-[0.16em] text-ink backdrop-blur">
                      {p.status}
                    </span>
                    <span className="absolute bottom-4 right-4 grid h-11 w-11 translate-y-2 place-items-center rounded-full bg-paper text-ink opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                      <ArrowUpRight className="h-4 w-4" />
                    </span>
                    <p className="absolute bottom-5 left-5 font-mono text-[9.5px] uppercase tracking-[0.18em] text-paper/80">
                      {company?.name}
                    </p>
                  </div>

                  <div className="mt-4 flex items-start justify-between gap-4 border-b border-ink/10 pb-4">
                    <div>
                      <h3 className="font-heading text-[19px] font-semibold tracking-tight text-ink transition-colors duration-300 group-hover:text-orange">
                        {p.name}
                      </h3>
                      <p className="mt-1.5 flex items-center gap-1.5 text-[12px] text-slate">
                        <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
                        {p.location} · {p.sector}
                      </p>
                    </div>
                  </div>
                </Link>
              </Reveal>
            );
          })}
        </div>

        <p className="mt-10 text-[11px] leading-relaxed text-slate/70">
          Project references are published as supplied by the group. Completion data, percentages and client
          testimonials are not published on this site; verified details are shared during technical evaluation.
        </p>
      </div>
    </section>
  );
}