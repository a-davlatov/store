<script setup>

  defineProps({
    title: String,
    description: String,
    imageUrl: String
  })

</script>


<template>
  <div class="flex flex-col text-center items-center">
    <div class="w-45 h-45">
      <img
        :src="imageUrl" 
        :alt="title"
      >
    </div>
    <h2 class="-mt-4 text-xl sm:text-2xl font-medium">{{ title }}</h2>
    <p class="text-slate-400 text-sm sm:text-base mt-2">{{ description }}</p>
  </div>
</template>