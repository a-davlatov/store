import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    data: null,
    token: null,
    status: false
  }),
  getters: {
    isAuth: state => state.status
  },
  actions: {
    clear() {
      this.data = null
      this.token = null
      this.status = false
    },
    set(userData) {
      this.data = userData.data
      this.token = userData.token
      this.status = true
    }
  }
})