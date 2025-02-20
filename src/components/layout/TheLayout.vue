<script setup>

import { onMounted, watch } from 'vue'

import { authUser } from '@/api/user.js'
import TheDrawer from '@/components/blocks/drawer/TheDrawer.vue'
import { useRefreshIsAddedValue } from '@/composables/useRefreshIsAddedValue.js'
import { useAuthStore } from '@/store/authStore.js'
import { useCartStore } from '@/store/cartStore.js'
import { useDrawerStore } from '@/store/drawerStore.js'
import TheFooter from './TheFooter.vue'
import TheHeader from './TheHeader.vue'

const cartStore = useCartStore()
const drawerStore = useDrawerStore()
const authStore = useAuthStore()

onMounted(() => {
  const localCart = localStorage.getItem('cart')
  cartStore.cart = localCart ? JSON.parse(localCart) : []

  if (localStorage.getItem('user_data')) {
    const userData = JSON.parse(localStorage.getItem('user_data'))
    authStore.set(userData)
    
    try {
      authUser()
    } catch (error) {
      authStore.clear()
      localStorage.removeItem('user_data')
      console.error('Unauthorized: ', error.message)
    }
  }
  
})

watch(() => cartStore.cart, () => {
  localStorage.setItem('cart', JSON.stringify(cartStore.cart))
  useRefreshIsAddedValue()
},
{ deep: true })

</script>

<template>

  <TheHeader />

  <main class="flex-auto">
    <RouterView />
  </main>

  <TheFooter />

  <TheDrawer v-if="drawerStore.isOpen" />

</template>