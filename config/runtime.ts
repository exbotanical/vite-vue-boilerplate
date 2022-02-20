/**
 * Aliased DNS name for the dev server
 */
export const host = process.env.VITE_HOSTNAME;

/**
 * Aliased DNS name for the dev server
 */
export const useSSL = !!process.env.USE_SSL;

/**
 * Are we running the app in a (Cypress) test harness?
 */
export const isCypressTestEnv = !!process.env.VITE_CY_TEST;
