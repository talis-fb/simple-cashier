<script setup lang="ts">
import Servico from '@/components/Servico.vue'
import { useFetch } from '@vueuse/core'
import { computed } from 'vue';
import { onMounted, ref } from 'vue'
import type { OptionConfig, Option } from '@/types'

const { data, isFetching, error } = useFetch('http://localhost:3000/api/v1/options').get().json<OptionConfig>()

const opts = computed(() => Object.values(data.value || {}))

</script>

<template>
  <div class="pt-5">
    <div v-if="opts" class="d-flex">
      <Servico 
        v-for="op in opts"
        :option="op"
      />
    </div>

    <br>
    {{  data }}
    --
    <br>


    {{ isFetching }}
    
    <br>
    ---
    <br>

    {{  error }}
  </div>
</template>
