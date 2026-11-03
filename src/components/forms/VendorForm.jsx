import React from "react";
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
import { vendorCategories } from "@/data/catalogue";

export default function VendorForm() {
  const { error, run, reset, pending, done } = useIntake();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    await run({
      type: "vendor",
      company_name: String(data.get("company_name") || ""),
      contact_name: String(data.get("contact_name") || ""),
      phone: String(data.get("phone") || ""),
      email: String(data.get("email") || ""),
      category: String(data.get("category") || ""),
      city: String(data.get("city") || ""),
      gstin: String(data.get("gstin") || ""),
      website: String(data.get("website") || ""),
      years_in_business: String(data.get("years_in_business") || ""),
      description: String(data.get("description") || ""),
    });
  };

  if (done) {
    return (
      <SuccessPanel
        title="Registration received."
        body="Your company is now in the vendor evaluation queue. The procurement team will contact you with the document checklist for your category. Registration does not guarantee business."
        onReset={reset}
        resetLabel="Register another company"
      />
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Company name" htmlFor="v-company" required>
          <TextInput id="v-company" name="company_name" required maxLength={160} />
        </Field>
        <Field label="Contact person" htmlFor="v-contact" required>
          <TextInput id="v-contact" name="contact_name" required maxLength={120} />
        </Field>
        <Field label="Phone" htmlFor="v-phone" required>
          <TextInput id="v-phone" name="phone" required type="tel" maxLength={30} />
        </Field>
        <Field label="Email" htmlFor="v-email">
          <TextInput id="v-email" name="email" type="email" maxLength={180} />
        </Field>
        <Field label="Vendor category" htmlFor="v-category" required>
          <SelectInput
            id="v-category"
            name="category"
            required
            placeholder="Select a category"
            options={vendorCategories}
          />
        </Field>
        <Field label="City" htmlFor="v-city">
          <TextInput id="v-city" name="city" maxLength={120} />
        </Field>
        <Field label="GSTIN" htmlFor="v-gstin" hint="Optional">
          <TextInput id="v-gstin" name="gstin" maxLength={20} placeholder="22AAAAA0000A1Z5" />
        </Field>
        <Field label="Years in business" htmlFor="v-years">
          <TextInput id="v-years" name="years_in_business" maxLength={20} placeholder="e.g. 8" />
        </Field>
        <Field label="Website" htmlFor="v-website" className="sm:col-span-2">
          <TextInput id="v-website" name="website" maxLength={200} placeholder="https://" />
        </Field>
      </div>

      <Field label="Products / services supplied" htmlFor="v-description">
        <TextArea
          id="v-description"
          name="description"
          maxLength={2000}
          rows={4}
          placeholder="What you supply, capacity, key clients and certifications."
        />
      </Field>

      <FormError message={error} />
      <div className="flex flex-wrap items-center gap-4">
        <SubmitButton pending={pending}>Register as vendor</SubmitButton>
        <p className="max-w-xs text-[11px] leading-relaxed text-slate">
          No registration fee. Verification and document checks follow registration.
        </p>
      </div>
    </form>
  );
}