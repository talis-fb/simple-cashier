import { TradeData, TradeEntity } from '../../entity/trade.entity';

export abstract class CashierRepository {
  abstract getAll(): Promise<TradeEntity[]>;
  abstract getById(id: string): Promise<TradeEntity | null>;
  abstract create(data: TradeData): Promise<TradeEntity>;
  abstract update(
    id: string,
    data: Partial<TradeData>,
  ): Promise<TradeEntity | null>;
  abstract delete(id: string): Promise<boolean>;
}
