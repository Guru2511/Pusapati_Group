import { createFileRoute } from "@tanstack/react-router";
import { Clock, Mail, Phone } from "lucide-react";
import QuoteForm from "@/components/forms/QuoteForm";
import { usePublicContact } from "@/lib/site-preview";

const CATEGORY_IDS = [
  "concrete",
  "aggregates",
  "ggbs",
  "construction_materials",
  "villas",
  "exports",
  "other",
];

export const Route = createFileRoute("/_site/quote")({
  validateSearch: (search) => ({
    category: CATEGORY_IDS.includes(search.category) ? search.category : undefined,
  }),
  component: QuotePage,
  head: () => ({
    meta: [
      { title: "Get a Quote — Pusapati Group" },
      {
        name: "description",
        content:
          "One enquiry form for concrete, aggregates, GGBS, construction materials, villas and exports. The fields adapt to what you need.",
      },
    ],
  }),
});

const steps = [
  {
    title: "Requirement review",
    body: "The enquiry desk reads the requirement and routes it to the right company team — concrete, minerals, trade or hospitality.",
  },
  {
    title: "Technical confirmation",
    body: "Mix and specification details, availability and delivery feasibility are confirmed with the plant or project team.",
  },
  {
    title: "Quote and schedule",
    body: "You receive a written scope, price basis and supply schedule. No obligation until you approve.",
  },
];

function QuotePage() {
  const { category } = Route.useSearch();
  const contact = usePublicContact();

  return (
    <>
      <section className="border-b border-ink/10 bg-paper">
        <div className="container-x pb-10 pt-12 lg:pb-14 lg:pt-16">
          <div className="flex items-center gap-3">
            <span className="h-px w-8 bg-orange" aria-hidden="true" />
            <span className="eyebrow">Get a quote</span>
          </div>
          <h1 className="mt-5 max-w-[20ch] font-display text-[clamp(2.3rem,4.8vw,3.9rem)] font-semibold leading-[0.98] tracking-[-0.04em] text-ink">
            Tell us what you're building.
          </h1>
          <p className="mt-4 max-w-xl text-[16px] leading-relaxed text-slate">
            One form, seven requirement types. Add each requirement you need and its fields adapt — volumes,
            pour conditions, shipment details or a villa site visit.
          </p>
        </div>
      </section>

      <section className="bg-paper">
        <div className="container-x py-12 lg:py-16">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-7">
              <QuoteForm key={category || "default"} initialCategory={category || "concrete"} />
            </div>

            <aside className="lg:col-span-5">
              <div className="lg:sticky lg:top-28 space-y-6">
                <div className="border border-ink/12 bg-concrete/50 p-6">
                  <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-slate">
                    What happens next
                  </p>
                  <ol className="mt-5 space-y-5">
                    {steps.map((s, i) => (
                      <li key={s.title} className="flex gap-4">
                        <span className="font-mono text-[11px] tracking-[0.1em] text-orange">0{i + 1}</span>
                        <div>
                          <p className="text-[14px] font-semibold tracking-tight text-ink">{s.title}</p>
                          <p className="mt-1 text-[13px] leading-relaxed text-slate">{s.body}</p>
                        </div>
                      </li>
                    ))}
                  </ol>
                </div>

                <div className="border border-ink/12 p-6">
                  <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-slate">
                    Prefer to talk?
                  </p>
                  <ul className="mt-4 space-y-3 text-[14px]">
                    <li>
                      <a href={`tel:${contact.phone.replace(/\s/g, "")}`} className="flex items-center gap-2.5 text-ink hover:text-orange">
                        <Phone className="h-4 w-4 text-orange" aria-hidden="true" />
                        {contact.phone}
                      </a>
                    </li>
                    <li>
                      <a href={`mailto:${contact.email}`} className="flex items-center gap-2.5 text-ink hover:text-orange">
                        <Mail className="h-4 w-4 text-orange" aria-hidden="true" />
                        {contact.email}
                      </a>
                    </li>
                    <li className="flex items-center gap-2.5 text-slate">
                      <Clock className="h-4 w-4 text-orange" aria-hidden="true" />
                      {contact.hours}
                    </li>
                  </ul>
                  <p className="mt-4 text-[11px] leading-relaxed text-slate/70">
                    Contact details are placeholders pending confirmation.
                  </p>
                </div>

                <p className="text-[11px] leading-relaxed text-slate/80">
                  Submissions are stored in the group's enquiry register and reviewed by the enquiry desk.
                  Enquiries do not create a contract or reserve supply capacity.
                </p>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}