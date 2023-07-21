<script lang="ts" setup>
import { useStore } from '@/stores/user'
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

      <v-menu>
        <template v-slot:activator="{ props }">
          <v-btn icon v-bind="props">
            <v-avatar size="50">
              <v-img :src="currentUser.foto" alt="John"></v-img>
            </v-avatar>
          </v-btn>
        </template>

        <v-card>
          <v-card-text>
            <div class="mx-auto text-center">
              <v-avatar>
                <v-img :src="currentUser.foto" alt="John" />
              </v-avatar>
              <h3>{{ currentUser.nome }}</h3>
              <v-divider class="my-3"></v-divider>
              <v-btn rounded variant="text" @click="logout">
                <v-icon icon="mdi-logout" />Sair
              </v-btn>
            </div>
          </v-card-text>
        </v-card>

        <!-- <v-list>
              <v-list-item>
                <v-list-item-title clicac >
                  <v-btn>
                    <v-icon icon="mdi-logout" />Sair
                  </v-btn>
                </v-list-item-title>
              </v-list-item>
            </v-list> -->
      </v-menu>

      <!-- <v-avatar size="50" @click="logout">
        <v-img :src="currentUser.foto" alt="John"></v-img>
      </v-avatar> -->
    </v-app-bar>

    <v-main class="p-5">
      <router-view />
    </v-main>
  </v-app>
</template>
