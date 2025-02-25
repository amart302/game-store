<template>
  <div id="main">
    <Header />
    <Slider />
    <main>
      <div class="mainBlock1">
        <h1>Top <img src="../assets/images/lightning.svg" class="lightning-icon" /> 4</h1>
        <div class="smallProductCardsConteiner1">
          <ProductCard v-for="game in topGames" :key="game.id" :game="game" :isTopOnly="true" />
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
    </main>
    <Footer />
  </div>
</template>

<script>
import axios from 'axios';
import Slider from '@/components/Slider.vue';
import ProductCard from '@/components/ProductCard.vue';
import OffersCards from '@/components/OffersCards.vue';
import Footer from '@/components/Footer.vue';
import Header from '@/components/Header.vue';

export default {
  name: 'Main',
  components: {
    Header,
    Slider,
    ProductCard,
    OffersCards,
    Footer,
  },
  created(){
    this.getUserData();
  },
  data() {
    return {
      hitGames: [],
      newGames: [],
      topGames: [],
      gameCatalog: [],
    };
  },
  computed: {
    catalogGames() {
      return this.gameCatalog.slice(0, 12);
    },
  },
  mounted() {
    this.fetchGames();
  },
  methods: {
    async fetchGames() {
      try {
        const response = await axios.get('https://67bcd30ded4861e07b3c0613.mockapi.io/games');
        const data = response.data[0];
        this.hitGames = data.hit_games;
        this.newGames = data.new_games;
        this.topGames = data.top_games.slice(0, 4);
        this.gameCatalog = data.game_catalog;
      } catch (error) {
        console.error('Ошибка загрузки игр:', error);
      }
    },
    getUserData(){
      const userSession = localStorage.getItem("userSession");
      const users = JSON.parse(localStorage.getItem("users"));
      users.map(item => {
        if(item.email == userSession){
          localStorage.setItem("userData", JSON.stringify(item));
        }
      });
    }
  },
};
</script>

<style scoped>
#main {
  background: linear-gradient(135deg, #0A071A 0%, #1C1435 100%);
  min-height: 100vh;
  color: #fff;
}

main {
  max-width: 1440px;
  margin: 0 auto;
  padding: 40px 20px;
}

.mainBlock1, .mainBlock2, .offersCardsConteiner {
  margin-bottom: 60px;
}

h1, h2 {
  font-family: 'Manrope', sans-serif;
  font-weight: 800;
  font-size: 36px;
  margin-bottom: 30px;
  background: linear-gradient(90deg, #77BE1D, #97E238);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  text-shadow: 0 2px 4px rgba(119, 190, 29, 0.3);
}

.lightning-icon {
  width: 24px;
  vertical-align: middle;
  filter: drop-shadow(0 0 4px #77BE1D);
}

.smallProductCardsConteiner1, .smallProductCardsConteiner2 {
  display: grid;
  grid-template-columns: repeat(4, minmax(300px, 1fr));
  gap: 30px;
}

</style>