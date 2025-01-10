import { defineStore } from 'pinia'

export const useDrawerStore = defineStore('drawer', {
  state: () => ({
    drawerOpen: false
  }),
  getters: {
    isOpen: state => state.drawerOpen
  },
  actions: {
    toggle() {
      this.drawerOpen = !this.drawerOpen
    }
  }
})