<script setup>

import { useFiltersStore } from '@/store/filtersStore.js'
import { computed } from 'vue'

const filtersStore = useFiltersStore()

const checkedBrands = defineModel('checkedBrands')
const rangeValues = defineModel('rangeValues')
const mayResetFilters = computed(() => checkedBrands.value.length > 0 || rangeValues.value[0] !== filtersStore.price.from || rangeValues.value[1] !== filtersStore.price.to)
const emit = defineEmits(['fetchProducts'])

const resetFilters = () => {
  checkedBrands.value = []
  rangeValues.value = [filtersStore.price.from, filtersStore.price.to]
	emit('fetchProducts', true, filtersStore.price.from, filtersStore.price.to)
}
</script>

<template>
	<button
		type="button"
		aria-label="Сбросить все фильтры"
		class="mt-6 py-1 px-5 border border-black rounded hover:bg-black hover:text-white transition"
		:class="{ 'disabled:border-slate-400 disabled:text-slate-400 disabled:pointer-events-none': !mayResetFilters }"
		:disabled="!mayResetFilters"
		@click="resetFilters"
	>Сбросить</button>
</template>