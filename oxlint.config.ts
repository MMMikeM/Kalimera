import { defineConfig } from "oxlint";

const DB_IMPORT_MESSAGE =
	"The db instance may only be imported inside src/db.server/queries/ or scripts (src/scripts/**, scripts/**). Add a query helper for application code.";

const ARBITRARY_VALUE_PATTERN = "-\\[([^\\[\\]]*?)\\](?!:)";
const REFERENCE_BASE_PALETTE_PATTERN =
	"^(bg|text|border|ring|fill|decoration|outline|from|to|via)-(ocean|terracotta|olive|sunset|navy|slate)-\\d";

export default defineConfig({
	plugins: ["eslint", "typescript", "unicorn", "oxc", "react", "import", "jsx-a11y"],
	jsPlugins: ["eslint-plugin-better-tailwindcss"],
	categories: { correctness: "error" },
	ignorePatterns: ["dist/**"],
	rules: {
		"@typescript-eslint/no-explicit-any": ["error"],
		"no-unused-vars": ["error"],
		"no-unsafe-optional-chaining": ["error"],
		"better-tailwindcss/no-restricted-classes": [
			"warn",
			{
				restrict: [
					{
						pattern: ARBITRARY_VALUE_PATTERN,
						message:
							"Arbitrary-value utility escapes the design system. Prefer a token; add an eslint-disable comment with a reason if truly necessary.",
					},
				],
			},
		],
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
		{
			// Grammar-discipline guard for the reference surface. Base-palette
			// grammar colours (ocean/terracotta/olive/sunset/navy/slate) must not
			// appear — the system relies on reserved role tokens (bg-case-*,
			// bg-gender-*) to carry grammatical meaning. Arbitrary-value brackets
			// stay on the global `warn` because layout primitives like
			// `grid-cols-[7rem_1fr]` are often legitimate.
			files: ["src/routes/reference/**/*.{ts,tsx}"],
			rules: {
				"better-tailwindcss/no-restricted-classes": [
					"error",
					{
						restrict: [
							{
								pattern: ARBITRARY_VALUE_PATTERN,
								message:
									"Arbitrary-value utility under /reference/ — prefer a token; add an eslint-disable comment with a reason if genuinely needed.",
							},
							{
								pattern: REFERENCE_BASE_PALETTE_PATTERN,
								message:
									"Base-palette grammar colour under /reference/ — use role tokens (bg-case-*, bg-gender-*) or a neutral/decision scheme (stone/honey).",
							},
						],
					},
				],
			},
		},
	],
});
