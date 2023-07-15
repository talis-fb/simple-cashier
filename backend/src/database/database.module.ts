import { Module } from '@nestjs/common';

import { ConfigModule } from '@nestjs/config';
import googleSheetsConfig from '../config/google-sheets.config';
import optionsConfig from '../config/options.config';

import { CashierRepository } from './repository/CashierRepository.repository';
import { InMemoryCashierImpl } from './impl/InMemoryCashierImpl';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [googleSheetsConfig, optionsConfig],
    }),
  ],
  providers: [
    {
      provide: CashierRepository,
      useClass: InMemoryCashierImpl,
    },
  ],
  exports: [CashierRepository],
})
export class DatabaseModule {}
