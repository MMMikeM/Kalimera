import { defineConfig } from "oxlint";

export default defineConfig({
	plugins: ["eslint", "typescript", "unicorn", "oxc", "react", "import", "jsx-a11y"],
	categories: { correctness: "error" },
	ignorePatterns: ["dist/**"],
	rules: {
		"@typescript-eslint/no-explicit-any": ["error"],
		"no-unused-vars": ["error"],
		"no-unsafe-optional-chaining": ["error"],
	},
	overrides: [
		{
			files: ["./src/*.server/**/*.ts"],
			plugins: ["node"],
		},
		{
			files: ["src/routes/search.tsx"],
			rules: {
				"jsx-a11y/no-autofocus": ["off"],
			},
		},
	],
});
