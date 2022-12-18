import { defineStore } from "pinia";

export const useAuth = defineStore({
    id: 'auth',
    state: () => ({
        user: {
            name: "",
        }
    }),
    getters: {
        getAuthName(state){
            return state.user.name
        }
    },
    actions: {
        async login(name) {
            this.user.name = name;
        },
    },
    //Save custom data through page refresh
    persist: {
        enabled: true,
        strategies: [
          { storage: localStorage, paths: ['user'] },
        ],
      },
})