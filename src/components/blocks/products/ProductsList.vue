<script setup>
import { computed, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'

import FiltersBlock from '@/components/blocks/filters/FiltersBlock.vue'
import ProductCard from './ProductCard.vue'

import { getProducts } from '@/api/products.js'
import IconFilterSquare from '@/components/icons/IconFilterSquare.vue'
import IconFilterSquareFill from '@/components/icons/IconFilterSquareFill.vue'
import { useAddToCart } from '@/composables/useAddToCart.js'
import { useAddToFavorites } from '@/composables/useAddToFavorites.js'
import { useFetchFavorites } from '@/composables/useFetchFavorites.js'
import { useRefreshIsAddedValue } from '@/composables/useRefreshIsAddedValue.js'
import { useRemoveFromFavorites } from '@/composables/useRemoveFromFavorites.js'
import { useDrawerStore } from '@/store/drawerStore.js'
import { useFiltersStore } from '@/store/filtersStore.js'
import { useIsLoadingStore } from '@/store/isLoadingStore.js'
import { useProductsStore } from '@/store/productsStore'

const drawerStore = useDrawerStore()
const productsStore = useProductsStore()
const filtersStore = useFiltersStore()
const loadingStore = useIsLoadingStore()

const route = useRoute()
productsStore.clear()

const searchTitle = computed(() => productsStore.products.length > 0 ? `По запросу: "${filtersStore.searchQuery}" найдено ${productsStore.products.length} товаров` : `По запросу: "${filtersStore.searchQuery}" ничего не найдено`)
const ucFirst = (str) => str ? str[0].toUpperCase() + str.slice(1) : ''

const fetchProducts = async () => {
  const params = {}
  try {
    loadingStore.loading = true
    params.sortBy = filtersStore.sortBy
    params.category = route.params.category

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

const getGoods = () => {
  if (filtersStore.searchQuery === '') fetchProducts()
}

onMounted(getGoods)

watch(() => route.params.category, getGoods)
</script>

<template>
  <section class="mt-5 sm:mt-10">
    <div class="container">
      <div class="flex items-center justify-between gap-3 mb-3 sm:mb-5">
        <h1 class="text-xl sm:text-2xl font-bold" aria-live="polite">
          {{ filtersStore.searchQuery !== '' ? searchTitle : ucFirst(route.params.category) }}
        </h1>
        <button
          class="sm:hidden text-base flex items-center gap-1.5 font-medium justify-end"
          type="button"
          :aria-label="!filtersStore.isVisible ? 'Показать фильтры' : 'Скрыть фильтры'"
          @click="filtersStore.toggle"
        >
          <span>Filter</span>
          <IconFilterSquare v-if="!filtersStore.isVisible" />
          <IconFilterSquareFill v-else />
        </button>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-8 gap-5">
        <FiltersBlock v-if="productsStore.products.length > 0" />

        <ul
          :class="{ 'loading': loadingStore.loading }"
          class="relative grid col-span-1 sm:col-span-5 lg:col-span-6 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 sm:gap-1 -mx-2 h-max"
        >

          <ProductCard
            v-for="product in productsStore.products"
            :id="product.id"
            :key="product.id"
            :title="product.title"
            :price="product.price"
            :old-price="product.oldPrice"
            :image-url="product.imageUrl"
            :is-added="product.isAdded"
            :is-favorite="product.isFavorite"
            tag="li"
            @on-click-add="useAddToCart(product, drawerStore.cart)"
            @add-to-favorites="useAddToFavorites(product)"
            @remove-from-favorites="useRemoveFromFavorites(product)"
          />

        </ul>
      </div>
    </div>
  </section>
</template>

<style setup>
.loading::before {
  content: '';
  display: block;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 10;
  background-color: rgba(255, 255, 255, 0.5);
}
</style>