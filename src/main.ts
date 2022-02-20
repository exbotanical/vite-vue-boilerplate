import { createPinia } from 'pinia';
import { createApp } from 'vue';

import '@/styles/index.css';

import App from './App.vue';

import router from '@/router';
import { debugPlugin } from '@/services';

createApp(App).use(debugPlugin).use(createPinia()).use(router).mount('#app');
