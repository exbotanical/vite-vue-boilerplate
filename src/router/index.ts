import { createWebHistory, createRouter } from 'vue-router';

import { guards } from './guards';

import routes from '@/router/routes';

/* Root Router Configurations */

export default guards.call(
	createRouter({
		history: createWebHistory(),
		routes
	})
);
