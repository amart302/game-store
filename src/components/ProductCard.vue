<template>
  <div class="productCard" @click="goToProductPage">
    <img :src="game.poster" class="productImg" />
    <div class="cardCategoriesBlock">
      <div class="hitBlock" v-if="game.hit">Хит продаж</div>
      <div class="newBlock" v-if="game.new">Новинка</div>
      <div class="topBlock" v-if="game.top">Top <img src="../assets/images/lightning.svg" /> 4</div>
    </div>
    <button class="addCardBtn" @click.stop="addToCart">В корзину</button>
    <button class="addFavouritesBtn" @click.stop="addToFavourites">
      <img class="likeImg" src="../assets/images/likeImg.svg" />
    </button>
    <div class="productCard_podBlock1">
      <span class="product_priceWithDiscount">{{ game.price.amount }} {{ game.price.currency }}</span>
      <span class="product_discount">-15%</span>
      <span class="product_priceWithoutDiscount">{{ Math.round(game.price.amount * 1.15) }} {{ game.price.currency }}</span>
    </div>
    <div class="productCard_podBlock2">
      <span class="productName">{{ game.title }}</span>
    </div>
    <div class="productCard_podBlock3">
      <div class="category" v-for="(cat, i) in game.categories.slice(0, 2)" :key="i">
        <div class="bullet"></div>
        <span>{{ cat }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProductCard',
  props: { game: Object },
  methods: {
    goToProductPage() {
      localStorage.setItem('currentProductInGames', this.game.title);
      window.location.href = '../страница товара/index.html';
    },
    addToCart() {
      let basket = JSON.parse(localStorage.getItem('productsInBasketInGames')) || [];
      const product = {
        title: this.game.title,
        price: `${this.game.price.amount} ${this.game.price.currency}`,
        skidka: '-15%',
        oldPrice: `${Math.round(this.game.price.amount * 1.15)} ${this.game.price.currency}`,
        count: 1,
      };
      const existing = basket.find(item => item.title === product.title);
      if (existing) existing.count += 1;
      else basket.push(product);
      localStorage.setItem('productsInBasketInGames', JSON.stringify(basket));
      this.$emit('update-basket', basket.length);
    },
    addToFavourites() {
      console.log('Добавлено в избранное:', this.game.title);
    },
  },
};
</script>
<style scoped>
.productCard {
  height: 570px;
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 10px;
  cursor: pointer;
}

.productImg {
  width: 100%;
  height: 79%;
  border-radius: 12px;
}

.cardCategoriesBlock {
  display: flex;
  gap: 4px;
  position: absolute;
  top: 10px;
  left: 10px;
}

.topBlock,
.hitBlock,
.newBlock {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 4px;
  padding-inline: 10px;
  padding-block: 6px;
  border-radius: 8px;
  font-size: 14px;
}

.topBlock {
  background-color: black;
}

.hitBlock {
  background-color: #ff3030;
}

.newBlock {
  background-color: #ff4c00;
}

.addCardBtn {
  width: 86%;
  display: none;
  justify-content: center;
  align-items: center;
  opacity: 0;
  position: absolute;
  top: 67%;
  left: 8%;
  color: white;
  font-weight: 500;
  font-size: 16px;
  background-color: #77be1d;
  border: none;
  padding: 12px;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.2s;
}

.productCard:hover .addCardBtn {
  display: flex;
  opacity: 1;
}

.addCardBtn:hover {
  background-color: #649e18;
}

.addFavouritesBtn {
  height: auto;
  display: none;
  opacity: 0;
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: white;
  padding: 8px;
  border: none;
  border-radius: 50%;
  transition: all 0.2s;
  cursor: pointer;
}

.productCard:hover .addFavouritesBtn {
  display: flex;
  opacity: 1;
}

.addFavouritesBtn:hover {
  background-color: rgb(235, 234, 234);
}

.productCard_podBlock1 {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 6px;
}

.product_discount {
  color: #77be1d;
}

.product_priceWithoutDiscount {
  color: #3d394a;
  text-decoration: line-through;
}

.productCard_podBlock3 {
  width: 100%;
  position: absolute;
  bottom: 0;
  display: flex;
  gap: 36px;
  align-items: center;
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