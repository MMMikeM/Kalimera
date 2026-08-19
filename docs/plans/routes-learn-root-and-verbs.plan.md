# Plan: `src/routes/learn` (Root & Verbs) Alignment & Polish

Audit feedback and implementation plan for `src/routes/learn/` root (`index.tsx`, `nouns.tsx`, `verbs.tsx`, `content.llm`) and `src/routes/learn/verbs/` (`$verbId.tsx`, `components/verb-inventory.tsx`).

---

## 1. LLM Context Files

### Issues
- **`src/routes/learn/content.llm`:**
  - Lines 41–44 omit `/learn/nouns` and `/learn/verbs`.
  - Lines 12 & 30 describe `/learn/verbs` as a *"Verb browser by conjugation family"* instead of an aorist learning inventory (irregulars to memorise vs rule-based regular past classes).
  - Lacks documentation for noun ending-to-gender prediction heuristics and paired opposite displays.
- **Missing Verbs Context File:**
  - No `src/routes/learn/verbs/content.llm` exists.
- **`docs/user-flows.llm`:**
  - Lines 310, 312, 326 point to non-existent file paths `learn/verbs/route.tsx` and `learn/verbs/$verbId/route.tsx`.

### Actions
- [ ] Create `src/routes/learn/verbs/content.llm` detailing the inventory classification system and the single verb detail page.
- [ ] Update `src/routes/learn/content.llm` with dedicated sections for `/learn/nouns` and `/learn/verbs`.
- [ ] Fix file paths and feature descriptions in `docs/user-flows.llm`.

---

## 2. Design Guidelines & Contrast

### Issues
- **Grammar Token Collisions & Contrast:**
  - `learn/index.tsx:13, 21, 32, 40, 48`: Uses raw legacy classes `text-olive-700`, `text-ocean-700`, and `text-honey-700` instead of `-text` tokens.
  - `learn/nouns.tsx:64-83`: `genderStyles` uses heavy `border-gender-*-500` instead of `SCHEME` tokens (`border-gender-*-200/300`).
  - `learn/nouns.tsx:335`: `TabHero` uses `colorScheme="ocean"` (violates rule against showing case colors on gender-only views).
  - `learn/verbs.tsx:81`: `TabHero` uses `colorScheme="olive"` (violates Genitive case color reservation).
  - `learn/verbs/$verbId.tsx:120-128`: Maps verb families to `primary` (ocean), `secondary` (terracotta), and `success` (olive) instead of dedicated verb schemes: `verb-active` (Navy), `verb-contracted` (Slate), `verb-deponent` (Sunset).
  - `learn/verbs/$verbId.tsx:155`: Verb lemma uses `<MonoText variant="greek">`, which renders in terracotta (Accusative).
- **Typography & Greek First:**
  - `learn/index.tsx:6-50`: Hub cards omit the `greek` anchor prop.
  - `learn/index.tsx:60-61`: Heading uses sans `h1` instead of serif editorial hierarchy.
  - `learn/nouns.tsx:130`: Vocabulary nouns use `<MonoText>` instead of `font-sans` with `.greek-text`.
  - `learn/verbs/components/verb-inventory.tsx:306-335`: Group labels and exception callouts lack `.greek-text`.

### Actions
- [ ] Update hub cards in `learn/index.tsx` to include Greek anchors (`greek: "Διάλογοι"`, `greek: "Φράσεις"`, `greek: "Ουσιαστικά"`, `greek: "Ρήματα"`, `greek: "Βασικά"`).
- [ ] Set `colorScheme="stone"` on `TabHero` in `nouns.tsx` and `verbs.tsx`.
- [ ] Map verb families in `$verbId.tsx` to `SCHEME["verb-active"]`, `SCHEME["verb-contracted"]`, and `SCHEME["verb-deponent"]`.
- [ ] Switch vocabulary display in `nouns.tsx` to standard sans font with `.greek-text`.

---

## 3. Tailwind & Component Architecture

### Issues
- **Memory Hierarchy Bug in `verb-inventory.tsx:88`:**
  - In `ParadigmGrid`, `<MonoText variant="greek">` applies `font-semibold`. `weightOf()` overrides text color for anchor/receded rows but leaves `font-semibold` active, breaking the 3-weight visual hierarchy.
- **String Interpolations:**
  - `nouns.tsx:125, 127, 249`: Uses template strings for dynamic borders and backgrounds.

### Actions
- [ ] Fix `ParadigmGrid` in `verb-inventory.tsx` by introducing a `tv()` paradigm cell variant that explicitly resets `font-normal` on non-deviating rows:
```typescript
const paradigmCellVariants = tv({
  base: "greek-text font-mono text-sm",
  variants: {
    weight: {
      deviating: "font-semibold text-stone-900",
      anchor: "font-normal text-stone-700",
      receded: "font-normal text-stone-400",
    },
  },
  defaultVariants: { weight: "receded" },
});
```
- [ ] Convert `nouns.tsx` row styling to `cn()` and `tv()`.
- [ ] Refactor all `function` declarations across `learn/` to `const` arrow functions.
