import axios from "axios";
import { defineStore } from "pinia";

export const useMainStore = defineStore("main", {
    state: () => ({
        userData: JSON.parse(sessionStorage.getItem("userData")) || null,
        topGames: [],
        gameCatalog: [],
        favourites: JSON.parse(localStorage.getItem("favourites")) || [],
        basket: JSON.parse(localStorage.getItem("basket")) || [],
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
    },
});