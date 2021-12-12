import type { RouteLocation, RouteMeta } from 'vue-router';

/* Routing Utilities */

/**
 * Generate a predicate contingent on the destination route def's metadata
 */
export function predicate(to: RouteLocation) {
	return function isMatch(test: keyof RouteMeta) {
		return to.matched.some((record) => record.meta[test]);
	};
}
