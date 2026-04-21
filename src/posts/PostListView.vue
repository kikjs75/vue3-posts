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
		<PostDetailView :id="2"></PostDetailView>
	</div>
</template>

<script setup>
import { getPosts } from '@/api/posts';
import PostItem from '@/components/posts/PostItem.vue';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import PostDetailView from './PostDetailView.vue';

const router = useRouter();
const posts = ref([]);

const fetchPosts = () => {
	posts.value = getPosts();
};
fetchPosts();

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
