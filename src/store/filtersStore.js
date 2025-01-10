import { defineStore } from 'pinia'

export const useFiltersStore = defineStore('filters', {
  state: () =>({
    sortBy: 'title',
    searchQuery: '',
    price: {
      from: 500,
      to: 999999,
    },
  })
})