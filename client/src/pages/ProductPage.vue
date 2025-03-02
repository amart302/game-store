<template>
    <div class="product-page">
      <Header />
      <main v-if="currentProduct.name">
        <div class="product-information">
          <div class="product-container">
            <div class="product-img">
              <img :src="currentProduct.header_image" alt="Product Image" />
            </div>
            <div class="product-other">
              <div class="product-title">{{ currentProduct.name }}</div>
              <div class="product-v-nalichii">
                <div class="product-v-nalichii-tochka"></div>
                В наличии
              </div>
              <div class="product-prices">
                <div class="product-now-price">{{ currentProduct.final_price }} {{ currentProduct.currency }}</div>
                <div class="product-skidka" v-if="currentProduct.discounted">-{{ currentProduct.discount_percent }}%</div>
                <div class="product-old-price" v-if="currentProduct.discounted">{{ currentProduct.original_price }} {{ currentProduct.currency }}</div>
              </div>
              <div class="product-deystvia">
                <div class="product-buy">Купить</div>
                <div class="product-to-back" @click="addToCart">В корзину</div>
                <div class="product-like">
                  <button @click="toggleFavourite">
                    <svg v-if="isFavourite" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" fill="#FF3030"/>
                    </svg>
                    <svg v-else width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" fill="none" stroke="#FFFFFF" stroke-width="2"/>
                    </svg>
                  </button>
                  <transition name="heart">
                    <div v-if="showHeartAnimation" class="heart-animation" :class="{ 'remove': !isFavourite }">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" fill="#FF3030"/>
                      </svg>
                      <div v-if="isFavourite" class="particles">
                        <span v-for="i in 6" :key="i" class="particle"></span>
                      </div>
                    </div>
                  </transition>
                </div>
              </div>
              <div class="product-info">
                <table>
                  <thead>
                    <tr class="product-tr1">
                      <td>Платформы:</td>
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
                      <path fill-rule="evenodd" clip-rule="evenodd" d="M3.5837 4.96466L8.49779 0L10 1.51767L3.5837 8L0 4.37942L1.50221 2.86175L3.5837 4.96466Z" fill="#77BE1D"/>
                    </svg>
                  </div>
                  Гарантия качества
                </div>
              </div>
            </div>
          </div>
          <div class="product-photo-videos" ref="photoVideos">
            <div class="product-photo-video" v-for="(img, index) in galleryImages" :key="index" @click="currentSlide(index + 1)">
              <div class="product-photo-video-play" v-if="index === 4">
                <div class="product-photo-video-playy">
                  <svg width="25" height="29" viewBox="0 0 25 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M23.2435 16.3123L23.2402 16.3143L3.90243 28.0215C2.63108 28.7903 0.957282 27.8734 0.957282 26.2636V2.84903C0.957282 1.24173 2.62841 0.322778 3.90216 1.09415L3.90222 1.09419L23.2402 12.8015L23.2435 12.8034C23.535 12.977 23.78 13.2297 23.9516 13.538C24.1232 13.8464 24.2144 14.1983 24.2144 14.5579C24.2144 14.9174 24.1232 15.2694 23.9516 15.5778C23.78 15.8861 23.535 16.1387 23.2435 16.3123Z" fill="white" stroke="#77BE1D" stroke-width="1.05714"/>
                  </svg>
                </div>
              </div>
              <img :src="img" alt="Gallery Image" v-if="index < 4" @click="plusSlides(index)" />
              <img :src="img.poster" alt="Gallery Image" v-else @click="plusSlides(index)" />
              <!-- <video ref="videoPlayer" :controls="showControls" width="600" @click="handlePlay" :src="img" :poster="currentProduct.screenshots[4].path_thumbnail" v-else>
                <source :src="img" type="video/mp4">
                <source :src="img" type="video/webm">
              </video> -->
            </div>
          </div>
        </div>
  
        <div class="product-ostas">
          <div class="product-ostas-title">
            <div class="product-osta" @click="activeTab = 'description'">
              <div :class="{ 'product-osta-left': true, active: activeTab === 'description' }">Описание товара</div>
            </div>
            <div class="product-osta" @click="activeTab = 'requirements'">
              <div :class="{ 'product-osta-center': true, active: activeTab === 'requirements' }">Системные требования</div>
            </div>
            <div class="product-osta" @click="activeTab = 'activation'">
              <div :class="{ 'product-osta-right': true, active: activeTab === 'activation' }">Активация</div>
            </div>
          </div>
          <div class="product-ostas-container">
            <div v-if="activeTab === 'description'" class="product-opisanie">
              <div class="product-opisanie-title">Полное погружение в {{ currentProduct.name }}</div>
              <div class="product-opisanie-txt">{{ currentProduct.short_description }}</div>
            </div>
            <div v-if="activeTab === 'requirements'" class="product-sisTreb">
              <div class="product-sisTreb-title">Рекомендованные системные требования</div>
              <table class="product-sisTreb-table">
                <tbody>
                  <tr>
                    <td>Платформы</td>
                    <td>
                      <span v-if="currentProduct.windows_available">Windows</span>
                      <span v-if="currentProduct.mac_available">, Mac</span>
                      <span v-if="currentProduct.linux_available">, Linux</span>
                    </td>
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
            <ProductCard 
              v-for="ad in ads.slice(0, 4)" 
              :key="ad.id" 
              :game="ad" 
              @favourites-updated="$forceUpdate()"
              @click="goToProduct(ad)"
            />
          </div>
        </div>
      </main>
  
      <div class="modal" :style="{ display: modalOpen ? 'flex' : 'none' }">
        <div class="modal-cont">
          <span class="close cursor" @click="closeModal">×</span>
          <div class="modal-content">
            <div class="mySlides" v-for="(slide, index) in slides" :key="index" :style="{ display: slideIndex === index + 1 ? 'flex' : 'none' }">
              <img v-if="index < 4" :src="slide" class="product-gallery-img" />
              <video v-else controls preload="metadata" ref="videoPlayer" class="123">
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
      <div class="temnee-bg" v-if="currentProduct.name"></div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  import Footer from '@/components/Footer.vue';
  import Header from '@/components/Header.vue';
  import ProductCard from '@/components/ProductCard.vue';
  
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
      };
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
            video: this.currentProduct.movies[0].mp4.max
          },
          
        ];        
      },
      slides() {
        return this.galleryImages.length ? [...this.galleryImages] : [];
      },
      isFavourite() {
        const favourites = JSON.parse(localStorage.getItem('favourites')) || [];
        return favourites.some(fav => fav.id === this.currentProduct.id);
      },
    },
    mounted() {
      document.title = `Playnchill | ${localStorage.getItem('currentProductInGames') || 'Product'}`;
      this.updateBasketCount();
      this.addEventListeners();
    },
    created(){
      this.fetchProducts();
    },
    methods: {
      async fetchProducts() {
        try {
          const gameId = localStorage.getItem('currentProductInGames');
          const response = await axios.get(`http://localhost:3000/api/steam/${gameId}`);
          const gameData = response.data[gameId];
          if (gameData) {
              console.log("Данные игры:", gameData.data);
              this.currentProduct = gameData.data;
          } else {
              console.log("Steam API вернул неуспешный ответ", gameData);
          }
          
        } catch (error) {
          console.error("Ошибка при попытке получить данные продукта:", error);
        }
      },
      shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
      },
      addToCart() {
        let basket = JSON.parse(localStorage.getItem('productsInBasketInGames')) || [];
        const product = {
          id: this.currentProduct.id,
          title: this.currentProduct.name,
          price: `${this.currentProduct.final_price} ${this.currentProduct.currency}`,
          skidka: this.currentProduct.discounted ? `-${this.currentProduct.discount_percent}%` : null,
          oldPrice: this.currentProduct.discounted ? `${this.currentProduct.original_price} ${this.currentProduct.currency}` : null,
          count: 1,
        };
        const existing = basket.find(item => item.id === product.id);
        if (existing) existing.count += 1;
        else basket.push(product);
        localStorage.setItem('productsInBasketInGames', JSON.stringify(basket));
        this.animateToBasket();
        setTimeout(() => {
          this.basketCount = basket.length;
          this.$emit('update-basket', this.basketCount);
        }, 2000);
      },
      animateToBasket() {
        const productImg = this.$el.querySelector('.product-img img');
        const saveBlock = this.$el.querySelector('.saveBlock');
        if (!productImg || !saveBlock) return;
  
        const cloned = productImg.cloneNode(true);
        cloned.style.position = 'absolute';
        cloned.style.width = '30px';
        cloned.style.height = '50px';
        cloned.style.zIndex = '20';
        cloned.style.left = `${productImg.getBoundingClientRect().left + window.scrollX}px`;
        cloned.style.top = `${productImg.getBoundingClientRect().top + window.scrollY}px`;
        const targetX = (saveBlock.getBoundingClientRect().left + window.scrollX - (productImg.getBoundingClientRect().left + window.scrollX)) + 95;
        const targetY = (saveBlock.getBoundingClientRect().top + window.scrollY - (productImg.getBoundingClientRect().top + window.scrollY));
  
        this.$el.appendChild(cloned);
        requestAnimationFrame(() => {
          cloned.style.transition = 'all 2s';
          cloned.style.transform = `translate(${targetX}px, ${targetY}px)`;
          cloned.style.opacity = '1';
          setTimeout(() => cloned.remove(), 2000);
        });
      },
      toggleFavourite() {
        let favourites = JSON.parse(localStorage.getItem('favourites')) || [];
        const isAlreadyFavourite = favourites.some(fav => fav.id === this.currentProduct.id);
        if (isAlreadyFavourite) {
          favourites = favourites.filter(fav => fav.id !== this.currentProduct.id);
        } else {
          favourites.push(this.currentProduct);
        }
        localStorage.setItem('favourites', JSON.stringify(favourites));
        this.showHeartAnimation = true;
        setTimeout(() => this.showHeartAnimation = false, 800);
        this.$emit('favourites-updated');
      },
      updateBasketCount() {
        const basket = JSON.parse(localStorage.getItem('productsInBasketInGames')) || [];
        this.basketCount = basket.length;
      },
      closeModal() {
        this.modalOpen = false;
        document.body.style.overflow = 'auto';
        if (this.$refs.videoPlayer) this.$refs.videoPlayer[0].pause();
      },
      plusSlides(n) {
        if (this.$refs.videoPlayer && n == 4) this.$refs.videoPlayer[0].play();
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
        if (this.$refs.videoPlayer && this.slideIndex !== 5) this.$refs.videoPlayer[0].pause();
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
      goToProduct(game) {
        localStorage.setItem('currentProductInGames', game.name);
        this.$router.push('/product');
        this.fetchProducts();
      },
    },
  };
  </script>
  
  <style scoped>
  .product-page {
    position: relative;
    background-size: cover;
    background-position: center;
    min-height: 100vh;
    color: #fff;
  }
  
  .temnee-bg {
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(to bottom, rgba(10, 7, 26, 0.7), rgba(28, 20, 53, 0.9));
    z-index: 1;
  }
  
  main {
    position: relative;
    z-index: 2;
    max-width: 1440px;
    margin: 0 auto;
    padding: 40px 20px;
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
  
  .product-buy, .product-to-back {
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
  
  .product-to-back {
    background: transparent;
    border: 2px solid rgba(255, 255, 255, 0.2);
  }
  
  .product-buy:hover, .product-to-back:hover {
    transform: translateY(-3px);
    background: linear-gradient(90deg, #649E18, #7BC22F);
  }
  
  .product-to-back:hover {
    background: rgba(119, 190, 29, 0.2);
  }
  
  .product-like button {
    background: rgba(255, 255, 255, 0.1);
    border: none;
    padding: 10px;
    border-radius: 50%;
    transition: all 0.3s ease;
  }
  
  .product-like button:hover {
    background: rgba(255, 48, 48, 0.2);
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
  }
  
  .product-photo-video:hover {
    transform: scale(0.);
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
    width: 90%;
    max-width: 1300px;
  }
  
  .close {
    position: absolute;
    top: 20px;
    right: 20px;
    font-size: 40px;
    color: #fff;
    cursor: pointer;
    transition: color 0.3s ease;
  }
  
  .close:hover {
    color: #77BE1D;
  }
  
  .modal-content {
    height: 80vh;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .mySlides img, .mySlides video {
    width: 800px;
    border-radius: 12px;
  }
  
  .prev, .next {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    font-size: 40px;
    color: #fff;
    padding: 10px;
    cursor: pointer;
    transition: background 0.3s ease;
  }
  
  .prev { left: 20px; }
  .next { right: 20px; }
  
  .prev:hover, .next:hover {
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
  
  .product-osta-left, .product-osta-center, .product-osta-right {
    font-size: 18px;
    color: rgba(255, 255, 255, 0.7);
    padding: 0 15px;
    transition: all 0.3s ease;
  }
  
  .product-osta-left.active, .product-osta-center.active, .product-osta-right.active {
    color: #97E238;
    border-bottom: 3px solid #77BE1D;
  }
  
  .product-ostas-container {
    min-height: 200px;
  }
  
  .product-opisanie-title, .product-sisTreb-title, .product-activate-title {
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