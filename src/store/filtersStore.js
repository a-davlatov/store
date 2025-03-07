import { useProductsStore } from '@/store/productsStore'
import { defineStore } from 'pinia'

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

// export const useFiltersStore = defineStore('filters', () => {
//   const productsStore = useProductsStore()
//   const state = reactive({
//     sortBy: 'title',
//     searchQuery: '',
//     price: {
//       from: 500,
//       to: 999999,
//     },
//     isVisible: false, // works on mobile devices only
//     searchTitle: productsStore.products.length > 0 ? `По запросу: "${state.searchQuery}" найдено ${productsStore.products.length} товаров` : `По запросу: "${state.searchQuery}" ничего не найдено`
//   })

//   function resetPriceFilters() {
//     const productsStore = useProductsStore()
//     state.price.from = productsStore.productsMinPrice
//     state.price.to = productsStore.productsMaxPrice
//   }

//   function toggle() {
//     state.isVisible = !state.isVisible
//   }

//   return { state, resetPriceFilters, toggle }
// })