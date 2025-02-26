import { createRouter, createWebHistory } from 'vue-router';
import Main from '@/Pages/Main.vue';
import NotFound from '@/Pages/NotFound.vue';
import Register from '@/Pages/Register.vue';
import Login from '@/Pages/Login.vue';
import ProductPage from '@/Pages/ProductPage.vue';
import Favourites from '@/Pages/Favourites.vue';
import Basket from '@/Pages/Basket.vue';

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
    },
    {
      path: "/product",
      component: ProductPage
    },
    {
      path: "/favourites",
      component: Favourites
    },
    {
      path: "/basket",
      component: Basket
    }
  ],
})

export default router;