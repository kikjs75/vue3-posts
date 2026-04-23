export default {
	install(app, options) {
		const person = {
			name: '짐코딩',
			say() {
				alert(this.name);
			},
			...options,
		};
		app.config.globalProperties.$person = person; // 1단계 Hook 에 해당하는 setup 에서는 사용 못함.
		app.provide('person', person); // 1단계 Hook 에 해당하는 setup 에 접근하기 위해서 provider 에 설정.
	},
};
