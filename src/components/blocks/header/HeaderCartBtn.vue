<script setup>
import IconBag from '@/components/icons/IconBag.vue'
import { useDrawerStore } from '@/store/drawerStore.js'

const drawerStore = useDrawerStore()
</script>

<template>
	<button
		@click="drawerStore.toggle"
		class="flex items-center gap-2 hover:text-slate-400 transition"
	>
		<div class="relative">
			<IconBag class="text-xl sm:text-base" />
			<span
				v-show="drawerStore.cart.length > 0"
				class="absolute -top-1  sm:-top-2 -right-2 z-10 text-xs text-center bg-orange-500 text-white w-4 h-4 rounded-xl"
			>
				{{ drawerStore.cart.length }}
			</span>
		</div>
		<span class="hidden sm:block text-sm">Корзина</span>
	</button>
</template>