import { secrets } from "base44:runtime";
import { CONTACT } from "@/data/group";

async function requiredSecret(name) {
  const value = await secrets.get(name);
  if (typeof value !== "string" || !value.trim()) {
    throw new Error(`Missing required ${name} secret.`);
  }
  return value.trim();
}

function firstValue(payload, keys) {
  for (const key of keys) {
    const value = payload[key];
    if (typeof value === "string" && value.trim()) return value.trim();
  }
  return "Not provided";
}

function formatEmail(type, payload) {
  const lines = Object.entries(payload).map(([key, value]) => {
    const label = key.replaceAll("_", " ");
    const formattedValue = typeof value === "boolean" ? (value ? "Yes" : "No") : value || "Not provided";
    return `${label}: ${formattedValue}`;
  });

  return [`New ${type} submission`, "", ...lines].join("\n");
}

function formatWhatsApp(type, payload) {
  const details = [
    `New ${type} submission`,
    `Name: ${firstValue(payload, ["name", "contact_name", "full_name", "company_name"])}`,
    `Phone: ${firstValue(payload, ["phone"])}`,
    `Email: ${firstValue(payload, ["email"])}`,
    `Details: ${firstValue(payload, ["requirement", "description", "cover_note", "message", "areas_of_interest"])}`,
  ];

  return details.join("\n").slice(0, 900);
}

async function sendWeb3FormsEmail({ subject, text, replyTo }) {
  const accessKey = await requiredSecret("WEB3FORM_ACCESS_KEY");
  const response = await fetch("https://api.web3forms.com/submit", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      access_key: accessKey,
      subject,
      from_name: "Pusapati Group",
      message: text,
      ...(replyTo ? { email: replyTo } : {}),
      ...(replyTo ? { replyto: replyTo } : {}),
    }),
  });

  const payload = await response.json();
  if (!response.ok || payload.success === false) {
    const message =
      typeof payload.message === "string"
        ? payload.message
        : typeof payload.body?.message === "string"
          ? payload.body.message
          : `Web3Forms returned HTTP ${response.status}.`;
    throw new Error(message);
  }
}

async function sendOwnerEmail(type, payload) {
  await sendWeb3FormsEmail({
    subject: `New ${type} submission | Pusapati Group`,
    text: formatEmail(type, payload),
    replyTo: payload.email,
  });
}

async function sendWhatsApp(type, payload) {
  const accessToken = await requiredSecret("WHATSAPP_ACCESS_TOKEN");
  const phoneNumberId = await requiredSecret("WHATSAPP_PHONE_NUMBER_ID");
  const apiVersion = await requiredSecret("WHATSAPP_API_VERSION");
  const templateName = await requiredSecret("WHATSAPP_TEMPLATE_NAME");
  const templateLanguage = (await secrets.get("WHATSAPP_TEMPLATE_LANGUAGE")) || "en_US";

  if (!/^\d+$/.test(phoneNumberId)) {
    throw new Error("WHATSAPP_PHONE_NUMBER_ID must contain only digits.");
  }
  if (!/^v\d+\.\d+$/.test(apiVersion)) {
    throw new Error("WHATSAPP_API_VERSION must use the format v##.#.");
  }
  if (!/^[a-z0-9_]+$/.test(templateName)) {
    throw new Error("WHATSAPP_TEMPLATE_NAME must be a lowercase template name.");
  }

  const response = await fetch(
    `https://graph.facebook.com/${apiVersion}/${phoneNumberId}/messages`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        messaging_product: "whatsapp",
        to: CONTACT.phone.replace(/\D/g, ""),
        type: "template",
        template: {
          name: templateName,
          language: { code: templateLanguage },
          components: [
            {
              type: "body",
              parameters: [{ type: "text", text: formatWhatsApp(type, payload) }],
            },
          ],
        },
      }),
    }
  );

  if (!response.ok) {
    throw new Error(`WhatsApp Cloud API returned HTTP ${response.status}.`);
  }
}

async function attemptNotification(channel, send) {
  try {
    await send();
  } catch (error) {
    const reason = error instanceof Error ? error.message : "Unknown delivery error.";
    console.error(`[intake notifications] ${channel} alert failed: ${reason}`);
  }
}

export async function notifyIntakeSubmission(type, payload) {
  await Promise.all([
    attemptNotification("Web3Forms email", () => sendOwnerEmail(type, payload)),
    attemptNotification("WhatsApp", () => sendWhatsApp(type, payload)),
  ]);
}
