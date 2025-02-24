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
        <div class="bl-cash">Накопительный счет</div>
        <div class="bl-state">
          <a v-for="link in links" :key="link.text" :href="link.href">{{ link.text }}</a>
        </div>
        <div class="bl-pr" @click="showProfile = true">
          <p>{{ truncatedUsername }}</p>
          <div class="pr-img"></div>
        </div>
      </div>

      <div class="header-block-c">
        <div class="logo">
          <img src="../assets/images/logo.svg" alt="Logo" />
          <p>Playnchill</p>
        </div>
        <div class="bl-in">
          <input type="text" placeholder="Поиск" v-model="searchQuery" @keyup.enter="handleSearch" />
          <img src="../assets/images/on.png" alt="Search" />
        </div>
        <p style="color: #77BE1D;">Бесплатно</p>
        <div class="bl-icon">
          <img src="../assets/images/like.png" alt="Избранное" @click="goToFavorites" />
          <img src="../assets/images/cek-i.png" alt="Корзина" @click="goToCart" />
        </div>
      </div>
    </div>
    <Profile v-if="showProfile" :showAndHideProfile="showAndHideProfile" />
  </header>
</template>

<script>
import Profile from './Profile.vue';

export default {
  components: {
    Profile,
  },
  data() {
    return {
      userData: JSON.parse(localStorage.getItem("userData")) || { username: "Гость" },
      selectedLang: 'RU',
      selectedVal: '$',
      isDropdownVisible: false,
      showProfile: false,
      searchQuery: '',
      links: [
        { text: 'Отзывы', href: '#' },
        { text: 'Гарантии', href: '#' },
        { text: 'Как купить', href: '#' },
        { text: 'Накопительная', href: '#' },
        { text: 'Заработай', href: '#' },
      ],
    };
  },
  computed: {
    truncatedUsername() {
      const username = this.userData.username;
      return username.length > 11 ? username.slice(0, 8) + "..." : username;
    },
  },
  methods: {
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
    },
    closeDropdown(event) {
      if (!event.target.closest('.lang-val-cn')) {
        this.isDropdownVisible = false;
      }
    },
    showAndHideProfile() {
      this.showProfile = !this.showProfile;
    },
    handleSearch() {
      this.$emit('search', this.searchQuery);
    },
    goToFavorites() {
      this.$router.push('/favorites');
    },
    goToCart() {
      this.$router.push('/cart');
    },
  },
  mounted() {
    document.addEventListener('click', this.closeDropdown);
  },
  beforeDestroy() {
    document.removeEventListener('click', this.closeDropdown);
  },
};
</script>

<style scoped>
/* Ваши стили остаются без изменений */
.container-header {
  max-width: 1440px;
  margin-inline: auto;
  font-size: 18px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  background: #06030F;
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
  width: 48px;
  height: 48px;
  border-radius: 50%;
  border: 3px solid #77BE1D;
  background-color: #fff;
}

.bl-icon {
  display: flex;
  align-items: center;
  gap: 25px;
}

.bl-icon img {
  cursor: pointer;
}

.logo {
  display: flex;
  align-items: center;
  gap: 11px;
  font-size: 24px;
  font-weight: bold;
}

.bl-in {
  background: #C4C4C40D;
  display: flex;
  align-items: center;
  border-radius: 15px;
}

input[type='text'] {
  padding: 0px 20px;
  width: 648px;
  height: 66px;
  border: none;
  font-size: 18px;
  background: transparent;
  color: #333;
  transition: all 0.3s ease;
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
</style>