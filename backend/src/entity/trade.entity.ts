import { IsDate, IsIn, IsUUID, IsNotEmpty } from 'class-validator';
import { Service } from './service.entity';
import { ApiProperty } from '@nestjs/swagger';

export const PaymentMethodValues = [
  'cash',
  'pix',
  'debit-card',
  'credit-card',
] as const;
export type PaymentMethod = (typeof PaymentMethodValues)[number];

export class TradeData {
  @IsNotEmpty()
  service: Service;

  @IsNotEmpty()
  employee: string;

  @IsIn(PaymentMethodValues)
  paymentMethod: PaymentMethod;
}

export class TradeEntity extends TradeData {
  @IsUUID()
  id: string;

  @IsDate()
  date: Date;
}
