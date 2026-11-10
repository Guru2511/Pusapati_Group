import { secrets } from "base44:runtime";

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

function getWhatsAppDetails(payload) {
  if (Array.isArray(payload.requirement_items)) {
    return payload.requirement_items
      .map((item, index) => `${index + 1}. ${item.category}: ${item.requirement}`)
      .join(" | ")
      .slice(0, 300);
  }

  return firstValue(payload, [
    "requirement",
    "description",
    "cover_note",
    "message",
    "areas_of_interest",
    "interest",
    "category",
    "role",
  ]).slice(0, 300);
}

async function sendWhatsApp(type, payload) {
  const webhookUrl = await requiredSecret("N8N_WEBHOOK_URL");
  const authKey = await requiredSecret("N8N_WEBHOOK_AUTH_KEY");
  const url = new URL(webhookUrl);

  if (url.protocol !== "https:") {
    throw new Error("N8N_WEBHOOK_URL must use HTTPS.");
  }

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-pusapati-alert-key": authKey,
    },
    body: JSON.stringify({
      type: type.slice(0, 40),
      name: firstValue(payload, ["name", "contact_name", "full_name", "company_name"]).slice(0, 80),
      phone: firstValue(payload, ["phone"]).slice(0, 30),
      email: firstValue(payload, ["email"]).slice(0, 100),
      details: getWhatsAppDetails(payload),
    }),
    signal: AbortSignal.timeout(10_000),
  });

  if (!response.ok) {
    throw new Error(`n8n WhatsApp webhook returned HTTP ${response.status}.`);
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
    attemptNotification("WhatsApp", () => sendWhatsApp(type, payload)),
  ]);
}
