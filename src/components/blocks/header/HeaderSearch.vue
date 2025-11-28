<script setup>
import { getProducts } from '@/api/products.js'
import { useFetchFavorites } from '@/composables/useFetchFavorites.js'
import { useRefreshIsAddedValue } from '@/composables/useRefreshIsAddedValue.js'
import { useFiltersStore } from '@/store/filtersStore.js'
import { useIsLoadingStore } from '@/store/isLoadingStore.js'
import { useProductsStore } from '@/store/productsStore'
import debounce from 'lodash.debounce'
import { watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const filtersStore = useFiltersStore()
const loadingStore = useIsLoadingStore()
const productsStore = useProductsStore()

const route = useRoute()
const router = useRouter()

const fetchProducts = async () => {
  const params = {}
  try {
    loadingStore.loading = true
    params.sortBy = filtersStore.sortBy
    params.title = `*${filtersStore.searchQuery}*`

    const { data } = await getProducts(params)
    productsStore.products = data
    filtersStore.resetPriceFilters()

    useRefreshIsAddedValue()
    useFetchFavorites()
  } catch (error) {
    console.error('An error accured: ', error.message)
  } finally {
    loadingStore.loading = false
  }
}

watch(() => filtersStore.searchQuery, debounce(() => {
  if (filtersStore.searchQuery !== '') {
    router.push({ name: 'search', query: { title: filtersStore.searchQuery } })
    fetchProducts()
  }
  if (filtersStore.searchQuery === '' && route.query.title) {
    router.push('/')
  }
}, 500))

watch(() => route.path, () => {
  if (!route.query.title) filtersStore.searchQuery = ''
})
</script>

<template>
  <div
    role="search"
    class="relative -order-1 sm:-order-none"
  >
    <img
      src="/search.svg"
      alt=""
      loading="lazy"
      decoding="async"
      width="16"
      height="16"
      class="absolute top-2 left-3.5"
    >
    <input
      v-model.trim="filtersStore.searchQuery"
      placeholder="Поиск"
      type="search"
      name="search"
      aria-label="Поиск по товарам"
      class="border border-gray-500 py-1 pl-10 pr-4 outline-none focus:border-black w-full sm:w-auto"
    />

    <button
      v-if="filtersStore.searchQuery"
      @click="filtersStore.searchQuery = ''"
      type="button"
      aria-label="Очистить поле поиска"
      class="absolute right-3.5 top-1.5 text-gray-500 hover:text-black transition-colors"
    >
      ✕
    </button>
  </div>
</template>