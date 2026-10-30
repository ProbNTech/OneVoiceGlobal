/**
 * Every form on the site, as the Contact page's server action
 * (app/(site)/contact/actions.ts) and the sheet setup script
 * (scripts/setup-sheets.mjs) see it: the Google Sheet tab it writes to, and
 * its fields in column order. Row 1 of each tab holds "Submitted At (UTC)"
 * followed by the field headers. Same scheme as the Commonwealth
 * Entrepreneurs Forum site: the sheet and an email to the team (no database).
 *
 * This file has no imports, so the setup script can load it directly.
 */

export type FormFieldDef = {
  /** The key the submission holds it under. */
  key: string;
  /** The column header in the sheet. */
  header: string;
  required?: boolean;
  /** `email` is shown as a mail link in the notification. */
  kind?: "email";
  /** Longest accepted value; 300 unless set. */
  max?: number;
};

export type FormDef = {
  tab: string;
  /** Names the submission in the notification email. */
  label: string;
  fields: FormFieldDef[];
  /** The notification email's subject, from the submitted values. */
  subject: (v: Record<string, string>) => string;
};

export const FORMS = {
  /**
   * The Contact page's enquiry form, which every call to act on the site
   * leads to (`enquiryHref` in data/site.ts) with its kind already chosen.
   */
  enquiry: {
    tab: "Contact Enquiries",
    label: "enquiry",
    fields: [
      /** The chosen pill's label, e.g. "Volunteer" or "Donate". */
      { key: "topic", header: "Enquiry About", required: true, max: 60 },
      { key: "name", header: "Name", required: true, max: 200 },
      { key: "email", header: "Email", required: true, kind: "email", max: 320 },
      { key: "telephone", header: "Telephone", max: 40 },
      { key: "organisation", header: "Organisation", max: 200 },
      { key: "message", header: "Message", required: true, max: 5000 },
    ],
    subject: (v) => `New enquiry (${v.topic}): ${v.name}`,
  },
} satisfies Record<string, FormDef>;

export type FormId = keyof typeof FORMS;

export const SUBMITTED_AT = "Submitted At (UTC)";

export const formHeaders = (def: FormDef) => [SUBMITTED_AT, ...def.fields.map((f) => f.header)];
