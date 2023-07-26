import { Module } from '@nestjs/common';

import { ConfigModule } from '@nestjs/config';
import googleSheetsConfig from '../config/google-sheets.config';
import optionsConfig from '../config/options.config';

import { CashierRepository } from './repository/CashierRepository.repository';
import { InMemoryCashierImpl } from './impl/InMemoryCashierImpl';
import { GoogleSpreadsheetCashierImpl } from './impl/GoogleSheetsCashierImpl';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [googleSheetsConfig, optionsConfig],
    }),
  ],
  providers: [
    {
      provide: CashierRepository,
      useClass: GoogleSpreadsheetCashierImpl,
    },
  ],
  exports: [CashierRepository],
})
export class DatabaseModule {}
