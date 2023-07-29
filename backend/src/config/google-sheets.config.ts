export interface GoogleConfig {
  clientEmail: string;
  privateKey: string;
  spreadsheetId: string;
  sheetName: string;
}

export default () => {
  const spreadsheetId: string = process.env.GOOGLE_SHEETS_SPREADSHEET_ID;
  const sheetName: string = process.env.GOOGLE_SHEETS_SHEETNAME;
  const clientEmail: string = process.env.GOOGLE_SHEETS_CLIENT_EMAIL;
  const privateKey: string = atob(process.env.GOOGLE_PRIVATE_KEY_BASE_64);

  return {
    "google-sheets": {
      spreadsheetId,
      sheetName,
      clientEmail,
      privateKey,
    } as GoogleConfig,
  };
};
