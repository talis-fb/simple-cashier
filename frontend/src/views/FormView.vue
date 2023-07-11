<script setup lang="ts">
import { reactive } from 'vue'

const formData = reactive({
  name: '',
  number: '',
  email: ''
})
</script>

<template>
  <form @submit.prevent="() => {}">
    <v-text-field v-model="formData.name" :counter="10" label="Name"></v-text-field>

    <v-text-field v-model="formData.number" :counter="7" label="Phone Number"></v-text-field>

    <v-text-field v-model="formData.email" label="E-mail"></v-text-field>

    <v-btn class="me-4" type="submit"> submit </v-btn>

    <v-btn @click="() => {}"> clear </v-btn>
  </form>
</template>
