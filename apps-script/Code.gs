/**
 * apps-script/Code.gs
 * ─────────────────────────────────────────────────────────────────────────────
 * Google Apps Script Web App.
 * Deploy as: Execute as Me | Anyone can access (no sign-in).
 *
 * Features:
 * - Accepts POST with JSON body (Content-Type: text/plain or application/json)
 * - Creates sheet columns DYNAMICALLY from submitted field keys
 * - Appends rows; creates sheet if missing
 * - Returns JSON { result: "success" } or { result: "error", error: "..." }
 */

var SHEET_NAME = "Leads";

function doPost(e) {
  var output = ContentService.createTextOutput();
  output.setMimeType(ContentService.MimeType.JSON);

  try {
    var payload = JSON.parse(e.postData.contents);

    // Honeypot check – silently discard bot submissions
    if (payload.website) {
      output.setContent(JSON.stringify({ result: "success" }));
      return output;
    }

    var ss    = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getSheetByName(SHEET_NAME) || ss.insertSheet(SHEET_NAME);

    // ── Build / sync header row ──────────────────────────────────────────
    var keys        = Object.keys(payload);
    var headerRange = sheet.getRange(1, 1, 1, sheet.getLastColumn() || 1);
    var existingHeaders = headerRange.getValues()[0].filter(String);  // remove empty

    // Add any new keys not yet in the header
    var newKeys = keys.filter(function(k) { return existingHeaders.indexOf(k) === -1; });
    newKeys.forEach(function(k) {
      existingHeaders.push(k);
    });

    // Write back full header row if anything changed
    if (newKeys.length > 0) {
      sheet.getRange(1, 1, 1, existingHeaders.length).setValues([existingHeaders]);
      // Style header
      var headerRow = sheet.getRange(1, 1, 1, existingHeaders.length);
      headerRow.setBackground("#1B4332");
      headerRow.setFontColor("#FFFFFF");
      headerRow.setFontWeight("bold");
      sheet.setFrozenRows(1);
    }

    // Re-read current headers (may have been reloaded)
    var currentHeaders = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];

    // ── Append data row ─────────────────────────────────────────────────
    var row = currentHeaders.map(function(col) {
      return payload.hasOwnProperty(col) ? payload[col] : "";
    });

    sheet.appendRow(row);

    // Auto-resize columns for readability
    sheet.autoResizeColumns(1, currentHeaders.length);

    output.setContent(JSON.stringify({ result: "success" }));
  } catch (err) {
    output.setContent(JSON.stringify({ result: "error", error: err.message }));
  }

  return output;
}

/** Health-check: GET /exec returns { status: "ok" } */
function doGet() {
  return ContentService
    .createTextOutput(JSON.stringify({ status: "ok", sheet: SHEET_NAME }))
    .setMimeType(ContentService.MimeType.JSON);
}
