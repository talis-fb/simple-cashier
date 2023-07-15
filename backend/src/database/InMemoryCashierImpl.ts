import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CashierRepository } from './CashierRepository.repository';
import { CashData, CashEntity } from '../entity/Cash.entity';
import crypto from 'crypto'

@Injectable()
export class InMemoryCashierImpl extends CashierRepository {
  private cashList: CashEntity[] = [];

  async getAll(): Promise<CashEntity[]> {
    return this.cashList;
  }

  async getById(id: string): Promise<CashEntity | null> {
    const cash = this.cashList.find((item) => item.id === id);
    return cash ? cash : null;
  }

  async create(data: CashData): Promise<CashEntity> {
    const newCash: CashEntity = {
      id: crypto.randomUUID(), // Generate a random ID or use any other logic
      date: new Date(),
      ...data,
    };
    this.cashList.push(newCash);
    return newCash;
  }

  async update(id: string, data: CashData): Promise<CashEntity | null> {
    const cashIndex = this.cashList.findIndex((item) => item.id === id);
    if (cashIndex === -1) {
      return null;
    }

    const updatedCash: CashEntity = {
      ...this.cashList[cashIndex],
      ...data,
    };

    this.cashList[cashIndex] = updatedCash;
    return updatedCash;
  }

  async delete(id: string): Promise<boolean> {
    const cashIndex = this.cashList.findIndex((item) => item.id === id);
    if (cashIndex === -1) {
      return false;
    }
    this.cashList.splice(cashIndex, 1);
    return true;
  }
}

