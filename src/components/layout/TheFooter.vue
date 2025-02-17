<script setup>
import { MENU_DATA } from '@/constants/menu.data'
</script>

<template>
  <footer class="py-10 mt-16 bg-neutral-950">
    <div class="container">
      <RouterLink
        to="/"
        class="sm:text-3xl text-2xl text-white font-bold logo"
      >vue moda</RouterLink>

      <ul class="flex flex-col sm:flex-row gap-3 sm:gap-5 mt-5">
        <li
          class="text-white hover:text-slate-400 cursor-pointer transition"
          v-for="item in MENU_DATA"
          :key="item.name"
        >
          <RouterLink :to="item.url">{{ item.name }}</RouterLink>
        </li>
      </ul>

      <div class="text-slate-400 mt-5 pt-5 border-t">© Vue Moda 2024 - {{ new Date().getFullYear() }}. Все права
        защищены. </div>
    </div>
  </footer>
</template>