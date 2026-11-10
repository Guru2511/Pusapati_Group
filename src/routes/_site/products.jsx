import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, FlaskConical, FileText, ShieldCheck } from "lucide-react";
import { Image } from "@/components/ui/image";
import PageHero from "@/components/site/PageHero";
import Reveal from "@/components/site/Reveal";
import { PrimaryLink } from "@/components/site/CTA";
import { productCategories, qualityStages } from "@/data/catalogue";
import { IMG } from "@/data/group";
import { applyPublishedContent, usePublishedContent } from "@/lib/site-preview";

export const Route = createFileRoute("/_site/products")({
  component: ProductsPage,
  head: () => ({
    meta: [
      { title: "Products & Quality — Pusapati Group" },
      {
        name: "description",
        content:
          "Concrete, aggregates, sand, GGBS and specialty materials from Pusapati Group — with the three-stage quality inspection behind every dispatch.",
      },
    ],
  }),
});

const quoteCategory = {
  concrete: "concrete",
  aggregates: "aggregates",
  sand: "aggregates",
  ggbs: "ggbs",
  specialty: "construction_materials",
};

function ProductsPage() {
  const publishedProducts = usePublishedContent("products");
  const publishedQualityStages = usePublishedContent("quality");
  const liveProductCategories = applyPublishedContent(productCategories, publishedProducts, "products", (category) => `product-${category.id}`, (category, fields) => ({
    ...category,
    id: fields.id || category.id,
    name: fields.name,
    accent: fields.accent || category.accent,
    intro: fields.introduction,
    image: fields.image,
    items: fields.products.split("\n").filter(Boolean).map((line) => {
      const [name, spec = "", use = ""] = line.split(" — ");
      return { name, spec, use };
    }),
  }), (fields) => ({
    ...fields,
    accent: fields.accent || "#E2701B",
    intro: fields.introduction,
    items: (fields.products || "").split("\n").filter(Boolean).map((line) => {
      const [name, spec = "", use = ""] = line.split(" — ");
      return { name, spec, use };
    }),
  }));
  const liveQualityStages = applyPublishedContent(qualityStages, publishedQualityStages, "quality", (stage) => `quality-${stage.index}`, (stage, fields) => ({
    ...stage,
    index: fields.index,
    title: fields.title,
    body: fields.description,
  }), (fields) => ({ index: fields.index, title: fields.title, body: fields.description }));
  return (
    <>
      <PageHero
        eyebrow="Products & quality"
        title="Material, specified and traceable."
        intro="Concrete, aggregates, sand, GGBS and specialty materials — produced and traded through the group, with a documented quality protocol before anything leaves the plant."
        image={IMG.concrete}
        imageAlt="Wet concrete being poured"
        meta={[
          { label: "Categories", value: `${liveProductCategories.length}` },
          { label: "Inspection stages", value: "3" },
          { label: "Lab", value: "In-house" },
          { label: "Datasheets", value: "On request" },
        ]}
      />

      <div className="border-b border-ink/10 bg-paper">
        <div className="container-x flex flex-wrap gap-2 py-4">
          {liveProductCategories.map((c) => (
            <a
              key={c.id}
              href={`#${c.id}`}
              className="inline-flex min-h-[38px] items-center gap-2 border border-ink/15 px-3.5 text-[11px] font-medium uppercase tracking-[0.12em] text-ink/70 transition-colors hover:border-ink hover:text-ink"
            >
              <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: c.accent }} />
              {c.name}
            </a>
          ))}
        </div>
      </div>

      {liveProductCategories.map((cat, i) => (
        <section
          key={cat.id}
          id={cat.id}
          className={`scroll-mt-24 border-b border-ink/10 ${i % 2 === 1 ? "bg-concrete" : "bg-paper"}`}
        >
          <div className="container-x py-14 lg:py-20">
            <div className="grid gap-10 lg:grid-cols-12">
              <div className="lg:col-span-4">
                <div className="lg:sticky lg:top-28">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-[10px] tracking-[0.2em]" style={{ color: cat.accent }}>
                      0{i + 1}
                    </span>
                    <span className="h-px w-8" style={{ backgroundColor: `${cat.accent}70` }} />
                  </div>
                  <h2 className="mt-3 font-display text-[clamp(1.7rem,3vw,2.4rem)] font-semibold leading-[1.05] tracking-[-0.03em] text-ink">
                    {cat.name}
                  </h2>
                  <p className="mt-3 text-[14px] leading-relaxed text-slate">{cat.intro}</p>
                  <div className="relative mt-6 hidden aspect-[4/3] overflow-hidden bg-ink/5 lg:block">
                    <Image src={cat.image} alt={cat.name} className="h-full w-full object-cover" />
                  </div>
                </div>
              </div>

              <div className="lg:col-span-8">
                <ul className="border-t border-ink/15">
                  {cat.items.map((item) => (
                    <li
                      key={item.name}
                      className="grid gap-2 border-b border-ink/15 py-5 sm:grid-cols-[1.1fr_1.3fr_auto] sm:items-center sm:gap-6"
                    >
                      <div>
                        <h3 className="text-[15px] font-semibold tracking-tight text-ink">{item.name}</h3>
                      </div>
                      <div className="space-y-1">
                        <p className="text-[13px] leading-snug text-slate">{item.spec}</p>
                        <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-slate/70">
                          {item.use}
                        </p>
                      </div>
                      <Link
                        to="/quote"
                        search={{ category: quoteCategory[cat.id] }}
                        className="group inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-ink/70 transition-colors hover:text-orange"
                      >
                        Enquire
                        <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </Link>
                    </li>
                  ))}
                </ul>

                <div className="mt-6 flex flex-wrap items-center gap-4">
                  <a
                    href={`/quote?category=${quoteCategory[cat.id]}`}
                    className="inline-flex min-h-[44px] items-center gap-2 bg-ink px-5 text-[11px] font-semibold uppercase tracking-[0.14em] text-paper transition-colors hover:bg-orange hover:text-ink"
                  >
                    Enquire about {cat.name.toLowerCase()}
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </a>
                  <span className="flex items-center gap-2 text-[11px] text-slate">
                    <FileText className="h-3.5 w-3.5" aria-hidden="true" />
                    Technical datasheets issued on request
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* Quality protocol */}
      <section className="bg-ink text-paper">
        <div className="blueprint-dark">
          <div className="container-x py-16 lg:py-24">
            <div className="grid gap-10 lg:grid-cols-12">
              <div className="lg:col-span-5">
                <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-paper/45">
                  Quality & testing
                </p>
                <h2 className="mt-4 font-display text-[clamp(1.8rem,3.4vw,2.8rem)] font-semibold leading-[1.05] tracking-[-0.03em]">
                  Three checks before any dispatch.
                </h2>
                <p className="mt-5 max-w-md text-[14px] leading-[1.8] text-paper/60">
                  Material is inspected on arrival, monitored through batching and verified again before it
                  leaves the plant. Cube samples are cast for the project's testing programme, and batch
                  records are issued with the pour.
                </p>
                <div className="mt-8 flex flex-wrap gap-6">
                  <div className="flex items-center gap-2.5">
                    <FlaskConical className="h-4 w-4 text-orange" aria-hidden="true" />
                    <span className="text-[12px] text-paper/70">In-house laboratory</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <ShieldCheck className="h-4 w-4 text-orange" aria-hidden="true" />
                    <span className="text-[12px] text-paper/70">Batch-level traceability</span>
                  </div>
                </div>
                <p className="mt-8 font-mono text-[10px] uppercase leading-relaxed tracking-[0.14em] text-paper/30">
                  Test certificates are project-specific and shared with the client. Published test results
                  are pending verification.
                </p>
              </div>

              <div className="lg:col-span-7">
                <div className="grid gap-px bg-paper/10">
                  {liveQualityStages.map((s, i) => (
                    <Reveal key={s.index} delay={i * 70} className="bg-ink p-6">
                      <div className="flex items-baseline gap-4">
                        <span className="font-mono text-[11px] tracking-[0.16em] text-orange">{s.index}</span>
                        <h3 className="text-[16px] font-semibold tracking-tight">{s.title}</h3>
                      </div>
                      <p className="mt-2 pl-9 text-[13px] leading-relaxed text-paper/55">{s.body}</p>
                    </Reveal>
                  ))}
                  <div className="bg-ink p-6">
                    <h3 className="text-[16px] font-semibold tracking-tight">Technical laboratory</h3>
                    <p className="mt-2 text-[13px] leading-relaxed text-paper/55">
                      The group brief identifies compressive-strength, slump, air-content and durability
                      testing, alongside research and development on new mixes. Equipment and test
                      certificates are confirmed for each project before publication.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-paper">
        <div className="container-x flex flex-col gap-6 py-14 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="font-display text-[clamp(1.5rem,2.6vw,2.1rem)] font-semibold tracking-[-0.03em] text-ink">
              Need a specification or datasheet?
            </h2>
            <p className="mt-2 max-w-lg text-[14px] text-slate">
              Send the project requirement — grades, volumes and pour conditions — and the technical team will
              respond with the applicable mix and test plan.
            </p>
          </div>
          <PrimaryLink to="/quote">Request specifications</PrimaryLink>
        </div>
      </section>
    </>
  );
}