import { createFileRoute } from "@tanstack/react-router";
import PageHero from "@/components/site/PageHero";
import { CONTACT } from "@/data/group";

export const Route = createFileRoute("/_site/terms")({
  component: TermsPage,
  head: () => ({
    meta: [
      { title: "Terms of Use — Pusapati Group" },
      {
        name: "description",
        content:
          "Terms governing use of the Pusapati Group website, including content accuracy, enquiries, intellectual property and limitation of liability.",
      },
    ],
  }),
});

const sections = [
  {
    title: "Website content",
    body: "Content on this site is provided for general information. Company descriptions, capacities, project references and figures are supplied by the group and may be revised. Figures marked as pending verification are not warranted as current or audited.",
  },
  {
    title: "Enquiries and quotations",
    body: "Submitting an enquiry does not create a contract, reserve capacity or guarantee pricing. Supply is governed only by a written quotation, purchase order or contract issued by the relevant group company.",
  },
  {
    title: "Project references",
    body: "Project names and descriptions are indicative of works undertaken or supplied. Client names, performance percentages and testimonials are not published without approval and are not implied by this site.",
  },
  {
    title: "Forward-looking statements",
    body: "Vision 2032 and related content describes intended direction. Planned ventures, expansion and capacity additions are subject to approvals, capital availability and market conditions, and are not commitments or projections of financial performance.",
  },
  {
    title: "Intellectual property",
    body: "The Pusapati Group name, site design and original content are the property of the group. Imagery used on this site is generated or licensed for representation and may not be reproduced without permission.",
  },
  {
    title: "Limitation of liability",
    body: "The group is not liable for loss arising from reliance on general website content. Technical decisions must be based on project-specific documentation issued by the relevant company.",
  },
];

function TermsPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Terms of Use."
        intro="These terms govern use of this website. They are a working draft pending legal review and will be finalised before launch."
        meta={[
          { label: "Applies to", value: "This website" },
          { label: "Status", value: "Draft" },
        ]}
      />

      <section className="bg-paper">
        <div className="container-x py-14 lg:py-20">
          <div className="max-w-3xl space-y-10">
            {sections.map((s, i) => (
              <div key={s.title} className="border-t border-ink/10 pt-6">
                <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-orange">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <h2 className="mt-2 text-[20px] font-semibold tracking-tight text-ink">{s.title}</h2>
                <p className="mt-3 text-[15px] leading-[1.85] text-slate">{s.body}</p>
              </div>
            ))}

            <div className="border border-ink/12 bg-concrete/50 p-5">
              <p className="text-[12px] leading-relaxed text-slate">
                Questions about these terms: {CONTACT.email}. Governing law and jurisdiction will be
                confirmed on legal review.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}