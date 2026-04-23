import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
// import globalComponents from '@/plugins/global-components'; // unplugin-vue-components/vite 사용해서 필요 없음.
// import focus from '@/directives/focus'; // 여기서 개별로 여러 개 설정할 수 도 있고 plugin 으로 하나로 묶어서 설정하고 여기에는 플러그인만 설정 가능.
import globalDirectives from '@/plugins/global-directives';
import dayjs from './plugins/dayjs';

const app = createApp(App);
// app.use(globalComponents); // unplugin-vue-components/vite 사용해서 필요 없음.
// app.directive('focus', focus);
app.use(dayjs);
app.use(globalDirectives);
app.use(router);
app.mount('#app');

import 'bootstrap/dist/js/bootstrap.js';

console.log('MODE: ', import.meta.env.MODE);
console.log('BASE_URL', import.meta.env.BASE_URL);
console.log('PROD: ', import.meta.env.PROD);
console.log('DEV : ', import.meta.env.DEV);
console.log('VITE_APP_API_URL : ', import.meta.env.VITE_APP_API_URL);
