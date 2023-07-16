import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { OptionConfig, Option } from '@/types'

export const useStore = defineStore('options', () => {
  const currentTrade = ref<Option>()

  function setTrade(trade: Option) {
    currentTrade.value = trade
  }

  function resetTrade() {
    currentTrade.value = undefined
  }

  return { currentTrade, setTrade, resetTrade }
})
