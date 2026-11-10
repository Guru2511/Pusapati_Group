import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { upload } from "@vercel/blob/client";
import { submitIntake } from "@/lib/server-fns";

const submissionLabels = {
  enquiry: "Quote enquiry",
  contact: "Contact enquiry",
  vendor: "Vendor application",
  career: "Career application",
  investor: "Investor enquiry",
};

const fieldLabels = {
  name: "Name",
  contact_name: "Contact Name",
  full_name: "Full Name",
  company: "Company",
  company_name: "Company Name",
  organisation: "Organisation",
  investor_type: "Investor Type",
  areas_of_interest: "Areas of Interest",
  phone: "Phone",
  email: "Email",
  category: "Category",
  location: "Location",
  interest: "Interest",
  quantity: "Quantity",
  timeline: "Timeline",
  pour_date: "Pour Date",
  pour_time: "Pour Time",
  pump_required: "Pump Required",
  incoterms: "Incoterms",
  requirement: "Requirement",
  source_page: "Source Page",
  city: "City",
  gstin: "GSTIN",
  website: "Website",
  years_in_business: "Years in Business",
  description: "Description",
  role: "Role",
  department: "Department",
  experience: "Experience",
  portfolio_url: "Portfolio URL",
  cover_note: "Cover Note",
  is_internship: "Internship",
  message: "Message",
};

function formatFieldValue(value) {
  if (typeof value === "boolean") return value ? "Yes" : "No";
  if (typeof value === "string") return value || "Not provided";
  return String(value ?? "Not provided");
}

function getSubmissionName(data) {
  return data.name || data.contact_name || data.full_name || data.company_name || "Website visitor";
}

function getSubmissionMessage(data) {
  const message = data.requirement || data.description || data.cover_note || data.message
    || data.areas_of_interest;
  if (message) return message;
  if (Array.isArray(data.requirement_items)) {
    return data.requirement_items.map((item) => item.requirement).filter(Boolean).join("\n");
  }
  return `New ${submissionLabels[data.type]?.toLowerCase() || "website"} submission`;
}

async function sendIntakeEmail(data) {
  const accessKey = import.meta.env.VITE_WEB3FORM_ACCESS_KEY;
  if (!accessKey) {
    throw new Error("Missing VITE_WEB3FORM_ACCESS_KEY.");
  }
  const attachment = data.cv_file;
  const attachFile = import.meta.env.VITE_WEB3FORM_ATTACHMENT_ENABLED === "true"
    && attachment instanceof File
    && attachment.size > 0;

  const submissionType = data.type === "career" && data.is_internship
    ? "Internship application"
    : submissionLabels[data.type] || "Website submission";
  const name = getSubmissionName(data);
  const replyTo = typeof data.email === "string" ? data.email : "";
  const customFields = {
    "Submission Type": submissionType,
  };
  for (const [key, value] of Object.entries(data)) {
    if ([
      "type", "requirement_items", "name", "contact_name", "full_name", "email", "message",
      "cv_file", "cv_pathname", "cv_filename", "cv_content_type", "cv_size",
    ].includes(key)) continue;
    const label = fieldLabels[key] || key.replaceAll("_", " ").replace(/\b\w/g, (letter) => letter.toUpperCase());
    customFields[label] = formatFieldValue(value);
  }
  const filename = data.cv_filename;
  if (filename) {
    const label = data.type === "career" ? "CV" : "Document";
    customFields[label] = attachFile ? filename : `${filename} (stored privately in the admin dashboard)`;
  }
  if (Array.isArray(data.requirement_items)) {
    data.requirement_items.forEach((item, index) => {
      for (const [key, value] of Object.entries(item)) {
        const label = fieldLabels[key] || key.replaceAll("_", " ");
        customFields[`Requirement ${index + 1} ${label}`] = formatFieldValue(value);
      }
    });
  }

  const emailFields = {
    access_key: accessKey,
    subject: `New ${submissionType} | ${name}`.slice(0, 200),
    from_name: "Pusapati Group",
    name,
    message: getSubmissionMessage(data),
    ...customFields,
    ...(replyTo ? { email: replyTo, replyto: replyTo } : {}),
  };
  let body = JSON.stringify(emailFields);
  const headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
  };
  if (attachFile) {
    const formData = new FormData();
    for (const [key, value] of Object.entries(emailFields)) {
      formData.append(key, value);
    }
    formData.append("attachment", attachment, attachment.name);
    body = formData;
    delete headers["Content-Type"];
  }
  const response = await fetch("https://api.web3forms.com/submit", {
    method: "POST",
    headers,
    body,
  });

  const responseText = await response.text();
  let result;
  try {
    result = JSON.parse(responseText);
  } catch {
    throw new Error(`Web3Forms returned an invalid response (HTTP ${response.status}).`);
  }

  if (!response.ok || result.success !== true) {
    throw new Error(
      typeof result.message === "string" ? result.message : `Web3Forms returned HTTP ${response.status}.`
    );
  }
}

export function useIntake() {
  const submit = useServerFn(submitIntake);
  const [state, setState] = useState("idle");
  const [error, setError] = useState("");
  const [notificationWarning, setNotificationWarning] = useState("");

  const run = async (payload, options = {}) => {
    setState("pending");
    setError("");
    setNotificationWarning("");
    let submissionData = payload;
    try {
      const file = options.cvFile;
      if (file) {
        const extensions = {
          pdf: "application/pdf",
          doc: "application/msword",
          docx: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        };
        const extension = file.name.split(".").pop()?.toLowerCase();
        const contentType = extensions[extension];
        if (!contentType || file.size < 1 || file.size > 5 * 1024 * 1024) {
          throw new Error("Choose a PDF, DOC, or DOCX document no larger than 5 MB.");
        }
        const blob = await upload(
          `career-cvs/${crypto.randomUUID()}.${extension}`,
          file,
          {
            access: "private",
            handleUploadUrl: "/api/cv-upload",
            contentType,
          },
        );
        submissionData = {
          ...payload,
          cv_pathname: blob.pathname,
          cv_filename: file.name,
          cv_content_type: contentType,
          cv_size: file.size,
          cv_file: file,
        };
      }
      await submit({
        data: Object.fromEntries(
          Object.entries(submissionData).filter(([key]) => key !== "cv_file"),
        ),
      });
    } catch (e) {
      setState("error");
      setError(
        e?.message?.includes("Choose a PDF") || e?.message?.includes("validation") || e?.status === 400
          ? "Please check the details you entered and try again."
          : ["cv", "document", "upload"].some((word) => e?.message?.toLowerCase().includes(word))
            ? "We could not upload your document. Please try again with a PDF, DOC, or DOCX file no larger than 5 MB."
            : "We could not save your enquiry. Please try again or call our team."
      );
      return false;
    }

    try {
      await sendIntakeEmail(submissionData);
    } catch (notificationError) {
      const reason = notificationError instanceof Error ? notificationError.message : "Unknown delivery error.";
      console.error(`[intake notifications] Web3Forms email alert failed: ${reason}`);
      setNotificationWarning(
        "Your submission was saved, but we could not send the email alert. Please contact our team by phone to confirm."
      );
    }

      setState("done");
      return true;
  };

  const reset = () => {
    setState("idle");
    setError("");
    setNotificationWarning("");
  };

  return {
    state,
    error,
    notificationWarning,
    run,
    reset,
    pending: state === "pending",
    done: state === "done",
  };
}