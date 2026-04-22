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

		<!-- 
		<hr class="my-4" />
		<div class="row g-3">
			<div v-for="(item, index) in items" :key="index" class="col-4">
				<AppCard>{{ item }}</AppCard>
			</div>
		</div> -->
	</div>
</template>

<script setup>
import router from '@/router';
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import AppCard from '@/components/AppCard.vue';
import AppGrid from '@/components/AppGrid.vue';
import AppGrid2 from '@/components/AppGrid2.vue';

const route = useRoute();
console.log('route.path: ', route.path);

const goAboutPage = () => {
	router.push('/about');
};

const items = ref(['사과', '딸기', '포도', '바나나']);
</script>

<style lang="scss" scoped></style>
