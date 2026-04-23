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
import { ref, inject } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
console.log('route.path: ', route.path);

const goAboutPage = () => {
	router.push('/about');
};

const items = ref(['사과', '딸기', '포도', '바나나']);

// const person = inject('person');
// console.log('inject - person.name: ', person.name);
</script>

<style lang="scss" scoped></style>
