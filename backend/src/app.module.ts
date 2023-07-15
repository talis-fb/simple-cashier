import { Module } from '@nestjs/common';

import { ConfigModule } from '@nestjs/config';
import googleSheetsConfig from './config/google-sheets.config';
import optionsConfig from './config/options.config';

import { CashierModule } from './core/cashier/cashier.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [googleSheetsConfig, optionsConfig],
    }),
    CashierModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
