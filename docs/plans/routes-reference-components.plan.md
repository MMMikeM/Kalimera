# Plan: `src/routes/reference/components` Alignment & Polish

Audit feedback and implementation plan for all 13 components in `src/routes/reference/components/`.

---

## 1. Design Guidelines & Contrast

### Issues
- **Simultaneous Case & Gender Colors (Guideline 2 Violation):**
  - `adjectives-section.tsx:100-104, 136-141`: Wraps gender tables in gender tints (`bg-gender-masculine-100/40`) while row headers use case borders (`border-case-*`).
- **Forbidden Opacity on `-text` Tokens:**
  - `nouns-section.tsx:146`: `<span className="block text-xs font-normal opacity-70">{meta.greek}</span>` resides within a container styled with `${style.text}` (`text-case-*-text`). Breaks AAA contrast.
- **Low Contrast Muted & Decorative Text:**
  - `verbs-section.tsx:752`: `<span className="text-honey-300">→</span>` on white background yields < 2:1 contrast.
  - `nouns-section.tsx:336`: Uses non-standard `text-honey-700` instead of `text-honey-text`.
  - `prepositions-section.tsx:137, 179, 187, 195, 202, 213, 259, 273, 322`: Widespread use of low-contrast `text-stone-400` on English translations and glosses.
- **Misapplied Semantic Colors:**
  - `nouns-section.tsx:151-154`: `CaseGuide` passes `variant="greek"` (terracotta / Accusative) to Nominative and Genitive examples (`ο φίλος μιλάει`, `το σπίτι του φίλου`).
  - `pronouns-section.tsx:459-498`: Clitic placement section wraps all 4 rules in hardcoded terracotta rather than decision/neutral schemes.
- **Unstyled Greek Text:**
  - `adjectives-section.tsx:235, 255`, `articles-section.tsx:74`, `cases-section.tsx:44, 66, 137`, `nouns-section.tsx:180`: Greek examples and pattern triggers rendered in unscaled Latin text without `.greek-text` or `<MonoText>`.

### Actions
- [ ] Remove gender background tints from `adjectives-section.tsx` tables to eliminate case/gender color collision.
- [ ] Remove `opacity-70` in `nouns-section.tsx:146` and use `text-stone-600`.
- [ ] Upgrade `text-honey-300` in `verbs-section.tsx` to `text-honey-text` and `text-stone-400` in `prepositions-section.tsx` to `text-stone-500` / `text-stone-600`.
- [ ] Wrap unstyled Greek words and pattern triggers in `<MonoText size="sm">` or `.greek-text`.

---

## 2. Educational Design & Reusable Components

### Issues
- **Reinventing Standard Components:**
  - `cases-section.tsx:41-69`: Handcrafts 3 card containers duplicating `<Callout scheme="neutral">`.
  - `prepositions-section.tsx:35-42`: `SeCard` manually crafts card headers instead of using `<TeachingCard scheme="verb-active">`.
  - `pronoun-decision-guide.tsx:134-137`: Hand-rolls inline decision questions instead of using `<QuickTest>`.
  - `verbs-section.tsx:724-761, 1108-1142`: Handcrafts warning cards instead of using `<Callout scheme="decision">`.
- **Missing Learner Labels:**
  - `cases-section.tsx:95-97`: Article table only displays grammatical labels (`Nominative`, `Accusative`, `Genitive`) without learner labels (`Doer`, `Target`, `Owner`).

### Actions
- [ ] Replace handcrafted cards across components with `<Callout>`, `<TeachingCard>`, and `<QuickTest>`.
- [ ] Add learner labels (`Doer`, `Target`, `Owner`) alongside grammatical terms in `cases-section.tsx`.

---

## 3. Tailwind & Component Architecture

### Issues
- **Missing `tv()` Abstractions:**
  - `BandHeading.tsx` uses PascalCase filename and manual styling.
  - Prevalent use of template literal class string concatenations across `case-table.tsx`, `adjectives-section.tsx`, `cases-section.tsx`, `pronouns-section.tsx`, and `verbs-section.tsx`.
- **`React.FC` Deprecation:**
  - Replace `React.FC` with standard typed parameter declarations across all 13 components.

### Actions
- [ ] Rename `BandHeading.tsx` to `band-heading.tsx` via `git mv` and convert to a slotted `tv()` component:
```typescript
const bandHeadingVariants = tv({
  slots: {
    container: "space-y-1",
    kicker: "text-xs font-semibold tracking-widest text-stone-500 uppercase",
    title: "font-serif text-2xl text-navy-text",
    lede: "max-w-2xl text-sm text-stone-600",
  },
});
```
- [ ] Replace all template string class interpolations with `cn()`.
- [ ] Remove `React.FC` and refactor function declarations to `const` arrow functions.
