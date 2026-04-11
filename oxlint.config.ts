import { defineConfig } from "oxlint";

const DB_IMPORT_MESSAGE =
	"The db instance may only be imported inside src/db.server/queries/ or scripts (src/scripts/**, scripts/**). Add a query helper for application code.";

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
		{
			files: ["**/*.{ts,tsx}"],
			rules: {
				"no-restricted-imports": [
					"error",
					{
						paths: [
							{
								name: "@/db.server/index",
								importNames: ["db"],
								message: DB_IMPORT_MESSAGE,
							},
							{
								name: "@/db.server",
								importNames: ["db"],
								message: DB_IMPORT_MESSAGE,
							},
							{
								name: "../db.server",
								importNames: ["db"],
								message: DB_IMPORT_MESSAGE,
							},
							{
								name: "./db.server",
								importNames: ["db"],
								message: DB_IMPORT_MESSAGE,
							},
							{
								name: "../index",
								importNames: ["db"],
								message: DB_IMPORT_MESSAGE,
							},
						],
						patterns: [
							{
								regex: "^(\\.\\./)+db\\.server$",
								importNames: ["db"],
								message: DB_IMPORT_MESSAGE,
							},
						],
					},
				],
			},
		},
		{
			files: ["src/db.server/queries/**/*.ts", "src/scripts/**/*.ts", "scripts/**/*.ts"],
			rules: {
				"no-restricted-imports": "off",
			},
		},
	],
});
