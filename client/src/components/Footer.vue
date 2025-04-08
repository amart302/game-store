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
        <img src="../assets/images/телеграм.png" alt="Telegram" />
        <img src="../assets/images/instagram.png" alt="Instagram" />
      </div>
    </div>
    <img 
      class="scroll-to-header" 
      ref="scrollButton" 
      @click="scrollToHeader" 
      src="../assets/images/up-arrow.png" 
      alt="Вверх"
    >
  </footer>
</template>

<script>
import { ref, onMounted, onUnmounted } from 'vue';

export default {
  name: "Footer",
  setup() {
    const showLangCurren = ref(false);
    const currentLang = ref('RU');
    const currentCurrency = ref('₽');
    const scrollButton = ref(null);
    const lastScrollY = ref(0);

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      lastScrollY.value = currentScrollY;

      if (!scrollButton.value) return;

      if (currentScrollY > 300 ) {
        scrollButton.value.classList.add("visible");
      } else {
        scrollButton.value.classList.remove("visible");
      }
    };

    const scrollToHeader = () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const toggleLangCurren = () => {
      showLangCurren.value = !showLangCurren.value;
    };

    onMounted(() => {
      window.addEventListener("scroll", handleScroll);
    });

    onUnmounted(() => {
      window.removeEventListener("scroll", handleScroll);
    });

    return { 
      showLangCurren,
      currentLang,
      currentCurrency,
      scrollButton,
      scrollToHeader,
      toggleLangCurren
    };
  }
};
</script>
<style scoped>
footer {
  border-top: solid 1px rgb(56, 56, 56);
  padding-block: 80px;
  margin-top: 80px;
}
.scroll-to-header {
  width: 50px;
  height: 50px;
  background-color: #77be1d;
  border-radius: 2px;
  padding: 12px;
  position: fixed;
  bottom: 40px;
  right: 40px;
  cursor: pointer;
  opacity: 0;
  transform: translateY(10px);
  transition: opacity 0.5s ease-out, transform 0.5s ease-out;
}
.scroll-to-header.visible {
  opacity: 1;
  transform: translateY(0);
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