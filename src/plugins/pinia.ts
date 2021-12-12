import { createPinia } from 'pinia';

import type { ViteSSGContext } from 'vite-ssg';

export const install = ({ isClient, initialState, app }: ViteSSGContext) => {
	const pinia = createPinia();
	app.use(pinia);

	if (isClient) {
		pinia.state.value = initialState.pinia || {};
	} else {
		initialState.pinia = pinia.state.value;
	}
};
