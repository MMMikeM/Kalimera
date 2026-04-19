import type { KnipConfig } from "knip";

const config: KnipConfig = {
	entry: [
		"src/routes/**/*.tsx",
		"src/scripts/*.ts",
		"src/entry.worker.ts",
		"service-worker/sw.ts",
		"scripts/*.ts",
	],
	project: ["src/**/*.{ts,tsx}", "service-worker/**/*.ts", "scripts/**/*.ts"],
	ignore: [
		"src/routes/**/+types/**",
		"src/db/migrations/**",
		"src/db/columns.ts",
		"src/components/ui/**",
		"src/scripts/seed-data/**",
	],
	ignoreDependencies: [
		"@vitejs/plugin-react",
		"@react-router/cloudflare",
		"@react-router/node",
		"tw-animate-css",
	],
	ignoreExportsUsedInFile: false,
};

export default config;
