import { createApp } from 'vue';
import App from './App.vue';
import axios from 'axios';
import { createRouter, createWebHistory } from 'vue-router';
import Main from './Main.vue';
import ProductPage from './components/ProductPage.vue';
import Favorites from './components/Favorites.vue';
import Cart from './components/Cart.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: Main },
    { path: '/product', component: ProductPage },
    { path: '/favorites', component: Favorites },
    { path: '/cart', component: Cart },
  ],
});

const app = createApp(App);
app.config.globalProperties.$http = axios;
app.use(router);
app.mount('#app');