import { createRouter, createWebHistory } from 'vue-router'
import Main from '@/pages/Main.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Main,
    },
    {
      path: '/register',
      name: 'register',
    },
  ],
})

export default router
