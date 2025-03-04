<template>
    <div class="searchBlock">
      <div class="searchProductCard" v-for="game in searchResults" :key="game.id" @click="goToProductPage(game)">
        <img class="searchCardImg" :src="game.poster" />
        <div class="searchCardAddBtns">
          <button class="addBasketSearchBtn" @click.stop="addToCart(game)"><img src="../assets/images/searchBasketImg.svg" /></button>
          <button class="addFavouritesSearchBtn" @click.stop="addToFavourites(game)"><img src="../assets/images/searchFavoritesImg.svg" /></button>
        </div>
        <div class="seardchCardInfo">
          <p class="searchCardName">{{ game.title }}</p>
          <div class="searchCardPrice">
            <span class="product_priceWithDiscount">{{ game.price.amount }} {{ game.price.currency }}</span>
            <span class="product_discount">-15%</span>
            <span class="product_priceWithoutDiscount">{{ Math.round(game.price.amount * 1.15) }} {{ game.price.currency }}</span>
          </div>
          <div class="searchCardCategories">
            <div class="category" v-for="(cat, i) in game.categories.slice(0, 2)" :key="i">
              <div class="bullet"></div>
              <span>{{ cat }}</span>
            </div>
          </div>
        </div>
      </div>
      <h2 v-if="searchResults.length === 0 && searched">По вашему запросу ничего не найдено</h2>
    </div>
  </template>
  
  <script>
  export default {
    name: 'search',
    props: { searchResults: Array },
    data() {
      return { searched: false };
    },
    watch: {
      searchResults() {
        this.searched = true;
      },
    },
    methods: {
      goToProductPage(game) {
        localStorage.setItem('currentProductInGames', game.title);
        window.location.href = '../страница товара/index.html';
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
    text-align: left;
    width: 100%;
    height: 100%;
    border-radius: 12px;
    background-color: #0c061f;
    z-index: 2;
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
    background-color: #06030f;
  }
  
  .searchCardImg {
    width: 10%;
    height: 200px;
  }
  
  .seardchCardInfo {
    display: flex;
    flex-direction: column;
    gap: 26px;
  }
  
  .searchCardName {
    font-size: 20px;
    text-align: left;
  }
  
  .searchCardCategories {
    width: 80%;
    position: absolute;
    bottom: 12px;
    display: flex;
    gap: 36px;
    align-items: center;
  }
  
  .searchCardPrice {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 10px;
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
  
  .addBasketSearchBtn:hover,
  .addFavouritesSearchBtn:hover {
    background-color: white;
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
  </style>