<template>
  <div class="checkout-page">
    <Header />
    <main>
      <h1 class="checkout-title">Оформление заказа</h1>
      <div v-if="selectedGames.length" class="checkout-container">
        <div v-for="game in selectedGames" :key="game.id" class="game-info">
          <div class="game-info-header">
            <h2>{{ game.title }}</h2>
            <div class="product-like">
              <button @click="toggleFavourite(game)" class="favourite-btn" :class="{ 'active': isGameFavourite(game.id) }">
                <svg v-if="isGameFavourite(game.id)" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" fill="#FF3030" />
                </svg>
                <svg v-else width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" fill="none" stroke="#FFFFFF" stroke-width="2" />
                </svg>
              </button>
            </div>
          </div>
          <p>Цена: {{ game.price }}</p>
          <p v-if="game.skidka">Скидка: {{ game.skidka }}</p>
          <p v-if="game.oldPrice">Старая цена: {{ game.oldPrice }}</p>
          <p>Количество: {{ game.count }}</p>
        </div>

        <div class="payment-options">
          <h3>Способ оплаты: {{ paymentMethodDisplay }}</h3>
          <p>Общая сумма: {{ totalPrice }} {{ currencySymbol }}</p>
          <div v-if="selectedPaymentMethod === 'account'" class="balance-info">
            <p>Баланс накопительного счёта: {{ accountBalance }} {{ currencySymbol }}</p>
            <p v-if="accountBalance < totalPriceRaw" class="error">Недостаточно средств на счёте!</p>
          </div>
        </div>
        <button
          @click="completePurchase"
          class="complete-btn"
          :disabled="isPaymentDisabled"
        >
          Завершить покупку
        </button>
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

export default {
  name: 'Checkout',
  components: { Header, Footer },

  data() {
    return {
      selectedGames: [],
      selectedPaymentMethod: null,
      accountBalance: 0,
      currencySymbol: '₽',
      favourites: (localStorage.getItem('favourites')) ? JSON.parse(localStorage.getItem('favourites')) : [],
    };
  },

  computed: {
    totalPriceRaw() {
      return this.selectedGames.reduce((sum, game) => {
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
        return this.accountBalance < this.totalPriceRaw;
      }
      return false;
    },
  },

  created() {
    this.loadSelectedGames();
    this.loadPaymentMethod();
    this.loadAccountBalance();
    this.loadCurrencySymbol();
  },

  methods: {
    loadSelectedGames() {
      const games = JSON.parse(localStorage.getItem('selectedGameForCheckout')) || [];
      this.selectedGames = games;
    },

    loadPaymentMethod() {
      this.selectedPaymentMethod = localStorage.getItem('selectedPaymentMethod') || null;
    },

    loadAccountBalance() {
      const savedBalance = localStorage.getItem('accountBalance');
      this.accountBalance = savedBalance !== null ? parseInt(savedBalance) : 10000;
    },

    saveAccountBalance() {
      localStorage.setItem('accountBalance', this.accountBalance);
    },

    loadCurrencySymbol() {
      const savedVal = localStorage.getItem('selectedVal');
      this.currencySymbol = savedVal || '₽';
    },

    isGameFavourite(gameId) {
      return this.favourites.some(fav => fav.id === gameId);
    },

    toggleFavourite(game) {
      let updatedFavourites = [...this.favourites];
      const isAlreadyFavourite = this.isGameFavourite(game.id);

      if (isAlreadyFavourite) {
        updatedFavourites = updatedFavourites.filter(fav => fav.id !== game.id);
      } else {
        updatedFavourites.push({
          id: game.id,
          title: game.title,
          large_capsule_image: game.large_capsule_image || '',
          windows_available: game.windows_available,
          linux_available: game.linux_available,
          mac_available: game.mac_available
        });
      }

      this.favourites = updatedFavourites;
      localStorage.setItem('favourites', JSON.stringify(this.favourites));
    },

    savePurchaseHistory() {
      const purchase = {
        items: this.selectedGames.map(item => ({
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
      const history = JSON.parse(localStorage.getItem('purchaseHistory')) || [];
      history.push(purchase);
      localStorage.setItem('purchaseHistory', JSON.stringify(history));
    },

    completePurchase() {
      if (!this.selectedPaymentMethod) {
        alert('Способ оплаты не выбран!');
        return;
      }

      if (this.selectedPaymentMethod === 'account') {
        if (this.accountBalance >= this.totalPriceRaw) {
          this.accountBalance -= this.totalPriceRaw;
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

    clearCheckout() {
      localStorage.removeItem('selectedGameForCheckout');
      localStorage.removeItem('productsInBasketInGames');
      localStorage.removeItem('selectedPaymentMethod');
    },
  },
};
</script>

<style scoped>
.checkout-page {
  min-height: 100vh;
  color: #fff;
}

main {
  max-width: 1440px;
  margin: 0 auto;
  padding: 40px 20px;
  min-height: calc(100vh - 766px);
}

.checkout-title {
  font-size: 36px;
  font-weight: 800;
  background: linear-gradient(90deg, #77BE1D, #97E238);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  text-shadow: 0 2px 4px rgba(119, 190, 29, 0.3);
  margin-bottom: 30px;
}

.checkout-container {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 20px;
  padding: 30px;
  backdrop-filter: blur(15px);
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.3);
}

.game-info {
  margin-bottom: 20px;
  position: relative;
}

.game-info-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.game-info h2 {
  font-size: 28px;
  margin-bottom: 10px;
}

.game-info p {
  font-size: 20px;
  color: #97E238;
}

.product-like {
  position: relative;
}

.favourite-btn {
  background: rgba(255, 255, 255, 0.1);
  border: none;
  padding: 10px;
  border-radius: 50%;
  cursor: pointer;
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
  animation: pulse 0.5s ease;
}

.favourite-btn svg {
  transition: transform 0.3s ease;
}

.favourite-btn.active svg {
  transform: scale(1.1);
}

@keyframes pulse {
  0% { transform: scale(1); }
  50% { transform: scale(1.2); }
  100% { transform: scale(1); }
}

.payment-options {
  margin-top: 20px;
}

.payment-options h3 {
  font-size: 24px;
  margin-bottom: 15px;
}

.payment-options p {
  font-size: 20px;
  color: #97E238;
  margin-bottom: 15px;
}

.balance-info p {
  font-size: 18px;
  margin: 5px 0;
}

.balance-info .error {
  color: #FF3030;
}

.complete-btn {
  padding: 15px 30px;
  background: linear-gradient(90deg, #77BE1D, #97E238);
  border: none;
  border-radius: 25px;
  color: white;
  font-weight: 600;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 20px;
}

.complete-btn:hover {
  background: linear-gradient(90deg, #649E18, #7BC22F);
  transform: translateY(-3px);
}

.complete-btn:disabled {
  background: #555;
  cursor: not-allowed;
  transform: none;
}

.empty-checkout {
  text-align: center;
  padding: 60px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 20px;
  backdrop-filter: blur(15px);
}

.empty-checkout p {
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

@media (max-width: 1024px) {
  main {
    padding: 20px 15px;
    min-height: calc(100vh - 700px);
  }

  .checkout-title {
    font-size: 28px;
    margin-bottom: 20px;
  }

  .checkout-container {
    padding: 20px;
  }

  .game-info h2 {
    font-size: 24px;
  }

  .game-info p {
    font-size: 18px;
  }

  .payment-options h3 {
    font-size: 20px;
  }

  .payment-options p {
    font-size: 18px;
  }

  .complete-btn {
    padding: 12px 20px;
    font-size: 14px;
  }

  .empty-checkout {
    padding: 40px;
  }

  .empty-checkout p {
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

  .checkout-title {
    font-size: 24px;
    margin-bottom: 15px;
  }

  .checkout-container {
    padding: 15px;
  }

  .game-info h2 {
    font-size: 20px;
  }

  .game-info p {
    font-size: 16px;
  }

  .payment-options h3 {
    font-size: 18px;
    margin-bottom: 10px;
  }

  .payment-options p {
    font-size: 16px;
  }

  .complete-btn {
    padding: 10px 16px;
    font-size: 12px;
    width: 100%;
  }

  .empty-checkout {
    padding: 30px;
  }

  .empty-checkout p {
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