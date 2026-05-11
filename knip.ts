import type { KnipConfig } from "knip";

const config: KnipConfig = {
	entry: [
		"src/routes/**/*.tsx",
		"!src/routes/**/components/**",
		"!src/routes/**/engines/**",
		"src/scripts/*.ts",
		"service-worker/sw.ts",
		"scripts/*.ts",
	],
	project: ["src/**/*.{ts,tsx}", "service-worker/**/*.ts", "scripts/**/*.ts"],
	ignore: [
		"src/types/lesson-builder.ts",
		"src/components/ui/**",
		"src/scripts/seed-data/**",
	],
	ignoreDependencies: [
		"@vitejs/plugin-react",
		"tw-animate-css",
		// Used by vite-plugin-babel via string refs in vite.config.ts; knip
		// doesn't follow that indirection.
	],
	ignoreExportsUsedInFile: false,
};

export default config;
