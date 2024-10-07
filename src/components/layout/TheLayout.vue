<script setup>

import { onMounted, watch } from 'vue'

import TheHeader from './TheHeader.vue'
import TheFooter from './TheFooter.vue'
import TheDrawer from '../drawer/TheDrawer.vue'
import { store } from '../../composables/store.js'
import { authUser } from '../../api/user.js'
import { useRefreshIsAddedValue } from '../../composables/useRefreshIsAddedValue.js'

onMounted(() => {
  const localCart = localStorage.getItem('cart')
  store.cart = localCart ? JSON.parse(localCart) : []

  if (localStorage.getItem('userData')) {
    store.userData = JSON.parse(localStorage.getItem('userData'))
    store.signedIn = true
    
    try {
      authUser()
    } catch (error) {
      store.userData = null
      store.signedIn = false
      localStorage.removeItem('userData')
      console.error('Unauthorized: ', error.message)
    }
  }
  
})

watch(() => store.cart, () => {
  localStorage.setItem('cart', JSON.stringify(store.cart))
  useRefreshIsAddedValue()
},
{ deep: true })

</script>

<template>

  <TheHeader :signed-in="store.signedIn" />

  <main class="flex-auto">
    <RouterView />
  </main>

  <TheFooter />

  <TheDrawer v-if="store.drawerOpen" />

</template>