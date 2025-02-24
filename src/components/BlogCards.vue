<template>
  <div class="theBlogConteiner">
    <div class="blogCard" v-for="(blog, i) in blogCards" :key="i">
      <img class="blogCardImg" :src="blog.imgSrc" />
      <h3 class="newsName">{{ blog.newsName }}</h3>
      <span class="news">{{ blog.news }}</span>
      <p class="date">{{ blog.datePublication }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BlogCards',
  data() {
    return {
      blogCards: [
        { imgSrc: '../assets/images/blogCardImg.png', newsName: 'Да как так-то борются с пиратством?', news: 'Скримеры - только верхушка айсберга ужаса', datePublication: '14 Октября 2023' },
        { imgSrc: '../assets/images/blogCardImg.png', newsName: 'Да как так-то борются с пиратством?', news: 'Скримеры - только верхушка айсберга ужаса', datePublication: '14 Октября 2023' },
        { imgSrc: '../assets/images/blogCardImg.png', newsName: 'Да как так-то борются с пиратством?', news: 'Скримеры - только верхушка айсберга ужаса', datePublication: '14 Октября 2023' },
      ],
    };
  },
};
</script>
<style scoped>
.theBlogConteiner {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  align-items: center;
  gap: 30px;
}

.blogCardImg {
  width: 100%;
}

.newsName {
  font-size: 22px;
}

.news {
  font-size: 16px;
}

.date {
  color: #63656a;
  font-size: 15px;
}
</style>