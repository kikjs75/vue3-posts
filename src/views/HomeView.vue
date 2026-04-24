<template>
	<div>
		<h2>Home View</h2>
		<!-- <p>{{ $route }}</p> -->
		<p>{{ $route.path }}</p>
		<p>{{ $route.name }}</p>
		<button class="btn btn-primary" @click="goAboutPage">
			About 으로 이동
		</button>

		<!-- // 주는 그대로 객체 받음. // {item: "사과", index: 0} => item : 객체 자체
		받음. -->
		<!-- 
		<hr class="my-4" />
		<AppGrid2 :items="items" v-slot="item">
			<AppCard>{{ item }}</AppCard>
		</AppGrid2> -->

		<!-- // 구조분해로 item 만 받음 // {item: "사과", index: 0} => { item } :
		객체에서 item 만 받음. -->
		<hr class="my-4" />
		<AppGrid :items="items" :col-class="'col-4'" v-slot="{ item }">
			<AppCard>{{ item }}</AppCard>
		</AppGrid>

		<h2>{{ position }}</h2>
		<h2>x:{{ x }}, y:{{ y }}</h2>

		<!-- <hr class="my-4" />
		<h2>{{ $person.name }}</h2>
		<button class="btn btn-primary" @click="person.say">click person</button> -->

		<!-- 
		<hr class="my-4" />
		<div class="row g-3">
			<div v-for="(item, index) in items" :key="index" class="col-4">
				<AppCard>{{ item }}</AppCard>
			</div>
		</div> -->
	</div>
</template>

<script>
export default {
	created() {
		// console.log('HomeView(person.name)', this.$person.name);
		// this.$person.say();
	},
};
</script>

<script setup>
import router from '@/router';
// import { post } from 'node_modules/axios/index.cjs';
import { ref, inject, reactive, toRef, toRefs } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
console.log('route.path: ', route.path);

const goAboutPage = () => {
	router.push('/about');
};

const items = ref(['사과', '딸기', '포도', '바나나']);

// const person = inject('person');
// console.log('inject - person.name: ', person.name);

const position = reactive({
	x: 100,
	y: 1000,
});

// const x = position.x;
// const { x, y } = position; // 위의 postion 과 다르고 참조도 아니다.

// ref : 위의 postion 과 다르고 참조이기는 하지만 서로 동기화는 안 되어져 있다.
// const x = ref(position.x);
// const y = ref(position.y);
// console.log('x typeof : ', typeof x.value);
// console.log('y typeof : ', typeof y.value);

// 기존 반응용 객체에서(postion) 에서 뽑아낼 때 동기화 가능하게 하는 게 toRef(), toRefs() 이다.
// const x = toRef(position, 'x');
// const y = toRef(position, 'y');
const { x, y } = toRefs(position);
</script>

<style lang="scss" scoped></style>
