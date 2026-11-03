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

export default function InvestorForm() {
  const { error, run, reset, pending, done } = useIntake();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    await run({
      type: "investor",
      full_name: String(data.get("full_name") || ""),
      organisation: String(data.get("organisation") || ""),
      email: String(data.get("email") || ""),
      phone: String(data.get("phone") || ""),
      investor_type: String(data.get("investor_type") || "other"),
      areas_of_interest: String(data.get("areas_of_interest") || ""),
      message: String(data.get("message") || ""),
    });
  };

  if (done) {
    return (
      <SuccessPanel
        title="Request received."
        body="Your request has been logged. The group will share information appropriate to your investor category, subject to confidentiality and applicable regulations."
        onReset={reset}
        resetLabel="Submit another request"
      />
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Full name" htmlFor="i-name" required>
          <TextInput id="i-name" name="full_name" required maxLength={120} />
        </Field>
        <Field label="Organisation" htmlFor="i-org">
          <TextInput id="i-org" name="organisation" maxLength={180} />
        </Field>
        <Field label="Email" htmlFor="i-email" required>
          <TextInput id="i-email" name="email" required type="email" maxLength={180} />
        </Field>
        <Field label="Phone" htmlFor="i-phone" required>
          <TextInput id="i-phone" name="phone" required type="tel" maxLength={30} />
        </Field>
        <Field label="Investor type" htmlFor="i-type" required>
          <SelectInput
            id="i-type"
            name="investor_type"
            required
            placeholder="Select investor type"
            options={[
              { value: "institutional", label: "Institutional investor" },
              { value: "family_office", label: "Family office" },
              { value: "hni", label: "High-net-worth individual" },
              { value: "strategic", label: "Strategic / operating partner" },
              { value: "other", label: "Other" },
            ]}
          />
        </Field>
        <Field label="Areas of interest" htmlFor="i-areas">
          <TextInput
            id="i-areas"
            name="areas_of_interest"
            maxLength={300}
            placeholder="e.g. materials, real estate, digital infrastructure"
          />
        </Field>
      </div>

      <Field label="Your request" htmlFor="i-message">
        <TextArea
          id="i-message"
          name="message"
          maxLength={3000}
          rows={4}
          placeholder="What information are you looking for?"
        />
      </Field>

      <FormError message={error} />
      <SubmitButton pending={pending}>Request information</SubmitButton>
    </form>
  );
}