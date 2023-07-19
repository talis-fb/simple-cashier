<script setup lang="ts">
import { reactive } from 'vue'

import { useStore } from '@/stores/counter'
import { onMounted } from 'vue'
const { currentTrade, comingFromAnOption, resetTrade } = useStore()

import type { Service, TradeData } from '@/types'
import { ref } from 'vue'

// onMounted(() => {
//   if(currentTrade) {
//     formData
//   }
// })

function submit() {
  resetTrade()
}

function clearForm() {}
</script>

<template>
  <form @submit.prevent="submit">

    <v-text-field 
      :disabled="comingFromAnOption" 
      v-model="currentTrade.titulo" 
      label="Name"
    />

    <v-text-field
      label="Phone Number"
      :disabled="comingFromAnOption"
      v-model="currentTrade.valor"
    />

    <v-text-field 
      label="E-mail"
      :disabled="comingFromAnOption"
      v-model="currentTrade.comisao"
    />

    <v-text-field 
      label="E-mail"
      :disabled="comingFromAnOption"
      v-model="currentTrade.categoria"
    />

    <!-- <v-text-field v-model="currentTrade?." label="E-mail"></v-text-field> -->

    <v-btn class="me-4" type="submit"> submit </v-btn>

    <v-btn @click="clearForm"> clear </v-btn>
  </form>
</template>
