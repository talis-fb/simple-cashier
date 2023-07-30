import { Module } from "@nestjs/common";

import { ConfigModule } from "@nestjs/config";
import { ThrottlerModule } from "@nestjs/throttler";

import googleSheetsConfig from "./config/google-sheets.config";
import optionsConfig from "./config/options.config";

import { CashierModule } from "./core/cashier/cashier.module";
import { OptionsModule } from "./core/options/options.module";
import { UsersModule } from "./core/users/users.module";
import { FrontendModule } from "./core/frontend/frontend.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [googleSheetsConfig, optionsConfig],
    }),

    // Rate Limity
    ThrottlerModule.forRoot({
      ttl: 60,
      limit: 10,
    }),

    CashierModule,
    OptionsModule,
    UsersModule,
    FrontendModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
