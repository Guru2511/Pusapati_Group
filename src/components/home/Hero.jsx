import React, { useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Image } from "@/components/ui/image";
import { IMG } from "@/data/group";

const slides = [
  { src: IMG.quarry, label: "Quarry & aggregates", kicker: "Engine 01" },
  { src: IMG.concrete, label: "Engineered concrete", kicker: "Engine 01" },
  { src: IMG.candeur, label: "Structure & skyline", kicker: "Engine 03" },
  { src: IMG.anaya, label: "Anaya villas", kicker: "Engine 04" },
];

const ticker = [
  "Materials & manufacturing",
  "Trade & technology",
  "Real estate & hospitality",
  "Digital infrastructure",
];

const ease = [0.16, 1, 0.3, 1];

export default function Hero() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const ref = useRef(null);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const parallax = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 70]);

  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => setIndex((v) => (v + 1) % slides.length), 5400);
    return () => clearInterval(t);
  }, [paused]);

  const line = (content, delay) => (
    <span className="block overflow-hidden pb-[0.06em]">
      <motion.span
        className="block"
        initial={reduce ? false : { y: "112%" }}
        animate={{ y: 0 }}
        transition={{ duration: 1.05, delay, ease }}
      >
        {content}
      </motion.span>
    </span>
  );

  return (
    <section ref={ref} className="relative overflow-hidden bg-paper">
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute -left-40 -top-24 h-[520px] w-[520px] rounded-full bg-orange/15 blur-[150px]" />
        <div className="absolute right-0 top-32 h-[420px] w-[420px] rounded-full bg-blue/10 blur-[150px]" />
        <div className="absolute inset-0 blueprint-light opacity-50" />
      </div>

      <div className="container-x relative">
        <div className="grid items-center gap-12 pb-12 pt-8 lg:grid-cols-12 lg:gap-8 lg:pb-20 lg:pt-14">
          <div className="lg:col-span-6">
            <motion.div
              initial={reduce ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease }}
              className="inline-flex items-center gap-2.5 rounded-full border border-ink/10 bg-white/70 px-3.5 py-1.5 backdrop-blur"
            >
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-orange opacity-60" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-orange" />
              </span>
              <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink/70">
                Eight companies · Four engines
              </span>
            </motion.div>

            <h1 className="mt-6 font-heading text-[clamp(2.55rem,6.2vw,4.9rem)] font-semibold leading-[0.92] tracking-[-0.045em] text-ink">
              {line("Building", 0.05)}
              {line("foundations,", 0.13)}
              {line(
                <>
                  <span className="text-orange">forging</span> futures.
                </>,
                0.21
              )}
            </h1>

            <motion.p
              initial={reduce ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.35, ease }}
              className="mt-6 max-w-[47ch] text-[16px] leading-[1.7] text-slate sm:text-[17px]"
            >
              From the quarry to the skyline to the stay: eight Pusapati Group companies make, supply,
              build and manage what India builds next.
            </motion.p>

            <motion.div
              initial={reduce ? false : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.45, ease }}
              className="mt-8 flex flex-wrap items-center gap-3"
            >
              <a
                href="#engines"
                className="group inline-flex min-h-[52px] items-center gap-2.5 rounded-full bg-ink px-7 text-[11px] font-semibold uppercase tracking-[0.14em] text-paper transition-all duration-300 hover:bg-orange hover:text-ink"
              >
                Explore the Group
                <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
              <Link
                to="/quote"
                className="group inline-flex min-h-[52px] items-center gap-2.5 rounded-full border border-ink/15 bg-white/60 px-7 text-[11px] font-semibold uppercase tracking-[0.14em] text-ink backdrop-blur transition-all duration-300 hover:border-ink hover:bg-white"
              >
                Get a Quote
                <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </Link>
            </motion.div>

            <motion.dl
              initial={reduce ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.6 }}
              className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-ink/10 pt-5"
            >
              {[
                ["8", "companies"],
                ["4", "business engines"],
                ["250", "TPH crushing"],
              ].map(([value, label]) => (
                <div key={label} className="flex items-baseline gap-2">
                  <dt className="font-heading text-[20px] font-semibold tracking-tight text-ink">{value}</dt>
                  <dd className="font-mono text-[9.5px] uppercase tracking-[0.16em] text-slate">{label}</dd>
                </div>
              ))}
            </motion.dl>
          </div>

          <motion.div style={{ y: parallax }} className="lg:col-span-6">
            <div className="relative">
              <motion.div
                initial={reduce ? false : { opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.2, ease }}
                className="relative overflow-hidden rounded-[26px] border border-ink/10 bg-concrete shadow-lift"
                onMouseEnter={() => setPaused(true)}
                onMouseLeave={() => setPaused(false)}
              >
                <div className="relative aspect-[4/5] w-full sm:aspect-[16/12] lg:aspect-[4/4.4]">
                  {slides.map((s, i) => (
                    <div
                      key={s.label}
                      className={`absolute inset-0 transition-opacity duration-[1400ms] ${
                        i === index ? "opacity-100" : "opacity-0"
                      }`}
                      aria-hidden={i !== index}
                    >
                      <Image
                        src={s.src}
                        alt={s.label}
                        className={`h-full w-full object-cover transition-transform duration-[6000ms] ease-out ${
                          i === index ? "scale-105" : "scale-100"
                        }`}
                        fittingType="fill"
                      />
                    </div>
                  ))}
                  <div
                    className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/75 via-ink/10 to-transparent"
                    aria-hidden="true"
                  />

                  <div className="absolute left-4 top-4">
                    <span className="rounded-full border border-paper/25 bg-ink/40 px-3 py-1.5 font-mono text-[9px] uppercase tracking-[0.18em] text-paper/80 backdrop-blur">
                      {slides[index].kicker}
                    </span>
                  </div>

                  <div className="absolute bottom-0 left-0 right-0 flex items-end justify-between gap-4 p-5">
                    <div>
                      <p className="text-[16px] font-medium tracking-tight text-paper">
                        {slides[index].label}
                      </p>
                      <p className="mt-1 font-mono text-[9px] uppercase tracking-[0.18em] text-paper/55">
                        Group operations
                      </p>
                    </div>
                    <div className="flex items-center gap-1.5">
                      {slides.map((s, i) => (
                        <button
                          key={s.label}
                          type="button"
                          onClick={() => setIndex(i)}
                          aria-label={`Show ${s.label}`}
                          aria-pressed={i === index}
                          className={`h-1.5 rounded-full transition-all duration-300 ${
                            i === index ? "w-7 bg-orange" : "w-2.5 bg-paper/50 hover:bg-paper"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={reduce ? false : { opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.7, ease }}
                className="absolute -bottom-7 left-4 hidden w-[220px] rounded-2xl border border-ink/10 bg-paper/95 p-4 shadow-lift backdrop-blur sm:left-6 sm:block"
              >
                <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-slate">Programme volume</p>
                <p className="mt-1.5 font-heading text-[24px] font-semibold leading-none tracking-tight text-ink">
                  4.3 Lakh+ <span className="text-[13px] font-medium text-slate">m³</span>
                </p>
                <p className="mt-1.5 text-[11.5px] leading-snug text-slate">Ongoing concrete supply</p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="pg-marquee-wrap mask-fade-x relative overflow-hidden border-y border-ink/10 bg-white/50 py-3.5">
        <div className="pg-marquee flex w-max items-center gap-7">
          {[...ticker, ...ticker, ...ticker, ...ticker].map((t, i) => (
            <span key={`${t}-${i}`} className="flex items-center gap-7">
              <span className="font-mono text-[9.5px] uppercase tracking-[0.24em] text-ink/45">{t}</span>
              <span className="h-1 w-1 rounded-full bg-orange/70" aria-hidden="true" />
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}