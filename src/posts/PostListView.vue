<template>
	<div>
		<h2>게시글 목록</h2>
		<hr class="my-4" />
		<PostFilter
			v-model:title="params.title_like"
			:limit="params._limit"
			@update:limit="changeLimit"
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

/*
- :limit="params._limit" → 부모가 자식에게 값 전달                                                                                                                               
- @update:limit="changeLimit" → 자식이 limit을 바꾸면 부모가 감지해서 changeLimit 실행                                                                                           
																																																																																									
이 두 개를 합친 단축 문법이 바로 v-model:limit="params._limit" 입니다.       
*/
const changeLimit = value => {
	params.value._limit = value;
	params.value._page = 1; // 현재는 마지막 페이지에서 카드 개수를 바꾸는데 3 페이지 이여서 문제였음. 그래서 1 페이지로 변경.
};

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
