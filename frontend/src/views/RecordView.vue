<script setup lang="ts">
import { reactive } from 'vue'

import { useFetch } from '@/composables/useFetch'
import { computed } from 'vue'
import { onMounted, ref } from 'vue'
import type { Service, TradeData } from '@/types'
import { useStore } from '@/stores/user'
import moment from 'moment'
import { number } from 'yup'

const { currentUser } = useStore()

const { data, isFetching, error, statusCode } = useFetch(`/api/v1/caixa/employee/${currentUser.nome}`)
  .get()
  .json<TradeData[]>()

const records = computed(() => Object.values(data.value || []))

const getComissionValue = (value: number, comission: number) => {
  return parseFloat((value * (comission / 100)).toFixed(4))
}

const getGainValue = (service: Service) => {
  const comissionValue = getComissionValue(service.value , service.commission)
  const tip = service.tip
  return comissionValue + tip
}

const START_OF_TODAY = (() => {
  const BEGIN_TODAY = new Date()
  BEGIN_TODAY.setHours(0, 0, 1, 1);
  return BEGIN_TODAY
})()

const START_OF_WEEK = ((date: Date) => {
  const dayOfWeek = date.getDay();
  const diff = date.getDate() - dayOfWeek; // Subtracting the day of the week to get to Sunday

  // Create a new date object for the beginning of Sunday
  const beginningOfSunday = new Date(date);
  beginningOfSunday.setDate(diff);

  // Reset the time to 00:00:00
  beginningOfSunday.setHours(0, 0, 0, 0);

  return beginningOfSunday;
})(START_OF_TODAY)


const dailyGain = computed(() => {
  if(data.value) {
    return data.value
    .filter(el => Number(el.date) > START_OF_TODAY.getTime())
      .map(el => getComissionValue(el.service.value, el.service.commission))
      .reduce((a,b) => a + b, 0)
  }
  return null
})

const weeklyGain = computed(() => {
  if(data.value) {
    return data.value
      .filter(el => Number(el.date) > START_OF_WEEK.getTime())
      .map(el => getComissionValue(el.service.value, el.service.commission))
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
            Ganho do dia: R$ {{  dailyGain.toFixed(2) }}
          </v-card-title>
        </v-card>
      </v-col>
      <v-col v-if="weeklyGain">

        <v-card
          class="mx-auto"
          width="400"
        >
          <v-card-title>
            Ganho da semana: R$ {{  weeklyGain.toFixed(2) }}
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
            <th class="text-left">Gorjeta</th>
            <th class="text-left">Ganho</th>
          </tr>
        </thead>
        <tbody>
          
          <tr v-for="(item, ind) in dataFormatted" :key="ind">
            <td>{{ item.date }}</td>
            <td>{{ item.service.name }}</td>
            <td>R$ {{ item.service.value }}</td>
            <td>{{ item.service.commission }} % </td>
            <td>R$ {{ item.service.tip }}</td>
            <td> + R$ {{ getGainValue(item.service) }} </td>
          </tr>
        </tbody>
      </v-table>
    </v-col>
    </v-row>
    </v-container>
  </template>
