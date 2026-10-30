import "server-only";
import { google } from "googleapis";
import { SUBMITTED_AT, formHeaders, type FormDef } from "./forms";

/**
 * Saves a form submission as a row in its form's tab of the Google Sheet,
 * through a service account. Called by app/(site)/contact/actions.ts, which
 * then emails the team (lib/notify.ts). Same scheme as the Commonwealth
 * Entrepreneurs Forum site.
 *
 * Environment variables (.env.local):
 *   GOOGLE_SHEET_ID, GOOGLE_CLIENT_EMAIL, GOOGLE_PRIVATE_KEY
 * The service account needs Editor access to the sheet.
 */

/**
 * Read an env var, trimming whitespace and one pair of wrapping quotes, since
 * hosting dashboards and .env styles differ on whether the quotes survive.
 */
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

function getSheetsClient() {
  const email = envValue("GOOGLE_CLIENT_EMAIL");
  // Keys stored in .env keep their newlines as a literal "\n"; restore them.
  const key = envValue("GOOGLE_PRIVATE_KEY").replace(/\\n/g, "\n");
  if (!email || !key) throw new Error("Missing GOOGLE_CLIENT_EMAIL or GOOGLE_PRIVATE_KEY.");

  const auth = new google.auth.JWT({ email, key, scopes: ["https://www.googleapis.com/auth/spreadsheets"] });
  return google.sheets({ version: "v4", auth });
}

/** Appends one submission (`values` keyed by field key) to its form's tab. */
export async function saveSubmission(def: FormDef, values: Record<string, string>) {
  const spreadsheetId = envValue("GOOGLE_SHEET_ID");
  if (!spreadsheetId) throw new Error("Missing GOOGLE_SHEET_ID.");
  const sheets = getSheetsClient();
  const tab = `'${def.tab.replace(/'/g, "''")}'`;

  const record: Record<string, string> = { [SUBMITTED_AT]: new Date().toISOString().replace("T", " ").slice(0, 19) };
  for (const field of def.fields) record[field.header] = values[field.key] ?? "";

  // A tab removed by hand is recreated, with its headers.
  const meta = await sheets.spreadsheets.get({ spreadsheetId, fields: "sheets.properties.title" });
  if (!meta.data.sheets?.some((s) => s.properties?.title === def.tab)) {
    await sheets.spreadsheets.batchUpdate({
      spreadsheetId,
      requestBody: {
        requests: [{ addSheet: { properties: { title: def.tab, gridProperties: { frozenRowCount: 1 } } } }],
      },
    });
  }

  // Match values to headers by name, so a column moved by hand in the sheet
  // still lines up. Missing headers (a new field, or an empty row 1) are added.
  const headerResponse = await sheets.spreadsheets.values.get({ spreadsheetId, range: `${tab}!1:1` });
  let headers = (headerResponse.data.values?.[0] ?? []).map(String);
  const missing = formHeaders(def).filter((header) => !headers.includes(header));
  if (missing.length > 0) {
    headers = [...headers, ...missing];
    await sheets.spreadsheets.values.update({
      spreadsheetId,
      range: `${tab}!1:1`,
      valueInputOption: "RAW",
      requestBody: { values: [headers] },
    });
  }

  // RAW keeps user input literal, so a message starting with "=" is never
  // evaluated as a formula.
  await sheets.spreadsheets.values.append({
    spreadsheetId,
    range: `${tab}!A1`,
    valueInputOption: "RAW",
    insertDataOption: "INSERT_ROWS",
    requestBody: { values: [headers.map((header) => record[header] ?? "")] },
  });
}
