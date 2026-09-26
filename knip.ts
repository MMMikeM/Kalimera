import type { KnipConfig } from "knip";

const config: KnipConfig = {
	entry: [
		"src/routes/**/*.tsx",
		"!src/routes/**/components/**",
		"!src/routes/**/engines/**",
		"src/scripts/*.ts",
		"scripts/*.ts",
	],
	project: ["src/**/*.{ts,tsx}", "service-worker/**/*.ts", "scripts/**/*.ts"],
	ignore: [
		"src/types/lesson-builder.ts",
		"src/components/ui/**",
		"src/scripts/seed-data/**",
		// TanStack Start client entry — resolved by the framework, not by an import.
		"src/main.tsx",
	],
	// Imported from src/index.css via @import, which knip does not follow.
	ignoreDependencies: ["tw-animate-css"],
	// System tools shelled out to by scripts/harvest-greek-corpus.ts and
	// scripts/lint-greek.ts, not npm packages.
	ignoreBinaries: ["fd", "rg"],
	ignoreExportsUsedInFile: false,
};

export default config;
