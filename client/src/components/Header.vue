<template>
  <header>
    <div class="container-header">
      <div class="header-block-w">
        <div class="bl-lang" @click.stop>
          <div class="lang-val-cn">
            <button @click="toggleDropdown">
              {{ selectedLang }} <span style="color: #3C364E;">/</span> {{ selectedVal }}
            </button>
            <div v-if="isDropdownVisible" class="dropdown" @click.stop>
              <div class="lang-options">
                <button @click="selectLang('RU')">Русский (RU)</button>
                <button @click="selectLang('EN')">English (EN)</button>
              </div>
              <div class="val-options">
                <button @click="selectVal('$')">$</button>
                <button @click="selectVal('₽')">₽</button>
                <button @click="selectVal('€')">€</button>
              </div>
            </div>
          </div>
        </div>
        <div class="bl-cash" @click="toggleCashModal">
          Баланс: {{ accountBalance }} {{ selectedVal }}
        </div>
        <div class="bl-state">
          <a v-for="link in links" :key="link.text" :href="link.href" @click.prevent="handleLinkClick(link.href)">{{ link.text }}</a>
        </div>
        <div class="bl-pr" @click="() => goToProfile()">
          <p>{{ truncatedUsername }}</p>
          <img :src="userData.avatarIcon || 'src/assets/images/avatarIcon.png'" class="pr-img" />
        </div>
      </div>

      <div class="header-block-c">
        <div class="logo" @click="goToMain">
          <img src="../assets/images/logo.svg" alt="Logo" />
          <p>Playnchill</p>
        </div>
        <div class="bl-in">
          <input class="input-search" type="text" placeholder="Поиск" v-model="searchQuery" @keyup.enter="handleSearch" />
          <img src="../assets/images/on.png" alt="Search" />
        </div>
        <p style="color: #77BE1D;">Бесплатно</p>
        <div class="bl-icon">
          <button alt="Избранное" @click="goToFavorites" class="favourite-btn">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" fill="none" stroke="#FFFFFF" stroke-width="2" />
            </svg>
          </button>
          <img src="../assets/images/cek-i.png" alt="Корзина" @click="goToCart" />
          <div class="uveda" v-if="basketCount > 0">{{ mainStore.basket.length }}</div>
        </div>
      </div>
    </div>

    <div class="cash-modal" v-if="showCashModal">
      <div class="cash-modal-content">
        <span class="close-modal" @click="toggleCashModal">×</span>
        <h3>Пополнить накопительный счёт</h3>
        <input type="number" v-model="depositAmount" placeholder="Введите сумму" min="1" step="1" />
        <button @click="depositCash" class="deposit-btn">Пополнить</button>
      </div>
    </div>
    <Search :searchQuery="searchQuery" :searchGames="searchGames"/>
  </header>
  <Register v-if="mainStore.showForm == 'Register'"/>
  <Login v-if="mainStore.showForm == 'Login'"/>
</template>

<script>
import Register from '@/components/Register.vue';
import ProfileUser from '../pages/ProfileUser.vue';
import Search from './Search.vue';
import Login from '@/components/Login.vue';
import { useMainStore } from '@/store/store';

export default {
  components: {
    ProfileUser,
    Search,
    Register,
    Login
  },
  props: { searchGames: Function, showForm: Boolean },
  data() {
    return {
      userData: (sessionStorage.getItem("userData")) ? JSON.parse(sessionStorage.getItem("userData")) : { username: "Гость" },
      selectedLang: 'RU',
      selectedVal: '₽',
      isDropdownVisible: false,
      searchQuery: '',
      basketCount: 0,
      showCashModal: false,
      depositAmount: '',
      accountBalance: (this.userData) ? this.userData.balance : 0,
      links: [
        { text: 'Отзывы', href: '#FeedbackForm' },
        { text: 'Гарантии', href: '#' },
        { text: 'Как купить', href: '#' },
        { text: 'Накопительная', href: '#' },
        { text: 'История покупок', href: '/history' },
      ],
    };
  },
  setup(){
    const mainStore = useMainStore();
    return { mainStore };
  },
  computed: {
    truncatedUsername() {
      const username = this.userData.username;
      return username.length > 11 ? username.slice(0, 8) + "..." : username;
    },
  },
  mounted() {
    document.addEventListener('click', this.closeDropdown);
    this.loadAccountBalance();
  },
  beforeDestroy() {
    document.removeEventListener('click', this.closeDropdown);
  },
  methods: {
    goToProfile(){
      const user = sessionStorage.getItem("userData");
      if(!user){
        this.mainStore.openRegisterForm();
        return;
      }
      this.$router.push('/profile');
    },
    toggleDropdown() {
      this.isDropdownVisible = !this.isDropdownVisible;
    },
    selectLang(lang) {
      this.selectedLang = lang;
      this.isDropdownVisible = false;
    },
    selectVal(val) {
      this.selectedVal = val;
      this.isDropdownVisible = false;
      localStorage.setItem('selectedVal', val);
    },
    closeDropdown(event) {
      if (!event.target.closest('.lang-val-cn')) {
        this.isDropdownVisible = false;
      }
    },
    handleSearch() {
      this.$emit('search', this.searchQuery);
    },
    goToFavorites() {
      this.$router.push('/favourites');
    },
    goToCart() {
      this.$router.push('/basket');
    },
    goToMain() {
      this.$router.push('/');
    },
    toggleCashModal() {
      this.showCashModal = !this.showCashModal;
      if (!this.showCashModal) this.depositAmount = '';
    },
    depositCash() {
      const amount = parseInt(this.depositAmount);
      if (isNaN(amount) || amount <= 0) {
        alert('Пожалуйста, введите корректную сумму');
        return;
      }
      this.accountBalance += amount;
      this.saveAccountBalance();
      this.toggleCashModal();
    },
    loadAccountBalance() {
      const savedBalance = this.userData.balance;
      if (savedBalance) {
        this.accountBalance = parseInt(savedBalance);
      } else {
        this.saveAccountBalance();
      }
    },
    saveAccountBalance() {
      return 12;
    //   const usersArr = JSON.parse(users);
    //   usersArr.map(item => (item.id == this.userData.id) ? item.balance = this.accountBalance : false);
    //   localStorage.setItem("users", JSON.stringify(usersArr));
    },
    handleLinkClick(href) {
      if (href === '#FeedbackForm') {
        if (this.$route.path !== '/') {
          this.$router.push('/').then(() => {
            this.scrollToFeedback();
          });
        } else {
          this.scrollToFeedback();
        }
      } else if (href === '/history') {
        this.$router.push('/history');
      } else {
        window.location.href = href;
      }
    },
    scrollToFeedback() {
      const feedbackSection = document.querySelector('#FeedbackForm');
      if (feedbackSection) {
        feedbackSection.scrollIntoView({ behavior: 'smooth' });
      }
    },
  },
};
</script>

<style scoped>
.container-header {
  max-width: 1440px;
  margin-inline: auto;
  font-size: 18px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  background: transparent;
  color: #fff;
}

.header-block-w,
.header-block-c {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
}

.bl-lang {
  position: relative;
}

.lang-val-cn button {
  padding: 8px 16px;
  border: none;
  border-radius: 5px;
  background: #06030F;
  color: #fff;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s ease;
}

.lang-val-cn button:hover {
  background: #77BE1D;
}

.dropdown {
  position: absolute;
  top: 100%;
  left: 0;
  margin-top: 8px;
  background: #100D18;
  border-radius: 4px;
  z-index: 10;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: max-content;
}

.dropdown div {
  padding: 8px;
}

.val-options {
  display: flex;
}

.dropdown button {
  display: block;
  width: 100%;
  padding: 8px 12px;
  text-align: left;
  border: none;
  background: #100D18;
  color: #fff;
  cursor: pointer;
  text-align: center;
  transition: background-color 0.3s ease;
}

.dropdown button:hover {
  background: #77BE1D;
}

.bl-state {
  display: flex;
  gap: 31px;
}

.bl-state a {
  color: #fff;
  text-decoration: none;
  transition: color 0.3s ease;
}

.bl-state a:hover {
  color: #77BE1D;
}

.header-block-c {
  margin-top: 16px;
}

.bl-pr {
  width: 200px;
  display: flex;
  justify-content: end;
  align-items: center;
  gap: 25px;
  cursor: pointer;
}

.bl-pr .pr-img {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  border: 3px solid #77BE1D;
  background-color: #fff;
  object-fit: cover;
}

.bl-icon {
  display: flex;
  align-items: center;
  gap: 25px;
  position: relative;
}

.bl-icon img {
  padding: 10px;
  cursor: pointer;
  transition: opacity 0.3s ease;
}

.bl-icon img:hover {
  opacity: 0.7;
}

.uveda {
  position: absolute;
  top: 1px;
  right: -1px;
  width: 18px;
  height: 20px;
  background-color: #78be1dc7;
  opacity: 2;
  color: white;
  border-radius: 6px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 12px;
}

.logo {
  display: flex;
  align-items: center;
  gap: 11px;
  font-size: 24px;
  font-weight: bold;
  cursor: pointer;
}

.favourite-btn {
  background: transparent;
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
  opacity: 0.7;
}

@keyframes pulse {
  0% { transform: scale(1); }
  50% { transform: scale(1.2); }
  100% { transform: scale(1); }
}

.bl-in {
  background: #C4C4C40D;
  display: flex;
  align-items: center;
  border-radius: 15px;
}

.input-search {
  padding: 0 20px;
  width: 648px;
  height: 66px;
  border: none;
  font-size: 18px;
  background: transparent;
  color: #fff;
  transition: all 0.3s ease;
}

input[type='text']::placeholder {
  color: #9D9AA6;
}

input[type='text']:focus {
  border-color: #77BE1D;
  outline: none;
}

.bl-in img {
  padding-right: 20px;
  cursor: pointer;
  transition: opacity 0.3s ease;
}

.bl-in img:hover {
  opacity: 0.7;
}

.bl-cash {
  color: #fff;
  transition: color 0.3s ease;
  cursor: pointer;
}

.bl-cash:hover {
  color: #77BE1D;
}

.cash-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.cash-modal-content {
  background: #1C1435;
  padding: 20px;
  border-radius: 15px;
  text-align: center;
  position: relative;
  width: 90%;
  max-width: 400px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.3);
}

.close-modal {
  position: absolute;
  top: 10px;
  right: 15px;
  font-size: 30px;
  color: #fff;
  cursor: pointer;
  transition: color 0.3s ease;
}

.close-modal:hover {
  color: #77BE1D;
}

.cash-modal-content h3 {
  font-size: 24px;
  margin-bottom: 20px;
  color: #fff;
}

.cash-modal-content input {
  width: 100%;
  padding: 10px;
  margin-bottom: 20px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.05);
  color: #fff;
  font-size: 16px;
}

.deposit-btn {
  padding: 10px 20px;
  background: linear-gradient(90deg, #77BE1D, #97E238);
  border: none;
  border-radius: 25px;
  color: white;
  font-weight: 600;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.deposit-btn:hover {
  background: linear-gradient(90deg, #649E18, #7BC22F);
  transform: translateY(-3px);
}

/* Медиазапросы для адаптации */
@media (max-width: 1024px) {
  .container-header {
    padding: 12px;
    font-size: 16px;
  }

  .header-block-w,
  .header-block-c {
    flex-wrap: wrap;
    gap: 12px;
  }

  .lang-val-cn button {
    font-size: 14px;
    padding: 6px 12px;
  }

  .dropdown button {
    font-size: 14px;
    padding: 6px 10px;
  }

  .bl-state {
    gap: 20px;
  }

  .bl-pr {
    width: auto;
    gap: 15px;
  }

  .bl-pr .pr-img {
    width: 50px;
    height: 50px;
  }

  .logo {
    font-size: 20px;
    gap: 8px;
  }

  .input-search {
    width: 400px;
    height: 50px;
    font-size: 16px;
  }

  .bl-icon {
    gap: 20px;
  }

  .bl-icon img {
    width: 24px;
  }

  .uveda {
    width: 18px;
    height: 18px;
    font-size: 10px;
    top: -8px;
    right: -8px;
  }

  .cash-modal-content {
    max-width: 350px;
  }

  .cash-modal-content h3 {
    font-size: 20px;
  }

  .cash-modal-content input {
    font-size: 14px;
  }

  .deposit-btn {
    font-size: 14px;
    padding: 8px 16px;
  }
}

@media (max-width: 768px) {
  .container-header {
    padding: 10px;
    font-size: 14px;
  }

  .header-block-w {
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
  }

  .header-block-c {
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
    margin-top: 10px;
  }

  .lang-val-cn button {
    font-size: 12px;
    padding: 5px 10px;
  }

  .dropdown {
    width: 150px;
  }

  .dropdown button {
    font-size: 12px;
    padding: 5px 8px;
  }

  .val-options {
    flex-direction: column;
  }

  .bl-state {
    flex-wrap: wrap;
    gap: 10px;
  }

  .bl-pr {
    flex-direction: row-reverse;
    justify-content: flex-start;
    gap: 10px;
  }

  .bl-pr .pr-img {
    width: 40px;
    height: 40px;
  }

  .logo {
    font-size: 18px;
    gap: 6px;
  }

  .bl-in {
    width: 100%;
    border-radius: 10px;
  }

  .input-search {
    width: 100%;
    height: 40px;
    font-size: 14px;
    padding: 0 15px;
  }

  .bl-in img {
    padding-right: 15px;
    width: 20px;
  }

  .bl-icon {
    gap: 15px;
  }

  .bl-icon img {
    width: 20px;
  }

  .uveda {
    width: 16px;
    height: 16px;
    font-size: 8px;
    top: -6px;
    right: -6px;
  }

  p[style*="color: #77BE1D"] {
    font-size: 14px;
  }

  .cash-modal-content {
    max-width: 300px;
    padding: 15px;
  }

  .cash-modal-content h3 {
    font-size: 18px;
    margin-bottom: 15px;
  }

  .cash-modal-content input {
    font-size: 12px;
    padding: 8px;
  }

  .deposit-btn {
    font-size: 12px;
    padding: 6px 12px;
  }

  .close-modal {
    font-size: 24px;
    top: 5px;
    right: 10px;
  }
}
</style>
