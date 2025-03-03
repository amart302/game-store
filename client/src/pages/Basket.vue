<template>
  <div class="basket-page">
    <Header />
    <main>
      <h1 class="basket-title">Корзина</h1>
      <div class="basket-container" v-if="basket.length">
        <transition-group name="fade" tag="div" class="basket-items">
          <div v-for="item in basket" :key="item.id" class="basket-item">
            <div class="item-info">
              <h2>{{ item.title }}</h2>
              <p>Цена: {{ item.price }}</p>
              <p v-if="item.skidka">Скидка: {{ item.skidka }}</p>
              <p v-if="item.oldPrice">Старая цена: {{ item.oldPrice }}</p>
              <p>Количество: {{ item.count }}</p>
            </div>
            <button @click="removeFromBasket(item.id)" class="remove-btn">Удалить</button>
          </div>
        </transition-group>
        <div class="basket-summary">
          <p>Общая сумма: {{ totalPrice }} {{ basket[0]?.currency || '₽' }}</p>
          <button @click="proceedToCheckout" class="checkout-btn">Оформить</button>
        </div>
      </div>
      <div v-else class="empty-basket">
        <p>Корзина пуста</p>
        <router-link to="/" class="back-to-main">Вернуться на главную</router-link>
      </div>
    </main>
    <Footer />
  </div>
</template>

<script>
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';

export default {
  name: 'Basket',
  components: { Header, Footer },
  data() {
    return {
      basket: JSON.parse(localStorage.getItem('productsInBasketInGames')) || [],
    };
  },
  computed: {
    totalPrice() {
      return this.basket.reduce((sum, item) => {
        const price = parseInt(item.price.split(' ')[0]);
        return sum + price * item.count;
      }, 0);
    },
  },
  methods: {
    removeFromBasket(id) {
      this.basket = this.basket.filter(item => item.id !== id);
      localStorage.setItem('productsInBasketInGames', JSON.stringify(this.basket));
      this.$emit('update-basket', this.basket.length);
    },
    proceedToCheckout() {
      localStorage.setItem('selectedGameForCheckout', JSON.stringify(this.basket));
      this.$router.push('/checkout');
    },
  },
};
</script>

<style scoped>
.basket-page {
  min-height: 100vh;
  background: linear-gradient(135deg, #0A071A 0%, #1C1435 100%);
  color: #fff;
}

main {
  max-width: 1440px;
  margin: 0 auto;
  padding: 40px 20px;
  min-height: calc(100vh - 766px);
}

.basket-title {
  font-size: 36px;
  font-weight: 800;
  background: linear-gradient(90deg, #77BE1D, #97E238);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  text-shadow: 0 2px 4px rgba(119, 190, 29, 0.3);
  margin-bottom: 30px;
}

.basket-container {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 20px;
  padding: 30px;
  backdrop-filter: blur(15px);
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.3);
}

.basket-items {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.basket-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 12px;
}

.item-info h2 {
  font-size: 20px;
  margin-bottom: 10px;
}

.item-info p {
  font-size: 16px;
  margin: 5px 0;
}

.remove-btn {
  padding: 8px 16px;
  background: #FF3030;
  border: none;
  border-radius: 25px;
  color: white;
  font-weight: 600;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.remove-btn:hover {
  background: #E62A2A;
}

.basket-summary {
  margin-top: 20px;
  text-align: right;
}

.basket-summary p {
  font-size: 20px;
  color: #97E238;
  margin-bottom: 15px;
}

.checkout-btn {
  padding: 15px 30px;
  background: linear-gradient(90deg, #77BE1D, #97E238);
  border: none;
  border-radius: 25px;
  color: white;
  font-weight: 600;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.checkout-btn:hover {
  background: linear-gradient(90deg, #649E18, #7BC22F);
  transform: translateY(-3px);
}

.empty-basket {
  text-align: center;
  padding: 60px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 20px;
  backdrop-filter: blur(15px);
}

.empty-basket p {
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

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease, transform 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(20px);
}

/* Медиазапросы для адаптации */
@media (max-width: 1024px) {
  main {
    padding: 20px 15px;
    min-height: calc(100vh - 700px);
  }

  .basket-title {
    font-size: 28px;
    margin-bottom: 20px;
  }

  .basket-container {
    padding: 20px;
  }

  .basket-item {
    padding: 10px;
  }

  .item-info h2 {
    font-size: 18px;
  }

  .item-info p {
    font-size: 14px;
  }

  .remove-btn {
    padding: 6px 12px;
    font-size: 12px;
  }

  .basket-summary p {
    font-size: 18px;
  }

  .checkout-btn {
    padding: 12px 20px;
    font-size: 14px;
  }

  .empty-basket {
    padding: 40px;
  }

  .empty-basket p {
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

  .basket-title {
    font-size: 24px;
    margin-bottom: 15px;
  }

  .basket-container {
    padding: 15px;
  }

  .basket-item {
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
  }

  .item-info h2 {
    font-size: 16px;
  }

  .item-info p {
    font-size: 12px;
  }

  .remove-btn {
    padding: 5px 10px;
    font-size: 10px;
    width: 100%;
  }

  .basket-summary {
    text-align: center;
  }

  .basket-summary p {
    font-size: 16px;
  }

  .checkout-btn {
    padding: 10px 16px;
    font-size: 12px;
    width: 100%;
  }

  .empty-basket {
    padding: 30px;
  }

  .empty-basket p {
    font-size: 18px;
    margin-bottom: 15px;
  }

  .back-to-main {
    font-size: 14px;
    padding: 6px 12px;
    width: 100%;
  }
}
</style>