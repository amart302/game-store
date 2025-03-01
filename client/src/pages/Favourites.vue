<template>
  <div class="favorites-page">
    <Header />
    <main>
      <h1 class="favorites-title">Избранное</h1>
      <div class="favorites-container" v-if="favourites.length">
        <transition-group name="fade" tag="div" class="favorites-grid">
          <div v-for="game in favourites" :key="game.id" class="favorite-item">
            <ProductCard :game="game" @favourites-updated="updateFavourites" />
          </div>
        </transition-group>
      </div>
      <div v-else class="empty-favorites">
        <p>В избранном пока ничего нет</p>
        <router-link to="/" class="back-to-main">Вернуться на главную</router-link>
      </div>
    </main>
    <Footer />
  </div>
</template>

<script>
import Footer from '@/components/Footer.vue';
import Header from '@/components/Header.vue';
import ProductCard from '@/components/ProductCard.vue';


export default {
  name: 'Favorites',
  components: { Header, Footer, ProductCard },
  data() {
    return {
      favourites: JSON.parse(localStorage.getItem('favourites')) || [],
    };
  },
  methods: {
    updateFavourites() {
      this.favourites = JSON.parse(localStorage.getItem('favourites')) || [];
    },
  },
};
</script>

<style scoped>
.favorites-page {
  min-height: 100vh;
  background: linear-gradient(135deg, #0A071A 0%, #1C1435 100%);
  color: #fff;
}

main {
    min-height: calc(100vh - 766px);
  max-width: 1440px;
  margin: 0 auto;
  padding: 40px 20px;
}

.favorites-title {
  font-size: 36px;
  font-weight: 800;
  background: linear-gradient(90deg, #77BE1D, #97E238);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  text-shadow: 0 2px 4px rgba(119, 190, 29, 0.3);
  margin-bottom: 30px;
}

.favorites-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 30px;
}

.favorite-item {
  position: relative;
  transition: transform 0.3s ease;
}

.favorite-item:hover {
  transform: scale(1.05);
}

.empty-favorites {
  text-align: center;
  padding: 60px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 20px;
  backdrop-filter: blur(15px);
}

.empty-favorites p {
  font-size: 24px;
  color: rgba(255, 255, 255, 0.7);
  margin-bottom: 20px;
}

.back-to-main {
  font-size: 18px;
  color: #77BE1D;
  text-decoration: none;
  padding: 10px 20px;
  border: 2px solid #77BE1D;
  border-radius: 25px;
  transition: all 0.3s ease;
}

.back-to-main:hover {
  background: #77BE1D;
  color: white;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease, transform 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(20px);
}
</style>