import type { KnipConfig } from "knip";

const config: KnipConfig = {
	entry: [
		"src/routes/**/*.tsx",
		"!src/routes/**/components/**",
		"!src/routes/**/engines/**",
		"src/scripts/*.ts",
		"src/entry.worker.ts",
		"service-worker/sw.ts",
		"scripts/*.ts",
	],
	project: ["src/**/*.{ts,tsx}", "service-worker/**/*.ts", "scripts/**/*.ts"],
	ignore: [
		"src/routes/**/+types/**",
		"src/db.server/migrations/**",
		"src/db.server/columns.ts",
		"src/types/lesson-builder.ts",
		"src/components/ui/**",
		"src/scripts/seed-data/**",
	],
	ignoreDependencies: [
		"@vitejs/plugin-react",
		"@react-router/cloudflare",
		"@react-router/node",
		"tw-animate-css",
		// Used by vite-plugin-babel via string refs in vite.config.ts; knip
		// doesn't follow that indirection.
		"@babel/preset-typescript",
		"babel-plugin-react-compiler",
	],
	ignoreExportsUsedInFile: false,
};

export default config;
