import { createRouter, createWebHistory } from 'vue-router'
import Index from '@/pages/Index.vue'
import About from '@/pages/About.vue'
import ProjectSelect from '@/pages/Project/Index.vue'

const routes = [
  {
    path: '/',
    component: Index,
    meta: {
      title: 'Vite + Vue + TypeScript + Tailwind Starter Template',
    },
  },
  {
    path: '/about/',
    component: About,
    meta: {
      title: 'About',
    },
  },
  {
    path: '/project/select',
    component: ProjectSelect,
    meta: {
      title: 'About',
    },
  },
]

const router = createRouter({
  history: createWebHistory(),
  linkActiveClass: 'text-gray-900 font-bold',
  routes,
})

export default router
