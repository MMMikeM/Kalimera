import { defineConfig } from "oxfmt";

export default defineConfig({
	useTabs: true,
	sortImports: true,
	ignorePatterns: ["dist/**"],
	sortTailwindcss: {
		stylesheet: "./src/index.css",
		functions: ["tv", "twMerge"],
	},
});
