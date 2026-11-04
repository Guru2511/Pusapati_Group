import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, Droplets, Leaf, Recycle, Users } from "lucide-react";
import PageHero from "@/components/site/PageHero";
import Reveal from "@/components/site/Reveal";
import { Image } from "@/components/ui/image";
import { GhostLink, PrimaryLink, TextLink } from "@/components/site/CTA";
import { IMG, stats } from "@/data/group";
import { journey, leadership, milestonesNote, sustainability, values } from "@/data/catalogue";

export const Route = createFileRoute("/_site/about")({
  component: AboutPage,
  head: () => ({
    meta: [
      { title: "About the Group — Pusapati Group" },
      {
        name: "description",
        content:
          "An integrated Indian building group: the Pusapati Group journey, vision, leadership, core values and sustainability approach.",
      },
    ],
  }),
});

const sustainabilityIcons = { Recycle, Leaf, Droplets, Users };

function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About the group"
        title="Built on stone. Structured for what comes next."
        intro="Pusapati Group began with PIPL Concrete, a ready-mix supplier founded in 2024, and has grown into four connected engines spanning materials, trade, real estate and hospitality, with digital infrastructure planned for the future."
        foregroundImage={IMG.piplLogo}
        foregroundImageAlt="Pusapati Industrial Pvt. Ltd. logo"
        meta={[
          { label: "Companies", value: "8" },
          { label: "Engines", value: "4" },
          { label: "Head office", value: "Hyderabad, India" },
          { label: "Horizon", value: "Vision 2032" },
        ]}
      />

      {/* Introduction + vision */}
      <section className="bg-paper">
        <div className="container-x py-16 lg:py-24">
          <div className="grid gap-12 lg:grid-cols-12">
            <Reveal className="lg:col-span-5">
              <p className="eyebrow">Who we are</p>
              <h2 className="mt-4 font-display text-[clamp(1.8rem,3.2vw,2.6rem)] font-semibold leading-[1.08] tracking-[-0.03em] text-ink">
                An industrial group with an engineer's bias.
              </h2>
            </Reveal>
            <Reveal delay={100} className="lg:col-span-7">
              <div className="space-y-5 text-[15px] leading-[1.8] text-slate">
                <p>
                  The group's operating centre is material. Aggregates are quarried, crushed and graded;
                  GGBS is supplied as a supplementary cementitious material; concrete is designed, batched
                  and dispatched under a controlled quality protocol. From there the group moves outward —
                  into multi-category material trade, construction contracting and, through Anaya, into
                  villa development and hospitality.
                </p>
                <p>
                  What holds the group together is not a single product line but a single standard. A mix
                  design approved at the plant is the mix that reaches the pour. A grade specified for a
                  structure is the grade that arrives on site. Digital infrastructure is planned as the
                  fourth engine — the same discipline applied to compute capacity.
                </p>
              </div>

              <blockquote className="mt-10 border-l-2 border-orange pl-6">
                <p className="font-display text-[clamp(1.35rem,2.4vw,1.85rem)] font-medium leading-snug tracking-[-0.02em] text-ink">
                  "To be India's most trusted integrated building group — from quarry to skyline to stay."
                </p>
                <cite className="mt-3 block font-mono text-[10px] uppercase not-italic tracking-[0.18em] text-slate">
                  Group vision
                </cite>
              </blockquote>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Journey */}
      <section className="border-y border-ink/10 bg-concrete">
        <div className="container-x py-16 lg:py-20">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="eyebrow">The journey</p>
              <h2 className="mt-3 font-display text-[clamp(1.8rem,3.2vw,2.6rem)] font-semibold leading-tight tracking-[-0.03em] text-ink">
                Capability built in stages.
              </h2>
            </div>
            <p className="max-w-sm text-[11px] leading-relaxed text-slate">{milestonesNote}</p>
          </div>

          <ol className="mt-12 grid gap-px bg-ink/10 md:grid-cols-3 lg:grid-cols-5">
            {journey.map((item, i) => (
              <li key={item.title} className="relative bg-concrete p-5">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-orange">
                    {item.stage}
                  </span>
                  <span className="font-mono text-[10px] text-slate/60">0{i + 1}</span>
                </div>
                <h3 className="mt-4 text-[15px] font-semibold leading-snug tracking-tight text-ink">
                  {item.title}
                </h3>
                <p className="mt-2 text-[13px] leading-relaxed text-slate">{item.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Vision, mission, mandate */}
      <section className="bg-paper">
        <div className="container-x py-16 lg:py-24">
          <div className="grid gap-px bg-ink/10 md:grid-cols-3">
            {[
              {
                label: "Vision",
                title: "India's most trusted integrated building group.",
                body: "Trust, in this industry, is measurable: the mix that was specified, the pour that was on time, the structure that performs. The group builds toward that standard across every engine.",
              },
              {
                label: "Mission",
                title: "Quality materials. Disciplined execution. Assets that keep earning.",
                body: "Maintain clean books and fair dealing at every step, and expand only when the operating base is ready.",
              },
              {
                label: "Mandate",
                title: "One group, four engines, one quality system.",
                body: "Standards, procurement and reporting are shared across companies so that a customer dealing with one company gets the assurance of the whole group.",
              },
            ].map((b, i) => (
              <Reveal key={b.label} delay={i * 80} className="bg-paper p-7">
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-orange">{b.label}</p>
                <h3 className="mt-4 text-[19px] font-semibold leading-snug tracking-tight text-ink">
                  {b.title}
                </h3>
                <p className="mt-3 text-[14px] leading-relaxed text-slate">{b.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership */}
      <section className="border-y border-ink/10 bg-ink text-paper">
        <div className="blueprint-dark">
          <div className="container-x py-16 lg:py-24">
            <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
              <div className="lg:col-span-7">
                <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-paper/45">Leadership</p>
                <h2 className="mt-4 max-w-[24ch] font-display text-[clamp(1.9rem,3.4vw,2.8rem)] font-semibold leading-[1.05] tracking-[-0.03em]">
                  Leadership that builds on experience.
                </h2>
              </div>
              <p className="text-[13px] leading-relaxed text-paper/50 lg:col-span-5">
                A family leadership team brings together industry experience, technical depth and hands-on
                operations across the Pusapati Group.
              </p>
            </div>

            <div className="mt-12 grid gap-px bg-paper/10 sm:grid-cols-2 lg:grid-cols-3">
              {leadership.map((p, i) => (
                <Reveal key={p.role} delay={i * 70} className="bg-ink p-6">
                  <div className="aspect-[4/5] overflow-hidden bg-paper/5">
                    <Image
                      src={p.image}
                      alt={`Portrait of ${p.name}`}
                      className="h-full w-full object-cover"
                      fittingType="fill"
                    />
                  </div>
                  <p className="mt-6 text-[12px] font-medium uppercase tracking-[0.12em] text-paper/60">
                    {p.name}
                  </p>
                  <h3 className="mt-2 text-[15px] font-semibold leading-snug">{p.role}</h3>
                  <p className="mt-2 text-[13px] leading-relaxed text-paper/55">{p.scope}</p>
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {p.highlights.map((highlight) => (
                      <li
                        key={highlight}
                        className="border border-paper/15 px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.12em] text-paper/50"
                      >
                        {highlight}
                      </li>
                    ))}
                  </ul>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-paper">
        <div className="container-x py-16 lg:py-24">
          <div className="grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <p className="eyebrow">Core values</p>
              <h2 className="mt-4 font-display text-[clamp(1.8rem,3.2vw,2.6rem)] font-semibold leading-[1.08] tracking-[-0.03em] text-ink">
                The rules we build by.
              </h2>
              <div className="mt-8">
                <TextLink to="/careers">Work with the group</TextLink>
              </div>
            </div>
            <div className="lg:col-span-8">
              <ul className="border-t border-ink/10">
                {values.map((v, i) => (
                  <li key={v.title} className="grid gap-2 border-b border-ink/10 py-6 sm:grid-cols-[auto_1fr_2fr] sm:gap-6">
                    <span className="font-mono text-[10px] tracking-[0.16em] text-orange">0{i + 1}</span>
                    <h3 className="text-[16px] font-semibold leading-snug tracking-tight text-ink">{v.title}</h3>
                    <p className="text-[14px] leading-relaxed text-slate">{v.body}</p>
                  </li>
                ))}
              </ul>
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
              <h2 className="mt-3 max-w-[26ch] font-display text-[clamp(1.8rem,3.2vw,2.6rem)] font-semibold leading-tight tracking-[-0.03em] text-ink">
                Cleaner material, better-run sites.
              </h2>
            </div>
            <p className="max-w-xs text-[11px] leading-relaxed text-slate">
              Environmental performance figures are not yet published. The measures below describe current
              practice, not verified outcomes.
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

      {/* CTA */}
      <section className="bg-paper">
        <div className="container-x py-16 lg:py-20">
          <div className="flex flex-col gap-6 border border-ink/10 p-8 sm:flex-row sm:items-center sm:justify-between lg:p-10">
            <div>
              <h2 className="font-display text-[clamp(1.6rem,2.8vw,2.2rem)] font-semibold tracking-[-0.03em] text-ink">
                Meet the eight companies.
              </h2>
              <p className="mt-2 text-[14px] text-slate">
                Four engines, one chain — see how each business fits.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <PrimaryLink to="/companies">Explore companies</PrimaryLink>
              <GhostLink to="/vision-2032">Vision 2032</GhostLink>
            </div>
          </div>
          <p className="mt-6 text-[11px] text-slate/70">
            Group figures referenced above ({stats[0].value} companies, {stats[1].value} engines) are as
            provided in the group brief.{" "}
            <Link to="/contact" className="underline decoration-ink/25 underline-offset-4 hover:decoration-orange">
              Contact the group
            </Link>{" "}
            for verified disclosures.
          </p>
        </div>
      </section>
    </>
  );
}