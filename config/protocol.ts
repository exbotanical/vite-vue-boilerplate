import { readFileSync } from 'fs';

import { host } from './runtime';

/**
 * SSL dev server configuration; uses a self-signed cert, custom DNS name, and proxied API redirects
 */
export const sslConfig = () => ({
	host,

	https: {
		cert: readFileSync('certs/cert.pem'),
		key: readFileSync('certs/key.pem'),
		passphrase: 'client'
	}
});

/**
 * Standard dev server config for the Cypress test harness; runs on loopback interface
 */
export const testConfig = {
	devServer: {
		host: 'localhost',
		port: 3000
	}
};
