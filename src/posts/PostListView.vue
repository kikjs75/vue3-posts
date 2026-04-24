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
						@preview="selectPreview(item.id)"
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

		<template v-if="previewId">
			<hr class="my-4" />
			<AppCard>
				<!-- <PostDetailView :id="previewId" :key="previewId"></PostDetailView> -->
				<PostDetailView :id="previewId"></PostDetailView>
			</AppCard>
		</template>
		<!-- <Teleport to="#modal">
			<div>Hello World!</div>
		</Teleport> -->
	</div>
</template>

<script setup>
import PostItem from '@/components/posts/PostItem.vue';
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';
import PostDetailView from './PostDetailView.vue';
import PostFilter from '@/components/posts/PostFilter.vue';
import PostModal from '@/components/posts/PostModal.vue';
import { useAxios } from '@/hooks/useAxios';

const router = useRouter();
const params = ref({
	_sort: 'createdAt',
	_order: 'desc',
	_page: 1,
	_limit: 3,
	title_like: '',
});

const previewId = ref(null);
const selectPreview = id => (previewId.value = id);

// 1) params 반응형 객체 : params 값 변하면 다시 실행.
const {
	response,
	data: posts,
	loading,
	error,
} = useAxios('/posts', { params });

// 2) params 객체 : 처음 한 번만 되므로 검색, 페이징 등 안돼.
// const {
// 	response,
// 	data: posts,
// 	loading,
// 	error,
// } = useAxios('/posts', {
// 	params: {
// 		_sort: 'createdAt',
// 		_order: 'desc',
// 		_page: 1,
// 		_limit: 3,
// 		title_like: '',
// 	},
// });

const totalCount = computed(() => response.value.headers['x-total-count']);
const pageCount = computed(() =>
	Math.ceil(totalCount.value / params.value._limit),
);

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
