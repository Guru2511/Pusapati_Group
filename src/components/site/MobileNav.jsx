import React, { useState } from "react";
import { Link } from "@tanstack/react-router";
import { ChevronDown, ArrowUpRight } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import Logo from "@/components/site/Logo";
import { engines, companiesByEngine, CONTACT } from "@/data/group";

const links = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Products & Quality", to: "/products" },
  { label: "Our Work", to: "/work" },
  { label: "Vision 2032", to: "/vision-2032" },
  { label: "Vendors", to: "/vendors" },
  { label: "Investors", to: "/investors" },
  { label: "Careers", to: "/careers" },
  { label: "Contact", to: "/contact" },
];

export default function MobileNav({ open, onOpenChange }) {
  const [companiesOpen, setCompaniesOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        className="w-[92vw] max-w-md overflow-y-auto border-l border-ink/10 bg-paper p-0"
      >
        <SheetHeader className="border-b border-ink/10 px-5 py-5 text-left">
          <SheetTitle className="sr-only">Menu</SheetTitle>
          <Logo />
        </SheetHeader>

        <nav className="px-5 pb-10 pt-2" aria-label="Mobile navigation">
          <button
            type="button"
            onClick={() => setCompaniesOpen((v) => !v)}
            aria-expanded={companiesOpen}
            className="flex w-full items-center justify-between border-b border-ink/10 py-4 text-left text-[17px] font-medium tracking-tight text-ink"
          >
            Companies
            <ChevronDown
              className={`h-4 w-4 text-slate transition-transform duration-300 ${
                companiesOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {companiesOpen && (
            <div className="space-y-6 border-b border-ink/10 py-5">
              {engines.map((engine) => (
                <div key={engine.id}>
                  <p
                    className="font-mono text-[10px] uppercase tracking-[0.18em]"
                    style={{ color: engine.accent }}
                  >
                    {engine.index} — {engine.name}
                  </p>
                  <ul className="mt-2.5 space-y-1">
                    {companiesByEngine(engine.id).map((c) => (
                      <li key={c.slug}>
                        <Link
                          to="/companies/$company"
                          params={{ company: c.slug }}
                          onClick={() => onOpenChange(false)}
                          className="block rounded-lg py-1.5 text-[14.5px] text-ink/75"
                        >
                          {c.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}

          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              onClick={() => onOpenChange(false)}
              className="flex items-center justify-between border-b border-ink/10 py-4 text-[17px] font-medium tracking-tight text-ink transition-colors hover:text-orange"
            >
              {l.label}
              <ArrowUpRight className="h-4 w-4 text-slate" />
            </Link>
          ))}

          <Link
            to="/quote"
            onClick={() => onOpenChange(false)}
            className="mt-7 flex min-h-[52px] items-center justify-center gap-2 rounded-full bg-orange text-[11px] font-semibold uppercase tracking-[0.14em] text-ink"
          >
            Get a quote
            <ArrowUpRight className="h-4 w-4" />
          </Link>

          <div className="mt-8 rounded-2xl border border-ink/10 bg-white/60 p-5">
            <p className="eyebrow">Enquiries</p>
            <a href={`tel:${CONTACT.phone.replace(/\s/g, "")}`} className="mt-2 block text-[16px] font-medium text-ink">
              {CONTACT.phone}
            </a>
            <a href={`mailto:${CONTACT.email}`} className="mt-1 block text-[13.5px] text-slate">
              {CONTACT.email}
            </a>
            <a
              href={CONTACT.whatsapp}
              target="_blank"
              rel="noreferrer noopener"
              className="mt-1 block text-[13.5px] text-slate"
            >
              Message us on WhatsApp
            </a>
          </div>
        </nav>
      </SheetContent>
    </Sheet>
  );
}