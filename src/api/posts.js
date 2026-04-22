import { posts } from '.';

export function getPosts(params) {
	return posts.get('/', { params });
}

// export function getPostById(id) {
// 	return posts.get(`/${id}`);
// 	// return posts.find(item => item.id === id);
// }

export function getPostById(id) {
	// 안 된다 : 숫자이기 때문
	// return posts.get(id);

	// 된다 : 문자이기 때문
	// console.log('id(type): ', typeof id);
	// return posts.get(id + '');

	// 된다 : 관련된 곳에서 숫자에서 문자로 바꾸어서 이제는 그냥 넘겨도 된다.
	// if (typeof id === 'number') return posts.get(id + '');
	// else return posts.get(id);

	return posts.get(`/${id}`);
}

export function createPost(data) {
	return posts.post('/', data);
}

export function updatePost(id, data) {
	return posts.put(`/${id}`, data);
	// return posts.put(id, data);
}

export function deletePost(id) {
	return posts.delete(`/${id}`);
}
