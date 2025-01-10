<script setup>
import { watch, inject } from 'vue'
import { useFiltersStore } from '@/store/filtersStore.js'

const filtersStore = useFiltersStore()
const fetchProducts = inject('fetchProducts')

watch(() => filtersStore.sortBy, () => {
  fetchProducts()
})
</script>

<template>
  <h2 class="text-xl mb-3 mt-2">Сортировка</h2>

  <input 
    class="hidden" 
    type="radio" 
    value="title" 
    v-model="filtersStore.sortBy" 
    id="sortBy_name"
  >
  <label 
    for="sortBy_name" 
    class="block cursor-pointer"
  >
    По названию
  </label>

  <input 
    class="hidden" 
    type="radio" 
    value="price" 
    v-model="filtersStore.sortBy" 
    id="sortBy_price"
  >
  <label 
    for="sortBy_price" 
    class="block cursor-pointer mt-1"
  >
    Цены: по возрастанию
  </label>

  <input 
    class="hidden" 
    type="radio" 
    value="-price" 
    v-model="filtersStore.sortBy" 
    id="sortBy_price_desc"
  >
  <label 
    for="sortBy_price_desc" 
    class="block cursor-pointer mt-1"
  >
    Цены: по убыванию
  </label>
</template>

<style>
input[type="radio"]:checked+label {
  color: rgb(249, 115, 22);
}

/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
</style>