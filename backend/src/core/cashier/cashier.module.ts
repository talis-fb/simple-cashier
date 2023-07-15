import { Module } from '@nestjs/common';

import { CashierController } from './cashier.controller';
import { CashierService } from './cashier.service';
import { DatabaseModule } from '../../database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [CashierController],
  providers: [CashierService],
})
export class CashierModule {}
