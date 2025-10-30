<script setup>
import WebGL from 'three/addons/capabilities/WebGL.js'
import { onMounted } from 'vue'

import HomeSceneSneaker from '@/components/blocks/home/HomeSceneSneaker.vue'
import HomeSwiperIntro from '@/components/blocks/home/HomeSwiperIntro.vue'
import HomeSwiperProducts from '@/components/blocks/home/HomeSwiperProducts.vue'

onMounted(() => {
  if (!WebGL.isWebGL2Available()) console.warn('Warning : Your graphics card does not seem to support WebGL 2')
})
</script>

<template>
  <HomeSceneSneaker v-if="WebGL.isWebGL2Available()" />

  <HomeSwiperIntro v-else />

  <HomeSwiperProducts />
</template>