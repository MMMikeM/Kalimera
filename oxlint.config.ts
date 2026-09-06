import { defineConfig } from "oxlint";

const DB_IMPORT_MESSAGE =
	"The db instance may only be imported inside src/server/db/queries/ or scripts (src/scripts/**, scripts/**). Add a query helper for application code.";

const ARBITRARY_VALUE_PATTERN = "-\\[([^\\[\\]]*?)\\](?!:)";

// Role tokens are named in src/constants/grammar-palette.ts; everything else
// reads SCHEME. That file and GreekText are exempted in the overrides below.
// The plugin matches each whitespace-split chunk with its variants attached, so
// the utility is anchored to the start, a variant `:` or the important `!`.
const ROLE_TOKEN_PATTERN =
	"(?:^|[:!])(?:bg|text|border|ring|fill|stroke|divide|outline|accent)-(?:case|gender)-(?:nominative|accusative|genitive|masculine|feminine|neuter)";

export default defineConfig({
	plugins: ["eslint", "typescript", "unicorn", "oxc", "react", "import", "jsx-a11y"],
	jsPlugins: [
		"eslint-plugin-better-tailwindcss",
		{ name: "react-compiler", specifier: "eslint-plugin-react-hooks" },
		"./oxlint-plugins/greek-rendering.ts",
		"./oxlint-plugins/tailwind-classes.ts",
	],
	categories: { correctness: "error" },
	ignorePatterns: ["dist/**", ".claude/**"],
	rules: {
		"greek/no-phonetic-render": "error",
		"tw/no-interpolated-class": "error",
		"import/first": "warn",
		"@typescript-eslint/no-explicit-any": ["error"],
		"no-unused-vars": ["error"],
		"no-unsafe-optional-chaining": ["error"],
		"react-compiler/preserve-manual-memoization": "error",
		"react-compiler/purity": "error",
		"react-compiler/immutability": "error",
		"react-compiler/set-state-in-render": "error",
		"react-compiler/refs": "error",
		"better-tailwindcss/no-restricted-classes": [
			"warn",
			{
				restrict: [
					{
						pattern: ARBITRARY_VALUE_PATTERN,
						message:
							"Arbitrary-value utility escapes the design system. Prefer a token; add an eslint-disable comment with a reason if truly necessary.",
					},
					{
						pattern: ROLE_TOKEN_PATTERN,
						message:
							"Reserved grammar role token written by hand. Read it from `SCHEME`, `caseScheme()` or `genderScheme()` in src/constants/grammar-palette.ts — that file is the only place a role picks a colour.",
					},
				],
			},
		],
	},
	overrides: [
		{
			// The only files allowed past the components to the raw helpers:
			// the conversion modules themselves, their tests, and the harvester.
			files: [
				"src/lib/greek-*.ts",
				"src/components/GreekText.tsx",
				"src/components/Pronunciation.tsx",
				"src/components/GreekGloss.tsx",
				"scripts/**/*.ts",
			],
			rules: {
				"greek/no-phonetic-render": "off",
			},
		},
		{
			files: ["./src/*.server/**/*.ts"],
			plugins: ["node"],
		},
		{
			// Reusable column-builder helpers; some are kept as a stable API surface
			// even when not currently used by schema.ts. Don't flag them as unused.
			files: ["src/server/db/columns.ts"],
			rules: {
				"no-unused-vars": "off",
			},
		},
		{
			files: ["src/routes/search.tsx"],
			rules: {
				"jsx-a11y/no-autofocus": ["off"],
			},
		},
		{
			// The two files allowed to name a role token: the palette itself, and
			// GreekText's six tones, spelled out so Tailwind's scanner can see them.
			files: ["src/constants/grammar-palette.ts", "src/components/GreekText.tsx"],
			rules: {
				"better-tailwindcss/no-restricted-classes": "off",
			},
		},
		{
			// shadcn-ui primitives ship with arbitrary-value utilities baked in
			// (transition-[color,box-shadow], has-[>svg], ring-[3px]). Don't fight them.
			files: ["src/components/ui/**/*.{ts,tsx}", "src/components/NavTabs.tsx"],
			rules: {
				"better-tailwindcss/no-restricted-classes": "off",
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
								name: "@/server/db/index",
								importNames: ["db"],
								message: DB_IMPORT_MESSAGE,
							},
							{
								name: "@/server/db",
								importNames: ["db"],
								message: DB_IMPORT_MESSAGE,
							},
							{
								name: "../server/db",
								importNames: ["db"],
								message: DB_IMPORT_MESSAGE,
							},
							{
								name: "./server/db",
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
			files: ["src/server/db/queries/**/*.ts", "src/scripts/**/*.ts", "scripts/**/*.ts"],
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
								pattern: ROLE_TOKEN_PATTERN,
								message:
									"Reserved grammar role token written by hand under /reference/ — read it from `SCHEME`, `caseScheme()` or `genderScheme()` in src/constants/grammar-palette.ts.",
							},
						],
					},
				],
			},
		},
	],
});
