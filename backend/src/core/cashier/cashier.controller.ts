import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { TradeData } from '../../entity/trade.entity';
import { CashierService } from './cashier.service';

@Controller('caixa')
export class CashierController {
  constructor(private readonly cashierService: CashierService) {}

  @Post()
  async create(@Body() body: TradeData) {
    return this.cashierService.create(body);
  }

  @Get()
  async findAll() {
    return this.cashierService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.cashierService.findOne(id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() body: TradeData) {
    return this.cashierService.update(id, body);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.cashierService.remove(id);
  }
}
