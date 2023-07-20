import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { GoogleConfig } from '../../config/google-sheets.config';
import { CashierRepository } from '../repository/CashierRepository.repository';
import { GoogleSpreadsheet, GoogleSpreadsheetRow } from 'google-spreadsheet';
import { TradeData, TradeEntity } from 'src/entity/trade.entity';

// @Injectable
// export class GoogleSpreadsheetCashierImpl implements CashierRepository {
//   constructor(private readonly configService: ConfigService) {
//     const { clientEmail, privateKey, spreadsheetId } = this.configService.get<GoogleConfig>(
//       'google-sheets',
//     );
//
//     this.doc = new GoogleSpreadsheet(spreadsheetId);
//     this.sheet = [];
//
//     this.doc.useServiceAccountAuth({
//       client_email: clientEmail,
//       private_key: privateKey,
//     });
//   }
//
//   async create(data: TradeData): Promise<TradeEntity> {
//       
//   }
//
//   async delete(id: string): Promise<boolean> {
//       
//   }
//
//   async getAll(): Promise<TradeEntity[]> {
//       
//   }
//
//   async update(id: string, data: Partial<TradeData>): Promise<TradeEntity> {
//       
//   }
//   async getById(id: string): Promise<TradeEntity> {
//       
//   }
//
//   async getAllOfEmployee(name: string): Promise<TradeEntity[]> {
//       
//   }
// }
