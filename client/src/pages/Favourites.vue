<template>
  <div class="favorites-page">
    <Header />
    <main>
      <h1 class="favorites-title">Избранное</h1>
      <div class="favorites-container" v-if="favourites.length">
        <transition-group name="fade" tag="div" class="favorites-grid">
          <div v-for="game in paginatedFavourites" :key="game.id" class="favorite-item">
            <ProductCard :game="game" @favourites-updated="updateFavourites" />
          </div>
        </transition-group>
        <!-- Пагинация -->
        <div class="pagination" v-if="favourites.length > itemsPerPage">
          <button @click="currentPage--" :disabled="currentPage === 1">❮</button>
          <span>{{ currentPage }} из {{ totalPages }}</span>
          <button @click="currentPage++" :disabled="currentPage === totalPages">❯</button>
        </div>
      </div>
      <div v-else class="empty-favorites">
        <svg width="100" height="100" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" fill="rgba(255, 48, 48, 0.2)" />
        </svg>
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
      favourites: (localStorage.getItem('favourites')) ? JSON.parse(localStorage.getItem('favourites')) : [],
      currentPage: 1,
      itemsPerPage: 8,
    };
  },
  computed: {
    totalPages() {
      return Math.ceil(this.favourites.length / this.itemsPerPage);
    },
    paginatedFavourites() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.favourites.slice(start, end);
    },
  },
  methods: {
    updateFavourites() {
      this.favourites = JSON.parse(localStorage.getItem('favourites')) || [];
      this.currentPage = 1;
    },
  },
};
</script>

<style scoped>
.favorites-page {
  min-height: 100vh;
  color: #fff;
}

main {
  min-height: calc(100vh - 600px);
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
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); /* Чуть увеличили размер карточек */
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

.empty-favorites svg {
  margin-bottom: 20px;
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

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  margin-top: 30px;
}

.pagination button {
  background: rgba(255, 255, 255, 0.1);
  border: none;
  padding: 10px 15px;
  color: #fff;
  font-size: 18px;
  cursor: pointer;
  border-radius: 8px;
  transition: background 0.3s ease;
}

.pagination button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.pagination button:hover:not(:disabled) {
  background: #77BE1D;
}

/* Анимации */
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