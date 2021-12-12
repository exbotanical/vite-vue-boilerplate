const path = require('path');

/**
 * Base Jest Config
 */
module.exports = {
	moduleFileExtensions: ['vue', 'ts', 'tsx', 'js', 'jsx', 'json'],
	moduleNameMapper: {
		// proxy assets to stubs so we treat them as JS Modules
		'.+\\.(css|styl|less|sass|scss)$': 'identity-obj-proxy',
		'.+\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
			path.join(__dirname, '../mocks/assets.js'),
		// handle aliased imports e.g. '@/components'
		'^@/(.*)$': '<rootDir>/src/$1'
	},
	// initialize any shims we'll need to run a transpiler in our test harness
	setupFiles: [path.join(__dirname, './loader.shim.js')],
	// typical jest setup goes here (e.g. clearing mocks)
	setupFilesAfterEnv: [path.join(__dirname, './setupTests.js')],
	// we're emulating the DOM here
	testEnvironment: 'jsdom',
	testMatch: ['**/?(*.)+(spec|test).(ts|tsx)'],
	testPathIgnorePatterns: [
		'node_modules',
		'\\.cache',
		'<rootDir>/public',
		'<rootDir>/cypress'
	],
	testURL: 'http://localhost',
	transform: {
		'^.+\\.jsx?$': path.join(__dirname, './preprocess.js'),
		'^.+\\.tsx?$': 'ts-jest',
		'^.+\\.vue?$': '@vue/vue3-jest'
	}
};
