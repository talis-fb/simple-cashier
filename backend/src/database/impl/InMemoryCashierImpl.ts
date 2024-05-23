import { Injectable } from '@nestjs/common';
import { CashierRepository } from '../repository/CashierRepository.repository';
import { TradeData, TradeEntity } from '../../entity/trade.entity';
import { v4 } from 'uuid';

@Injectable()
export class InMemoryCashierImpl extends CashierRepository {
  private tradeList: TradeEntity[] = [];

  async getAll(): Promise<TradeEntity[]> {
    return this.tradeList;
  }

  async getById(id: string): Promise<TradeEntity | void> {
    const cash = this.tradeList.find((item) => item.id === id);
    return cash;
  }

  async getAllOfEmployee(name: string): Promise<TradeEntity[]> {
    return this.tradeList.filter(el => el.employee == name)
  }

  async create(data: TradeData): Promise<TradeEntity> {
    const newCash: TradeEntity = {
      id: v4(), // Generate a random ID or use any other logic
      date: new Date().getTime(),
      ...data,
    };
    this.tradeList.push(newCash);
    return newCash;
  }

  async update(id: string, data: TradeData): Promise<TradeEntity | null> {
    const cashIndex = this.tradeList.findIndex((item) => item.id === id);
    if (cashIndex === -1) {
      return null;
    }

    const updatedCash: TradeEntity = {
      ...this.tradeList[cashIndex],
      ...data,
    };

    this.tradeList[cashIndex] = updatedCash;
    return updatedCash;
  }

  async delete(id: string): Promise<boolean> {
    const cashIndex = this.tradeList.findIndex((item) => item.id === id);
    if (cashIndex === -1) {
      return false;
    }
    this.tradeList.splice(cashIndex, 1);
    return true;
  }
}
