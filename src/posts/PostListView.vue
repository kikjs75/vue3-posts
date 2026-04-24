<template>
	<div>
		<h2>게시글 목록</h2>
		<hr class="my-4" />
		<PostFilter
			v-model:title="params.title_like"
			v-model:limit="params._limit"
		></PostFilter>
		<hr class="my-4" />

		<AppLoading v-if="loading" />

		<AppError v-else-if="error" :message="error.message" />

		<template v-else>
			<AppGrid :items="posts" :col-class="'col-6'">
				<template v-slot="{ item }">
					<PostItem
						:title="item.title"
						:content="item.content"
						:created-at="item.createdAt"
						@click="goPage(item.id)"
						@modal="openModal(item)"
					></PostItem>
				</template>
			</AppGrid>

			<AppPagination
				:current-page="params._page"
				:page-count="pageCount"
				@page="page => (params._page = page)"
			></AppPagination>
		</template>

		<Teleport to="#modal">
			<PostModal
				v-model="show"
				:title="modalTitle"
				:content="modalContent"
				:created-at="modalCreatedAt"
			/>
		</Teleport>

		<template v-if="posts && posts.length > 0">
			<hr class="my-4" />
			<AppCard>
				<PostDetailView :id="posts[0].id"></PostDetailView>
			</AppCard>
		</template>
		<!-- <Teleport to="#modal">
			<div>Hello World!</div>
		</Teleport> -->
	</div>
</template>

<script setup>
import { getPosts } from '@/api/posts';
import PostItem from '@/components/posts/PostItem.vue';
import { computed, ref, watchEffect } from 'vue';
import { useRouter } from 'vue-router';
import PostDetailView from './PostDetailView.vue';
import PostFilter from '@/components/posts/PostFilter.vue';
import PostModal from '@/components/posts/PostModal.vue';

const router = useRouter();
const posts = ref([]);
const loading = ref(false);
const error = ref(null);
const params = ref({
	_sort: 'createdAt',
	_order: 'desc',
	_page: 1,
	_limit: 3,
	title_like: '',
});
const totalCount = ref(0);
const pageCount = computed(() =>
	Math.ceil(totalCount.value / params.value._limit),
);

const fetchPosts = async () => {
	try {
		loading.value = true;
		const { data, headers } = await getPosts(params.value); // 구조분해로 받는다.
		posts.value = data;
		totalCount.value = headers['x-total-count']; // 소문자.
	} catch (err) {
		// console.log(err);
		error.value = err;
	} finally {
		loading.value = false;
	}
};
// fetchPosts();
watchEffect(fetchPosts); // Watching 함수의 반응형 데이터가 바뀌어서 다시 실행된다.

const goPage = id => {
	router.push({
		name: 'PostDetail',
		params: {
			id,
		},
	});
};

const show = ref(false);
const modalTitle = ref('');
const modalContent = ref('');
const modalCreatedAt = ref('');
const openModal = ({ title, content, createdAt }) => {
	show.value = true;
	modalTitle.value = title;
	modalContent.value = content;
	modalCreatedAt.value = createdAt;
};
</script>

<style lang="scss" scoped></style>
