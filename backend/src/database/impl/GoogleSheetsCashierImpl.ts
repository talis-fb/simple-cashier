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
import * as moment from 'moment-timezone'


@Injectable()
export class GoogleSpreadsheetCashierImpl implements CashierRepository {
  private doc: GoogleSpreadsheet;

  private readonly spreadsheetId: string;
  private readonly sheetName: string;
  private sheet: GoogleSpreadsheetWorksheet | null;

  private isAuth: boolean;

  constructor(private readonly configService: ConfigService) {
    const { spreadsheetId, sheetName, privateKey, clientEmail } = this.configService.get<
      GoogleConfig
    >(
      "google-sheets",
    );

    const auth = new JWT({
      key: privateKey,
      email: clientEmail,
      scopes: [
        "https://www.googleapis.com/auth/spreadsheets",
      ],
    });
    const googleSheets = new GoogleSpreadsheet(spreadsheetId, auth);

    this.doc = googleSheets;
    this.spreadsheetId = spreadsheetId;
    this.sheetName = sheetName;

    this.isAuth = false;
  }

  private async authorize() {
    if (!this.isAuth) {
      console.log("Authenticating...");
      await this.doc.loadInfo();
      this.sheet = this.doc.sheetsByTitle[this.sheetName]
      console.log("[ Authentication ] => OK");
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

    const entity: TradeEntity = { ...data, id: randomUUID(), date: new Date().getTime() };

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
    const formattedDate = moment(new Date(data.date)).tz("America/Recife").format('DD/MM/YYYY HH:mm')

    return {
      service_name: data.service.name,
      service_value: data.service.value,
      service_commission: data.service.commission,
      service_tip: data.service.tip,
      employee: data.employee,
      payment_method: data.paymentMethod,
      id: data.id,
      date: formattedDate,
    };
  }

  private mapToTradeEntity(row: GoogleSpreadsheetRow): TradeEntity {
    const date = moment(row.get('date'), 'DD/MM/YYYY HH:mm').toDate()

    return {
      id: row.get("id"),
      date: date.getTime(),
      service: {
        name: row.get("service_name"),
        title: row.get("service_name"),
        value: parseFloat(row.get("service_value")),
        commission: parseFloat(row.get("service_commission")),
        tip: parseFloat(row.get("service_tip"))
      },
      employee: row.get("employee"),
      paymentMethod: row.get("payment_method"),
    };
  }
}
