<script setup>
import { onMounted } from 'vue'

import { authUser } from '@/api/user.js'
import TheDrawer from '@/components/blocks/drawer/TheDrawer.vue'
import { useAuthStore } from '@/store/authStore.js'
import { useDrawerStore } from '@/store/drawerStore.js'
import TheFooter from './TheFooter.vue'
import TheHeader from './TheHeader.vue'

const drawerStore = useDrawerStore()
const authStore = useAuthStore()

onMounted(() => {
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
</script>

<template>

  <TheHeader />

  <main class="flex-auto">
    <RouterView />
  </main>

  <TheFooter />

  <TheDrawer v-show="drawerStore.isOpen" />

</template>