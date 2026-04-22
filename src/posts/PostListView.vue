<!-- <template>
	<div>
		<h2>게시글 목록</h2>
		<hr class="my-4" />
		<form @submit.prevent>
			<div class="row g-3">
				<div class="col">
					<input v-model="params.title_like" type="text" class="form-control" />
				</div>
				<div class="col-3">
					<select v-model="params._limit" class="form-select">
						<option value="3">3개씩 보기</option>
						<option value="6">6개씩 보기</option>
						<option value="9">9개씩 보기</option>
					</select>
				</div>
			</div>
		</form>

		<hr class="my-4" />
		<div class="row g-3">
			<div v-for="post in posts" :key="post.id" class="col-4">
				<PostItem
					:title="post.title"
					:content="post.content"
					:created-at="post.createdAt"
					@click="goPage(post.id)"
				></PostItem>
			</div>
		</div>

		<AppPagination
			:current-page="params._page"
			:page-count="pageCount"
			@page="page => (params._page = page)"
		></AppPagination>

		<hr class="my-4" />
		<AppCard>
			<PostDetailView :id="2"></PostDetailView>
		</AppCard>
	</div>
</template> -->

<template>
	<div>
		<h2>게시글 목록</h2>
		<hr class="my-4" />
		<PostFilter
			v-model:title="params.title_like"
			v-model:limit="params._limit"
		></PostFilter>
		<!-- <form @submit.prevent>
			<div class="row g-3">
				<div class="col">
					<input v-model="params.title_like" type="text" class="form-control" />
				</div>
				<div class="col-3">
					<select v-model="params._limit" class="form-select">
						<option value="3">3개씩 보기</option>
						<option value="6">6개씩 보기</option>
						<option value="9">9개씩 보기</option>
					</select>
				</div>
			</div>
		</form> -->

		<!-- <hr class="my-4" />
		<AppGrid :items="posts" v-slot="{ item }">
			<PostItem
				:title="item.title"
				:content="item.content"
				:created-at="item.createdAt"
				@click="goPage(item.id)"
			></PostItem>
		</AppGrid> -->

		<hr class="my-4" />
		<AppGrid :items="posts" :col-class="'col-6'">
			<template v-slot="{ item }">
				<PostItem
					:title="item.title"
					:content="item.content"
					:created-at="item.createdAt"
					@click="goPage(item.id)"
				></PostItem>
			</template>
		</AppGrid>

		<!-- <div class="row g-3">
			<div v-for="post in posts" :key="post.id" class="col-4">
				<PostItem
					:title="post.title"
					:content="post.content"
					:created-at="post.createdAt"
					@click="goPage(post.id)"
				></PostItem>
			</div>
		</div> -->

		<AppPagination2
			:current-page="params._page"
			:page-count="pageCount"
			@page="page => (params._page = page)"
		></AppPagination2>

		<hr class="my-4" />
		<AppCard>
			<PostDetailView :id="2"></PostDetailView>
		</AppCard>
	</div>
</template>

<script setup>
import { getPosts } from '@/api/posts';
import PostItem from '@/components/posts/PostItem.vue';
import { computed, ref, watchEffect } from 'vue';
import { useRouter } from 'vue-router';
import PostDetailView from './PostDetailView.vue';
import AppCard from '@/components/AppCard.vue';
import AppPagination from '@/components/AppPagination.vue';
import AppPagination2 from '@/components/AppPagination2.vue';
import AppGrid from '@/components/AppGrid.vue';
import PostFilter from '@/components/posts/PostFilter.vue';

const router = useRouter();
const posts = ref([]);
const params = ref({
	_sort: 'createdAt',
	_order: 'desc',
	_page: 1,
	_limit: 3,
	title_like: '',
});
const totalCount = ref(0);
// 1) computed(return 필요)
// const pageCount = computed(() => {
// 	return  Math.ceil(totalCount.value / params.value._limit);
// });
// 2) computed(return 불필요)
const pageCount = computed(() =>
	Math.ceil(totalCount.value / params.value._limit),
);

// const fetchPosts = () => {
// 	posts.value = getPosts();
// };
// fetchPosts();

// const fetchPosts = () => {
// 	const response = getPosts();
// 	console.log('posts: ', response);
// };
// fetchPosts();

// const fetchPosts = () => {
// 	getPosts().then(response => {
// 		console.log('response: ', response);
// 	});
// };
// fetchPosts();

// const fetchPosts = () => {
// 	getPosts()
// 		.then(response => {
// 			console.log('response: ', response);
// 		})
// 		.catch(error => {
// 			console.log('eror: ', error);
// 		});
// };
// fetchPosts();

// const fetchPosts = async () => {
// 	const response = await getPosts();
// 	console.dir(response); // console.dir : 객체(object) 출력 시 유용.
// };
// fetchPosts();

const fetchPosts = async () => {
	try {
		const { data, headers } = await getPosts(params.value); // 구조분해로 받는다.
		posts.value = data;
		totalCount.value = headers['x-total-count']; // 소문자.
	} catch (error) {
		console.log(error);
	}
};
// fetchPosts();
watchEffect(fetchPosts); // Watching 함수의 반응형 데이터가 바뀌어서 다시 실행된다.

// const fetchPosts = async () => {
// 	({ data: posts.value } = await getPosts()); // 구조분해로 이렇게도 받을 수 있다.
// };
// fetchPosts();

const goPage = id => {
	// router.push('/posts/' + id);
	// router.push(`/posts/${id}`);
	// http://localhost:3000/posts/2?searchText=hello#world
	router.push({
		name: 'PostDetail',
		params: {
			id,
		},

		// http://localhost:3000/posts/2?searchText=hello#world
		// router.push({
		// 	name: 'PostDetail',
		// 	params: {
		// 		id,
		// 	},
		// 	query: {
		// 		searchText: 'hello',
		// 	},
		// 	hash: '#world',
	});
};
</script>

<style lang="scss" scoped></style>
