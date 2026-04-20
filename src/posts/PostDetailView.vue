<template>
	<div>
		<!-- <h2>게시글 상세</h2>
		<hr class="my-4" />
		<p>params: {{ $route.params }}</p>
		<p>query: {{ $route.query }}</p>
		<p>query(searchText): {{ $route.query.searchText }}</p>
		<p>hash: {{ $route.hash }}</p> -->
		<!-- http://localhost:3000/posts/dadf1?searchText=111#hashValue -->

		<h2>제목</h2>
		<p>내용</p>
		<p class="text-muted">2026-01-01</p>
		<hr class="my-4" />
		<div class="row g-2">
			<div class="col-auto">
				<button class="btn btn-outline-dark">이전글</button>
			</div>
			<div class="col-auto">
				<button class="btn btn-outline-dark">다음글</button>
			</div>
			<div class="col-auto me-auto"></div>
			<div class="col-auto">
				<button class="btn btn-outline-dark" @click="goListPage">목록</button>
			</div>
			<div class="col-auto">
				<button class="btn btn-outline-primary" @click="goEditPage">
					수정
				</button>
			</div>
			<div class="col-auto">
				<button class="btn btn-outline-danger">삭제</button>
			</div>
		</div>
	</div>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();

const goListPage = () => {
	router.push({
		name: 'PostList',
	});
};

const goEditPage = () => {
	router.push({
		name: 'PostEdit',
		params: { id: route.params.id },
	});
};
</script>

<style lang="scss" scoped></style>
