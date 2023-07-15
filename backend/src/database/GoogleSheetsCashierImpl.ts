import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CashierRepository } from './CashierRepository.repository';
import { GoogleSpreadsheet, GoogleSpreadsheetRow } from 'google-spreadsheet';

// @Injectable
// export class GoogleSpreadsheetCashierImpl implements CashierRepository {
//   constructor(private readonly configService: ConfigService) {
//     const { clientEmail, privateKey, spreadsheetId } = this.configService.get(
//       'google-sheets',
//     );

//     this.doc = new GoogleSpreadsheet(spreadsheetId);
//     this.sheet = [];

//     this.doc.useServiceAccountAuth({
//       client_email: clientEmail,
//       private_key: privateKey,
//     });
//   }
// }
