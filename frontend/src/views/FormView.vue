<script setup lang="ts">
import { useStore } from '@/stores/counter'
const { currentTrade, comingFromAnOption, resetTrade } = useStore()

import SelectMeioPagamento from '@/components/SelectMeioPagamento.vue'
import { ref } from 'vue';

function submit() {
  resetTrade()
}

function clearForm() {}

const meioPagamento = ref()
</script>

<template>

<v-row justify="center">
    <v-col
      cols="12"
      sm="10"
      md="8"
      lg="6"
    >
  <form @submit.prevent="submit">

    <v-text-field 
      label="Nome do serviço"
      :disabled="comingFromAnOption" 
      v-model="currentTrade.titulo" 
      variant="outlined"
    />

    <v-text-field
      label="Valor"
      :disabled="comingFromAnOption"
      v-model="currentTrade.valor"
      variant="outlined"
    />

    <v-text-field
      label="Meio de pagamento"
      :disabled="comingFromAnOption"
      v-model="currentTrade.valor"
      variant="outlined"
    />

    <v-text-field 
      label="Comissão"
      :disabled="comingFromAnOption"
      v-model="currentTrade.comisao"
      variant="outlined"
    />

    <v-text-field 
      label="Categoria"
      :disabled="comingFromAnOption"
      v-model="currentTrade.categoria"
      variant="outlined"
    />

    <SelectMeioPagamento v-model="meioPagamento" />

    <v-btn class="me-4" type="submit"> submit </v-btn>

    <v-btn @click="clearForm"> clear </v-btn>
  </form>
</v-col>
  </v-row>
</template>
