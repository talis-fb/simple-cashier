import { Module } from '@nestjs/common';

import { ConfigModule } from '@nestjs/config';
import googleSheetsConfig from './config/google-sheets.config';
import optionsConfig from './config/options.config';

import { CashierModule } from './core/cashier/cashier.module';
import { OptionsModule } from './core/options/options.module';
import { UsersModule } from './core/users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [googleSheetsConfig, optionsConfig],
    }),
    CashierModule,
    OptionsModule,
    UsersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
