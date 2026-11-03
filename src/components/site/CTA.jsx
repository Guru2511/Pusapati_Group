import React from "react";
import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

const base =
  "group inline-flex min-h-[48px] items-center justify-center gap-2.5 rounded-full px-6 text-[11px] font-semibold uppercase tracking-[0.14em] transition-all duration-300";

const arrow =
  "h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5";

export function PrimaryLink({ to, children, className, ...rest }) {
  return (
    <Link
      to={to}
      className={cn(base, "bg-orange text-ink shadow-glowOrange hover:bg-[#c95f10]", className)}
      {...rest}
    >
      {children}
      <ArrowUpRight className={arrow} />
    </Link>
  );
}

export function GhostLink({ to, children, className, ...rest }) {
  return (
    <Link
      to={to}
      className={cn(
        base,
        "border border-ink/15 bg-white/60 text-ink backdrop-blur hover:border-ink hover:bg-ink hover:text-paper",
        className
      )}
      {...rest}
    >
      {children}
      <ArrowUpRight className={arrow} />
    </Link>
  );
}

export function GhostLinkOnDark({ to, children, className, ...rest }) {
  return (
    <Link
      to={to}
      className={cn(
        base,
        "border border-paper/25 bg-paper/5 text-paper backdrop-blur hover:border-paper hover:bg-paper hover:text-ink",
        className
      )}
      {...rest}
    >
      {children}
      <ArrowUpRight className={arrow} />
    </Link>
  );
}

export function TextLink({ to, children, className, ...rest }) {
  return (
    <Link
      to={to}
      className={cn(
        "group inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-ink",
        className
      )}
      {...rest}
    >
      <span className="link-underline">{children}</span>
      <ArrowUpRight className={arrow} />
    </Link>
  );
}