<script setup lang="ts">
import Servico from '@/components/Servico.vue'
import { useFetch } from '@vueuse/core'
import { ref, watch, computed } from 'vue'
import type { OptionConfig, Option } from '@/types'

// const errorAlert = computed(() => {
//   return error.value ||
// })

const { data, isFetching, error, statusCode } = useFetch('/api/v1/options')
  .get()
  .json<OptionConfig>()

// Search Filter
const searchQueryFilter = ref('')

const optionsToShow = computed(() => {
  const values = Object.values(data.value || {})

  if (searchQueryFilter.value.length < 2) return values

  return values.filter((el) =>
    el.titulo.toLowerCase().includes(searchQueryFilter.value.toLowerCase())
  )
})
</script>

<template>
  <v-container class="pt-5">

    <v-row v-if="error">
      <v-alert  type="error" border class="mb-5">
        STATUS {{  statusCode }} | {{ error }}
      </v-alert>
    </v-row>

    <v-row v-if="isFetching">
      <v-progress-linear
        :active="isFetching"
        color="green-accent-4"
        rounded
        height="6"
        indeterminate
      />
    </v-row>
      
    <v-row>
      <v-card class="mx-auto" width="100%" max-width="400">
        <v-card-text>
          <v-text-field
            density="compact"
            variant="solo"
            label="Search templates"
            append-inner-icon="mdi-magnify"
            single-line
            hide-details
            v-model="searchQueryFilter"
          ></v-text-field>
        </v-card-text>
      </v-card>
    </v-row>

    <v-row>
      <template v-if="optionsToShow">
        <v-col v-for="option in optionsToShow">
          <Servico :option="option" />
        </v-col>
      </template>
    </v-row>
  </v-container>
</template>
