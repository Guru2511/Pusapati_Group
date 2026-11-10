import React, { useRef, useState } from "react";
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
const MAX_REQUIREMENT_ITEMS = 20;

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
  const nextItemId = useRef(2);
  const [requirementItems, setRequirementItems] = useState([
    { id: "1", category: initialCategory, values: {} },
  ]);
  const { state, error, notificationWarning, run, reset, pending, done } = useIntake();

  const setItemValue = (itemId, name, value) =>
    setRequirementItems((items) =>
      items.map((item) =>
        item.id === itemId ? { ...item, values: { ...item.values, [name]: value } } : item
      )
    );

  const addRequirementItem = () => {
    setRequirementItems((items) => [
      ...items,
      { id: String(nextItemId.current++), category: initialCategory, values: {} },
    ]);
  };

  const removeRequirementItem = (itemId) => {
    if (
      requirementItems.length <= 1 ||
      !window.confirm("Remove this requirement item? Its entered details will be lost.")
    ) {
      return;
    }
    setRequirementItems((items) => items.filter((item) => item.id !== itemId));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const submittedItems = requirementItems.map(({ category, values: itemValues }) => ({
      category,
      location: String(itemValues.location || ""),
      interest: String(itemValues.interest || ""),
      quantity: String(itemValues.quantity || ""),
      timeline: String(itemValues.timeline || ""),
      pour_date: String(itemValues.pour_date || ""),
      pour_time: String(itemValues.pour_time || ""),
      pump_required: String(itemValues.pump_required || "unsure"),
      incoterms: String(itemValues.incoterms || ""),
      requirement: String(itemValues.requirement || ""),
    }));
    const firstItem = submittedItems[0];
    await run({
      type: "enquiry",
      name: String(data.get("name") || ""),
      phone: String(data.get("phone") || ""),
      email: String(data.get("email") || ""),
      company: String(data.get("company") || ""),
      ...firstItem,
      requirement_items: submittedItems,
      source_page: "/quote",
    });
  };

  if (done) {
    return (
      <SuccessPanel
        title="Enquiry received."
        body="Your requirements have reached the group enquiry desk. A team member will respond within one business day with specifications, availability and next steps."
        warning={notificationWarning}
        onReset={() => {
          setRequirementItems([{ id: String(nextItemId.current++), category: initialCategory, values: {} }]);
          reset();
        }}
        resetLabel="Send another enquiry"
      />
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {requirementItems.map((item, index) => {
        const fields = extras[item.category] || [];
        const set = (name) => (e) => setItemValue(item.id, name, e.target.value);
        const itemPrefix = `requirement-${item.id}`;

        return (
          <section key={item.id} className="space-y-6 border border-ink/12 bg-concrete/20 p-4 sm:p-6">
            <div className="flex items-center justify-between gap-4">
              <p className="text-[12px] font-medium uppercase tracking-[0.1em] text-ink/70">
                {index === 0 ? "01 — What do you need?" : `Requirement item ${index + 1}`}
                <span className="text-orange"> *</span>
              </p>
              {requirementItems.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeRequirementItem(item.id)}
                  className="text-[12px] font-medium text-slate underline decoration-ink/30 underline-offset-4 transition-colors hover:text-orange"
                  aria-label={`Remove requirement item ${index + 1}`}
                >
                  Remove Item
                </button>
              )}
            </div>

            <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
              {categories.map((c) => {
                const Icon = c.icon;
                const active = item.category === c.id;
                return (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() =>
                      setRequirementItems((items) =>
                        items.map((current) =>
                          current.id === item.id ? { ...current, category: c.id } : current
                        )
                      )
                    }
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

            <fieldset className="space-y-4">
              <legend className="text-[12px] font-medium uppercase tracking-[0.1em] text-ink/70">
                Requirement
              </legend>

              <div className="grid gap-4 sm:grid-cols-2">
                {fields.map((f) => {
                  const fieldId = `${itemPrefix}-${f.name}`;
                  return f.type === "select" ? (
                    <Field key={f.name} label={f.label} htmlFor={fieldId}>
                      <SelectInput
                        id={fieldId}
                        value={item.values[f.name] || ""}
                        onChange={set(f.name)}
                        placeholder={f.placeholder || "Select an option"}
                        options={f.options}
                      />
                    </Field>
                  ) : (
                    <Field key={f.name} label={f.label} htmlFor={fieldId} hint={f.hint}>
                      <TextInput
                        id={fieldId}
                        type={f.type || "text"}
                        value={item.values[f.name] || ""}
                        onChange={set(f.name)}
                        placeholder={f.placeholder}
                      />
                    </Field>
                  );
                })}

                <Field
                  label={item.category === "exports" ? "Destination country / port" : "Project location / site pin"}
                  htmlFor={`${itemPrefix}-location`}
                >
                  <TextInput
                    id={`${itemPrefix}-location`}
                    value={item.values.location || ""}
                    onChange={set("location")}
                    placeholder={
                      item.category === "exports" ? "Destination country / port" : "City, site address or map pin"
                    }
                  />
                </Field>
              </div>

              <Field
                label="Requirement details"
                htmlFor={`${itemPrefix}-details`}
                required
                hint="Max 3,000 characters"
              >
                <TextArea
                  id={`${itemPrefix}-details`}
                  required
                  minLength={5}
                  maxLength={3000}
                  value={item.values.requirement || ""}
                  onChange={set("requirement")}
                  placeholder="Structure type, grades, pour schedule, access constraints — anything that helps us quote accurately."
                  rows={5}
                />
              </Field>
            </fieldset>
          </section>
        );
      })}

      <button
        type="button"
        onClick={addRequirementItem}
        disabled={requirementItems.length >= MAX_REQUIREMENT_ITEMS}
        className="inline-flex items-center gap-2 border border-orange px-4 py-2.5 text-[13px] font-semibold text-orange transition-colors hover:bg-orange/5 disabled:cursor-not-allowed disabled:opacity-50"
      >
        + Add Item
      </button>
      {requirementItems.length >= MAX_REQUIREMENT_ITEMS && (
        <p className="-mt-6 text-[12px] text-slate">You can include up to {MAX_REQUIREMENT_ITEMS} requirement items in one enquiry.</p>
      )}

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