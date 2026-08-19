# Plan: `src/routes/practice/components` Alignment & Polish

Audit feedback and implementation plan for `src/routes/practice/components/` (and `src/routes/practice/components/engines/`).

---

## 1. Design Guidelines & Contrast

### Issues
- **Grammar Role Token Drift:**
  - `ParadigmTable.tsx:12-14`: Column headers use base palette tokens (`text-navy-text`, `text-sunset-text`, `text-slate-text`) for grammatical genders.
  - `engines/drill-constants.ts:4-8` & `chip-specs.ts:49-68`: Gender chips map to `navy` and `slate` instead of `gender-*` tokens (`bg-gender-masculine-100 text-gender-masculine-text`, etc.).
  - `engines/chip-specs.ts:85-104`: `PERSON_CHIP` (1st, 2nd, 3rd) all use `text-terracotta-text` (Accusative/Target color). Person should use neutral `text-stone-700` or `text-foreground`.
  - `engines/chip-specs.ts:135-139`: `CASE_BAR` uses base palette keys (`bg-ocean`, `bg-terracotta`, `bg-olive`) instead of case semantic tokens (`bg-case-*-500`).
  - `PhaseSection.tsx:3-8`: Uses non-`-text` mid-tones (`text-ocean-600`) and border opacity (`border-ocean/50`).
- **Forbidden Opacity on Text Tokens:**
  - `engines/forward-prompt-card.tsx:30`: `opacity-40` modifier applied over text token container.
  - `engines/shells.tsx:508`: `bg-incorrect/10` opacity modifier on mistake count badge.
  - `engines/reverse/self-assess.tsx:58-66`: Uses slash opacity buttons (`border-incorrect/30`, `border-correct/30`).
- **Typography:**
  - `ParadigmTable.tsx:8, 20, 26`: Data cells use sans-serif instead of `font-mono tabular-nums text-[0.875rem]`.

### Actions
- [ ] Update `ParadigmTable.tsx`, `drill-constants.ts`, and `chip-specs.ts` to use `gender-*` and `case-*` role tokens.
- [ ] Remove `opacity-40` in `forward-prompt-card.tsx` and use `text-stone-400`.
- [ ] Replace `bg-incorrect/10` and slash-opacity buttons in `shells.tsx` and `self-assess.tsx` with solid semantic tokens (`bg-incorrect-light text-incorrect`, `bg-correct-light text-correct`).
- [ ] Apply `font-mono tabular-nums text-[0.875rem]` to data cells in `ParadigmTable.tsx`.

---

## 2. Tailwind & `tailwind-variants`

### Issues
- **Zero `tv()` Usage Across Engines:**
  - `shells.tsx:28-40`: `SelectorButton` uses manual string concatenations and prop-drilled class strings.
  - Custom progress bars lack ARIA and Base-UI primitives.

### Actions
- [ ] Implement `selectorButtonVariants` with `tv()` in `shells.tsx`:
```typescript
export const selectorButtonVariants = tv({
  base: "rounded-lg border px-3 py-2 text-sm font-medium transition-colors disabled:opacity-40",
  variants: {
    selected: {
      true: "border-transparent",
      false: "border-border bg-transparent text-foreground hover:border-stone-400",
    },
    scheme: {
      terracotta: "",
      ocean: "",
      olive: "",
      honey: "",
      masculine: "",
      feminine: "",
      neuter: "",
      stone: "",
    },
  },
  compoundVariants: [
    { selected: true, scheme: "terracotta", className: "bg-terracotta-100 text-terracotta-text" },
    { selected: true, scheme: "ocean", className: "bg-ocean-100 text-ocean-text" },
    { selected: true, scheme: "olive", className: "bg-olive-100 text-olive-text" },
    { selected: true, scheme: "honey", className: "bg-honey-100 text-honey-text" },
    { selected: true, scheme: "masculine", className: "bg-gender-masculine-100 text-gender-masculine-text" },
    { selected: true, scheme: "feminine", className: "bg-gender-feminine-100 text-gender-feminine-text" },
    { selected: true, scheme: "neuter", className: "bg-gender-neuter-100 text-gender-neuter-text" },
    { selected: true, scheme: "stone", className: "bg-stone-100 text-stone-800" },
  ],
  defaultVariants: {
    selected: false,
    scheme: "stone",
  },
});
```
- [ ] Implement `phaseHeaderVariants` with `tv()` in `PhaseSection.tsx`.
- [ ] Replace custom progress div with `@base-ui/react/progress` or accessible progress wrapper.
