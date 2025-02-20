<script setup>
const props = defineProps({
	title: String,
	errorText: String,
	successText: String,
})
</script>

<template>
	<div class="sm:mx-auto sm:w-full sm:max-w-sm">
		<h2 class="mt-10 text-center text-xl sm:text-2xl font-bold leading-9 tracking-tight text-gray-900">
			{{ props.title }}
		</h2>

		<div
			v-if="props.errorText"
			class="justify-center mt-8 -mb-8 text-base font-bold text-red-500 flex items-center gap-2"
		>
			<i class="bi bi-x-octagon"></i>
			{{ props.errorText }}
		</div>
		<div
			v-if="props.successText"
			class="justify-center mt-8 -mb-8 text-base font-bold text-lime-400 flex items-center gap-2"
		>
			<i class="bi bi-check-circle"></i>
			{{ props.successText }}
		</div>
	</div>
</template>