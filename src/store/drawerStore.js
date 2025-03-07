import { defineStore } from 'pinia'

export const useDrawerStore = defineStore('drawer', {
  state: () => ({
    drawerOpen: false,
    cart: [],
    orderCreated: null,
  }),
  getters: {
    isOpen: state => state.drawerOpen
  },
  actions: {
    toggle() {
      this.drawerOpen = !this.drawerOpen
      this.orderCreated = null
    }
  }
})