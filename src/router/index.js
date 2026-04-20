import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '@/views/HomeView.vue';
import AboutView from '@/views/AboutView.vue';
import PostCreateView from '@/posts/PostCreateView.vue';
import PostDetailView from '@/posts/PostDetailView.vue';
import PostEditView from '@/posts/PostEditView.vue';
import PostListView from '@/posts/PostListView.vue';
import NotFoundView from '@/views/NotFoundView.vue';

const routes = [
	{
		path: '/',
		name: 'Home',
		component: HomeView,
	},
	{
		path: '/about',
		name: 'About',
		component: AboutView,
	},
	{
		path: '/posts',
		name: 'PostList',
		component: PostListView,
	},
	{
		path: '/posts/create',
		name: 'PostCreate',
		component: PostCreateView,
	},
	{
		path: '/posts/:id',
		name: 'PostDetail',
		component: PostDetailView,
	},
	{
		path: '/posts/:id/edit',
		name: 'PostEdit',
		component: PostEditView,
	},
	{
		// will mathch everything and put it under `$route.params.pathMatch`
		path: '/:pathMatch(.*)*',
		name: 'NotFound',
		component: NotFoundView,
	},
	// {
	// 	// will mathch anything starting with `/user~` and put it under `$route.params.after
	//	// 특정 문자열의 정규식.
	// 	path: '/user-:afterUser(.*)', component: UserGeneric
	// },
];

const router = createRouter({
	history: createWebHistory('/'),
	routes,
});

export default router;
