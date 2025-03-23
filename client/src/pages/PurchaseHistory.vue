<template>
    <Header />
    <main>
      <h1 class="history-title">История покупок</h1>
      <div v-if="!mainStore.userData || !mainStore.userData.purchaseHistory.length" class="empty-history">
        <p>История покупок пуста</p>
        <router-link to="/" class="back-to-main">Начать покупки</router-link>
      </div>
      <div class="history-container" v-else>
        <div class="history-item" v-for="(purchase, index) in mainStore.userData.purchaseHistory" :key="index">
          <div class="purchase-header">
            <div class="purchase-date">{{ purchase.date }}</div>
            <div class="purchase-summary">
              <p>Общая сумма: {{ purchase.total }} {{ currencySymbol }}</p>
              <p>Метод оплаты: {{ paymentMethodDisplay(purchase.method) }}</p>
              <p>Статус: {{ purchase.status }}</p>
            </div>
          </div>
          <div class="purchase-items">
            <ProductCard class="ProductCard"
              v-for="item in purchase.items"
              :key="item.id"
              :game="item"
              :isTopOnly="false"
            />
          </div>
        </div>
      </div>
    </main>
    <Footer />
</template>

<script>
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';
import ProductCard from '@/components/ProductCard.vue';
import { useMainStore } from '@/store/store';

export default {
  name: 'PurchaseHistory',
  components: { Header, Footer, ProductCard },

  data() {
    return {
      purchaseHistory:  [],
      currencySymbol: '₽',
      loading: true,
    };
  },
  setup(){
    const mainStore = useMainStore();
    return { mainStore };
  },

  methods: {
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
  },
};
</script>

<style scoped>
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

.history-container {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 20px;
  padding: 30px;
  backdrop-filter: blur(15px);
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.3);
}

.history-item {
  margin-bottom: 40px;
  padding-bottom: 30px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.history-item:last-child {
  border-bottom: none;
  margin-bottom: 0;
}

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

.purchase-items {
  display: grid;  
  grid-template-columns: repeat(4,  1fr);
  gap: 30px;
}


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
</style>