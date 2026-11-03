import React from "react";
import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import Reveal from "@/components/site/Reveal";

const points = [
  "Categories across materials, logistics, MEP and finishes",
  "One registration considered group-wide",
  "Documented RFQs, purchase orders and payment status",
  "Performance reviewed every cycle, not once",
];

export default function VendorCta() {
  return (
    <section className="relative overflow-hidden bg-orange text-ink">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.12]"
        aria-hidden="true"
        style={{
          backgroundImage:
            "linear-gradient(to right, #16181C 1px, transparent 1px), linear-gradient(to bottom, #16181C 1px, transparent 1px)",
          backgroundSize: "72px 72px",
        }}
      />
      <div className="container-x relative py-20 lg:py-24">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
          <Reveal className="lg:col-span-7">
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink/60">
              Vendor registration
            </p>
            <h2 className="mt-5 max-w-[18ch] font-display text-[clamp(2.2rem,4.6vw,3.8rem)] font-semibold leading-[0.98] tracking-[-0.04em] text-ink">
              Build with us.
              <br />
              Grow with us.
            </h2>
            <p className="mt-6 max-w-lg text-[15px] leading-[1.75] text-ink/75">
              Register once and connect with procurement opportunities across the group — from aggregates
              and plant to logistics, MEP and professional services.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/vendors"
                hash="register"
                className="group inline-flex min-h-[52px] items-center gap-2.5 bg-ink px-7 text-[11px] font-semibold uppercase tracking-[0.14em] text-paper transition-colors hover:bg-paper hover:text-ink"
              >
                Register as a Vendor
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
              <Link
                to="/vendors/portal"
                className="inline-flex min-h-[52px] items-center gap-2 border border-ink/35 px-7 text-[11px] font-semibold uppercase tracking-[0.14em] text-ink transition-colors hover:bg-ink/10"
              >
                Vendor portal preview
              </Link>
            </div>
          </Reveal>

          <Reveal delay={120} className="lg:col-span-5">
            <ul className="border-t border-ink/25">
              {points.map((p) => (
                <li key={p} className="border-b border-ink/25 py-4 text-[14px] leading-snug text-ink/85">
                  {p}
                </li>
              ))}
            </ul>
            <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.16em] text-ink/55">
              Verification required · No registration fee
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}