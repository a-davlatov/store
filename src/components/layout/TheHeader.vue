<script setup>

import { useAuthStore } from '@/store/authStore.js'
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'

import HeaderBurger from '../blocks/header/HeaderBurger.vue'
import HeaderCartBtn from '../blocks/header/HeaderCartBtn.vue'
import HeaderMenu from '../blocks/header/HeaderMenu.vue'
import HeaderProfileBtn from '../blocks/header/HeaderProfileBtn.vue'
import HeaderSearch from '../blocks/header/HeaderSearch.vue'

const route = useRoute()
const authStore = useAuthStore()
const showNav = ref(false)

watch(() => route.params.category, () => showNav.value = false)

</script>

<template>
  <header :class="{ 'show-nav': showNav }">
    <div class="container">
      <div class="flex py-5 items-center justify-between">
        <RouterLink
          to="/"
          class="sm:text-3xl text-2xl font-bold logo"
        >vue moda</RouterLink>
        <div class="flex items-center gap-5">
          <RouterLink
            v-if="!authStore.isAuth"
            to="/login"
            class="py-1 px-5 border border-black rounded hover:bg-black hover:text-white transition login"
          >
            Войти
          </RouterLink>
          <HeaderProfileBtn v-else />

          <RouterLink
            v-show="authStore.isAuth"
            to="/favorites"
            class="flex items-center gap-2 hover:text-slate-400 transition"
          >
            <i class="bi bi-heart text-xl sm:text-base"></i>
            <span class="hidden sm:block text-sm">Избранное</span>
          </RouterLink>

          <HeaderCartBtn />
        </div>
      </div>
      <div class="flex items-center flex-row-reverse sm:flex-row justify-between gap-3 pt-5 border-t relative">
        <HeaderBurger v-model="showNav" />
        <HeaderMenu />
        <HeaderSearch />
      </div>
    </div>
  </header>
</template>

<style>
header.show-nav nav {
  display: flex;
}

header.show-nav .burger__item {
  opacity: 0;
}

header.show-nav .burger::before {
  transform: rotate(-45deg);
}

header.show-nav .burger::after {
  transform: rotate(45deg);
}

header.show-nav .burger::before,
header.show-nav .burger::after {
  top: 50%;
}

.logo.router-link-active,
.login.router-link-active {
  color: #000;
  pointer-events: none;
}

.login.router-link-active:hover {
  color: #fff;
}
</style>