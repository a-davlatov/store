<script setup>
import { MENU_DATA } from '@/constants/menu.data'
</script>

<template>
	<nav class="absolute hidden sm:block sm:static top-16 -left-2 -right-3 z-10 bg-white ps-2 pb-3 sm:pb-0 sm:ps-0">
		<ul class="flex flex-col sm:flex-row gap-6 flex-wrap">
			<li
				class="text-black hover:text-slate-400 cursor-pointer transition"
				v-for="item in MENU_DATA"
				:key="item.name"
			>
				<RouterLink :to="item.url">{{ item.name }}</RouterLink>
			</li>
		</ul>
	</nav>
</template>