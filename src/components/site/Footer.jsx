import React from "react";
import { Link } from "@tanstack/react-router";
import { ArrowUpRight, MessageCircle } from "lucide-react";
import Logo from "@/components/site/Logo";
import { companies, engines } from "@/data/group";
import { usePublicContact } from "@/lib/site-preview";

const quickLinks = [
  { label: "About the group", to: "/about" },
  { label: "Products & quality", to: "/products" },
  { label: "Our work", to: "/work" },
  { label: "Vision 2032", to: "/vision-2032" },
  { label: "Vendors", to: "/vendors" },
  { label: "Investors", to: "/investors" },
  { label: "Careers", to: "/careers" },
  { label: "Contact", to: "/contact" },
  { label: "News & insights", to: "/insights" },
];

const heading = "font-mono text-[10px] uppercase tracking-[0.22em] text-paper/40";
const item = "text-[14px] text-paper/65 transition-colors duration-300 hover:text-orange";

export default function Footer() {
  const contact = usePublicContact();
  return (
    <footer className="relative overflow-hidden bg-ink text-paper">
      <div
        className="pointer-events-none absolute -left-32 top-0 h-[420px] w-[420px] rounded-full bg-orange/20 blur-[130px]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -right-24 bottom-0 h-[360px] w-[360px] rounded-full bg-blue/20 blur-[130px]"
        aria-hidden="true"
      />
      <div className="blueprint-dark relative">
        <div className="container-x pb-10 pt-16 lg:pt-20">
          <div className="grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <Logo dark />
              <p className="mt-6 max-w-sm text-[15px] leading-relaxed text-paper/55">
                An integrated Indian building group — quarry to skyline to stay, across eight companies
                and four business engines.
              </p>
              <a
                href={`mailto:${contact.email}`}
                className="mt-7 block text-[17px] font-medium tracking-tight text-paper transition-colors hover:text-orange"
              >
                {contact.email}
              </a>
              <p className="mt-1 text-[10px] leading-relaxed text-paper/35">{contact.emailNote}.</p>
              <Link
                to="/quote"
                className="group mt-6 inline-flex min-h-[46px] items-center gap-2 rounded-full bg-orange px-6 text-[11px] font-semibold uppercase tracking-[0.12em] text-ink transition-all duration-300 hover:bg-[#c95f10] hover:shadow-glowOrange"
              >
                Start an enquiry
                <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </Link>
              <a
                href={contact.whatsapp}
                target="_blank"
                rel="noreferrer noopener"
                className="mt-3 inline-flex min-h-[44px] items-center gap-2 rounded-full border border-paper/25 px-5 text-[11px] font-semibold uppercase tracking-[0.12em] text-paper transition-colors hover:border-paper hover:bg-paper hover:text-ink"
              >
                <MessageCircle className="h-4 w-4" aria-hidden="true" />
                WhatsApp the group
              </a>
            </div>

            <div className="grid gap-10 sm:grid-cols-2 lg:col-span-8 lg:grid-cols-3">
              <div>
                <p className={heading}>Companies</p>
                <ul className="mt-5 space-y-2.5">
                  {companies.map((c) => (
                    <li key={c.slug}>
                      <Link to="/companies/$company" params={{ company: c.slug }} className={item}>
                        {c.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <p className={heading}>Engines</p>
                <ul className="mt-5 space-y-2.5">
                  {engines.map((e) => (
                    <li key={e.id}>
                      <Link to="/companies" hash={e.id} className={item}>
                        {e.name}
                      </Link>
                    </li>
                  ))}
                </ul>

                <p className={`${heading} mt-8`}>Navigate</p>
                <ul className="mt-5 space-y-2.5">
                  {quickLinks.slice(0, 4).map((l) => (
                    <li key={l.to}>
                      <Link to={l.to} className={item}>
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <p className={heading}>Corporate office</p>
                <address className="mt-5 space-y-1 text-[14px] not-italic leading-relaxed text-paper/65">
                  {contact.addressLines.map((line) => <span key={line} className="block">{line}</span>)}
                </address>
                <a
                  href={`tel:${contact.phone.replace(/\s/g, "")}`}
                  className="mt-4 block text-[15px] font-medium text-paper transition-colors hover:text-orange"
                >
                  {contact.phone}
                </a>
                <p className="mt-4 text-[11.5px] leading-relaxed text-paper/30">
                  {contact.phoneNote}; confirm before launch.
                </p>

                <p className={`${heading} mt-7`}>Social</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  <a
                    href="https://www.instagram.com/pusapati_industrial_pvt.ltd?rpxt=bjBrb3AybDMycjdx"
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-full border border-paper/15 px-3 py-1.5 text-[11px] text-paper/65 transition-colors hover:border-orange hover:text-orange"
                  >
                    Instagram
                  </a>
                  {["LinkedIn", "YouTube", "X"].map((s) => (
                    <span
                      key={s}
                      className="rounded-full border border-paper/15 px-3 py-1.5 text-[11px] text-paper/40"
                      title="Profile link to be published"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-16 select-none overflow-hidden border-t border-paper/10 pt-8">
            <p className="whitespace-nowrap font-heading text-[clamp(2.6rem,11vw,9rem)] font-semibold leading-[0.85] tracking-[-0.05em] text-paper/[0.07]">
              Pusapati Group
            </p>
          </div>

          <div className="mt-6 flex flex-col gap-5 border-t border-paper/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-[12px] text-paper/40">
              © {new Date().getFullYear()} Pusapati Group. All rights reserved.
            </p>
            <div className="flex flex-wrap items-center gap-6">
              {quickLinks.slice(4).map((l) => (
                <Link
                  key={l.to}
                  to={l.to}
                  className="text-[12px] text-paper/50 transition-colors hover:text-paper"
                >
                  {l.label}
                </Link>
              ))}
              <Link to="/privacy" className="text-[12px] text-paper/50 transition-colors hover:text-paper">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-[12px] text-paper/50 transition-colors hover:text-paper">
                Terms
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}