import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { createPinia } from 'pinia';
import Toast from 'vue-toastification';
import 'vue-toastification/dist/index.css';

const app = createApp(App);
const pinia = createPinia();

const options = {
    position: "top-center",
    timeout: 2500,
    closeOnClick: true,
    pauseOnFocusLoss: true,
    maxToasts: 6,
};

app.use(Toast, options);
app.use(pinia);
app.use(router);

app.mount('#app');