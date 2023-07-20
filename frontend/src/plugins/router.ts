import { createRouter, createWebHistory } from 'vue-router'

import { router as routerOptions, setupGuards } from '../router'

const router = createRouter(routerOptions)
setupGuards(router)

export default router
