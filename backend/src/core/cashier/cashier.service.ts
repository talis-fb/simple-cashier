import { Injectable } from '@nestjs/common';
import { TradeData } from '../../entity/trade.entity';
import { CashierRepository } from '../../database/repository/CashierRepository.repository';

@Injectable()
export class CashierService {
  constructor(private readonly dbService: CashierRepository) {}

  create(trade: TradeData) {
    return this.dbService.create(trade);
  }

  findAll() {
    return this.dbService.getAll();
  }

  findOne(id: string) {
    return this.dbService.getById(id);
  }

  update(id: string, body: TradeData) {
    return this.dbService.update(id, body);
  }

  remove(id: string) {
    return this.dbService.delete(id);
  }
}
