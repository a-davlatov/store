<script setup>

import { ref, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { store } from '../../composables/store.js'

import TheBurger from '../TheBurger.vue'
import TheSearch from '../TheSearch.vue'

const route = useRoute()
const router = useRouter()

const showNav = ref(false)

const logout = () => {
  router.push('/login')
  store.signedIn = false
  store.userData = null
  localStorage.removeItem('userData')
}

watch(() => route.params.category, () => showNav.value = false)

</script>

<template>
  <header :class="{ 'show-nav': showNav }">
    <div class="container">
      <div class="flex py-5 items-center justify-between">
        <RouterLink to="/" class="sm:text-3xl text-2xl font-bold logo">vue moda</RouterLink>
        <div class="flex items-center gap-5">
          <RouterLink v-if="!store.signedIn" to="/login"
            class="py-1 px-5 border border-black rounded hover:bg-black hover:text-white transition login">
            Войти
          </RouterLink>
          <button 
            v-else 
            type="button"
            class="relative flex items-center gap-2 hover:text-slate-400 transition profile-btn"
            >
            <i class="bi bi-person-circle text-xl sm:text-base"></i>
            <span class="hidden sm:block text-sm">Профиль</span>

            <div class="pt-10 absolute top-0 -right-16 z-20 profile-item invisible opacity-0 transition min-w-64">
              <div class="bg-white">
                <div class="flex items-center gap-2 p-3 profile-head">
                  <div class="w-10 h-10 rounded-2xl bg-sky-200 flex items-center justify-center">
                    <span class="text-2xl text-white">{{ store.userData.data.name[0] }}</span>
                  </div>
                  <div>
                    <div class="text-left text-base whitespace-nowrap">{{ store.userData.data.name + ' ' +
                      store.userData.data.surname }}</div>
                    <div class="text-left text-xs text-slate-500">{{ store.userData.data.email }}</div>
                  </div>
                </div>
                <ul class="list-reset py-3 border-t border-gray-200">
                  <li>
                    <RouterLink to="/orders" class="px-3 py-1 block text-left hover:bg-gray-100 hover:text-slate-400 transition">
                      Заказы</RouterLink>
                  </li>
                  <li>
                    <RouterLink to="/profile" class="px-3 py-1 block text-left hover:bg-gray-100 hover:text-slate-400 transition">
                      Мои данные</RouterLink>
                  </li>
                  <li>
                    <button type="button" @click="logout" class="w-full text-left px-3 py-1 block hover:bg-gray-100 hover:text-slate-400 transition">
                      Выйти</button>
                  </li>
                </ul>
              </div>
            </div>
          </button>

          <RouterLink v-show="store.signedIn" to="/favorites"
            class="flex items-center gap-2 hover:text-slate-400 transition">
            <i class="bi bi-heart text-xl sm:text-base"></i>
            <span class="hidden sm:block text-sm">Избранное</span>
          </RouterLink>

          <button @click="store.drawerToggle" class="flex items-center gap-2 hover:text-slate-400 transition">
            <div class="relative">
              <i class="bi bi-bag text-xl sm:text-base"></i>
              <span v-show="store.cart.length > 0"
                class="absolute -top-1  sm:-top-2 -right-2 z-10 text-xs text-center bg-orange-500 text-white w-4 h-4 rounded-xl">
                {{ store.cart.length }}
              </span>
            </div>
            <span class="hidden sm:block text-sm">Корзина</span>
          </button>
        </div>
      </div>
      <div class="flex items-center flex-row-reverse sm:flex-row justify-between gap-3 pt-5 border-t relative">
        <TheBurger v-model="showNav" />
        <nav class="absolute hidden sm:block sm:static top-16 -left-2 -right-3 z-10 bg-white ps-2 pb-3 sm:pb-0 sm:ps-0">
          <ul class="flex flex-col sm:flex-row gap-6 flex-wrap">
            <li class="text-black hover:text-slate-400 cursor-pointer transition">
              <RouterLink to="/products/hoodies">Худи и свитшоты</RouterLink>
            </li>
            <li class="text-black hover:text-slate-400 cursor-pointer transition">
              <RouterLink to="/products/sneakers">Кроссовки</RouterLink>
            </li>
            <li class="text-black hover:text-slate-400 cursor-pointer transition">
              <RouterLink to="/products/caps">Бейсболки</RouterLink>
            </li>
            <li class="text-black hover:text-slate-400 cursor-pointer transition">
              <RouterLink to="/products/panamas">Панамы</RouterLink>
            </li>
          </ul>
        </nav>

        <TheSearch />
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

footer .logo.router-link-active {
  color: #fff;
}

.login.router-link-active:hover {
  color: #fff;
}

.profile-item>div {
  box-shadow: 0 2px 8px #00000040;
}

.profile-btn:hover .profile-item {
  visibility: visible;
  opacity: 1;
  color: initial;
}

.profile-head {
  cursor: default;
}

@media (min-width: 640px) {
  .profile-item {
    left: -85px;
    right: unset;
  }
}
</style>