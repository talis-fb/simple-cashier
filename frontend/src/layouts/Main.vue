<script lang="ts" setup>
import { RouterLink } from 'vue-router'
//
</script>

<template>
  <v-app>
    <v-app-bar>
      <v-spacer></v-spacer>
      
      <v-tabs
        centered
        color="grey-darken-2"
      >
        <v-tab to="/">Serviços</v-tab>
        <v-tab to="/get">Registrados</v-tab>
      </v-tabs>
      
      <v-spacer></v-spacer>

      <v-avatar
        class="hidden-sm-and-down"
        color="grey-darken-1"
        size="32"
      ></v-avatar>

    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>
