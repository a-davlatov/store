<script setup>
import { computed, watch, inject } from 'vue'
import Slider from '@vueform/slider'
import "@vueform/slider/themes/default.css"
import { store } from '../../composables/store.js'

const rangeOptions = computed(() => ({
  min: store.filters.price.from,
  max: store.filters.price.to,
  tooltips: false,
  lazy: false,
  options: {
    behaviour: 'none',
  }
}))

const rangeValues = defineModel('rangeValues')
const productsBrands = defineModel('productsBrands')
const { getProductsBrands } = defineProps(['getProductsBrands'])
const fetchProducts = inject('fetchProducts')

const onEndRange = async () => {
  await fetchProducts(rangeValues.value[0], rangeValues.value[1])
  productsBrands.value = getProductsBrands()
}

watch(() => store.filters.price, () => {
  setTimeout(() => {
    rangeValues.value = [store.filters.price.from, store.filters.price.to]
  }, 100)
}, {deep: true})

</script>

<template>
  <h2 class="text-xl mb-5 mt-8">Цена</h2>

  <Slider
    v-if="rangeValues[0] !== Infinity"
    v-model="rangeValues"
    v-bind="rangeOptions"
    @change="onEndRange"
  >
  </Slider>

  <div class="flex gap-4 mt-4">
    <label class="w-1/2 relative">
      <span class="absolute top-2 left-3 text-sm text-slate-400">от</span>
      <input
        disabled
        type="number"
        class="w-full px-9 py-2 bg-white border border-slate-300 text-sm shadow-sm placeholder-slate-400 focus:outline-none"
        v-model="rangeValues[0]"
      >
      <span class="absolute top-2 right-3 text-sm text-slate-400">₽</span>
    </label>
    <label class="w-1/2 relative">
      <span class="absolute top-2 left-3 text-sm text-slate-400">до</span>
      <input
        disabled
        type="number"
        class="w-full px-9 py-2 bg-white border border-slate-300 text-sm shadow-sm placeholder-slate-400 focus:outline-none"
        v-model="rangeValues[1]"
      >
      <span class="absolute top-2 right-3 text-sm text-slate-400">₽</span>
    </label>
  </div>
</template>

<style>
.slider-connect {
  cursor: default;
}
</style>