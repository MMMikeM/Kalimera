# Plan: `src/routes/reference/verbs` Alignment & Polish

Audit feedback and implementation plan for `src/routes/reference/verbs/` (`index.tsx`, `$band.tsx`, `route.tsx`).

---

## 1. LLM Context Files

### Issues
- **Missing / Orphaned `.llm` Files:**
  - Content documentation exists at `src/routes/reference/tabs/verbs.content.llm` instead of `src/routes/reference/verbs/content.llm`.
- **Outdated Scope Notes:**
  - Line 341 states `## Scope Note: Future tense coming soon.`, but `$band.tsx` already implements the `"future"` band (`FutureNaSection`).
  - Practice target links to `/practice/verbs/present` instead of `/practice#verbs`.
- **`docs/user-flows.llm`:**
  - Line 357 lists `verbs` as a standard tab of `src/routes/reference/$tab.tsx` rather than a nested route hierarchy.

### Actions
- [ ] Move `src/routes/reference/tabs/verbs.content.llm` to `src/routes/reference/verbs/content.llm` via `git mv`.
- [ ] Update verb reference documentation to reflect the 4 implemented bands: Present, Past (Aorist), Continuous Past (Imperfect), and Future & να.
- [ ] Update `docs/user-flows.llm` route hierarchy.

---

## 2. Design Guidelines & Contrast

### Issues
- **Typography:**
  - `$band.tsx:17`: Band label `{ id: "future", label: "Future & να" }` embeds Greek characters (`να`) in an English string without `.greek-text` or optical scaling.
- **Mobile Viewport Overflow:**
  - `$band.tsx:35, 42`: Tab navigation bar uses `w-full flex-1 whitespace-nowrap` without an overflow scrolling container (`overflow-x-auto scrollbar-none`), risking horizontal clipping on narrow mobile screens (e.g. 375px).

### Actions
- [ ] Add `overflow-x-auto scrollbar-none` to `BandNav` container.
- [ ] Ensure Greek terms within tab labels are optically styled.

---

## 3. Tailwind & Component Architecture

### Issues
- **Function Declarations:**
  - `route.tsx:12`: `function VerbsLayout()`.
  - `$band.tsx:54`: `function VerbBand()`.
- **Component Typing:**
  - `$band.tsx:34`: Uses `React.FC<{ active: Band }>` rather than direct prop typing.
- **Inline Ternaries in `BandNav`:**
  - `$band.tsx:41-47` uses inline conditional class strings.

### Actions
- [ ] Convert `VerbsLayout` and `VerbBand` to `const` arrow functions.
- [ ] Implement `bandNavVariants` with `tv()`:
```typescript
const bandNavVariants = tv({
  slots: {
    root: "flex w-full items-center gap-1 overflow-x-auto scrollbar-none rounded-lg bg-muted p-1",
    item: "flex flex-1 min-w-max items-center justify-center rounded-md border-b-2 border-transparent px-3 py-1.5 text-sm font-medium whitespace-nowrap transition-colors",
  },
  variants: {
    active: {
      true: "border-b-stone-400 bg-white text-foreground shadow-sm",
      false: "text-stone-600 hover:text-foreground",
    },
  },
  defaultVariants: {
    active: false,
  },
});
```
