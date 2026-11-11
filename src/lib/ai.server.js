import { createOpenaiChatCompletions } from "@tanstack/ai-openai";
import { getSecret } from "@/lib/secrets.server";

const GEMINI_BASE_URL = "https://generativelanguage.googleapis.com/v1beta/openai/";

export async function geminiModel(model = "gemini-3.5-flash-lite") {
  const apiKey = await getSecret("GEMINI_API_KEY");
  if (!apiKey?.trim()) {
    throw new Error("Missing required GEMINI_API_KEY secret for Intelligence.");
  }

  return createOpenaiChatCompletions(model, apiKey, { baseURL: GEMINI_BASE_URL });
}
