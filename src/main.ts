import { createPinia } from 'pinia';
import { createApp } from 'vue';

import '@/styles/index.css';

import App from './App.vue';

import { debugPlugin } from '@/plugins';
import router from '@/router';

const vm = createApp(App)
	.use(debugPlugin)
	.use(createPinia())
	.use(router)
	.mount('#app');
