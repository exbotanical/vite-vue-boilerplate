import type { ViteSSGContext } from 'vite-ssg';

export const install = ({ isClient, router }: ViteSSGContext) => {
	if (!isClient) return;

	router.isReady().then(async () => {
		const { registerSW } = await import('virtual:pwa-register');

		registerSW({ immediate: true });
	});
};
