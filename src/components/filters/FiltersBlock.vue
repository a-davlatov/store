<script setup>

import FiltersBrands from './FiltersBrands.vue'
import FiltersSort from './FiltersSort.vue'
import FiltersPrice from './FiltersPrice.vue'
import { ref } from 'vue'
import { store } from '../../composables/store.js'

const rangeValues = ref([store.filters.price.from, store.filters.price.to])
const productsBrands = ref('')

const getProductsBrands = () => {
  const brands = store.products.map(item => item.brand)
  const brandsUnique = brands.reduce(
    (acc, item) => (acc.set(item, (acc.get(item) || 0) + 1), acc),
    new Map()
  )
  return Object.entries(Object.fromEntries(brandsUnique.entries()))
}

</script>

<template>
  <div class="col-span-1 sm:col-span-3 lg:col-span-2">

    <FiltersSort />

    <FiltersPrice 
      :get-products-brands="getProductsBrands"
      v-model:range-values="rangeValues"
      v-model:products-brands="productsBrands"
    />

    <FiltersBrands
      v-if="store.filters.searchQuery === ''"
      :get-products-brands="getProductsBrands"
      v-model:range-values="rangeValues"
      v-model:products-brands="productsBrands"
    />

  </div>
</template>