<script setup lang="ts">
import { onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';

import { useUiStore } from '@/state';

const uiStore = useUiStore();
const route = useRoute();

onMounted(() => {
	uiStore.addViewToCache(route);
});

watch(
	() => route.name,
	() => {
		uiStore.addViewToCache(route);
	}
);
</script>

<template>
	<router-view v-slot="{ Component }">
		<keep-alive :include="uiStore.getCachedViews as string[]">
			<main>
				<Component :is="Component" />
			</main>
		</keep-alive>
	</router-view>
</template>
