import { IsDate, IsIn, IsUUID, IsNotEmpty } from 'class-validator'
import { Option } from './Option.entity'

export const PaymentMethodValues = ['cash', 'pix', 'debit-card', 'credit-card'] as const;
export type PaymentMethod = typeof PaymentMethodValues[number];

export class CashData {
    @IsNotEmpty()
    option: Option

    @IsNotEmpty()
    employee: string

    @IsIn(PaymentMethodValues)
    paymentMethod: PaymentMethod;
}


export class CashEntity extends CashData {
    @IsUUID()
    id: string

    @IsDate()
    date: Date
}
