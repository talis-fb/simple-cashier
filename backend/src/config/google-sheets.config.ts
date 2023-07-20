export interface GoogleConfig {
  clientEmail: string
  privateKey: string
  spreadsheetId: string
  sheetName: string
}

export default () => ({
  clientEmail: process.env.GOOGLE_SHEETS_CLIENT_EMAIL,
  privateKey: process.env.GOOGLE_SHEETS_PRIVATE_KEY.replace(/\\n/g, '\n'),
  spreadsheetId: process.env.GOOGLE_SHEETS_SPREADSHEET_ID,
  sheetName: process.env.GOOGLE_SHEETS_SHEETNAME,
});
