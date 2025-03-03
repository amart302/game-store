<template>
    <div class="checkout-page">
      <Header />
      <main>
        <h1 class="checkout-title">Оформление заказа</h1>
        <div class="checkout-container" v-if="selectedGames.length">
          <div class="game-info" v-for="game in selectedGames" :key="game.id">
            <h2>{{ game.title }}</h2>
            <p>Цена: {{ game.price }}</p>
            <p v-if="game.skidka">Скидка: {{ game.skidka }}</p>
            <p v-if="game.oldPrice">Старая цена: {{ game.oldPrice }}</p>
            <p>Количество: {{ game.count }}</p>
          </div>
          <div class="payment-options">
            <h3>Способ оплаты</h3>
            <p>Общая сумма: {{ totalPrice }} {{ currencySymbol }}</p>
            <div class="option">
              <label>
                <input type="radio" v-model="paymentMethod" value="account" :disabled="accountBalance < totalPrice" />
                Оплатить с накопительного счёта (Баланс: {{ accountBalance }} {{ currencySymbol }})
              </label>
            </div>
            <div class="option">
              <label>
                <input type="radio" v-model="paymentMethod" value="card" />
                Оплатить картой
              </label>
            </div>
          </div>
          <button @click="completePurchase" class="complete-btn" :disabled="!paymentMethod">Завершить покупку</button>
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
        paymentMethod: null,
        accountBalance: 0,
        currencySymbol: '₽',
      };
    },
    computed: {
      totalPrice() {
        return this.selectedGames.reduce((sum, game) => {
          const price = parseInt(game.price.split(' ')[0]);
          return sum + price * game.count;
        }, 0);
      },
    },
    created() {
      this.loadSelectedGames();
      this.loadAccountBalance();
      this.loadCurrencySymbol();
    },
    methods: {
      loadSelectedGames() {
        const games = JSON.parse(localStorage.getItem('selectedGameForCheckout')) || [];
        this.selectedGames = games;
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
      completePurchase() {
        if (!this.paymentMethod) return;
  
        if (this.paymentMethod === 'account') {
          if (this.accountBalance >= this.totalPrice) {
            this.accountBalance -= this.totalPrice;
            this.saveAccountBalance();
            alert('Покупка успешно завершена с накопительного счёта!');
            localStorage.removeItem('selectedGameForCheckout');
            localStorage.removeItem('productsInBasketInGames'); // Очищаем корзину
            this.$router.push('/');
          } else {
            alert('Недостаточно средств на накопительном счёте!');
          }
        } else if (this.paymentMethod === 'card') {
          alert('Перенаправление на оплату картой... (функционал в разработке)');
          localStorage.removeItem('selectedGameForCheckout');
          localStorage.removeItem('productsInBasketInGames'); // Очищаем корзину
          this.$router.push('/');
        }
      },
    },
  };
  </script>
  
  <style scoped>
  .checkout-page {
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
  }
  
  .game-info h2 {
    font-size: 28px;
    margin-bottom: 10px;
  }
  
  .game-info p {
    font-size: 20px;
    color: #97E238;
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
  
  .option {
    margin-bottom: 15px;
  }
  
  .option label {
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 18px;
    cursor: pointer;
  }
  
  .option input[type="radio"] {
    width: 20px;
    height: 20px;
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
  
  /* Медиазапросы для адаптации */
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
  
    .option label {
      font-size: 16px;
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
  
    .option label {
      font-size: 14px;
      gap: 8px;
    }
  
    .option input[type="radio"] {
      width: 16px;
      height: 16px;
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