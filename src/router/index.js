import { createRouter, createWebHistory } from 'vue-router';
import Main from '@/pages/Main.vue';
import Register from '@/components/Register.vue';
import Login from '@/components/Login.vue';
import NotFound from '@/components/NotFound.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/:pathMatch(.*)*",
      component: NotFound
    },
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
