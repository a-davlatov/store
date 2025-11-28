<script setup>

import IconArrowLeft from '@/components/icons/IconArrowLeft.vue'
import { useDrawerStore } from '@/store/drawerStore.js'
const drawerStore = useDrawerStore()

</script>

<template>
  <div class="flex items-center gap-2 sm:gap-4 mb-8">
    <button 
      @click="drawerStore.toggle"
      class="opacity-30 cursor-pointer text-xl sm:text-2xl hover:opacity-100 transition hover:-translate-x-1"
      aria-label="Закрыть корзину"
    >
      <IconArrowLeft />
    </button>
    <h2 class="text-xl sm:text-2xl font-bold">Корзина</h2>
  </div>
</template>