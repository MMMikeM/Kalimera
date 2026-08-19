# Plan: `src/routes/learn/phrases` Alignment & Polish

Audit feedback and implementation plan for `src/routes/learn/phrases/` (`index.tsx`, `$tab.tsx`, `content.llm`, `tabs/*`, `components/*`).

---

## 1. LLM Context Files

### Issues
- **`src/routes/learn/phrases/content.llm`:**
  - Lines 17–21 refer to non-existent `data.server.ts` and `getPhrasesData()`. Data is loaded via `createServerFn` in `$tab.tsx`.
  - Lines 113–119 document `days-of-week` and `months` under `time-tab.tsx`, but they have moved to essentials and practice blocks.
  - Line 109 lists hero title `"Master time expressions"`, but `time-tab.tsx` renders `"Telling time"`.
- **Dead Loader Queries:**
  - `$tab.tsx:128, 168-175` queries verbs and constructs `likesConstruction` / `nameConstruction` (which moved to `/reference/patterns`).

### Actions
- [ ] Update `content.llm` to reflect `createServerFn` and `getVocabBySlug`.
- [ ] Prune `days-of-week` and `months` from `time` tab documentation and from `$tab.tsx` loader.
- [ ] Remove unused `patterns` and `verbs` queries from `$tab.tsx` loader.
- [ ] Synchronise hero titles between `content.llm` and `tabs/*.tsx`.

---

## 2. Design Guidelines & Contrast

### Issues
- **Non-Standard Numeric Text Tokens:**
  - `components/shared.tsx:9-21`: `textColors` maps color schemes to numeric classes (`text-ocean-800`, `text-terracotta-800`, `text-honey-800`, etc.) instead of calibrated AAA tokens (`text-ocean-text`, `text-terracotta-text`, `text-honey-text`).
- **Low Contrast Muted Text:**
  - `tabs/time-tab.tsx:53, 65`: `text-stone-400` fails contrast on cream backgrounds.
- **Monospace vs Sans for Phrases:**
  - `components/shared.tsx:30-36`: Uses `<MonoText variant="default">` for conversational phrases. Monospace is intended for grammar/paradigm tables, not full conversational phrases.
- **NavTab vs Hero Theme Mismatches:**
  - `survival`: NavTab uses `terracotta` (`$tab.tsx:68`), Hero uses `honey` (`survival-tab.tsx:16`).
  - `responses`: NavTab uses `ocean` (`$tab.tsx:74`), Hero uses `terracotta` (`responses-tab.tsx:16`).
  - `connectors`: NavTab uses `honey` (`$tab.tsx:92`), Hero uses `ocean` (`connectors-tab.tsx:16`).

### Actions
- [ ] Map `shared.tsx` text colors to design system tokens (`text-*-text`).
- [ ] Replace `text-stone-400` with `text-stone-500` or `text-stone-600`.
- [ ] Replace `<MonoText>` with `font-sans` and `.greek-text` for conversational phrases.
- [ ] Align tab theme tokens in `PHRASES_TABS` with `TabHero` color schemes.

---

## 3. Tailwind & Component Architecture

### Issues
- **Missing `tv()` in `shared.tsx`:**
  - Manual color mapping record and class string concatenations.
- **Inline Ternaries in `time-tab.tsx:45-50`:**
  - Dynamic ternary logic inside `cn()` for `TimeSubsection`.
- **Brittle Path Extraction:**
  - `$tab.tsx:98-100`: Splits `location.pathname` manually instead of reading `Route.useParams().tab`.

### Actions
- [ ] Refactor `PhraseItem` in `shared.tsx` using `tv()` slots:
```typescript
const phraseItemVariants = tv({
  slots: {
    row: "grid grid-cols-2 items-center gap-x-4 py-2.5 pl-3",
    greek: "greek-text text-lg font-semibold",
    english: "text-sm text-stone-500",
  },
  variants: {
    colorScheme: {
      honey: { greek: "text-honey-text" },
      terracotta: { greek: "text-terracotta-text" },
      olive: { greek: "text-olive-text" },
      ocean: { greek: "text-ocean-text" },
      navy: { greek: "text-navy-text" },
      slate: { greek: "text-slate-text" },
      sunset: { greek: "text-sunset-text" },
      stone: { greek: "text-stone-800" },
    },
  },
  defaultVariants: {
    colorScheme: "honey",
  },
});
```
- [ ] Read active tab directly from `Route.useParams().tab`.
