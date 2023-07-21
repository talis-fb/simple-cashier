<script setup lang="ts">
import { reactive } from 'vue'

import { useFetch } from '@vueuse/core'
import { computed } from 'vue'
import { onMounted, ref } from 'vue'
import type { TradeData } from '@/types'

const NAME = 'joao'
const { data, isFetching, error } = useFetch(`http://localhost:3000/api/v1/caixa/employee/${NAME}`)
  .get()
  .json<TradeData[]>()

const records = computed(() => Object.values(data.value || []))
</script>

<template>
  <v-container>
    <v-table density="compact">
      <thead>
        <tr>
          <th class="text-left">Name</th>
          <th class="text-left">Idade</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, ind) in data" :key="ind">
          <td>{{ item.date.toDateString() }}</td>
          <td>{{ item.service.title }}</td>
          <td>{{ item.service.value }}</td>
        </tr>
      </tbody>
    </v-table>
  </v-container>
</template>
