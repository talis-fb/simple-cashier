import { PaymentMethodValues } from '@/constants'

export type PaymentMethod = (typeof PaymentMethodValues)[number]

export interface Service {
  name: string
  title: string
  value: number
  commission: number
  tip: number
}

export interface TradeData {
  id?: string
  service: Service
  date: string
  employee: string
  paymentMethod: PaymentMethod
}

export interface User {
  nome: string
  foto: string
}

export interface Option {
  titulo: string
  valor: number
  comissao: number
  imagem?: string
  categoria?: string
}

export type OptionConfig = Record<string, Option>
