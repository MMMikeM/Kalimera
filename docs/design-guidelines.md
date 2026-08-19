# Visual Design Guidelines for Greek Learning

Research-backed design principles for effective language learning interfaces.

## Core Principles

### 1. Cool Backgrounds, Warm Accents

**Research:** Cool colours (blue, green) promote relaxation and sustained focus. Warm colours (red, orange) increase arousal and draw attention.

**Application:**

- Use cream (`--color-cream`: `oklch(0.98 0 78)`) as the primary background for reading and study areas
- Reserve terracotta (`--color-terracotta`: `oklch(0.61 0.13 42)`) for interactive elements and emphasis
- Never use warm colours as large background fills

### 2. Maximum 3–4 Colours Per Context

**Research:** Colour-coding aids retention, but too many colours increase cognitive load and reverse the benefit.

**Application:**

- Show case colours OR gender colours, never both simultaneously
- Limit visible accent colours to 3–4 in any single view
- Use progressive disclosure: start without colour coding, add as concepts are introduced

### 3. AAA Contrast for Extended Reading

**Research:** 7:1 contrast ratio reduces eye strain during extended learning sessions.

**Application:**

- Body text must use high-contrast variants (`*-text` tokens)
- Base accent colours (terracotta, sunset, olive, ocean, honey, navy, slate) are for decorative use only
- Always pair accent backgrounds with their `-text` variant for any text content

### 4. Greek Text Rendering

**Research:** Greek characters are visually denser than Latin characters and require adjustments for equivalent readability.

**Application:**

- Render Greek at 1.1x the size of surrounding English text (`.greek-text`)
- Use line-height of 1.5–1.7 for mixed Greek/English content
- Add slight letter-spacing (+0.01em) to prevent character collision

---

## Colour Palette

### Base Colours

| Token | OKLCH Value | Use |
| --- | --- | --- |
| `cream` (`--color-cream` / `--color-cream-50`) | `oklch(0.98 0 78)` | Primary background |
| `cream-dark` (`--color-cream-dark` / `--color-cream-100`) | `oklch(0.94 0.01 82)` | Secondary background |
| `foreground` (`--color-foreground`) | `oklch(0.22 0.01 56)` | Primary text |
| `muted-foreground` (`--color-muted-foreground`) | `oklch(0.44 0.01 74)` | Secondary text |
| `stone-warm` (`--color-stone-warm`) | `oklch(0.55 0.01 58)` | Neutral warm tone |

### Accent Colours (Decorative Only)

These colours fail WCAG AA for body text on light backgrounds. Use only for:

- Borders and dividers
- Icons and decorative elements
- Large text (18px+ or 14px+ bold)
- Interactive state indicators

| Token | OKLCH Value | Contrast | Use |
| --- | --- | --- | --- |
| `terracotta` (`--color-terracotta`) | `oklch(0.61 0.13 42)` | ~3.9:1 | Primary actions, emphasis |
| `sunset` (`--color-sunset`) | `oklch(0.58 0.13 355)` | ~4.1:1 | Feminine accents, deponent verbs |
| `olive` (`--color-olive`) | `oklch(0.66 0.05 128)` | ~4.2:1 | Secondary accent, nature, connection |
| `ocean` (`--color-ocean`) | `oklch(0.56 0.06 224)` | ~4.1:1 | Tertiary accent, stability, calm |
| `honey` (`--color-honey`) | `oklch(0.76 0.12 82)` | ~3.2:1 | Highlights, hints, decision trees |
| `navy` (`--color-navy`) | `oklch(0.44 0.07 257)` | ~5.8:1 | Headings, active verbs, scholarly |
| `slate` (`--color-slate`) | `oklch(0.58 0.03 183)` | ~4.0:1 | Secondary accents, contracted verbs |

### Text-Safe Variants (AAA Compliant)

Use these for any text content. Contrast ratios are calculated against cream backgrounds and tinted backgrounds (e.g. `bg-honey-100`, `bg-case-accusative-100`).

| Token | OKLCH Value | On Cream | On Tinted BG |
| --- | --- | --- | --- |
| `terracotta-text` (`--color-terracotta-text`) | `oklch(0.31 0.05 40)` | 10:1+ | 10:1+ |
| `sunset-text` (`--color-sunset-text`) | `oklch(0.31 0.05 358)` | 10:1+ | 10:1+ |
| `olive-text` (`--color-olive-text`) | `oklch(0.31 0.05 131)` | 12:1+ | 12:1+ |
| `ocean-text` (`--color-ocean-text`) | `oklch(0.31 0.05 223)` | 11:1+ | 11:1+ |
| `honey-text` (`--color-honey-text`) | `oklch(0.34 0.07 81)` | 11:1+ | 11:1+ |
| `navy-text` (`--color-navy-text`) | `oklch(0.31 0.05 255)` | 12:1+ | 12:1+ |
| `slate-text` (`--color-slate-text`) | `oklch(0.31 0.05 182)` | 11:1+ | 11:1+ |

**Critical:** These colours are intentionally calibrated to maintain AAA compliance on tinted backgrounds.

---

## Grammar Semantic Colours

### Cases

Each Greek case has a reserved role scale in `src/index.css` (`@theme static`, hues 223, 60, 127). Only Nominative, Accusative, and Genitive have role tokens; there is no vocative token. Learner labels (Doer, Target, Owner) are taught alongside grammatical names:

| Case | Learner Label | Hue | Role Token Scale | Text Token (Verbatim OKLCH) | Rationale |
| --- | --- | --- | --- | --- | --- |
| Nominative | Doer | 223 | `--color-case-nominative-100..950` | `--color-case-nominative-text`: `oklch(0.34 0.06 223)` | Subject — stable, foundational |
| Accusative | Target | 60 | `--color-case-accusative-100..950` | `--color-case-accusative-text`: `oklch(0.35 0.08 60)` | Direct object — action target |
| Genitive | Owner | 127 | `--color-case-genitive-100..950` | `--color-case-genitive-text`: `oklch(0.34 0.09 127)` | Possession — connection, relation |

**Application via `SCHEME` and `GrammarTable`:**

Grammar colour is applied via the `SCHEME` record in `src/constants/grammar-palette.ts` and `GrammarTable` row definitions (`CASE_ROW_DEFS`):

```typescript
// src/constants/grammar-palette.ts
export const CASE_SCHEME: Record<CaseName, GrammarScheme> = {
 Nominative: "case-nominative",
 Accusative: "case-accusative",
 Genitive: "case-genitive",
};

// "case-nominative": { bg: "bg-case-nominative-100", border: "border-case-nominative-300", badgeBg: "bg-case-nominative-400", text: "text-case-nominative-text" }
// "case-accusative": { bg: "bg-case-accusative-100", border: "border-case-accusative-300", badgeBg: "bg-case-accusative-400", text: "text-case-accusative-text" }
// "case-genitive":   { bg: "bg-case-genitive-100",   border: "border-case-genitive-300",   badgeBg: "bg-case-genitive-400",   text: "text-case-genitive-text" }
```

```typescript
// src/components/GrammarTable.tsx
export const CASE_ROW_DEFS: RowDef[] = [
 { key: "nom", label: "Doer", sublabel: "Nominative", scheme: "case-nominative" },
 { key: "acc", label: "Target", sublabel: "Accusative", scheme: "case-accusative" },
 { key: "gen", label: "Owner", sublabel: "Genitive", scheme: "case-genitive" },
];
```

### Gender

Gender colours use reserved role tokens (`@theme static`, hues 268, 2, 171) applied through the `SCHEME` record:

| Gender | Hue | Role Token Scale | Text Token (Verbatim OKLCH) |
| --- | --- | --- | --- |
| Masculine | 268 | `--color-gender-masculine-100..950` | `--color-gender-masculine-text`: `oklch(0.47 0.12 268)` |
| Feminine | 2 | `--color-gender-feminine-100..950` | `--color-gender-feminine-text`: `oklch(0.49 0.18 2)` |
| Neuter | 171 | `--color-gender-neuter-100..950` | `--color-gender-neuter-text`: `oklch(0.51 0.1 171)` |

**Application via `SCHEME` and `GrammarTable`:**

```typescript
// src/constants/grammar-palette.ts
export const GENDER_SCHEME: Record<Gender, GrammarScheme> = {
 masculine: "gender-masculine",
 feminine: "gender-feminine",
 neuter: "gender-neuter",
};

// "gender-masculine": { bg: "bg-gender-masculine-100", border: "border-gender-masculine-200", badgeBg: "bg-gender-masculine-300", text: "text-gender-masculine-text" }
// "gender-feminine":  { bg: "bg-gender-feminine-100",  border: "border-gender-feminine-200",  badgeBg: "bg-gender-feminine-300",  text: "text-gender-feminine-text" }
// "gender-neuter":    { bg: "bg-gender-neuter-100",    border: "border-gender-neuter-200",    badgeBg: "bg-gender-neuter-300",    text: "text-gender-neuter-text" }
```

```typescript
// src/components/GrammarTable.tsx
export const GENDER_COLUMN_DEFS: ColumnDef[] = [
 { key: "masculine", label: "M", scheme: "gender-masculine" },
 { key: "feminine", label: "F", scheme: "gender-feminine" },
 { key: "neuter", label: "N", scheme: "gender-neuter" },
];
```

### Verb Schemes

Verb schemes encode local structural axes that do not claim global grammatical role. They map to base palette colours chosen not to collide with case/gender role tokens:

| Verb Scheme | Palette Key | Classes (`bg` / `border` / `badgeBg` / `text`) |
| --- | --- | --- |
| `verb-active` | Navy | `bg-navy-100`, `border-navy-300`, `bg-navy-300`, `text-navy-text` |
| `verb-contracted` | Slate | `bg-slate-100`, `border-slate-300`, `bg-slate-300`, `text-slate-text` |
| `verb-deponent` | Sunset | `bg-sunset-100`, `border-sunset-300`, `bg-sunset-300`, `text-sunset-text` |

### Learning Feedback

Feedback states use dedicated semantic tokens:

| State | Role Token | OKLCH Value | Light / Background Token | OKLCH Value |
| --- | --- | --- | --- | --- |
| Correct | `--color-correct` | `oklch(0.63 0.17 149)` | `--color-correct-light` | `oklch(0.96 0.04 157)` |
| Incorrect | `--color-incorrect` | `oklch(0.58 0.21 27)` | `--color-incorrect-light` | `oklch(0.94 0.03 18)` |
| Hint | `--color-hint` | `var(--color-honey)` (`oklch(0.76 0.12 82)`) | `--color-hint-light` | `oklch(0.96 0.06 96)` |

Feedback states are applied using standard Tailwind utility classes (e.g. `text-correct`, `bg-correct-light`, `text-incorrect`, `bg-incorrect-light`, `text-hint`, `bg-hint-light`).

---

## Typography

### Font Stack

```css
--font-serif: "Cormorant Garamond", Georgia, "Times New Roman", serif;
--font-sans: "DM Sans", system-ui, -apple-system, sans-serif;
```

### Usage

| Context | Font | Size / Utility |
| --- | --- | --- |
| Page titles | Serif | 2.5–3rem (`font-serif`) |
| Section headings | Serif / Sans | 1.5–2rem (`font-serif text-2xl` / `text-xl`) |
| Body text | Sans | 1rem (`font-sans`) |
| Greek vocabulary | Sans | 1.1x scale (`.greek-text` / `text-[1.1em]`) |
| Paradigm tables | Mono | 0.875–0.9rem (`MonoText` / `font-mono`) |
| Captions / labels | Sans | 0.75–0.875rem (`text-xs` / `text-sm`) |

### Greek Text Helper

Apply `.greek-text` to Greek content for proper sizing and optical balance:

```tsx
<span className="greek-text">Καλημέρα</span>
```

Definition in `src/index.css`:

```css
.greek-text {
 @apply text-[1.1em] leading-relaxed;
 letter-spacing: 0.01em;
}
```

---

## Layout Patterns

### Paradigm Tables

Reveal grammatical patterns through structure, not flat grids:

```text
         Singular    Plural
1st      με          μας
2nd      σε          σας
3rd m    τον         τους
3rd f    την         τις
3rd n    το          τα
```

This layout shows:

- Person progression (vertical)
- Number relationship (horizontal)
- Gender variations in 3rd person
- Pattern similarities (με/μας, σε/σας)

### Visual Hierarchy for Grammar Content

```text
Level 1: Section title (Cases, Pronouns)     → Largest, serif
Level 2: Category (Nominative, Accusative)   → Medium, sans bold
Level 3: Greek content                        → Prominent, 1.1x size
Level 4: English gloss                        → Smaller, muted colour
Level 5: Usage notes                          → Smallest, italic
```

### Spacing

- **Section separation:** 3rem minimum
- **Related item grouping:** 0.5rem
- **Table cell padding:** 1rem horizontal, 0.75rem vertical
- **Generous whitespace** reduces cognitive load

---

## Reusable UI Components

### Section Headings

Use `SectionHeading` (`src/components/SectionHeading.tsx`) for consistent hierarchy:

```tsx
<SectionHeading
 title="Cases"
 subtitle="The framework that explains why words change"
 level="h2"
/>
```

- Level variants:
  - `h2`: `font-serif text-2xl font-bold text-navy-text`
  - `h3`: `text-xl font-bold text-navy-text`
  - `h4`: `text-lg font-bold text-navy-text`
- Subtitle: `mt-1 text-slate-text`

### Teaching Cards

Use `TeachingCard` (`src/components/cards/TeachingCard.tsx`) for prominent grammar presentation cards mapped to a `GrammarScheme`:

```tsx
<TeachingCard
 scheme="case-accusative"
 eyebrow="Direct Object"
 title="Accusative Case"
 badge="Target"
 description="The direct recipient of an action."
 footer={<p className="text-xs text-stone-500">Always used after prepositions.</p>}
>
 <p>Grammar content here...</p>
</TeachingCard>
```

- Bound directly to `SCHEME[scheme]` for border, background, badge, and text styling
- Includes eyebrow, serif heading (`font-serif text-3xl`), optional pill badge, description, flexible children content, and optional footer

### Callouts

Use `Callout` (`src/components/cards/Callout.tsx`) for compact grammar notes and rules:

```tsx
<Callout
 scheme="decision"
 title="Key Rule"
 footer="Applies to all regular nouns."
>
 All prepositions in modern Greek take the accusative case.
</Callout>
```

- Bound to `SCHEME[scheme]` (`bg`, `border`, `text`)
- Supports optional `title`, `icon`, `children`, and separated `footer`

### Collapsible Sections

Use `CollapsibleSection` (`src/components/CollapsibleSection.tsx`) for progressive disclosure:

```tsx
<CollapsibleSection
 title="Quick Spot-Check"
 colorScheme="honey"
 defaultOpen={true}
>
 Content here
</CollapsibleSection>
```

- Built on `@base-ui/react/collapsible` with smooth motion transitions
- Available `colorScheme` values: `ocean | terracotta | sunset | olive | honey | navy | slate | stone | masculine | feminine | neuter` (default: `stone`)
- Includes `focus-visible:ring-2 focus-visible:ring-stone-900/30` on triggers for accessibility

### Decision Trees / Quick Tests

Use `QuickTest` (`src/components/QuickTest.tsx`) for step-by-step learner self-testing:

```tsx
<QuickTest
 title="Which preposition?"
 colorScheme="olive"
 options={[
  {
   answer: "σε / στο",
   condition: "Location where something IS or going TO",
   examples: [{ greek: "στο σπίτι", english: "at/to home" }],
  },
 ]}
 summary="Remember that σε contracts with the definite article."
/>
```

- Supported `colorScheme` values: `honey | ocean | olive | terracotta` (default: `honey`)
- Structured option list pairing answers with conditions and Greek/English examples

### Mistake Comparisons

Use `MistakeComparison` (`src/components/MistakeComparison.tsx`) for wrong vs correct pairs:

```tsx
<MistakeComparison
 mistakes={[
  {
   wrong: "με το φίλος",
   correct: "με τον φίλο",
   explanation: "Prepositions require the accusative case.",
  },
 ]}
 title="Common Preposition Mistakes"
 layout="list"
/>
```

- Explicit "Wrong:" / "Correct:" badges using `text-incorrect` / `AlertCircle` and `text-correct` / `CheckCircle`
- Never relies on colour alone for accessibility
- Supports `list` (default) and `grid` layouts

---

## Don'ts

1. **Don't use accent colours for body text** — Base accents fail contrast requirements; always use their `-text` variants
2. **Don't show case AND gender colours together** — Maximum 3–4 colours per context to avoid cognitive overload
3. **Don't misapply grammar role colours** — Grammar colour on or around Greek content asserts its grammatical value; use base palette or neutral stone for non-grammatical UI
4. **Don't render Greek at the same size as English** — Scale up by 1.1x using `.greek-text`
5. **Don't use SVG noise/grain textures** — They create visual artefacts
6. **Don't use opacity modifiers on text colours** — Breaks AAA contrast (see below)
7. **Don't use coloured shadows** — Use neutral shadows only (`shadow-sm`, `shadow-md`), never `shadow-{color}-*`

---

## Opacity Modifiers and Accessibility

### The Problem

Tailwind's opacity modifier syntax (`text-honey-text/80`) reduces contrast:

```tsx
// BAD - /80 reduces contrast by 20%, breaking AAA compliance
<p className="text-honey-text/80">This fails contrast</p>

// BAD - /70 is even worse
<p className="text-olive-text/70">This definitely fails</p>

// GOOD - Full opacity maintains designed contrast
<p className="text-honey-text">This passes AAA</p>
```

### Why This Happens

The `-text` colour variants are carefully calibrated to achieve 10:1+ contrast ratios on tinted backgrounds. Any opacity reduction (even `/90`) can drop below the 7:1 AAA threshold:

| Original Contrast | With /80 | With /70 |
| --- | --- | --- |
| 10:1 | ~8:1 | ~7:1 |
| 11:1 | ~9:1 | ~8:1 |

### Rule: Never Use Opacity on `-text` Colours

```tsx
// NEVER do this:
text-honey-text/80
text-ocean-text/70
text-olive-text/90

// Always use full opacity:
text-honey-text
text-ocean-text
text-olive-text
```

### When You Need Lighter Text

If you need visually lighter text (e.g. for secondary information), use `text-stone-600` or `text-stone-500` instead of opacity modifiers. Stone tokens are pre-validated for high contrast on cream backgrounds:

```tsx
// Instead of: text-honey-text/70
// Use: text-stone-600
<p className="text-stone-600">Secondary information</p>
```

### Background Opacity is OK

Opacity modifiers are fine for backgrounds since they do not affect text contrast:

```tsx
// GOOD - background opacity doesn't affect text readability
<div className="bg-honey-100">
 <p className="text-honey-text">Still readable</p>
</div>
```

### Can We Disable Opacity Modifiers?

**No.** Tailwind CSS v4 does not provide a configuration option to disable the `/` opacity modifier syntax.

**Enforcement options:**

1. **Pre-commit check:** `rg "text-[a-z]+-text/\d+" --type tsx`
2. **ESLint rule:** Custom rule to flag the pattern
3. **Code review:** Check for `/XX` on `-text` colour classes

---

## Quick Reference Colour Strategy

### Component-Level Colour Assignments

| Element | Colour Token / Pattern | Rationale |
| --- | --- | --- |
| Section h2/h3/h4 headings | `text-navy-text` | Scholarly, hierarchical |
| Subtitles / descriptions | `text-slate-text` | Subtle, supporting |
| Teaching cards & Callouts | `SCHEME[scheme]` (`bg`, `border`, `badgeBg`, `text`) | Semantic grammar mapping |
| Decision navigators & tests | `bg-honey-50`, `border-honey-300`, `text-honey-text` | Hints, warmth, navigation |
| Feedback — Correct | `text-correct` / `bg-correct-light` | Unambiguous positive feedback |
| Feedback — Incorrect | `text-incorrect` / `bg-incorrect-light` | Unambiguous error feedback |
| Decorative icons | Base colour (e.g. `text-honey`, `text-terracotta`) | Visual accent only |
| Text labels & inline badges | `-text` variant (e.g. `text-honey-text`, `text-terracotta-text`) | AAA compliance |

### Semantic Colour Mapping by Grammar Concept

| Concept | Scheme / Token | Rationale |
| --- | --- | --- |
| Cases — Nominative (Doer) | `case-nominative` (`--color-case-nominative-*`, hue 223) | Subject — foundational, stable |
| Cases — Accusative (Target) | `case-accusative` (`--color-case-accusative-*`, hue 60) | Direct object — action target |
| Cases — Genitive (Owner) | `case-genitive` (`--color-case-genitive-*`, hue 127) | Possession — connection, relation |
| Gender — Masculine | `gender-masculine` (`--color-gender-masculine-*`, hue 268) | Masculine nouns, articles, adjectives |
| Gender — Feminine | `gender-feminine` (`--color-gender-feminine-*`, hue 2) | Feminine nouns, articles, adjectives |
| Gender — Neuter | `gender-neuter` (`--color-gender-neuter-*`, hue 171) | Neuter nouns, articles, adjectives |
| Verbs — Active (-ω) | `verb-active` (`--color-navy-*`) | Active voice paradigm |
| Verbs — Contracted (-άω) | `verb-contracted` (`--color-slate-*`) | Contracted verb classes |
| Verbs — Deponent (-μαι) | `verb-deponent` (`--color-sunset-*`) | Deponent / medio-passive verbs |
| Decision / Navigation | `decision` (`--color-honey-*`) | Decision branching, heuristics |

---

## Sources

- [The Influence of Colour on Memory Performance (PMC)](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC3743993/)
- [The Impact of Color Cues on Learning (MDPI 2024)](https://www.mdpi.com/2076-328X/14/7/560)
- [Cold and Warm Colored Classrooms (ScienceDirect)](https://www.sciencedirect.com/science/article/abs/pii/S0360132321001360)
- [Cognitive Load Theory in UI Design](https://www.aufaitux.com/blog/cognitive-load-theory-ui-design/)
- [WCAG 2.1 Contrast Requirements](https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum.html)
- [Color-Coding in Teaching Grammar (Macrothink)](https://www.macrothink.org/journal/index.php/ijele/article/viewFile/19956/15445)
