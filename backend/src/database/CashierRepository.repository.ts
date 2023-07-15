import { CashData, CashEntity } from '../entity/Cash.entity'

export abstract class CashierRepository {
  abstract getAll(): Promise<CashEntity[]>;
  abstract getById(id: string): Promise<CashEntity | null>;
  abstract create(data: CashData): Promise<CashEntity>;
  abstract update(id: string, data: Partial<CashData>): Promise<CashEntity | null>;
  abstract delete(id: string): Promise<boolean>;
}
