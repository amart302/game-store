<template>
    <Header />

    <main v-if="currentProduct.name">
      <div class="product-information">
        <div class="product-container">
          <div class="product-img">
            <img :src="currentProduct.header_image" ref="productImage" alt="Product Image" />
          </div>

          <div class="product-other">
            <div class="product-title">{{ currentProduct.name }}</div>
            <div class="product-v-nalichii">
              <div class="product-v-nalichii-tochka"></div>
              В наличии
            </div>

            <div class="product-prices">
              <div class="product-now-price">{{ (convertedFinalPrice > 0) ? `${convertedFinalPrice} ₽` : "Бесплатно" }}</div>
              <div v-if="currentProduct.discounted" class="product-skidka">-{{ currentProduct.discount_percent }}%</div>
              <div v-if="currentProduct.discounted" class="product-old-price">{{ convertedOriginalPrice }} ₽</div>
            </div>

            <div class="product-deystvia">
              <div class="product-buy" @click="() => addToCart()">Добавить в корзину</div>

              <div class="product-like">
                <button @click="addToFavourites()" class="favourite-btn" :class="{ 'active': isFavourite }">
                  <svg v-if="isFavourite" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" fill="#FF3030" />
                  </svg>
                  <svg v-else width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" fill="none" stroke="#FFFFFF" stroke-width="2" />
                  </svg>
                </button>
              </div>
            </div>

            <div class="product-info">
              <table>
                <thead>
                  <tr class="product-tr1">
                    <td>Платформы</td>
                    <td>Регион активации</td>
                    <td>Тип товара</td>
                  </tr>
                </thead>
                <tbody>
                  <tr class="product-tr2">
                    <td>
                      <span v-if="currentProduct.platforms.windows">Windows</span>
                      <span v-if="currentProduct.platforms.mac">, Mac</span>
                      <span v-if="currentProduct.platforms.linux">, Linux</span>
                    </td>
                    <td>Страны СНГ</td>
                    <td>Ключ</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div class="product-deystvia-2">
              <div class="product-moment-dost-but">Моментальная доставка</div>
              <div class="product-garantia">
                <div class="product-garantia-galochka">
                  <svg width="10" height="8" viewBox="0 0 10 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M3.5837 4.96466L8.49779 0L10 1.51767L3.5837 8L0 4.37942L1.50221 2.86175L3.5837 4.96466Z" fill="#77BE1D" />
                  </svg>
                </div>
                Гарантия качества
              </div>
            </div>
          </div>
        </div>

        <div class="product-photo-videos" ref="photoVideos">
          <div class="product-photo-video" v-for="(img, index) in galleryImages" :key="index" @click="currentSlide(index + 1)">
            <div v-if="index === 4 && currentProduct.movies" class="product-photo-video-play">
              <div class="product-photo-video-playy">
                <svg width="25" height="29" viewBox="0 0 25 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M23.2435 16.3123L23.2402 16.3143L3.90243 28.0215C2.63108 28.7903 0.957282 27.8734 0.957282 26.2636V2.84903C0.957282 1.24173 2.62841 0.322778 3.90216 1.09415L3.90222 1.09419L23.2402 12.8015L23.2435 12.8034C23.535 12.977 23.78 13.2297 23.9516 13.538C24.1232 13.8464 24.2144 14.1983 24.2144 14.5579C24.2144 14.9174 24.1232 15.2694 23.9516 15.5778C23.78 15.8861 23.535 16.1387 23.2435 16.3123Z" fill="white" stroke="#77BE1D" stroke-width="1.05714" />
                </svg>
              </div>
            </div>
            <img v-if="index < 4" :src="img" alt="Gallery Image" @click="plusSlides(index)" />
            <img v-else :src="img.poster" alt="Gallery Image" @click="plusSlides(index)" />
          </div>
        </div>
      </div>

      <div class="product-ostas">
        <div class="product-ostas-title">
          <div class="product-osta" @click="activeTab = 'description'">
            <div :class="['product-osta-center', { active: activeTab === 'description' }]">
              Описание товара
            </div>
          </div>
          <div class="product-osta" @click="activeTab = 'requirements'">
            <div :class="['product-osta-center', { active: activeTab === 'requirements' }]">
              Системные требования
            </div>
          </div>
          <div class="product-osta" @click="activeTab = 'activation'">
            <div :class="['product-osta-center', { active: activeTab === 'activation' }]">
              Активация
            </div>
          </div>
        </div>
        <div class="product-ostas-container">
          <div v-if="activeTab === 'description'" class="product-opisanie">
            <div class="product-opisanie-title">Полное погружение в {{ currentProduct.name }}</div>
            <div class="product-opisanie-txt">{{ currentProduct.short_description }}</div>
          </div>
          <div v-if="activeTab === 'requirements'" class="product-sisTreb">
            <div class="product-sisTreb-title">Минимальные системные требования</div>
            <table class="product-sisTreb-table">
              <tbody>
                <tr>
                  <td>ОС:</td>
                  <td>{{ currentProduct.pc_requirements.minimum.OS || 'Не указано' }}</td>
                  <td v-html="getRequirementIcon(false)"></td>
                </tr>
                <tr>
                  <td>Процессор:</td>
                  <td>{{ currentProduct.pc_requirements.minimum.Processor || 'Не указано' }}</td>
                  <td v-html="getRequirementIcon(false)"></td>
                </tr>
                <tr>
                  <td>Оперативная память:</td>
                  <td>{{ currentProduct.pc_requirements.minimum.Memory || 'Не указано' }}</td>
                  <td v-html="getRequirementIcon(false)"></td>
                </tr>
                <tr>
                  <td>Видеокарта:</td>
                  <td>{{ currentProduct.pc_requirements.minimum.Graphics || 'Не указано' }}</td>
                  <td v-html="getRequirementIcon(false)"></td>
                </tr>
                <tr>
                  <td>DirectX:</td>
                  <td>{{ currentProduct.pc_requirements.minimum.DirectX || 'Не указано' }}</td>
                  <td v-html="getRequirementIcon(false)"></td>
                </tr>
                <tr>
                  <td>Место на диске:</td>
                  <td>{{ currentProduct.pc_requirements.minimum.Storage || 'Не указано' }}</td>
                  <td v-html="getRequirementIcon(false)"></td>
                </tr>
              </tbody>
            </table>

            <div class="product-sisTreb-title">Рекомендуемые системные требования</div>
            <table class="product-sisTreb-table">
              <tbody>
                <tr>
                  <td>ОС:</td>
                  <td>{{ currentProduct.pc_requirements.recommended.OS || 'Не указано' }}</td>
                  <td v-html="getRequirementIcon(true)"></td>
                </tr>
                <tr>
                  <td>Процессор:</td>
                  <td>{{ currentProduct.pc_requirements.recommended.Processor || 'Не указано' }}</td>
                  <td v-html="getRequirementIcon(true)"></td>
                </tr>
                <tr>
                  <td>Оперативная память:</td>
                  <td>{{ currentProduct.pc_requirements.recommended.Memory || 'Не указано' }}</td>
                  <td v-html="getRequirementIcon(true)"></td>
                </tr>
                <tr>
                  <td>Видеокарта:</td>
                  <td>{{ currentProduct.pc_requirements.recommended.Graphics || 'Не указано' }}</td>
                  <td v-html="getRequirementIcon(true)"></td>
                </tr>
                <tr>
                  <td>DirectX:</td>
                  <td>{{ currentProduct.pc_requirements.recommended.DirectX || 'Не указано' }}</td>
                  <td v-html="getRequirementIcon(true)"></td>
                </tr>
                <tr>
                  <td>Место на диске:</td>
                  <td>{{ currentProduct.pc_requirements.recommended.Storage || 'Не указано' }}</td>
                  <td v-html="getRequirementIcon(true)"></td>
                </tr>
              </tbody>
            </table>
          </div>            
          <div v-if="activeTab === 'activation'" class="product-activate">
              <div class="product-activate-title">Введите цифровой ключ продукта</div>
              <div class="product-activate-input">
                <label>
                  Ключ продукта<br />
                  <input type="text" v-model="activationKey" placeholder="XXXX-XXXX-XXXX" />
                </label>
              </div>
          </div>
        </div>
      </div>

      <div class="vam-budet-interesno">
        <div class="vam-budet-interesno-title">Вам будет интересно</div>
        <div class="vam-budet-interesno-cont">
          <ProductCard v-for="ad in ads.slice(0, 4)" :key="ad.id" :game="ad" @click="navigateToProduct(ad)" />
        </div>
      </div>
    </main>

    <div class="modal" :style="{ display: modalOpen ? 'flex' : 'none' }">
      <div class="modal-cont">
        <span class="close cursor" @click="closeModal">×</span>
        <div class="modal-content">
          <div class="mySlides" v-for="(slide, index) in slides" :key="index" :style="{ display: slideIndex === index + 1 ? 'flex' : 'none' }">
            <img v-if="index < 4" :src="slide" class="product-gallery-img" />
            <img v-if="index == 4 && !slide.video" :src="slide.poster" class="product-gallery-img" />
            <video v-if="slide.video" controls preload="metadata" ref="videoPlayer" class="video-player">
              <source :src="slide.video" />
              Ваш браузер не поддерживает видео.
            </video>
          </div>
          <a class="prev" @click="plusSlides(-1)">❮</a>
          <a class="next" @click="plusSlides(1)">❯</a>
        </div>
      </div>
    </div>

    <Footer v-if="currentProduct.name" />
</template>

<script>
import axios from 'axios';
import Footer from '@/components/Footer.vue';
import Header from '@/components/Header.vue';
import ProductCard from '@/components/ProductCard.vue';
import { useMainStore } from '@/store/store';
import { useToast } from "vue-toastification";

export default {
  name: 'ProductPage',
  components: { Header, Footer, ProductCard },

  data() {
    return {
      currentProduct: {},
      products: [],
      ads: [],
      activeTab: 'description',
      activationKey: '',
      modalOpen: false,
      slideIndex: 1,
      basketCount: 0,
      showHeartAnimation: false,
      productData: null,
    };
  },
  setup(){
    const mainStore = useMainStore();
    const toast = useToast();
    return { mainStore, toast };
  },
  computed: {
    galleryImages() {
  if (!this.currentProduct.name) return [];
  return [
    this.currentProduct.screenshots[0].path_thumbnail,
    this.currentProduct.screenshots[1].path_thumbnail,
    this.currentProduct.screenshots[2].path_thumbnail,
    this.currentProduct.screenshots[3].path_thumbnail,
    {
      poster: this.currentProduct.screenshots[4].path_thumbnail,
      video: this.currentProduct.movies ? this.currentProduct.movies[0].mp4.max : null,
    },
  ];
},

slides() {
  return this.galleryImages.length
    ? this.galleryImages.map((item, index) => {
        if (index !== this.galleryImages.length - 1) {
          return item.replace("600x338", "1920x1080");
        }
        return item;
      })
    : [];
},
    isFavourite() {
      return this.mainStore.favourites.some(fav => String(fav.id) === String(this.productData));
    },

    convertedFinalPrice() {
      let priceInRub;
      if(this.currentProduct.final_price){
        priceInRub = parseFloat(this.currentProduct.final_price);
      }else{
        priceInRub = 0;
      }
      
      return priceInRub.toFixed(2);
    },
    convertedOriginalPrice() {
      if (!this.currentProduct.discounted) return '';
      const priceInRub = parseFloat(this.currentProduct.original_price);
      return priceInRub.toFixed(2);
    },
  },
  created(){
    this.fetchProducts();
  },
  mounted() {
    this.productData = JSON.parse(sessionStorage.getItem('currentProductInGames'));
    this.addEventListeners();
  },

  methods: {
    async fetchProducts() {
      try {
        const productData = JSON.parse(sessionStorage.getItem('currentProductInGames'));
        const response = await axios.get(`http://localhost:3000/api/steam/${productData.id}`);
        const gameData = response.data[productData.id];
        const data = this.mainStore.gameCatalog;
        this.ads = data.map(game => ({ ...game }));
        if (gameData.success) {
          gameData.data.final_price = productData.price;
          gameData.data.windows_available = productData.windows_available;
          gameData.data.mac_available = productData.mac_available;
          gameData.data.linux_available = productData.linux_available;
          gameData.data.pc_requirements = {
            minimum: this.parseRequirements(gameData.data.pc_requirements?.minimum),
            recommended: this.parseRequirements(gameData.data.pc_requirements?.recommended)
          };
          gameData.data.mac_requirements = {
            minimum: this.parseRequirements(gameData.data.mac_requirements?.minimum),
            recommended: this.parseRequirements(gameData.data.mac_requirements?.recommended)
          };
          gameData.data.linux_requirements = {
            minimum: this.parseRequirements(gameData.data.linux_requirements?.minimum),
            recommended: this.parseRequirements(gameData.data.linux_requirements?.recommended)
          };
          this.currentProduct = gameData.data;
          this.currentProduct.id = this.currentProduct.steam_appid || productData;
        } else {
          console.error('Ошибка при загрузке данных продукта');
        }
      } catch (error) {
        console.error('Ошибка при загрузке данных продукта:', error);
      }
    },
    parseRequirements(requirementsString) {
      const requirements = {};
      if (!requirementsString) return requirements;

      const regex = /<strong>([^:]+):<\/strong>\s*([^<]+)/g;
      let match;

      while ((match = regex.exec(requirementsString)) !== null) {
        const key = match[1].trim();
        const value = match[2].trim();
        requirements[key] = value;
      }

      return requirements;
    },
    getRequirementIcon(isRecommended) {
      return isRecommended
        ? `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
           <path d="M6 12L4.59 10.59L8.17 7L4.59 3.41L6 2L10 6L8.59 7.41L12 4L14 6L10 10L12 12H6Z" fill="#77BE1D" />
         </svg>`
        : `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
           <path d="M6 12L4.59 10.59L8.17 7L4.59 3.41L6 2L10 6L8.59 7.41L12 4L14 6L10 10L12 12H6Z" fill="#CCCCCC" />
         </svg>`;
    },
    addToFavourites() {
      const product = {
          id: this.productData,
          name: this.currentProduct.name,
          large_capsule_image: this.currentProduct.header_image,
          final_price: this.currentProduct.final_price,
          windows_available: this.currentProduct.windows_available,
          mac_available: this.currentProduct.mac_available,
          linux_available: this.currentProduct.linux_available
      };
      const check = this.mainStore.addToFavourites(product);
      
      if(check.status === "added"){
        this.toast.success("Игра добавлена в избранное");
      }else{
        this.toast.success("Игра удалена из избранного");
      }
    },
    addToCart() {      
      const product = {
        id: this.productData,
        name: this.currentProduct.name,
        final_price: `${this.currentProduct.final_price} ₽`,
        large_capsule_image: this.currentProduct.header_image,
        windows_available: this.currentProduct.windows_available,
        linux_available: this.currentProduct.linux_available,
        mac_available: this.currentProduct.mac_available,
        count: 1,
      };

      this.mainStore.addToBasket(product);
      this.toast.success("Игра добавлена в корзину");
    },
    closeModal() {
      this.modalOpen = false;
      document.body.style.overflow = 'auto';
      this.$refs.videoPlayer[0].pause();
    },
    plusSlides(n) {
      this.modalOpen = true;
      this.showSlides(this.slideIndex + n);
    },
    currentSlide(n) {
      this.modalOpen = true;
      this.showSlides(n);
    },
    showSlides(n) {
      if (n > this.slides.length) this.slideIndex = 1;
      else if (n < 1) this.slideIndex = this.slides.length;
      else this.slideIndex = n;
      if(this.slideIndex === 5) this.$refs.videoPlayer[0].play();
      else this.$refs.videoPlayer[0].pause();
    },
    addEventListeners() {
      const scrollContainer = this.$refs.photoVideos;
      if (scrollContainer) {
        scrollContainer.addEventListener('wheel', (e) => {
          e.preventDefault();
          scrollContainer.scrollLeft += e.deltaY < 0 ? -50 : 50;
        }, { passive: false });
      }

      document.body.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') this.closeModal();
        else if (e.key === 'ArrowLeft') this.plusSlides(-1);
        else if (e.key === 'ArrowRight') this.plusSlides(1);
      });
    },
    navigateToProduct(game) {
      localStorage.setItem('currentProductInGames', game.name);
      this.$router.push('/product');
      this.fetchProducts();
    },
  },
};
</script>

<style scoped>
.temnee-bg {
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(to bottom, rgba(10, 7, 26, 0.7), rgba(28, 20, 53, 0.9));
  z-index: 1;
}

.product-container {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  align-items: center;
  gap: 40px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 20px;
  padding: 30px;
  backdrop-filter: blur(15px);
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.3);
  margin-bottom: 40px;
}

.product-img img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(119, 190, 29, 0.2);
}

.product-other {
  flex: 1;
}

.product-title {
  font-size: 40px;
  font-weight: 800;
  background: linear-gradient(90deg, #77BE1D, #97E238);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  margin-bottom: 10px;
}

.product-v-nalichii {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  color: #97E238;
  margin-bottom: 20px;
}

.product-v-nalichii-tochka {
  width: 10px;
  height: 10px;
  background: #77BE1D;
  border-radius: 50%;
  box-shadow: 0 0 5px #77BE1D;
}

.product-prices {
  display: flex;
  align-items: center;
  gap: 15px;
  margin-bottom: 20px;
}

.product-now-price {
  font-size: 36px;
  font-weight: 700;
  color: #97E238;
}

.product-skidka {
  font-size: 24px;
  font-weight: 600;
  color: #77BE1D;
  background: rgba(119, 190, 29, 0.1);
  padding: 5px 10px;
  border-radius: 15px;
}

.product-old-price {
  font-size: 20px;
  color: rgba(255, 255, 255, 0.5);
  text-decoration: line-through;
}

.product-deystvia {
  display: flex;
  gap: 15px;
  align-items: center;
}

.product-buy {
  padding: 15px 30px;
  background: linear-gradient(90deg, #77BE1D, #97E238);
  border: none;
  border-radius: 25px;
  color: white;
  font-weight: 600;
  font-size: 16px;
  cursor: pointer;
  transition: transform 0.3s ease, background 0.3s ease;
}

.product-buy:hover {
  transform: translateY(-3px);
  background: linear-gradient(90deg, #649E18, #7BC22F);
}

.product-buy.purchased {
  background: rgba(255, 255, 255, 0.2);
  cursor: not-allowed;
  transform: none;
}

.product-like {
  position: relative;
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

.heart-animation {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 10;
}

.heart-enter-active:not(.remove) {
  animation: heart-pulse 0.8s ease forwards;
}

.heart-enter-active.remove {
  animation: heart-break 0.8s ease forwards;
}

.particles {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.particle {
  position: absolute;
  width: 6px;
  height: 6px;
  background: #FF3030;
  border-radius: 50%;
  animation: particle-burst 0.8s ease forwards;
}

.particle:nth-child(1) { animation-delay: 0s; transform: translate(-10px, -10px); }
.particle:nth-child(2) { animation-delay: 0.1s; transform: translate(10px, -10px); }
.particle:nth-child(3) { animation-delay: 0.2s; transform: translate(-10px, 10px); }
.particle:nth-child(4) { animation-delay: 0.3s; transform: translate(10px, 10px); }
.particle:nth-child(5) { animation-delay: 0.4s; transform: translate(0, -15px); }
.particle:nth-child(6) { animation-delay: 0.5s; transform: translate(0, 15px); }

@keyframes heart-pulse {
  0% { transform: translate(-50%, -50%) scale(0); opacity: 0; }
  50% { transform: translate(-50%, -50%) scale(1.3); opacity: 1; }
  70% { transform: translate(-50%, -50%) scale(0.9); opacity: 1; }
  100% { transform: translate(-50%, -50%) scale(1); opacity: 0; }
}

@keyframes heart-break {
  0% { transform: translate(-50%, -50%) scale(1); opacity: 1; }
  50% { transform: translate(-50%, -50%) scale(1.2); opacity: 0.8; }
  100% { transform: translate(-50%, -50%) scale(0); opacity: 0; }
}

@keyframes particle-burst {
  0% { transform: scale(0); opacity: 1; }
  100% { transform: translate(20px, -20px) scale(0.5); opacity: 0; }
}

.product-info {
  margin: 20px 0;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  padding: 15px;
  backdrop-filter: blur(10px);
}

.product-info table {
  width: 100%;
  border-collapse: collapse;
}

.product-tr1 td {
  font-size: 14px;
  color: rgba(255, 255, 255, 0.7);
  padding: 5px 15px;
}

.product-tr2 td {
  font-size: 16px;
  font-weight: 600;
  padding: 5px 15px;
}

.product-deystvia-2 {
  display: flex;
  gap: 20px;
  align-items: center;
}

.product-moment-dost-but {
  padding: 10px 20px;
  background: rgba(151, 226, 56, 0.1);
  border: 2px solid #77BE1D;
  border-radius: 20px;
  color: #97E238;
  font-weight: 600;
  transition: all 0.3s ease;
}

.product-moment-dost-but:hover {
  background: #77BE1D;
  color: white;
}

.product-garantia {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 16px;
  color: #fff;
}

.product-garantia-galochka {
  width: 20px;
  height: 20px;
  background: rgba(119, 190, 29, 0.2);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.product-photo-videos {
  display: flex;
  gap: 20px;
  overflow-x: auto;
  padding: 20px 0;
}

.product-photo-videos::-webkit-scrollbar {
  display: none;
  height: 8px;
}

.product-photo-videos::-webkit-scrollbar-thumb {
  background: #77BE1D;
  border-radius: 4px;
}

.product-photo-video {
  width: 300px;
  height: 180px;
  border-radius: 12px;
  overflow: hidden;
  position: relative;
  transition: transform 0.3s ease;
  cursor: pointer;
}

.product-photo-video:hover {
  transform: scale(1.01);
}

.product-photo-video img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.product-photo-video-play {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 60px;
  height: 60px;
  border: 2px solid #77BE1D;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
}

.product-photo-video-play:hover {
  background: rgba(119, 190, 29, 0.2);
}

.product-photo-video-playy {
  width: 45px;
  height: 45px;
  background: #77BE1D;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background: rgba(0, 0, 0, 0.9);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-cont {
  position: relative;
  width: 100%;
  max-width: 1800px;
}

.close {
  position: absolute;
  top: 20px;
  right: 20px;
  font-size: 70px;
  color: #fff;
  cursor: pointer;
  transition: color 0.3s ease;
}

.close:hover {
  color: #77BE1D;
}

.modal-content {
  height: 90vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.mySlides img,
.mySlides video {
  width: 1200px;
  border-radius: 12px;
}

.prev,
.next {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  font-size: 60px;
  color: #fff;
  padding: 10px;
  cursor: pointer;
  border-radius: 15px;
  transition: background 0.3s ease;
}

.prev { left: 20px; }
.next { right: 20px; }

.prev:hover,
.next:hover {
  background: rgba(119, 190, 29, 0.2);
}

.product-ostas {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 20px;
  padding: 30px;
  backdrop-filter: blur(15px);
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.3);
}

.product-ostas-title {
  display: flex;
  gap: 20px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  padding-bottom: 15px;
  margin-bottom: 20px;
}

.product-osta {
  cursor: pointer;
}

.product-osta-left,
.product-osta-center,
.product-osta-right {
  font-size: 18px;
  color: rgba(255, 255, 255, 0.7);
  padding: 0 15px;
  transition: all 0.3s ease;
}

.product-osta-left.active,
.product-osta-center.active,
.product-osta-right.active {
  color: #97E238;
  border-bottom: 2px solid #77BE1D;
}

.product-ostas-container {
  min-height: 200px;
}

.product-opisanie-title,
.product-sisTreb-title,
.product-activate-title {
  font-size: 24px;
  font-weight: 700;
  color: #fff;
  margin-bottom: 15px;
}

.product-opisanie-txt {
  font-size: 16px;
  color: rgba(255, 255, 255, 0.9);
  line-height: 1.6;
}

.product-sisTreb-table {
  width: 100%;
  border-collapse: collapse;
}

.product-sisTreb-table td {
  padding: 10px 15px;
  font-size: 16px;
}

.product-activate-input input {
  width: 100%;
  max-width: 400px;
  padding: 12px;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  color: #fff;
  font-size: 16px;
  transition: border-color 0.3s ease;
}

.product-activate-input input:focus {
  border-color: #77BE1D;
  outline: none;
}

.vam-budet-interesno-title {
  font-size: 32px;
  font-weight: 700;
  background: linear-gradient(90deg, #77BE1D, #97E238);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  margin-bottom: 30px;
}

.vam-budet-interesno-cont {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 30px;
}
</style>