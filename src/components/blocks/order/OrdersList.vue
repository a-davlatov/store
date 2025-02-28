<script setup>
import { getOrders } from '@/api/order.js'
import { useIsLoadingStore } from '@/store/isLoadingStore.js'
import { onMounted, ref } from 'vue'

import OrderItem from '@/components/blocks/order/OrderItem.vue'
import EmptyInfoBlock from '@/components/EmptyInfoBlock.vue'

const loadingStore = useIsLoadingStore()

const orders = ref([])

onMounted( async () => {
  try {
    loadingStore.loading = true
    const { data } = await getOrders()
    orders.value = data
  } catch (error) {
    console.error('Error: ', error.message)
  } finally {
    loadingStore.loading = false
  }
})
</script>

<template>
  <div class="my-10">
    <div class="container">
      <h1 v-if="orders.length > 0 || loadingStore.loading" class="text-2xl font-bold">Мои заказы</h1>

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