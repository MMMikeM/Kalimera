import { defineConfig } from "oxfmt";

export default defineConfig({
	useTabs: true,
	printWidth: 80,
	singleQuote: false,
	jsxSingleQuote: false,
	quoteProps: "as-needed",
	trailingComma: "all",
	semi: true,
	arrowParens: "always",
	bracketSameLine: false,
	bracketSpacing: true,
	ignorePatterns: ["dist/**"],
	sortTailwindcss: {
		stylesheet: "./src/index.css",
		functions: ["tv", "twMerge"],
	},
});
