<template>
    <footer>
      <div class="footerParentBlock">
        <div class="footerBlock1">
          <img src="../assets/images/payPalImg.svg" alt="PayPal" />
          <img src="../assets/images/masterCardImg.svg" alt="MasterCard" />
          <img src="../assets/images/visaImg.svg" alt="Visa" />
          <img src="../assets/images/mirImg.svg" alt="Mir" />
          <img src="../assets/images/webMoneyImg.svg" alt="WebMoney" />
        </div>
        <div class="footerBlock2">
          <div class="footerBlock2_podBlock">
            <h5>О компании</h5>
            <p>О нас</p>
            <p>Вакансии</p>
            <p>Реквизиты</p>
          </div>
          <div class="footerBlock2_podBlock">
            <h5>Договор оферты</h5>
            <p>Каталог</p>
            <p>Акции</p>
            <p>Личный кабинет</p>
          </div>
          <div class="footerBlock2_podBlock">
            <h5>Договор оферты</h5>
            <p>Каталог</p>
            <p>Акции</p>
            <p>Личный кабинет</p>
          </div>
          <div class="footerBlock2_podBlock2">
            <img src="../assets/images/footerImg1.svg" alt="" />
            <img src="../assets/images/footerImg2.svg" alt="" />
          </div>
        </div>
      </div>
      <div class="socialNetworkBlock">
        <a href="#">Правовая информация</a>
        <p>Интернет-магазин игр «Playnchill» © 2022</p>
        <div class="langAndCurren" @click="toggleLangCurren">
          <span class="lang">RU /</span>
          <span class="currency">{{ currentCurrency }}</span>
        </div>
        <div class="langAndCurrenChange2" v-show="showLangCurren">
          <div class="changeLanguage">
            <button class="changeBtn" :style="{ backgroundColor: currentLang === 'RU' ? '#77be1d' : 'none' }">Russian (RU)</button>
            <button class="changeBtn" :style="{ backgroundColor: currentLang === 'EN' ? '#77be1d' : 'none' }">English (EN)</button>
          </div>
          <div class="separator"></div>
          <div class="changeCurrency">
            <button class="dollarBtn" :style="{ backgroundColor: currentCurrency === '$' ? '#77be1d' : 'none' }">$</button>
            <button class="euroBtn" :style="{ backgroundColor: currentCurrency === '€' ? '#77be1d' : 'none' }">€</button>
            <button class="rubleBtn" :style="{ backgroundColor: currentCurrency === '₽' ? '#77be1d' : 'none' }">₽</button>
          </div>
        </div>
        <div class="socialNetwork_icons">
          <img src="../assets/images/vkIcon.svg" alt="VK" />
          <img src="../assets/images/discordIcon.svg" alt="Discord" />
          <img src="../assets/images/twitterIcon.svg" alt="Twitter" />
          <img src="../assets/images/instagramIcon.svg" alt="Instagram" />
        </div>
      </div>
    </footer>
  </template>
  
  <script>
  export default {
    name: 'Footer',
    data() {
      return {
        showLangCurren: false,
        currentLang: 'RU',
        currentCurrency: '₽',
      };
    },
    methods: {
      toggleLangCurren() {
        this.showLangCurren = !this.showLangCurren;
      },
    },
  };
  </script>
  <style scoped>
  footer {
    border-top: solid 1px rgb(56, 56, 56);
    padding-block: 80px;
    margin-top: 80px;
  }
  
  .footerParentBlock {
    max-width: 1400px;
    margin-inline: auto;
  }
  
  .footerBlock1 {
    max-width: 1400px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .footerBlock2 {
    margin-top: 40px;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
  }
  
  .footerBlock2_podBlock p {
    color: #cdcdcf;
  }
  
  .footerBlock2_podBlock2 {
    display: flex;
    align-items: center;
    gap: 10px;
  }
  
  .socialNetworkBlock {
    position: relative;
    max-width: 1400px;
    margin-inline: auto;
    display: grid;
    grid-template-columns: 0.5fr 1fr 0.2fr 0.2fr;
    align-items: center;
  }
  
  .socialNetworkBlock a {
    display: flex;
    justify-content: left;
    color: #366edc;
  }
  
  .socialNetworkBlock p {
    display: flex;
    justify-content: center;
    color: #63686d;
  }
  
  .socialNetworkBlock img {
    cursor: pointer;
  }
  
  .socialNetworkBlock .langAndCurren {
    display: flex;
    justify-content: center;
  }
  
  .langAndCurrenChange2 {
    position: absolute;
    bottom: 41px;
    left: 76%;
    width: 140px;
    background-color: #0c061f;
    border-radius: 8px;
    padding: 6px;
    gap: 4px;
    opacity: 0;
    transition: all 0.2s;
    z-index: 1;
  }
  
  .langAndCurrenChange2.visible {
    opacity: 1;
  }
  
  .socialNetwork_icons {
    display: flex;
    justify-content: space-between;
  }
  </style>