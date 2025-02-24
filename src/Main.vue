<template>
  <div id="main">
    <Header />
    <Slider />
    <main>
      <div class="mainBlock1">
        <h1>Top <img src="../assets/images/lightning.svg" style="width: 1.2%" /> 4</h1>
        <div class="smallProductCardsConteiner1">
          <ProductCard v-for="game in topGames" :key="game.id" :game="game" />
        </div>
      </div>
      <OffersCards />
      <div class="mainBlock2">
        <div class="productCatalog">
          <h2 class="сatalog">Каталог игр</h2>
        </div>
        <div class="smallProductCardsConteiner2">
          <ProductCard v-for="game in catalogGames" :key="game.id" :game="game" />
        </div>
      </div>
      <div class="mainBlock3">
        <h2>Акции и скидки <span style="color: #77BE1D;">%</span></h2>
        <div class="bigProductCardsConteiner">
          <ProductCard v-for="game in discountGames" :key="game.id" :game="game" />
        </div>
      </div>
      <div class="mainBlock4">
        <img src="../assets/images/mainBlock4Img.png" alt="Blog banner" />
        <h2>Свежее в блоге</h2>
        <BlogCards />
        <button class="publicationsBtn">Все публикации</button>
      </div>
      <Feedback />
    </main>
    <Footer />
  </div>
</template>

<script>
import axios from 'axios';
import Header from './components/Header.vue';
import Slider from './components/Slider.vue';
import ProductCard from './components/ProductCard.vue';
import OffersCards from './components/OffersCards.vue';
import BlogCards from './components/BlogCards.vue';
import Feedback from './components/Feedback.vue';
import Footer from './components/Footer.vue';

export default {
  name: 'Main',
  components: {
    Header,
    Slider,
    ProductCard,
    OffersCards,
    BlogCards,
    Feedback,
    Footer,
  },
  data() {
    return {
      games: [],
    };
  },
  computed: {
    topGames() {
      return this.games.filter(game => game.top).slice(0, 4);
    },
    catalogGames() {
      return this.games.filter(game => !game.top && !game.hit).slice(0, 12);
    },
    discountGames() {
      return this.games.filter(game => game.hit).slice(0, 4);
    },
  },
  mounted() {
    this.fetchGames();
  },
  methods: {
    async fetchGames() {
      try {
        const response = await axios.get('https://67b2f3b8bc0165def8cf482b.mockapi.io/game/games');
        this.games = response.data;
      } catch (error) {
        console.error('Ошибка загрузки игр:', error);
      }
    },
  },
};
</script>
<style>
main {
  max-width: 1400px;
  margin-inline: auto;
}

.mainBlock1,
.mainBlock2,
.mainBlock3,
.mainBlock4 {
  margin-top: 60px;
}

.smallProductCardsConteiner1,
.smallProductCardsConteiner2 {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 36px;
}

.bigProductCardsConteiner {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 36px;
}

.productCatalog {
  display: flex;
}

.mainBlock4 img {
  width: 100%;
}

.mainBlock4 h2 {
  margin-top: 70px;
  font-size: 26px;
}

.publicationsBtn {
  border: solid 1px gray;
  background: none;
  width: 100%;
  padding: 20px;
  border-radius: 12px;
  margin-top: 50px;
  color: #366edc;
  font-size: 16px;
  transition: all 0.2s;
  cursor: pointer;
}

.publicationsBtn:hover {
  background-color: #366edc;
  color: white;
}
</style>
@media (max-width: 1500px) {
  .arrowLeft {
    left: 2%;
  }
  .arrowRight {
    right: 2%;
  }
  .addCardBtn {
    top: 56%;
  }
  .productImg {
    height: 67%;
  }
}