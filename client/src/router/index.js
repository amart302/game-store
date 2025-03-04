import { createRouter, createWebHistory } from 'vue-router';
import Main from '@/pages/Main.vue';
import NotFound from '@/pages/NotFound.vue';
import Register from '@/pages/Register.vue';
import Login from '@/pages/Login.vue';
import ProductPage from '@/pages/ProductPage.vue';
import Favourites from '@/pages/Favourites.vue';
import Basket from '@/pages/Basket.vue';
import Checkout from '@/pages/Checkout.vue';
import PurchaseHistory from '@/pages/PurchaseHistory.vue';
import ProfileUser from '@/components/ProfileUser.vue';
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
      path: '/history',
      component: PurchaseHistory,
    },
    {
      path: '/checkout',
      component: Checkout,
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
    },
    {
      path: "/profile",
      component: ProfileUser
    },
  ],
})

export default router;