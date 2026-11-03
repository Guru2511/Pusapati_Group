import React, { useState } from "react";
import { Boxes, Home, Layers, MessageSquare, Mountain, Ship, Truck } from "lucide-react";
import { useIntake } from "@/hooks/useIntake";
import {
  Field,
  FormError,
  SelectInput,
  SubmitButton,
  SuccessPanel,
  TextArea,
  TextInput,
} from "@/components/forms/Fields";
import { specialConcretes } from "@/data/catalogue";
import { cn } from "@/lib/utils";

const categories = [
  { id: "concrete", label: "Concrete", blurb: "RMC & specialty mixes", icon: Truck },
  { id: "aggregates", label: "Aggregates", blurb: "Graded stone & M-sand", icon: Mountain },
  { id: "ggbs", label: "GGBS", blurb: "Planned plant; register interest", icon: Layers },
  { id: "construction_materials", label: "Construction materials", blurb: "Multi-category trade", icon: Boxes },
  { id: "villas", label: "Villas", blurb: "Anaya site visits", icon: Home },
  { id: "exports", label: "International exports", blurb: "Proposed export lines", icon: Ship },
  { id: "other", label: "Other enquiries", blurb: "Partnerships & general", icon: MessageSquare },
];

const timelines = [
  "Immediate (within 1 week)",
  "Within 1 month",
  "1–3 months",
  "Planning stage",
];

const extras = {
  concrete: [
    {
      name: "interest",
      label: "Concrete type",
      type: "select",
      placeholder: "Select concrete type",
      options: [...specialConcretes.map((concrete) => concrete.name), "Not sure yet"],
    },
    { name: "quantity", label: "Volume required", type: "text", placeholder: "e.g. 400 m³", hint: "m³" },
    { name: "pour_date", label: "Pour date", type: "date" },
    { name: "pour_time", label: "Pour time", type: "time" },
    {
      name: "pump_required",
      label: "Pump required?",
      type: "select",
      options: [
        { value: "yes", label: "Yes" },
        { value: "no", label: "No" },
        { value: "unsure", label: "Not sure" },
      ],
    },
  ],
  aggregates: [
    {
      name: "interest",
      label: "Material",
      type: "select",
      placeholder: "Select material",
      options: ["10 mm aggregate", "20 mm aggregate", "40 mm aggregate", "M-sand", "P-sand", "GSB", "Crusher dust"],
    },
    { name: "quantity", label: "Quantity / month", type: "text", placeholder: "e.g. 3,000 tonnes", hint: "tonnes" },
    { name: "timeline", label: "Requirement window", type: "select", options: timelines },
  ],
  ggbs: [
    { name: "interest", label: "Supply format", type: "select", options: ["Bulk tanker", "Bagged", "Both"] },
    { name: "quantity", label: "Quantity / month", type: "text", placeholder: "e.g. 500 tonnes", hint: "tonnes" },
    { name: "timeline", label: "Requirement window", type: "select", options: timelines },
  ],
  construction_materials: [
    { name: "interest", label: "Materials needed", type: "text", placeholder: "e.g. cement, TMT, blocks, waterproofing" },
    { name: "quantity", label: "Approximate value or volume", type: "text", placeholder: "e.g. ₹25 lakh / 1,200 bags" },
    { name: "timeline", label: "Requirement window", type: "select", options: timelines },
  ],
  villas: [
    {
      name: "interest",
      label: "Villa preference",
      type: "select",
      options: ["3 bedroom", "4 bedroom", "5 bedroom", "Custom / multiple villas", "Still exploring"],
    },
    {
      name: "timeline",
      label: "Site visit",
      type: "select",
      options: ["This week", "This month", "Later this quarter", "Prefer a call first"],
    },
    { name: "quantity", label: "Number of villas", type: "text", placeholder: "e.g. 1" },
  ],
  exports: [
    {
      name: "interest",
      label: "Product",
      type: "select",
      options: [
        "Seafood",
        "Food materials & ingredients",
        "Minerals",
        "Metals (zinc, cobalt, aluminium, iron ore)",
        "Stone & building materials",
      ],
    },
    { name: "location", label: "Destination country / port" },
    { name: "quantity", label: "Volume per shipment", type: "text", placeholder: "e.g. 1 x 20ft container" },
    {
      name: "incoterms",
      label: "Incoterms",
      type: "select",
      options: ["EXW", "FCA", "FOB", "CFR", "CIF", "DAP", "Other / to be agreed"],
    },
    { name: "timeline", label: "Shipment window", type: "select", options: timelines },
  ],
  other: [],
};

export default function QuoteForm({ initialCategory = "concrete" }) {
  const [category, setCategory] = useState(initialCategory);
  const [values, setValues] = useState({});
  const { state, error, run, reset, pending, done } = useIntake();

  const set = (name) => (e) => setValues((v) => ({ ...v, [name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    await run({
      type: "enquiry",
      name: String(data.get("name") || ""),
      phone: String(data.get("phone") || ""),
      email: String(data.get("email") || ""),
      company: String(data.get("company") || ""),
      location: String(values.location || ""),
      interest: String(values.interest || ""),
      quantity: String(values.quantity || ""),
      timeline: String(values.timeline || ""),
      pour_date: String(values.pour_date || ""),
      pour_time: String(values.pour_time || ""),
      pump_required: String(values.pump_required || "unsure"),
      incoterms: String(values.incoterms || ""),
      requirement: String(data.get("requirement") || ""),
      category,
      source_page: "/quote",
    });
  };

  if (done) {
    return (
      <SuccessPanel
        title="Enquiry received."
        body="Your requirement has reached the group enquiry desk. A team member will respond within one business day with specifications, availability and next steps."
        onReset={() => {
          setValues({});
          reset();
        }}
        resetLabel="Send another enquiry"
      />
    );
  }

  const fields = extras[category] || [];

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <fieldset>
        <legend className="text-[12px] font-medium uppercase tracking-[0.1em] text-ink/70">
          01 — What do you need? <span className="text-orange">*</span>
        </legend>
        <div className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((c) => {
            const Icon = c.icon;
            const active = category === c.id;
            return (
              <button
                key={c.id}
                type="button"
                onClick={() => {
                  setCategory(c.id);
                  setValues({});
                }}
                aria-pressed={active}
                className={cn(
                  "flex items-start gap-3 border p-3.5 text-left transition-colors",
                  active
                    ? "border-orange bg-orange/5"
                    : "border-ink/12 hover:border-ink/30 hover:bg-concrete/50"
                )}
              >
                <Icon
                  className={cn("mt-0.5 h-4 w-4 shrink-0", active ? "text-orange" : "text-slate")}
                  strokeWidth={1.6}
                  aria-hidden="true"
                />
                <span>
                  <span className="block text-[13px] font-semibold leading-tight text-ink">{c.label}</span>
                  <span className="mt-0.5 block text-[11px] leading-snug text-slate">{c.blurb}</span>
                </span>
              </button>
            );
          })}
        </div>
      </fieldset>

      <fieldset className="space-y-4">
        <legend className="text-[12px] font-medium uppercase tracking-[0.1em] text-ink/70">
          02 — Requirement
        </legend>

        <div className="grid gap-4 sm:grid-cols-2">
          {fields.map((f) =>
            f.type === "select" ? (
              <Field key={f.name} label={f.label} htmlFor={f.name}>
                <SelectInput
                  id={f.name}
                  name={f.name}
                  value={values[f.name] || ""}
                  onChange={set(f.name)}
                  placeholder={f.placeholder || "Select an option"}
                  options={f.options}
                />
              </Field>
            ) : (
              <Field key={f.name} label={f.label} htmlFor={f.name} hint={f.hint}>
                <TextInput
                  id={f.name}
                  name={f.name}
                  type={f.type || "text"}
                  value={values[f.name] || ""}
                  onChange={set(f.name)}
                  placeholder={f.placeholder}
                />
              </Field>
            )
          )}

          <Field
            label={category === "exports" ? "Destination country / port" : "Project location / site pin"}
            htmlFor="location"
          >
            <TextInput
              id="location"
              value={values.location || ""}
              onChange={set("location")}
              placeholder={
                category === "exports" ? "Destination country / port" : "City, site address or map pin"
              }
            />
          </Field>
        </div>

        <Field label="Requirement details" htmlFor="requirement" required hint="Max 3,000 characters">
          <TextArea
            id="requirement"
            name="requirement"
            required
            minLength={5}
            maxLength={3000}
            value={values.requirement || ""}
            onChange={set("requirement")}
            placeholder="Structure type, grades, pour schedule, access constraints — anything that helps us quote accurately."
            rows={5}
          />
        </Field>
      </fieldset>

      <fieldset className="space-y-4">
        <legend className="text-[12px] font-medium uppercase tracking-[0.1em] text-ink/70">
          03 — Your details
        </legend>

        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Full name" htmlFor="name" required>
            <TextInput id="name" name="name" required maxLength={120} placeholder="Your name" />
          </Field>
          <Field label="Phone" htmlFor="phone" required>
            <TextInput
              id="phone"
              name="phone"
              required
              type="tel"
              maxLength={30}
              placeholder="+91"
              autoComplete="tel"
            />
          </Field>
          <Field label="Email" htmlFor="email">
            <TextInput
              id="email"
              name="email"
              type="email"
              maxLength={180}
              placeholder="you@company.com"
              autoComplete="email"
            />
          </Field>
          <Field label="Company" htmlFor="company">
            <TextInput id="company" name="company" maxLength={160} placeholder="Company / firm" />
          </Field>
        </div>
      </fieldset>

      <FormError message={error} />

      <div className="flex flex-wrap items-center gap-4">
        <SubmitButton pending={pending}>{state === "error" ? "Try again" : "Submit enquiry"}</SubmitButton>
        <p className="max-w-xs text-[11px] leading-relaxed text-slate">
          Your details are used only to respond to this enquiry. No marketing lists, no sharing with third
          parties.
        </p>
      </div>
    </form>
  );
}