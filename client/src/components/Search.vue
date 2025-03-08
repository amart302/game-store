<template>
    <div class="searchBlock" v-if="searchQuery.length">
      <div class="searchProductCard" v-for="game in searchResults" :key="game.id" @click="navigateToProductPage(game)">
        <img class="searchCardImg" :src="game.header_image" />
        <div class="seardchCardInfo">
          <p class="searchCardName">{{ game.name }}</p>
          <div class="searchCardPrice">
            <span class="product_priceWithDiscount">{{ game.final_price }} {{ selectedCurrency }}</span>
          </div>
          <div class="searchCardCategories">
            <div v-if="game.mac_available" class="category">
              <div class="bullet mac"></div>
              <span>Mac</span>
            </div>
            <div v-if="game.linux_available" class="category">
              <div class="bullet linux"></div>
              <span>Linux</span>
            </div>
            <div v-if="game.windows_available" class="category">
              <div class="bullet windows"></div>
              <span>Windows</span>
            </div>
          </div>
        </div>
      </div>
      <h2 v-if="!searchResults.length">По вашему запросу ничего не найдено</h2>
    </div>
  </template>
  
  <script>
import { useMainStore } from '@/store/store';

  export default {
    name: 'search',
    props: { searchQuery: String },
    data() {
      return { 
        searchResults: [],
        selectedCurrency: '₽',
       };
    },
    watch: {
      searchQuery() {
        const mainStore = useMainStore();
        const regex = new RegExp(this.searchQuery, "i");
        this.searchResults = [];
        
        const allGames = [...mainStore.topGames, ...mainStore.gameCatalog];
        allGames.map(item => {
          if(regex.test(item.name)){
            this.searchResults.push(item);
          }
        });
      },
    },
    methods: {
      goToProductPage(game) {
        localStorage.setItem('currentProductInGames', game.title);
        window.location.href = '../страница товара/index.html';
      },
      navigateToProductPage(game) {
      sessionStorage.setItem('currentProductInGames', JSON.stringify({
        id: game.id,
        price: game.final_price,
        windows_available: game.windows_available,
        mac_available: game.mac_available,
        linux_available: game.linux_available
      }));
      this.$router.push('/product');
    },
      addToCart(game) {
        let basket = JSON.parse(localStorage.getItem('productsInBasketInGames')) || [];
        const product = {
          title: game.title,
          price: `${game.price.amount} ${game.price.currency}`,
          skidka: '-15%',
          oldPrice: `${Math.round(game.price.amount * 1.15)} ${game.price.currency}`,
          count: 1,
        };
        const existing = basket.find(item => item.title === product.title);
        if (existing) existing.count += 1;
        else basket.push(product);
        localStorage.setItem('productsInBasketInGames', JSON.stringify(basket));
        this.$emit('update-basket', basket.length);
      },
      addToFavourites(game) {
        console.log('Добавлено в избранное:', game.title);
      },
    },
  };
  </script>
  <style scoped>
  .searchBlock {
    position: absolute;
    left: 50%;
    transform: translate(-50%);
    text-align: left;
    width: 1000px;
    max-height: 600px;
    overflow-y: auto;
    border-radius: 12px;
    padding: 20px;
    background-color: #0c061f;
    z-index: 2;
  }
  
  ::-webkit-scrollbar {
  width: 12px;
  height: 12px;
}

::-webkit-scrollbar-track {
  background: #d1d1d1;
  border-radius: 6px;
}

::-webkit-scrollbar-thumb {
  background: #8b8b8b;
  border-radius: 6px;
}

::-webkit-scrollbar-thumb:hover {
  background: #696969
}
  .searchProductCard {
    padding: 16px;
    position: relative;
    display: flex;
    gap: 20px;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.4s;
  }
  
  .searchProductCard:hover {
    background-color: rgb(19, 9, 46);
  }
  
  .searchCardImg {
    width: 280px;
    border-radius: 12px;
  }
  
  .seardchCardInfo {
    width: 100%;
    display: grid;
    grid-template-columns: 1fr 0.5fr 0.5fr;
    gap: 20px;
    justify-content: center;
    align-items: center;
  }
  
  .searchCardName {
    font-size: 20px;
    text-align: left;
  }
  
  .searchCardCategories {
    width: 80%;
    bottom: 12px;
    display: flex;
    flex-direction: column;
    gap: 36px;
    align-items: center;
  }
  .searchCardAddBtns {
    display: flex;
    flex-direction: column;
    gap: 10px;
    position: absolute;
    top: 25%;
    right: 16px;
  }
  
  .addBasketSearchBtn,
  .addFavouritesSearchBtn {
    height: auto;
    display: flex;
    background-color: transparent;
    padding: 8px;
    border: solid 1px white;
    border-radius: 50%;
    transition: all 0.2s;
    cursor: pointer;
  }
  
  .addBasketSearchBtn img,
  .addFavouritesSearchBtn img {
    width: 100%;
  }
  
  button:hover {
    background-color: rgb(151, 149, 149);
  }
  
  .category {
    display: flex;
    align-items: center;
    gap: 14px;
  }
  
  .bullet {
    width: 14px;
    height: 14px;
    background-color: #3d394a;
    border-radius: 50%;
  }
  .favourite-btn {
    background: transparent;
    border: solid 1px white;
    padding: 10px;
    border-radius: 50%;
    cursor: pointer;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .bl-icon {
    display: flex;
    align-items: center;
    gap: 25px;
    position: relative;
  }

  .bl-icon img {
    padding: 10px;
    cursor: pointer;
    transition: opacity 0.3s ease;
  }
  </style>