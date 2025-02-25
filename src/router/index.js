import { createRouter, createWebHistory } from 'vue-router';
import Register from '@/components/Register.vue';
import Login from '@/components/Login.vue';
import NotFound from '@/components/NotFound.vue';
import Main from '@/Pages/Main.vue';
import ProductCard from '@/components/ProductCard.vue';
import Favorites from '@/components/Favorites.vue';
import Basket from '@/components/Basket.vue';

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
      component: ProductCard
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