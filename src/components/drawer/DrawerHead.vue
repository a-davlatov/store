<script setup>

import { store } from '../../composables/store.js'

</script>

<template>
  <div class="flex items-center gap-3 sm:gap-5 mb-8">
    <button 
      @click="store.drawerToggle"
      class="opacity-30 cursor-pointer text-xl sm:text-2xl hover:opacity-100 transition hover:-translate-x-1"
    >
      <i class="bi bi-arrow-left"></i>
    </button>
    <h2 class="text-xl sm:text-2xl font-bold">Корзина</h2>
  </div>
</template>