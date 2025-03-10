import axios from "axios";
import { defineStore } from "pinia";

export const useMainStore = defineStore("main", {
    state: () => ({
        userData: null,
        topGames: [],
        gameCatalog: [],
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
        checkUserSession() {
          console.log(123);
          
          const userSession = sessionStorage.getItem('userData');
          if (!userSession) return;
      
          try {
              const user = JSON.parse(userSession);
              const users = JSON.parse(localStorage.getItem('users')) || [];
      
              const existingUser = users.find(item => item.id === user.id);
      
              if (existingUser) {
                  this.userData = existingUser;
                  sessionStorage.setItem('userData', JSON.stringify(existingUser));
              } else {
                  console.warn('Пользователь не найден в localStorage');
                  sessionStorage.removeItem('userData');
              }
          } catch (error) {
              console.error('Ошибка при проверке сессии пользователя:', error);
              sessionStorage.removeItem('userData');
          }
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