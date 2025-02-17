<script setup>
import { ref, onMounted, watch, provide } from 'vue'
import { useRoute } from 'vue-router'

import FiltersBlock from '@/components/filters/FiltersBlock.vue'
import ProductCard from './ProductCard.vue'

import { useAddToCart } from '../../composables/useAddToCart.js'
import { useAddToFavorites } from '../../composables/useAddToFavorites.js'
import { useRemoveFromFavorites } from '../../composables/useRemoveFromFavorites.js'
import { useRefreshIsAddedValue } from '../../composables/useRefreshIsAddedValue.js'
import { useFetchFavorites } from '../../composables/useFetchFavorites.js'
import { getProducts } from '../../api/products.js'
import { useIsLoadingStore } from '@/store/isLoadingStore.js'
import { useFiltersStore } from '@/store/filtersStore.js'
import { useCartStore } from '@/store/cartStore.js'
import { useProductsStore } from '@/store/productsStore'

const productsStore = useProductsStore()
const cartStore = useCartStore()
const filtersStore = useFiltersStore()
const loadingStore = useIsLoadingStore()

const route = useRoute()
productsStore.clear()

const searchTitle = ref('')
let params = {}
const ucFirst = (str) => str ? str[0].toUpperCase() + str.slice(1) : ''

const fetchProducts = async (from, to, checkedBrands) => {
  try {
    loadingStore.loading = true
    params.sortBy = filtersStore.sortBy
    if (from) {
      params['price[from]'] = from
    }
    if (to) {
      params['price[to]'] = to
    }
    if (checkedBrands) {
      params.brand = checkedBrands
    }

    if (filtersStore.searchQuery !== '' && !route.params.category) {
      params.title = `*${filtersStore.searchQuery}*`
      const { data } = await getProducts(params)
      
      productsStore.products = data
      searchTitle.value = productsStore.products.length > 0 ? `По запросу: "${filtersStore.searchQuery}" найдено ${productsStore.products.length} товаров` : `По запросу: "${filtersStore.searchQuery}" ничего не найдено`
      useRefreshIsAddedValue()
      useFetchFavorites()
    } else {
      params.category = route.params.category
      const { data } = await getProducts(params)
      productsStore.products = data
      useRefreshIsAddedValue()
      useFetchFavorites()
    }
  } catch (error) {
    console.error('An error accured: ', error.message)
  } finally {
    loadingStore.loading = false
  }
}

provide('fetchProducts', fetchProducts)

onMounted( async () => {
  await fetchProducts()
  filtersStore.resetPriceFilters()
})

watch(() => route.params.category, async () => {
  params = {}
  await fetchProducts()
  filtersStore.resetPriceFilters()
})

watch(() => route.query.title, async () => {
  if (!route.params.category) {
    params = {}
    await fetchProducts()
    filtersStore.resetPriceFilters()
  }
})

</script>

<template>
  <div class="mt-10">
    <div class="container">
      <h1 class="text-2xl font-bold mb-5 flex items-center justify-between gap-3">
        <span>{{ filtersStore.searchQuery !== '' ? searchTitle : ucFirst(route.params.category) }}</span>
        <div class="sm:hidden text-base flex items-center gap-1.5 font-medium justify-end" @click="filtersStore.toggle">
          <span>Filter</span>
          <i class="bi bi-filter-square" v-if="!filtersStore.isVisible"></i>
          <i class="bi bi-filter-square-fill" v-else></i>
        </div>
      </h1>

      <div class="grid grid-cols-1 sm:grid-cols-8 gap-5">
        <FiltersBlock v-if="productsStore.products.length > 0" />

        <div class="grid col-span-1 sm:col-span-5 lg:col-span-6 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 sm:gap-1 -mx-2 h-max">

          <ProductCard
            v-for="product in productsStore.products" 
            :key="product.id"
            :title="product.title" 
            :price="product.price"
            :old-price="product.oldPrice"
            :image-url="product.imageUrl"
            :is-added="product.isAdded"
            :is-favorite="product.isFavorite"
            @on-click-add="useAddToCart(product, cartStore.cart)"
            @add-to-favorites="useAddToFavorites(product)"
            @remove-from-favorites="useRemoveFromFavorites(product)"
          />

        </div>
      </div>
    </div>
  </div>
</template>