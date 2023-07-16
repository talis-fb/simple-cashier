<script setup lang="ts">
import { reactive } from 'vue'

import { useStore } from '@/stores/counter'
import { onMounted } from 'vue';
const { currentTrade, setTrade, resetTrade } = useStore()

import type { Service, TradeData } from '@/types'
import { ref } from 'vue';

onMounted(() => {
  if(currentTrade) {
    formData
  }
})

const form = reactive<TradeData>({
  employee:'',
  paymentMethod: '',
  service: {
    commission
  }
})

function submit() {
  resetTrade()
}

</script>

<template>
  <form @submit.prevent="submit">
    <v-text-field v-model="currentTrade?.titulo" :counter="10" label="Name"></v-text-field>

    <v-text-field v-model="currentTrade?.valor" :counter="7" label="Phone Number"></v-text-field>

    <v-text-field v-model="currentTrade?.comisao" label="E-mail"></v-text-field>

    <v-text-field v-model="currentTrade?.categoria" label="E-mail"></v-text-field>

    <v-text-field v-model="currentTrade?." label="E-mail"></v-text-field>

    <v-btn class="me-4" type="submit"> submit </v-btn>

    <v-btn @click="() => {}"> clear </v-btn>
  </form>
</template>
