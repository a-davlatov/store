<script setup>
const { userName } = defineProps({
	userName: String
})
</script>

<template>
	<div class="w-40 h-40 avatar bg-sky-200 flex items-center justify-center">
		<span class="text-6xl text-white">{{ userName[0] }}</span>
	</div>
</template>

<style scoped>
.avatar {
	border-radius: 50px;
}
</style>