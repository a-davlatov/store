<script setup>

import { getProducts } from '@/api/products.js'
import { useFetchFavorites } from '@/composables/useFetchFavorites.js'
import { useRefreshIsAddedValue } from '@/composables/useRefreshIsAddedValue.js'
import { useFiltersStore } from '@/store/filtersStore.js'
import { useIsLoadingStore } from '@/store/isLoadingStore.js'
import { useProductsStore } from '@/store/productsStore.js'
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import FiltersBrands from './FiltersBrands.vue'
import FiltersPrice from './FiltersPrice.vue'
import FiltersResetButton from './FiltersResetButton.vue'
import FiltersSort from './FiltersSort.vue'

const productsStore = useProductsStore()
const filtersStore = useFiltersStore()
const loadingStore = useIsLoadingStore()
const route = useRoute()

const rangeValues = ref([filtersStore.price.from, filtersStore.price.to])
const productsBrands = ref('')
const checkedBrands = ref([])

const getProductsBrands = () => {
  const brands = productsStore.products.map(item => item.brand)
  const brandsUnique = brands.reduce(
    (acc, item) => (acc.set(item, (acc.get(item) || 0) + 1), acc),
    new Map()
  )
  productsBrands.value = Object.entries(Object.fromEntries(brandsUnique.entries()))
}

const fetchProducts = async (changeBrands, from, to, checkedBrands) => {
  try {
    loadingStore.loading = true
    const params = {
      sortBy: filtersStore.sortBy,
      category: route.params.category,
      'price[from]': from,
      'price[to]': to,
    }

    if (checkedBrands && filtersStore.searchQuery === '') params.brand = checkedBrands
    if (filtersStore.searchQuery !== '' && !route.params.category) params.title = `*${filtersStore.searchQuery}*`

    const { data } = await getProducts(params)
    productsStore.products = data

    if (changeBrands) getProductsBrands()
    useRefreshIsAddedValue()
    useFetchFavorites()
  } catch (error) {
    console.error('An error accured: ', error.message)
  } finally {
    loadingStore.loading = false
  }
}

onMounted(getProductsBrands)

</script>

<template>
  <div
    :class="{ 'show-filters': filtersStore.isVisible }"
    class="col-span-1 sm:col-span-3 lg:col-span-2 filters"
  >
    <FiltersSort
      @fetch-products="fetchProducts"
      :checked-brands="checkedBrands"
      :range-values="rangeValues"
    />

    <FiltersPrice
      @fetch-products="fetchProducts"
      v-model:range-values="rangeValues"
      :checked-brands="checkedBrands"
    />

    <FiltersBrands
      v-if="filtersStore.searchQuery === ''"
      @fetch-products="fetchProducts"
      @get-products-brands="getProductsBrands"
      v-model:checked-brands="checkedBrands"
      :range-values="rangeValues"
      :products-brands="productsBrands"
    />

    <FiltersResetButton
      @fetch-products="fetchProducts"
      v-model:range-values="rangeValues"
      v-model:checked-brands="checkedBrands"
    />
  </div>
</template>

<style scoped>
@media (max-width: 640px) {
  .filters {
    display: none;
  }

  .filters.show-filters {
    display: block;
  }
}
</style>