import { createRouter, createWebHistory } from 'vue-router';
import Main from '@/pages/Main.vue';
import NotFound from '@/pages/NotFound.vue';
import ProductPage from '@/pages/ProductPage.vue';
import Favourites from '@/pages/Favourites.vue';
import Basket from '@/pages/Basket.vue';
import Checkout from '@/pages/Checkout.vue';
import PurchaseHistory from '@/pages/PurchaseHistory.vue';
import ProfileUser from '@/pages/ProfileUser.vue';
import Warranty from '@/pages/Warranty.vue';

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
      path: '/history',
      component: PurchaseHistory,
    },
    {
      path: '/checkout',
      component: Checkout,
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
    {
      path: "/warranty",
      component: Warranty
    }
  ],
})

export default router;