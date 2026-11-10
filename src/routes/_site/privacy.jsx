import { createFileRoute } from "@tanstack/react-router";
import PageHero from "@/components/site/PageHero";
import { usePublicContact } from "@/lib/site-preview";

export const Route = createFileRoute("/_site/privacy")({
  component: PrivacyPage,
  head: () => ({
    meta: [
      { title: "Privacy Policy — Pusapati Group" },
      {
        name: "description",
        content:
          "How Pusapati Group handles information submitted through this website, including enquiries, vendor registrations, applications and investor requests.",
      },
    ],
  }),
});

const sections = [
  {
    title: "What this site collects",
    body: "When you submit a form, we collect the details you enter: name, phone, email, company, location, requirement details, vendor documents information, job application details or investor request details. We also receive standard technical data such as browser type and pages visited.",
  },
  {
    title: "Why we collect it",
    body: "To respond to your enquiry, route it to the relevant group company, evaluate vendor registration, process job applications, and respond to investor information requests. We do not sell personal data.",
  },
  {
    title: "Who sees it",
    body: "Submissions are visible to the group's enquiry desk and the relevant company team. Access is restricted to authorised personnel. Information is shared with third parties only where required by law or with your consent.",
  },
  {
    title: "How long we keep it",
    body: "Enquiry records are retained while the enquiry is active and for a reasonable period afterwards for reference. Vendor and application records may be retained longer for evaluation and statutory purposes.",
  },
  {
    title: "Cookies and analytics",
    body: "This site may use basic cookies required for it to function. Any analytics or advertising tools added later will be disclosed and, where required, subject to consent.",
  },
  {
    title: "Your choices",
    body: "You can request access, correction or deletion of the information you submitted by writing to the contact address below. We will respond within a reasonable period, subject to statutory retention obligations.",
  },
];

function PrivacyPage() {
  const contact = usePublicContact();
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Privacy Policy."
        intro="This policy explains how information submitted through this website is handled. It is a working draft pending legal review and will be updated before launch."
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
                Contact for privacy requests: {contact.email} · {contact.phone}. Office address is pending
                publication. This document does not create rights beyond those available under applicable
                Indian law.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}