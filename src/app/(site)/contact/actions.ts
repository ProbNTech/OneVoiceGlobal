"use server";

import { contactEnquiry } from "@/data/contact";
import type { EnquiryTopic } from "@/data/site";

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
  status: "idle" | "invalid" | "sent" | "unavailable" | "failed";
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
 * Where an enquiry goes. The brief leaves the Centre's email address blank,
 * and the client has not yet said how enquiries should reach them (an inbox,
 * a CRM or a form service), so for now nothing is sent and the form says so
 * plainly. Connect the chosen service here: return "sent" once it has
 * accepted the enquiry, and "failed" if it has not.
 */
async function deliverEnquiry(enquiry: Enquiry): Promise<"sent" | "unavailable" | "failed"> {
  void enquiry;
  return "unavailable";
}
