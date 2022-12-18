import { defineStore } from 'pinia'
import createPersistedState from 'vuex-persistedstate'
import auth from './modules/auth'

export const createStore = defineStore({
  id: 'index',

  modules: {
    auth
  },
  state: () => ({ }),
  getters: { },
  actions: { },
  plugins: [createPersistedState]
})
