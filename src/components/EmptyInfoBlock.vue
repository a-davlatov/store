<script setup>

import { store } from '../composables/store.js'

defineProps({
  title: String,
  subTitle: String,
})

</script>

<template>
  <div class="sm:mt-80 mt-60 text-center">
    <div v-if="store.userData">
      <h2 class="sm:text-2xl text-xl font-bold mb-1">{{ title }}</h2>
      <p class="text-slate-400">{{ subTitle }}</p>
    </div>
    <div v-else>
      <h2 class="text-xl font-bold">
        Чтобы посетить данную страницу,<br> нужно сначала 
        <RouterLink
          class="underline hover:no-underline" 
          to="/login"
        >
          войти
        </RouterLink> 
        на сайт.
      </h2>
    </div>
  </div>
</template>