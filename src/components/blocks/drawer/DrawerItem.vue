<script setup>
import IconCloseSquare from '@/components/icons/IconCloseSquare.vue'

defineProps({
  imageUrl: String,
  title: String,
  price: Number,
  quantity: Number,
})
</script>

<template>
  <div class="flex items-end relative w-full border border-slate-200 p-3 gap-3">
    <div class="w-20 h-24">
      <img 
        class="product-img"
        loading="lazy"
        decoding="async"
        width="236"
        height="340"
        v-lazy="{ src: imageUrl }"
        :alt="title"
      >
    </div>

    <div class="flex flex-col flex-1 h-full justify-between">
      <div class="flex items-start gap-[6px] justify-between">
        <p class="mb-1 text-sm">{{ title }}</p>
        
        <button 
          class="opacity-50 hover:opacity-100 cursor-pointer transition text-2xl text-slate-300"
          aria-label="Удалить товар из корзины"
          @click="$emit('removeFromCart')"
        >
          <IconCloseSquare />
        </button>
      </div>

      <div class="flex justify-between">
        <strong class="text-sm sm:text-base">{{ price }} ₽</strong>
        <span class="text-sm text-slate-400">{{ quantity }} шт.</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.product-img {
  width: 100%;
  height: 100%;
}
</style>