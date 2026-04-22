import axios from 'axios';

// function create() {
// 	const instance = axios.create({
// 		baseURL: 'https://some-domain.com/api/',
// 		timeout: 1000,
// 		headers: { 'X-Custom-Header': 'foobar' },
// 	});

// 	return instance;
// }

// function create(baseURL, options) {
// 	const instance = axios.create({
// 		baseURL: baseURL,
// 		...options,
// 	});

// 	return instance;
// }

function create(baseURL, options) {
	const instance = axios.create(Object.assign({ baseURL }, options));

	return instance;
}

export const posts = create(`${import.meta.env.VITE_APP_API_URL}posts/`);
