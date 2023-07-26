import { readFileSync } from "fs";
import { join } from "path";

export interface GoogleConfig {
  // clientEmail: string
  // privateKey: string
  spreadsheetId: string;
  sheetName: string;
  credentials: any;
}

export default () => {
  // clientEmail: process.env.GOOGLE_SHEETS_CLIENT_EMAIL,
  // privateKey: process.env.GOOGLE_SHEETS_PRIVATE_KEY.replace(/\\n/g, '\n'),

  // console.log("@@@@@@@@@@@@@@@@");
  // console.log(process.env);
  // console.log("---");
  // console.log(process.env.GOOGLE_SHEETS_SPREADSHEET_ID);
  // console.log("@@@@@@@@@@@@@@@@");

  const CREDENTIALS_FILE = join(__dirname, "..", "..", "credentials.json");

  return {
    "google-sheets": {
      spreadsheetId: process.env.GOOGLE_SHEETS_SPREADSHEET_ID,
      sheetName: process.env.GOOGLE_SHEETS_SHEETNAME,
      credentials: JSON.parse(readFileSync(CREDENTIALS_FILE).toString()),
    } as GoogleConfig,
  };
};
