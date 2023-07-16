export interface Option {
    titulo: string;
    valor: number;
    comisao: number;
    imagem?: string
    categoria?: string;
}

export type OptionConfig = Record<string, Option>

export type PaymentMethod = (typeof PaymentMethodValues)[number];

export const PaymentMethodValues = [
'cash',
'pix',
'debit-card',
'credit-card',
] as const;
  
export interface Service {
    name: string;
    title: string;
    value: number;
    commission: number;
}
  
export interface TradeData {
    service: Service;
    employee: string;
    paymentMethod: PaymentMethod;
}