<script setup lang="ts">
import { reactive } from 'vue'

import { useFetch } from '@vueuse/core'
import { computed } from 'vue'
import { onMounted, ref } from 'vue'
import type { TradeData } from '@/types'
import { useStore } from '@/stores/user'
import moment from 'moment'

const { currentUser } = useStore()

const { data, isFetching, error, statusCode } = useFetch(`http://localhost:3000/api/v1/caixa/employee/${currentUser.nome}`)
  .get()
  .json<TradeData[]>()

const records = computed(() => Object.values(data.value || []))

const dailyGain = computed(() => {
  if(data.value) {
    return data.value
      //.filter( DIARIO )
      .map(el => el.service.value * (el.service.commission/100))
      .reduce((a,b) => a + b, 0)
  }
  return null
})

const weeklyGain = computed(() => {
  if(data.value) {
    return data.value
      //.filter( SEMANAL )
      .map(el => el.service.value * (el.service.commission/100))
      .reduce((a,b) => a + b, 0)
  }
  return null
})

const dataFormatted = computed(() => {
  if(data.value) {
    return data.value
      .map(el => { 
        const date = moment(new Date(el.date)).format( 'DD/MM/YYYY HH:mm')
        return { ...el, date }
      })
  }
  return null
})

</script>

<template>
  <v-container>
    <v-row v-if="error">
        <v-alert  type="error" border class="mb-5">
          STATUS {{  statusCode }} | {{ error }}
        </v-alert>
      </v-row>

    <v-row>
      <v-col v-if="dailyGain">
        <v-card
          class="mx-auto"
          width="400"
        >
          <v-card-title>
            Ganho do dia: R$ {{  dailyGain }}
          </v-card-title>
        </v-card>
      </v-col>
      <v-col v-if="weeklyGain">

        <v-card
          class="mx-auto"
          width="400"
        >
          <v-card-title>
            Ganho da semana: R$ {{  weeklyGain }}
          </v-card-title>
        </v-card>
        </v-col>

    </v-row>

    <v-row>
      <v-col>
        <v-progress-linear
          :active="isFetching"
          color="deep-blue-accent-4"
          class="mt-3"
          rounded
          height="6"
          indeterminate
        />
      </v-col>
    </v-row>

    <v-row>
      <v-col>

        <v-table density="compact">
          <thead>
          <tr>
            <th class="text-left">Data</th>
            <th class="text-left">Serviço</th>
            <th class="text-left">Preço</th>
            <th class="text-left">Comissão</th>
          </tr>
        </thead>
        <tbody>
          
          <tr v-for="(item, ind) in dataFormatted" :key="ind">
            <td>{{ item.date }}</td>
            <td>{{ item.service.name }}</td>
            <td>{{ item.service.value }}</td>
            <td>{{ item.service.commission }}</td>
          </tr>
        </tbody>
      </v-table>
    </v-col>
    </v-row>
    </v-container>
  </template>
