export interface GoogleConfig {
  clientEmail: string
  privateKey: string
  spreadsheetId: string;
  sheetName: string;
}

export default () => {
  const credentials: any = JSON.parse(process.env.GOOGLE_CREDS)
  return {
    "google-sheets": {
      spreadsheetId: process.env.GOOGLE_SHEETS_SPREADSHEET_ID,
      sheetName: process.env.GOOGLE_SHEETS_SHEETNAME,
      clientEmail: credentials['client_email'],
      privateKey: credentials['private_key'],
    } as GoogleConfig,
  };
};
