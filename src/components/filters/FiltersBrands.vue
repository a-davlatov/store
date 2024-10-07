<script setup>

import { ref, watch, inject, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { store } from '../../composables/store.js'

const route = useRoute()
const checkedBrands = ref([])

const rangeValues = defineModel('rangeValues')
const productsBrands = defineModel('productsBrands')
const { getProductsBrands } = defineProps(['getProductsBrands'])

const fetchProducts = inject('fetchProducts')
const changeBrands = () => {
  const timeout = setInterval(() => {
    if (store.loading === false) {
      productsBrands.value = getProductsBrands()
      clearTimeout(timeout)
    }
  }, 300)
}

onMounted(() => {
  productsBrands.value = getProductsBrands()
  changeBrands()
})

watch(() => route.params.category, () => {
  checkedBrands.value = []
  changeBrands()
})

</script>

<template>
  <h2 class="text-xl mb-5 mt-8">Бренд</h2>

  <div class="mt-4">
    
    <label 
      class="flex gap-2 items-center cursor-pointer"
      v-for="(brand, index) in productsBrands"
      :key="index"
    >
      <input 
        type="checkbox"
        :value="brand[0]"
        v-model="checkedBrands"
        @change="fetchProducts(rangeValues[0], rangeValues[1], checkedBrands)"
      >
      <div class="flex gap-1.5">
        <span>{{ brand[0] }}</span>
        <span class="text-sm text-slate-400">({{ brand[1] }})</span>
      </div>
    </label>
  </div>
</template>