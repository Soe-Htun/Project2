import { defineStore } from "pinia";

export const players = defineStore({
    id: 'players',
    state: () => ({
        // user: {
        //     name: "",
        // }
        players: {
            id: "",
            first_name: "",
            last_name: "",
            position: "",
            team: {
                id: "",
                name: "",
                full_name: "",
                city: "",
                division: ""
            }
        },
        teams: {
            id: "",
            name: "",
            full_name: "",
            city: "",
            division: "" 
        }
    }),
    getters: {
    },
    actions: {
    },
    //Save custom data through page refresh
    persist: {
        enabled: true,
        strategies: [
          { storage: localStorage, paths: ['players', 'teams'] },
        ],
      },
})