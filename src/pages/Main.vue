<template>
    <Header />
      <main>
      </main>
      <!-- <Porofile /> -->
    <Footer />
</template>
  
<script setup>
  import Header from '../components/Header.vue';
  import Footer from '../components/Footer.vue';
  import { useRouter } from 'vue-router';
import Porofile from '@/components/Porofile.vue';

  const router = useRouter();
  const userData = JSON.parse(localStorage.getItem("userData")) || null;
  if(!userData){
    router.push("/register");
  }
</script>

<style>
</style>