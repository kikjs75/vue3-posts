<template>
	<AppLoading v-if="loading" />

	<AppError v-else-if="error" :message="error.message" />

	<div v-else>
		<h2>게시글 수정</h2>
		<hr class="my-4" />
		<AppError v-if="editError" :message="editError.message" />
		<PostForm
			v-model:title="form.title"
			v-model:content="form.content"
			@submit.prevent="edit"
		>
			<template #actions>
				<button
					type="button"
					class="btn btn-outline-danger"
					@click="goDetailPage"
				>
					취소
				</button>

				<button class="btn btn-primary" :disabled="editLoading">
					<template v-if="editLoading">
						<span
							class="spinner-grow spinner-grow-sm"
							aria-hidden="true"
						></span>
						<span class="visually-hidden" role="status">Loading...</span>
					</template>
					<template v-else> 수정 </template>
				</button>
			</template>
		</PostForm>
	</div>
</template>
<script setup>
import { useRoute, useRouter } from 'vue-router';
import { getPostById, updatePost } from '@/api/posts';
import { ref } from 'vue';
import PostForm from '@/components/posts/PostForm.vue';
import { useAlert } from '@/composables/alert';

const { vSuccess, vError } = useAlert();

const route = useRoute();
const router = useRouter();
const id = route.params.id;
const form = ref({
	title: null,
	content: null,
});
const loading = ref(false);
const error = ref(null);

const goDetailPage = () => {
	router.push({
		name: 'PostDetail',
		params: { id },
	});
};

const fetechPost = async () => {
	try {
		loading.value = true;
		const { data } = await getPostById(id);
		setForm(data);
	} catch (err) {
		// console.log(err);
		vError(err.message);
		error.value = err;
	} finally {
		loading.value = false;
	}
};
const setForm = ({ title, content }) => {
	form.value.title = title;
	form.value.content = content;
};
fetechPost();

const editLoading = ref(false);
const editError = ref(null);
const edit = async () => {
	try {
		editLoading.value = true;
		await updatePost(id, {
			...form.value,
			// createdAt: new Date().toISOString().slice(0, 10),
		});
		router.push({
			name: 'PostDetail',
			params: {
				id,
			},
		});
		vSuccess('수정이 완료되었습니다!');
	} catch (err) {
		// console.log(err);
		vError(err.message);
		editError.value = err;
	} finally {
		editLoading.value = false;
	}
};
</script>

<style lang="scss" scoped></style>
