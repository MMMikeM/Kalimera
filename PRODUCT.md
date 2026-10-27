# Kalimera

A Greek study app for the week between tutoring lessons. The lesson is where Greek is met; the app is where it becomes automatic.

## How it fits together

1. **A weekly tutoring lesson.** The tutor's notes, and the transcript where there is one, become a lesson file (`src/scripts/seed-data/vocabulary/lessons/YYYY-MM-DD-topic.ts`): its words, phrases, homework and grammar notes. Cleaned transcripts live in `docs/lessons/`.
2. **Each grammar note names the guide section that teaches it.** A lesson moment ("my daughter's son") lands on the pattern it belongs to (the Owner form), so the guide grows from what the lessons actually covered.
3. **Each guide section ends in a drill.** The rule is read once, then practised under time pressure until it no longer needs thinking about.
4. **The Lessons page brings it back.** Before the next lesson, or to relive one, a lesson's sheet shows what was taught, links each note to its guide, and lists the drills for it.

## Surfaces

- **Lessons** (signed in): every tutoring session, newest first, each as one sheet.
- **Guides:** fourteen plain-English guides in three groups (nouns; verbs; small words and sentences), with grammar marks under the Greek and a drill per section.
- **Practice:** timed production drills in five groups (cases, pronouns, verbs, blocks, guides), plus a review of drills gone rusty.
- **Learn:** vocabulary by subject and conjugation family, conversations, phrases, and essentials (numbers, time, dates).
- **Reference:** paradigm tables for looking a form up.
- **Progress:** the streak calendar and accuracy trends, kept inside the app.

## Design Context

### Users

**Primary (now):** Mike Murray — an intermediate Greek learner using the app between weekly Preply tutoring sessions. He is stuck in the knowing-but-not-producing gap, but the "knowing" side is shakier than a tutoring history implies. He does NOT have reliable command of grammar metalanguage: terms like "nominative", "accusative", "genitive", "subject", "direct object", "case" are not safely internalised. Interfaces must not assume "nominative ↔ subject" mapping is understood.

**Future:** Public learners at the same stage — 1+ year in, conversational aspiration, stuck in the knowing-but-not-producing gap. Discovered organically, not through a marketing funnel. Same metalanguage gap applies.

**Context of use:** Daytime study sessions, relatively focused. Not a quick-glance app — users sit with it. Reading density is high; cognitive load management matters.

**Job to be done:** Turn what each tutoring lesson covered into Greek that comes out automatically: understand the pattern, then drill it until the answer arrives without thought. Before a lesson, see what the last ones covered. The interface should feel like practice, not like an app.

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

## Visual System

`DESIGN.md` records the visual system as it ships: palette and contrast, type ramp, layout, components, the grammar marks and the bans. `.impeccable/design.json` is its machine-readable sidecar. This app is a PWA, and mobile is the primary delivery surface, not a fallback.

---

## Greek Text Rules

Greek characters are visually denser than Latin. The `.greek-text` class applies:

- `line-height: relaxed` (~1.625)
- `letter-spacing: 0.01em`

It sets no font size: `<GreekText>` takes an explicit `size`, chosen per call site, with no automatic scale-up over Latin.

Never apply `.greek-text` or `lang="el"` by hand. Render Greek through `<GreekText>` (all Greek script; it owns `lang="el"`, the class, size and tone), `<Pronunciation>` (the pronunciation gloss) or `<GreekGloss>` (the two paired). `pnpm lint:greek` enforces it.

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

## Hard Design Constraints

These are non-negotiable. Do not implement them even if they seem like improvements:

- **Streaks stay inside the app.** The logged-in dashboard's week row and freezes, and the `/progress` calendar, are allowed. Streaks are never sold as a feature: not on the landing page, not in marketing copy.
- **No experience points or levelling.** No XP, no levels, no "you've unlocked X".
- **No leaderboards.** This is a personal practice tool.
- **No celebration animations.** No confetti, no fireworks, no score-pop animations on correct answers.
- **No push-notification prompts** unless the user has explicitly entered a spaced-repetition review flow that warrants them.
- **No social sharing.** "Share your progress!" is antithetical to the honest, private study context.

The reasoning: these patterns are borrowed from mobile gaming. They work by manufacturing artificial urgency. This app's value proposition is the opposite — it exists to build genuine competence through honest repetition.
