import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export const useProductsStore = defineStore('products', () => {
  const products = ref([])
  const productsMinPrice = computed(() => Math.min(...products.value.map(item => item.price)))
  const productsMaxPrice = computed(() => Math.max(...products.value.map(item => item.price)))
  function clear() {
    products.value = []
  }

  return { products, clear, productsMinPrice, productsMaxPrice }
})
