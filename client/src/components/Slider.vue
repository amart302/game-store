<template>
  <div class="slider-container">
    <!-- Основной слайдер -->
    <div class="slider">
      <img :src="slides[currentSlide].background" class="slide" ref="productImage" alt="Слайд" />
    </div>

    <!-- Список игр справа -->
    <div class="game-list-container">
      <div class="game-list">
        <div class="game-item" v-for="(game, index) in ads" :key="index" @click="goToSlide(index)"
          :class="{ active: currentSlide === index }">
          <img :src="game.cover" alt="Game Cover" class="game-cover" />
          <div class="game-info">
            <span class="game-title">{{ game.title }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useMainStore } from '@/store/store';

export default {
  name: 'GameSlider',
  data() {
    return {
      currentSlide: 0,
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
      slides: [
        {
          title: 'Grand Theft Auto V Enhanced',
          background: 'https://cdn.akamai.steamstatic.com/apps/csgo/images/csgo_react/social/cs2.jpg',
          description: 'Легендарные хиты Grand Theft Auto V и Grand Theft Auto Online — теперь с обновлением для нового поколения!',
          price: 14.99,
          oldPrice: 29.99
        },
        {
          title: 'Split Fiction',
          background: '',
          description: 'Новый боевик с кооперативным режимом!',
          price: 24.99
        },
        {
          title: 'Honkai: Star Rail',
          background: 'https://cdn2.unrealengine.com/Diesel%2Fproductv2%2Fdetroit-become-human%2Fhome%2FDetroit_PC_Carousel-1920x1080-6e90610a5d314ce0c12860770cc38c1b23213000.jpg',
          description: 'Красочный мир приключений!',
          price: 'Бесплатно'
        }
      ],
      ads: [
        { title: 'Counter-Strike 2', cover: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/730/header.jpg?t=1729703045' },
        { title: 'Split Fiction', cover: '' },
        { title: 'Detroit: Become Human', cover: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1222140/header.jpg?t=1667468479' },
        { title: 'Rocket League', cover: 'https://example.com/rocket-league.jpg' },
        { title: 'Assassin\'s Creed', cover: 'https://example.com/ac-shadows.jpg' }
      ],
      autoSlideInterval: null
    };
  },
  setup(){
    const mainStore = useMainStore();
    console.log(mainStore.topGames);
    
    return { mainStore };
  },
  methods: {
    goToSlide(index) {
      this.currentSlide = index;
    },
    navigateToProductPage() {
      sessionStorage.setItem('currentProductInGames', JSON.stringify({
        id: this.game.id,
        price: this.game.final_price,
        windows_available: this.game.windows_available,
        mac_available: this.game.mac_available,
        linux_available:this.game.linux_available
      }));
      this.$router.push('/product');
    },
    startAutoSlide() {
      this.autoSlideInterval = setInterval(() => {
        this.currentSlide = (this.currentSlide + 1) % this.slides.length;
      }, 5000);
    },
    stopAutoSlide() {
      clearInterval(this.autoSlideInterval);
    }
  },
  mounted() {
    this.startAutoSlide();
  },
  beforeDestroy() {
    this.stopAutoSlide();
  }
};
</script>

<style scoped>
/* Основной контейнер */
.slider-container {
  display: grid;
  grid-template-columns: 1fr 0.3fr;
  width: 1440px;
  margin-inline: auto;
  padding: 20px;
  color: white;
  gap: 10px;
  border-radius: 10px;
}

/* Основной слайдер */
.slider {
  background-color: #111;
  position: relative;
  overflow: hidden;
  border-radius: 10px;
}

.slide {
  width: 100%;
  height: 100%;
  position: absolute;
  transition: opacity 1s ease-in-out;
}

.slide-background {
  width: 100%;
  height: 400px;
  background-size: cover;
  background-position: center;
  position: relative;
  border-radius: 10px;
}

.slide-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
}

/* Контент внутри слайда */
.slide-content {
  position: absolute;
  bottom: 30px;
  left: 30px;
}

.game-logo {
  width: 200px;
  margin-bottom: 10px;
}

.available {
  font-size: 14px;
  color: #bbb;
  text-transform: uppercase;
}

.description {
  font-size: 18px;
  max-width: 400px;
  margin-bottom: 20px;
}

.price {
  font-size: 24px;
  margin-bottom: 20px;
}

.old-price {
  text-decoration: line-through;
  color: #aaa;
  margin-right: 10px;
}

.discount {
  color: #00c8ff;
  background: rgba(0, 200, 255, 0.2);
  padding: 5px;
  font-size: 14px;
  border-radius: 5px;
  margin-right: 10px;
}

.final-price {
  font-size: 24px;
  font-weight: bold;
}

/* Кнопки */
.buttons {
  display: flex;
  gap: 10px;
}

.primary-btn {
  background: white;
  color: black;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
  transition: transform 0.1s ease;
}

.primary-btn:hover {
  transform: scale(1.05);
}

.secondary-btn {
  background: transparent;
  color: white;
  padding: 10px 20px;
  border: 1px solid white;
  border-radius: 5px;
  cursor: pointer;
}

.secondary-btn:hover {
  background: rgba(255, 255, 255, 0.2);
}

/* Список игр */
.game-list-container {
  min-width: 280px;
}

.game-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.game-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px;
  background: #222;
  border-radius: 5px;
  cursor: pointer;
  transition: background 0.3s;
}

.game-item.active {
  background: #444;
}

.game-cover {
  height: 75px;
  object-fit: cover;
  border-radius: 5px;
}

.game-info {
  flex: 1;
}

.game-title {
  font-size: 14px;
  color: white;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* Анимация слайдов */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 1s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
