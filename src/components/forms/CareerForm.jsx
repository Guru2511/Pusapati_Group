import React, { useState } from "react";
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
import { departments } from "@/data/catalogue";

export default function CareerForm({ defaultDepartment = "" }) {
  const { error, notificationWarning, run, reset, pending, done } = useIntake();
  const [cvError, setCvError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const cvFile = data.get("cv_file");
    setCvError("");
    if (cvFile instanceof File && cvFile.size > 5 * 1024 * 1024) {
      setCvError("Your CV must be 5 MB or smaller.");
      return;
    }
    if (cvFile instanceof File && cvFile.size > 0 && !/\.(pdf|doc|docx)$/i.test(cvFile.name)) {
      setCvError("Upload your CV as a PDF, DOC, or DOCX file.");
      return;
    }
    await run({
      type: "career",
      full_name: String(data.get("full_name") || ""),
      phone: String(data.get("phone") || ""),
      email: String(data.get("email") || ""),
      role: String(data.get("role") || ""),
      department: String(data.get("department") || ""),
      experience: String(data.get("experience") || ""),
      portfolio_url: String(data.get("portfolio_url") || ""),
      cover_note: String(data.get("cover_note") || ""),
      is_internship: data.get("is_internship") === "on",
    }, { cvFile: cvFile instanceof File && cvFile.size > 0 ? cvFile : null });
  };

  if (done) {
    return (
      <SuccessPanel
        title="Application received."
        body="Thank you for your interest in the group. Shortlisted candidates are contacted by the relevant department; applications stay on record for future openings."
        warning={notificationWarning}
        onReset={reset}
        resetLabel="Submit another application"
      />
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Full name" htmlFor="j-name" required>
          <TextInput id="j-name" name="full_name" required maxLength={120} />
        </Field>
        <Field label="Phone" htmlFor="j-phone" required>
          <TextInput id="j-phone" name="phone" required type="tel" maxLength={30} />
        </Field>
        <Field label="Email" htmlFor="j-email">
          <TextInput id="j-email" name="email" type="email" maxLength={180} />
        </Field>
        <Field label="Role applied for" htmlFor="j-role" required>
          <TextInput id="j-role" name="role" required maxLength={120} placeholder="e.g. Quality engineer" />
        </Field>
        <Field label="Department" htmlFor="j-dept">
          <SelectInput
            id="j-dept"
            name="department"
            defaultValue={defaultDepartment}
            placeholder="Select a department"
            options={departments.map((d) => d.name)}
          />
        </Field>
        <Field label="Experience" htmlFor="j-exp">
          <SelectInput
            id="j-exp"
            name="experience"
            placeholder="Select experience"
            options={["Fresher", "1–3 years", "3–6 years", "6–10 years", "10+ years"]}
          />
        </Field>
        <Field label="Portfolio / LinkedIn" htmlFor="j-portfolio" className="sm:col-span-2">
          <TextInput id="j-portfolio" name="portfolio_url" maxLength={300} placeholder="https://" />
        </Field>
      </div>

      <Field label="Why this role?" htmlFor="j-note">
        <TextArea id="j-note" name="cover_note" maxLength={2500} rows={4} />
      </Field>

      <Field label="Upload CV (optional)" htmlFor="j-cv">
        <input
          id="j-cv"
          name="cv_file"
          type="file"
          accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
          className="block w-full rounded-lg border border-ink/15 bg-white px-3 py-2 text-xs text-ink file:mr-3 file:rounded-md file:border-0 file:bg-paper file:px-3 file:py-2 file:text-xs file:font-semibold"
        />
        <span className="mt-1.5 block text-[11px] text-slate">PDF, DOC, or DOCX · up to 5 MB. Stored privately for authorized admins; email attachments require Web3Forms Pro.</span>
      </Field>

      <label className="flex items-start gap-3 text-[13px] text-slate">
        <input
          type="checkbox"
          name="is_internship"
          className="mt-0.5 h-4 w-4 border-ink/30 accent-orange"
        />
        I am applying for an internship.
      </label>

      <FormError message={cvError || error} />
      <SubmitButton pending={pending}>Submit application</SubmitButton>
    </form>
  );
}