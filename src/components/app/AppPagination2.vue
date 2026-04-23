<template>
	<nav class="mt-3" aria-label="Page navigation example">
		<ul class="pagination justify-content-center">
			<li class="page-item">
				<a
					class="page-link"
					:class="isPrevPage"
					href="#"
					aria-label="Previous"
					@click="$emit('page', props.currentPage - 1)"
				>
					<span aria-hidden="true">&laquo;</span>
				</a>
			</li>
			<li
				v-for="page in pageCount"
				:key="page"
				class="page-item"
				:class="{ active: props.currentPage === page }"
			>
				<a class="page-link" href="#" @click="$emit('page', page)">{{
					page
				}}</a>
			</li>
			<li class="page-item">
				<a
					class="page-link"
					:class="isNextPage"
					href="#"
					aria-label="Next"
					@click="$emit('page', props.currentPage + 1)"
				>
					<span aria-hidden="true">&raquo;</span>
				</a>
			</li>
		</ul>
	</nav>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
	currentPage: {
		type: Number,
		required: true,
	},
	pageCount: {
		type: Number,
		required: true,
	},
});

defineEmits(['page']);

const isPrevPage = computed(() => ({ disabled: props.currentPage <= 1 }));
const isNextPage = computed(() => ({
	disabled: props.currentPage >= props.pageCount,
}));
</script>

<style lang="scss" scoped></style>
