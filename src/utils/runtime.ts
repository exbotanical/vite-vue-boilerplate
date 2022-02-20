export const isLocalRuntime =
	import.meta.env.VITE_CY_TEST || process.env.NODE_ENV !== 'production';
