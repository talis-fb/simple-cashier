<script setup lang="ts">
import { reactive } from 'vue'

const desserts = reactive([
  { name: 'Pedro', age: 21 },
  { name: 'Lucaas', age: 25 }
])
</script>

<template>
  <v-table density="compact">
    <thead>
      <tr>
        <th class="text-left">Name</th>
        <th class="text-left">Idade</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in desserts" :key="item.name">
        <td>{{ item.name }}</td>
        <td>{{ item.age }}</td>
      </tr>
    </tbody>
  </v-table>
</template>
