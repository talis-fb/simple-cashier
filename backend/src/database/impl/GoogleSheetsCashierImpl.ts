import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { readFileSync } from "fs";
import { join } from "path";
import { GoogleConfig } from "../../config/google-sheets.config";
import { CashierRepository } from "../repository/CashierRepository.repository";
import {
  GoogleSpreadsheet,
  GoogleSpreadsheetRow,
  GoogleSpreadsheetWorksheet,
} from "google-spreadsheet";
import { JWT, OAuth2Client } from "google-auth-library";
import { TradeData, TradeEntity } from "src/entity/trade.entity";
import { randomUUID } from "crypto";

@Injectable()
export class GoogleSpreadsheetCashierImpl implements CashierRepository {
  // private readonly credentials: string = credentials;
  // private authGoogle: OAuth2Client;
  private doc: GoogleSpreadsheet;

  private readonly spreadsheetId: string;
  private readonly sheetName: string;
  private sheet: GoogleSpreadsheetWorksheet | null;

  private isAuth: boolean;

  constructor(private readonly configService: ConfigService) {
    const { spreadsheetId, sheetName, credentials } = this.configService.get<
      GoogleConfig
    >(
      "google-sheets",
    );

    // console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA")
    // console.log(credentials)
    // console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA")

    const auth = new JWT({
      key: credentials["private_key"],
      email: credentials["client_email"],
      scopes: [
        "https://www.googleapis.com/auth/spreadsheets",
      ],
    });
    const googleSheets = new GoogleSpreadsheet(spreadsheetId, auth);

    // this.authGoogle = auth;
    this.doc = googleSheets;
    this.spreadsheetId = spreadsheetId;
    this.sheetName = sheetName;

    this.isAuth = false;
    // this.sheet = this.doc.sheetsById
  }

  private async authorize() {
    if (!this.isAuth) {
      console.log("Auth");
      // await this.doc.useServiceAccountAuth(this.credentials);
      await this.doc.loadInfo();
      // this.sheet = this.doc.sheetsById[this.sheetName];
      this.sheet = this.doc.sheetsByIndex[0];
      console.log("BBBBBBBBBBBB");
      this.isAuth = true;
    }
  }

  async getAll(): Promise<TradeEntity[]> {
    await this.authorize();

    const rows = await this.sheet.getRows();

    return rows.map((row) => this.mapToTradeEntity(row));
  }

  async getById(id: string): Promise<TradeEntity | null> {
    await this.authorize();
    const rows = await this.sheet!.getRows();
    const matchingRow = rows.find((row) => row.get("id") === id);
    return matchingRow ? this.mapToTradeEntity(matchingRow) : null;
  }

  async getAllOfEmployee(name: string): Promise<TradeEntity[]> {
    await this.authorize();
    const rows = await this.sheet!.getRows();
    const employeeRows = rows.filter((row) => row.get("employee") === name);
    return employeeRows.map((row) => this.mapToTradeEntity(row));
  }

  async create(data: TradeData): Promise<TradeEntity> {
    await this.authorize();

    const entity: TradeEntity = { ...data, id: randomUUID(), date: new Date() };

    const newRow = this.mapToSheetRow(entity);
    const addedRow = await this.sheet!.addRow(newRow);
    return this.mapToTradeEntity(addedRow);
  }

  async update(
    id: string,
    data: Partial<TradeData>,
  ): Promise<TradeEntity | null> {
    await this.authorize();
    const rows = await this.sheet!.getRows();
    const rowIndex = rows.findIndex((row) => row.get("id") === id);
    if (rowIndex === -1) {
      return null;
    }

    const rowSelected = rows[rowIndex];
    const updatedRow = { ...rowSelected, ...data } as GoogleSpreadsheetRow;
    await rows[rowIndex].save();
    return this.mapToTradeEntity(updatedRow);
  }

  async delete(id: string): Promise<boolean> {
    await this.authorize();
    const rows = await this.sheet!.getRows();
    const rowIndex = rows.findIndex((row) => row.get("id") === id);
    if (rowIndex === -1) {
      return false;
    }

    await rows[rowIndex].delete();
    return true;
  }

  private mapToSheetRow(data: TradeEntity): any {
    return {
      service_name: data.service.name,
      service_value: data.service.value,
      service_commission: data.service.commission,
      employee: data.employee,
      payment_method: data.paymentMethod,
      id: data.id,
      date: data.date,
    };
  }

  private mapToTradeEntity(row: GoogleSpreadsheetRow): TradeEntity {
    return {
      id: row.get("id"),
      date: new Date(row.get("date")),
      service: {
        name: row.get("service_name"),
        title: row.get("service_name"),
        value: parseFloat(row.get("service_value")),
        commission: parseFloat(row.get("service_commission")),
      },
      employee: row.get("employee"),
      paymentMethod: row.get("payment_method"),
    };
  }
}
