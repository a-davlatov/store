<script setup>
const props = defineProps({
	errorText: String,
	successText: String,
})
</script>

<template>
	<div
		v-if="props.errorText !== ''"
		class="justify-center mb-8 text-base font-bold text-red-500 flex items-center gap-2"
	>
		<i class="bi bi-x-octagon"></i>
		{{ props.errorText }}
	</div>
	<div
		v-if="props.successText !== ''"
		class="justify-center mb-8 text-base font-bold text-lime-400 flex items-center gap-2"
	>
		<i class="bi bi-check-circle"></i>
		{{ props.successText }}
	</div>
</template>