<template>
	<div>
		<h2 @click="visibleForm = !visibleForm">게시글 등록</h2>
		<hr class="my-4" />
		<AppError v-if="error" :message="error.message" />
		<PostForm
			v-if="visibleForm"
			v-model:title="form.title"
			v-model:content="form.content"
			@submit.prevent="save"
		>
			<template #actions>
				<button type="button" class="btn btn-outline-dark" @click="goListPage">
					목록
				</button>
				<button class="btn btn-primary" :disabled="loading">
					<template v-if="loading">
						<span
							class="spinner-grow spinner-grow-sm"
							aria-hidden="true"
						></span>
						<span class="visually-hidden" role="status">Loading...</span>
					</template>
					<template v-else> 저장 </template>
				</button>
			</template>
		</PostForm>
		<AppAlert :items="alerts" />
	</div>
</template>

<script setup>
import { ref, watchEffect } from 'vue';
import { useRouter } from 'vue-router';
import { createPost } from '@/api/posts';
import PostForm from '@/components/posts/PostForm.vue';
import PostForm2 from '@/components/posts/PostForm2.vue';
import PostForm3 from '@/components/posts/PostForm3.vue';
import { useAlert } from '@/composables/alert';
import { useAxios } from '@/hooks/useAxios';

const { alerts, vAlert, vSuccess, vError } = useAlert();

const form = ref({
	title: null,
	content: null,
});
const router = useRouter();
const goListPage = () => {
	router.push({
		name: 'PostList',
	});
};
const visibleForm = ref(true);

// save 버튼 눌렀을 때 실행 되어야 하기 때문에 immediate 값을 실제 실행 시점을 조정한다.
const { error, loading, execute } = useAxios(
	'/posts/',
	{
		method: 'post',
	},
	{
		immediate: false,
		onSuccess: res => {
			router.push({ name: 'PostList' });
			vSuccess('등록 완료되어습니다!');
		},
		onError: err => {
			vError(err.message);
		},
	},
);

// save 버튼 눌렀을 때 immediate 기본값 true 이여서 이 시점에 실행된다.
const save = async () => {
	await execute({
		...form.value,
		createdAt: Date.now(),
	});
};

// 1) 처음 버전
// const save = async () => {
// 	({
// 		loading: loading.value,
// 		error: error.value,
// 		data: form.value,
// 	} = useAxios(
// 		'/posts/',
// 		{
// 			method: 'post',
// 			data: {
// 				...form.value,
// 				createdAt: Date.now(),
// 			},
// 		},
// 		{
// 			onSuccess: res => {
// 				router.push({ name: 'PostList' });
// 				vSuccess('등록 완료되어습니다!');
// 			},
// 			onError: err => {
// 				vError(err.message);
// 			},
// 		},
// 	));
// };

// const save = async () => {
// 	try {
// 		loading.value = true;
// 		await createPost({
// 			...form.value,
// 			createdAt: Date.now(),
// 			// createdAt: new Date().toISOString().slice(0, 10),
// 		});
// 		router.push({ name: 'PostList' });
// 		vSuccess('등록 완료되어습니다!');
// 	} catch (err) {
// 		// console.log(err);
// 		vError(err.message);
// 		error.value = err;
// 	} finally {
// 		loading.value = false;
// 	}
// };
</script>

<style lang="scss" scoped></style>
