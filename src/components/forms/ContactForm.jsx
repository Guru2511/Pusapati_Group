import React from "react";
import { useIntake } from "@/hooks/useIntake";
import {
  Field,
  FormError,
  SubmitButton,
  SuccessPanel,
  TextArea,
  TextInput,
} from "@/components/forms/Fields";

export default function ContactForm() {
  const { error, notificationWarning, run, reset, pending, done } = useIntake();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    await run({
      type: "contact",
      name: String(data.get("name") || ""),
      phone: String(data.get("phone") || ""),
      email: String(data.get("email") || ""),
      company: String(data.get("company") || ""),
      requirement: String(data.get("requirement") || ""),
      source_page: "/contact",
    });
  };

  if (done) {
    return (
      <SuccessPanel
        title="Message sent."
        body="Thank you — your message has reached the group enquiry desk. We respond within one business day, Monday to Saturday."
        warning={notificationWarning}
        onReset={reset}
        resetLabel="Send another message"
      />
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Full name" htmlFor="c-name" required>
          <TextInput id="c-name" name="name" required maxLength={120} autoComplete="name" />
        </Field>
        <Field label="Phone" htmlFor="c-phone" required>
          <TextInput id="c-phone" name="phone" required type="tel" maxLength={30} autoComplete="tel" />
        </Field>
        <Field label="Email" htmlFor="c-email">
          <TextInput id="c-email" name="email" type="email" maxLength={180} autoComplete="email" />
        </Field>
        <Field label="Company" htmlFor="c-company">
          <TextInput id="c-company" name="company" maxLength={160} />
        </Field>
      </div>

      <Field label="How can we help?" htmlFor="c-requirement" required>
        <TextArea id="c-requirement" name="requirement" required minLength={5} maxLength={3000} rows={5} />
      </Field>

      <FormError message={error} />
      <SubmitButton pending={pending}>Send message</SubmitButton>
    </form>
  );
}