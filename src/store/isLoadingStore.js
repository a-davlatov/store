import { defineStore } from 'pinia'

export const useIsLoadingStore = defineStore('isLoading', {
  state: () => ({
    loading: false
  }),
  actions: {
    set(data) {
      this.$patch({loading: data})
    }
  }
})