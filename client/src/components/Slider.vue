<template>
  <div class="slider-container">
    <!-- Основной слайдер -->
    <div class="slider">
      <div v-for="(slide, index) in slides" :key="index">
        <img v-if="typeof slide === 'string'" :src="game.large_capsule_image" ref="productImage" alt="Слайд" />
        <video v-else-if="slide.video" :poster="slide.poster" controls>
          <source :src="slide.video" type="video/mp4" />
        </video>
      </div>
    </div>

    <!-- Список игр справа -->
    <div class="game-list-container">
      <div class="game-list">
        <div class="game-item" v-for="(game, index) in ads" :key="index" @click="goToSlide(index)"
          :class="{ active: currentSlide === index }">
          <img :src="game.large_capsule_image" alt="Game Cover" class="game-cover" />
          <div class="game-info">
            <span class="game-title">{{ game.title }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
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
          background: 'https://example.com/gta-background.jpg',
          description: 'Легендарные хиты Grand Theft Auto V и Grand Theft Auto Online — теперь с обновлением для нового поколения!',
          price: 14.99,
          oldPrice: 29.99
        },
        {
          title: 'Split Fiction',
          background: 'https://example.com/split-fiction.jpg',
          description: 'Новый боевик с кооперативным режимом!',
          price: 24.99
        },
        {
          title: 'Honkai: Star Rail',
          background: 'https://example.com/honkai.jpg',
          description: 'Красочный мир приключений!',
          price: 'Бесплатно'
        }
      ],
      ads: [
        { title: 'Grand Theft Auto V Enhanced', cover: 'https://example.com/gta-cover.jpg' },
        { title: 'Split Fiction', cover: 'https://example.com/split-fiction-cover.jpg' },
        { title: 'Honkai: Star Rail', cover: 'https://example.com/honkai-cover.jpg' },
        { title: 'Rocket League', cover: 'https://example.com/rocket-league.jpg' },
        { title: 'Assassin\'s Creed Тени', cover: 'https://example.com/ac-shadows.jpg' }
      ],
      autoSlideInterval: null
    };
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
  display: flex;
  width: 1440px;
  margin-inline: auto;
  padding: 20px;
  color: white;
  gap: 50px;
  border-radius: 10px;
}

/* Основной слайдер */
.slider {
  width: 1200px;
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
  max-width: 280px;
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
  width: 50px;
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
