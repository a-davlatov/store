<script setup>
const { userName } = defineProps({
	userName: String
})
</script>

<template>
	<div class="sm:w-40 sm:h-40 w-20 h-20 avatar bg-sky-200 flex items-center justify-center">
		<span class="text-2xl sm:text-6xl text-white">{{ userName[0] }}</span>
	</div>
</template>

<style scoped>
.avatar {
	border-radius: 50px;
}
</style>