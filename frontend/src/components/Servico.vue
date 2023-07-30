<script setup lang="ts">
import type { Option } from '@/types'

import { useStore } from '@/stores/options'
const { setTrade } = useStore()

defineProps<{
  option: Option
}>()
</script>

<template>
  <v-card class="mx-auto" min-width="300">
    <v-img
      v-if="option.imagem"
      :src="option.imagem"
      class="align-end text-white"
      height="100"
      cover
    />

    <v-card-item>
      <v-card-title>{{ option.titulo }}</v-card-title>
    </v-card-item>

    <div class="px-4">
      <v-chip-group>
        <v-chip prepend-icon="mdi-currency-usd" class="bg-teal-darken-1">
          <h3>
            {{ option.valor }}
          </h3>
        </v-chip>
      </v-chip-group>
    </div>

    <v-divider class="mx-4 mb-1"></v-divider>

    <v-card-actions>
      <v-btn to="/add" color="orange" @click="() => setTrade(option)"> Efetuar </v-btn>
    </v-card-actions>
  </v-card>
</template>
