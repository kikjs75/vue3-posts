<template>
	<div>
		<h2>About View</h2>
		<!-- <p>{{ $route }}</p> -->
		<p>{{ $route.path }}</p>
		<p>{{ $route.name }}</p>
		<button class="btn btn-primary" @click="$router.push('/')">
			Home 으로 이동
		</button>
		<h2>Store</h2>
		<!-- <p>counter: {{ store.counter }}</p>
		<p>counter2: {{ counter }}</p>
		<p>doubleCount: {{ store.doubleCount }}</p>
		<p>doubleCountPlusOne: {{ store.doubleCountPlusOne }}</p> -->
		<!-- <button @click="store.increment()">Click!!</button> -->

		<p>counter: {{ counter }}</p>
		<p>doubleCount: {{ doubleCount }}</p>
		<p>doubleCountPlusOne: {{ doubleCountPlusOne }}</p>
		<button @click="increment()">Click!!</button>
	</div>
</template>

<script setup>
import { useRoute } from 'vue-router';
import { useCounterStore } from '@/stores/counter';
import { storeToRefs } from 'pinia';

const route = useRoute();
console.log('route.path: ', route.path);

// store 는 reactive 객체.
// 그래서 구조분해하면 반응형 깨진다.
const store = useCounterStore();
console.log('store: ', store); // Proxy(Object) 표시.
// const { counter } = store; // counter 는 Number 형이다. 반응형 아니다.
const { counter, doubleCount, doubleCountPlusOne } = storeToRefs(store); // storeToRefs 사용해서 반응형 유지.
const { increment } = store; // 함수이여서 상관 없음.

counter.value = 100; // 바로 변경 가능.

// 그리고 바로 호출해서 사용 가능.
// increment();
// increment();
// increment();
/*
state, getter : storeToRefs() 통해서 구조분해해서 가져오고
actions : 그대로 구조분해해서 가져오면 된다. 그리고 바로 호출해서 사용 가능.

component	   pinia
stated 		=> state
computed 	=> getter
method 		=> actions
*/
</script>

<style lang="scss" scoped></style>
