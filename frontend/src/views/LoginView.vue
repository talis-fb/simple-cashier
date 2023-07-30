<script setup lang="ts">
import Servico from '@/components/Servico.vue'
import LoginUserCard from '@/components/LoginUserCard.vue'
import { useFetch } from '@/composables/useFetch'
import { computed } from 'vue'
import { onMounted, ref } from 'vue'
import type { User } from '@/types'

const { data, isFetching, error, statusCode } = useFetch('/api/v1/users')
  .get()
  .json<User[]>()

const opts = computed(() => Object.values(data.value || {}))
</script>

<template>
  <v-app>
    <v-container class="fill-height">
      <v-row v-if="error">
        <v-alert  type="error" border class="mb-5">
          STATUS {{  statusCode }} | {{ error }}
        </v-alert>
      </v-row>

      <v-row>
        <v-col v-for="(obj, ind) in data" :key="ind">
          <LoginUserCard :user="obj" />
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>
