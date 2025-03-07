<script setup>
import { MENU_DATA } from '@/constants/menu.data'
</script>

<template>
	<nav class="shadow-md sm:shadow-none absolute hidden sm:block sm:static top-16 -left-4 -right-4 z-10 bg-white px-4 pb-3 pt-2 sm:p-0">
		<ul class="flex flex-col sm:flex-row gap-4 sm:gap-6 flex-wrap">
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