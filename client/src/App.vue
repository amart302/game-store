<template>
    <router-view></router-view>
</template>

<script>
import { useMainStore } from './store/store';

export default {
  name: 'App',
  setup(){
    const mainStore = useMainStore();
    return { mainStore };
  },
  created(){
    this.mainStore.fetchGames();
    this.mainStore.getUserData();
  }
};
</script>

<style>
  @import './assets/main.css';
</style>