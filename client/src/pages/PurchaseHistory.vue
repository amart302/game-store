<template>
  <div class="history-page">
    <Header />
    <main>
      <h1 class="history-title">История покупок</h1>
      <div class="history-container" v-if="purchaseHistory.length">
        <div class="history-item" v-for="(purchase, index) in purchaseHistory" :key="index">
          <div class="purchase-header">
            <div class="purchase-date">{{ purchase.date }}</div>
            <div class="purchase-summary">
              <p>Общая сумма: {{ purchase.total }} {{ currencySymbol }}</p>
              <p>Метод оплаты: {{ paymentMethodDisplay(purchase.method) }}</p>
              <p>Статус: {{ purchase.status }}</p>
            </div>
          </div>
          <div class="purchase-items">
            <!-- Используем ProductCard для отображения товаров -->
            <ProductCard class="ProductCard"
              v-for="item in purchase.items"
              :key="item.id"
              :game="item"
              :isTopOnly="false"
              @update-basket="updateBasketCount"
              @favourites-updated="loadFavourites"
            />
          </div>
        </div>
      </div>
      <div v-else class="empty-history">
        <p>История покупок пуста</p>
        <router-link to="/" class="back-to-main">Начать покупки</router-link>
      </div>
    </main>
    <Footer />
  </div>
</template>

<script>
import axios from 'axios';
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';
import ProductCard from '@/components/ProductCard.vue';

export default {
  name: 'PurchaseHistory',
  components: { Header, Footer, ProductCard },

  data() {
    return {
      purchaseHistory: [], // История покупок
      currencySymbol: '₽', // Символ валюты
      products: [], // Для хранения данных о товарах с API
      loading: true, // Состояние загрузки
    };
  },

  created() {
    this.loadPurchaseHistory();
    this.loadCurrencySymbol();
    this.fetchProducts();
  },

  methods: {
    // Загрузка истории покупок
    loadPurchaseHistory() {
      const history = JSON.parse(localStorage.getItem('purchaseHistory')) || [];
      this.purchaseHistory = history;
      console.log('Loaded purchase history:', history);
    },

    // Загрузка символа валюты
    loadCurrencySymbol() {
      const savedVal = localStorage.getItem('selectedVal');
      this.currencySymbol = savedVal || '₽';
    },

    // Загрузка данных о товарах для получения изображений
    async fetchProducts() {
      try {
        this.loading = true;
        const response = await axios.get('https://67bcd30ded4861e07b3c0613.mockapi.io/games');
        const data = response.data[0] || {};
        this.products = [
          ...(data.hit_games || []),
          ...(data.new_games || []),
          ...(data.top_games || []),
          ...(data.game_catalog || []),
        ];
      } catch (error) {
        console.error('Ошибка загрузки продуктов:', error);
      } finally {
        this.loading = false;
      }
    },

    // Отображение способа оплаты
    paymentMethodDisplay(method) {
      switch (method) {
        case 'account': return 'Накопительный счёт';
        case 'wallets': return 'Электронные кошельки';
        case 'cards': return 'Банковские карты';
        case 'crypto': return 'Криптовалюта';
        case 'samsung': return 'Samsung Pay';
        default: return 'Неизвестно';
      }
    },

    // Загрузка избранного (для синхронизации лайков)
    loadFavourites() {
      // Не нужно здесь, так как ProductCard сам обрабатывает лайки
    },

    // Обновление количества товаров в корзине
    updateBasketCount() {
      // Не нужно здесь, так как Header сам обновляет корзину
    },
  },
};
</script>

<style scoped>
/* Основной контейнер страницы */
.history-page {
  min-height: 100vh;
  color: #fff;
  font-family: 'Manrope', sans-serif;
}

/* Основной контент */
main {
  max-width: 1440px;
  margin: 0 auto;
  padding: 40px 20px;
  min-height: calc(100vh - 766px);
}

/* Заголовок */
.history-title {
  font-size: 36px;
  font-weight: 800;
  background: linear-gradient(90deg, #77BE1D, #97E238);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  text-shadow: 0 2px 4px rgba(119, 190, 29, 0.3);
  margin-bottom: 30px;
}

/* Контейнер истории покупок */
.history-container {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 20px;
  padding: 30px;
  backdrop-filter: blur(15px);
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.3);
}

/* Элемент истории */
.history-item {
  margin-bottom: 40px;
  padding-bottom: 30px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.history-item:last-child {
  border-bottom: none;
  margin-bottom: 0;
}

/* Заголовок покупки */
.purchase-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.purchase-date {
  font-size: 20px;
  font-weight: 600;
  color: #97E238;
}

.purchase-summary {
  text-align: right;
}

.purchase-summary p {
  font-size: 16px;
  margin: 5px 0;
  color: rgba(255, 255, 255, 0.9);
}

/* Список товаров */
.purchase-items {
  display: grid;  
  grid-template-columns: repeat(4,  1fr);
  gap: 30px;
}


/* Пустая история */
.empty-history {
  text-align: center;
  padding: 60px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 20px;
  backdrop-filter: blur(15px);
}

.empty-history p {
  font-size: 24px;
  color: rgba(255, 255, 255, 0.7);
  margin-bottom: 20px;
}

.back-to-main {
  font-size: 18px;
  color: #77BE1D;
  text-decoration: none;
  padding: 10px 20px;
  border: 2px solid #77BE1D;
  border-radius: 25px;
  transition: all 0.3s ease;
}

.back-to-main:hover {
  background: #77BE1D;
  color: white;
}

/* Медиазапросы для адаптации */
@media (max-width: 1024px) {
  main {
    padding: 20px 15px;
    min-height: calc(100vh - 700px);
  }

  .history-title {
    font-size: 28px;
    margin-bottom: 20px;
  }

  .history-container {
    padding: 20px;
  }

  .purchase-date {
    font-size: 18px;
  }

  .purchase-summary p {
    font-size: 14px;
  }

  .empty-history {
    padding: 40px;
  }

  .empty-history p {
    font-size: 20px;
  }

  .back-to-main {
    font-size: 16px;
    padding: 8px 16px;
  }
}

@media (max-width: 768px) {
  main {
    padding: 15px 10px;
    min-height: calc(100vh - 650px);
  }

  .history-title {
    font-size: 24px;
    margin-bottom: 15px;
  }

  .history-container {
    padding: 15px;
  }

  .purchase-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
  }

  .purchase-summary {
    text-align: left;
  }

  .purchase-date {
    font-size: 16px;
  }

  .empty-history {
    padding: 30px;
  }

  .empty-history p {
    font-size: 18px;
    margin-bottom: 15px;
  }

  .back-to-main {
    font-size: 14px;
    padding: 6px 12px;
    width: 100%;
    text-align: center;
  }
}
</style>