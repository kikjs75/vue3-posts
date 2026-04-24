import axios from 'axios';
import { isRef, ref, unref, watchEffect } from 'vue';

axios.defaults.baseURL = import.meta.env.VITE_APP_API_URL;

export const useAxios = (url, config = {}, options = {}) => {
	const response = ref(null);
	const data = ref(null);
	const loading = ref(false);
	const error = ref(null);

	// console.log('config.params: ', config.params); // 반응형 객체
	const { params } = config; // params : 래핑 해제헤서 넣어야 한다.
	const defaultConfig = {
		method: 'get',
	};
	const defaultOption = {
		immediate: true,
	};
	const { onSuccess, onError, immediate } = {
		...defaultOption,
		...options,
	};

	const execute = body => {
		data.value = null;
		error.value = null;
		loading.value = true;
		axios(unref(url), {
			...defaultConfig,
			...config,
			params: unref(params),
			data: typeof body == 'object' ? body : {},
		})
			.then(res => {
				response.value = res;
				data.value = res.data;
				if (onSuccess) onSuccess(res);
			})
			.catch(err => {
				error.value = err;
				if (onError) onError(err);
			})
			.finally(() => {
				loading.value = false;
			});
	};

	if (isRef(params) || isRef(url)) {
		watchEffect(execute);
	} else {
		if (immediate) execute();
	}

	return {
		data,
		loading,
		error,
		response,
		execute,
	};
};
