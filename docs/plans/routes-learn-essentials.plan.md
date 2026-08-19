# Plan: `src/routes/learn/essentials` Alignment & Polish

Audit feedback and implementation plan for `src/routes/learn/essentials/` (`index.tsx`, `$subtab.tsx`, `content.llm`, `subtabs/*`).

---

## 1. LLM Context Files

### Issues
- **`src/routes/learn/essentials/content.llm`:**
  - Lines 14–18 reference obsolete `data.server.ts` and `getEssentialsData()`.
  - Lines 8–10 use Express param syntax (`:subtab`) instead of `$subtab`.
  - Omits documentation for co-located helper components `EssentialsBackLink` and `ExampleList`.
  - Inconsistent section titles (`Frequency Spectrum` vs component title `Frequency`).
  - Inconsistent property naming: `$subtab.tsx` returns `colors` while routes and content use British English `colours`.

### Actions
- [ ] Update `content.llm` to document inline TanStack Start `createServerFn` and `getVocabBySlug` from `@/server/db/queries/vocabulary`.
- [ ] Update route parameters to `$subtab`.
- [ ] Add documentation for `EssentialsBackLink` and `ExampleList`.
- [ ] Standardise spelling on `colours` across loader return types and documentation.

---

## 2. Design Guidelines & Contrast

### Issues
- **Decorative Tokens on Text:**
  - `subtabs/numbers.tsx:30, 36, 45, 125`: Uses raw `text-ocean-600` on Greek stems and badge connections instead of `text-ocean-text`.
  - `subtabs/frequency.tsx:102, 108`: Uses raw `text-honey-600` on accented vowels instead of `text-honey-text`.
- **Missing Greek Scaling (`.greek-text` / 1.1x):**
  - `subtabs/numbers.tsx:125, 152, 207, 265-294`: Greek numbers, stems, and gender table cells omit `.greek-text` or `<MonoText variant="greek">`.
  - `subtabs/position.tsx:165`: `<MonoText className="text-stone-700">κοντά στο</MonoText>` omits `variant="greek"`.
  - `subtabs/time.tsx:54, 101, 154`: Greek subtitles omit `.greek-text`.
- **Mixed Content in Greek Variant:**
  - `subtabs/frequency.tsx:118`: `<MonoText variant="greek">ποτέ δεν + verb</MonoText>` wraps English text in Greek font styling.
- **Ad-hoc Callout Duplication:**
  - 12 ad-hoc callout containers constructed manually across subtabs instead of reusing canonical `<Callout scheme="...">`.

### Actions
- [ ] Replace `text-ocean-600` and `text-honey-600` with `text-ocean-text` and `text-honey-text`.
- [ ] Wrap all unstyled Greek vocabulary and table cells in `<MonoText variant="greek">` or `.greek-text`.
- [ ] Split mixed Greek/English phrases into separate spans.
- [ ] Replace all 12 ad-hoc callout boxes with `<Callout>`.

---

## 3. Tailwind & Component Architecture

### Issues
- **Manual String Concatenation & Ternaries:**
  - `index.tsx:46-58, 98, 101`: Uses `COLOR_CLASSES` record lookups in template strings.
  - `subtabs/colours.tsx:75`: Template string ternary `className={\`inline-block ... ${isLight ? "border border-stone-300" : ""}\`}`.
- **ESLint-Disabled Arbitrary Grid Layouts:**
  - `subtabs/numbers.tsx:142` and `time.tsx:59, 108, 161` use `grid-cols-[3fr_2fr]` with eslint disable comments.
- **Function Declarations:**
  - All 11 components in `learn/essentials/` use `function` declarations instead of `const` arrow functions.

### Actions
- [ ] Implement `toolkitCardVariants` with `tv()` in `index.tsx`:
```typescript
const toolkitCardVariants = tv({
  slots: {
    card: "h-full transition-colors",
    iconWrapper: "rounded-lg p-2",
  },
  variants: {
    color: {
      ocean: { card: "bg-ocean-50 border-ocean-300 hover:border-ocean-400", iconWrapper: "bg-ocean-200 text-ocean-text" },
      honey: { card: "bg-honey-50 border-honey-300 hover:border-honey-400", iconWrapper: "bg-honey-200 text-honey-text" },
      olive: { card: "bg-olive-50 border-olive-300 hover:border-olive-400", iconWrapper: "bg-olive-200 text-olive-text" },
      terracotta: { card: "bg-terracotta-50 border-terracotta-300 hover:border-terracotta-400", iconWrapper: "bg-terracotta-200 text-terracotta-text" },
    },
  },
});
```
- [ ] Standardise 2-column layouts using standard Tailwind 12-column or 5-column grids (`col-span-3` / `col-span-2`).
- [ ] Refactor all component functions to `const` arrow functions.
