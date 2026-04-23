<!-- <template>
	<Transition>
		<div v-if="show" :class="typeStyle" class="app-alert alert" role="alert">
			{{ message }}
		</div>
	</Transition>
</template> -->

<!-- <template>
	<Transition name="slice">
		<div v-if="show" :class="typeStyle" class="app-alert alert" role="alert">
			{{ message }}
		</div>
	</Transition>
</template> -->

<template>
	<!-- 클릭을 할 때마다 Alert 가 나열되게 한다. 그래서 Props 을 여러 개를 받아야 해서 구조를 바꿔야 한다. -->
	<!-- app-alert 을 alert별로 설정이 아니라 부모 div 만들고 그 안에 넣어야지 단계적으로 보인다. -->
	<!-- TransitionGroup : 실제목록을 감싸야 한다. -->
	<div class="app-alert">
		<TransitionGroup name="slice">
			<div
				v-for="({ message, type }, index) in items"
				:key="index"
				:class="typeStyle(type)"
				class="alert"
				role="alert"
			>
				{{ message }}
			</div>
		</TransitionGroup>
	</div>
</template>

<script setup>
// 1) 기존에 1개의 Alert 만 표시된 경우
// import { computed } from 'vue';

// const props = defineProps({
// 	show: {
// 		type: Boolean,
// 		default: false,
// 	},
// 	message: {
// 		type: String,
// 		required: true,
// 	},
// 	type: {
// 		type: String,
// 		default: 'error',
// 		validator: value => ['success', 'error'].includes(value),
// 	},
// });

// const typeStyle = computed(() =>
// 	props.type === 'error' ? 'alert-danger' : 'alert-primary',
// );

// const typeStyle2 = computed(() =>
// 	props.type === 'error' ? 'alert-danger' : 'alert-primary',
// );

// 2) Alert 여러 번 받는다
defineProps({
	items: {
		type: Array,
	},
});

// 반복문에서 호출시에는 computed 사용 못함. 그래서 함수 사용.
// 중괄호 사용 안해서 return 문 불필요.
const typeStyle = type => (type === 'error' ? 'alert-danger' : 'alert-primary');
// 중괄호 사용하려면 return 문 필요.
const typeStyle2 = type => {
	return type === 'error' ? 'alert-danger' : 'alert-primary';
};
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
