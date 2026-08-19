# Plan: `src/routes/practice` (Root & Pronouns) Alignment & Polish

Audit feedback and implementation plan for `src/routes/practice/` root (`index.tsx`, `route.tsx`, `review.tsx`, `content.llm`) and `src/routes/practice/pronouns/` (`index.tsx`, `object.tsx`, `possessives.tsx`, `placement.tsx`).

---

## 1. LLM Context Files

### Issues
- **`src/routes/practice/content.llm`:**
  - Lines 7–17 list obsolete routes (`/practice/articles/*`, `/practice/nominal/*`).
  - Lines 19–40 describe the landing page as an all-in-one registry referencing non-existent `drills.ts`.
  - Lines 14, 79–86 omit the placement drill (`/practice/pronouns/placement`).
  - Omits documentation for `/practice/review`, `getSchemaRust`, and rust urgency review scoring.

### Actions
- [ ] Update `content.llm` to document the 4-hub index (`cases`, `pronouns`, `verbs`, `blocks`).
- [ ] Document `/practice/pronouns/placement` (the 4 placement contexts: pre-verb, imperative, particle sandwich, negation).
- [ ] Add documentation for `/practice/review` and SRS rust calculation flows.

---

## 2. Design Guidelines & Contrast

### Issues
- **Contrast & Typography:**
  - `practice/review.tsx:59`: `<p className="... text-olive">Μπράβο!</p>` uses base `text-olive` (~4.2:1 contrast) on `bg-olive-50`. Base tokens are decorative only.
  - `practice/review.tsx:59`: Combines `.greek-text` with `font-serif` on body praise text (should be `font-sans`).
  - `practice/pronouns/possessives.tsx:205`: Hardcodes `colorText: "text-olive-700"` inline because `HERO_TEXT.person` defaults to terracotta (Accusative/Target).

### Actions
- [ ] Replace `text-olive` with `text-olive-text` and remove `font-serif` from body praise in `review.tsx`.
- [ ] Extend `HERO_TEXT` in `chip-specs.ts` to support theme-aware person tokens.

---

## 3. Tailwind & Component Architecture

### Issues
- **Nested Ternary in Template String:**
  - `practice/review.tsx:21-22, 85`: `rustBarColor` uses nested ternary string concatenations.

### Actions
- [ ] Replace `rustBarColor` with a `tv()` variant:
```typescript
const rustBarVariants = tv({
  base: "h-full rounded-full transition-all",
  variants: {
    urgency: {
      high: "bg-incorrect",
      medium: "bg-honey",
      low: "bg-olive",
    },
  },
});
```
