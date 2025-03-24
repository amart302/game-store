<template>
    <div class="offersCardsConteiner">
      <div class="offersCard" style="background: linear-gradient(131.39deg, #1dbe53 -11.11%, #ace238 73.42%)">
        <h2>Играй уже сейчас в Minecraft Legends</h2>
        <div class="offers_priceBlock">
          <span class="offers_priceWithDiscount">2 399 ₽</span>
          <span class="offers_discount">-50%</span>
          <span class="offers_priceWithoutDiscount">1 399 ₽</span>
        </div>
        <div class="offers_btns">
          <button class="offersBtn" @click="() => addToBasket(1928870)">В корзину</button>
          <button class="offersBtn" @click="()=> addToFavourites(1928870)">В избранное</button>
        </div>
        <img src="../assets/images/offersCardImg1.png" class="offersCardImg1" />
      </div>
      <div class="offersCard" style="background: linear-gradient(131.39deg, #ff3d23 -11.11%, #fda828 73.42%)">
        <h2>Играй уже сейчас в Minecraft dangerous</h2>
        <div class="offers_priceBlock">
          <span class="offers_priceWithDiscount">1 749 ₽</span>
          <span class="offers_discount">-25%</span>
          <span class="offers_priceWithoutDiscount">1 999 ₽</span>
        </div>
        <div class="offers_btns">
          <button class="offersBtn" @click="() => addToBasket(1672970)">В корзину</button>
          <button class="offersBtn" @click="()=> addToFavourites(1672970)">В избранное</button>
        </div>
        <img src="../assets/images/offersCardImg2.png" class="offersCardImg2" />
      </div>
    </div>
  </template>
  
  <script>
  import { useMainStore } from '@/store/store';
  import { useToast } from "vue-toastification";
  export default {
    name: 'OffersCards',
    setup(){
      const mainStore = useMainStore();
      const toast = useToast();
      return { mainStore, toast };
    },
    methods: {
      addToBasket(id){
      const addGames = [...this.mainStore.topGames, ...this.mainStore.gameCatalog];
      const product = addGames.find(item => item.id === id);
      this.mainStore.addToBasket(product);
      this.toast.success("Игра добавлена в корзину");
    },
    addToFavourites(id){
      const addGames = [...this.mainStore.topGames, ...this.mainStore.gameCatalog];
      const product = addGames.find(item => item.id === id);
      const check = this.mainStore.addToFavourites(product);
      if(check.status === "added"){
        this.toast.success("Игра добавлена в избранное");
      }else{
        this.toast.success("Игра удалена из избранного");
      }
    }
    }
  };
  </script>
  <style scoped>
  .offersCardsConteiner {
    margin-top: 100px;
    width: 100%;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 36px;
    overflow: hidden;
    padding-top: 60px;
  }
  
  .offersCard {
    position: relative;
    border-radius: 12px;
    padding: 20px;
  }
  
  .offersCard h2 {
    width: 300px;
    font-size: 28px;
    margin: 0;
    z-index: 2;
  }
  
  .offers_priceBlock {
    margin-top: 30px;
    display: flex;
    gap: 30px;
    font-size: 20px;
  }
  
  .offers_discount {
    color: #ffe817;
  }
  
  .offers_priceWithoutDiscount {
    color: #e4e2e2;
    text-decoration: line-through;
  }
  
  .offers_btns {
    display: flex;
    gap: 10px;
    margin-top: 50px;
  }
  
  .offersBtn {
    border: none;
    background-color: rgba(255, 255, 255, 0.2);
    padding-inline: 20px;
    padding-block: 16px;
    border-radius: 12px;
    font-size: 16px;
    cursor: pointer;
    transition: all 0.2s;
  }
  
  .offersBtn:hover {
    background-color: white;
    color: black;
  }
  
  .offersCardImg1 {
    width: 36%;
    position: absolute;
    top: -4rem;
    right: 0;
  }
  
  .offersCardImg2 {
    width: 54%;
    position: absolute;
    top: -7rem;
    right: -2rem;
    z-index: 1;
  }
  </style>