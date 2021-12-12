import type { Router } from 'vue-router';

import { logger } from '@/plugins/debug';
import { predicate } from './util';

/**
 * Wrapper for all system navigation guards
 */
export function guards(this: Router) {
	this.beforeEach((to, from, next) => {
		const routeHas = predicate(to);

		if (routeHas('authRequired')) {
			logger('matched an `authRequired` route');

			// auth check logic
		}

		next();
	});

	return this;
}
