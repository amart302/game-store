<template>
  <div class="checkout-page">
    <Header />
    <main>
      <h1 class="checkout-title">Оформление заказа</h1>
      <div v-if="mainStore.basket.length" class="checkout-container">
        <div class="game-container">
          <div v-for="game in mainStore.basket" :key="game.id" class="game-info">
            <div class="game-info-header">
              <div class="cart-item-image">
                <img :src="game.large_capsule_image" alt="Item Image" />
              </div>
              <h2>{{ game.name }}</h2>
              <div class="product-like">
                <button @click="mainStore.addToFavourites(game)" class="favourite-btn"
                  :class="{ 'active': isGameFavourite(game.id) }">
                  <svg v-if="isGameFavourite(game.id)" width="24" height="24" viewBox="0 0 24 24" fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                      fill="#FF3030" />
                  </svg>
                  <svg v-else width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                      fill="none" stroke="#FFFFFF" stroke-width="2" />
                  </svg>
                </button>
              </div>
            </div>
            <p>Цена: {{ game.final_price }}</p>
            <p v-if="game.skidka">Скидка: {{ game.skidka }}</p>
            <p v-if="game.oldPrice">Старая цена: {{ game.oldPrice }}</p>
            <p>Количество: {{ game.count }}</p>
          </div>
        </div>
        <div class="payment-container">
          <div class="payment-options">
            <h3>Способ оплаты: {{ paymentMethodDisplay }}</h3>
            <p>Общая сумма: {{ totalPrice }} {{ currencySymbol }}</p>
            <div v-if="selectedPaymentMethod === 'account'" class="balance-info">
              <p>Баланс накопительного счёта: {{ mainStore.userData.balance }} {{ currencySymbol }}</p>
              <p v-if="mainStore.userData.balance < totalPriceRaw" class="error">Недостаточно средств на счёте!</p>
            </div>
          </div>
          <div class="action-buttons">
            <button @click="completePurchase" class="complete-btn" :disabled="isPaymentDisabled">
              Завершить покупку
            </button>
            <button @click="cancelPurchase" class="cancel-btn">
              Отмена
            </button>
          </div>
        </div>
      </div>
      <div v-else class="empty-checkout">
        <p>Выберите товар для покупки</p>
        <router-link to="/" class="back-to-main">Вернуться на главную</router-link>
      </div>
    </main>

    <Footer />
  </div>
</template>
<script>
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';
import { useMainStore } from '@/store/store';

export default {
  name: 'Checkout',
  components: { Header, Footer },

  data() {
    return {
      selectedPaymentMethod: localStorage.getItem('selectedPaymentMethod') || null,
      currencySymbol: '₽',
      favourites: (localStorage.getItem('favourites')) ? JSON.parse(localStorage.getItem('favourites')) : [],
    };
  },
  setup() {
    const mainStore = useMainStore();
    return { mainStore };
  },
  computed: {
    totalPriceRaw() {
      return this.mainStore.basket.reduce((sum, game) => {
        const price = parseFloat(game.final_price.split(' ')[0]);
        return sum + price * game.count;
      }, 0);
    },

    totalPrice() {
      return this.totalPriceRaw.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
    },

    paymentMethodDisplay() {
      switch (this.selectedPaymentMethod) {
        case 'account': return 'Накопительный счёт';
        case 'wallets': return 'Электронные кошельки';
        case 'cards': return 'Банковские карты';
        case 'crypto': return 'Криптовалюта';
        case 'samsung': return 'Samsung Pay';
        default: return 'Не выбран';
      }
    },

    isPaymentDisabled() {
      if (this.selectedPaymentMethod === 'account') {
        return this.mainStore.userData.balance < this.totalPriceRaw;
      }
      return false;
    },
  },
  methods: {
    saveAccountBalance() {
      const users = JSON.parse(localStorage.getItem("users"));
      users.map(item => (item.id == this.mainStore.userData.id) ? item.balance = this.mainStore.userData.balance : false);
      localStorage.setItem("users", JSON.stringify(users));
    },

    isGameFavourite(gameId) {
      return this.mainStore.favourites.some(fav => fav.id === gameId);
    },

    savePurchaseHistory() {
      const purchase = {
        items: this.mainStore.basket.map(item => ({
          id: item.id,
          name: item.name,
          final_price: item.final_price.replace(' ₽', '').replace(' ', ''),
          count: item.count,
          large_capsule_image: item.large_capsule_image,
          windows_available: item.windows_available,
          linux_available: item.linux_available,
          mac_available: item.mac_available
        })),
        total: this.totalPriceRaw,
        method: this.selectedPaymentMethod,
        date: new Date().toLocaleString('ru-RU'),
        status: 'Куплен',
      };
      this.mainStore.purchaseHistory.push(purchase);
      localStorage.setItem('purchaseHistory', JSON.stringify(this.mainStore.purchaseHistory));
    },

    completePurchase() {
      if (!this.selectedPaymentMethod) {
        alert('Способ оплаты не выбран!');
        return;
      }

      if (this.selectedPaymentMethod === 'account') {
        if (this.mainStore.userData.balance >= this.totalPriceRaw) {
          this.mainStore.userData.balance -= this.totalPriceRaw;
          this.saveAccountBalance();
          this.savePurchaseHistory();
          alert('Покупка успешно завершена с накопительного счёта!');
          this.clearCheckout();
          this.$router.push('/');
        } else {
          alert('Недостаточно средств на накопительном счёте!');
        }
      } else {
        this.savePurchaseHistory();
        alert(`Покупка успешно оплачена через ${this.paymentMethodDisplay}!`);
        this.clearCheckout();
        this.$router.push('/');
      }
    },

    cancelPurchase() {
      this.clearCheckout();
      this.$router.push('*');
    },

    clearCheckout() {
      this.mainStore.basket = [];
      localStorage.removeItem('basket');
      localStorage.removeItem('selectedPaymentMethod');
    },
  },
};
</script>
<style scoped>
.checkout-page {
  min-height: 100vh;
  color: #fff;
  font-family: 'Roboto', sans-serif;
}

main {
  max-width: 1440px;
  margin: 0 auto;
  padding: 50px 20px;
}

.checkout-title {
  font-size: 48px;
  font-weight: bold;
  background: linear-gradient(90deg, #4CAF50, #8BC34A);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
  margin-bottom: 40px;
}

.game-info-header {}

.cart-item-image {
  width: 280px;
  height: 150px;
  border-radius: 12px;
  overflow: hidden;
  background: rgba(0, 0, 0, 0.2);
}

.cart-item-image img {
  width: 100%;
  height: 100%;
  transition: transform 0.3s ease;
}

.cart-item:hover .cart-item-image img {
  transform: scale(1.05);
}

.checkout-container {
  display: flex;
  flex-direction: column;
  gap: 30px;
  border-radius: 20px;
  backdrop-filter: blur(20px);
}
.game-container{
  display: grid;
  grid-template-columns: repeat(4,  1fr);
  gap: 30px;
  border-radius: 20px;
  backdrop-filter: blur(20px);
  background: rgba(255, 255, 255, 0.05);
  padding: 40px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.7);
}
.payment-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 20px;
  backdrop-filter: blur(20px);
  padding: 40px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.7);

}

.game-info {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 15px;
  padding: 20px;
  margin-bottom: 20px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.game-info:hover {
  transform: translateY(-10px);
  box-shadow: 0 15px 50px rgba(0, 0, 0, 0.8);
}

.game-info h2 {
  font-size: 24px;
  margin-bottom: 10px;
  color: #fff;
}

.game-info p {
  font-size: 18px;
  margin: 5px 0;
  color: #97E238;
}

.product-like {
  position: relative;
  display: flex;
  justify-content: end;
}

.favourite-btn {
  background: rgba(255, 255, 255, 0.1);
  border: none;
  padding: 10px;
  border-radius: 50%;
  cursor: pointer;
  left: 0;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.favourite-btn:hover {
  background: rgba(255, 48, 48, 0.2);
}

.favourite-btn.active {
  background: rgba(255, 48, 48, 0.3);
}

.payment-options {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 15px;
  padding: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.6);
}



.payment-options h3 {
  font-size: 24px;
  margin-bottom: 15px;
}

.payment-options p {
  font-size: 18px;
  margin: 5px 0;
}

.action-buttons {
  display: flex;
  gap: 20px;
  margin-top: 20px;
}

.complete-btn {
  width: 260px;
  height: 50px;
  background: linear-gradient(90deg, #4CAF50, #8BC34A);
  border: none;
  border-radius: 30px;
  color: white;
  font-weight: bold;
  font-size: 18px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 10px 30px rgba(0, 255, 0, 0.4);
}

.complete-btn:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 40px rgba(0, 255, 0, 0.6);
}

.complete-btn:disabled {
  background: #555;
  cursor: not-allowed;
  transform: none;
  box-shadow: none;
}

.cancel-btn {
  width: 260px;
  height: 50px;
  background: linear-gradient(90deg, #FF5252, #FF1744);
  border: none;
  border-radius: 30px;
  color: white;
  font-weight: bold;
  font-size: 18px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 10px 30px rgba(255, 0, 0, 0.4);
}

.cancel-btn:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 40px rgba(255, 0, 0, 0.6);
}

.empty-checkout {
  text-align: center;
  padding: 80px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 20px;
  backdrop-filter: blur(15px);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.6);
}

.empty-checkout p {
  font-size: 28px;
  color: rgba(255, 255, 255, 0.7);
  margin-bottom: 20px;
}

.back-to-main {
  font-size: 20px;
  color: #4CAF50;
  text-decoration: none;
  padding: 15px 30px;
  border: 2px solid #4CAF50;
  border-radius: 30px;
  transition: all 0.3s ease;
}

.back-to-main:hover {
  background: #4CAF50;
  color: white;
}

@media (max-width: 1024px) {
  .checkout-container {
    grid-template-columns: 1fr;
  }

  .checkout-title {
    font-size: 40px;
  }

  .game-info h2 {
    font-size: 22px;
  }

  .game-info p {
    font-size: 16px;
  }

  .payment-options h3 {
    font-size: 20px;
  }

  .payment-options p {
    font-size: 16px;
  }

  .complete-btn {
    font-size: 16px;
    padding: 12px 20px;
    width: 100%;
  }
}

@media (max-width: 768px) {
  main {
    padding: 30px 15px;
  }

  .checkout-title {
    font-size: 32px;
  }

  .checkout-container {
    padding: 20px;
  }

  .game-info h2 {
    font-size: 20px;
  }

  .game-info p {
    font-size: 14px;
  }

  .payment-options h3 {
    font-size: 18px;
  }

  .payment-options p {
    font-size: 14px;
  }

  .complete-btn {
    font-size: 14px;
    padding: 10px 15px;
    width: 100%;
  }

  .empty-checkout {
    padding: 50px;
  }

  .empty-checkout p {
    font-size: 20px;
  }

  .back-to-main {
    font-size: 16px;
    padding: 10px 15px;
    width: 100%;
  }
}
</style>