import React from "react";
import { Image } from "@/components/ui/image";
import { cn } from "@/lib/utils";

export default function PageHero({
  eyebrow,
  title,
  intro,
  image,
  imageAlt,
  imageClassName,
  imageFit = "cover",
  meta,
  children,
  className,
}) {
  return (
    <section className={cn("relative isolate overflow-hidden bg-ink text-paper", className)}>
      {image ? (
        <div className="absolute inset-0 -z-10">
          <Image
            src={image}
            alt={imageAlt || ""}
            className={cn("h-full w-full scale-105 object-cover opacity-45", imageClassName)}
            fittingType={imageFit === "contain" ? "contain" : "fill"}
          />
          <div className="absolute inset-0 bg-gradient-to-br from-ink via-ink/85 to-ink/45" />
        </div>
      ) : (
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-ink via-[#171A20] to-[#23262C]" />
      )}

      <div className="pointer-events-none absolute inset-0 -z-10 blueprint-dark opacity-70" aria-hidden="true" />
      <div
        className="pointer-events-none absolute -right-20 -top-24 -z-10 h-[420px] w-[420px] rounded-full bg-orange/25 blur-[140px]"
        aria-hidden="true"
      />

      <div className="container-x relative pb-16 pt-14 sm:pb-20 lg:pb-24 lg:pt-20">
        <div>
          <div className="flex items-center gap-3 animate-in fade-in slide-in-from-bottom-2 duration-700">
            <span className="h-1.5 w-1.5 rounded-full bg-orange" aria-hidden="true" />
            <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-paper/60">{eyebrow}</span>
          </div>

          <h1 className="mt-6 max-w-[24ch] font-heading text-[clamp(2.4rem,6.4vw,5rem)] font-semibold leading-[0.96] tracking-[-0.04em] text-paper animate-in fade-in slide-in-from-bottom-4 duration-700">
            {title}
          </h1>

          {intro && (
            <p className="mt-6 max-w-2xl text-[16px] leading-[1.7] text-paper/65 animate-in fade-in slide-in-from-bottom-4 duration-700 [animation-delay:120ms]">
              {intro}
            </p>
          )}

          {children && <div className="mt-9 animate-in fade-in duration-700 [animation-delay:200ms]">{children}</div>}
        </div>

        {meta?.length ? (
          <dl className="mt-12 grid gap-3 border-t border-paper/15 pt-6 sm:grid-cols-2 lg:grid-cols-4">
            {meta.map((m) => (
              <div key={m.label} className="rounded-2xl border border-paper/12 bg-paper/5 px-4 py-3 backdrop-blur">
                <dt className="font-mono text-[9.5px] uppercase tracking-[0.2em] text-paper/45">{m.label}</dt>
                <dd className="mt-1.5 text-[13.5px] font-medium text-paper/90">{m.value}</dd>
              </div>
            ))}
          </dl>
        ) : null}
      </div>
    </section>
  );
}