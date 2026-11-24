"use server";

import { joinForm } from "@/data/join";
import { contact, whatsappGroup } from "@/data/site";
import { FORMS } from "@/lib/forms";
import { sendNotification, sendWelcome } from "@/lib/notify";
import { saveSubmission } from "@/lib/sheets";

export type JoinField = "name" | "mobile" | "email" | "consent";

export type JoinState = {
  status: "idle" | "invalid" | "sent" | "failed";
  errors?: Partial<Record<JoinField, string>>;
  /** What was entered, so the form can show it again after a try that did not go through. */
  values?: Record<string, string>;
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
/* Digits, with the punctuation a phone number is written with. */
const phonePattern = /^[0-9+()\s-]{7,}$/;

/** A field's value as trimmed text, cut to a sensible length. */
function read(formData: FormData, name: string, max: number) {
  const value = formData.get(name);
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

/**
 * The Join page's sign-up form. Checks each field on the server (the form
 * does no checking of its own, so every message reads the same), saves the
 * sign-up to the "Community Sign-ups" tab of the Google Sheet, tells the
 * team, and sends the person their welcome and greeting.
 */
export async function joinOneVoice(_previous: JoinState, formData: FormData): Promise<JoinState> {
  // A field people never see: only automated submissions fill it in, and
  // they are told it went through.
  if (read(formData, "website", 200)) return { status: "sent" };

  const mobile = read(formData, "mobile", 40);
  // The tick box means "my WhatsApp number is my mobile number".
  const sameNumber = read(formData, "sameNumber", 10) === "on";
  const values: Record<string, string> = {
    name: read(formData, "name", 200),
    mobile,
    whatsapp: sameNumber ? mobile : read(formData, "whatsapp", 40),
    email: read(formData, "email", 320),
    interest: read(formData, "interest", 120),
    consent: read(formData, "consent", 10) === "on" ? joinForm.consentValue : "",
  };

  const messages = joinForm.errors;
  const errors: JoinState["errors"] = {};
  if (!values.name) errors.name = messages.name;
  if (!phonePattern.test(values.mobile)) errors.mobile = messages.mobile;
  if (values.email && !emailPattern.test(values.email)) errors.email = messages.email;
  if (!values.consent) errors.consent = messages.consent;
  if (Object.keys(errors).length) return { status: "invalid", errors, values };

  const outcome = await deliverSignUp(values);
  return outcome === "sent" ? { status: "sent", values } : { status: outcome, values };
}

/**
 * Where a sign-up goes: a row in the "Community Sign-ups" tab of the Google
 * Sheet (lib/sheets.ts), then an email to the team, then the welcome and
 * greeting to the person. The sheet row is what matters, so a mail hiccup
 * only gets logged.
 */
async function deliverSignUp(values: Record<string, string>): Promise<"sent" | "failed"> {
  const def = FORMS.join;

  try {
    await saveSubmission(def, values);
  } catch (error) {
    console.error("[forms] failed to save the sign-up", error);
    return "failed";
  }

  try {
    await sendNotification(def, values);
  } catch (error) {
    console.error("[forms] notification email failed (the sign-up was saved)", error);
  }

  if (values.email) {
    try {
      await sendWelcome(values.email, values, whatsappGroup.href, contact.telephone, contact.email);
    } catch (error) {
      console.error("[forms] welcome email failed (the sign-up was saved)", error);
    }
  }
  return "sent";
}
