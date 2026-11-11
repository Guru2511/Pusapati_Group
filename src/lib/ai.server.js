import { openaiText } from "@tanstack/ai-openai";

export const openaiModel = (model = "gpt-4o-mini") => openaiText(model);
