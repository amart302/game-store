<template>
  <div class="slider">
    <div class="arrowLeft" @click="prevSlide">
      <img src="../assets/images/arrowLeftImg.svg" alt="Previous" />
    </div>
    <div class="slide" :style="{ marginLeft: `${indent}rem` }">
      <img src="../assets/images/slideImg1.png" class="slideImg" />
      <div class="slide_information">
        <h3>
          Покорите вершину без шума и пыли. Перехитрите копов и участвуйте в еженедельных квалификационных заездах, чтобы добраться до Гранд-заезда — главной уличной гонки. Заполните свой гараж уникальными модифицированными машинами и покажите на улицах класс.
        </h3>
      </div>
    </div>
    <div class="slide">
      <img src="../assets/images/slideImg2.png" class="slideImg" />
      <div class="slide_information">
        <h3>
          Культовая серия гоночных видеоигр от компании Electronic Arts. Смысл игры заключается в управлении различными автомобилями на различных трассах. Существуют варианты игры как для персональных компьютеров, так и для различных игровых приставок, таких как Xbox и PlayStation.
        </h3>
        <div class="slide_priceBlock">
          <span class="slide_priceWithDiscount">4 999 ₽</span>
          <span class="slide_discount">-25%</span>
          <span class="slide_priceWithoutDiscount">6 999 ₽</span>
        </div>
        <div class="slide_btnsBlock">
          <button class="slideBtn" @click.stop="addToCart">В корзину</button>
          <button class="slideBtn" @click.stop="addToFavourites">В избранное</button>
        </div>
      </div>
    </div>
    <div class="slide">
      <img src="../assets/images/slideImg3.png" class="slideImg" />
      <div class="slide_information">
        <h3>
          Компьютерная игра серии Need for Speed в жанре аркадных автогонок, разработанная студией Ghost Games и изданная компанией Electronic Arts для игровых приставок PlayStation 4 и Xbox One в ноябре 2015 года. Выход игры на персональные компьютеры состоялся в марте 2016 года[2]. Это двадцать вторая часть серии Need for Speed.
        </h3>
      </div>
    </div>
    <div class="arrowRight" @click="nextSlide">
      <img src="../assets/images/arrowRightImg.svg" alt="Next" />
    </div>
    <div class="counterClides">
      <div class="counter" :class="{ active: index === 1 }" id="counter1"></div>
      <div class="counter" :class="{ active: index === 2 }" id="counter2"></div>
      <div class="counter" :class="{ active: index === 3 }" id="counter3"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Slider',
  data() {
    return {
      index: 2, // Начальный слайд (второй по умолчанию)
      indent: 0, // Смещение в rem
      slideWidth: 160.6, // Ширина слайда из исходного JS
    };
  },
  methods: {
    prevSlide() {
      if (this.index > 1) {
        this.indent += this.slideWidth;
        this.index--;
      }
    },
    nextSlide() {
      if (this.index < 3) {
        this.indent -= this.slideWidth;
        this.index++;
      }
    },
    addToCart() {
      console.log('Добавлено в корзину из слайдера');
    },
    addToFavourites() {
      console.log('Добавлено в избранное из слайдера');
    },
  },
};
</script>

<style scoped>
.slider {
  max-width: 1600px;
  max-height: 700px;
  margin-inline: auto;
  margin-block: 60px;
  overflow: hidden;
  position: relative;
  display: flex;
  gap: 60px;
  justify-content: center;
  align-items: center;
  padding-bottom: 56px;
}

.arrowLeft {
  position: absolute;
  left: 9.2%;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50px;
  width: 50px;
  border-radius: 50%;
  background-color: rgba(196, 196, 196, 0.05);
  backdrop-filter: blur(10px);
  cursor: pointer;
  z-index: 1;
  transition: all 0.2s;
}

.arrowRight {
  position: absolute;
  right: 9.2%;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50px;
  width: 50px;
  border-radius: 50%;
  background-color: rgba(196, 196, 196, 0.05);
  backdrop-filter: blur(10px);
  cursor: pointer;
  z-index: 1;
  transition: all 0.2s;
}

.arrowRight:hover,
.arrowLeft:hover {
  background-color: rgba(196, 196, 196, 0.1);
}

.slideImg {
  border-radius: 24px;
}

.slide {
  position: relative;
  transition: all 0.6s;
}

.slide_information {
  width: 86%;
  display: grid;
  position: absolute;
  top: 36%;
  left: 8%;
  gap: 16px;
}

.slide_priceBlock {
  display: flex;
  gap: 50px;
}

.slide_priceWithDiscount,
.slide_discount,
.slide_priceWithoutDiscount {
  font-size: 22px;
}

.slide_discount {
  color: #77be1d;
}

.slide_priceWithoutDiscount {
  color: rgba(255, 255, 255, 0.3);
  text-decoration: line-through;
}

.slide_btnsBlock {
  display: flex;
  gap: 20px;
}

.slideBtn {
  border: none;
  background-color: rgba(255, 255, 255, 0.05);
  padding-inline: 28px;
  padding-block: 24px;
  border-radius: 12px;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.2s;
}

.slideBtn:hover {
  background-color: white;
  color: black;
}

.counterClides {
  width: 300px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  align-items: center;
  position: absolute;
  bottom: 0;
  gap: 10px;
  z-index: 1;
}

.counter {
  height: 3px;
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 1px;
  transition: all 0.4s;
}

.counter.active {
  background-color: white;
  height: 5px;
}
</style>