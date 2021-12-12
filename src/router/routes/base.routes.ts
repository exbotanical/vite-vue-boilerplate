/* eslint-disable sort-keys */
export default [
	{
		name: 'Landing',
		path: '',
		component: async () => import('@/views/Landing.vue'),
		meta: {
			authRequired: true,
			cache: true
		}
	}
];
