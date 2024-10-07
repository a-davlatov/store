<script setup>
import { onMounted, ref } from 'vue'
import { store } from '../composables/store.js'
import { getOrders } from '../api/order.js'

import OrderItem from '../components/order/OrderItem.vue'
import EmptyInfoBlock from '../components/EmptyInfoBlock.vue'

const orders = ref([])

onMounted( async () => {
  if (!store.signedIn) {
    return
  }

  try {
    store.loading = true
    const { data } = await getOrders()
    orders.value = data
  } catch (error) {
    console.error('Error: ', error.message)
  } finally {
    store.loading = false
  }
})
</script>

<template>
  <div class="my-10">
    <div class="container">
      <h1 v-if="orders.length > 0 || store.loading" class="text-2xl font-bold">Мои заказы</h1>

      <EmptyInfoBlock 
        v-else
        title="Вы ничего не заказывали"
        sub-title="Вы нищеброд? Сделайте хотя бы один заказ."
      />

      <OrderItem 
        v-for="order in orders" 
        :key="order.id"
        :order-id="order.id"
        :order-date="order.order_date"
        :total-price="order.totalPrice"
        :order-items="order.items"
      />

    </div>
  </div>
</template>