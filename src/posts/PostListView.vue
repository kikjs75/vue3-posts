<template>
	<div>
		<h2>게시글 목록</h2>
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
		<hr class="my-4" />
		<AppCard>
			<PostDetailView :id="2"></PostDetailView>
		</AppCard>
	</div>
</template>

<script setup>
import { getPosts } from '@/api/posts';
import PostItem from '@/components/posts/PostItem.vue';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import PostDetailView from './PostDetailView.vue';
import AppCard from '@/components/AppCard.vue';

const router = useRouter();
const posts = ref([]);

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
		const { data } = await getPosts(); // 구조분해로 받는다.
		posts.value = data;
	} catch (error) {
		console.log(error);
	}
};
fetchPosts();

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
