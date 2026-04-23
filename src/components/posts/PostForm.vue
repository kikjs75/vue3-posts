<template>
	<form>
		<div class="mb-3">
			<label for="title" class="form-label">제목</label>
			<!-- autofocus : HTML 기본제공. v-focus 와 기본 동작 같음. 그러나 처음 로드에만 동작. 동적으로 hide/show 하면 안 됨. -->
			<!-- v-focus : vue3 custom directive. autofocus 와 기본 동작 같음. 그러나 autofocus 다르게 동적으로 hide/show 하면 됨. -->
			<input
				v-focus
				v-color="'blue'"
				:value="title"
				@input="$emit('update:title', $event.target.value)"
				type="text"
				class="form-control"
				id="title"
			/>
		</div>
		<div class="mb-3">
			<label for="content" class="form-label">내용</label>
			<textarea
				:value="content"
				ß
				@input="$emit('update:content', $event.target.value)"
				class="form-control"
				id="content"
				rows="3"
			></textarea>
		</div>
		<div class="d-flex gap-2 mt-4">
			<slot name="actions"></slot>
		</div>
	</form>
</template>

<script setup>
import { ref } from 'vue';

// const vFocus = {
// 	mounted: el => {
// 		el.focus();
// 	},
// };

defineProps({
	title: String,
	content: String,
});

defineEmits(['update:title', 'update:content']);
</script>

<style lang="scss" scoped></style>
