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
        <div class="socialNetwork_icons">
          <img src="../assets/images/vk.png" alt="VK" />
          <img src="../assets/images/github.png" alt="GitHub" />
          <img src="../assets/images/телеграм.png" alt="Telegram" />
          <img src="../assets/images/instagram.png" alt="Instagram" />
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
    margin-top: 40px;
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
  .socialNetwork_icons {
    display: flex;
    gap: 10px;
    justify-content: space-between;
  }
  .socialNetwork_icons img{
    width: 32px;
    height: 32px;
  }
  </style>