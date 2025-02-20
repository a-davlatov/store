<script setup>

import orderProduct from './OrderProduct.vue'

defineProps({
  orderId: Number,
  orderDate: String,
  totalPrice: Number,
  orderItems: Array
})

</script>

<template>
  <div>
    <h4 class="mt-5">
      Заказ № 
      <span class="bg-yellow-300">{{ orderId }}</span> был оформлен 
      <span class="bg-yellow-300">{{ orderDate }}</span> и находится в статусе 
      <span class="bg-yellow-300">Обработка.</span>
    </h4>
    <div class="mb-5">Информация о заказе:</div>

    <div class="grid sm:grid-cols-2 grid-cols-3 border">
      <div class="font-bold p-3 sm:col-span-1 col-span-2">Товар</div>
      <div class="font-bold p-3">Итого</div>
    </div>

    <orderProduct 
      v-for="item in orderItems"
      :key="item.id"
      :image-url="item.imageUrl"
      :title="item.title"
      :quantity="item.quantity"
      :price="item.price"
    />

    <div class="grid sm:grid-cols-2 grid-cols-3 border border-t-0">
      <div class="font-bold p-3 sm:col-span-1 col-span-2">Итого</div>
      <div class="font-bold p-3">{{ totalPrice }} ₽</div>
    </div>

  </div>
</template>