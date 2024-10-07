<script setup>

defineProps({
  imageUrl: String,
  title: String,
  quantity: Number,
  price: Number,
})

</script>

<template>
  <div class="grid sm:grid-cols-2 grid-cols-3 border border-t-0">
    <div class="p-3 flex flex-col sm:flex-row sm:items-center sm:col-span-1 col-span-2 gap-3">
      <div class="w-16 h-16">
        <img 
          class="w-full h-full" 
          :src="imageUrl" 
          :alt="title"
        >
      </div>
      <div>{{ title + ' - ' + quantity }} шт.</div>
    </div>
    <div class="p-3 flex items-center">{{ price * quantity }} ₽</div>
  </div>
</template>