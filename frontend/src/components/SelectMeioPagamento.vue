<script setup lang="ts">
import type { User } from '@/types'
import { useStore } from '@/stores/user'
import { ref, watch } from 'vue'
const { currentUser } = useStore()

const props = defineProps<{ modelValue: string, errorMessages?: string }>()
const emits = defineEmits(['update:modelValue'])

const METHODS_PAYMENT = [
  { name: 'cash', title: '💵 Dinheiro' },
  { name: 'pix', title: '💸 Pix' },
  { name: 'debit-card', title: '💳 Cartão Débito' },
  { name: 'credit-card', title: '💳 Cartão Crédito' }
]

const selected = ref<string>()
watch(selected, () => {
  emits('update:modelValue', selected.value)
})
</script>

<template>
  <v-select
    variant="outlined"
    label="Meio de Pagamento"
    :items="METHODS_PAYMENT"
    v-model="selected"
    item-title="title"
    item-value="name"
    :error-messages="errorMessages"
  />
</template>
