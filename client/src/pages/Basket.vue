<template>
    <div class="cart-page">
      <Header />
      <main>
        <h1 class="cart-title">Корзина</h1>
        <div class="cart-container" v-if="cartItems.length">
          <div class="cart-items">
            <transition-group name="cart-item" tag="div">
              <div v-for="item in cartItems" :key="item.id" class="cart-item">
                <div class="cart-item-image">
                  <img :src="itemImage(item.id)" alt="Item Image" />
                </div>
                <div class="cart-item-details">
                  <span class="cart-item-title">{{ item.title }}</span>
                  <div class="cart-item-prices">
                    <span class="cart-item-price">{{ calculatePrice(item) }} руб.</span>
                    <span class="cart-item-old-price" v-if="item.skidka">{{ item.oldPrice }}</span>
                    <span class="cart-item-discount" v-if="item.skidka">{{ item.skidka }}</span>
                  </div>
                  <div class="cart-item-quantity">
                    <button @click="decreaseQuantity(item.id)" :disabled="item.count <= 1">-</button>
                    <span>{{ item.count }}</span>
                    <button @click="increaseQuantity(item.id)">+</button>
                  </div>
                </div>
                <button class="remove-btn" @click="removeFromCart(item.id)">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6 6L18 18M18 6L6 18" stroke="#FF3030" stroke-width="2" stroke-linecap="round"/>
                  </svg>
                </button>
              </div>
            </transition-group>
          </div>
          <div class="cart-summary">
            <div class="cart-total">
              <span>Всего товаров:</span>
              <span>{{ cartItems.length }}</span>
            </div>
            <div class="cart-total">
              <span>Итого:</span>
              <span class="total-amount">{{ totalPrice }} руб.</span>
            </div>
            <button class="checkout-btn" @click="checkout">Оформить заказ</button>
          </div>
        </div>
        <div v-else class="empty-cart">
          <svg width="100" height="100" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M5 7H19L17 16H7L5 7ZM7 16H17L19 7H5L7 16Z" fill="rgba(255, 255, 255, 0.2)"/>
            <path d="M9 20C9 21.1 8.1 22 7 22C5.9 22 5 21.1 5 20C5 18.9 5.9 18 7 18C8.1 18 9 18.9 9 20ZM17 20C17 21.1 16.1 22 15 22C13.9 22 13 21.1 13 20C13 18.9 13.9 18 15 18C16.1 18 17 18.9 17 20Z" fill="rgba(255, 255, 255, 0.2)"/>
          </svg>
          <p>Ваша корзина пуста</p>
          <router-link to="/" class="back-to-main">Начать покупки</router-link>
        </div>
      </main>
      <Footer />
    </div>
  </template>
  
  <script>
  import Footer from '@/components/Footer.vue';
import Header from '@/components/Header.vue';
import axios from 'axios';
  
  export default {
    name: 'Cart',
    components: { Header, Footer },
    data() {
      return {
        cartItems: JSON.parse(localStorage.getItem('productsInBasketInGames')) || [],
        products: [],
      };
    },
    computed: {
      totalPrice() {
        return this.cartItems.reduce((total, item) => {
          const price = parseFloat(item.price.split(' ')[0]);
          return total + price * item.count;
        }, 0).toFixed(2);
      },
    },
    mounted() {
      this.fetchProducts();
    },
    methods: {
      async fetchProducts() {
        try {
          const response = await axios.get('https://67bcd30ded4861e07b3c0613.mockapi.io/games');
          const data = response.data[0];
          this.products = [
            ...data.hit_games,
            ...data.new_games,
            ...data.top_games,
            ...data.game_catalog,
          ];
        } catch (error) {
          console.error('Ошибка загрузки продуктов:', error);
        }
      },
      itemImage(id) {
        const product = this.products.find(p => p.id === id);
        return product ? product.small_capsule_image : '';
      },
      calculatePrice(item) {
        const price = parseFloat(item.price.split(' ')[0]);
        return (price * item.count).toFixed(2);
      },
      increaseQuantity(id) {
        this.cartItems = this.cartItems.map(item => {
          if (item.id === id) item.count += 1;
          return item;
        });
        localStorage.setItem('productsInBasketInGames', JSON.stringify(this.cartItems));
        this.$emit('update-basket', this.cartItems.length);
      },
      decreaseQuantity(id) {
        this.cartItems = this.cartItems.map(item => {
          if (item.id === id && item.count > 1) item.count -= 1;
          return item;
        });
        localStorage.setItem('productsInBasketInGames', JSON.stringify(this.cartItems));
        this.$emit('update-basket', this.cartItems.length);
      },
      removeFromCart(id) {
        this.cartItems = this.cartItems.filter(item => item.id !== id);
        localStorage.setItem('productsInBasketInGames', JSON.stringify(this.cartItems));
        this.$emit('update-basket', this.cartItems.length);
      },
      checkout() {
        alert('Функционал оформления заказа пока в разработке!');
      },
    },
  };
  </script>
  
  <style scoped>
  .cart-page {
    min-height: 100vh;
    background: linear-gradient(135deg, #0A071A 0%, #1C1435 100%);
    color: #fff;
    font-family: 'Manrope', sans-serif;
    position: relative;
    overflow: hidden;
  }
  main {
    min-height: calc(100vh - 766px);
    max-width: 1440px;
    margin: 0 auto;
    padding: 60px 20px;
    position: relative;
    z-index: 2;
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
  
  .cart-container {
    display: grid;
    grid-template-columns: 3fr 1fr;
    gap: 40px;
    align-items: start;
  }
  
  .cart-items {
    background: rgba(255, 255, 255, 0.05);
    border-radius: 24px;
    padding: 30px;
    backdrop-filter: blur(20px);
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.4);
    border: 1px solid rgba(255, 255, 255, 0.1);
  }
  
  .cart-item {
    display: flex;
    align-items: center;
    gap: 30px;
    padding: 20px;
    background: rgba(255, 255, 255, 0.08);
    border-radius: 16px;
    margin-bottom: 20px;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
  }
  
  .cart-item:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 20px rgba(119, 190, 29, 0.3);
  }
  
  .cart-item-image {
    width: 120px;
    height: 70px;
    border-radius: 12px;
    overflow: hidden;
    position: relative;
    background: rgba(0, 0, 0, 0.2);
  }
  
  .cart-item-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;
  }
  
  .cart-item:hover .cart-item-image img {
    transform: scale(1.05);
  }
  
  .cart-item-details {
    flex: 1;
  }
  
  .cart-item-title {
    font-size: 20px;
    font-weight: 700;
    color: #fff;
    margin-bottom: 10px;
    display: block;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  
  .cart-item-prices {
    display: flex;
    align-items: center;
    gap: 15px;
    margin-bottom: 15px;
  }
  
  .cart-item-price {
    font-size: 24px;
    font-weight: 800;
    background: linear-gradient(90deg, #77BE1D, #97E238);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
  }
  
  .cart-item-old-price {
    font-size: 16px;
    color: rgba(255, 255, 255, 0.4);
    text-decoration: line-through;
  }
  
  .cart-item-discount {
    font-size: 16px;
    color: #77BE1D;
    background: rgba(119, 190, 29, 0.15);
    padding: 4px 10px;
    border-radius: 12px;
    font-weight: 600;
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
    transition: background 0.3s ease, transform 0.2s ease;
  }
  
  .cart-item-quantity button:disabled {
    background: rgba(255, 255, 255, 0.1);
    cursor: not-allowed;
  }
  
  .cart-item-quantity button:hover:not(:disabled) {
    background: linear-gradient(90deg, #649E18, #7BC22F);
    transform: scale(1.1);
  }
  
  .cart-item-quantity span {
    font-size: 18px;
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

  .remove-btn:hover path {
    stroke: white;
  }
  
  .remove-btn:hover {
    background: rgba(255, 48, 48, 0.9);
    transform: rotate(90deg);
    stroke: white;
  } 
  .cart-summary {
    background: rgba(255, 255, 255, 0.05);
    border-radius: 24px;
    padding: 40px;
    backdrop-filter: blur(20px);
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.4);
    border: 1px solid rgba(255, 255, 255, 0.1);
    position: sticky;
    top: 20px;
  }
  
  .cart-total {
    display: flex;
    justify-content: space-between;
    font-size: 22px;
    font-weight: 600;
    margin-bottom: 20px;
    color: rgba(255, 255, 255, 0.9);
  }
  
  .total-amount {
    font-size: 28px;
    font-weight: 800;
    background: linear-gradient(90deg, #77BE1D, #97E238);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
  }
  
  .checkout-btn {
    width: 100%;
    padding: 18px;
    background: linear-gradient(90deg, #77BE1D, #97E238);
    border: none;
    border-radius: 30px;
    color: white;
    font-weight: 700;
    font-size: 18px;
    cursor: pointer;
    transition: transform 0.3s ease, background 0.3s ease, box-shadow 0.3s ease;
  }
  
  .checkout-btn:hover {
    transform: translateY(-5px);
    background: linear-gradient(90deg, #649E18, #7BC22F);
    box-shadow: 0 5px 20px rgba(119, 190, 29, 0.5);
  }
  
  .empty-cart {
    text-align: center;
    padding: 100px 20px;
    background: rgba(255, 255, 255, 0.05);
    border-radius: 24px;
    backdrop-filter: blur(20px);
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.4);
    border: 1px solid rgba(255, 255, 255, 0.1);
  }
  
  .empty-cart svg {
    margin-bottom: 30px;
    opacity: 0.3;
  }
  
  .empty-cart p {
    font-size: 32px;
    font-weight: 700;
    color: rgba(255, 255, 255, 0.7);
    margin-bottom: 40px;
  }
  
  .back-to-main {
    font-size: 20px;
    color: #77BE1D;
    text-decoration: none;
    padding: 14px 30px;
    border: 2px solid #77BE1D;
    border-radius: 30px;
    transition: all 0.3s ease;
  }
  
  .back-to-main:hover {
    background: #77BE1D;
    color: white;
    transform: translateY(-5px);
    box-shadow: 0 5px 20px rgba(119, 190, 29, 0.5);
  }
  
  .cart-item-enter-active,
  .cart-item-leave-active {
    transition: all 0.5s ease;
  }
  
  .cart-item-enter-from,
  .cart-item-leave-to {
    opacity: 0;
    transform: translateX(50px);
  }
  </style>