import React from "react";
import { Link } from "@tanstack/react-router";
import {
  ArrowUpRight,
  Truck,
  Waves,
  Thermometer,
  Grid3x3,
  Droplets,
  Feather,
  Layers,
} from "lucide-react";
import Reveal from "@/components/site/Reveal";
import { specialConcretes } from "@/data/catalogue";

const icons = { Truck, Waves, Thermometer, Grid3x3, Droplets, Feather, Layers };

export default function ConcreteSection() {
  return (
    <section className="bg-paper">
      <div className="container-x section-y">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-28">
              <div className="flex items-center gap-3">
                <span className="h-1.5 w-1.5 rounded-full bg-orange" aria-hidden="true" />
                <span className="eyebrow">Specialty concrete</span>
              </div>
              <h2 className="mt-5 font-heading text-[clamp(2rem,3.6vw,3rem)] font-semibold leading-[1.03] tracking-[-0.04em] text-ink">
                Concrete, engineered
                <br />
                for the condition.
              </h2>
              <p className="mt-5 max-w-sm text-[15px] leading-[1.75] text-slate">
                Seven mix families, each specified for what the structure has to survive — heat, water,
                congestion, load or drainage. All produced to approved design mixes.
              </p>
              <Link
                to="/products"
                className="group mt-7 inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-ink"
              >
                <span className="link-underline">Product catalogue</span>
                <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </Link>
            </div>
          </div>

          <div className="lg:col-span-8">
            <div className="grid gap-3 sm:grid-cols-2">
              {specialConcretes.map((c, i) => {
                const Icon = icons[c.icon] || Layers;
                return (
                  <Reveal key={c.id} delay={i * 50}>
                    <Link
                      to="/quote"
                      search={{ category: "concrete" }}
                      className="group flex h-full flex-col rounded-2xl border border-ink/10 bg-white/60 p-5 backdrop-blur-sm transition-all duration-500 hover:-translate-y-1 hover:border-orange/30 hover:bg-white hover:shadow-soft"
                    >
                      <span className="grid h-10 w-10 place-items-center rounded-xl bg-orange/10 text-orange transition-colors duration-500 group-hover:bg-orange group-hover:text-paper">
                        <Icon className="h-[18px] w-[18px]" strokeWidth={1.6} aria-hidden="true" />
                      </span>
                      <h3 className="mt-4 font-heading text-[16.5px] font-semibold tracking-tight text-ink">
                        {c.name}
                      </h3>
                      <p className="mt-2 text-[12.5px] leading-relaxed text-slate">{c.summary}</p>
                      <p className="mt-auto pt-4 font-mono text-[9px] uppercase tracking-[0.16em] text-slate/70">
                        {c.bestFor}
                      </p>
                    </Link>
                  </Reveal>
                );
              })}

              <div className="relative flex flex-col justify-between overflow-hidden rounded-2xl bg-ink p-6 text-paper">
                <div
                  className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-orange/30 blur-3xl"
                  aria-hidden="true"
                />
                <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-paper/50">
                  Mix design support
                </p>
                <div className="relative">
                  <h3 className="mt-4 font-heading text-[18px] font-semibold leading-snug tracking-tight">
                    Need a mix outside this list?
                  </h3>
                  <p className="mt-2 text-[12.5px] leading-relaxed text-paper/60">
                    Send the structural requirement and pour conditions — our team will propose a design
                    mix and trial plan.
                  </p>
                  <Link
                    to="/quote"
                    search={{ category: "concrete" }}
                    className="group mt-5 inline-flex items-center gap-2 rounded-full bg-orange px-4 py-2.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-ink transition-colors hover:bg-[#c95f10]"
                  >
                    Talk to a concrete engineer
                    <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}