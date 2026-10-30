/**
 * Sends a sample notification email, made by src/lib/notify.ts just as a real
 * submission's is, to check the SMTP account and the template. It goes to
 * LEADS_NOTIFY_EMAIL unless another address is given, with "[Test]" before its
 * subject. The form defaults to the contact enquiry. Nothing is saved to the
 * sheet.
 *
 *   npm run email:test
 *   npm run email:test -- enquiry someone@example.com
 */

import { FORMS } from "../src/lib/forms.ts";
import { notificationEmail, sendEmail } from "../src/lib/notify.ts";

const env = (name) => {
  let value = (process.env[name] ?? "").trim();
  if (/^(["']).*\1$/s.test(value)) value = value.slice(1, -1);
  return value;
};

/** Made-up values for the forms' fields; any other field gets "Sample <header>". */
const SAMPLE = {
  topic: "Volunteer",
  name: "Sample Visitor",
  email: "sample.visitor@example.com",
  telephone: "+44 20 0000 0000",
  organisation: "Example Community Group",
  message:
    "Hello,\n\nThis is a sample enquiry, sent by scripts/test-email.mjs to check the notification email.\n\nKind regards,\nSample Visitor",
};

const [formId = "enquiry", toArg] = process.argv.slice(2);
if (!Object.hasOwn(FORMS, formId)) {
  console.error(`Unknown form "${formId}". Choose one of: ${Object.keys(FORMS).join(", ")}.`);
  process.exit(1);
}
const def = FORMS[formId];
const values = Object.fromEntries(def.fields.map((f) => [f.key, SAMPLE[f.key] ?? `Sample ${f.header.toLowerCase()}`]));
const to = toArg || env("LEADS_NOTIFY_EMAIL");
if (!to) {
  console.error("No address: set LEADS_NOTIFY_EMAIL in .env.local, or pass one.");
  process.exit(1);
}

const email = notificationEmail(def, values);
await sendEmail(to, { ...email, subject: `[Test] ${email.subject}` });
console.log(`Sent the ${formId} sample to ${to}: "[Test] ${email.subject}"`);
