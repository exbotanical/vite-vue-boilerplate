import { resolve } from 'path';

import Vue from '@vitejs/plugin-vue';
import jsx from '@vitejs/plugin-vue-jsx';
import dotenv from 'dotenv';
import AutoImport from 'unplugin-auto-import/vite';
import { defineConfig } from 'vite';

import { isCypressTestEnv, testConfig, sslConfig, useSSL } from './config';

/**
 * Resolve given directory path as an absolute path relative to the cwd
 */
export const resolveAbsolute = (dir: string) => resolve(__dirname, dir);

export default () => {
	dotenv.config({ path: './.env' });

	return defineConfig({
		base: '/',

		build: {
			// < limit to base64 string
			assetsInlineLimit: 10000,

			rollupOptions: {
				plugins: [],
				// ensure we have the same module exports after chunking our bundle
				preserveEntrySignatures: 'strict'
			}
		},

		// pre-bundle the following inclusions
		optimizeDeps: {
			include: ['vue', 'pinia', 'vue-router']
		},

		plugins: [
			/* Vue */
			Vue(),

			/* Auto-import the following modules as compiler macros */
			AutoImport({
				dts: 'src/auto-imports.d.ts',
				imports: ['vue', 'vue-router']
			}),

			/* JSX Support */
			jsx({
				// options are passed on to @vue/babel-plugin-jsx
			})
		],

		/* Alias Resolution */
		resolve: {
			alias: {
				'@': resolveAbsolute('./src')
			}
		},

		server: {
			open: false,
			...(isCypressTestEnv || !useSSL ? testConfig : sslConfig())
		}
	});
};
