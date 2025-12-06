# Visual Design Guidelines for Greek Learning

Research-backed design principles for effective language learning interfaces.

## Core Principles

### 1. Cool Backgrounds, Warm Accents

**Research:** Cool colors (blue, green) promote relaxation and sustained focus. Warm colors (red, orange) increase arousal and draw attention.

**Application:**
- Use cream (`#FAF8F5`) as the primary background for reading/study areas
- Reserve terracotta (`#C4663F`) for interactive elements and emphasis
- Never use warm colors as large background fills

### 2. Maximum 3-4 Colors Per Context

**Research:** Color-coding aids retention, but too many colors increases cognitive load and reverses the benefit.

**Application:**
- Show case colors OR gender colors, never both simultaneously
- Limit visible accent colors to 3-4 in any single view
- Use progressive disclosure: start without color coding, add as concepts are introduced

### 3. AAA Contrast for Extended Reading

**Research:** 7:1 contrast ratio reduces eye strain during extended learning sessions.

**Application:**
- Body text must use high-contrast variants (`*-text` tokens)
- Accent colors (terracotta, olive, aegean, honey) are for decorative use only
- Always pair accent backgrounds with their `-text` variant for any text content

### 4. Greek Text Rendering

**Research:** Greek characters are visually denser than Latin characters and require adjustments for equivalent readability.

**Application:**
- Render Greek at 1.1x the size of surrounding English text
- Use line-height of 1.5-1.7 for mixed Greek/English content
- Add slight letter-spacing (+0.01em) to prevent character collision

---

## Color Palette

### Base Colors

| Token | Hex | Use |
|-------|-----|-----|
| `cream` | `#FAF8F5` | Primary background |
| `cream-dark` | `#F5F1EB` | Secondary background |
| `foreground` | `#1c1917` | Primary text |
| `muted-foreground` | `#57534e` | Secondary text |

### Accent Colors (Decorative Only)

These colors fail WCAG AA for body text. Use only for:
- Borders and dividers
- Icons and decorative elements
- Large text (18px+ or 14px+ bold)
- Interactive state indicators

| Token | Hex | Contrast | Use |
|-------|-----|----------|-----|
| `terracotta` | `#C4663F` | 3.9:1 | Primary actions, emphasis |
| `olive` | `#6B7B5C` | 4.2:1 | Nature, connection |
| `aegean` | `#4A7C8F` | 4.1:1 | Stability, calm |
| `honey` | `#D4A853` | 3.2:1 | Highlights, hints |

### Text-Safe Variants (AAA Compliant)

Use these for any text content. Contrast ratios calculated against both cream backgrounds AND tinted backgrounds (e.g., `bg-honey/10`).

| Token | Hex | On Cream | On Tinted BG |
|-------|-----|----------|--------------|
| `terracotta-text` | `#5C2D14` | 10:1+ | 10:1+ |
| `olive-text` | `#1F2A18` | 12:1+ | 12:1+ |
| `aegean-text` | `#14333F` | 11:1+ | 11:1+ |
| `honey-text` | `#4A3508` | 11:1+ | 11:1+ |

**Critical:** These colors are intentionally very dark to maintain AAA compliance on tinted backgrounds.

### Expanded Greek Palette

Additional colors inspired by Greek landscapes and pottery:

| Token | Hex | Contrast | Use |
|-------|-----|----------|-----|
| `santorini` | `#02B8D9` | 3.1:1 | Links, interactive, modern accent |
| `navy` | `#3B5478` | 5.8:1 | Headings, emphasis, scholarly |
| `slate` | `#66817C` | 4.0:1 | Secondary accents, subtle contrast |

### Expanded Palette Text-Safe Variants

| Token | Hex | On Cream | On Tinted BG |
|-------|-----|----------|--------------|
| `santorini-text` | `#084A52` | 9:1+ | 9:1+ |
| `navy-text` | `#1A2838` | 12:1+ | 12:1+ |
| `slate-text` | `#1A2D2A` | 11:1+ | 11:1+ |

---

## Grammar Semantic Colors

### Cases

Each Greek case has an assigned color based on its grammatical function:

| Case | Color | Rationale |
|------|-------|-----------|
| Nominative | Aegean (blue) | Subject - stable, foundational |
| Accusative | Terracotta (orange) | Direct object - action target |
| Genitive | Olive (green) | Possession - connection, relation |
| Vocative | Honey (gold) | Direct address - attention-getting |

**CSS Classes:**
```css
.case-nominative    /* Left border indicator */
.case-accusative
.case-genitive
.case-vocative

.case-badge-nominative    /* Inline badge with text */
.case-badge-accusative
.case-badge-genitive
.case-badge-vocative
```

### Gender

Gender colors are intentionally subtle - use only as thin left borders, never as backgrounds or text colors.

| Gender | Color |
|--------|-------|
| Masculine | `#5B8DEF` (blue tint) |
| Feminine | `#E57399` (rose tint) |
| Neuter | `#9CA3AF` (gray) |

**CSS Classes:**
```css
.gender-masculine    /* 3px left border at 60% opacity */
.gender-feminine
.gender-neuter
```

### Learning Feedback

| State | Border | Background |
|-------|--------|------------|
| Correct | `#16A34A` | `#DCFCE7` |
| Incorrect | `#DC2626` | `#FEE2E2` |
| Hint | `#D4A853` | `#FEF3C7` |

**CSS Classes:**
```css
.feedback-correct
.feedback-incorrect
.feedback-hint
```

---

## Typography

### Font Stack

```css
--font-serif: "Cormorant Garamond", Georgia, serif;
--font-sans: "DM Sans", system-ui, sans-serif;
```

### Usage

| Context | Font | Size |
|---------|------|------|
| Page titles | Serif | 2.5-3rem |
| Section headings | Serif | 1.5-2rem |
| Body text | Sans | 1rem |
| Greek vocabulary | Sans | 1.1rem (1.1x scale) |
| Paradigm tables | Mono | 0.9rem |
| Captions/labels | Sans | 0.875rem |

### Greek Text Helper

Apply `.greek-text` class to Greek content for proper sizing and spacing:

```tsx
<span className="greek-text">Καλημέρα</span>
```

---

## Layout Patterns

### Paradigm Tables

Reveal grammatical patterns through structure, not flat grids:

```
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

```
Level 1: Section title (Cases, Pronouns)     → Largest, serif
Level 2: Category (Nominative, Accusative)   → Medium, sans bold
Level 3: Greek content                        → Prominent, 1.1x size
Level 4: English gloss                        → Smaller, muted color
Level 5: Usage notes                          → Smallest, italic
```

### Spacing

- **Section separation:** 3rem minimum
- **Related item grouping:** 0.5rem
- **Table cell padding:** 1rem horizontal, 0.75rem vertical
- **Generous whitespace** reduces cognitive load

---

## Component Classes

### Cards

```css
.card-warm    /* Warm shadow, slight transparency */
```

### Focus States

```css
.focus-ring    /* Terracotta ring on focus-visible */
```

### Prose

```css
.prose-warm    /* Stone-700 text, relaxed leading */
```

---

## Don'ts

1. **Don't use accent colors for body text** - They fail contrast requirements
2. **Don't show cases AND gender colors together** - Maximum 3-4 colors per context
3. **Don't use heavy background fills for grammar coding** - Use subtle left borders instead
4. **Don't render Greek at the same size as English** - Scale up by 1.1x
5. **Don't use SVG noise/grain textures** - They create JPEG-like artifacts
6. **Don't use opacity modifiers on text colors** - See below

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

The `-text` color variants are carefully calibrated to achieve 10:1+ contrast ratios on tinted backgrounds. Any opacity reduction (even `/90`) can drop below the 7:1 AAA threshold:

| Original | With /80 | With /70 |
|----------|----------|----------|
| 10:1 | ~8:1 | ~7:1 |
| 11:1 | ~9:1 | ~8:1 |

### Rule: Never Use Opacity on `-text` Colors

```tsx
// NEVER do this:
text-honey-text/80
text-aegean-text/70
text-olive-text/90

// Always use full opacity:
text-honey-text
text-aegean-text
text-olive-text
```

### When You Need Lighter Text

If you need visually lighter text (e.g., for secondary information), use `text-stone-600` instead of opacity modifiers. Stone-600 is pre-validated for AAA contrast.

```tsx
// Instead of: text-honey-text/70
// Use: text-stone-600
<p className="text-stone-600">Secondary information</p>
```

### Background Opacity is OK

Opacity modifiers are fine for backgrounds since they don't affect text contrast:

```tsx
// GOOD - background opacity doesn't affect text readability
<div className="bg-honey/10">
  <p className="text-honey-text">Still readable</p>
</div>
```

### Can We Disable Opacity Modifiers?

**No.** Tailwind CSS v4 doesn't provide a configuration option to disable the `/` opacity modifier syntax. It's a core feature.

**Enforcement options:**
1. **Pre-commit check:** `rg "text-[a-z]+-text/\d+" --type tsx`
2. **ESLint rule:** Custom rule to flag the pattern
3. **Code review:** Check for `/XX` on `-text` color classes

---

## Reusable UI Patterns

### Section Headings

Use `SectionHeading` component for consistent navy/slate styling:

```tsx
<SectionHeading
  title="Cases"
  subtitle="The framework that explains why words change"
  level="h2"
/>
```

- H2: `text-2xl font-bold text-navy-text`
- H3: `text-xl font-bold text-navy-text`
- Subtitle: `text-slate-text mt-1`

### Key Insights

Use `KeyInsight` component for prominent callouts:

```tsx
<KeyInsight
  title="All prepositions take accusative"
  expandedExample={{
    label: "What this means",
    content: <div>Use τον/την/το after prepositions...</div>
  }}
>
  No exceptions! This simplifies things.
</KeyInsight>
```

- Santorini color scheme (`bg-santorini/5`, `border-santorini/30`)
- Optional expandable example for concrete demonstrations
- Use for "most important thing to know" content

### Collapsible Sections

Use `CollapsibleSection` component with color schemes:

```tsx
<CollapsibleSection
  title="Quick Spot-Check"
  colorScheme="honey"
  defaultOpen={true}
>
  Content here
</CollapsibleSection>
```

Available color schemes: `honey | aegean | olive | terracotta | santorini | navy | default`

Always includes `focus-visible:ring-2` for accessibility.

### Decision Trees / Quick Tests

Use `QuickTest` component for self-testing patterns:

```tsx
<QuickTest
  title="Which preposition?"
  colorScheme="olive"
  options={[
    {
      answer: "σε / στο",
      condition: "Location where something IS or going TO",
      examples: [{ greek: "στο σπίτι", english: "at/to home" }]
    }
  ]}
/>
```

Excellent pedagogy - replicate across sections. Based on "Which me/you do I use?" pattern.

### Mistake Comparisons

Use `MistakeComparison` component for wrong/correct pairs:

```tsx
<MistakeComparison
  mistakes={AGREEMENT_MISTAKES}
  title="Common Agreement Mistakes"
/>
```

- Always includes "Wrong:" / "Correct:" text labels
- Never relies on color alone (accessibility)

### Category Cards

Use `CategoryCard` component for content differentiation by importance:

```tsx
<CategoryCard
  title="Object Pronouns"
  priority="primary"
  colorScheme="aegean"
  badge="Essential"
>
  Content here
</CategoryCard>
```

Priority levels:
- `primary` - Essential content (most prominent styling)
- `secondary` - Standard content
- `tertiary` - Nice-to-know (subtle styling)

---

## Quick Reference Color Strategy

### Component-Level Color Assignments

| Element | Color Token | Rationale |
|---------|-------------|-----------|
| Section h2/h3 headings | `text-navy-text` | Scholarly, hierarchical |
| Subtitles/descriptions | `text-slate-text` | Subtle, supporting |
| Interactive (collapsibles, links) | `text-santorini-text` | Interactive affordance |
| Key insight callouts | `bg-santorini/5`, `border-santorini/30` | Attention, important |
| Tips and self-tests | `bg-honey/5`, `border-honey/30` | Hints, warmth |
| Decorative icons | Base color (e.g., `text-honey`) | Visual accent only |
| Icon labels/text | `-text` variant (e.g., `text-honey-text`) | AAA compliance |

### Semantic Color Mapping by Grammar Concept

| Concept | Color | Rationale |
|---------|-------|-----------|
| Cases - Nominative | Aegean | Subject - stable, foundational |
| Cases - Accusative | Terracotta | Object - action target |
| Cases - Genitive | Olive | Possession - connection |
| Cases - Vocative | Honey | Address - attention |
| Verbs - Active (-ω) | Aegean | Standard, calm |
| Verbs - Contracted (-άω) | Terracotta | Emphasis, variation |
| Verbs - Deponent (-μαι) | Olive | Passive-looking |
| Prepositions - σε | Olive | Location (contracts) |
| Prepositions - από | Aegean | Origin (no contraction) |

---

## Sources

- [The Influence of Colour on Memory Performance (PMC)](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC3743993/)
- [The Impact of Color Cues on Learning (MDPI 2024)](https://www.mdpi.com/2076-328X/14/7/560)
- [Cold and Warm Colored Classrooms (ScienceDirect)](https://www.sciencedirect.com/science/article/abs/pii/S0360132321001360)
- [Cognitive Load Theory in UI Design](https://www.aufaitux.com/blog/cognitive-load-theory-ui-design/)
- [WCAG 2.1 Contrast Requirements](https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum.html)
- [Color-Coding in Teaching Grammar (Macrothink)](https://www.macrothink.org/journal/index.php/ijele/article/viewFile/19956/15445)
