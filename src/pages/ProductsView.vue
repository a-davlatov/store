<script setup>
import { ref, onMounted, watch, provide, computed } from 'vue'
import { useRoute } from 'vue-router'

import ProductCard from '../components/ProductCard.vue'
import FiltersBlock from '../components/filters/FiltersBlock.vue'

import { useAddToCart } from '../composables/useAddToCart.js'
import { useAddToFavorites } from '../composables/useAddToFavorites.js'
import { useRemoveFromFavorites } from '../composables/useRemoveFromFavorites.js'
import { useRefreshIsAddedValue } from '../composables/useRefreshIsAddedValue.js'
import { useFetchFavorites } from '../composables/useFetchFavorites.js'
import { store } from '../composables/store.js'
import { getProducts } from '../api/products.js'

const route = useRoute()
store.products = []

const searchTitle = ref('')
const ProductsMinPrice = computed(() => Math.min(...store.products.map(item => item.price)))
const ProductsMaxPrice = computed(() => Math.max(...store.products.map(item => item.price)))

let params = {}

const fetchProducts = async (from, to, checkedBrands) => {
  try {
    store.loading = true
    params.sortBy = store.filters.sortBy
    if (from) {
      params['price[from]'] = from
    }
    if (to) {
      params['price[to]'] = to
    }
    if (checkedBrands) {
      params.brand = checkedBrands
    }

    if (store.filters.searchQuery !== '' && !route.params.category) {
      params.title = `*${store.filters.searchQuery}*`
      const { data } = await getProducts(params)
      
      store.products = data
      searchTitle.value = store.products.length > 0 ? `По запросу: "${store.filters.searchQuery}" найдено ${store.products.length} товаров` : `По запросу: "${store.filters.searchQuery}" ничего не найдено`
      useRefreshIsAddedValue()
      useFetchFavorites()
    } else {
      params.category = route.params.category
      const { data } = await getProducts(params)
      store.products = data
      useRefreshIsAddedValue()
      useFetchFavorites()
    }
  } catch (error) {
    console.error('An error accured: ', error.message)
  } finally {
    store.loading = false
  }
}

provide('fetchProducts', fetchProducts)

onMounted( async () => {
  await fetchProducts()

  store.filters.price.from = ProductsMinPrice.value
  store.filters.price.to = ProductsMaxPrice.value
})

watch(() => route.params.category, async () => {
  params = {}
  await fetchProducts()

  store.filters.price.from = ProductsMinPrice.value
  store.filters.price.to = ProductsMaxPrice.value
})

watch(() => route.query.title, async () => {
  if (!route.params.category) {
    params = {}
    await fetchProducts()
    
    store.filters.price.from = ProductsMinPrice.value
    store.filters.price.to = ProductsMaxPrice.value
  }
})

</script>

<template>
  <div class="mt-10">
    <div class="container">
      <h1 class="text-2xl font-bold mb-5">
        {{ store.filters.searchQuery !== '' ? searchTitle : route.params.category }}
      </h1>

      <div class="grid grid-cols-1 sm:grid-cols-8 gap-5">
        <FiltersBlock v-if="store.products.length > 0" />

        <div class="grid col-span-1 sm:col-span-5 lg:col-span-6 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 sm:gap-1 -mx-2 h-max">

          <ProductCard 
            v-for="product in store.products" 
            :key="product.id"
            :title="product.title" 
            :price="product.price"
            :old-price="product.oldPrice"
            :image-url="product.imageUrl"
            :is-added="product.isAdded"
            :is-favorite="product.isFavorite"
            @on-click-add="useAddToCart(product, store.cart)"
            @add-to-favorites="useAddToFavorites(product)"
            @remove-from-favorites="useRemoveFromFavorites(product)"
          />

        </div>
      </div>
    </div>
  </div>
</template>