<template>
	<div>
		<h2 @click="visibleForm = !visibleForm">게시글 등록</h2>
		<hr class="my-4" />
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
				<button class="btn btn-primary">저장</button>
			</template>
		</PostForm>
		<AppAlert :items="alerts" />
	</div>
</template>

<!-- <template>
	<div>
		<h2>게시글 등록</h2>
		<hr class="my-4" />
		<PostForm2
			v-model:title="form.title"
			v-model:content="form.content"
			@submit.prevent="save"
		>
			<template #actions2>
				<div class="pt-4">
					<button
						type="button"
						class="btn btn-outline-dark"
						@click="goListPage"
					>
						목록
					</button>
					<button class="btn btn-primary">저장</button>
				</div>
			</template>
		</PostForm2>
	</div>
</template> -->

<!-- <template>
	<div>
		<h2>게시글 등록</h2>
		<hr class="my-4" />
		<PostForm3
			v-model:title="form.title"
			v-model:content="form.content"
			@submit.prevent="save"
		>
			<template #actions3>
				<div class="pt-4">
					<button
						type="button"
						class="btn btn-outline-dark"
						@click="goListPage"
					>
						목록
					</button>
					<button class="btn btn-primary">저장</button>
				</div>
			</template>
		</PostForm3>
	</div>
</template> -->

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { createPost } from '@/api/posts';
import PostForm from '@/components/posts/PostForm.vue';
import PostForm2 from '@/components/posts/PostForm2.vue';
import PostForm3 from '@/components/posts/PostForm3.vue';
import { useAlert } from '@/composables/alert';

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

// const save = () => {
// 	try {
// 		const data = {
// 			...form.value,
// 			createdAt: Date.now(),
// 		};
// 		createPost(data);
// 	} catch (error) {
// 		console.log(error);
// 	}
// };

const save = async () => {
	try {
		await createPost({
			...form.value,
			createdAt: Date.now(),
			// createdAt: new Date().toISOString().slice(0, 10),
		});
		// router.push({ name: 'PostList' });
		vSuccess('등록 완료되어습니다!');
	} catch (error) {
		console.log(error);
		vError(error.message);
	}
};
</script>

<style lang="scss" scoped></style>
