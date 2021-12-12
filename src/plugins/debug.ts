/* eslint-disable no-console */
import type { App } from 'vue';
import type { ViteSSGContext } from 'vite-ssg';

import pkg from '../../package.json';

const header = 'color:#50fa7b;font-weight:bold;padding:6px;';
const printf = (hex: string) => `color:${hex};font-weight:bold`;

function debug(this: App) {
	/* Runtime Exceptions */
	window.onerror = (message, source, line, column) => {
		cc(
			`%cUncaught Exception: ${JSON.stringify(
				message
			)}\nInfo: ${source} - Ln${line} Col${column}`,
			printf('#FF5555')
		);
	};

	/* Unhandled Promise Rejections */
	window.onunhandledrejection = (e) => {
		cc(`%c REJECTION: ${e.reason}`, printf('#FF5555'));

		e.preventDefault();
	};

	/* Vue Errors */
	this.config.errorHandler = (err, vm, info) => {
		console.log(err);
		cc(`%c ERROR: ${err}\nInfo: ${info}`, printf('#FF79C6'));
	};

	/* Vue Render Warnings */
	this.config.warnHandler = (msg, vm, trace) => {
		cc(`%c WARN: ${msg}\nTrace: ${trace}`, printf('#F1FA8C'));
	};
}

function logger(...args: string[]) {
	console.log(`%cLOG@${pkg.name}: ${args}`, printf('#3FFF'));
}

function cc(...args: string[]) {
	console.group(`%cDEBUG@${pkg.name}`, header);
	console.log(...args);
	console.groupEnd();
}

/* Register globally accessible logger service */
export const install = ({ app }: ViteSSGContext) => {
	app.use({
		install(app) {
			debug.apply(app);

			app.config.globalProperties.$logger = logger;
			app.provide('$logger', logger);
		}
	});
};

export { logger };
