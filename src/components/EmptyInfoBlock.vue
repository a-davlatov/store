<script setup>
defineProps({
  title: String,
  subTitle: String,
})
</script>

<template>
  <div class="sm:mt-80 mt-60 text-center">
    <div>
      <h2 class="sm:text-2xl text-xl font-bold mb-1">{{ title }}</h2>
      <p class="text-slate-400">{{ subTitle }}</p>
    </div>
  </div>
</template>