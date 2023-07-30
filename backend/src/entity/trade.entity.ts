import { IsIn, IsUUID, IsNotEmpty, IsInt, ValidateNested, IsDefined, IsNotEmptyObject } from 'class-validator';
import {Type } from 'class-transformer';
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
  @IsDefined()
  @IsNotEmpty()
  @IsNotEmptyObject()
  @ValidateNested({ each: true })
  @Type(() => Service)
  @ApiProperty()
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
