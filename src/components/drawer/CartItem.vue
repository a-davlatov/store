<script setup>

defineProps({
  imageUrl: String,
  title: String,
  price: Number,
  quantity: Number,
})

</script>

<template>
  <div class="flex items-end relative w-full border border-slate-200 p-3 gap-4">
    <div class="w-20 h-24">
      <img 
        class="product-img" 
        :src="imageUrl" 
        :alt="title"
      >
    </div>

    <div class="flex flex-col flex-1">
      <p class="leading-5 mb-1 pr-5">{{ title }}</p>

      <div class="flex justify-between">
        <b>{{ price }} ₽</b>
        <span class="text-sm text-slate-400">{{ quantity }} шт.</span>
      </div>
      
      <button 
        class="opacity-50 hover:opacity-100 cursor-pointer transition text-2xl text-slate-300 absolute top-2.5 right-2.5"
        @click="$emit('removeFromCart')"
      >
        <i class="bi bi-x-square"></i>
      </button>
    </div>
  </div>
</template>

<style scoped>
.product-img {
  width: 100%;
  height: 100%;
}
</style>