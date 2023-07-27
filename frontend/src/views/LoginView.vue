<script setup lang="ts">
import Servico from '@/components/Servico.vue'
import LoginUserCard from '@/components/LoginUserCard.vue'
import { useFetch } from '@vueuse/core'
import { computed } from 'vue'
import { onMounted, ref } from 'vue'
import type { User } from '@/types'

const { data, isFetching, error } = useFetch('http://localhost:3000/api/v1/users')
  .get()
  .json<User[]>()

const opts = computed(() => Object.values(data.value || {}))
</script>

<template>
  <v-app>
    <v-container class="fill-height">
      <v-row>
        <v-col v-for="(obj, ind) in data" :key="ind">
          <LoginUserCard :user="obj" />
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>
