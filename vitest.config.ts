import { defineConfig } from "vitest/config";

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
