<script setup lang="ts">
import type { Option } from '@/types'

import { useStore } from '@/stores/counter'
const { setTrade } = useStore()

defineProps<{
  option: Option
}>()

</script>

<template>
  <v-card
    class="mx-auto"
    max-width="400"
  >
    <v-img
      v-if="option.imagem"
      :src="option.imagem"
      class="align-end text-white"
      height="100"
      cover
    />

    <v-card-item>
      <v-card-title>{{ option.titulo }}</v-card-title>
      <!-- <v-card-subtitle>{{  option.description }}</v-card-subtitle> -->
    </v-card-item>

    <v-card-actions>
      <v-btn to="/add" color="orange" @click="() => setTrade(option)">
        Efetuar
      </v-btn>
    </v-card-actions>
  </v-card>
</template>
