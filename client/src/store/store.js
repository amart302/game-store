import axios from "axios";
import { defineStore } from "pinia";

export const useMainStore = defineStore("main", {
    state: () => ({
        userData: JSON.parse(sessionStorage.getItem("userData")) || null,
        topGames: [],
        gameCatalog: [],
        favourites: JSON.parse(localStorage.getItem("favourites")) || [],
        basket: JSON.parse(localStorage.getItem("basket")) || [],
        purchaseHistory: JSON.parse(localStorage.getItem("purchaseHistory")) || [],
        foundGames: [],
        showForm: false
    }),
    actions: {
        openRegisterForm(){
          this.showForm = "Register";
        },
        openLoginForm(){
          this.showForm = "Login";
        },
        closeForm(){
          this.showForm = false;
        },
        async fetchGames() {
            try {
              const response = await axios.get('https://67bcd30ded4861e07b3c0613.mockapi.io/games');
              const data = response.data[0];
              this.topGames = data.top_games || [];
              this.gameCatalog = (data.game_catalog || []).map(game => ({ ...game }));
            } catch (error) {
              console.error('Ошибка загрузки игр:', error);
            }
        },
        updateUserData(){
          if(!this.userData) return;
          const users = JSON.parse(localStorage.getItem('users')) || [];
          const foundUser = users.find(item => item.id === this.userData.id);
          this.userData = foundUser;
        },
        addToFavourites(game) {
          const isAlreadyFavourite = this.favourites.some(item => item.id == game.id);
          if (isAlreadyFavourite) {
            this.favourites = this.favourites.filter(fav => fav.id !== game.id);
          } else {
            this.favourites.push({
              id: game.id,
              name: game.name,
              large_capsule_image: game.large_capsule_image,
              final_price: game.final_price,
              windows_available: game.windows_available,
              mac_available: game.mac_available,
              linux_available: game.linux_available
            });
          }
          localStorage.setItem('favourites', JSON.stringify(this.favourites));
        },
        addToBasket(game) {
          const product = {
            id: game.id,
            name: game.name,
            final_price: `${game.final_price} ₽`,
            large_capsule_image: game.large_capsule_image,
            windows_available: game.windows_available,
            linux_available: game.linux_available,
            mac_available: game.mac_available,
            count: 1,
          };
          const existing = this.basket.find(item => item.id === product.id);
          if (existing) {
            existing.count += 1;
          } else {
            this.basket.push(product);
          }
          localStorage.setItem('basket', JSON.stringify(this.basket));          
        },
        increaseQuantity(id) {
          this.basket = this.basket.map(item => {
            if (item.id === id) item.count += 1;
            return item;
          });
          localStorage.setItem('productsInBasketInGames', JSON.stringify(this.basket));
        },
        decreaseQuantity(id) {
          this.basket = this.basket.map(item => {
            if (item.id === id && item.count > 1) item.count -= 1;
            return item;
          });
          localStorage.setItem('productsInBasketInGames', JSON.stringify(this.basket));
        },
        removeFromCart(id) {
          this.basket = this.basket.filter(item => item.id !== id);
          localStorage.setItem('basket', JSON.stringify(this.basket));
        },
    },
});