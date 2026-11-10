import React from "react";
import { cn } from "@/lib/utils";

export default function Logo({ dark = false, compact = false, className }) {
  if (!dark) {
    return (
      <img
        src="/images/pipl-group-logo-final.png"
        alt=""
        className={cn("h-10 w-auto max-w-[190px] object-contain", className)}
      />
    );
  }

  return (
    <span className={cn("flex items-center gap-3", className)}>
      <span
        aria-hidden="true"
        className={cn(
          "relative grid h-9 w-9 shrink-0 place-items-center rounded-[11px]",
          "bg-paper text-ink"
        )}
      >
        <span className="absolute left-[11px] top-[10px] h-[17px] w-[2px] rounded-full bg-current" />
        <span className="absolute left-[11px] top-[10px] h-[2px] w-[10px] rounded-full bg-orange" />
        <span className="absolute left-[11px] top-[16px] h-[2px] w-[7px] rounded-full bg-orange" />
      </span>
      <span className="flex flex-col leading-none">
        <span
          className="text-[15px] font-semibold uppercase leading-none tracking-[0.16em]"
          style={{ color: "#FAF8F5" }}
        >
          Pusapati
        </span>
        {!compact && (
          <span
            className="mt-1.5 font-mono text-[9px] uppercase tracking-[0.34em]"
            style={{ color: "rgba(250,248,245,0.55)" }}
          >
            Group
          </span>
        )}
      </span>
    </span>
  );
}