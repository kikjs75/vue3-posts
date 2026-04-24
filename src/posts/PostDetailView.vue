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
		<p>id: {{ props.id }} / isOdd : {{ isOdd }}</p>
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
import { useRouter } from 'vue-router';
import { deletePost } from '@/api/posts';
import { computed, ref, toRef, toRefs, watchEffect } from 'vue';
import { useAlert } from '@/composables/alert';
import { useAxios } from '@/hooks/useAxios';
import { useNumber } from '@/composables/number';

const router = useRouter();

const props = defineProps({
	id: [String, Number],
});

const { vSuccess, vError } = useAlert();

const form = ref({});
const setForm = ({ title, content, createdAt }) => {
	form.value.title = title;
	form.value.content = content;
	form.value.createdAt = createdAt;
};

// const idRef = toRef(props, 'id');
const { id: idRef } = toRefs(props);
const { isOdd } = useNumber(idRef);

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

const url = computed(() => `/posts/${props.id}`);
const { loading, error, data } = useAxios(url);
watchEffect(() => {
	if (data.value) {
		setForm(data.value);
	}
});

const {
	loading: removeLoading,
	error: removeError,
	execute,
} = useAxios(
	`/posts/${props.id}`,
	{ method: 'delete' },
	{
		immediate: false,
		onSuccess: () => {
			router.push({ name: 'PostList' });
			vSuccess('삭제 되었습니다!');
		},
		onError: err => {
			vError(err.message);
		},
	},
);

const remove = async () => {
	if (confirm('삭제 하시겠습니까?') === false) {
		return;
	}

	execute();
};
</script>

<style lang="scss" scoped></style>
