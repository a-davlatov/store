<script setup>

import { useFiltersStore } from '@/store/filtersStore.js'
import { useProductsStore } from '@/store/productsStore.js'
import { ref } from 'vue'
import FiltersBrands from './FiltersBrands.vue'
import FiltersPrice from './FiltersPrice.vue'
import FiltersSort from './FiltersSort.vue'

const productsStore = useProductsStore()
const filtersStore = useFiltersStore()

const rangeValues = ref([filtersStore.price.from, filtersStore.price.to])
const productsBrands = ref('')

const getProductsBrands = () => {
  const brands = productsStore.products.map(item => item.brand)
  const brandsUnique = brands.reduce(
    (acc, item) => (acc.set(item, (acc.get(item) || 0) + 1), acc),
    new Map()
  )
  return Object.entries(Object.fromEntries(brandsUnique.entries()))
}

</script>

<template>
  <div :class="{'show-filters': filtersStore.isVisible}" class="col-span-1 sm:col-span-3 lg:col-span-2 filters">
    <FiltersSort />

    <FiltersPrice 
      :get-products-brands="getProductsBrands"
      v-model:range-values="rangeValues"
      v-model:products-brands="productsBrands"
    />

    <FiltersBrands
      v-if="filtersStore.searchQuery === ''"
      :get-products-brands="getProductsBrands"
      v-model:range-values="rangeValues"
      v-model:products-brands="productsBrands"
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