/**
 * The email that tells the team a form came in, sent to LEADS_NOTIFY_EMAIL
 * (via Gmail SMTP) once the submission is saved to the sheet (lib/sheets.ts).
 * It lays out every field in the sheet's column order, with a button to reply
 * to the sender and a link to the sheet. The same template as the
 * Commonwealth Entrepreneurs Forum site, in OneVoice's colours.
 *
 * Environment variables (.env.local):
 *   EMAIL_HOST, EMAIL_PORT, EMAIL_HOST_USER, EMAIL_HOST_PASSWORD,
 *   DEFAULT_FROM_EMAIL, LEADS_NOTIFY_EMAIL, and GOOGLE_SHEET_ID for the link
 *
 * Its only runtime import is nodemailer, so the test script
 * (scripts/test-email.mjs) can load it directly.
 */

import nodemailer from "nodemailer";
import type { FormDef } from "./forms";
import { orange } from "../styles/brand-colours.ts";

// `brand.name` in data/site.ts, written out so the test script can load this file.
const SITE = "OneVoice Global Foundation";

// The brand colours of styles/site.css: navy-900, navy-950, ocean-600 and the neutrals; the orange comes from styles/brand-colours.ts.
const NAVY = "#0a2540";
const NAVY_DEEP = "#061a30";
const LINK = "#0b5394";
// Email apps cannot draw gradients, so the email takes solid stops from the site's orange palette.
const SAFFRON = orange.bright[1];
const SAFFRON_INK = orange.ink[1];
const SAFFRON_TINT = orange.soft[1];
const TEXT = "#0a2540";
const MUTED = "#5f6c7c";
const RULE = "#e6dfd3";
const BACKDROP = "#f3ede3";
const PANEL = "#faf7f1";

/** As in sheets.ts: trims whitespace and one pair of wrapping quotes. */
function envValue(name: string): string {
  let value = (process.env[name] ?? "").trim();
  if (
    value.length >= 2 &&
    ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'")))
  ) {
    value = value.slice(1, -1);
  }
  return value;
}

const escapeHtml = (s: string) => s.replace(/[&<>"']/g, (c) => `&#${c.charCodeAt(0)};`);

/** Escaped, keeping the sender's line breaks. */
const toHtml = (s: string) => escapeHtml(s).replace(/\r?\n/g, "<br>");

const formatTime = (d: Date) =>
  `${new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "long", year: "numeric", hour: "2-digit", minute: "2-digit", hourCycle: "h23", timeZone: "UTC" }).format(d)} UTC`;

/** Messages and the like get a block of their own rather than a table row. */
const isLong = (max?: number) => (max ?? 300) >= 1000;

/** The sender's name, from whichever name fields the form has. */
const senderName = (v: Record<string, string>) =>
  v.name || v.fullName || [v.firstName, v.lastName].filter(Boolean).join(" ");

export type Email = { subject: string; text: string; html: string; replyTo?: string };

/** The notification for one submission, plain text and HTML; split out so it can be previewed. */
export function notificationEmail(def: FormDef, values: Record<string, string>, receivedAt = new Date()): Email {
  const subject = def.subject(values);
  const heading = `New ${def.label}`;
  const name = senderName(values);
  const first = name.split(/\s+/)[0];
  const emailField = def.fields.find((f) => f.kind === "email");
  const email = emailField ? (values[emailField.key] ?? "") : "";
  const when = formatTime(receivedAt);
  const sheetId = envValue("GOOGLE_SHEET_ID");
  const sheetUrl = sheetId ? `https://docs.google.com/spreadsheets/d/${encodeURIComponent(sheetId)}/edit` : "";
  const replyUrl = email ? `mailto:${email}?subject=${encodeURIComponent(`Re: your ${def.label} to ${SITE}`)}` : "";
  const saved = `Sent by the ${def.label} form on the ${SITE} website and saved to the "${def.tab}" tab of the forms sheet.`;
  const replyNote = email ? `Reply to this email to write to ${first || email} directly.` : "";

  const text = [
    heading,
    `From ${name ? `${name} (${email})` : email}, ${when}`,
    "",
    ...def.fields.map((f) => {
      const value = values[f.key] || "Not given";
      return isLong(f.max) ? `\n${f.header}:\n${value}\n` : `${f.header}: ${value}`;
    }),
    "",
    saved,
    ...(sheetUrl ? [`Open the sheet: ${sheetUrl}`] : []),
    ...(replyNote ? [replyNote] : []),
  ].join("\n");

  const link = (href: string, label: string) =>
    `<a href="${escapeHtml(href)}" style="color:${LINK}">${escapeHtml(label)}</a>`;
  const valueHtml = (kind: string | undefined, value: string) => {
    if (!value) return `<span style="color:#9aa3ae;font-weight:normal">Not given</span>`;
    if (kind === "email") return link(`mailto:${value}`, value);
    if (/^https?:\/\/\S+$/i.test(value)) return link(value, value);
    return toHtml(value);
  };
  const rule = `border-bottom:1px solid ${RULE}`;
  const rows = def.fields
    .map((f) => {
      const value = values[f.key] ?? "";
      if (isLong(f.max)) {
        return `<tr><td colspan="2" style="padding:12px 0 14px;${rule}">
          <div style="color:${MUTED};font-size:13px;line-height:1.5">${escapeHtml(f.header)}</div>
          <div style="margin-top:8px;padding:12px 14px;background:${PANEL};border-left:3px solid ${SAFFRON};color:${TEXT};font-size:14px;line-height:1.65;word-break:break-word">${valueHtml(f.kind, value)}</div>
        </td></tr>`;
      }
      return `<tr>
        <td valign="top" style="padding:10px 12px 10px 0;width:38%;color:${MUTED};font-size:13px;line-height:1.5;${rule}">${escapeHtml(f.header)}</td>
        <td valign="top" style="padding:10px 0;color:${TEXT};font-size:14px;line-height:1.5;font-weight:bold;word-break:break-word;${rule}">${valueHtml(f.kind, value)}</td>
      </tr>`;
    })
    .join("");

  const button = (href: string, label: string, solid: boolean) =>
    `<a href="${escapeHtml(href)}" style="display:inline-block;margin:0 8px 8px 0;padding:${solid ? "11px 22px" : "10px 21px"};border-radius:999px;font-size:14px;font-weight:bold;text-decoration:none;${
      solid ? `background:${NAVY};color:#ffffff` : `background:#ffffff;color:${NAVY};border:1px solid #d6cdbd`
    }">${escapeHtml(label)}</a>`;
  const buttons = [
    replyUrl ? button(replyUrl, first ? `Reply to ${first}` : "Reply by email", true) : "",
    sheetUrl ? button(sheetUrl, "Open the sheet", !replyUrl) : "",
  ].join("");
  const fromLine = name
    ? `From <strong style="color:${TEXT}">${escapeHtml(name)}</strong>${email ? ` (${link(`mailto:${email}`, email)})` : ""}`
    : `From ${email ? link(`mailto:${email}`, email) : "the website"}`;

  // Tables and inline styles: what email clients (Outlook, Gmail) reliably show.
  const html = `<!doctype html>
<html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>${escapeHtml(subject)}</title></head>
<body style="margin:0;padding:0;background:${BACKDROP}">
<div style="display:none;max-height:0;overflow:hidden;opacity:0">${escapeHtml(`${name || email}, ${when}`)}</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${BACKDROP};padding:24px 12px">
<tr><td align="center">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:640px;background:#ffffff;border-radius:14px;overflow:hidden;font-family:Arial,Helvetica,sans-serif">
    <tr><td style="background:${NAVY};padding:22px 28px;border-bottom:4px solid ${SAFFRON}">
      <div style="color:${SAFFRON};font-size:11px;font-weight:bold;letter-spacing:2px;text-transform:uppercase">Website submission</div>
      <div style="margin-top:5px;color:#ffffff;font-size:18px;font-weight:bold">${SITE}</div>
    </td></tr>
    <tr><td style="padding:28px 28px 0">
      <span style="display:inline-block;padding:5px 12px;border-radius:999px;background:${SAFFRON_TINT};color:${SAFFRON_INK};font-size:12px;font-weight:bold">${escapeHtml(def.tab)}</span>
      <h1 style="margin:14px 0 8px;color:${NAVY_DEEP};font-size:24px;line-height:1.25;font-weight:bold">${escapeHtml(heading)}</h1>
      <p style="margin:0;color:${MUTED};font-size:14px;line-height:1.6">${fromLine}<br>${escapeHtml(when)}</p>
    </td></tr>
    ${buttons ? `<tr><td style="padding:20px 28px 0">${buttons}</td></tr>` : ""}
    <tr><td style="padding:20px 28px 24px">
      <div style="padding-bottom:6px;${rule};color:${MUTED};font-size:11px;font-weight:bold;letter-spacing:1.5px;text-transform:uppercase">Submission details</div>
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0">${rows}</table>
    </td></tr>
    <tr><td style="background:${PANEL};padding:16px 28px;color:${MUTED};font-size:12px;line-height:1.6">
      ${escapeHtml(saved)}${replyNote ? `<br>${escapeHtml(replyNote)}` : ""}
    </td></tr>
  </table>
</td></tr>
</table>
</body></html>`;

  return { subject, text, html, replyTo: email || undefined };
}

/** Sends one email through the EMAIL_* SMTP account. */
export async function sendEmail(to: string, { subject, text, html, replyTo }: Email) {
  const host = envValue("EMAIL_HOST");
  const user = envValue("EMAIL_HOST_USER");
  const pass = envValue("EMAIL_HOST_PASSWORD");
  if (!host || !user || !pass) throw new Error("Missing EMAIL_HOST, EMAIL_HOST_USER or EMAIL_HOST_PASSWORD.");

  const port = Number(envValue("EMAIL_PORT") || 587);
  const transport = nodemailer.createTransport({
    host,
    port,
    secure: port === 465, // 465 = implicit TLS; 587 = STARTTLS
    auth: { user, pass },
  });
  await transport.sendMail({
    from: { name: SITE, address: envValue("DEFAULT_FROM_EMAIL") || user },
    to,
    replyTo,
    subject,
    text,
    html,
  });
}

/** Emails the team (LEADS_NOTIFY_EMAIL) the submission, laid out field by field. */
export async function sendNotification(def: FormDef, values: Record<string, string>) {
  const to = envValue("LEADS_NOTIFY_EMAIL");
  if (!to) throw new Error("Missing LEADS_NOTIFY_EMAIL.");
  await sendEmail(to, notificationEmail(def, values));
}
