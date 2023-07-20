<script lang="ts" setup>
import { useStore } from "@/stores/user"
const { currentUser, resetUser } = useStore()

import router from '@/plugins/router'

function logout() {
  resetUser()
  router.push('/login')
}

</script>

<template>
  <v-app>
    <v-app-bar>
      <v-spacer></v-spacer>

      <v-tabs centered color="grey-darken-2">
        <v-tab to="/">Serviços</v-tab>
        <v-tab to="/get">Registrados</v-tab>
      </v-tabs>

      <v-spacer></v-spacer>

      <v-avatar class="hidden-sm-and-down" size="32" @click="logout" >
        <v-img
          :src='currentUser.foto'
          alt='John'
        ></v-img>
      </v-avatar>
    </v-app-bar>

    <v-main class="p-5">
      <router-view />
    </v-main>
  </v-app>
</template>
