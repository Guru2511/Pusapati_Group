import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { saveIntakeSubmission } from "@/lib/neon.server";
import { notifyIntakeSubmission } from "@/lib/intake-notifications.server";

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const text = (max) => z.string().trim().max(max).optional().default("");
const required = (max) => z.string().trim().min(1).max(max);
const optionalDate = z.string().regex(/^\d{4}-\d{2}-\d{2}$/).or(z.literal("")).optional().default("");
const optionalTime = z.string().regex(/^\d{2}:\d{2}$/).or(z.literal("")).optional().default("");
const email = z
  .string()
  .trim()
  .max(180)
  .refine((v) => v === "" || EMAIL.test(v), { message: "Enter a valid email address" })
  .optional()
  .default("");

const enquiry = z.object({
  type: z.literal("enquiry"),
  name: required(120),
  phone: required(30),
  email: email,
  company: text(160),
  category: z.enum([
    "concrete",
    "aggregates",
    "ggbs",
    "construction_materials",
    "villas",
    "exports",
    "other",
    "general",
  ]),
  location: text(160),
  interest: text(160),
  quantity: text(120),
  timeline: text(120),
  pour_date: optionalDate,
  pour_time: optionalTime,
  pump_required: z.enum(["yes", "no", "unsure"]).optional().default("unsure"),
  incoterms: z
    .enum(["EXW", "FCA", "FOB", "CFR", "CIF", "DAP", "Other / to be agreed", ""])
    .optional()
    .default(""),
  requirement: required(3000),
  source_page: text(120),
});

const contact = z.object({
  type: z.literal("contact"),
  name: required(120),
  phone: required(30),
  email: email,
  company: text(160),
  requirement: required(3000),
  source_page: text(120),
});

const vendor = z.object({
  type: z.literal("vendor"),
  company_name: required(160),
  contact_name: required(120),
  phone: required(30),
  email: email,
  category: required(120),
  city: text(120),
  gstin: text(20),
  website: text(200),
  years_in_business: text(20),
  description: text(2000),
});

const career = z.object({
  type: z.literal("career"),
  full_name: required(120),
  phone: required(30),
  email: email,
  role: required(120),
  department: text(120),
  experience: text(60),
  portfolio_url: text(300),
  cover_note: text(2500),
  is_internship: z.boolean().optional().default(false),
});

const investor = z.object({
  type: z.literal("investor"),
  full_name: required(120),
  email: z
    .string()
    .trim()
    .max(180)
    .refine((v) => EMAIL.test(v), { message: "Enter a valid email address" }),
  phone: required(30),
  organisation: text(180),
  investor_type: z.enum(["institutional", "family_office", "hni", "strategic", "other"]),
  areas_of_interest: text(300),
  message: text(3000),
});

const intakeSchema = z.discriminatedUnion("type", [
  enquiry,
  contact,
  vendor,
  career,
  investor,
]);

export const submitIntake = createServerFn({ method: "POST" })
  .validator(intakeSchema)
  .handler(async ({ data }) => {
    let { type, ...payload } = data;

    if (type === "contact") {
      type = "enquiry";
      payload = {
        name: payload.name,
        phone: payload.phone,
        email: payload.email,
        company: payload.company,
        requirement: payload.requirement,
        source_page: payload.source_page,
        category: "general",
      };
    }

    await saveIntakeSubmission(type, payload);
    await notifyIntakeSubmission(type, payload);
    return { ok: true };
  });