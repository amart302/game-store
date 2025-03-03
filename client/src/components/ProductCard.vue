<template>
  <div v-if="loading" class="productCard">
    <Skeleton width="328px" height="220px" border-radius="12px" />
    <Skeleton width="240px" height="24px" border-radius="8px" />
    <Skeleton width="180px" height="24px" border-radius="8px" />
  </div>
  <div v-else class="productCard" @click="goToProductPage">
    <img :src="game.large_capsule_image" class="productImg" ref="productImage" />
    <div class="cardCategoriesBlock">
      <div class="hitBlock" v-if="!isTopOnly && isHit">Хит продаж</div>
      <div class="newBlock" v-if="!isTopOnly && isNew">Новинка</div>
      <div class="topBlock" v-if="game.top">Top <img src="../assets/images/lightning.svg" alt="Lightning" /> 4</div>
    </div>
    <button class="addCardBtn" @click.stop="addToCart">В корзину</button>
    <button class="addFavouritesBtn" @click.stop="toggleFavourite">
      <svg v-if="isFavourite" width="21" height="17" viewBox="0 0 21 17" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M5.79822 2C3.62151 2 2 3.60676 2 5.41942C2 6.29853 2.37841 7.16006 3.08284 7.80887L10.5 14.6405L17.9172 7.80887C18.6216 7.16006 19 6.29853 19 5.41942C19 3.60676 17.3785 2 15.2018 2C14.1691 2 13.1936 2.3786 12.4864 3.02996L11.1775 4.23555C10.7946 4.58815 10.2054 4.58815 9.82252 4.23555L8.51361 3.02996C7.80642 2.3786 6.8309 2 5.79822 2ZM0 5.41942C0 2.35052 2.67497 0 5.79822 0C7.31068 0 8.77606 0.552629 9.86856 1.55887L10.5 2.14046L11.1314 1.55887C12.2239 0.552628 13.6893 0 15.2018 0C18.325 0 21 2.35052 21 5.41942C21 6.88451 20.3674 8.27118 19.2721 9.27996L11.1775 16.7355C10.7946 17.0882 10.2054 17.0882 9.82252 16.7355L1.72789 9.27996C0.632635 8.27117 0 6.88451 0 5.41942Z" fill="#FF3030"/>
      </svg>
      <svg v-else width="21" height="17" viewBox="0 0 21 17" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M5.79822 2C3.62151 2 2 3.60676 2 5.41942C2 6.29853 2.37841 7.16006 3.08284 7.80887L10.5 14.6405L17.9172 7.80887C18.6216 7.16006 19 6.29853 19 5.41942C19 3.60676 17.3785 2 15.2018 2C14.1691 2 13.1936 2.3786 12.4864 3.02996L11.1775 4.23555C10.7946 4.58815 10.2054 4.58815 9.82252 4.23555L8.51361 3.02996C7.80642 2.3786 6.8309 2 5.79822 2ZM0 5.41942C0 2.35052 2.67497 0 5.79822 0C7.31068 0 8.77606 0.552629 9.86856 1.55887L10.5 2.14046L11.1314 1.55887C12.2239 0.552628 13.6893 0 15.2018 0C18.325 0 21 2.35052 21 5.41942C21 6.88451 20.3674 8.27118 19.2721 9.27996L11.1775 16.7355C10.7946 17.0882 10.2054 17.0882 9.82252 16.7355L1.72789 9.27996C0.632635 8.27117 0 6.88451 0 5.41942Z" fill="white"/>
      </svg>
    </button>
    <div class="productCard_podBlock1">
      <span class="product_priceWithDiscount">{{ game.final_price }} {{ game.currency }}</span>
      <span class="product_discount" v-if="game.discounted">-{{ game.discount_percent }}%</span>
      <span class="product_priceWithoutDiscount" v-if="game.discounted">{{ game.original_price }} {{ game.currency }}</span>
    </div>
    <div class="productCard_podBlock2">
      <span class="productName">{{ game.name }}</span>
    </div>
    <div class="productCard_podBlock3">
      <div class="category" v-if="game.windows_available"><div class="bullet windows"></div><span>Windows</span></div>
      <div class="category" v-if="game.mac_available"><div class="bullet mac"></div><span>Mac</span></div>
      <div class="category" v-if="game.linux_available"><div class="bullet linux"></div><span>Linux</span></div>
    </div>
  </div>
</template>

<script>
import Skeleton from 'primevue/skeleton';

export default {
  components: { Skeleton },
  name: 'ProductCard',
  data() {
    return {
      loading: true,
    };
  },
  watch: {
    game(newGame) {
      if (newGame) {
        this.startLoading();
      }
    },
  },
  mounted() {
    if (this.game) {
      setTimeout(() => {
        this.loading = false;
      }, 600);
    }
  },
  props: {
    game: {
      type: Object,
      required: true,
    },
    isTopOnly: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    isFavourite() {
      const favourites = JSON.parse(localStorage.getItem('favourites')) || [];
      return favourites.some(fav => fav.id === this.game.id);
    },
    isHit() {
      return this.$parent.hitGames && this.$parent.hitGames.some(hit => hit.id === this.game.id);
    },
    isNew() {
      return this.$parent.newGames && this.$parent.newGames.some(newGame => newGame.id === this.game.id);
    },
  },
  methods: {
    goToProductPage() {
      localStorage.setItem('currentProductInGames', this.game.id);
      this.$router.push('/product');
    },
    addToCart() {
      let basket = JSON.parse(localStorage.getItem('productsInBasketInGames')) || [];
      const product = {
        id: this.game.id,
        title: this.game.name,
        price: `${this.game.final_price} ${this.game.currency}`,
        skidka: this.game.discounted ? `-${this.game.discount_percent}%` : null,
        oldPrice: this.game.discounted ? `${this.game.original_price} ${this.game.currency}` : null,
        count: 1,
      };
      const existing = basket.find(item => item.id === product.id);
      if (existing) existing.count += 1;
      else basket.push(product);
      localStorage.setItem('productsInBasketInGames', JSON.stringify(basket));
      this.$emit('update-basket', basket.length);
      this.animateToCart();
    },
    animateToCart() {
      const productImg = this.$refs.productImage;
      const cartIcon = document.querySelector('.bl-icon img[alt="Корзина"]');
      if (!productImg || !cartIcon) return;

      const cloned = productImg.cloneNode(true);
      cloned.classList.add('cart-animation');
      cloned.style.position = 'absolute';
      cloned.style.width = '50px';
      cloned.style.height = '30px';
      cloned.style.zIndex = '1000';
      cloned.style.left = `${productImg.getBoundingClientRect().left + window.scrollX}px`;
      cloned.style.top = `${productImg.getBoundingClientRect().top + window.scrollY}px`;

      document.body.appendChild(cloned);

      const targetX = cartIcon.getBoundingClientRect().left + window.scrollX - cloned.getBoundingClientRect().left;
      const targetY = cartIcon.getBoundingClientRect().top + window.scrollY - cloned.getBoundingClientRect().top;

      requestAnimationFrame(() => {
        cloned.style.transition = 'all 1s ease-out';
        cloned.style.transform = `translate(${targetX}px, ${targetY}px) scale(0.5)`;
        cloned.style.opacity = '0.5';
        setTimeout(() => cloned.remove(), 1000);
      });
    },
    toggleFavourite() {
      let favourites = JSON.parse(localStorage.getItem('favourites')) || [];
      const isAlreadyFavourite = favourites.some(fav => fav.id === this.game.id);
      if (isAlreadyFavourite) {
        favourites = favourites.filter(fav => fav.id !== this.game.id);
      } else {
        favourites.push(this.game);
      }
      localStorage.setItem('favourites', JSON.stringify(favourites));
      this.$emit('favourites-updated');
    },
  },
};
</script>

<style scoped>
.productCard {
  height: 340px;
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 10px;
  cursor: pointer;
}

.productImg {
  width: 100%;
  height: 220px;
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

.topBlock { background-color: black; }
.hitBlock { background-color: #FF3030; }
.newBlock { background-color: #FF4C00; }

.addCardBtn {
  width: 86%;
  display: none;
  justify-content: center;
  align-items: center;
  opacity: 0;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%);
  color: white;
  font-weight: 500;
  font-size: 16px;
  background-color: #77be1d;
  border: none;
  padding: 10px;
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
  background: none;
  padding: 8px;
  border: none;
  border-radius: 50%;
  transition: all 0.2s;
  cursor: pointer;
}

.productCard:hover .addFavouritesBtn {
  display: block;
  opacity: 1;
}

.productCard_podBlock1 {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 6px;
}

.product_discount { color: #77be1d; }
.product_priceWithoutDiscount { color: #3d394a; text-decoration: line-through; }

.productCard_podBlock2 {
  padding: 0 15px;
}

.productName {
  font-size: 16px;
  font-weight: 600;
  color: #fff;
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

.p-skeleton {
  background-color: #e0e0e0;
  animation: skeleton-animation 1.6s ease-in-out infinite;
}

@keyframes skeleton-animation {
  0% { background-color: rgba(224, 224, 224, 0.6); }
  50% { background-color: rgba(224, 224, 224, 0.8); }
  100% { background-color: rgba(224, 224, 224, 0.6); }
}

/* Медиазапросы для адаптации */
@media (max-width: 1024px) {
  .productCard {
    height: 300px;
  }

  .productImg {
    height: 180px;
  }

  .addCardBtn {
    font-size: 14px;
    padding: 8px 12px;
  }

  .productName {
    font-size: 14px;
  }

  .productCard_podBlock1 {
    gap: 4px;
  }

  .product_priceWithDiscount,
  .product_discount,
  .product_priceWithoutDiscount {
    font-size: 12px;
  }

  .productCard_podBlock3 {
    gap: 20px;
  }

  .category {
    gap: 10px;
    font-size: 12px;
  }

  .bullet {
    width: 12px;
    height: 12px;
  }
}

@media (max-width: 768px) {
  .productCard {
    height: 260px;
  }

  .productImg {
    height: 160px;
  }

  .addCardBtn {
    font-size: 12px;
    padding: 6px 10px;
    width: 90%;
  }

  .productName {
    font-size: 12px;
  }

  .productCard_podBlock1 {
    gap: 2px;
  }

  .product_priceWithDiscount,
  .product_discount,
  .product_priceWithoutDiscount {
    font-size: 10px;
  }

  .productCard_podBlock3 {
    gap: 10px;
  }

  .category {
    gap: 6px;
    font-size: 10px;
  }

  .bullet {
    width: 10px;
    height: 10px;
  }
}
</style>