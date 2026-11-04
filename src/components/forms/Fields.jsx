import React from "react";
import { ArrowUpRight, Check, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

const fieldBase =
  "min-h-[48px] w-full border border-ink/15 bg-paper px-4 py-3 text-[15px] text-ink placeholder:text-slate/50 transition-colors focus:border-orange focus:outline-none focus:ring-0";

export function Field({ label, htmlFor, required, hint, children, className }) {
  return (
    <div className={cn("space-y-1.5", className)}>
      <label htmlFor={htmlFor} className="flex items-baseline justify-between gap-3">
        <span className="text-[12px] font-medium uppercase tracking-[0.1em] text-ink/70">
          {label}
          {required && <span className="ml-1 text-orange">*</span>}
        </span>
        {hint && <span className="font-mono text-[10px] text-slate/70">{hint}</span>}
      </label>
      {children}
    </div>
  );
}

export function TextInput({ className, ...props }) {
  return <input className={cn(fieldBase, className)} {...props} />;
}

export function TextArea({ className, rows = 4, ...props }) {
  return <textarea rows={rows} className={cn(fieldBase, "resize-y", className)} {...props} />;
}

export function SelectInput({ options, placeholder, className, children, ...props }) {
  return (
    <select className={cn(fieldBase, "appearance-none pr-10", className)} {...props}>
      {placeholder && <option value="">{placeholder}</option>}
      {options
        ? options.map((o) => {
            const value = typeof o === "string" ? o : o.value;
            const label = typeof o === "string" ? o : o.label;
            return (
              <option key={value} value={value}>
                {label}
              </option>
            );
          })
        : children}
    </select>
  );
}

export function SubmitButton({ pending, children = "Submit", className }) {
  return (
    <button
      type="submit"
      disabled={pending}
      className={cn(
        "group inline-flex min-h-[48px] items-center justify-center gap-2.5 bg-ink px-7 text-[12px] font-semibold uppercase tracking-[0.14em] text-paper transition-colors hover:bg-orange hover:text-ink disabled:cursor-not-allowed disabled:opacity-60",
        className
      )}
    >
      {pending ? (
        <>
          <Loader2 className="h-4 w-4 animate-spin" /> Sending
        </>
      ) : (
        <>
          {children}
          <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </>
      )}
    </button>
  );
}

export function FormError({ message }) {
  if (!message) return null;
  return (
    <p role="alert" className="border-l-2 border-destructive bg-destructive/5 px-3 py-2 text-[13px] text-destructive">
      {message}
    </p>
  );
}

export function SuccessPanel({ title, body, warning, onReset, resetLabel = "Send another enquiry" }) {
  return (
    <div className="border border-ink/10 bg-paper p-8">
      <span className="grid h-11 w-11 place-items-center rounded-full bg-orange/15">
        <Check className="h-5 w-5 text-orange" />
      </span>
      <h3 className="mt-5 font-display text-2xl font-semibold tracking-tight text-ink">{title}</h3>
      <p className="mt-3 max-w-md text-[15px] leading-relaxed text-slate">{body}</p>
      {warning && (
        <p role="alert" className="mt-4 max-w-md border-l-2 border-orange bg-orange/5 px-3 py-2 text-[13px] text-ink">
          {warning}
        </p>
      )}
      {onReset && (
        <button
          type="button"
          onClick={onReset}
          className="mt-6 text-[11px] font-semibold uppercase tracking-[0.14em] text-ink underline decoration-ink/30 underline-offset-4 hover:decoration-orange"
        >
          {resetLabel}
        </button>
      )}
    </div>
  );
}