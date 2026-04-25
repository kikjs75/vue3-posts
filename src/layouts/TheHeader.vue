<template>
	<nav class="navbar navbar-expand-sm navbar-dark bg-primary">
		<div class="container-fluid">
			<a class="navbar-brand" href="#">GYM Coding</a>
			<button
				class="navbar-toggler"
				type="button"
				data-bs-toggle="collapse"
				data-bs-target="#navbarSupportedContent"
				aria-controls="navbarSupportedContent"
				aria-expanded="false"
				aria-label="Toggle navigation"
			>
				<span class="navbar-toggler-icon"></span>
			</button>
			<div class="collapse navbar-collapse" id="navbarSupportedContent">
				<ul class="navbar-nav me-auto">
					<!-- 변경부분만 리로딩 -->
					<li class="nav-item">
						<RouterLink class="nav-link" active-class="active" to="/"
							>Home</RouterLink
						>
					</li>
					<li class="nav-item">
						<RouterLink class="nav-link" active-class="active" to="/about"
							>About</RouterLink
						>
					</li>
					<li class="nav-item">
						<RouterLink class="nav-link" active-class="active" to="/posts"
							>게시글</RouterLink
						>
					</li>
					<li class="nav-item">
						<RouterLink class="nav-link" active-class="active" to="/nested"
							>Nested</RouterLink
						>
					</li>
					<li class="nav-item">
						<RouterLink class="nav-link" active-class="active" to="/my"
							>MyPage</RouterLink
						>
					</li>
					<!-- 전체페이지 리로딩
					<li class="nav-item">
						<a class="nav-link active" aria-current="page" href="/">Home</a>
					</li>
					<li class="nav-item">
						<a class="nav-link" href="/about">About</a>
					</li>
					-->
				</ul>
				<button class="btn btn-outline-light" type="button" @click="goPage">
					글쓰기
				</button>
			</div>
		</div>
	</nav>
</template>

<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();
const goPage = () => {
	// router.push('/posts/create');
	router.push({
		name: 'PostCreate',
	});
};
</script>

<style lang="scss" scoped></style>
