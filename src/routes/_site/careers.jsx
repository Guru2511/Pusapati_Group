import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, GraduationCap, HardHat, HeartHandshake } from "lucide-react";
import PageHero from "@/components/site/PageHero";
import Reveal from "@/components/site/Reveal";
import CareerForm from "@/components/forms/CareerForm";
import { departments } from "@/data/catalogue";
import { IMG } from "@/data/group";

export const Route = createFileRoute("/_site/careers")({
  component: CareersPage,
  head: () => ({
    meta: [
      { title: "Careers — Pusapati Group" },
      {
        name: "description",
        content:
          "Work across materials, delivery, procurement, sales, finance and technology at Pusapati Group. Departments, internships and an expression-of-interest form.",
      },
    ],
  }),
});

const culture = [
  {
    icon: HardHat,
    title: "Site-first thinking",
    body: "Decisions are tested where they land — at the plant, at the pour, on the site. Office work follows the work.",
  },
  {
    icon: HeartHandshake,
    title: "Small teams, real ownership",
    body: "Each company runs lean. People own a function end to end rather than a fragment of a process.",
  },
  {
    icon: GraduationCap,
    title: "Learn the material",
    body: "Concrete, aggregates, mix design and quality systems are taught in-house; engineering curiosity matters more than a title.",
  },
];

function CareersPage() {
  return (
    <>
      <PageHero
        eyebrow="Careers"
        title="Build a career with substance."
        intro="The group is growing across materials, contracting, trade and hospitality. We hire for ownership, engineering judgement and the willingness to be on site when it matters."
        image={IMG.office}
        imageAlt="Modern office interior with natural light"
        meta={[
          { label: "Departments", value: "6" },
          { label: "Internships", value: "Open" },
          { label: "Base", value: "Hyderabad" },
        ]}
      />

      <section className="bg-paper">
        <div className="container-x py-16 lg:py-20">
          <div className="grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <p className="eyebrow">Culture</p>
              <h2 className="mt-3 font-display text-[clamp(1.8rem,3.2vw,2.6rem)] font-semibold leading-[1.06] tracking-[-0.03em] text-ink">
                How the group works.
              </h2>
            </div>
            <div className="lg:col-span-8">
              <div className="grid gap-px bg-ink/10 sm:grid-cols-3">
                {culture.map((c) => {
                  const Icon = c.icon;
                  return (
                    <div key={c.title} className="bg-paper p-6">
                      <Icon className="h-5 w-5 text-orange" strokeWidth={1.5} aria-hidden="true" />
                      <h3 className="mt-4 text-[15px] font-semibold tracking-tight text-ink">{c.title}</h3>
                      <p className="mt-2 text-[13px] leading-relaxed text-slate">{c.body}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-ink/10 bg-concrete">
        <div className="container-x py-16 lg:py-20">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="eyebrow">Departments</p>
              <h2 className="mt-3 font-display text-[clamp(1.8rem,3.2vw,2.6rem)] font-semibold leading-tight tracking-[-0.03em] text-ink">
                Where people join.
              </h2>
            </div>
            <p className="max-w-sm text-[11px] leading-relaxed text-slate">
              Live vacancies are not published on this site yet. Submit an expression of interest and the
              relevant department will contact you when a role opens.
            </p>
          </div>

          <ul className="mt-8 grid gap-px bg-ink/10 sm:grid-cols-2 lg:grid-cols-3">
            {departments.map((d, i) => (
              <li key={d.name} className="bg-concrete p-6">
                <span className="font-mono text-[10px] tracking-[0.16em] text-orange">0{i + 1}</span>
                <h3 className="mt-3 text-[15px] font-semibold tracking-tight text-ink">{d.name}</h3>
                <p className="mt-1.5 text-[13px] leading-relaxed text-slate">{d.roles}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-paper">
        <div className="container-x py-16 lg:py-24">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-7">
              <p className="eyebrow">Apply</p>
              <h2 className="mt-3 font-display text-[clamp(1.8rem,3.2vw,2.6rem)] font-semibold leading-tight tracking-[-0.03em] text-ink">
                Expression of interest.
              </h2>
              <p className="mt-3 max-w-lg text-[14px] leading-relaxed text-slate">
                One form for full-time roles and internships. Applications are kept on record for future
                openings.
              </p>
              <div className="mt-8">
                <CareerForm />
              </div>
            </div>

            <aside className="lg:col-span-5">
              <div className="lg:sticky lg:top-28 space-y-6">
                <div className="border border-ink/12 bg-ink p-6 text-paper">
                  <GraduationCap className="h-5 w-5 text-orange" aria-hidden="true" />
                  <h3 className="mt-4 text-[18px] font-semibold tracking-tight">Internships</h3>
                  <p className="mt-2 text-[13px] leading-relaxed text-paper/60">
                    Civil engineering students can apply for internships in quality, site engineering,
                    procurement and sales support. Select the internship option and name the department you
                    want to work with.
                  </p>
                </div>

                <div className="border border-ink/12 p-6">
                  <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-slate">What happens next</p>
                  <ol className="mt-4 space-y-3 text-[13px] text-slate">
                    {[
                      "Application logged against the department",
                      "Shortlist review by the hiring manager",
                      "Interview, on site where relevant",
                      "Offer and onboarding",
                    ].map((s, i) => (
                      <li key={s} className="flex gap-3">
                        <span className="font-mono text-[10px] text-orange">0{i + 1}</span>
                        {s}
                      </li>
                    ))}
                  </ol>
                </div>

                <div className="border border-ink/12 p-6">
                  <p className="text-[13px] leading-relaxed text-slate">
                    No suitable role listed? Send an expression of interest anyway — the group reviews
                    applications against future requirements.
                  </p>
                  <Link
                    to="/contact"
                    className="mt-4 inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-ink hover:text-orange"
                  >
                    Contact the group
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}