<template>
  <div class="slider-container-parent">
    <div class="slider-container" ref="sliderContainer">
    <div class="slider">
      <img 
        :src="slides[currentSlide].background" 
        @click="() => navigateToProductPage(slides[currentSlide].id)" 
        class="slide" 
        loading="lazy" 
        alt="Слайд" 
      />
    </div>

    <div class="game-list-container">
      <div class="game-list">
        <div class="game-item">
          <span class="game-title">{{ slides[currentSlide].title }}</span>
          <div class="screenshots-container">
            <img 
              v-for="(screenshot, index) in ads[currentSlide].screenshots" 
              :key="index" 
              :src="screenshot" 
              alt="Game Cover" 
              class="game-cover" 
              loading="lazy"
            />
          </div>
          <span>Уже доступно в Playnchill</span>
          <div class="game-buttons">
            <button>В корзину</button>
            <button>В избранное</button>
          </div>
        </div>
      </div>
    </div>

    <div class="slider-indicators">
      <span 
        v-for="(slide, index) in slides" 
        :key="index" 
        :class="{ active: currentSlide === index }"
        @click="goToSlide(index)"
      ></span>
    </div>
  </div>
  <button class="prev" style="left: -20px;" @click="() => {
    stopAutoSlide();
    changeSlide(-1);
    setTimeout(() => startAutoSlide(), 2000);
  }">❮</button>
  <button class="next" style="right: -20px;" @click="() => {
    stopAutoSlide();
    changeSlide(1);
    setTimeout(() => startAutoSlide(), 2000);
  }">❯</button>
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
          id: 730,
          background: 'https://cdn.akamai.steamstatic.com/apps/csgo/images/csgo_react/social/cs2.jpg',
        },
        {
          id: 1086940,
          background: 'https://pic.rutubelist.ru/video/2025-01-17/95/9f/959f18ca903d57d7d062befcfc4d642f.jpg',
        },
        {
          id: 1222140,
          background: 'https://cdn2.unrealengine.com/Diesel%2Fproductv2%2Fdetroit-become-human%2Fhome%2FDetroit_PC_Carousel-1920x1080-6e90610a5d314ce0c12860770cc38c1b23213000.jpg',
        },
        {
          id: 252490,
          background: 'https://www.hardwareinside.de/wp-content/uploads/2021/07/article-thumb-1200x630@2x.jpg',
        },
        {
          id: 1850570,
          background: 'https://cdn1.epicgames.com/offer/f4a904fcef2447439c35c4e6457f3027/s1_2560x1440-e56d3a322a94fd7dd18b9c93ee080d01',
        }
      ],
      ads: [
        { title: 'Counter-Strike 2',
          screenshots: [
            "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/730/ss_796601d9d67faf53486eeb26d0724347cea67ddc.600x338.jpg?t=1729703045",
            "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/730/ss_d830cfd0550fbb64d80e803e93c929c3abb02056.600x338.jpg?t=1729703045",
            "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/730/ss_13bb35638c0267759276f511ee97064773b37a51.600x338.jpg?t=1729703045",
            "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/730/ss_0f8cf82d019c614760fd20801f2bb4001da7ea77.600x338.jpg?t=1729703045"
          ]
        },
        { title: 'Baldur\'s Gate 3',
          screenshots: [
            "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1086940/ss_c73bc54415178c07fef85f54ee26621728c77504.600x338.jpg?t=1740386911",
            "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1086940/ss_73d93bea842b93914d966622104dcb8c0f42972b.600x338.jpg?t=1740386911",
            "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1086940/ss_b6a6ee6e046426d08ceea7a4506a1b5f44181543.600x338.jpg?t=1740386911",
            "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/730/ss_0f8cf82d019c614760fd20801f2bb4001da7ea77.600x338.jpg?t=1729703045"
          ]
        },
        { title: 'Detroit: Become Human',
          screenshots: [
            "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1222140/ss_9c900def2b1d9a003b7d3e202ea2a7556a36e081.600x338.jpg?t=1667468479",
            "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1222140/ss_3011c05e404043e3bfed1f6de7fe12ffd58ddc9b.600x338.jpg?t=1667468479",
            "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1222140/ss_9e6c271b6d11b1d0f35da336fb57b35fed0079d1.600x338.jpg?t=1667468479",
            "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1222140/ss_b1e2a185bea13cccfc662e1286912bcd6f4ee798.600x338.jpg?t=1667468479"
          ]
        },
        { title: 'Rust',
          screenshots: [
            "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/252490/ss_271feae67943bdc141c1249aba116349397e9ba9.600x338.jpg?t=1738927718",
            "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/252490/ss_e825b087b95e51c3534383cfd75ad6e8038147c3.600x338.jpg?t=1738927718",
            "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/252490/ss_0e646f1a70e5cb8eed00efef8adb9579d40d5b2e.600x338.jpg?t=1738927718",
            "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/252490/ss_1c2d0d1eefee54f0c67626c74eb21699bbb0ef52.600x338.jpg?t=1738927718"
          ]
        },
        { title: 'Death Stranding',
          screenshots: [
            "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1850570/ss_f64a1140651ff5af30eb63bb6e5b41753d00a98e.600x338.jpg?t=1728989088",
            "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1850570/ss_4b6d7d010d1701b2b57bf8ef1b4975a04b3d632f.600x338.jpg?t=1728989088",
            "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1850570/ss_bc8812817c074772822c1d1e8a6b016983cf05e8.600x338.jpg?t=1728989088",
            "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1850570/ss_d47bde2e349606b3ef1f641e2d8fb7ccf1adba77.600x338.jpg?t=1728989088"
          ]
        }
      ],
      index: 0,
      autoSlideInterval: null
    };
  },
  setup(){
    const mainStore = useMainStore();
    return { mainStore };
  },
  methods: {
    navigateToProductPage(id) {
      const game = [...this.mainStore.topGames, ...this.mainStore.gameCatalog].find(item => item.id === id);
      sessionStorage.setItem('currentProductInGames', JSON.stringify({
        id: id,
        price: game.final_price,
        windows_available: game.windows_available,
        mac_available: game.mac_available,
        linux_available:game.linux_available
      }));
      this.$router.push('/product');
    },
    changeSlide(index) {
      this.$refs.sliderContainer.style.opacity = 0;
      setTimeout(() => {
        this.currentSlide = (this.currentSlide + index + this.slides.length) % this.slides.length;
      }, 200);
      setTimeout(() => this.$refs.sliderContainer.style.opacity = 1, 300);
    },
    startAutoSlide() {
      console.log(123);
      
      this.autoSlideInterval = setInterval(() => {
        this.changeSlide(1);
      }, 2000);
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
.slider-container-parent{
  position: relative;
  width: 1440px;
  height: 530px;
  margin-inline: auto;

}
.slider-container {
  position: relative;
  display: grid;
  grid-template-columns: 1fr 0.35fr;
  height: 100%;
  padding: 20px;
  color: white;
  gap: 10px;
  border-radius: 10px;
  transition: opacity 0.2s ease-in-out;
}
.prev,
.next {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  font-size: 30px;
  border: none;
  background: transparent;
  padding: 10px;
  cursor: pointer;
  border-radius: 6px;
  transition: background 0.3s ease;
}
.prev:hover,
.next:hover {
  background: rgba(119, 190, 29, 0.5);
}
.slider {
  background-color: #111;
  position: relative;
  overflow: hidden;
  border-radius: 10px;
  cursor: pointer;
}
.slider p{
  position: absolute;
  bottom: 140px;
  left: 60px;
}

.slide {
  width: 100%;
  height: 100%;
  transition: opacity 1s ease-in-out;
}
.game-buttons{
  width: calc(100% - 40px);
  position: absolute;
  bottom: 20px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
  justify-content: space-between;
}
.game-buttons button{
  border: none;
  background-color: #77be1d;
  padding-inline: 20px;
  padding-block: 16px;
  border-radius: 12px;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.2s;
}
.slide-buttons button:hover{
  opacity: 0.8;
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

.game-list-container {
  min-width: 280px;
}

.game-list {
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.screenshots-container{
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
}

.game-item {
  position: relative;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 20px;
  background: #222;
  border-radius: 5px;
  cursor: pointer;
  transition: background 0.3s;
}

.game-item.active {
  background: #444;
}

.game-cover {
  width: 100%;
  object-fit: cover;
  border-radius: 5px;
}

.game-info {
  flex: 1;
}

.game-title {
  font-size: 24px;
  color: white;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 1s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
