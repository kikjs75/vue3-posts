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
import { useAlert } from '@/composables/alert';

// 2) Alert 여러 번 받는다. App.vue 에서 props 로 전달 되는 것은 깊이가 깊어지면 문제가 될 수 있다. 그래서 직접 받아서 처리한다.
// defineProps({
// 	items: {
// 		type: Array,
// 	},
// });

// 3) pinia : props 아닌 직접 가져온다.
const { alerts: items } = useAlert();

// 반복문에서 호출시에는 computed 사용 못함. 그래서 함수 사용.
// 중괄호 사용 안해서 return 문 불필요.
const typeStyle = type => (type === 'error' ? 'alert-danger' : 'alert-primary');
// 중괄호 사용하려면 return 문 필요.
</script>

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
