import { createRouter, createWebHistory } from 'vue-router';
import Main from '@/pages/Main.vue';
import Register from '@/components/Register.vue';
import Login from '@/components/Login.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      component: Main,
    },
    {
      path: "/register",
      component: Register
    },
    {
      path: "/login",
      component: Login
    }
  ],
})

export default router;
