import { useFetch as useFetchVueUse, type UseFetchReturn } from '@vueuse/core'

export const useFetch = <T>(route: string): UseFetchReturn<T> => {
    const host = 'http://localhost:3000' // process.env.API_HOST || ''
    return useFetchVueUse(host + route)
}