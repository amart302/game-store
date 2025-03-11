<template>
  <div class="cart-page">
    <Header />
    <main>
      <h1 class="cart-title">Корзина <span v-if="!mainStore.basket.length">пуста</span></h1>
      <div class="cart-container" v-if="mainStore.basket.length">
        <div class="cart-items">
          <div v-for="item in mainStore.basket" :key="item.id" class="cart-item">
            <div class="cart-item-image">
              <img :src="itemImage(item.id)" alt="Item Image" v-if="itemImage(item.id)" />
              <div v-else class="image-placeholder">Изображение загружается...</div>
            </div>
            <div class="cart-item-details">
              <span class="cart-item-title">{{ item.title }}</span>
              <div class="cart-item-dop-info">
                <span>Регион активации:</span> Россия и страны СНГ
              </div>
              <div class="cart-item-prices">
                <span class="cart-item-price">{{ calculatePrice(item) }} ₽</span>
                <span class="cart-item-discount" v-if="item.skidka">{{ item.skidka }}</span>
                <span class="cart-item-old-price" v-if="item.oldPrice">{{ item.oldPrice }}</span>
              </div>
              <div class="cart-item-quantity">
                <button @click="mainStore.decreaseQuantity(item.id)" :disabled="item.count <= 1">-</button>
                <span :key="item.count">{{ item.count }}</span>
                <button @click="mainStore.increaseQuantity(item.id)">+</button>
              </div>
            </div>
            <button class="remove-btn" @click="mainStore.removeFromCart(item.id)">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd"
                  d="M5.58377 6.99662L0 12.583L1.41388 13.9976L6.99765 8.41116L12.5814 13.9976L13.9953 12.583L8.41153 6.99662L13.9917 1.41382L12.5778 -0.000732422L6.99765 5.58207L1.41748 -0.000730515L0.00360323 1.41382L5.58377 6.99662Z"
                  fill="white" fill-opacity="0.2" />
              </svg>
            </button>
          </div>
        </div>
        <div class="cart-summary">
          <div class="basket-sposobi-oplati">
            <div class="basket-so-card" @click="selectPaymentMethod('account')"
              :class="{ active: selectedPayment === 'account' }">
              <div class="basket-so-card-title">
                <input type="radio" :checked="selectedPayment === 'account'" />
                Накопительный счёт ({{ accountBalance }} ₽)
              </div>
            </div>
            <div class="basket-so-card" @click="selectPaymentMethod('wallets')"
              :class="{ active: selectedPayment === 'wallets' }">
              <div class="basket-so-card-title">
                <input type="radio" :checked="selectedPayment === 'wallets'" />
                Электронные кошельки
              </div>
              <div class="basket-so-card-imgs">
                <img src="@/assets/images/WebMoney_logo_blue 2 1.svg" alt="WebMoney" />
                <img src="@/assets/images/Logo_qiwi_rgb 1.svg" alt="Qiwi" />
              </div>
            </div>
            <div class="basket-so-card" @click="selectPaymentMethod('cards')"
              :class="{ active: selectedPayment === 'cards' }">
              <div class="basket-so-card-title">
                <input type="radio" :checked="selectedPayment === 'cards'" />
                Банковские карты
              </div>
              <div class="basket-so-card-imgs">
                <img src="@/assets/images/mastercard 2.svg" alt="Mastercard" />
                <img src="@/assets/images/Visa_Inc._logo 1.svg" alt="Visa" />
                <img src="@/assets/images/1920px-Mir-logo.SVG 1.svg" alt="Mir" />
              </div>
            </div>
            <div class="basket-so-card" @click="selectPaymentMethod('crypto')"
              :class="{ active: selectedPayment === 'crypto' }">
              <div class="basket-so-card-title">
                <input type="radio" :checked="selectedPayment === 'crypto'" />
                Криптовалюта
              </div>
              <div class="basket-so-card-imgs">
                <img src="@/assets/images/ETHEREUM-YOUTUBE-PROFILE-PIC 1.svg" alt="Ethereum" />
                <img src="@/assets/images/2560px-Bitcoin_logo 1.svg" alt="Bitcoin" />
              </div>
            </div>
            <div class="basket-so-card" @click="selectPaymentMethod('samsung')"
              :class="{ active: selectedPayment === 'samsung' }">
              <div class="basket-so-card-title">
                <input type="radio" :checked="selectedPayment === 'samsung'" />
                Samsung Pay
              </div>
              <div class="basket-so-card-imgs">
                <img src="@/assets/images/640px-Samsung_Pay_icon 1.svg" alt="Samsung Pay" />
              </div>
            </div>
          </div>
          <div class="cart-total" :key="totalPrice">
            <div class="basket-oformit-zakaz-items_count">{{ itemsCountText }}</div>
            <div class="basket-oformit-zakaz-total_price">{{ totalPrice }} ₽</div>
            <div class="basket-oformit-zakaz-but" :class="{ active: selectedPayment }" @click="checkout">Оформить заказ</div>
            <div class="basket-oformit-zakaz-uslovia">
              <div class="basket-oformit-zakaz-uslovia-galochka">
                <svg width="9" height="7" viewBox="0 0 9 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" clip-rule="evenodd"
                    d="M3.12817 5.51281L8.23101 0L9 0.656414L3.12817 7L0 3.62051L0.768991 2.9641L3.12817 5.51281Z"
                    fill="white" />
                </svg>
              </div>
              <div class="basket-oformit-zakaz-uslovia-txt">
                Покупая данный товар, я подтверждаю, что ознакомился и согласен с <a href="#">условиями</a> и <a href="#">условиями магазина</a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-else class="empty-cart">
        <div class="empty-cart-content">
          <h1>Добавьте игры в свою корзину и возвращайтесь!🙂</h1>
          <router-link to="/" class="back-to-main">Начать покупки</router-link>
        </div>
      </div>
    </main>
    <Footer />
  </div>
</template>

<script>
import axios from 'axios';
import Footer from '@/components/Footer.vue';
import Header from '@/components/Header.vue';
import { useMainStore } from '@/store/store';

export default {
  name: 'Cart',
  components: { Header, Footer },
  data() {
    return {
      cartItems: JSON.parse(localStorage.getItem('productsInBasketInGames')) || [],
      products: [],
      selectedPayment: null,
      accountBalance: 0,
      loading: true,
    };
  },
  computed: {
    totalPrice() {
      const total = this.mainStore.basket.reduce((total, item) => {
        const price = parseFloat(item.final_price.replace(' ₽', '').replace(' ', '')) || 0;
        return total + price * item.count;
      }, 0);
      return total.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
    },
    itemsCountText() {
      const count = this.mainStore.basket.length;
      if (count === 1) return '1 товар';
      if (count >= 2 && count <= 4) return `${count} товара`;
      return `${count} товаров`;
    },
  },
  async mounted() {
    await this.fetchProducts();
    this.loadAccountBalance();
  },
  setup(){
    const mainStore = useMainStore();
    return { mainStore };
  },
  methods: {
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
    itemImage(id) {
      if (this.loading) return '';
      const product = this.products.find(p => p.id === id);
      return product ? product.small_capsule_image : '';
    },
    calculatePrice(item) {
      const priceStr = item.final_price.toString().replace(' ₽', '').replace(' ', '');
      const price = parseFloat(priceStr) || 0;
      return (price * item.count).toFixed(2);
    },
    selectPaymentMethod(method) {
      this.selectedPayment = method;
    },
    checkout() {
      if(!this.mainStore.userData){
        this.mainStore.openRegisterForm();
        return;
      }
      else if (!this.selectedPayment) {
        alert('Пожалуйста, выберите способ оплаты!');
        return;
      }
      localStorage.setItem('selectedGameForCheckout', JSON.stringify(this.cartItems)); // Удалить
      localStorage.setItem('selectedPaymentMethod', this.selectedPayment);
      this.$router.push('/checkout');
    },
    loadAccountBalance() {
      const userData = (sessionStorage.getItem('userData')) ? JSON.parse(sessionStorage.getItem('userData')) : null;
      if(userData){
        this.accountBalance = userData.balance !== null ? parseInt(userData.balance) : 10000;
      }
    },
  },
};
</script>

<style scoped>
.cart-page {
  color: #fff;
  font-family: 'Manrope', sans-serif;
  overflow: hidden;
}

main {
  max-width: 1440px;
  min-height: calc(100vh - 600px);
  margin: 0 auto;
  padding: 60px 20px;
}

.cart-title {
  font-size: 48px;
  font-weight: 800;
  background: linear-gradient(90deg, #77BE1D, #97E238);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  text-shadow: 0 2px 6px rgba(119, 190, 29, 0.4);
  margin-bottom: 50px;
  text-align: center;
}

.cart-title span {
  color: #77BE1D;
  text-shadow: none;
}

.cart-container {
  display: flex;
  justify-content: space-between;
  gap: 40px;
}

.cart-items {
  width: 900px;
  height: 100%;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 24px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 30px;
  backdrop-filter: blur(20px);
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.4);
}

.cart-item {
  display: flex;
  align-items: center;
  padding: 20px;
  background: rgba(255, 255, 255, 0.08);
  border-radius: 16px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.cart-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 6px 20px rgba(119, 190, 29, 0.3);
}

.cart-item-image {
  width: 170px;
  height: 120px;
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
  transform: scale(1.02);
}

.cart-item-details {
  margin-left: 30px;
  flex: 1;
}

.cart-item-title {
  font-size: 28px;
  font-weight: 700;
  color: #fff;
  margin-bottom: 10px;
}

.cart-item-dop-info {
  font-size: 16px;
  color: rgba(255, 255, 255, 0.7);
  margin-bottom: 20px;
}

.cart-item-dop-info span {
  color: #FFFFFF4D;
}

.cart-item-prices {
  display: flex;
  align-items: center;
  gap: 15px;
  margin-bottom: 20px;
}

.cart-item-price {
  font-size: 32px;
  font-weight: 800;
  background: linear-gradient(90deg, #77BE1D, #97E238);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.cart-item-discount {
  font-size: 20px;
  font-weight: 600;
  color: #77BE1D;
  background: rgba(119, 190, 29, 0.15);
  padding: 4px 10px;
  border-radius: 12px;
}

.cart-item-old-price {
  font-size: 18px;
  color: rgba(255, 255, 255, 0.4);
  text-decoration: line-through;
}

.cart-item-quantity {
  display: flex;
  align-items: center;
  gap: 12px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 25px;
  padding: 8px;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.cart-item-quantity button {
  width: 36px;
  height: 36px;
  background: linear-gradient(90deg, #77BE1D, #97E238);
  border: none;
  border-radius: 50%;
  color: #fff;
  font-size: 18px;
  font-weight: 700;
  cursor: pointer;
  transition: background 0.3s ease;
}

.cart-item-quantity button:disabled {
  background: rgba(255, 255, 255, 0.1);
  cursor: not-allowed;
}

.cart-item-quantity button:hover:not(:disabled) {
  background: linear-gradient(90deg, #649E18, #7BC22F);
}

.cart-item-quantity span {
  font-size: 20px;
  font-weight: 600;
  color: #fff;
  min-width: 40px;
  text-align: center;
}

.remove-btn {
  padding: 12px;
  background: rgba(255, 48, 48, 0.2);
  border: none;
  display: flex;
  border-radius: 50%;
  cursor: pointer;
  transition: background 0.3s ease, transform 0.3s ease;
}

.remove-btn:hover {
  background: rgba(255, 48, 48, 0.9);
  transform: rotate(90deg);
}
.remove-btn path{
  transition: all 0.3s;
}
.remove-btn:hover path{
  fill-opacity: 1;
}

.cart-summary {
  width: 400px;
  height: 100%;
  position: sticky;
  top: 20px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 24px;
  padding: 30px;
  backdrop-filter: blur(20px);
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.4);
}

.basket-sposobi-oplati {
  width: 100%;
  display: grid;
  grid-template-columns: 1fr;
  gap: 15px;
  margin-bottom: 30px;
}

.basket-so-card {
  padding: 20px;
  border-radius: 15px;
  border: 2px solid rgba(255, 255, 255, 0.1);
  background: rgba(255, 255, 255, 0.03);
  cursor: pointer;
  transition: all 0.3s ease;
}

.basket-so-card:hover {
  border-color: rgba(119, 190, 29, 0.5);
  background: rgba(119, 190, 29, 0.05);
}

.basket-so-card.active {
  border-color: #77BE1D;
  background: rgba(119, 190, 29, 0.1);
}

.basket-so-card-title {
  font-size: 20px;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 10px;
}

.basket-so-card-title input {
  accent-color: #77BE1D;
}

.basket-so-card-imgs {
  margin-top: 15px;
  display: flex;
  gap: 15px;
}

.basket-so-card-imgs img {
  height: 30px;
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3));
}

.cart-total {
  border: 2px solid rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  padding: 30px;
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
}

.basket-oformit-zakaz-items_count {
  font-size: 20px;
  font-weight: 700;
  margin-bottom: 15px;
  color: rgba(255, 255, 255, 0.9);
}

.basket-oformit-zakaz-total_price {
  font-size: 36px;
  font-weight: 800;
  background: linear-gradient(90deg, #77BE1D, #97E238);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  margin-bottom: 20px;
}

.basket-oformit-zakaz-but {
  padding: 12px;
  background: #77BE1D1A;
  border: none;
  border-radius: 15px;
  color: #77BE1D;
  font-weight: 700;
  font-size: 18px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.basket-oformit-zakaz-but.active {
  background: linear-gradient(90deg, #77BE1D, #97E238);
  color: white;
}

.basket-oformit-zakaz-but.active:hover {
  transform: translateY(-5px);
  box-shadow: 0 5px 20px rgba(119, 190, 29, 0.5);
}

.basket-oformit-zakaz-uslovia {
  display: flex;
  margin-top: 20px;
  font-size: 14px;
  color: #787b84;
}

.basket-oformit-zakaz-uslovia-galochka {
  margin-right: 10px;
  display: flex;
  align-items: center;
}

.basket-oformit-zakaz-uslovia-txt a {
  color: #378ae9;
  text-decoration: none;
}

.basket-oformit-zakaz-uslovia-txt a:hover {
  text-decoration: underline;
}

.empty-cart {
  text-align: center;
  padding: 100px 20px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 24px;
  backdrop-filter: blur(20px);
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.4);
}

.empty-cart-content {
  animation: fadeIn 1s ease;
}

.empty-cart h1 {
  font-size: 36px;
  font-weight: 700;
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 30px;
}

.back-to-main {
  font-size: 20px;
  color: #77BE1D;
  text-decoration: none;
  padding: 14px 30px;
  border: 2px solid #77BE1D;
  border-radius: 30px;
  transition: all 0.3s ease;
  display: inline-block;
}

.back-to-main:hover {
  background: #77BE1D;
  color: white;
  transform: translateY(-5px);
  box-shadow: 0 5px 20px rgba(119, 190, 29, 0.5);
}

/* Анимации */
.cart-item-enter-active,
.cart-item-leave-active {
  transition: all 0.5s ease;
}

.cart-item-enter-from,
.cart-item-leave-to {
  opacity: 0;
  transform: translateX(50px) scale(0.95);
}

.count-enter-active,
.count-leave-active {
  transition: all 0.3s ease;
}

.count-enter-from,
.count-leave-to {
  opacity: 0;
  transform: scale(0.5);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>