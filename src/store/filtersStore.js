import { defineStore } from 'pinia'
import { useProductsStore } from '@/store/productsStore'

export const useFiltersStore = defineStore('filters', {
  state: () =>({
    sortBy: 'title',
    searchQuery: '',
    price: {
      from: 500,
      to: 999999,
    },
    isVisible: false, // works on mobile devices only
  }),
  actions: {
    resetPriceFilters() {
      const productsStore = useProductsStore()
      this.price.from = productsStore.productsMinPrice
      this.price.to = productsStore.productsMaxPrice
    },
    toggle() {
      this.isVisible = !this.isVisible
    }
  }
})