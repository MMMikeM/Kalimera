# Design: Vite 8 + oxfmt/oxlint Migration

## Overview

Upgrade Vite from v7 to v8, and replace Biome with oxfmt (formatter) and oxlint (linter) for JS/TS tooling. CSS files will go unformatted.

## Changes

### 1. Vite 8 upgrade

- Bump `vite` from `^7.3.2` to `^8.x`
- Bump `@vitejs/plugin-react` to the version compatible with Vite 8
- Verify `vite.config.ts` against Vite 8 migration guide — no changes expected given the config is idiomatic
- Verify `vitest` compatibility (shares Vite internals)
- Verify `vite-plugin-pwa` compatibility

### 2. Biome removal

- Delete `biome.json`
- Remove `@biomejs/biome` from devDependencies

### 3. oxfmt (formatter) — `oxfmt.config.ts`

Config file is TypeScript using `defineConfig` from `oxfmt`:

```ts
import { defineConfig } from "oxfmt";

export default defineConfig({
	ignorePatterns: ["dist/**"],
	sortTailwindcss: {
		stylesheet: "./src/index.css",
		functions: ["tv", "twMerge"],
	},
});
```

- Tab indentation, double quotes (matching current Biome settings)
- Scope: JS/TS only — CSS left unformatted

### 4. oxlint (linter) — `oxlint.config.ts`

Config file is TypeScript using `defineConfig` from `oxlint`:

```ts
import { defineConfig } from "oxlint";

export default defineConfig({
	plugins: [
		"eslint",
		"typescript",
		"unicorn",
		"oxc",
		"react",
		"import",
		"jsx-a11y",
	],
	categories: { correctness: "error" },
	ignorePatterns: ["dist/**"],
	rules: {
		"@typescript-eslint/no-explicit-any": ["error"],
		"no-unused-vars": ["error"],
		"no-unsafe-optional-chaining": ["error"],
	},
});
```

No React Compiler in this project, so `react-hooks/exhaustive-deps` stays at its default (on).

### 5. Script updates (package.json)

| Script     | Before                          | After                       |
| ---------- | ------------------------------- | --------------------------- |
| `lint`     | `biome lint .`                  | `oxlint .`                  |
| `lint:fix` | `biome lint --unsafe --write .` | `oxfmt . && oxlint --fix .` |

Add a `format` script: `oxfmt .`

### 6. Import organisation

Dropped. Biome's `organizeImports` has no direct equivalent in oxlint. Can be revisited later.

## Out of Scope

- CSS formatting (deliberately left unformatted)
- Import sorting tooling
- Adding lint rules beyond the recommended + explicit set above

## Success Criteria

- `pnpm lint` passes with oxlint
- `pnpm lint:fix` formats and auto-fixes cleanly
- `pnpm build` succeeds with Vite 8
- `pnpm test` passes (vitest compatible)
- `biome.json` deleted, `@biomejs/biome` removed
