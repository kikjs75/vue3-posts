import {
	createRouter,
	createWebHashHistory,
	createWebHistory,
} from 'vue-router';
import HomeView from '@/views/HomeView.vue';
import AboutView from '@/views/AboutView.vue';
import PostCreateView from '@/posts/PostCreateView.vue';
import PostDetailView from '@/posts/PostDetailView.vue';
import PostEditView from '@/posts/PostEditView.vue';
import PostListView from '@/posts/PostListView.vue';
import NotFoundView from '@/views/NotFoundView.vue';
import NestedView from '@/views/nested/NestedView.vue';
import NestedOneView from '@/views/nested/NestedOneView.vue';
import NestedTwoView from '@/views/nested/NestedTwoView.vue';
import NestedHomeView from '@/views/nested/NestedHomeView.vue';
import MyPage from '@/views/MyPage.vue';

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
		// props: route => {
		// 	return { id: parseInt(route.params.id) };
		// },

		// 	props: route => ({ id: parseInt(route.params.id) }),

		props: true,
	},
	{
		path: '/posts/:id/edit',
		name: 'PostEdit',
		component: PostEditView,
	},
	{
		path: '/nested',
		name: 'Nested',
		component: NestedView,
		children: [
			{
				path: '',
				name: 'NestedHome',
				component: NestedHomeView,
			},
			{
				path: 'one',
				name: 'NestedOne',
				component: NestedOneView,
			},
			{
				path: 'two',
				name: 'NestedTwo',
				component: NestedTwoView,
			},
		],
	},
	{
		path: '/my',
		name: 'MyPage',
		component: MyPage,
		beforeEnter: [removeQueryString],
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

function removeQueryString(to, from) {
	console.log('(beforeEnter)to: ', to);
	console.log('(beforeEnter)from: ', from);
	console.log('(beforeEnter)to.query: ', to.query);
	console.log('(beforeEnter)typeof to.query: ', typeof to.query);

	// return false;
	// return { name: 'Home' };
	if (Object.keys(to.query).length > 0) {
		// Object.keys 이용하면 해당 키를 배열로 리턴해서 값이 있는지 확인 가능하다.
		return { path: to.path, query: {} };
	}
}

const router = createRouter({
	history: createWebHistory('/'),
	// history: createWebHistory('/base'),
	// history: createWebHashHistory('/'),
	routes,
});

// router.beforeEach((to, from) => {
// 	console.log('to: ', to);
// 	console.log('from: ', from);

// 	if (to.name === 'MyPage') {
// 		// router.push({ name: 'Home' });
// 		// return false;
// 		// return { name: 'Home' };
// 		return '/posts';
// 	}
// });

export default router;
