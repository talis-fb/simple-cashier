import type {  Router, NavigationGuardNext, RouteLocationNormalized } from 'vue-router'
import { useStore } from '@/stores/user'

type Route = RouteLocationNormalized

const loginUserGuard = async (to: Route, from: Route, next: NavigationGuardNext) => {
    const { isLogged } = useStore()

    if (!isLogged() && to.name !== 'login') {
      return next('/login')
    }

    next()
  }


export const setupGuards = (router: Router) => {
    router.beforeEach(loginUserGuard)
}
  