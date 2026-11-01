/** Deploy this script as a Web App (execute as Me; access Anyone).
 * Bind it to the Google Sheet that should receive RSVPs.
 */
function doPost(e) {
  const name = String((e.parameter && e.parameter.name) || '').trim().slice(0,100);
  const meal = String((e.parameter && e.parameter.meal) || '');
  if (!name || !['Veg','Non Veg'].includes(meal)) {
    return ContentService.createTextOutput('Invalid submission');
  }
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('RSVPs') || SpreadsheetApp.getActiveSpreadsheet().insertSheet('RSVPs');
  if (sheet.getLastRow() === 0) sheet.appendRow(['Submitted at','Name','Meal preference']);
  // Prefix user-controlled values to prevent spreadsheet formula injection.
  const safeName = /^[=+@-]/.test(name) ? "'" + name : name;
  sheet.appendRow([new Date(),safeName,meal]);
  return ContentService.createTextOutput('OK');
}
