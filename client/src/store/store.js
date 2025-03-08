import { defineStore } from "pinia";

export const useMainStore = defineStore("main", {
    state: () => ({
        games: []
    }),
    actions: {
        getCatalogGames(){
            
        }
    }
})