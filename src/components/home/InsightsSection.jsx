import React from "react";
import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import Reveal from "@/components/site/Reveal";
import { insights } from "@/data/catalogue";

export default function InsightsSection() {
  return (
    <section className="border-t border-ink/10 bg-paper">
      <div className="container-x py-20 lg:py-24">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <div className="flex items-center gap-3">
              <span className="h-px w-8 bg-orange" aria-hidden="true" />
              <span className="eyebrow">News & insights</span>
            </div>
            <h2 className="mt-5 font-display text-[clamp(1.9rem,3.4vw,2.8rem)] font-semibold leading-[1.05] tracking-[-0.03em] text-ink">
              Notes from the plant and the site.
            </h2>
          </div>
          <Link
            to="/insights"
            className="group inline-flex items-center gap-2 border-b border-ink/20 pb-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-ink hover:border-orange"
          >
            All insights
            <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        <div className="mt-10 grid gap-8 md:grid-cols-3">
          {insights.slice(0, 3).map((post, i) => (
            <Reveal key={post.id} delay={i * 80}>
              <Link to="/insights" hash={post.id} className="group block">
                <div className="h-px w-full bg-ink/15 transition-colors group-hover:bg-orange" />
                <div className="mt-4 flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.16em] text-slate">
                  <span>{post.category}</span>
                  <span className="h-1 w-1 rounded-full bg-slate/40" />
                  <span>{post.date}</span>
                </div>
                <h3 className="mt-3 text-[18px] font-semibold leading-snug tracking-tight text-ink group-hover:text-orange">
                  {post.title}
                </h3>
                <p className="mt-2.5 text-[13px] leading-relaxed text-slate">{post.excerpt}</p>
                <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.14em] text-slate/70">
                  {post.read}
                </p>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}