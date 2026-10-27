---
name: Kalimera
description: A Greek grammar study guide that draws grammar under the words instead of colouring it.
colors:
  cream: "oklch(0.98 0 78)"
  cream-dark: "oklch(0.94 0.01 82)"
  foreground: "oklch(0.22 0.01 56)"
  muted-foreground: "oklch(0.44 0.01 74)"
  card: "oklch(1 0 90)"
  border: "oklch(0.87 0 56)"
  stone-200: "oklch(92.3% 0.003 48.717)"
  stone-300: "oklch(86.9% 0.005 56.366)"
  stone-600: "oklch(44.4% 0.011 73.639)"
  stone-700: "oklch(37.4% 0.01 67.558)"
  stone-800: "oklch(26.8% 0.007 34.298)"
  stone-900: "oklch(21.6% 0.006 56.043)"
  terracotta: "oklch(0.61 0.13 42)"
  terracotta-600: "oklch(0.58 0.13 37)"
  terracotta-700: "oklch(0.5 0.12 34)"
  terracotta-text: "oklch(0.35 0.08 47)"
  terracotta-ink: "oklch(0.46 0.12 42)"
  ocean-text: "oklch(0.31 0.05 223)"
  ocean-ink: "oklch(0.44 0.07 224)"
  olive-text: "oklch(0.31 0.05 131)"
  sunset-text: "oklch(0.39 0.1 357)"
  navy-text: "oklch(0.27 0.04 252)"
  slate-text: "oklch(0.28 0.03 183)"
  honey-50: "oklch(0.98 0.01 94)"
  honey-200: "oklch(0.88 0.07 92)"
  honey-text: "oklch(0.34 0.07 81)"
  gender-masculine-700: "oklch(0.58 0.16 268)"
  gender-feminine-700: "oklch(0.59 0.16 2)"
  gender-neuter-700: "oklch(0.56 0.11 171)"
  gender-masculine-text: "oklch(0.47 0.12 268)"
  gender-feminine-text: "oklch(0.49 0.18 2)"
  gender-neuter-text: "oklch(0.51 0.1 171)"
  correct: "oklch(0.63 0.17 149)"
  correct-light: "oklch(0.96 0.04 157)"
  correct-text: "oklch(0.42 0.12 149)"
  incorrect: "oklch(0.58 0.21 27)"
  incorrect-light: "oklch(0.94 0.03 18)"
  incorrect-text: "oklch(0.45 0.17 27)"
  hint-light: "oklch(0.96 0.06 96)"
typography:
  display:
    fontFamily: "Cormorant Garamond, Georgia, Times New Roman, serif"
    fontSize: "2.25rem"
    fontWeight: 400
    lineHeight: 1.25
  display-sm-up:
    fontFamily: "Cormorant Garamond, Georgia, Times New Roman, serif"
    fontSize: "3rem"
    fontWeight: 400
    lineHeight: 1.25
  headline:
    fontFamily: "Cormorant Garamond, Georgia, Times New Roman, serif"
    fontSize: "1.875rem"
    fontWeight: 400
    lineHeight: 1.25
  title:
    fontFamily: "Cormorant Garamond, Georgia, Times New Roman, serif"
    fontSize: "1.5rem"
    fontWeight: 400
    lineHeight: 1.333
  title-sm:
    fontFamily: "Cormorant Garamond, Georgia, Times New Roman, serif"
    fontSize: "1.25rem"
    fontWeight: 400
    lineHeight: 1.4
  body:
    fontFamily: "DM Sans, system-ui, -apple-system, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.625
  greek:
    fontFamily: "DM Sans, system-ui, -apple-system, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 400
    lineHeight: 1.625
    letterSpacing: "0.01em"
    fontFeature: "\"kern\" 1, \"liga\" 1"
  greek-index:
    fontFamily: "DM Sans, system-ui, -apple-system, sans-serif"
    fontSize: "1.5rem"
    fontWeight: 400
    lineHeight: 1.625
    letterSpacing: "0.01em"
  label:
    fontFamily: "DM Sans, system-ui, -apple-system, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 600
    lineHeight: 1.43
  caption:
    fontFamily: "DM Sans, system-ui, -apple-system, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 400
    lineHeight: 1.33
rounded:
  sm: "6px"
  md: "8px"
  lg: "10px"
  xl: "14px"
  full: "9999px"
spacing:
  tight: "4px"
  related: "8px"
  cell-y: "10px"
  component: "16px"
  sheet-section: "48px"
  page-x: "24px"
  page-x-md: "32px"
  shell-max: "72rem"
  prose-max: "42rem"
  sheet-prose-max: "65ch"
components:
  button-primary:
    backgroundColor: "{colors.terracotta-600}"
    textColor: "#ffffff"
    rounded: "{rounded.xl}"
    padding: "8px 16px"
  button-primary-hover:
    backgroundColor: "{colors.terracotta-700}"
  button-secondary:
    backgroundColor: "{colors.card}"
    textColor: "{colors.stone-700}"
    rounded: "{rounded.xl}"
    padding: "8px 16px"
  button-ghost:
    textColor: "{colors.stone-700}"
    rounded: "{rounded.xl}"
    padding: "8px 16px"
  ledger-row:
    textColor: "{colors.stone-900}"
    padding: "12px 8px"
  homework-panel:
    backgroundColor: "{colors.honey-50}"
    textColor: "{colors.stone-800}"
    rounded: "{rounded.lg}"
    padding: "16px"
  guide-section:
    backgroundColor: "{colors.cream}"
    rounded: "{rounded.lg}"
    padding: "20px 24px"
  drill-link:
    textColor: "{colors.stone-800}"
    rounded: "{rounded.md}"
    padding: "0 12px"
    height: "44px"
---

# Design System: Kalimera

## Overview

**Creative North Star: "The University Press Study Guide"**

Kalimera is set like a printed grammar from a 1970s university press, the copy that has been photocopied until the corners went soft. The ground is cream paper, the ink is warm stone, headings are a quiet serif, and almost everything is organised by hairline rules rather than by boxes. Greek is the largest, darkest thing on any row; English sits beneath or beside it, smaller and in a lighter stone. The density is that of a reference book read at a desk, not a phone app glanced at in a queue.

The system's one invention is the grammar mark. Case, number and gender are drawn as a short line under a Greek phrase: its end shapes name the case, a second line means more than one, and its colour (only ever on the mark) is the gender. Colour is otherwise free for chrome and grouping, chosen from a Mediterranean palette of terracotta, sunset, olive, ocean, honey, navy and slate authored in OKLCH, each with a dark `-text` shade for words on tints and a brighter `-ink` shade for the few coloured words set straight on the page.

Confirmed rejections, from the product's brand commitments: no gamification (no XP, levels, leaderboards, confetti or score pops), no SaaS card grids or hero metrics, no gradients as decoration, no emoji in functional copy, no rounded icon above every heading.

**Key Characteristics:**
- Cream page, stone ink, serif headings at regular weight.
- Ruled lists and tables (1px hairlines) instead of card grids.
- Greek leads every row and is set larger than its English gloss.
- Grammar is drawn by the mark; colour carries grammar only as gender, on the mark.
- Contrast is held to AAA (7:1) for reading text in both themes.
- Light theme is designed first; dark mode remaps the same ramps and keeps every hue.

## Colors

A warm, low-chroma paper-and-ink base with Mediterranean accents used as washes, rules and a few coloured words, never as large saturated fills. All values are OKLCH; `src/index.css` is the source.

### Primary
- **Kiln Terracotta** (`terracotta`, with `terracotta-600` for fills): the interactive and identity colour. The wordmark, the primary button fill (`terracotta-600`, because white on the base step is 3.99:1), the selected ledger row's wash (terracotta at 10% behind the row), the active mobile tab, focus rings and text selection (`terracotta-200` behind `terracotta-950`). Words in terracotta use `terracotta-text` on tints and `terracotta-ink` on the page.

### Secondary
- **Aegean Ocean** (`ocean-text`, `ocean-ink`): cross-references. Links from a lesson note to its guide section and "Jump to all lessons" are `ocean-text` with an underline on hover.
- **Comb Honey** (`honey-50`, `honey-200`, `honey-text`): the one tinted panel on a lesson sheet (homework) and the hint colour (`hint-light` behind hint text). Honey carries roughly four times the chroma of ocean or olive at the same step, so it is the loudest tint in any set.

### Tertiary
- **Section tones** (sunset, olive, navy, slate, plus the three gender scales): each guide and guide section takes one tone. The tone supplies a `-200` header band with a `-300` rule, `-100` tinted table columns, a `-50` mark-key panel, `-ink` section numbers on the page and `-text` labels on its tints. Neighbouring sections never share a tone.

### Neutral
- **Cream Paper** (`cream`): the page ground under the whole shell. `cream-dark` is the secondary ground.
- **Card White** (`card`): button and popover surfaces that sit just above the paper.
- **Stone Ink** (`stone-900`): page titles, section headings, ledger topics, Greek in reading rows (`foreground` is the body default at nearly the same value).
- **Reading Stone** (`stone-700`, `stone-800`): ledes, explanatory prose, table English.
- **Gloss Stone** (`stone-600`, `muted-foreground`): English glosses, group labels, dates and count lines. The neutral grammar mark is `stone-600` too.
- **Hairline** (`border`, `stone-200`, `stone-300`): 1px rules between rows and around tables. The Lessons page draws its rules in the `border` token; guides, the section indexes and the footer use `stone-200`, with `stone-300` for table heads and section frames.
- **Feedback** (`correct`, `incorrect` and their `-light` and `-text` steps): bars, borders and icons take the bare token, backgrounds the `-light` step, words the `-text` step.

### Text contrast

Each accent has two text shades. `-text` is dark enough to hold AAA on its own `-100` tint and on cream, which leaves little room for colour; use it for words on a tint. `-ink` is the lightest, most chromatic value that still holds 7:1 on cream and on its own `-50`; use it for the few coloured words set on the page, such as guide section numbers. In dark mode `-ink` takes the colour's dark `-text` value.

| Token             | Light                  | On cream | On its tint |
| ----------------- | ---------------------- | -------- | ----------- |
| `terracotta-text` | `oklch(0.35 0.08 47)`  | 11:1     | 9.7:1       |
| `sunset-text`     | `oklch(0.39 0.1 357)`  | 9.6:1    | 8.5:1       |
| `olive-text`      | `oklch(0.31 0.05 131)` | 12:1+    | 12:1+       |
| `ocean-text`      | `oklch(0.31 0.05 223)` | 11:1+    | 11:1+       |
| `honey-text`      | `oklch(0.34 0.07 81)`  | 11:1+    | 11:1+       |
| `navy-text`       | `oklch(0.27 0.04 252)` | 14:1     | 12:1        |
| `slate-text`      | `oklch(0.28 0.03 183)` | 13:1     | 11:1        |

| Token            | Light                  | Chroma vs `-text` |
| ---------------- | ---------------------- | ----------------- |
| `terracotta-ink` | `oklch(0.46 0.12 42)`  | 0.12 vs 0.08      |
| `sunset-ink`     | `oklch(0.46 0.16 357)` | 0.16 vs 0.10      |
| `olive-ink`      | `oklch(0.44 0.11 131)` | 0.11 vs 0.05      |
| `ocean-ink`      | `oklch(0.44 0.07 224)` | 0.07 vs 0.05      |
| `honey-ink`      | `oklch(0.45 0.08 82)`  | 0.08 vs 0.07      |
| `navy-ink`       | `oklch(0.44 0.14 257)` | 0.14 vs 0.04      |
| `slate-ink`      | `oklch(0.44 0.07 182)` | 0.07 vs 0.03      |

For quieter neutral text, `stone-600` holds AAA on cream. `stone-500` is about 4.5:1: AA only, so not for reading text.

### Named Rules

**The Gender-Only Rule.** Colour's one grammatical job is gender, and only on a grammar mark, using the gender's `-700` step. A mark with no gender is `stone-600` and claims none. A guide section that teaches one gender's nouns may take that gender's pale scale as its tone; nothing else in the interface colours grammar.

**The Full-Strength Text Rule.** Words take a `-text` or `-ink` token at full opacity, never a base accent and never an opacity modifier (`text-honey-text/80` is banned). The shades sit 1.5–7 points above 7:1, and `/80` takes roughly a fifth off the ratio, so even `/90` can drop a token below AAA. Tailwind v4 cannot disable the modifier; `rg "text-[a-z-]+-text/\d+" -g '*.tsx'` finds it. Opacity on a background is fine. For quieter text, step down the stone ramp instead.

**The Saturation Rule.** Chrome and grammar colour are told apart by saturation, not hue. Chrome tints are pale (`-50` to `-200`); gender marks are saturated `-700`. A palette hue that sits near a gender hue is not off limits.

**The Uncalibrated Ramps Rule.** Step numbers are not comparable across hues: `honey-100` is about four times the chroma of `ocean-100`. When tints sit side by side, match chroma and lightness, not step number. At `-100`, ocean and olive are chroma 0.01 and read as grey, and `olive-200` (L 0.91) is lighter than `ocean-200` (L 0.87), so even that pair needs checking.

| Token   | `-100`                 | `-200`                 |
| ------- | ---------------------- | ---------------------- |
| `ocean` | `oklch(0.94 0.01 225)` | `oklch(0.87 0.03 219)` |
| `olive` | `oklch(0.94 0.01 132)` | `oklch(0.91 0.02 127)` |
| `cream` | `oklch(0.94 0.01 82)`  | `oklch(0.88 0.03 75)`  |
| `honey` | `oklch(0.94 0.04 94)`  | `oklch(0.88 0.07 92)`  |

Legacy note: `case-*` classes (`bg-case-accusative-100`, `text-case-genitive-text`) still appear in pages built before the marks, but the case scales were removed, so they render no colour. They are not tokens.

Dark mode remaps every ramp under `:root.dark`: tints become dark tints, text shades become light text at L 0.82 (7.6:1 or better on the dark `-300` tints), and mid accents keep their value, so the terracotta button and the gender `-700` marks are the same colour in both themes. The cream page becomes L 0.19.

## Typography

**Display Font:** Cormorant Garamond (with Georgia, Times New Roman, serif)
**Body Font:** DM Sans (with system-ui, -apple-system, sans-serif)

**Character:** A literary serif for titles against a plain humanist sans for everything that is read or tapped. Greek is set in the sans, so the script stays crisp at small sizes and the serif is reserved for the book's own voice.

### Hierarchy
- **Display** (400, 2.25rem rising to 3rem from `sm`, leading 1.25, balanced): every page's `h1`, through `PageHeading`, in `stone-900`. Its lede sits beneath at body size in `stone-700`, capped at 42rem.
- **Headline** (400, 1.875rem rising to 2.25rem, leading 1.25): the open lesson's topic at the top of its sheet.
- **Title** (400, 1.5rem): section headings, in serif. `BandHeading` on reference pages, numbered guide section bands, lesson sheet sections ("What was taught", "Words").
- **Title small** (400, 1.25rem): sub-bands, the ledger's year headings, "Full tables".
- **Body** (400, 1rem, leading 1.625): prose, capped at 42rem on guides and page ledes (`max-w-2xl`) and at 65ch on the lesson sheet (`max-w-prose`).
- **Greek** (400, 1.125rem in reading rows, leading 1.625, +0.01em tracking): always through `GreekText`, which owns `lang="el"` and the size. Sizes run `xs` to `8xl` and are chosen per call site: `lg` in word tables, phrases and examples, `2xl` leading a section-index row, `base` in paradigm cells, `inherit` inside sentences and headings. Greek is never scaled by a multiplier over Latin.
- **Label** (600, 0.875rem, sentence case): group labels above a ruled list or table ("Nouns", "Verbs", a section index group, "Homework"), in `stone-600` or the panel's `-text` shade.
- **Caption** (400, 0.75–0.875rem): glosses, dates, count lines joined by " · ", table column heads.

### Named Rules

**The Greek-Leads Rule.** On any row that pairs Greek with English, the Greek is the larger, darker element and comes first; the English is `text-sm` in `stone-600` or `stone-700`.

**The Regular-Weight Serif Rule.** Serif headings are weight 400 in `stone-900`. Weight comes from size and space, not bold.

**The No-Kicker Rule.** Nothing sits above a heading to announce it: no eyebrow, no small uppercase category line, no icon badge. A label belongs above a list or table, not above a title.

## Layout

The app is a PWA with a fixed shell: `.app-shell` is pinned to the top and sides at `100dvh` with overflow hidden, and `.app-main` is the only scroll container. Content sits in one centred column, at most 72rem wide, with 24px side padding (32px from `md`). Bottom padding is 96px on phones to clear the fixed mobile nav, 48px on desktop, where a footer sits behind a hairline rule.

Rhythm runs on a 4px base. Rows inside a ruled list are 12px apart top and bottom (10px in word tables), group label to list is 4–8px, page sections are 40px apart (`space-y-10`), and sheet sections 48px. Paradigm and guide tables pad cells 8px vertically, 6–12px horizontally, tightening on phones when three Greek columns must fit.

**Ledger and sheet.** The Lessons page is a 12-column grid from `md`: the ledger takes 4 columns on the left and the open lesson's sheet 8 on the right, 40–56px apart. On phones the sheet leads and the ledger follows below it, reached by a "Jump to all lessons" link. Picking a row scrolls the sheet into view because the router cannot reset `.app-main`.

**Index, not grid.** Section landings (`/learn`, `/reference`, `/guides`) are a ruled table of contents: one full-width row per section, Greek first at `2xl`, English label, a one-line description, a chevron. No card grids.

**Guide sections.** Each guide section is a framed block: a tone header band, then the rule, table, examples, details and practice links stacked 20px apart. On phones the frame runs edge to edge (`-mx-6`) and its tables scroll horizontally; paradigm cells never stack.

Tap targets are at least 44px (`min-h-11`) on links, drill chips and index rows.

## Elevation & Depth

The system is flat and ruled. Depth comes from paper tone and hairlines: a cream page, white card surfaces for buttons and popovers, pale tints for the few panels, and 1px rules between everything else. Shadows are neutral only, never coloured, and appear in two places: buttons, which rest on a small shadow and lift on hover, and floating layers (search results, dropdowns, popovers).

### Shadow Vocabulary
- **Button rest** (`shadow-sm`, `0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)`): every `Button` and `ButtonLink` at rest.
- **Button lift and popover** (`shadow-md`, `0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)`): a button on hover (with a 2px rise) or when active; search results and menus.

### Named Rules

**The Ruled-Not-Raised Rule.** Lists, tables, the ledger and section indexes are separated by 1px rules, never by shadows or floating cards.

## Shapes

Corners are gentle and few. The base radius is 10px (`--radius: 0.625rem`), giving 6px, 8px, 10px and 14px steps. Panels and guide section frames take 10px; drill chips, colour keys and the "Don't confuse" box take 8px; buttons and mobile-nav tabs take 14px; the search field is a full pill. Ruled rows and tables have no radius at all. Borders are 1px hairlines; a dashed 1px border marks a planned drill that does not exist yet.

The grammar mark has its own fixed geometry (`grammar-mark-geometry.ts`): end shapes 9px tall, lines that run into their end shapes, a plural pair mirrored about the centre, every edge on the half-pixel grid, at least 30px wide and inset 2px from each end of its phrase.

## Components

### Buttons
Plain and warm, the only element that casts a shadow at rest.
- **Shape:** gently rounded (14px).
- **Primary:** `terracotta-600` fill, white text, 8px by 16px at the default size (6px by 12px small, 12px by 24px large). The default variant.
- **Hover / Focus:** primary deepens to `terracotta-700`; every variant rises 2px and its shadow grows over 200ms; focus shows a 2px `terracotta-400` ring offset by 2px. Disabled is 50% opacity.
- **Secondary:** white card surface, 1px `stone-200` border, `stone-700` text; the border darkens to `stone-300` on hover. Active secondary takes the primary fill.
- **Ghost:** no fill, `stone-700` text.
- Navigation that looks like a button is `ButtonLink`, never a button inside a link.

### Ledger row
A dated row in a ruled list, grouped under serif year headings.
- **Layout:** a 56px date column in tabular figures, then the topic (`text-sm`, `stone-900`) over a count line (`text-xs`, muted), 12px by 8px padding.
- **Open row:** a terracotta wash at 10% behind the row and the date in semibold `terracotta-text`, with `aria-current="page"`. No side rule.
- **Hover / Focus:** a 5% foreground wash; a 2px `terracotta-600` focus outline offset by 2px.

### Section index row
A table-of-contents row: Greek at `2xl`, the English label in `stone-800`, a `text-sm` muted description, a `stone-500` chevron that nudges right on hover while the Greek turns `terracotta-text`. Rows are ruled top and bottom in `stone-200`, at least 44px tall.

### Homework panel
The one tinted panel on a lesson sheet: `honey-50` ground, 1px `honey-200` border, 10px corners, 16px padding (20px from `sm`), a semibold `text-sm` "Homework" label in `honey-text` and the task in `stone-800`.

### Guide section
- **Frame:** 1px `stone-300` border, 10px corners from `sm`, edge to edge on phones.
- **Header band:** the section's tone at `-200` with a `-300` rule below, the serif title in `stone-900` and its number in the tone's `-text` shade.
- **Body:** the rule in prose, a ruled table whose tinted columns take the tone's `-100`, Greek examples with their English beneath, a "Don't confuse" box on a `-100` tint, and practice links as 44px chips with a 1px `stone-300` border that pick up the tone on hover.

### Mark key
Shown near the top of any guide that uses marks: a `-50` panel with a `-200` border and 10px corners, explaining the three channels (ends show the form, lines show how many, colour shows the gender, plus a neutral "no gender" mark) with a `lg` mark over each label.

### Navigation
- **Desktop header:** the serif wordmark in terracotta at 1.5rem, a pill search field on `stone-100`, and text tabs with 10px corners. The active tab is `stone-800` with cream text.
- **Mobile nav:** fixed to the bottom above the safe area, on cream at 95% with a backdrop blur and a `stone-200` top rule. Each tab is a 22px outline icon (1.5 stroke) over a `text-xs` label. The active tab takes a 10% terracotta wash and `terracotta-700` text (`terracotta-text` in dark mode).
- **Back link:** labelled with where it goes ("Guides", "Learn"), never the current page.

### Grammar Mark (signature)
A Greek phrase with a line beneath it, as one unbreakable inline block.
- **End shape is the case:** `<->` Doer (nominative), `>-<` Target (accusative), `o-o` Owner (genitive), `!-!` Calling (vocative). The shapes are symmetric so they claim no direction of action: case exists because word order does not decide who does what, and «Τον Γιάννη βλέπει η Μαρία» puts the Target first.
- **Lines are the number:** one line for one, two for more than one.
- **Colour is the gender:** the gender's `-700` step; with no gender the mark is `stone-600` and claims none.
- **Rules:** mark the whole phrase, article included, never a bare ending (one letter is too short to carry two end shapes); show only the axes the page teaches; use marks only on nouns, articles, adjectives and pronouns; a marked phrase never wraps, so a line break moves the phrase and its mark together; filled ends by default, outlined only for large display. The learner label ("Doer form, feminine, more than one") is announced to screen readers.
- **Geometry:** see Shapes. The vocative's bar stops at the lower plural line and its dot hangs below the shared height.
- **Checks:** `/specimens/grammar-mark` (dev only) shows every case, gender and number and the layouts that break marks; `e2e/grammar-mark.spec.ts` photographs it and checks no-wrap, width and symmetry; `grammar-mark-geometry.test.ts` checks the geometry.

### Verdict
"Correct", "Incorrect" or "Time's up" at `text-sm` medium weight in `correct-text` or `incorrect-text`. No exclamation, no icon burst, no animation.

## Do's and Don'ts

### Do:
- **Do** render every Greek string through `GreekText`, `Pronunciation`, `GreekGloss` or `GrammarMark`, with an explicit size chosen for the call site.
- **Do** separate rows and groups with 1px hairlines (`border` or `stone-200`) and keep tables precise: aligned columns, 8px cell padding, horizontal scroll on phones rather than stacked cells.
- **Do** set page titles with `PageHeading` and section headings in the serif at weight 400 in `stone-900`.
- **Do** put words on a tint in that hue's `-text` shade and coloured words on the page in its `-ink` shade, both at full opacity.
- **Do** fill primary buttons with `terracotta-600`, never the base step.
- **Do** mark an open or selected row with a pale wash and a coloured, semibold label, as the lesson ledger does.
- **Do** give neighbouring guide sections different tones, and check chroma, not step number, when tints sit side by side.
- **Do** keep interactive targets at least 44px tall.

### Don't:
- **Don't** put an opacity modifier on a `-text` token; it breaks AAA.
- **Don't** set body text in a base accent (`text-terracotta`, `text-honey`); base accents are for bars, borders, icons and large display only.
- **Don't** use colour for case or number; draw it with `GrammarMark`. Don't reach for `GreekText`'s gender or case tones or the `case-*` scheme classes in new work.
- **Don't** draw a coloured side border or strip wider than 1px to mark a row, an example or a section.
- **Don't** put a kicker or eyebrow above a heading.
- **Don't** add streaks as a selling point, XP, levels, leaderboards, confetti, score pops or celebration animation.
- **Don't** build card grids, hero metrics or decorative gradients.
- **Don't** use coloured shadows or SVG grain textures.
- **Don't** use emoji or exclamation marks in labels, feedback, empty states or errors.
