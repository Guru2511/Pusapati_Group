import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, Clock, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import PageHero from "@/components/site/PageHero";
import ContactForm from "@/components/forms/ContactForm";
import { companies } from "@/data/group";
import { usePublicContact } from "@/lib/site-preview";

export const Route = createFileRoute("/_site/contact")({
  component: ContactPage,
  head: () => ({
    meta: [
      { title: "Contact — Pusapati Group" },
      {
        name: "description",
        content:
          "Contact the Pusapati Group enquiry desk — office details, location map, WhatsApp and a direct contact form.",
      },
    ],
  }),
});

const routing = [
  { need: "Concrete supply or mix design", to: "/quote", category: "concrete" },
  { need: "Aggregates, sand or GGBS", to: "/quote", category: "aggregates" },
  { need: "Construction materials & trade", to: "/quote", category: "construction_materials" },
  { need: "Anaya villas & site visit", to: "/quote", category: "villas" },
  { need: "Export enquiry", to: "/quote", category: "exports" },
  { need: "Vendor registration", to: "/vendors", hash: "register" },
  { need: "Investor information", to: "/investors" },
  { need: "Careers", to: "/careers" },
];

const companyEnquiryCategories = {
  "pipl-concrete": "concrete",
  "pusapati-minerals-aggregates": "aggregates",
  "briks-ggbs": "ggbs",
  brikbox: "construction_materials",
  "pusapati-international-exports": "exports",
  "brikbuild-infra": "construction_materials",
  "brikbuild-hospitality": "villas",
  "brikbox-edge-colo": "other",
};

function ContactPage() {
  const contact = usePublicContact();
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Talk to the group desk."
        intro="One enquiry desk routes every conversation to the right company — materials, trade, construction, villas or investment. We respond within one business day, Monday to Saturday."
        meta={[
          { label: "Enquiries", value: "1 business day" },
          { label: "Working hours", value: contact.hours },
          { label: "Base", value: "Hyderabad, India" },
        ]}
      />

      <section className="bg-paper">
        <div className="container-x py-14 lg:py-20">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <p className="eyebrow">Direct lines</p>

              <div className="mt-6 grid gap-px bg-ink/10">
                <div className="flex items-start gap-4 bg-paper p-5">
                  <Phone className="mt-0.5 h-4 w-4 shrink-0 text-orange" aria-hidden="true" />
                  <div>
                    <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-slate">Phone</p>
                    <a
                      href={`tel:${contact.phone.replace(/\s/g, "")}`}
                      className="mt-1 block text-[16px] font-medium text-ink hover:text-orange"
                    >
                      {contact.phone}
                    </a>
                    <p className="mt-1 text-[11px] text-slate/70">{contact.phoneNote}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 bg-paper p-5">
                  <Mail className="mt-0.5 h-4 w-4 shrink-0 text-orange" aria-hidden="true" />
                  <div>
                    <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-slate">Email</p>
                    <a
                      href={`mailto:${contact.email}`}
                      className="mt-1 block text-[16px] font-medium text-ink hover:text-orange"
                    >
                      {contact.email}
                    </a>
                    <p className="mt-1 text-[11px] text-slate/70">{contact.emailNote}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 bg-paper p-5">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-orange" aria-hidden="true" />
                  <div>
                    <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-slate">Office</p>
                    <address className="mt-1 space-y-0.5 text-[14px] not-italic leading-relaxed text-ink">
                      {contact.addressLines.map((l) => (
                        <span key={l} className="block">
                          {l}
                        </span>
                      ))}
                    </address>
                  </div>
                </div>

                <div className="flex items-start gap-4 bg-paper p-5">
                  <Clock className="mt-0.5 h-4 w-4 shrink-0 text-orange" aria-hidden="true" />
                  <div>
                    <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-slate">Hours</p>
                    <p className="mt-1 text-[14px] text-ink">{contact.hours}</p>
                  </div>
                </div>
              </div>

              <a
                href={contact.whatsapp}
                target="_blank"
                rel="noreferrer noopener"
                className="mt-4 flex min-h-[52px] items-center justify-center gap-2.5 bg-[#128C7E] px-6 text-[11px] font-semibold uppercase tracking-[0.14em] text-white transition-opacity hover:opacity-90"
              >
                <MessageCircle className="h-4 w-4" aria-hidden="true" />
                Message on WhatsApp
              </a>
              <p className="mt-2 text-[11px] text-slate/70">
                WhatsApp number is listed in the group brief; confirm it is active before launch.
              </p>
            </div>

            <div className="lg:col-span-7">
              <p className="eyebrow">Send a message</p>
              <div className="mt-6 border border-ink/12 p-6 lg:p-8">
                <ContactForm />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-ink/10 bg-concrete">
        <div className="container-x py-14 lg:py-16">
          <div className="grid gap-8 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <p className="eyebrow">Find us</p>
              <h2 className="mt-3 font-display text-[clamp(1.6rem,2.6vw,2.1rem)] font-semibold leading-tight tracking-[-0.03em] text-ink">
                Hyderabad, Telangana.
              </h2>
              <p className="mt-3 max-w-xs text-[12px] leading-relaxed text-slate">
                Map shows the Hyderabad region. The exact office location will be published once the
                address is confirmed.
              </p>
              <a
                href="https://www.openstreetmap.org/?mlat=17.4123&mlon=78.4392#map=12/17.4123/78.4392"
                target="_blank"
                rel="noreferrer noopener"
                className="mt-4 inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-ink hover:text-orange"
              >
                Open larger map
                <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
            </div>

            <div className="lg:col-span-8">
              <div className="relative h-[300px] w-full overflow-hidden border border-ink/15 bg-paper lg:h-[360px]">
                <iframe
                  title="Map of the Hyderabad region"
                  src="https://www.openstreetmap.org/export/embed.html?bbox=78.30%2C17.28%2C78.60%2C17.55&layer=mapnik&marker=17.4123%2C78.4392"
                  className="h-full w-full border-0"
                  loading="lazy"
                />
              </div>
            </div>
          </div>

          <div className="mt-10">
            <p className="eyebrow">Group locations</p>
            <div className="mt-4 grid gap-px bg-ink/10 sm:grid-cols-2 lg:grid-cols-4">
              {[
                {
                  name: "Corporate office",
                  place: "Kondapur, Hyderabad",
                  detail: "Full street address and map pin to be confirmed.",
                },
                {
                  name: "Concrete plant",
                  place: "Hyderabad",
                  detail: "Plant address and visitor contact to be confirmed.",
                },
                {
                  name: "Aggregate crusher",
                  place: "Shamshabad",
                  detail: "Pusapati Minerals & Aggregates · 250 TPH stated capacity.",
                },
                {
                  name: "Anaya villa site",
                  place: "Mehtab Khan Guda, Shankarpalli",
                  detail: "Site visits by appointment; exact pin to be confirmed.",
                },
              ].map((site) => (
                <article key={site.name} className="bg-paper p-5">
                  <h3 className="text-[13px] font-semibold text-ink">{site.name}</h3>
                  <p className="mt-2 text-[12px] text-slate">{site.place}</p>
                  <p className="mt-2 text-[11px] leading-relaxed text-slate/70">{site.detail}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-paper">
        <div className="container-x py-14 lg:py-20">
          <p className="eyebrow">Route your enquiry</p>
          <div className="mt-6 grid gap-px bg-ink/10 sm:grid-cols-2 lg:grid-cols-4">
            {routing.map((r) => (
              <Link
                key={r.need}
                to={r.to}
                hash={r.hash}
                search={r.category ? { category: r.category } : undefined}
                className="group flex items-center justify-between gap-3 bg-paper p-5 transition-colors hover:bg-concrete/60"
              >
                <span className="text-[13px] leading-snug text-ink/85">{r.need}</span>
                <ArrowUpRight className="h-4 w-4 shrink-0 text-ink/35 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-ink" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-ink/10 bg-paper">
        <div className="container-x py-14 lg:py-20">
          <p className="eyebrow">Company enquiries</p>
          <h2 className="mt-3 font-display text-[clamp(1.7rem,3vw,2.4rem)] font-semibold tracking-[-0.03em] text-ink">
            Choose the right group company.
          </h2>
          <p className="mt-3 max-w-2xl text-[13px] leading-relaxed text-slate">
            Individual company contacts have not been supplied yet. These links route enquiries to the group
            desk by category.
          </p>
          <div className="mt-7 grid gap-px bg-ink/10 sm:grid-cols-2 lg:grid-cols-4">
            {companies.map((company) => (
              <article key={company.slug} className="bg-paper p-5">
                <p className="font-mono text-[9px] uppercase tracking-[0.14em] text-slate/70">
                  {company.status}
                </p>
                <h3 className="mt-2 text-[14px] font-semibold leading-snug text-ink">{company.name}</h3>
                <div className="mt-4 flex flex-wrap gap-4 text-[10px] font-semibold uppercase tracking-[0.1em]">
                  <Link
                    to="/companies/$company"
                    params={{ company: company.slug }}
                    className="text-slate hover:text-orange"
                  >
                    Profile
                  </Link>
                  <Link
                    to="/quote"
                    search={{ category: companyEnquiryCategories[company.slug] }}
                    className="text-ink hover:text-orange"
                  >
                    Enquire
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}