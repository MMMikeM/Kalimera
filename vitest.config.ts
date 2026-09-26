import { defineConfig } from "vite-plus";

// Kept apart from vite.config.ts on purpose: tests must not load the app's
// plugins (TanStack Start, nitro, PWA). Under Vitest they start Vite servers
// that stop the run from exiting, and evaluate CommonJS React through the SSR
// module runner.
export default defineConfig({
	resolve: {
		tsconfigPaths: true,
	},
	test: {
		globals: true,
		// e2e/ holds Playwright specs, run by `pnpm test:e2e`. Vitest collecting
		// them fails at import: Playwright rejects test.describe() outside its
		// own runner.
		exclude: ["**/node_modules/**", "**/dist/**", "e2e/**"],
	},
});
