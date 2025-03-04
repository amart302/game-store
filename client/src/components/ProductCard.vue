<template>
  <div v-if="loading" class="productCard">
    <Skeleton width="100%" height="220px" border-radius="12px" />
    <Skeleton width="240px" height="24px" border-radius="8px" />
    <Skeleton width="180px" height="24px" border-radius="8px" />
  </div>
  <div v-else class="productCard" @click="navigateToProductPage">
    <!-- Изображение карточки -->
    <img :src="game.large_capsule_image" class="productImg" ref="productImage" alt="Game Image" />

    <!-- Бейджи (хит, новинка, топ) -->
    <div class="cardCategoriesBlock">
      <div v-if="!isTopOnly && isHit" class="hitBlock">Хит продаж</div>
      <div v-if="!isTopOnly && isNew" class="newBlock">Новинка</div>
      <div v-if="game.top" class="topBlock">
        Top <img src="../assets/images/lightning.svg" alt="Lightning" /> 4
      </div>
    </div>

    <!-- Кнопка "В корзину" или "Куплено" -->
    <button v-if="!isPurchased" class="addCardBtn" @click.stop="addToCart">В корзину</button>
    <span v-else class="purchased-label">Куплено</span>

    <!-- Кнопка лайка -->
    <div class="product-like">
      <button @click.stop="toggleFavourite" class="favourite-btn" :class="{ 'active': isFavourite }">
        <svg v-if="isFavourite" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" fill="#FF3030" />
        </svg>
        <svg v-else width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" fill="none" stroke="#FFFFFF" stroke-width="2" />
        </svg>
      </button>
    </div>

    <!-- Блок с ценой -->
    <div class="productCard_podBlock1">
      <span class="product_priceWithDiscount">{{ game.final_price }} ₽</span>
      <span v-if="game.discounted" class="product_discount">-{{ game.discount_percent }}%</span>
      <span v-if="game.discounted" class="product_priceWithoutDiscount">{{ game.original_price }} ₽</span>
    </div>

    <!-- Название игры -->
    <div class="productCard_podBlock2">
      <span class="productName">{{ game.name }}</span>
    </div>

    <!-- Платформы -->
    <div class="productCard_podBlock3">
      <div v-if="game.windows_available" class="category">
        <div class="bullet windows"></div>
        <span>Windows</span>
      </div>
      <div v-if="game.mac_available" class="category">
        <div class="bullet mac"></div>
        <span>Mac</span>
      </div>
      <div v-if="game.linux_available" class="category">
        <div class="bullet linux"></div>
        <span>Linux</span>
      </div>
    </div>
  </div>
</template>

<script>
import Skeleton from 'primevue/skeleton';

export default {
  name: 'ProductCard',
  components: { Skeleton },
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
  data() {
    return {
      loading: true,
      favourites: [], // Локальная копия избранного для реактивности
    };
  },
  computed: {
    // Проверка, добавлена ли игра в избранное
    isFavourite() {
      return this.favourites.some(fav => fav.id === this.game.id);
    },
    // Проверка, является ли игра хитом продаж
    isHit() {
      return this.$parent?.hitGames?.some(hit => hit.id === this.game.id) || false;
    },
    // Проверка, является ли игра новинкой
    isNew() {
      return this.$parent?.newGames?.some(newGame => newGame.id === this.game.id) || false;
    },
    // Проверка, куплена ли игра
    isPurchased() {
      const purchaseHistory = JSON.parse(localStorage.getItem('purchaseHistory')) || [];
      return purchaseHistory.some(purchase => purchase.items.some(item => item.id === this.game.id));
    },
  },
  watch: {
    game(newGame) {
      if (newGame) {
        this.startLoading();
      }
    },
  },
  mounted() {
    this.startLoading();
    this.loadFavourites();
  },
  methods: {
    // Загрузка избранного из localStorage
    loadFavourites() {
      this.favourites = JSON.parse(localStorage.getItem('favourites')) || [];
    },
    // Начальная загрузка с задержкой
    startLoading() {
      setTimeout(() => {
        this.loading = false;
      }, 600);
    },
    // Переход на страницу продукта
    navigateToProductPage() {
      sessionStorage.setItem('currentProductInGames', JSON.stringify({
        id: this.game.id,
        price: this.game.final_price
      }));
      this.$router.push('/product');
    },
    // Добавление в корзину
    addToCart() {
      if (this.isPurchased) {
        alert('Эта игра уже куплена!');
        return;
      }

      let basket = JSON.parse(localStorage.getItem('productsInBasketInGames')) || [];
      const product = {
        id: this.game.id,
        name: this.game.name,
        final_price: `${this.game.final_price} ₽`,
        large_capsule_image: this.game.large_capsule_image,
        windows_available: this.game.windows_available,
        linux_available: this.game.linux_available,
        mac_available: this.game.mac_available,
        count: 1,
      };

      const existing = basket.find(item => item.id === product.id);
      if (existing) {
        existing.count += 1;
      } else {
        basket.push(product);
      }

      localStorage.setItem('productsInBasketInGames', JSON.stringify(basket));
      this.$emit('update-basket', basket.length);
      this.animateToCart();
    },
    // Анимация добавления в корзину
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
    // Переключение лайка
    toggleFavourite() {
      let favourites = JSON.parse(localStorage.getItem('favourites')) || [];
      const isAlreadyFavourite = this.isFavourite;

      console.log(isAlreadyFavourite);
      

      if (isAlreadyFavourite) {
        // Удаляем из избранного
        favourites = favourites.filter(fav => fav.id !== this.game.id);
      } else {
        // Добавляем в избранное, сохраняем минимум данных
        favourites.push({
          id: this.game.id,
          name: this.game.name,
          large_capsule_image: this.game.large_capsule_image,
          final_price: this.game.final_price,
          windows_available: this.game.windows_available,
          mac_available: this.game.mac_available,
          linux_available: this.game.linux_available
        });
        
      }
      this.favourites = favourites

      localStorage.setItem('favourites', JSON.stringify(favourites));
      console.log('Updated favourites in ProductCard:', favourites);
      this.$emit('favourites-updated');
      console.log(this.favourites);
      
    },
  },
};
</script>

<style scoped>
/* Основной контейнер карточки */
.productCard {
  height: 340px;
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 10px;
  cursor: pointer;
}

/* Изображение игры */
.productImg {
  width: 100%;
  height: 220px;
  border-radius: 12px;
}

/* Бейджи */
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
  padding: 6px 10px;
  border-radius: 8px;
  font-size: 14px;
}

.topBlock { background-color: black; }
.hitBlock { background-color: #FF3030; }
.newBlock { background-color: #FF4C00; }

/* Кнопка "В корзину" */
.addCardBtn {
  display: none;
  opacity: 0;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%);
  width: 86%;
  justify-content: center;
  align-items: center;
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

/* Метка "Куплено" */
.purchased-label {
  display: none;
  opacity: 0;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%);
  width: 86%;
  justify-content: center;
  align-items: center;
  color: #201b1b;
  font-weight: 500;
  font-size: 16px;
  background-color: rgba(255, 255, 255, 0.829);
  padding: 10px;
  border-radius: 12px;
}

/* Показ кнопки или метки при наведении */
.productCard:hover .addCardBtn,
.productCard:hover .purchased-label {
  display: flex;
  opacity: 1;
}

.addCardBtn:hover {
  background-color: #649e18;
}

/* Кнопка лайка */
.product-like {
  position: absolute;
  top: 10px;
  right: 10px;
  display: none;
  opacity: 0;
  transition: all 0.2s;
}

.productCard:hover .product-like {
  display: block;
  opacity: 1;
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
  width: 20px;
  height: 20px;
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

/* Блок с ценами */
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

.productName {
  font-size: 16px;
  font-weight: 600;
  color: #fff;
}

/* Платформы */
.productCard_podBlock3 {
  position: absolute;
  bottom: 0;
  width: 100%;
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

/* Скелетон для загрузки */
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

  .addCardBtn,
  .purchased-label {
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

  .addCardBtn,
  .purchased-label {
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