import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { OptionConfig, Option } from '@/types'

const DEFAULT_TRADE = {
  imagem: '',
  comissao: 0,
  titulo: '',
  categoria: '',
  valor: 0
} as const

export const useStore = defineStore('options', () => {
  const currentTrade = ref<Option>(DEFAULT_TRADE)
  const comingFromAnOption = ref<boolean>(false)

  function setTrade(trade: Option) {
    currentTrade.value = trade
    comingFromAnOption.value = true
  }

  function resetTrade() {
    currentTrade.value = DEFAULT_TRADE
    comingFromAnOption.value = false
  }

  return { currentTrade, comingFromAnOption, setTrade, resetTrade }
})
