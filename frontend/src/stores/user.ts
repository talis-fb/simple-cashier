import { defineStore } from 'pinia'
import { useStorage } from '@vueuse/core'
import type { User } from '@/types'

export const useStore = defineStore('user', () => {
  const currentUser = useStorage('user-definition', {} as User, sessionStorage)

  function isLogged() {
    return currentUser.value && currentUser.value.nome && currentUser.value.foto
  }

  function resetUser() {
    currentUser.value = { nome: '', foto: '' }
  }

  return { currentUser, isLogged, resetUser }
})
