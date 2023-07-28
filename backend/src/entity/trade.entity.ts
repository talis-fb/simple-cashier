import { IsDate, IsIn, IsUUID, IsNotEmpty, IsInt } from 'class-validator';
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
  @ApiProperty()
  @IsNotEmpty()
  service: Service;

  @ApiProperty()
  @IsNotEmpty()
  employee: string;

  @ApiProperty()
  @IsIn(PaymentMethodValues)
  paymentMethod: PaymentMethod;
}

export class TradeEntity extends TradeData {
  @IsUUID()
  id: string;

  @IsInt()
  date: number;
}
