import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { submitIntake } from "@/lib/server-fns";

async function sendIntakeEmail(data) {
  const accessKey = import.meta.env.VITE_WEB3FORM_ACCESS_KEY;
  if (!accessKey) {
    throw new Error("Missing VITE_WEB3FORM_ACCESS_KEY.");
  }

  const lines = Object.entries(data).map(([key, value]) => {
    const label = key.replaceAll("_", " ");
    const formattedValue = typeof value === "boolean" ? (value ? "Yes" : "No") : value || "Not provided";
    return `${label}: ${formattedValue}`;
  });
  const replyTo = typeof data.email === "string" ? data.email : "";
  const response = await fetch("https://api.web3forms.com/submit", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      access_key: accessKey,
      subject: `New ${data.type} submission | Pusapati Group`,
      from_name: "Pusapati Group",
      message: [`New ${data.type} submission`, "", ...lines].join("\n"),
      ...(replyTo ? { email: replyTo, replyto: replyTo } : {}),
    }),
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

  const run = async (payload) => {
    setState("pending");
    setError("");
    setNotificationWarning("");
    try {
      await submit({ data: payload });
    } catch (e) {
      setState("error");
      setError(
        e?.message?.includes("validation") || e?.status === 400
          ? "Please check the details you entered and try again."
          : "We could not save your enquiry. Please try again or call our team."
      );
      return false;
    }

    try {
      await sendIntakeEmail(payload);
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