import { createRouter } from 'vue-router'
import { routes } from '@/router/routes'
import { setupGuards } from '@/router/guards'

const router = createRouter(routes)
setupGuards(router)

export default router
