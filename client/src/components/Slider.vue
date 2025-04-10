<template>
  <div class="slider-container">
    <div class="slider"  @click="() => navigateToProductPage(slides[currentSlide].id)">
      <img :src="slides[currentSlide].background" class="slide" ref="productImage" alt="Слайд" />
      <div class="slide-info">
        <h3>{{ slides[currentSlide].title }}</h3>
        <p>{{ slides[currentSlide].description }}</p>
        <div>
          <button @click.stop="() => addToBasket(slides[currentSlide].id)">В корзину</button>
          <button @click.stop="() => addToFavourites(slides[currentSlide].id)">В избранное</button>
        </div>
      </div>
    </div>

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
import { useToast } from "vue-toastification";

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
          title: 'Counter-Strike 2',
          background: 'https://cdn.akamai.steamstatic.com/apps/csgo/images/csgo_react/social/cs2.jpg',
          description: 'Легендарный шутер от первого лица, который задал стандарты для киберспортивных дисциплин. В Counter-Strike 2 игроки сражаются в командах террористов и спецназа, выполняя задачи или предотвращая их. Обновлённая графика и улучшенный геймплей делают игру ещё более захватывающей.',
        },
        {
          id: 1086940,
          title: 'Baldur\'s Gate 3',
          background: 'https://pic.rutubelist.ru/video/2025-01-17/95/9f/959f18ca903d57d7d062befcfc4d642f.jpg',
          description: 'Погрузитесь в эпическое RPG-приключение, где ваши решения определяют судьбу мира. Baldur\'s Gate 3 предлагает глубокий сюжет, богатый выбор персонажей и тактические бои, основанные на правилах Dungeons & Dragons. Исследуйте огромный мир, полный загадок, опасностей и возможностей.',
        },
        {
          id: 1222140,
          title: 'Detroit: Become Human',
          background: 'https://cdn2.unrealengine.com/Diesel%2Fproductv2%2Fdetroit-become-human%2Fhome%2FDetroit_PC_Carousel-1920x1080-6e90610a5d314ce0c12860770cc38c1b23213000.jpg',
          description: 'Интерактивная драма, где вы управляете судьбой андроидов в недалёком будущем. Detroit: Become Human предлагает сложные моральные выборы, которые влияют на развитие сюжета и финал игры. Визуально потрясающая и эмоционально насыщенная история о человечности и свободе.',
        },
        {
          id: 252490,
          title: 'Rust',
          background: 'https://www.hardwareinside.de/wp-content/uploads/2021/07/article-thumb-1200x630@2x.jpg',
          description: "Выживание в жестоком мире, где каждый игрок — ваш потенциальный враг. В Rust вам предстоит добывать ресурсы, строить укрытия и защищаться от других игроков и окружающих опасностей. Постоянная борьба за выживание делает каждый игровой сеанс уникальным и напряжённым."
        },
        {
          id: 1850570,
          title: 'Death Stranding',
          background: 'https://deathstrandingpc.505games.com/wp-content/themes/deathstranding-cyberpunk/img/topimage.jpg',
          description: "Уникальная игра от Хидео Кодзимы, сочетающая элементы экшена, хоррора и философской притчи. В Death Stranding вы играете за курьера, который восстанавливает связи между изолированными поселениями в постапокалиптическом мире. Захватывающий сюжет и необычный геймплей делают игру незабываемым опытом."
        }
      ],
      ads: [
        { title: 'Counter-Strike 2', cover: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/730/header.jpg?t=1729703045' },
        { title: 'Baldur\'s Gate 3', cover: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1086940/capsule_616x353.jpg?t=1740386911' },
        { title: 'Detroit: Become Human', cover: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1222140/header.jpg?t=1667468479' },
        { title: 'Rust', cover: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/252490/capsule_616x353.jpg?t=1738927718' },
        { title: 'Death Stranding', cover: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1850570/capsule_616x353.jpg?t=1728989088' }
      ],
      autoSlideInterval: null
    };
  },
  setup(){
    const mainStore = useMainStore();
    const toast = useToast();
    return { mainStore, toast };
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
    goToSlide(index) {
      this.currentSlide = index;
      this.stopAutoSlide();
      this.startAutoSlide();
    },
    startAutoSlide() {
      this.autoSlideInterval = setInterval(() => {
        this.currentSlide = (this.currentSlide + 1) % this.slides.length;
      }, 5000);
    },
    stopAutoSlide() {
      clearInterval(this.autoSlideInterval);
    },
    addToBasket(id){
      const addGames = [...this.mainStore.topGames, ...this.mainStore.gameCatalog];
      const product = addGames.find(item => item.id === id);
      this.mainStore.addToBasket(product);
      this.toast.success("Игра добавлена в корзину");
    },
    addToFavourites(id){
      const addGames = [...this.mainStore.topGames, ...this.mainStore.gameCatalog];
      const product = addGames.find(item => item.id === id);
      const check = this.mainStore.addToFavourites(product);
      if(check.status === "added"){
        this.toast.success("Игра добавлена в избранное");
      }else{
        this.toast.success("Игра удалена из избранного");
      }
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
.slider-container {
  display: grid;
  grid-template-columns: 1fr 0.35fr;
  width: 1440px;
  height: 560px;
  margin-inline: auto;
  padding: 20px;
  color: white;
  gap: 10px;
  border-radius: 10px;
}

.slider {
  background-color: #111;
  position: relative;
  overflow: hidden;
  border-radius: 10px;
  cursor: pointer;
}

.slide {
  width: 100%;
  height: 100%;
  transition: opacity 1s ease-in-out;
}
.slide-info {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 20px;
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 240px;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0));
  color: white;
  padding: 20px;
  box-sizing: border-box;
}
.slide-info p{
  width: 660px;
  font-weight: 600;
}
.slide-info div{
  display: flex;
  gap: 20px;
}
.slide-info button{
  border: none;
  background-color: rgba(255, 255, 255, 0.2);
  padding-inline: 20px;
  padding-block: 16px;
  border-radius: 12px;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.2s;
}
.slide-info button:hover {
    background-color: white;
    color: black;
  }
.slide-background {
  width: 100%;
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
  width: 156px;
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

.fade-enter-active,
.fade-leave-active {
  transition: opacity 1s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
