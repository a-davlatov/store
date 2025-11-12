<script setup>
import IconCheckCircle from '@/components/icons/IconCheckCircle.vue'
import IconCloseOctagon from '@/components/icons/IconCloseOctagon.vue'

const props = defineProps({
	errorText: String,
	successText: String,
})
</script>

<template>
	<div
		v-if="props.errorText !== ''"
		class="mb-8 text-base font-bold text-red-500 flex items-center gap-2"
	>
		<IconCloseOctagon />
		{{ props.errorText }}
	</div>
	<div
		v-if="props.successText !== ''"
		class="mb-8 text-base font-bold text-lime-400 flex items-center gap-2"
	>
		 <IconCheckCircle />
		{{ props.successText }}
	</div>
</template>