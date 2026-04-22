<!-- <template>
	<Transition>
		<div v-if="show" :class="typeStyle" class="app-alert alert" role="alert">
			{{ message }}
		</div>
	</Transition>
</template> -->

<template>
	<Transition name="slice">
		<div v-if="show" :class="typeStyle" class="app-alert alert" role="alert">
			{{ message }}
		</div>
	</Transition>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
	show: {
		type: Boolean,
		default: false,
	},
	message: {
		type: String,
		required: true,
	},
	type: {
		type: String,
		default: 'error',
		validator: value => ['success', 'error'].includes(value),
	},
});

const typeStyle = computed(() =>
	props.type === 'error' ? 'alert-danger' : 'alert-primary',
);

const typeStyle2 = computed(() =>
	props.type === 'error' ? 'alert-danger' : 'alert-primary',
);
</script>

<!-- <style scoped>
.app-alert {
	position: fixed;
	top: 10px;
	right: 10px;
}
.v-enter-from,
.v-leave-to {
	opacity: 0;
}

.v-enter-active,
.v-leave-active {
	transition: opacity 0.5s ease;
}

.v-enter-to,
.v-leave-from {
	opacity: 1;
}
</style> -->

<style scoped>
.app-alert {
	position: fixed;
	top: 10px;
	right: 10px;
}
.slice-enter-from,
.slice-leave-to {
	opacity: 0;
	transform: translateY(-30px);
}

.slice-enter-active,
.slice-leave-active {
	transition: all 0.5s ease;
}

.slice-enter-to,
.slice-leave-from {
	opacity: 1;
	transform: translateY(0px);
}
</style>
