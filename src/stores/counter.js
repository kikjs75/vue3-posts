import { defineStore } from 'pinia';

export const useCounterStore = defineStore('counter', {
	state: () => ({
		counter: 1,
	}),
	getters: {
		doubleCount: state => state.counter * 2,
		doubleCountPlusOne() {
			// 일반함수이어야지 this 사용 가능. 화살표 함수 사용하면 this 사용 못함.
			return this.doubleCount + 1;
		},
	},
	actions: {
		increment() {
			// 일반함수이어야지 this 사용 가능. 화살표 함수 사용하면 this 사용 못함.
			this.counter++;
		},
	},
});
