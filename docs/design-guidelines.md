# Visual Design Guidelines for Greek Learning

Research-backed design principles for effective language learning interfaces.

## Core Principles

### 1. Cool Backgrounds, Warm Accents

**Research:** Cool colours (blue, green) promote relaxation and sustained focus. Warm colours (red, orange) increase arousal and draw attention.

**Application:**

- Use cream (`--color-cream`: `oklch(0.98 0 78)`) as the primary background for reading and study areas
- Reserve terracotta (`--color-terracotta`: `oklch(0.61 0.13 42)`) for interactive elements and emphasis. Primary buttons fill with `terracotta-600` (`oklch(0.58 0.13 37)`), because white on the base `-500` is 3.99:1, under AA
- Never use warm colours as large background fills

### 2. Maximum 3–4 Colours Per Context

**Research:** Colour-coding aids retention, but too many colours increase cognitive load and reverse the benefit. Colour also runs out: only about four values per axis stay discriminable, and case and gender used to compete for the same few.

**Application:**

- Grammar is shown by shape, not colour: see "Grammar Marks" below. Colour's one grammatical job is gender, on a mark
- Limit visible accent colours to 3–4 in any single view
- Use progressive disclosure: show only the grammatical axes a page teaches

### 3. AAA Contrast for Extended Reading

**Research:** 7:1 contrast ratio reduces eye strain during extended learning sessions.

**Application:**

- Body text must use high-contrast variants (`*-text` tokens)
- Base accent colours (terracotta, sunset, olive, ocean, honey, navy, slate) are for decorative use only
- Always pair accent backgrounds with their `-text` variant for any text content

### 4. Greek Text Rendering

**Research:** Greek characters are visually denser than Latin characters and require adjustments for equivalent readability.

**Application:**

- Render Greek through `<GreekText>`, never raw markup — it owns `lang="el"`, the
  `greek-text` class and the size scale
- Use line-height of 1.5–1.7 for mixed Greek/English content
- Add slight letter-spacing (+0.01em) to prevent character collision
- **No 1.1x scale.** It was removed: `<GreekText>` takes an explicit `size`, and a
  multiplier on top of that compounded unpredictably at every call site

---

## Colour Palette

### Base Colours

| Token                                                     | OKLCH Value           | Use                  |
| --------------------------------------------------------- | --------------------- | -------------------- |
| `cream` (`--color-cream` / `--color-cream-50`)            | `oklch(0.98 0 78)`    | Primary background   |
| `cream-dark` (`--color-cream-dark` / `--color-cream-100`) | `oklch(0.94 0.01 82)` | Secondary background |
| `foreground` (`--color-foreground`)                       | `oklch(0.22 0.01 56)` | Primary text         |
| `muted-foreground` (`--color-muted-foreground`)           | `oklch(0.44 0.01 74)` | Secondary text       |
| `stone-warm` (`--color-stone-warm`)                       | `oklch(0.55 0.01 58)` | Neutral warm tone    |

### Accent Colours (Decorative Only)

These colours fail WCAG AA for body text on light backgrounds. Use only for:

- Borders and dividers
- Icons and decorative elements
- Large text (18px+ or 14px+ bold)
- Interactive state indicators

| Token                               | OKLCH Value            | Contrast | Use                                  |
| ----------------------------------- | ---------------------- | -------- | ------------------------------------ |
| `terracotta` (`--color-terracotta`) | `oklch(0.61 0.13 42)`  | ~3.9:1   | Interactive accents, emphasis; primary buttons use `-600` |
| `sunset` (`--color-sunset`)         | `oklch(0.58 0.13 355)` | ~4.1:1   | Warm secondary accent                |
| `olive` (`--color-olive`)           | `oklch(0.66 0.05 128)` | ~4.2:1   | Secondary accent, nature, connection |
| `ocean` (`--color-ocean`)           | `oklch(0.56 0.06 224)` | ~4.1:1   | Tertiary accent, stability, calm     |
| `honey` (`--color-honey`)           | `oklch(0.76 0.12 82)`  | ~3.2:1   | Highlights, hints, decision trees    |
| `navy` (`--color-navy`)             | `oklch(0.44 0.07 257)` | ~5.8:1   | Headings, scholarly                  |
| `slate` (`--color-slate`)           | `oklch(0.58 0.03 183)` | ~4.0:1   | Secondary accents                    |

### Choosing Sibling Tints

**The ramps are not calibrated against each other.** Picking sibling tints at the same step
number does not give you balanced weight:

| Token   | `-100`                 | `-200`                 |
| ------- | ---------------------- | ---------------------- |
| `ocean` | `oklch(0.94 0.01 225)` | `oklch(0.87 0.03 219)` |
| `olive` | `oklch(0.94 0.01 132)` | `oklch(0.91 0.02 127)` |
| `cream` | `oklch(0.94 0.01 82)`  | `oklch(0.88 0.03 75)`  |
| `honey` | `oklch(0.94 0.04 94)`  | `oklch(0.88 0.07 92)`  |

`honey` carries roughly four times the chroma of the others at every step, so a set that
mixes it with `ocean` and `olive` will pull the eye to the honey group. At the `-100` step
`ocean` and `olive` are chroma `0.01` and read as grey. For a balanced set of sibling
tints, match chroma and lightness. `ocean-200` / `olive-200` / `cream-200` used to be a
matched trio, but the January tints restored on 2026-09-29 put `olive-200` at L 0.91 against
`ocean-200` at 0.87, so check the pair before relying on it.

### Text-Safe Variants (AAA Compliant)

Use these for any text content. Contrast ratios are calculated against cream backgrounds and tinted backgrounds (e.g. `bg-honey-100`).

Dark mode redefines every token under `:root.dark` in `src/index.css` (the remapping rule is in the comment above that block). There the `-text` tokens sit at L 0.88 and measure 10:1+ on their dark `-100` tints and 8.5:1+ on `-300`. Components rarely need `dark:` classes: use the tokens and both themes follow. The exception is a step that doesn't flip. `terracotta-700` keeps its value in dark mode and is too dark there, so the active mobile tab and the landing headline pair it with `dark:text-terracotta` or `dark:text-terracotta-text`.

| Token                                         | OKLCH Value            | On Cream | On Tinted BG |
| --------------------------------------------- | ---------------------- | -------- | ------------ |
| `terracotta-text` (`--color-terracotta-text`) | `oklch(0.35 0.08 47)`  | 11:1     | 9.7:1        |
| `sunset-text` (`--color-sunset-text`)         | `oklch(0.39 0.1 357)`  | 9.6:1    | 8.5:1        |
| `olive-text` (`--color-olive-text`)           | `oklch(0.31 0.05 131)` | 12:1+    | 12:1+        |
| `ocean-text` (`--color-ocean-text`)           | `oklch(0.31 0.05 223)` | 11:1+    | 11:1+        |
| `honey-text` (`--color-honey-text`)           | `oklch(0.34 0.07 81)`  | 11:1+    | 11:1+        |
| `navy-text` (`--color-navy-text`)             | `oklch(0.27 0.04 252)` | 14:1     | 12:1         |
| `slate-text` (`--color-slate-text`)           | `oklch(0.28 0.03 183)` | 13:1     | 11:1         |

**Critical:** These colours are intentionally calibrated to maintain AAA compliance on tinted backgrounds.

---

## Grammar Marks

Case, number and gender are drawn under the Greek by `<GrammarMark>` (`src/components/GrammarMark.tsx`), not carried by colour:

| Channel   | Shows  | Values                                                                               |
| --------- | ------ | ------------------------------------------------------------------------------------ |
| End shape | Case   | `<->` Doer (nominative) · `>-<` Target (accusative) · `o-o` Owner (genitive) · `!-!` Calling (vocative) |
| Lines     | Number | one line = one · two lines = more than one                                           |
| Colour    | Gender | the gender's `-700` step, from `GENDER_MARK` in `src/constants/grammar-palette.ts`   |

```tsx
<GrammarMark case="accusative" gender="feminine" plural>τις γυναίκες</GrammarMark>
```

The shapes are symmetric on purpose. A one-sided arrow would claim the action flows left to right, and case exists precisely because word order does not decide who does what: «Τον Γιάννη βλέπει η Μαρία» puts the Target first.

**Rules:**

- Mark the whole phrase, article included, never a bare ending. A one-letter ending is too short to carry two end shapes.
- Show only the axes the page teaches. A page about case passes no `gender`, and the mark is neutral stone.
- Marks are for nouns, articles, adjectives and pronouns. Do not reuse the shapes for another meaning on verb pages.
- A marked phrase never wraps; a line break moves the phrase and its mark together.
- Filled end shapes are the default: they hold their shape at text size. `outlined` suits large display.

**Geometry** lives in `src/components/grammar-mark-geometry.ts`. Every end shape is 9px tall; each line runs in under its end shape so none stops short; a pair of lines mirrors about the centre. Every edge sits on the half-pixel grid, which is a whole pixel on a 2× screen, so lines render as solid rows. The vocative is an exclamation mark whose bar stops at the lower plural line and whose dot hangs below the shared height. A mark is never narrower than 30px and is inset 2px from each end of its phrase, so neighbouring marks keep a gap.

**Checks:** `/specimens/grammar-mark` (dev only) shows every case, gender and number and the layouts that break marks. `e2e/grammar-mark.spec.ts` photographs it and checks the no-wrap, width and symmetry rules; `grammar-mark-geometry.test.ts` checks the geometry.

### Colour is open for the redesign

Colour no longer encodes case, and no lint or rule restricts where a colour may appear. The case scales were removed on 2026-09-29; pages built before the marks lost their case colour until they are redesigned. The `gender-*` scales stay: `<GrammarMark>` uses their `-700` steps.

## Feedback Colours

Feedback states use dedicated semantic tokens:

| State     | Role Token          | OKLCH Value                                  | Light / Background Token  | OKLCH Value            |
| --------- | ------------------- | -------------------------------------------- | ------------------------- | ---------------------- |
| Correct   | `--color-correct`   | `oklch(0.63 0.17 149)`                       | `--color-correct-light`   | `oklch(0.96 0.04 157)` |
| Incorrect | `--color-incorrect` | `oklch(0.58 0.21 27)`                        | `--color-incorrect-light` | `oklch(0.94 0.03 18)`  |
| Hint      | `--color-hint`      | `var(--color-honey)` (`oklch(0.76 0.12 82)`) | `--color-hint-light`      | `oklch(0.96 0.06 96)`  |

Text uses the `-text` variants, the same rule as the base palette: `--color-correct-text` (`oklch(0.42 0.12 149)`, 7.6:1 on cream) and `--color-incorrect-text` (`oklch(0.45 0.17 27)`, 7.7:1). The role tokens themselves are for bars, borders and icons; `text-correct` on cream is 3.1:1 and fails even AA.

Feedback states are applied using standard Tailwind utility classes (e.g. `text-correct-text`, `bg-correct-light`, `text-incorrect-text`, `bg-incorrect-light`, `bg-correct` for the drill timer bar).

---

## Typography

### Font Stack

```css
--font-serif: "Cormorant Garamond", Georgia, "Times New Roman", serif;
--font-sans: "DM Sans", system-ui, -apple-system, sans-serif;
```

### Usage

| Context           | Font         | Size / Utility                               |
| ----------------- | ------------ | -------------------------------------------- |
| Page titles       | Serif        | 2.25rem, 3rem from `sm` (`PageHeading`: `font-serif text-4xl sm:text-5xl`) |
| Section headings  | Serif / Sans | 1.25–1.5rem (`font-serif text-2xl` / `text-xl`) |
| Body text         | Sans         | 1rem (`font-sans`)                           |
| Greek vocabulary  | Sans         | `<GreekText size="…">`                       |
| Paradigm tables   | Sans         | `<GreekText size="base">` in a `td`          |
| Captions / labels | Sans         | 0.75–0.875rem (`text-xs` / `text-sm`)        |

### Greek Text Helper

Never apply `.greek-text` yourself. `<GreekText>` applies it, along with `lang="el"`:

```tsx
<GreekText size="lg">Καλημέρα</GreekText>
<GreekText as="td" size="sm">{form}</GreekText>
```

The gender and case `tone` values (`tone="masculine"`, `tone="genitive"`) are legacy: they
colour Greek by grammar, which `<GrammarMark>` now does instead. Existing pages still use
them until the redesign; don't reach for them in new work.

Definition in `src/index.css` (no size — `<GreekText>` carries the scale):

```css
.greek-text {
	@apply leading-relaxed;
	letter-spacing: 0.01em;
}
```

**Fonts:** Greek renders in the proportional brand stack everywhere, paradigm tables
included. Monospace was never a deliberate choice — there is no `--font-mono` token, so
`font-mono` fell through to an unchosen system stack.

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
Level 3: Greek content                        → Prominent, <GreekText size>
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
<SectionHeading title="Cases" subtitle="The framework that explains why words change" level="h2" />
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
	footer={<p className="text-xs text-stone-500">Used after everyday prepositions.</p>}
>
	<p>Grammar content here...</p>
</TeachingCard>
```

- Bound directly to `SCHEME[scheme]` for border, background and text styling; the badge takes `badgeBg` with `badgeText`
- Includes eyebrow, serif heading (`font-serif text-3xl`), optional pill badge, description, flexible children content, and optional footer

### Callouts

Use `Callout` (`src/components/cards/Callout.tsx`) for compact grammar notes and rules:

```tsx
<Callout scheme="decision" title="Key Rule" footer="Applies to all regular nouns.">
	Everyday prepositions in modern Greek take the accusative case.
</Callout>
```

- Bound to `SCHEME[scheme]` (`bg`, `border`, `text`)
- Supports optional `title`, `icon`, `children`, and separated `footer`

### Collapsible Sections

Use `CollapsibleSection` (`src/components/CollapsibleSection.tsx`) for progressive disclosure:

```tsx
<CollapsibleSection title="Quick Spot-Check" colorScheme="honey" defaultOpen={true}>
	Content here
</CollapsibleSection>
```

- Built on `@base-ui/react/collapsible` with smooth motion transitions
- Available `colorScheme` values: `ocean | terracotta | sunset | olive | honey | navy | slate | stone` (default: `stone`). These are base-palette chrome from `src/lib/colors.ts`; grammar is shown with `<GrammarMark>`, never here
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
/>
```

- Props: `mistakes` and an optional `cardClassName` (default `bg-cream-dark`); one card per mistake, stacked
- Explicit "Wrong:" / "Correct:" labels in `text-incorrect-text` / `text-correct-text`, each with an `AlertCircle` / `CheckCircle` icon; the Greek renders through `<GreekText tone="incorrect">` (struck through) and `<GreekText tone="correct">`
- Never relies on colour alone for accessibility

### Page Chrome, Status and Drill Feedback

- **`ButtonLink`** (`src/components/ui/button.tsx`): navigation styled as a button, with `Button`'s `variant` and `size`. Never put a `<Button>` inside a `<Link>`; that is two tab stops and invalid HTML. Both default to `primary`.
- **`BackLink`** (`src/components/BackLink.tsx`): the back link. Label it with where it goes ("Learn", "Exit"), never with the current page's name.
- **`PageHeading`** (`src/components/PageHeading.tsx`): set every page title with it, with the lede as children.
- **`StatusPage`** (`src/components/StatusPage.tsx`): exports `RouteError`, `RootError` and `NotFound`. A failed page and a 404 render inside the app shell, so the header and navigation still work; only `RootError`, for when the shell itself fails, renders without them.
- **`Verdict`** (`src/components/Verdict.tsx`): the drill verdict line, "Correct", "Incorrect" or "Time's up", in `text-correct-text` / `text-incorrect-text`. Drills and the landing demo share it.
- **`MarkedGreek`** (`src/components/MarkedGreek.tsx`): colours only the case-bearing words of a phrase and leaves the rest neutral. The data names those words in a `marked` field, verbatim and in reading order.
- **`SectionIndex`** (`src/components/SectionIndex.tsx`): the Greek-first ruled table of contents for section landings (`/learn`, `/learn/essentials`, `/reference`). No cards and no tints.

---

## Don'ts

1. **Don't use accent colours for body text** — Base accents fail contrast requirements; always use their `-text` variants
2. **Don't hand-roll Greek markup** — No raw `lang="el"` spans and no `greek-text` class at call sites; use `<GreekText>`. `pnpm lint:greek` enforces it
3. **Don't use SVG noise/grain textures** — They create visual artefacts
4. **Don't use opacity modifiers on text colours** — Breaks AAA contrast (see below)
5. **Don't use coloured shadows** — Use neutral shadows only (`shadow-sm`, `shadow-md`), never `shadow-{color}-*`

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

The `-text` colour variants are calibrated to at least 8.5:1 on their own tints, most of them 10:1 or more. Any opacity reduction (even `/90`) can drop below the 7:1 AAA threshold:

| Original Contrast | With /80 | With /70 |
| ----------------- | -------- | -------- |
| 10:1              | ~8:1     | ~7:1     |
| 11:1              | ~9:1     | ~8:1     |

### Rule: Never Use Opacity on `-text` Colours

```tsx
// NEVER do this:
text - honey - text / 80;
text - ocean - text / 70;
text - olive - text / 90;

// Always use full opacity:
text - honey - text;
text - ocean - text;
text - olive - text;
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

1. **Pre-commit check:** `rg "text-[a-z-]+-text/\d+" -g '*.tsx'`
2. **ESLint rule:** Custom rule to flag the pattern
3. **Code review:** Check for `/XX` on `-text` colour classes

---

## Quick Reference Colour Strategy

### Component-Level Colour Assignments

| Element                     | Colour Token / Pattern                                           | Rationale                     |
| --------------------------- | ---------------------------------------------------------------- | ----------------------------- |
| Page titles, section headings | `text-stone-900` (`PageHeading`, `BandHeading`); the older `SectionHeading` still sets `text-navy-text` | Neutral                       |
| Index group labels, ledes   | `text-stone-600` (`SectionIndex` groups, `BandHeading` lede); `SectionHeading` subtitle is `text-slate-text` | Subtle, supporting            |
| Teaching cards & Callouts   | `SCHEME[scheme]` (`bg`, `border`, `text`; badges `badgeBg` with `badgeText`) | Legacy grammar mapping, pending the redesign |
| Decision navigators & tests | `NavigatorCard`: `bg-honey-50`, `border-honey-300`; `QuickTest` (honey): `bg-honey-100`, `border-honey-400`; `SCHEME.decision`: `bg-honey-50`, `border-honey-200`; text `text-honey-text` in all three | Hints, warmth, navigation     |
| Feedback — Correct          | `text-correct-text` / `bg-correct-light`                         | Unambiguous positive feedback |
| Feedback — Incorrect        | `text-incorrect-text` / `bg-incorrect-light`                     | Unambiguous error feedback    |
| Decorative icons            | Base colour (e.g. `text-honey`, `text-terracotta`)               | Visual accent only            |
| Text labels & inline badges | `-text` variant (e.g. `text-honey-text`, `text-terracotta-text`) | AAA compliance                |

---

## Sources

- [The Influence of Colour on Memory Performance (PMC)](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC3743993/)
- [The Impact of Color Cues on Learning (MDPI 2024)](https://www.mdpi.com/2076-328X/14/7/560)
- [Cold and Warm Colored Classrooms (ScienceDirect)](https://www.sciencedirect.com/science/article/abs/pii/S0360132321001360)
- [Cognitive Load Theory in UI Design](https://www.aufaitux.com/blog/cognitive-load-theory-ui-design/)
- [WCAG 2.1 Contrast Requirements](https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum.html)
- [Color-Coding in Teaching Grammar (Macrothink)](https://www.macrothink.org/journal/index.php/ijele/article/viewFile/19956/15445)
