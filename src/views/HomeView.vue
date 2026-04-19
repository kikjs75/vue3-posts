<template>
	<div>
		<h2>Home View</h2>
		<!-- <p>{{ $route }}</p> -->
		<p>{{ $route.path }}</p>
		<p>{{ $route.name }}</p>
		<button class="btn btn-primary" @click="goAboutPage">
			About 으로 이동
		</button>
	</div>
</template>

<script setup>
import router from '@/router';
import { useRoute } from 'vue-router';

const route = useRoute();
console.log('route.path: ', route.path);

const goAboutPage = () => {
	router.push('/about');
};
</script>

<style lang="scss" scoped></style>
