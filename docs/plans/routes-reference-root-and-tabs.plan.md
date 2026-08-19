# Plan: `src/routes/reference` (Root & Tabs) Alignment & Polish

Audit feedback and implementation plan for `src/routes/reference/` root (`index.tsx`, `$tab.tsx`, `content.llm`) and `src/routes/reference/tabs/` (`tabs/*.tsx`, `tabs/*.content.llm`).

---

## 1. LLM Context Files

### Issues
- **`src/routes/reference/content.llm`:**
  - Lines 114, 264–266 cite non-existent `AgreementSection (components/agreement-section.tsx)` (logic is inside `articles-section.tsx`).
  - Line 197 cites non-existent `tabs/verbs.tsx` (verbs migrated to dedicated route `src/routes/reference/verbs/`).
  - Index card descriptions and styling notes drift from actual implementation.
- **Orphaned `verbs.content.llm` in `tabs/`:**
  - `src/routes/reference/tabs/verbs.content.llm` belongs under `src/routes/reference/verbs/content.llm`.
- **`patterns.content.llm`:**
  - Line 159 cites non-existent `data.server.ts`; patterns are loaded via `createServerFn` in `$tab.tsx`.
- **Hero Title Drifts:**
  - Tab `.content.llm` files list outdated hero summaries that do not match current `ReferenceHero` titles.
- **File Naming Inconsistency:**
  - `src/routes/reference/tabs/nouns-articles.tsx` only contains `ArticlesTab` (nouns are in `nouns.tsx`).

### Actions
- [ ] Move `src/routes/reference/tabs/verbs.content.llm` to `src/routes/reference/verbs/content.llm` using `git mv`.
- [ ] Rename `src/routes/reference/tabs/nouns-articles.tsx` to `src/routes/reference/tabs/articles.tsx` using `git mv`.
- [ ] Update `content.llm` and tab `.content.llm` files to remove phantom file references and align with current hero titles.

---

## 2. Design Guidelines & Contrast

### Issues
- **Typography:**
  - `reference/index.tsx:101-104`: Page `<h1>` uses sans-serif instead of `font-serif text-3xl font-bold text-navy-text`.
  - `reference/index.tsx:9`: Combines `.greek-text` with `text-xs leading-tight font-mono` on card spec preview.
- **Missing `ReferenceHero` Demo Anchors:**
  - None of the tab routes pass the `demo?: ReferenceHeroDemoItem[]` prop to `ReferenceHero`, missing the instant visual memory anchor.
- **Function Declarations vs Arrow Functions:**
  - All tab components (`CasesTab`, `PronounsTab`, `ArticlesTab`, `NounsTab`, `AdjectivesTab`, `PrepositionsTab`, `PatternsTab`) use `function` declarations instead of `const` arrow functions.

### Actions
- [ ] Update `reference/index.tsx` heading to `font-serif`.
- [ ] Add visual memory `demo` props to `ReferenceHero` across reference tabs.
- [ ] Convert all tab exports to `const` arrow functions per `CLAUDE.md`.

---

## 3. Tailwind & Component Architecture

### Issues
- **Template String Concatenations in `tabs/patterns.tsx:36, 53`:**
  - Uses raw string interpolation instead of `cn()`.
- **Duplicated JSX in `tabs/patterns.tsx`:**
  - The `nameConstruction` card manually duplicates `ParadigmCard` markup with hardcoded classes instead of reusing `ParadigmCard`.
- **Inconsistent Outer Tab Spacing:**
  - `cases.tsx`, `pronouns.tsx`, `articles.tsx`, `adjectives.tsx`, `prepositions.tsx` use `space-y-10`, while `nouns.tsx` uses `space-y-12` and `patterns.tsx` uses `space-y-6`.

### Actions
- [ ] Standardize tab spacing on `space-y-10`.
- [ ] Refactor `ParadigmCard` in `patterns.tsx` to handle both single and multi-column pattern layouts.
- [ ] Clean up template string concatenations with `cn()`.
