import type { KnipConfig } from "knip";

const config: KnipConfig = {
	entry: [
		"src/routes/**/*.tsx",
		"!src/routes/**/components/**",
		"!src/routes/**/engines/**",
		"src/scripts/*.ts",
		"scripts/*.ts",
		// Paused feature: the push-notification sender awaits a cron trigger. Declared
		// as entries so the sender's query/helper graph (and the subscription-settings
		// mutations) are not reported as dead while it waits.
		"src/server/push-notifications.ts",
		"src/server/db/queries/notifications/push-subscriptions.ts",
	],
	project: ["src/**/*.{ts,tsx}", "service-worker/**/*.ts", "scripts/**/*.ts"],
	ignore: ["src/types/lesson-builder.ts", "src/components/ui/**", "src/scripts/seed-data/**"],
	// tw-animate-css is pulled in from CSS (@import in index.css), which knip cannot see.
	ignoreDependencies: ["tw-animate-css"],
	// System CLIs invoked by scripts; not npm binaries.
	ignoreBinaries: ["fd", "rg"],
	ignoreExportsUsedInFile: false,
};

export default config;
