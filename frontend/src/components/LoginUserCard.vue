<script setup lang="ts">
import type { User } from '@/types'
import { useStore } from '@/stores/user'
const { currentUser } = useStore()

const props = defineProps<{ user: User }>()

function submit() {
  console.log('Dsadsas')
  currentUser.foto = props.user.foto
  currentUser.nome = props.user.nome
}
</script>

<template>
  <v-card class="mx-auto" max-width="344" @click="submit" to="/">
    <v-img :src="user.foto" height="200px" cover></v-img>
    <v-card-title>
      {{ user.nome }}
    </v-card-title>
  </v-card>
</template>
