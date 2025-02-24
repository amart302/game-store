import { createApp } from 'vue'; // Именованный экспорт createApp
import App from './App.vue';
import axios from 'axios';

// Создаём приложение
const app = createApp(App);

// Добавляем axios как глобальное свойство
app.config.globalProperties.$http = axios;

// Монтируем приложение
app.mount('#app');