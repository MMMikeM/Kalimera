# Vite 8 + oxfmt/oxlint Migration Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Upgrade Vite from v7 to v8 and replace Biome with oxfmt (formatter) + oxlint (linter).

**Architecture:** Four sequential tasks — Vite upgrade first (validates the build baseline), then oxfmt, then oxlint, then Biome removal. Biome is removed last so you always have a working lint tool during the migration.

**Tech Stack:** Vite 8 (Rolldown), oxfmt, oxlint, pnpm

---

## Files changed

| File               | Action                                                                |
| ------------------ | --------------------------------------------------------------------- |
| `package.json`     | Modify — bump vite, plugin-react; add oxfmt, oxlint; update scripts   |
| `vite.config.ts`   | Modify — `rollupOptions` → `rolldownOptions` (Vite 8 breaking change) |
| `oxfmt.config.ts`  | Create                                                                |
| `oxlint.config.ts` | Create                                                                |
| `biome.json`       | Delete                                                                |

---

## Task 1: Upgrade Vite 8

Vite 8 replaces Rollup with Rolldown. The one change needed in `vite.config.ts` is renaming `rollupOptions` to `rolldownOptions` — `build.rollupOptions` is a breaking removal in Vite 8.

**Files:**

- Modify: `package.json`
- Modify: `vite.config.ts`

- [ ] **Step 1: Update Vite and plugin-react in package.json**

In `package.json` devDependencies, change:

```json
"@vitejs/plugin-react": "^5.2.0",
"vite": "^7.3.2",
```

to:

```json
"@vitejs/plugin-react": "^5.3.0",
"vite": "^8.0.0",
```

> Note: check https://www.npmjs.com/package/@vitejs/plugin-react for the latest v5.x release that declares `vite@^8` in its peerDependencies. As of April 2026, v5.3+ is expected to support Vite 8. If it hasn't shipped yet, use `"^5.2.0"` and add `--legacy-peer-deps` to the install step.

- [ ] **Step 2: Fix rollupOptions → rolldownOptions in vite.config.ts**

`build.rollupOptions` is removed in Vite 8. Open `vite.config.ts` and change:

```ts
build: {
  rollupOptions: isSsrBuild ? { input: "./src/entry.worker.ts" } : undefined,
},
```

to:

```ts
build: {
  rolldownOptions: isSsrBuild ? { input: "./src/entry.worker.ts" } : undefined,
},
```

- [ ] **Step 3: Install dependencies**

```bash
pnpm install --legacy-peer-deps
```

The `--legacy-peer-deps` flag is needed because `vite-plugin-pwa@^1.2.0` has not yet updated its peerDependencies to include Vite 8 (see vite-pwa/vite-plugin-pwa#923). The plugin itself works fine with Vite 8.

- [ ] **Step 4: Verify dev build compiles**

```bash
pnpm build
```

Expected: build completes without errors. If you see a `BundleError` about CJS interop, add `legacy: { inconsistentCjsInterop: true }` to `vite.config.ts` temporarily and note it for investigation.

- [ ] **Step 5: Verify tests pass**

```bash
pnpm test --run
```

Expected: all tests pass.

- [ ] **Step 6: Commit**

```bash
git add package.json vite.config.ts pnpm-lock.yaml
git commit -m "chore: upgrade to vite 8"
```

---

## Task 2: Add oxfmt

oxfmt is the formatter from the oxc project. npm package: `oxfmt`. It replaces Biome's JS/TS formatter. Config is a `.config.ts` file using `defineConfig`.

**Files:**

- Modify: `package.json`
- Create: `oxfmt.config.ts`

- [ ] **Step 1: Install oxfmt**

```bash
pnpm add -D oxfmt
```

- [ ] **Step 2: Create oxfmt.config.ts**

Create `oxfmt.config.ts` at the project root:

```ts
import { defineConfig } from "oxfmt";

export default defineConfig({
	useTabs: true,
	ignorePatterns: ["dist/**"],
	sortTailwindcss: {
		stylesheet: "./src/index.css",
		functions: ["tv", "twMerge"],
	},
});
```

`useTabs: true` matches the current Biome `indentStyle: "tab"` setting. Double quotes are the oxfmt default (`singleQuote` defaults to `false`), which matches current Biome config.

- [ ] **Step 3: Add format and lint:fix scripts to package.json**

In `package.json` scripts, add a `format` script and update `lint:fix`:

```json
"format": "oxfmt .",
"lint:fix": "oxfmt . && oxlint --fix .",
```

> Note: `lint:fix` already references `oxlint` which isn't installed yet — that's fine, it will be wired up in Task 3.

- [ ] **Step 4: Run formatter to verify it works**

```bash
pnpm format
```

Expected: oxfmt processes all `.ts`, `.tsx`, `.js`, `.jsx` files and exits 0. If any files are reformatted, the output lists them.

- [ ] **Step 5: Commit**

```bash
git add oxfmt.config.ts package.json pnpm-lock.yaml
git commit -m "chore: add oxfmt formatter"
```

---

## Task 3: Add oxlint

oxlint is a fast Rust-based linter from the oxc project. npm package: `oxlint`. Config is a `.config.ts` file using `defineConfig`. It replaces Biome's linter.

**Files:**

- Modify: `package.json`
- Create: `oxlint.config.ts`

- [ ] **Step 1: Install oxlint**

```bash
pnpm add -D oxlint
```

- [ ] **Step 2: Create oxlint.config.ts**

Create `oxlint.config.ts` at the project root:

```ts
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
});
```

No React Compiler is used in this project, so `react-hooks/exhaustive-deps` stays at its default (on). No project-specific import restrictions are needed at this stage.

- [ ] **Step 3: Update lint script in package.json**

In `package.json` scripts, change:

```json
"lint": "biome lint .",
```

to:

```json
"lint": "oxlint .",
```

- [ ] **Step 4: Run linter**

```bash
pnpm lint
```

Expected: oxlint reports any rule violations. Fix any errors before continuing — use `pnpm lint:fix` (which now runs both oxfmt and oxlint --fix).

> If there are many pre-existing violations you don't want to fix now, you can add a per-rule `"warn"` override in `oxlint.config.ts` temporarily and note it as technical debt.

- [ ] **Step 5: Commit**

```bash
git add oxlint.config.ts package.json pnpm-lock.yaml
git commit -m "chore: add oxlint linter"
```

---

## Task 4: Remove Biome

With oxfmt and oxlint in place, Biome can be removed.

**Files:**

- Modify: `package.json`
- Delete: `biome.json`

- [ ] **Step 1: Remove @biomejs/biome from package.json**

In `package.json` devDependencies, delete the line:

```json
"@biomejs/biome": "^2.4.11",
```

- [ ] **Step 2: Delete biome.json**

```bash
git rm biome.json
```

- [ ] **Step 3: Install to sync lockfile**

```bash
pnpm install
```

- [ ] **Step 4: Run full lint and build verification**

```bash
pnpm lint && pnpm build && pnpm test --run
```

Expected: all three pass cleanly.

- [ ] **Step 5: Commit**

```bash
git add package.json pnpm-lock.yaml
git commit -m "chore: remove biome"
```

---

## Done

At this point:

- `pnpm format` — formats JS/TS with oxfmt (tabs, double quotes, Tailwind class sorting)
- `pnpm lint` — lints with oxlint (recommended + correctness rules)
- `pnpm lint:fix` — formats then auto-fixes lint violations
- Vite 8 / Rolldown powering builds (~10-30x faster than Vite 7)
- `biome.json` and `@biomejs/biome` gone
