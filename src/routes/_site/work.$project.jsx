import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowUpRight, MapPin } from "lucide-react";
import { Image } from "@/components/ui/image";
import Reveal from "@/components/site/Reveal";
import { PrimaryLink, TextLink } from "@/components/site/CTA";
import { projects, projectBySlug } from "@/data/catalogue";
import { companyBySlug } from "@/data/group";

export const Route = createFileRoute("/_site/work/$project")({
  component: ProjectPage,
  head: ({ params }) => {
    const p = projectBySlug(params.project);
    return {
      meta: [
        { title: `${p?.name || "Project"} — Pusapati Group` },
        { name: "description", content: p?.summary || "Pusapati Group project case study." },
      ],
    };
  },
});

function ProjectPage() {
  const { project: slug } = Route.useParams();
  const project = projectBySlug(slug);
  if (!project) throw notFound();

  const company = companyBySlug(project.companySlug);
  const index = projects.findIndex((p) => p.slug === project.slug);
  const next = projects[(index + 1) % projects.length];

  return (
    <>
      <section className="border-b border-ink/10 bg-paper">
        <div className="container-x pb-12 pt-10 lg:pb-16">
          <nav
            aria-label="Breadcrumb"
            className="flex flex-wrap items-center gap-2 font-mono text-[10px] uppercase tracking-[0.16em] text-slate"
          >
            <Link to="/work" className="hover:text-ink">
              Our work
            </Link>
            <span aria-hidden="true">/</span>
            <span className="text-ink/60">{project.sector}</span>
          </nav>

          <div className="mt-7 flex flex-wrap items-center gap-3">
            <span className="border border-ink/20 px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.14em] text-ink/70">
              {project.status}
            </span>
            <span className="flex items-center gap-1.5 text-[12px] text-slate">
              <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
              {project.location}
            </span>
          </div>

          <h1 className="mt-4 font-display text-[clamp(2.1rem,4.4vw,3.6rem)] font-semibold leading-[0.98] tracking-[-0.04em] text-ink">
            {project.name}
          </h1>
          <p className="mt-4 max-w-2xl text-[16px] leading-relaxed text-slate">{project.summary}</p>

          <div className="mt-8 grid gap-px border border-ink/10 bg-ink/10 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { label: "Client", value: project.client || "To be confirmed" },
              { label: "Group company", value: company?.name || "To be confirmed" },
              { label: "Sector", value: project.sector },
              { label: "Location", value: project.location },
              { label: "Status", value: project.status },
              { label: "Scope", value: project.scope || "To be confirmed" },
            ].map((m) => (
              <div key={m.label} className="bg-paper p-4">
                <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-slate">{m.label}</p>
                <p className="mt-1.5 text-[14px] font-medium text-ink">{m.value}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="container-x pb-12">
          <div className="relative aspect-[16/9] w-full overflow-hidden bg-concrete">
            <Image src={project.image} alt={project.name} className="h-full w-full object-cover" />
          </div>
          <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.14em] text-slate/70">
            Reference imagery — representative of the works described
          </p>
        </div>
      </section>

      <section className="bg-paper">
        <div className="container-x py-14 lg:py-20">
          <div className="grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <p className="eyebrow">Project reference</p>
              <p className="mt-4 text-[16px] leading-[1.8] text-slate">
                {project.overview || project.summary}
              </p>
              <p className="mt-8 border-t border-ink/10 pt-6 text-[12px] leading-relaxed text-slate/80">
                Detailed case-study information, client quotations and progress figures will be added only
                after the project records are verified and any required client clearance is obtained.
              </p>
            </div>

            <div className="lg:col-span-5">
              <div className="border border-ink/12 bg-concrete/50 p-6">
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-slate">
                  Publication note
                </p>
                <p className="mt-4 text-[13px] leading-relaxed text-slate">
                  The project scope and status above come from the group blueprint and require owner
                  verification. Restricted client identities are withheld until written clearance.
                </p>
              </div>

              <div className="mt-6 border border-ink/12 p-6">
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-slate">Supplied by</p>
                <p className="mt-3 text-[16px] font-semibold tracking-tight text-ink">{company?.name}</p>
                <p className="mt-2 text-[13px] leading-relaxed text-slate">{company?.tagline}</p>
                <div className="mt-4 flex flex-col gap-3">
                  <TextLink to="/companies/$company" params={{ company: company?.slug }}>
                    Company profile
                  </TextLink>
                  <TextLink to="/quote">Start a similar enquiry</TextLink>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {project.gallery?.length > 1 && (
        <section className="border-y border-ink/10 bg-concrete">
          <div className="container-x py-14 lg:py-20">
            <p className="eyebrow">Gallery</p>
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {project.gallery.map((src, i) => (
                <Reveal key={`${src}-${i}`} delay={i * 60} className="relative aspect-[4/3] overflow-hidden bg-ink/5">
                  <Image
                    src={src}
                    alt={`${project.name} reference view ${i + 1}`}
                    className="h-full w-full object-cover"
                  />
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="bg-paper">
        <div className="container-x flex flex-wrap items-center justify-between gap-6 py-12">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-slate">Next project</p>
            <p className="mt-2 font-display text-[22px] font-semibold tracking-tight text-ink">{next.name}</p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Link
              to="/work/$project"
              params={{ project: next.slug }}
              className="group inline-flex min-h-[44px] items-center gap-2 border border-ink/25 px-5 text-[11px] font-semibold uppercase tracking-[0.14em] text-ink transition-colors hover:bg-ink hover:text-paper"
            >
              View case study
              <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
            <PrimaryLink to="/quote">Get a quote</PrimaryLink>
          </div>
        </div>
      </section>
    </>
  );
}