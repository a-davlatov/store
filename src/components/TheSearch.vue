<script setup>
import { watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import debounce from 'lodash.debounce'
import { useFiltersStore } from '@/store/filtersStore.js'

const filtersStore = useFiltersStore()

const route = useRoute()
const router = useRouter()

watch(() => filtersStore.searchQuery, debounce(() => {
  if (filtersStore.searchQuery !== '') {
    router.push({ name: 'search', query: { title: filtersStore.searchQuery } })
  }
  if (filtersStore.searchQuery === '' && route.query.title) {
    router.push('/')
  }
}, 500))

watch(() => route.path, () => {
  if (!route.query.title) {
    filtersStore.searchQuery = ''
  }
})
</script>

<template>
  <div class="relative max-w-full">
    <img src="/search.svg" alt="search" class="absolute top-2 left-3.5">
    <input
      v-model="filtersStore.searchQuery"
      placeholder="Поиск..."
      class="border border-gray-500 py-1 pl-10 pr-4 outline-none focus:border-black" 
    />
  </div>
</template>