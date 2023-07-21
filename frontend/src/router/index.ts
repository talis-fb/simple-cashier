import { createRouter, createWebHistory, type Router, type RouterOptions } from 'vue-router'

import MainLayout from '../layouts/Main.vue'

export const router: RouterOptions = {
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: MainLayout,
      children: [
        {
          path: '',
          name: 'inicio',
          component: () => import('@/views/HomeView.vue')
        },
        {
          path: '/add',
          name: 'add',
          component: () => import('@/views/FormView.vue')
        },
        {
          path: '/get',
          name: 'registros',
          component: () => import('@/views/RecordView.vue')
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/LoginView.vue')
    }
  ]
}

import { useStore } from '@/stores/user'

export const setupGuards = (router: Router) => {
  router.beforeEach(async (to, from, next) => {
    const { isLogged } = useStore()

    if (!isLogged() && to.name !== 'login') {
      return next('/login')
    }

    next()
  })
}
