import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { Image } from "@/components/ui/image";
import PageHero from "@/components/site/PageHero";
import Reveal from "@/components/site/Reveal";
import VendorForm from "@/components/forms/VendorForm";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { IMG } from "@/data/group";
import { vendorBenefits, vendorCategories, vendorFaqs, vendorSteps } from "@/data/catalogue";

export const Route = createFileRoute("/_site/vendors/")({
  component: VendorsPage,
  head: () => ({
    meta: [
      { title: "Vendors — Pusapati Group" },
      {
        name: "description",
        content:
          "Register once and connect with procurement opportunities across the Pusapati Group — categories, onboarding process, FAQs and the vendor portal preview.",
      },
    ],
  }),
});

function VendorsPage() {
  return (
    <>
      <PageHero
        eyebrow="Vendors & procurement"
        title="Build with us. Grow with us."
        intro="Pusapati Group buys across aggregates, cement, steel, logistics, plant, MEP, finishes and professional services. Register once and be considered across the group's four engines."
        image={IMG.warehouse}
        imageAlt="Industrial warehouse with racking at dusk"
        meta={[
          { label: "Vendor categories", value: `${vendorCategories.length}` },
          { label: "Registration fee", value: "None" },
          { label: "Verification", value: "Document-led" },
          { label: "Portal", value: "Prototype" },
        ]}
      />

      {/* Process */}
      <section className="bg-paper">
        <div className="container-x py-16 lg:py-20">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="eyebrow">Onboarding</p>
              <h2 className="mt-3 font-display text-[clamp(1.8rem,3.2vw,2.6rem)] font-semibold leading-tight tracking-[-0.03em] text-ink">
                Six steps from enquiry to purchase order.
              </h2>
            </div>
            <p className="max-w-sm text-[11px] leading-relaxed text-slate">
              Timeline depends on document completeness and category. Registration does not guarantee
              business.
            </p>
          </div>

          <ol className="mt-10 grid gap-px bg-ink/10 sm:grid-cols-2 lg:grid-cols-3">
            {vendorSteps.map((s) => (
              <li key={s.index} className="bg-paper p-6">
                <div className="flex items-center gap-3">
                  <span className="grid h-7 w-7 place-items-center border border-ink/20 font-mono text-[10px] text-ink/70">
                    {s.index}
                  </span>
                  <span className="h-px flex-1 bg-ink/10" aria-hidden="true" />
                </div>
                <h3 className="mt-4 text-[15px] font-semibold tracking-tight text-ink">{s.title}</h3>
                <p className="mt-2 text-[13px] leading-relaxed text-slate">{s.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="border-y border-ink/10 bg-concrete">
        <div className="container-x py-14 lg:py-18">
          <p className="eyebrow">Portal rollout</p>
          <h2 className="mt-3 max-w-[24ch] font-display text-[clamp(1.8rem,3.2vw,2.6rem)] font-semibold leading-tight tracking-[-0.03em] text-ink">
            Registration first. Procurement tools in phases.
          </h2>
          <p className="mt-3 max-w-2xl text-[13px] leading-relaxed text-slate">
            The portal is currently a labelled frontend preview, not a live vendor account system. The
            schedule below is the roadmap from the group brief, not a delivery commitment.
          </p>
          <ol className="mt-8 grid gap-px bg-ink/10 md:grid-cols-3">
            {[
              {
                phase: "At launch",
                title: "Registration & approval",
                detail: "Collect vendor applications and complete procurement review.",
              },
              {
                phase: "Target: +2 months",
                title: "RFQs & purchase orders",
                detail: "Add vendor login, quote submission and PO workflows.",
              },
              {
                phase: "Target: +4 months",
                title: "Payments & integrations",
                detail: "Plan invoice/payment status, accounting sync and the BrikBox catalogue link.",
              },
            ].map((item) => (
              <li key={item.phase} className="bg-paper p-6">
                <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-orange">{item.phase}</p>
                <h3 className="mt-3 text-[15px] font-semibold tracking-tight text-ink">{item.title}</h3>
                <p className="mt-2 text-[12px] leading-relaxed text-slate">{item.detail}</p>
              </li>
            ))}
          </ol>
          <p className="mt-5 max-w-3xl text-[11px] leading-relaxed text-slate/80">
            Secure, encrypted KYC and bank-document upload is not enabled. Do not send sensitive documents
            through this form; the procurement team will advise on an approved channel. Portal storage must be
            reviewed for DPDP Act, 2023 compliance before that feature is enabled.
          </p>
        </div>
      </section>

      {/* Benefits + categories */}
      <section className="border-y border-ink/10 bg-concrete">
        <div className="container-x py-16 lg:py-20">
          <div className="grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <p className="eyebrow">Why register</p>
              <div className="mt-6 grid gap-5 sm:grid-cols-2">
                {vendorBenefits.map((b, i) => (
                  <Reveal key={b.title} delay={i * 60} className="border-t border-ink/20 pt-4">
                    <h3 className="text-[15px] font-semibold tracking-tight text-ink">{b.title}</h3>
                    <p className="mt-2 text-[13px] leading-relaxed text-slate">{b.body}</p>
                  </Reveal>
                ))}
              </div>
            </div>

            <div className="lg:col-span-5">
              <p className="eyebrow">Vendor categories</p>
              <ul className="mt-6 border-t border-ink/20">
                {vendorCategories.map((c) => (
                  <li key={c} className="flex items-center justify-between border-b border-ink/15 py-3">
                    <span className="text-[14px] text-ink/85">{c}</span>
                    <span className="font-mono text-[9px] uppercase tracking-[0.14em] text-slate/60">
                      Open
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Registration */}
      <section id="register" className="scroll-mt-24 bg-paper">
        <div className="container-x py-16 lg:py-24">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-7">
              <p className="eyebrow">Register</p>
              <h2 className="mt-3 font-display text-[clamp(1.8rem,3.2vw,2.6rem)] font-semibold leading-tight tracking-[-0.03em] text-ink">
                Vendor registration.
              </h2>
              <p className="mt-3 max-w-lg text-[14px] leading-relaxed text-slate">
                Submit your company details. The procurement team follows up with the document checklist for
                your category.
              </p>
              <div className="mt-8">
                <VendorForm />
              </div>
            </div>

            <aside className="lg:col-span-5">
              <div className="lg:sticky lg:top-28 space-y-6">
                <div className="border border-ink/12 bg-ink p-6 text-paper">
                  <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-paper/45">
                    Vendor portal
                  </p>
                  <h3 className="mt-3 text-[18px] font-semibold tracking-tight">
                    See how the portal works.
                  </h3>
                  <p className="mt-2 text-[13px] leading-relaxed text-paper/60">
                    A prototype of the intended vendor workspace — dashboard, KYC documents, RFQs, purchase
                    orders and payment status. Clearly labelled sample data, no live records.
                  </p>
                  <Link
                    to="/vendors/portal"
                    className="mt-5 inline-flex min-h-[44px] items-center gap-2 border border-paper/30 px-5 text-[11px] font-semibold uppercase tracking-[0.14em] text-paper transition-colors hover:bg-paper hover:text-ink"
                  >
                    Open portal preview
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </Link>
                </div>

                <div className="border border-ink/12 p-6">
                  <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-slate">
                    Documents typically required
                  </p>
                  <ul className="mt-4 space-y-2 text-[13px] text-slate">
                    {[
                      "GST registration certificate",
                      "PAN",
                      "Category licences and certifications",
                      "Bank details on letterhead",
                      "Past supply references",
                    ].map((d) => (
                      <li key={d} className="flex gap-2.5">
                        <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-orange" />
                        {d}
                      </li>
                    ))}
                  </ul>
                  <p className="mt-4 text-[11px] leading-relaxed text-slate/70">
                    Document upload is not enabled on this site; the team requests files by email after
                    registration.
                  </p>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="border-t border-ink/10 bg-concrete">
        <div className="container-x py-16 lg:py-20">
          <div className="grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <p className="eyebrow">FAQ</p>
              <h2 className="mt-3 font-display text-[clamp(1.7rem,3vw,2.4rem)] font-semibold leading-tight tracking-[-0.03em] text-ink">
                Questions vendors ask.
              </h2>
            </div>
            <div className="lg:col-span-8">
              <Accordion type="single" collapsible className="border-t border-ink/15">
                {vendorFaqs.map((f, i) => (
                  <AccordionItem key={f.q} value={`faq-${i}`} className="border-b border-ink/15">
                    <AccordionTrigger className="py-4 text-left text-[15px] font-medium text-ink hover:no-underline">
                      {f.q}
                    </AccordionTrigger>
                    <AccordionContent className="pb-5 pr-8 text-[14px] leading-relaxed text-slate">
                      {f.a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}