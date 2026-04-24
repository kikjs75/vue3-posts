<template>
	<AppLoading v-if="loading" />

	<AppError v-else-if="error" :message="error.message" />

	<div v-else>
		<!-- <h2>게시글 상세</h2>
		<hr class="my-4" />
		<p>params: {{ $route.params }}</p>
		<p>query: {{ $route.query }}</p>
		<p>query(searchText): {{ $route.query.searchText }}</p>
		<p>hash: {{ $route.hash }}</p> -->
		<!-- http://localhost:3000/posts/dadf1?searchText=111#hashValue -->

		<h2>{{ form.title }}</h2>
		<p>{{ form.content }}</p>
		<p class="text-muted">
			{{ $dayjs(form.createdAt).format('YYYY. MM. DD HH:mm:ss') }}
		</p>
		<hr class="my-4" />
		<AppError v-if="removeError" :message="removeError.message" />
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
				<button
					class="btn btn-outline-danger"
					@click="remove"
					:disabled="removeLoading"
				>
					<template v-if="removeLoading">
						<span
							class="spinner-grow spinner-grow-sm"
							aria-hidden="true"
						></span>
						<span class="visually-hidden" role="status">Loading...</span>
					</template>
					<template v-else> 삭제 </template>
				</button>
			</div>
		</div>
	</div>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router';
import { getPostById, deletePost } from '@/api/posts';
import { reactive, ref } from 'vue';
import { useAlert } from '@/composables/alert';

// const route = useRoute();
const router = useRouter();

const props = defineProps({
	id: [String, Number],
});

const { vSuccess, vError } = useAlert();

const loading = ref(false);
const error = ref(null);

// const id = route.params.id;
// console.log('post: ', getPostById(id));

/*
1) ref : 원본 데이터와 연결되어 있어서 반응형. 실행 중 변경 가능.
장점) 객체 할당 가능, 일관성
단점) form.value.title, form.value.content, form.value.createdAt
2) reactive : 원본 데이터와 별개 영역. 반응형 아님. 실행 중 변경 불가능.
장점) form.title, form.content, form.createdAt
단점) 객체 할당 불가능, 비일관성
*/

// 1) ref(전개구문 사용해서 객체 복사. 반응형 활성화(실행 중 변경 가능))
// const form = ref({});
// const fetechPost = () => {
// 	const data = getPostById(props.id);
// 	form.value = { ...data };
// };
// fetechPost();

// const form = ref({});
// const fetechPost = async () => {
// 	const { data } = await getPostById(props.id);
// 	form.value = { ...data };
// };
// fetechPost();

const form = ref({});
const fetechPost = async () => {
	try {
		loading.value = true;
		const { data } = await getPostById(props.id);
		setForm(data);
	} catch (err) {
		// console.log(err);
		error.value = err;
	} finally {
		loading.value = false;
	}
};
const setForm = ({ title, content, createdAt }) => {
	form.value.title = title;
	form.value.content = content;
	form.value.createdAt = createdAt;
};

// const setForm = data => {
// 	form.value.title = data.title;
// 	form.value.content = data.content;
// 	form.value.createdAt = data.createdAt;
// };

fetechPost();

// 2) active(전개구문 미사용. 개별 복사. 반응형 비활성화(실행 중 변경 불가능))
// let form = reactive({});
// const fetechPost = () => {
// 	const data = getPostById(id);
// 	form = { ...data };
// };
// fetechPost();

// 3) active(변경 가능, 하나씩 설정. 반응형 활성화(실행 중 변경 가능))
// let form = reactive({});
// const fetechPost = () => {
// 	const data = getPostById(id);
// 	form.title = data.title;
// 	form.content = data.content;
// 	form.createdAt = data.createdAt;
// };
// fetechPost();

const goListPage = () => {
	router.push({
		name: 'PostList',
	});
};

const goEditPage = () => {
	router.push({
		name: 'PostEdit',
		params: { id: props.id },
	});
};

// const remove = async () => {
// 	try {
// 		if (confirm('삭제 하시겠습니까?')) {
// 			await deletePost(props.id);
// 			router.push({ name: 'PostList' });
// 		}
// 	} catch (error) {
// 		console.log(error);
// 	}
// };

const removeLoading = ref(false);
const removeError = ref(null);
const remove = async () => {
	try {
		if (confirm('삭제 하시겠습니까?') === false) {
			return;
		}
		removeLoading.value = true;
		await deletePost(props.id);
		router.push({ name: 'PostList' });
		vSuccess('삭제 되었습니다!');
	} catch (err) {
		// console.log(err);
		vError(err.message);
		removeError.value = err;
	} finally {
		removeLoading.value = false;
	}
};
</script>

<style lang="scss" scoped></style>
