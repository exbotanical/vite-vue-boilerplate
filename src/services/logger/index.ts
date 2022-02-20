/* eslint-disable @typescript-eslint/no-unsafe-argument */
import type { Plugin, App } from 'vue';

import pkg from '../../../package.json';

import { isLocalRuntime } from '@/utils';

export class Logger {
	#transport = console;

	#baseFormat = `font-weight:bold;padding:6px;border:solid 1px white;border-radius:3px;`;

	#log(method: 'error' | 'info' | 'log', hex: string, ...args: any[]) {
		const callable = this.#transport[method];

		callable(
			`%c${pkg.name}`,
			`${this.#baseFormat}background:${hex}`,
			'\n\n',
			...args
		);
	}

	info(...args: any[]) {
		if (!isLocalRuntime) return;

		this.#log('info', '#326fab', ...args);
	}

	success(...args: any[]) {
		if (!isLocalRuntime) return;

		this.#log('info', '#8ac24a', ...args);
	}

	warn(...args: any[]) {
		if (!isLocalRuntime) return;

		this.#log('info', '#ffb143', ...args);
	}

	error(...args: any[]) {
		if (!isLocalRuntime) return;

		this.#log('error', '#e61e50', ...args);
	}
}

const logger = new Logger();

function debug(this: App) {
	/* Runtime Exceptions */
	window.onerror = (message, source, line, column) => {
		logger.error(
			`Uncaught Exception: ${JSON.stringify(
				message
			)}\nInfo: ${source} - Ln${line} Col${column}`
		);
	};

	/* Unhandled Promise Rejections */
	window.onunhandledrejection = (e) => {
		logger.error(`Unhandled Promise Rejection: ${e.reason}`);

		e.preventDefault();
	};

	/* Vue Errors */
	this.config.errorHandler = (err, vm, info) => {
		logger.error(`Exception: ${err}\nInfo: ${info}`);
	};

	/* Vue Render Warnings */
	this.config.warnHandler = (msg, vm, trace) => {
		logger.warn(`Warning: ${msg}\nTrace: ${trace}`);
	};
}

/* Register globally accessible logger service */
export const debugPlugin: Plugin = {
	install(app) {
		debug.apply(app);

		app.config.globalProperties.$logger = logger;
		app.provide('$logger', logger);
	}
};

export { logger };
