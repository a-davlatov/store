<script setup>

defineProps({
  title: String,
  description: String,
  imageUrl: String,
  width: String,
  height: String,
})

</script>


<template>
  <div
    role="region"
    aria-labelledby="drawer-info-title"
    aria-describedby="drawer-info-desc"
    class="flex flex-col text-center items-center"
  >
    <div class="w-45 h-45">
      <img
        :src="imageUrl"
        :alt="title"
        :width="width"
        :height="height"
        loading="lazy"
        decoding="async"
      >
    </div>
    <h2
      id="drawer-info-title"
      class="-mt-4 text-xl sm:text-2xl font-medium"
    >{{ title }}</h2>
    <p
      id="drawer-info-desc"
      class="text-slate-400 text-sm sm:text-base mt-2"
    >{{ description }}</p>
  </div>
</template>