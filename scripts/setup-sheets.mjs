/**
 * Creates a tab in the Google Sheet for every form in src/lib/forms.ts, with
 * its header row (bold, frozen). Safe to rerun: existing tabs keep their rows
 * and only gain headers they are missing. An empty "Sheet1" becomes the first
 * form's tab rather than being left behind.
 *
 *   node --experimental-strip-types --env-file=.env.local scripts/setup-sheets.mjs
 */

import { google } from "googleapis";
import { FORMS, formHeaders } from "../src/lib/forms.ts";

const env = (name) => {
  let value = (process.env[name] ?? "").trim();
  if (/^(["']).*\1$/s.test(value)) value = value.slice(1, -1);
  return value;
};

const spreadsheetId = env("GOOGLE_SHEET_ID");
const auth = new google.auth.JWT({
  email: env("GOOGLE_CLIENT_EMAIL"),
  key: env("GOOGLE_PRIVATE_KEY").replace(/\\n/g, "\n"),
  scopes: ["https://www.googleapis.com/auth/spreadsheets"],
});
const sheets = google.sheets({ version: "v4", auth });
const quoted = (title) => `'${title.replace(/'/g, "''")}'`;

const meta = await sheets.spreadsheets.get({ spreadsheetId, fields: "sheets.properties(sheetId,title)" });
const tabs = new Map(meta.data.sheets.map((s) => [s.properties.title, s.properties.sheetId]));
const defs = Object.values(FORMS);
const requests = [];

// Reuse an empty default tab for the first form.
if (tabs.has("Sheet1") && !tabs.has(defs[0].tab)) {
  const rows = await sheets.spreadsheets.values.get({ spreadsheetId, range: "Sheet1!A1:Z5" });
  if (!rows.data.values?.length) {
    const sheetId = tabs.get("Sheet1");
    requests.push({ updateSheetProperties: { properties: { sheetId, title: defs[0].tab }, fields: "title" } });
    tabs.delete("Sheet1");
    tabs.set(defs[0].tab, sheetId);
  }
}
for (const def of defs) {
  if (!tabs.has(def.tab)) requests.push({ addSheet: { properties: { title: def.tab } } });
}
if (requests.length) {
  const result = await sheets.spreadsheets.batchUpdate({ spreadsheetId, requestBody: { requests } });
  for (const reply of result.data.replies ?? []) {
    if (reply.addSheet) tabs.set(reply.addSheet.properties.title, reply.addSheet.properties.sheetId);
  }
}

const format = [];
for (const def of defs) {
  const range = `${quoted(def.tab)}!1:1`;
  const current = ((await sheets.spreadsheets.values.get({ spreadsheetId, range })).data.values?.[0] ?? []).map(String);
  const missing = formHeaders(def).filter((h) => !current.includes(h));
  if (missing.length) {
    await sheets.spreadsheets.values.update({
      spreadsheetId,
      range,
      valueInputOption: "RAW",
      requestBody: { values: [[...current, ...missing]] },
    });
  }
  const sheetId = tabs.get(def.tab);
  format.push(
    {
      updateSheetProperties: {
        properties: { sheetId, gridProperties: { frozenRowCount: 1 } },
        fields: "gridProperties.frozenRowCount",
      },
    },
    {
      repeatCell: {
        range: { sheetId, startRowIndex: 0, endRowIndex: 1 },
        cell: { userEnteredFormat: { textFormat: { bold: true } } },
        fields: "userEnteredFormat.textFormat.bold",
      },
    },
    {
      autoResizeDimensions: {
        dimensions: { sheetId, dimension: "COLUMNS", startIndex: 0, endIndex: current.length + missing.length },
      },
    },
  );
  console.log(`${def.tab}: ${missing.length ? `added ${missing.length} header(s)` : "headers already in place"}`);
}
await sheets.spreadsheets.batchUpdate({ spreadsheetId, requestBody: { requests: format } });
