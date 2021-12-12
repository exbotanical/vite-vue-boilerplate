import { readFileSync } from 'fs';
import { resolve } from 'path';

/* Plugins */
import Legacy from '@vitejs/plugin-legacy';
import Vue from '@vitejs/plugin-vue';
import jsx from '@vitejs/plugin-vue-jsx';
import { VitePWA } from 'vite-plugin-pwa';
import Pages from 'vite-plugin-pages';
import Layouts from 'vite-plugin-vue-layouts';

import dotenv from 'dotenv';

import AutoImport from 'unplugin-auto-import/vite';
import { defineConfig } from 'vite';

export default () => {
	dotenv.config({ path: './.env' });

	/**
	 ******************
	 * RUNTIME OPTIONS
	 ******************
	 */

	/**
	 * Aliased DNS name for the dev server
	 */
	const host = process.env.VITE_HOSTNAME;

	/**
	 * Are we running the app in a (Cypress) test harness?
	 */
	const isCypressTestEnv = !!process.env.VITE_CY_TEST;

	/**
	 * Resolve given directory path as an absolute path relative to the cwd
	 */
	const resolveAbsolute = (dir: string) => resolve(__dirname, dir);

	/**
	 * SSL dev server configuration; uses a self-signed cert, custom DNS name, and proxied API redirects
	 */
	const sslConfig = {
		host,

		https: {
			cert: readFileSync('certs/cert.pem'),
			key: readFileSync('certs/key.pem'),
			passphrase: 'client'
		}
	};

	/**w
	 * Standard dev server config for the Cypress test harness; runs on loopback interface
	 */
	const testConfig = {
		devServer: {
			host: 'localhost',
			port: 3000
		}
	};

	/**
	 ******************
	 * BUILD CONFIG
	 ******************
	 */
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

		// css: {
		// 	preprocessorOptions: {
		// 		/* Auto-Import */
		// 		scss: {
		// 			additionalData: `@import '@/styles/index';`
		// 		}
		// 	}
		// },

		// pre-bundle the following inclusions
		optimizeDeps: {
			include: ['vue', 'pinia', 'vue-router']
		},

		plugins: [
			/* Vue */
			Vue(),

			Pages({
				extendRoute(route, parent) {
					return {
						...route,
						beforeEnter: (route: any) => {
							console.log('wwoo', { route });
							return route;
						},
						meta: {
							authRequired: true,
							cache: true
						}
					};
				},

				extensions: ['vue', 'md']
			}),

			Layouts(),

			/* Auto-import the following modules as compiler macros */
			// note to dev: this means we never have to import these packages
			AutoImport({
				dts: 'src/auto-imports.d.ts',
				imports: ['vue', 'vue-router']
			}),

			/* JSX Support */
			jsx({
				// options are passed on to @vue/babel-plugin-jsx
			}),

			/* Legacy Environment Support */
			Legacy({
				targets: ['defaults']
			}),

			/* PWA Support */
			VitePWA({
				registerType: 'autoUpdate',
				includeAssets: ['favicon.svg', 'robots.txt', 'safari-pinned-tab.svg'],
				manifest: {
					name: 'Vitesse',
					short_name: 'Vitesse',
					theme_color: '#ffffff',
					icons: [
						{
							src: '/pwa-192x192.png',
							sizes: '192x192',
							type: 'image/png'
						},
						{
							src: '/pwa-512x512.png',
							sizes: '512x512',
							type: 'image/png'
						},
						{
							src: '/pwa-512x512.png',
							sizes: '512x512',
							type: 'image/png',
							purpose: 'any maskable'
						}
					]
				}
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
			...(isCypressTestEnv ? testConfig : sslConfig)
		},

		// @ts-ignore TODO
		ssgOptions: {
			script: 'async',
			formatting: 'minify'
		}
	});
};
