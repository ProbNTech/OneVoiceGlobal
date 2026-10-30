"use server";

import { contactEnquiry } from "@/data/contact";
import type { EnquiryTopic } from "@/data/site";
import { FORMS } from "@/lib/forms";
import { sendNotification } from "@/lib/notify";
import { saveSubmission } from "@/lib/sheets";

export type EnquiryField = "topic" | "name" | "email" | "message";

export type Enquiry = {
  topic: EnquiryTopic;
  name: string;
  email: string;
  telephone: string;
  organisation: string;
  message: string;
};

export type EnquiryState = {
  status: "idle" | "invalid" | "sent" | "failed";
  errors?: Partial<Record<EnquiryField, string>>;
  /** What was entered, so the form can show it again after a try that did not go through. */
  values?: Partial<Record<keyof Enquiry, string>>;
};

const topics: readonly string[] = contactEnquiry.form.topics.map((topic) => topic.id);
const isTopic = (value: string): value is EnquiryTopic => topics.includes(value);
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** A field's value as trimmed text, cut to a sensible length. */
function read(formData: FormData, name: string, max: number) {
  const value = formData.get(name);
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

/**
 * The Contact page's enquiry form. Checks each field on the server (the form
 * itself does no checking of its own, so every message reads the same), then
 * hands the enquiry on.
 */
export async function sendEnquiry(_previous: EnquiryState, formData: FormData): Promise<EnquiryState> {
  // A field people never see: only automated submissions fill it in, and
  // they are told it went through.
  if (read(formData, "website", 200)) return { status: "sent" };

  const values = {
    topic: read(formData, "topic", 40),
    name: read(formData, "name", 200),
    email: read(formData, "email", 320),
    telephone: read(formData, "telephone", 40),
    organisation: read(formData, "organisation", 200),
    message: read(formData, "message", 5000),
  };

  const messages = contactEnquiry.form.errors;
  const errors: EnquiryState["errors"] = {};
  if (!isTopic(values.topic)) errors.topic = messages.topic;
  if (!values.name) errors.name = messages.name;
  if (!emailPattern.test(values.email)) errors.email = messages.email;
  if (!values.message) errors.message = messages.message;
  if (!isTopic(values.topic) || Object.keys(errors).length) return { status: "invalid", errors, values };

  const outcome = await deliverEnquiry({ ...values, topic: values.topic });
  return outcome === "sent" ? { status: "sent" } : { status: outcome, values };
}

/**
 * Where an enquiry goes, as on the Commonwealth Entrepreneurs Forum site: a
 * row in the "Contact Enquiries" tab of the Google Sheet (lib/sheets.ts), then
 * an email to the team at LEADS_NOTIFY_EMAIL (lib/notify.ts). The kind of
 * enquiry is recorded by its label ("Volunteer"), as the visitor saw it.
 */
async function deliverEnquiry(enquiry: Enquiry): Promise<"sent" | "failed"> {
  const def = FORMS.enquiry;
  const topic = contactEnquiry.form.topics.find((item) => item.id === enquiry.topic)?.label ?? enquiry.topic;
  const values: Record<string, string> = { ...enquiry, topic };

  try {
    await saveSubmission(def, values);
  } catch (error) {
    console.error("[forms] failed to save the enquiry", error);
    return "failed";
  }

  // The enquiry is already saved, so a mail hiccup only gets logged.
  try {
    await sendNotification(def, values);
  } catch (error) {
    console.error("[forms] notification email failed (the enquiry was saved)", error);
  }
  return "sent";
}
