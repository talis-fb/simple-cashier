import { Module } from '@nestjs/common';

// import { ConfigModule } from '@nestjs/config';
// import googleSheetsConfig from './config/google-sheets.config';
// import optionsConfig from './config/options.config';

import { CashierController } from './cashier.controller';
import { CashierService } from './cashier.service';
import { DatabaseModule } from '../../database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [CashierController],
  providers: [CashierService],
})
export class CashierModule {}
