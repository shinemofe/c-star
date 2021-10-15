import { createRouter, createWebHistory } from 'vue-router'
import Index from '@/views/Index.vue'
import About from '@/views/About.vue'
import ProjectSelect from '@/views/project/Index.vue'
import DragDemo from './views/drag-demo.vue'

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
  {
    path: '/drag-demo',
    component: DragDemo
  }
]

const router = createRouter({
  history: createWebHistory(),
  linkActiveClass: 'text-gray-900 font-bold',
  routes,
})

export default router
