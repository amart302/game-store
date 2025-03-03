<template>
  <div id="main">
    <Header />

    <!-- Слайдер -->
    <Slider />

    <!-- Основной контент -->
    <main>
      <!-- Блок "Top 4" -->
      <div class="mainBlock1">
        <h1>
          Top <img src="../assets/images/lightning.svg" class="lightning-icon" alt="Lightning" /> 4
        </h1>
        <div class="smallProductCardsConteiner1">
          <ProductCard
            v-for="game in topGames"
            :key="game.id"
            :game="game"
            :isTopOnly="true"
            @update-basket="updateBasketCount"
            @favourites-updated="loadFavourites"
          />
        </div>
      </div>

      <!-- Блок с предложениями -->
      <OffersCards />

      <!-- Блок каталога игр -->
      <div class="mainBlock2">
        <div class="productCatalog">
          <h2 class="catalog">Каталог игр</h2>
        </div>
        <div class="smallProductCardsConteiner2">
          <ProductCard
            v-for="game in catalogGames"
            :key="game.id"
            :game="game"
            @update-basket="updateBasketCount"
            @favourites-updated="loadFavourites"
          />
        </div>
      </div>

      <!-- Блок акций и скидок -->
      <div class="mainBlock3">
        <h2>Акции и скидки <span>%</span></h2>
        <div class="bigProductCardsConteiner">
          <ProductCard
            v-for="game in discountedGames"
            :key="game.id"
            :game="game"
            @update-basket="updateBasketCount"
            @favourites-updated="loadFavourites"
          />
        </div>
      </div>

      <!-- Блок отзывов -->
      <div class="mainBlock5" id="FeedbackForm">
        <h2>Отзывы</h2>
        <FeedbackForm @add-feedback="addFeedback" />
        <div class="feedbackCardsConteiner">
          <div class="feedbackCard" v-for="(feedback, index) in feedbacks" :key="index">
            <div class="estimationBlock">
              <div class="starBlock" v-for="n in feedback.rating" :key="n">
                <img src="../assets/images/star.svg" alt="Star" />
              </div>
            </div>
            <span class="datePublication">{{ feedback.date }}</span>
            <p class="feedback">{{ feedback.text }}</p>
            <p class="feedbackUserName">{{ feedback.userName }}</p>
          </div>
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
import FeedbackForm from '@/components/FeedbackForm.vue';

export default {
  name: 'Main',
  components: {
    Header,
    Slider,
    ProductCard,
    OffersCards,
    Footer,
    FeedbackForm,
  },

  data() {
    return {
      hitGames: [], // Игры-хиты (не используются, но оставлены для совместимости)
      newGames: [], // Новые игры (не используются, но оставлены для совместимости)
      topGames: [], // Топ-4 игры
      gameCatalog: [], // Полный каталог игр
      feedbacks: [
        {
          rating: 5,
          date: '20.04.2024',
          text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur repellat illum necessitatibus, deleniti quibusdam quo!',
          userName: 'Amart',
        },
      ],
    };
  },

  computed: {
    // Ограниченный список игр для каталога
    catalogGames() {
      return this.gameCatalog.slice(0, 20);
    },

    // Игры со скидками
    discountedGames() {
      return this.gameCatalog.filter(game => game.discounted).slice(0, 9);
    },
  },

  created() {
    this.checkUserSession();
  },

  mounted() {
    this.fetchGames();
  },

  methods: {
    // Проверка сессии пользователя
    checkUserSession() {
      const userSession = localStorage.getItem('userSession');
      const users = JSON.parse(localStorage.getItem('users')) || [];
      const user = users.find(item => item.email === userSession);

      if (user) {
        localStorage.setItem('userData', JSON.stringify(user));
      } else {
        this.$router.push('/register');
      }
    },

    // Загрузка игр с API
    async fetchGames() {
      try {
        const response = await axios.get('https://67bcd30ded4861e07b3c0613.mockapi.io/games');
        const data = response.data[0];
        this.topGames = data.top_games || [];
        this.gameCatalog = (data.game_catalog || []).map(game => ({ ...game }));
      } catch (error) {
        console.error('Ошибка загрузки игр:', error);
      }
    },

    // Обновление количества товаров в корзине
    updateBasketCount() {
      // Этот метод теперь не используется, так как Header сам обновляет корзину
    },

    // Добавление отзыва
    addFeedback(feedback) {
      this.feedbacks.push({
        rating: feedback.rating,
        date: new Date().toLocaleDateString('ru-RU'),
        text: feedback.text,
        userName: feedback.userName || 'Аноним',
      });
    },

    // Загрузка избранного (для синхронизации лайков)
    loadFavourites() {
      // Этот метод теперь не нужен здесь, так как ProductCard сам обрабатывает лайки
    },
  },
};
</script>

<style scoped>
/* Основной контейнер */
#main {
  min-height: 100vh;
  color: #fff;
}

/* Основной контент */
main {
  max-width: 1440px;
  margin: 0 auto;
  padding: 40px 20px;
}

/* Отступы для блоков */
.mainBlock1,
.mainBlock2,
.mainBlock3,
.mainBlock5,
.offersCardsConteiner {
  margin-bottom: 60px;
}

/* Заголовки */
h1,
h2 {
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

/* Иконка молнии */
.lightning-icon {
  width: 24px;
  vertical-align: middle;
  filter: drop-shadow(0 0 4px #77BE1D);
}

/* Контейнеры для карточек */
.smallProductCardsConteiner1,
.smallProductCardsConteiner2 {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 30px;
}

.bigProductCardsConteiner {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
}

/* Стили для акций */
.mainBlock3 h2 span {
  color: #77BE1D;
}

/* Стили для отзывов */
.feedbackCardsConteiner {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.feedbackCard {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  padding: 20px;
  backdrop-filter: blur(10px);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
}

.estimationBlock {
  display: flex;
  gap: 5px;
  margin-bottom: 10px;
}

.starBlock img {
  width: 20px;
  height: 20px;
}

.datePublication {
  font-size: 14px;
  color: rgba(255, 255, 255, 0.7);
  margin-bottom: 10px;
  display: block;
}

.feedback {
  font-size: 16px;
  color: rgba(255, 255, 255, 0.9);
  line-height: 1.5;
  margin-bottom: 10px;
}

.feedbackUserName {
  font-size: 16px;
  font-weight: 600;
  color: #97E238;
}

/* Медиазапросы для адаптации */
@media (max-width: 1024px) {
  main {
    padding: 20px 15px;
  }

  h1, h2 {
    font-size: 28px;
  }

  .smallProductCardsConteiner1,
  .smallProductCardsConteiner2,
  .bigProductCardsConteiner {
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 20px;
  }
}

@media (max-width: 768px) {
  h1, h2 {
    font-size: 24px;
  }

  .smallProductCardsConteiner1,
  .smallProductCardsConteiner2,
  .bigProductCardsConteiner {
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 15px;
  }

  .feedbackCard {
    padding: 15px;
  }

  .starBlock img {
    width: 16px;
    height: 16px;
  }

  .datePublication,
  .feedback,
  .feedbackUserName {
    font-size: 14px;
  }
}
</style>