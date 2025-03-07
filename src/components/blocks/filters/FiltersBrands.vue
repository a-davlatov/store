<script setup>
import { watch } from 'vue'
import { useRoute } from 'vue-router'
import { useIsLoadingStore } from '@/store/isLoadingStore.js'

const loadingStore = useIsLoadingStore()
const route = useRoute()
const checkedBrands = defineModel('checkedBrands')
const props = defineProps(['rangeValues', 'productsBrands'])

const emit = defineEmits(['getProductsBrands', 'fetchProducts'])

const changeBrands = () => {
  const timeout = setInterval(() => {
    if (loadingStore.loading === false) {
      emit('getProductsBrands')
      clearTimeout(timeout)
    }
  }, 300)
}

watch(() => route.params.category, () => {
  checkedBrands.value = []
  changeBrands()
})
</script>

<template>
  <h2 class="text-xl mb-3 sm:mb-5 mt-5 sm:mt-8 font-medium">Бренд</h2>

  <div class="mt-3 sm:mt-4">
    <label
      class="flex gap-2 items-center cursor-pointer"
      v-for="(brand, index) in props.productsBrands"
      :key="index"
    >
      <input
        type="checkbox"
        :value="brand[0]"
        v-model="checkedBrands"
        @change="$emit('fetchProducts', false, props.rangeValues[0], props.rangeValues[1], props.checkedBrands)"
      >
      <div class="flex gap-1.5">
        <span>{{ brand[0] }}</span>
        <span class="text-sm text-slate-400">({{ brand[1] }})</span>
      </div>
    </label>
  </div>
</template>