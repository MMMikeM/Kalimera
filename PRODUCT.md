## Design Context

### Users

**Primary (now):** Mike Murray — an intermediate Greek learner using the app between weekly Preply tutoring sessions. He is stuck in the knowing-but-not-producing gap, but the "knowing" side is shakier than a tutoring history implies. He does NOT have reliable command of grammar metalanguage: terms like "nominative", "accusative", "genitive", "subject", "direct object", "case" are not safely internalised. Interfaces must not assume "nominative ↔ subject" mapping is understood.

**Future:** Public learners at the same stage — 1+ year in, conversational aspiration, stuck in the knowing-but-not-producing gap. Discovered organically, not through a marketing funnel. Same metalanguage gap applies.

**Context of use:** Daytime study sessions, relatively focused. Not a quick-glance app — users sit with it. Reading density is high; cognitive load management matters.

**Job to be done:** Drill Greek grammar and vocabulary until responses become automatic. The interface should feel like practice, not like an app.

**Design implication of the metalanguage gap:** Lead every teaching surface with plain-English functional handles ("Doer", "Target", "Owner", "who's doing the action"). Greek grammar terms (Nominative, Accusative, Genitive) attach as labels bound to those handles — they are metadata, never the primary anchor. Drill prompts, reference cards, and error messages must all be legible to someone who cannot decode the word "accusative" on its own.

---

### Brand Personality

**Three words:** Scholarly · warm · honest

Like a well-worn study guide — serious about what it teaches, never intimidating, and completely free of gamification theatre. No streaks for their own sake. No confetti for getting something right. Honest feedback, clear structure, the quiet satisfaction of actual progress.

The λ (lambda) mark anchors the identity: spare, precise, unmistakably Greek.

---

### Aesthetic Direction

**Primary theme:** Light — cream backgrounds for extended reading sessions. The palette already established (terracotta, olive, ocean, honey against cream) is Mediterranean and intentional; lean into it rather than replace it.

**Visual tone:** Editorial reference materials — the kind of printed study guide that's been photocopied until the corners soften. Not a digital product trying to look premium. Something that could have been typeset in the 1970s at a university press.

**Anti-references:**

- Duolingo: gamified, cartoon, anxiety-inducing streaks
- Generic SaaS dashboards: cards everywhere, gradients, hero metrics
- "Learning app" defaults: rounded icons above every heading, emoji as UX, progress bars that feel like slot machines

**What makes it memorable:** Grammar is drawn, not coloured. A line under each Greek phrase ends in a shape that names its case (`<->` Doer, `>-<` Target, `o-o` Owner, `!-!` Calling), doubles for more than one, and takes its colour from the gender. The shapes mean one thing everywhere, so a returning user starts to _feel_ the cases before reading the labels. It teaches through repetition of visual pattern, not through decoration.

---

### Design Principles

1. **Greek is the hero.** Greek characters should be prominent, well-sized, and beautifully rendered. English is gloss — smaller, quieter, subordinate. Never let the interface make Greek feel like a caption.

2. **Structure is pedagogy.** Paradigm tables and case grids are the primary teaching surface. Lay them out with typographic precision: consistent alignment, clear column rhythm, no visual noise competing with the pattern. The table _is_ the lesson.

3. **Warmth without whimsy.** Scholarly rigour doesn't mean clinical. The colour palette, the serif display type, and the voice should feel like a trusted teacher — never like a cold reference tool, never like a children's app.

4. **Honest feedback.** Correct is correct. Incorrect is incorrect. Feedback states should be emotionally clear and proportionate. No artificial euphoria, no punishing reds that feel like failure. Just honest, immediate signal.

5. **Light earns its space.** The cream background is a working surface, not decoration. Whitespace separates concepts; it's not padding. Every element on screen should justify its presence by helping the learner focus.

---

## Colour System

The values live in `src/index.css`, and `docs/design-guidelines.md` has the full tables and contrast figures; treat those two as the source of truth.

### Grammar is marked, not coloured

Case, number and gender are shown by `<GrammarMark>` (see `docs/design-guidelines.md`, "Grammar Marks"). Colour's only grammatical job is gender, on the mark itself. Everything else about colour is open for the redesign.

The reserved `case-*` and `gender-*` scales in `@theme static` are legacy. Current pages still read them through `src/constants/grammar-palette.ts`, and the lint keeping them there stays until the redesign retires them; add no new case colour.

### Base Palette

`cream`, `terracotta`, `sunset`, `olive`, `ocean`, `honey`, `navy`, `slate` and `stone`, authored in `oklch()`, for navigation, chrome, buttons and grouping.

### Text and Contrast

- Text uses the `-text` tokens (`terracotta-text`, `ocean-text` and so on), never a base accent directly and never with an opacity modifier.
- Feedback follows the same rule: `correct` / `incorrect` for bars, borders and icons, their `-light` tokens for backgrounds, and `correct-text` / `incorrect-text` for words. Hints use honey.
- Primary buttons fill with `terracotta-600`, not the base `-500`: white on `-500` is 3.99:1, under AA.

### Dark Mode

Dark mode exists and is fully implemented. Light is the _designed-first_ experience; dark should maintain the same semantic meanings with adjusted values.

The colour ramps are remapped under `:root.dark` in `src/index.css`, and the aliases built on them follow. Tints become dark tints, text shades become light text, and mid accents keep their value, so the terracotta primary button is the same colour in both themes. A grammar mark keeps its gender hue in either theme.

---

## Typography

### Current Fonts

```
--font-serif: "Cormorant Garamond", Georgia, "Times New Roman", serif
--font-sans:  "DM Sans", system-ui, -apple-system, sans-serif
```

**Important:** Both Cormorant Garamond and DM Sans are on the impeccable banned-reflex list. They are not wrong for this project — Cormorant Garamond in particular suits the university-press aesthetic — but they should be reconsidered whenever doing a deliberate typography pass. If suggesting replacements, target these qualities:

- **Display/serif:** Old-style figures, generous x-height, optical size variation, feels like it belongs in a printed grammar textbook. Should render Greek polytonic characters gracefully if possible.
- **Body/sans:** Neutral enough to step back from Greek content, high legibility at 1rem, not geometric (geometric reads as tech/startup, not scholarly).

### Type Scale

This is a product UI (fixed rem), not a marketing page (fluid clamp):

| Role               | Size                             | Font  | Weight | Colour           |
| ------------------ | -------------------------------- | ----- | ------ | ---------------- |
| Page title (h1)    | 2.25rem, 3rem from `sm`          | Serif | 400    | `stone-900`      |
| Section title (h2) | 1.5rem                           | Serif | 400    | `stone-900`      |
| Subsection (h3)    | 1.25rem                          | Serif | 400    | `stone-900`      |
| Body text          | 1rem                             | Sans  | 400    | Foreground       |
| Greek content      | `<GreekText size>`, per call site | Sans  | 400    | Foreground       |
| Labels / captions  | 0.875rem                         | Sans  | 400    | Muted foreground |

Page titles use `PageHeading` (`src/components/PageHeading.tsx`); the landing hero, `/progress`, the sign-in pages, the noun subject pages and the drill header still set their own `h1`. Section headings come from `BandHeading` (`src/routes/reference/components/BandHeading.tsx`), `text-2xl` by default and `text-xl` at `size="md"`. The older `SectionHeading` is still used in a few reference sections and the verb detail page, and sets `font-bold text-navy-text`.

### Greek Text Rules

Greek characters are visually denser than Latin. The `.greek-text` class applies:

- `line-height: relaxed` (~1.625)
- `letter-spacing: 0.01em`

It sets no font size: `<GreekText>` takes an explicit `size`, chosen per call site, with no automatic scale-up over Latin.

Never apply `.greek-text` or `lang="el"` by hand. Render Greek through `<GreekText>` (all Greek script; it owns `lang="el"`, the class, size and tone), `<Pronunciation>` (the pronunciation gloss) or `<GreekGloss>` (the two paired). `pnpm lint:greek` enforces it.

---

## Spatial System

4pt base unit. Semantic token names preferred over Tailwind numeric shorthands in custom CSS:

| Token (conceptual) | Value   | Tailwind approx   |
| ------------------ | ------- | ----------------- |
| Tight grouping     | 4px     | `gap-1`           |
| Related items      | 8px     | `gap-2`           |
| Component padding  | 12–16px | `p-3` / `p-4`     |
| Section separation | 32–48px | `mt-8` / `mt-12`  |
| Page section gap   | 48–64px | `py-12` / `py-16` |

Paradigm table cells: `padding: 0.75rem 1rem` (12px vertical, 16px horizontal).

---

## Voice & UX Copy

**Brand voice in practice:** A knowledgeable friend who corrects you clearly and moves on. Not effusive. Not terse. Not clinical. Speaks in plain sentences, not bullet fragments.

### Tone examples

| Context                | Don't                                                | Do                                            |
| ---------------------- | ---------------------------------------------------- | --------------------------------------------- |
| Drill correct answer   | "Amazing! 🎉 You got it!"                            | "Correct." or "Right."                        |
| Drill wrong answer     | "Not quite! Keep trying 💪"                          | "Incorrect. The answer is [X]."               |
| Empty state (no vocab) | "Nothing here yet! Add some words to get started 🌟" | "No vocabulary added yet."                    |
| Error loading data     | "Oops! Something went wrong."                        | "Couldn't load this section. Try refreshing." |
| Loading                | "Hang tight..."                                      | (no copy — use a spinner or skeleton)         |
| Hint reveal            | "Need a hand? Here's a clue!"                        | "Hint:" followed by the hint                  |

**Rules:**

- No emoji in functional UI copy (labels, errors, feedback states, empty states)
- No exclamation marks in feedback — they feel performative
- Sentences, not fragments, for explanatory text
- Prefer active voice: "Add vocabulary" not "Vocabulary can be added"

---

## Mobile & Responsive

This is a PWA. Mobile is not a fallback — it is the primary delivery surface.

**PWA shell:**

```
.app-shell   — position: fixed; inset: 0; overflow: hidden
.app-main    — flex: 1; overflow-y: auto (scroll container)
.safe-area-pb — padding-bottom: max(0.5rem, env(safe-area-inset-bottom))
```

**Paradigm tables on mobile:** Tables are the hardest surface to adapt. Options in priority order:

1. Horizontal scroll within a `overflow-x: auto` container — preserve the full table, let users scroll
2. Column collapsing — hide the least important column behind a toggle
3. Never stack paradigm cells vertically — it destroys the pattern recognition that makes them useful

**Tap targets:** Minimum 44×44px for all interactive elements (WCAG 2.5.5). Drill answer buttons should be generous — users tap quickly under time pressure.

**Bottom navigation:** Fixed, above the safe area. Do not let content scroll behind it without adequate padding.

---

## Hard Design Constraints

These are non-negotiable. Do not implement them even if they seem like improvements:

- **Streaks stay inside the app.** The logged-in dashboard's week row and freezes, and the `/progress` calendar, are allowed. Streaks are never sold as a feature: not on the landing page, not in marketing copy.
- **No experience points or levelling.** No XP, no levels, no "you've unlocked X".
- **No leaderboards.** This is a personal practice tool.
- **No celebration animations.** No confetti, no fireworks, no score-pop animations on correct answers.
- **No push-notification prompts** unless the user has explicitly entered a spaced-repetition review flow that warrants them.
- **No social sharing.** "Share your progress!" is antithetical to the honest, private study context.

The reasoning: these patterns are borrowed from mobile gaming. They work by manufacturing artificial urgency. This app's value proposition is the opposite — it exists to build genuine competence through honest repetition.
