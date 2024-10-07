<script setup>
import { watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import debounce from 'lodash.debounce'
import { store } from '../composables/store.js'

const route = useRoute()
const router = useRouter()

watch(() => store.filters.searchQuery, debounce(() => {
  if (store.filters.searchQuery !== '') {
    router.push({ name: 'search', query: { title: store.filters.searchQuery } })
  }
  if (store.filters.searchQuery === '' && route.query.title) {
    router.push('/')
  }
}, 500))

watch(() => route.path, () => {
  if (!route.query.title) {
    store.filters.searchQuery = ''
  }
})
</script>

<template>
  <div class="relative max-w-full">
    <img src="/search.svg" alt="search" class="absolute top-2 left-3.5">
    <input
      v-model="store.filters.searchQuery"
      placeholder="Поиск..."
      class="border border-gray-500 py-1 pl-10 pr-4 outline-none focus:border-black" 
    />
  </div>
</template>