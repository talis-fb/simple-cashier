export interface Option {
  titulo: string
  valor: number
  comisao: number
  imagem?: string
  categoria?: string
}

export type OptionConfig = Record<string, Option>

export type PaymentMethod = (typeof PaymentMethodValues)[number]

export const PaymentMethodValues = ['cash', 'pix', 'debit-card', 'credit-card'] as const

export interface Service {
  name: string
  title: string
  value: number
  commission: number
}

export interface TradeData {
  id?: string
  service: Service
  date: Date
  employee: string
  paymentMethod: PaymentMethod
}
