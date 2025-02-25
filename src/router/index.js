import { createRouter, createWebHistory } from 'vue-router';
import Register from '@/components/Register.vue';
import Login from '@/components/Login.vue';
import NotFound from '@/components/NotFound.vue';
import Main from '@/Pages/Main.vue';
import Favorites from '@/components/Favorites.vue';
import Basket from '@/components/Basket.vue';
import ProductPage from '@/components/ProductPage.vue';

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
      component: Favorites
    },
    {
      path: "/basket",
      component: Basket
    }
  ],
})

export default router;