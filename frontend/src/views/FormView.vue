<script setup lang="ts">
import { useStore as useOptionStore } from '@/stores/counter'
import { useStore as useUserStore } from '@/stores/user'
import router from '@/plugins/router'
const { currentTrade, comingFromAnOption, resetTrade } = useOptionStore()
const { currentUser } = useUserStore()

import SelectMeioPagamento from '@/components/SelectMeioPagamento.vue'
import { ref } from 'vue'
import { useFetch } from '@vueuse/core'
import type { TradeData, PaymentMethod } from '@/types'
import { PaymentMethodValues } from '@/constants'
import * as yup from 'yup'

import { useField, useForm } from 'vee-validate'
import { onMounted } from 'vue'

const { handleSubmit, resetForm, isSubmitting } = useForm({
  validationSchema: yup.object({
    serviceName: yup.string().required(),
    value: yup.number().required().positive(),
    paymentMethod: yup.string().required().oneOf(PaymentMethodValues),
    comission: yup.number().required().positive().max(100)
  })
})

const serviceName = useField('serviceName')
const value = useField('value')
const paymentMethod = useField<PaymentMethod>('paymentMethod')
const comission = useField('comission')

const errorAlert = ref('')
const errorStatus = ref(0)

onMounted(() => {
  if (comingFromAnOption) {
    serviceName.value.value = currentTrade.titulo
    value.value.value = currentTrade.valor
    comission.value.value = currentTrade.comissao
  }
})

const submit = handleSubmit(async (values) => {
  const { error, data, statusCode } = await useFetch('http://localhost:3000/api/v1/caixa').post({
    service: {
      name: serviceName.value.value,
      title: serviceName.value.value,
      value: value.value.value,
      commission: comission.value.value
    },
    paymentMethod: paymentMethod.value.value,
    employee: currentUser.nome
  })

  if(error.value) {
    errorAlert.value = error.value
    errorStatus.value = statusCode.value as number
    return
  }


  router.push({ name: 'inicio' })
})

const clearForm = () => {
  resetForm({
    values: {
       serviceName: '',
        value: 0,
        paymentMethod: null,
        comission: 0
    }
  })
  resetTrade()
}
</script>

<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" sm="10" md="8" lg="6">
        <form @submit.prevent="submit">
          <v-alert v-if="errorAlert" type="error" border class="mb-5">
             STATUS {{  errorStatus }} | {{ errorAlert }}
          </v-alert>

          <v-text-field
            label="Nome do serviço"
            variant="outlined"
            v-model="serviceName.value.value"
            :error-messages="serviceName.errorMessage.value"
          />

          <v-text-field
            label="Valor"
            variant="outlined"
            prefix="R$"
            v-model="value.value.value"
            :error-messages="value.errorMessage.value"
          />

          <v-text-field
            label="Comissao"
            variant="outlined"
            prefix="%"
            v-model="comission.value.value"
            :error-messages="comission.errorMessage.value"
          />

          <SelectMeioPagamento 
            v-model="paymentMethod.value.value" 
            :error-messages="paymentMethod.errorMessage.value" 
          />

          <v-btn class="me-4" type="submit"> submit </v-btn>

          <v-btn @click="clearForm"> clear </v-btn>

          <v-progress-linear
            :active="isSubmitting"
            color="deep-blue-accent-4"
            class="mt-3"
            rounded
            height="6"
            indeterminate
          />
        </form>
      </v-col>
    </v-row>
  </v-container>
</template>
