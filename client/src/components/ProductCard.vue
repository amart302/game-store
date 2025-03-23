<template>
  <div v-if="loading" class="productCard">
    <Skeleton width="100%" height="220px" border-radius="12px" />
    <Skeleton width="240px" height="24px" border-radius="8px" />
    <Skeleton width="180px" height="24px" border-radius="8px" />
  </div>
  <div v-else class="productCard" @click="navigateToProductPage">
    <img :src="game.large_capsule_image" class="productImg" ref="productImage" alt="Game Image" />

    <button class="addCardBtn" @click.stop="() => addToBasket(game)">В корзину</button>

    <div class="product-like">
      <button @click.stop="() => addToFavourites(game)" class="favourite-btn" :class="{ 'active': isFavourite }">
        <svg v-if="isFavourite" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" fill="#FF3030" />
        </svg>
        <svg v-else width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" fill="none" stroke="#FFFFFF" stroke-width="2" />
        </svg>
      </button>
    </div>

    <div class="productCard_podBlock1">
      <span class="product_priceWithDiscount">{{ (game.final_price) ? `${game.final_price} ₽` : "Бесплатно"  }}</span>
      <span v-if="game.discounted" class="product_discount">-{{ game.discount_percent }}%</span>
      <span v-if="game.discounted" class="product_priceWithoutDiscount">{{ game.original_price }} ₽</span>
    </div>

    <div class="productCard_podBlock2">
      <span class="productName">{{ game.name }}</span>
    </div>

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
import { useMainStore } from '@/store/store';
import Skeleton from 'primevue/skeleton';
import { useToast } from "vue-toastification";

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
    };
  },
  setup(){
    const mainStore = useMainStore();
    const toast = useToast();
    return { mainStore, toast };
  },
  computed: {
    isFavourite() {
      return this.mainStore.favourites.some(fav => fav.id === this.game.id);
    },
  },
  mounted() {
    this.startLoading();
  },
  methods: {
    startLoading() {
      setTimeout(() => {
        this.loading = false;
      }, 600);
    },
    navigateToProductPage() {
      sessionStorage.setItem('currentProductInGames', JSON.stringify({
        id: this.game.id,
        price: this.game.final_price,
        windows_available: this.game.windows_available,
        mac_available: this.game.mac_available,
        linux_available:this.game.linux_available
      }));
      if(this.$route.path === "/product"){
        window.location.reload();
        return;
      }
      this.$router.push('/product');
    },
    addToBasket(game){
      this.mainStore.addToBasket(game);
      this.toast.success("Игра добавлена в корзину");
    },
    addToFavourites(game){
      const check = this.mainStore.addToFavourites(game);
      
      if(check.status === "added"){
        this.toast.success("Игра добавлена в избранное");
      }else{
        this.toast.success("Игра удалена из избранного");
      }
    }
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
  padding: 6px 10px;
  border-radius: 8px;
  font-size: 14px;
}

.topBlock { background-color: black; }
.hitBlock { background-color: #FF3030; }
.newBlock { background-color: #FF4C00; }

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

.productCard:hover .addCardBtn,
.productCard:hover{
  display: flex;
  opacity: 1;
}

.addCardBtn:hover {
  background-color: #649e18;
}

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

.p-skeleton {
  background-color: #e0e0e0;
  animation: skeleton-animation 1.6s ease-in-out infinite;
}

@keyframes skeleton-animation {
  0% { background-color: rgba(224, 224, 224, 0.6); }
  50% { background-color: rgba(224, 224, 224, 0.8); }
  100% { background-color: rgba(224, 224, 224, 0.6); }
}

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

  .addCardBtn{
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