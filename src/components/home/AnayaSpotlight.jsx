import React from "react";
import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { Image } from "@/components/ui/image";
import Reveal from "@/components/site/Reveal";
import { IMG } from "@/data/group";

const features = [
  "300 sq yd freehold plots · 2,528 sq ft built-up",
  "Private pools with landscaped decks",
  "Convention centre for events and gatherings",
  "Designed around light, privacy and sightlines",
  "Group-built structure and material chain",
  "Managed stays with hospitality housekeeping",
];

export default function AnayaSpotlight() {
  return (
    <section className="relative overflow-hidden bg-ink text-paper">
      <div
        className="pointer-events-none absolute -left-24 top-10 h-[420px] w-[420px] rounded-full bg-gold/20 blur-[140px]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -right-24 bottom-0 h-[380px] w-[380px] rounded-full bg-orange/20 blur-[140px]"
        aria-hidden="true"
      />
      <div className="blueprint-dark relative">
        <div className="container-x section-y">
          <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
            <Reveal className="lg:col-span-6">
              <div className="relative">
                <div className="relative aspect-[4/5] overflow-hidden rounded-[26px] border border-paper/10 bg-ink/40 sm:aspect-[4/3] lg:aspect-[4/4.6]">
                  <Image
                    src={IMG.anaya}
                    alt="Anaya villa at dusk"
                    className="h-full w-full object-cover"
                  />
                  <div
                    className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-transparent"
                    aria-hidden="true"
                  />
                  <span className="absolute bottom-4 left-4 rounded-full border border-paper/25 bg-ink/40 px-3 py-1.5 font-mono text-[9px] uppercase tracking-[0.2em] text-paper/80 backdrop-blur">
                    Anaya Exclusive Villas
                  </span>
                </div>
                <div className="absolute -bottom-8 -right-4 hidden w-40 overflow-hidden rounded-2xl border-4 border-ink sm:block lg:w-52">
                  <div className="aspect-[3/4]">
                    <Image src={IMG.pool} alt="Private pool terrace" className="h-full w-full object-cover" />
                  </div>
                </div>
              </div>
            </Reveal>

            <div className="lg:col-span-6 lg:pl-6">
              <div className="flex items-center gap-3">
                <span className="h-1.5 w-1.5 rounded-full bg-gold" aria-hidden="true" />
                <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-gold">
                  Hospitality & villas
                </span>
              </div>
              <h2 className="mt-5 max-w-[20ch] font-heading text-[clamp(2.1rem,4.4vw,3.5rem)] font-semibold leading-[0.98] tracking-[-0.04em] text-paper">
                A private pool.
                <br />A quieter kind of luxury.
              </h2>
              <p className="mt-6 max-w-lg text-[15px] leading-[1.75] text-paper/60">
                Anaya is BrikBuild Hospitality's villa collection — a limited set of private-pool
                residences designed around light and privacy, built by the group and managed with
                hospitality-grade service.
              </p>

              <ul className="mt-8 grid gap-2.5 sm:grid-cols-2">
                {features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-[13px] leading-relaxed text-paper/70">
                    <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-gold" aria-hidden="true" />
                    {f}
                  </li>
                ))}
              </ul>

              <div className="mt-9 flex flex-wrap gap-3">
                <Link
                  to="/quote"
                  search={{ category: "villas" }}
                  className="group inline-flex min-h-[50px] items-center gap-2.5 rounded-full bg-orange px-6 text-[11px] font-semibold uppercase tracking-[0.14em] text-ink transition-all duration-300 hover:bg-[#c95f10] hover:shadow-glowOrange"
                >
                  Book a site visit
                  <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </Link>
                <a
                  href="https://brikbuild.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex min-h-[50px] items-center gap-2.5 rounded-full border border-paper/25 bg-paper/5 px-6 text-[11px] font-semibold uppercase tracking-[0.14em] text-paper backdrop-blur transition-all duration-300 hover:border-paper hover:bg-paper hover:text-ink"
                >
                  Explore Anaya
                  <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </a>
              </div>

              <p className="mt-6 font-mono text-[9.5px] uppercase tracking-[0.16em] text-paper/35">
                Indicative price from ₹2.5 Cr · site visits by appointment
              </p>
              <p className="mt-2 text-[10px] leading-relaxed text-paper/35">
                Price and property specifications are from the draft group brief and must be reconfirmed before publication.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}