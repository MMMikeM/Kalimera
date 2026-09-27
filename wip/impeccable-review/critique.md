# Impeccable critique: public pages

Run: 27 Sep 2026, cloud session, Impeccable skill **3.0.7** (the installed version; the upgrade was blocked, see `impeccable-upgrade.md`).
Command: `/impeccable critique` on `/`, `/try`, `/reference/cases`, `/learn/essentials`.
Register: **product** (app UI), inferred from PRODUCT.md (it has no `register` field).

Method notes, so you know how much weight each claim carries:

- The app ran locally with placeholder env (`SESSION_SECRET` dummy, `TURSO_DATABASE_URL=https://offline.invalid`). Pages that need no database rendered normally. `/learn/essentials/:subtab` needs the database and shows the root error boundary instead.
- Google Fonts could not load in the sandbox browser (TLS interception), so every screenshot uses fallback fonts (DejaVu). **Ignore typography in the screenshots**; judge fonts from code.
- Assessment A (design review) was done by the lead agent from screenshots plus source. Assessment B (the deterministic detector) was replaced by a grep-based scan in a separate agent, because the Impeccable CLI binary could not be run here. Its report is `detector-scan.md`.
- Bugs marked **verified** were reproduced in a browser. `scripts/review-capture.ts repro` re-runs the main one.
- Prod (`kalimera.fly.dev`) was blocked by the sandbox network policy, so nothing here was checked against prod.

---

## Design health score

| #         | Heuristic                       | Score     | Key issue                                                                                                                                                   |
| --------- | ------------------------------- | --------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1         | Visibility of system status     | 2         | Drill timer bar is unlabelled and reads as a progress bar (nearly full on question 1 of 10); it flips solid red/green on answer. Counter is tiny stone-400. |
| 2         | Match system / real world       | 2         | Doer/Target/Owner cards are excellent, but the article table and trigger panels lead with NOMINATIVE/ACCUSATIVE/GENITIVE. Drill shows "remediation ×1".     |
| 3         | User control and freedom        | 2         | Drill exit is a 12px stone-300 "←" with no label. No skip. Enter anywhere on the page submits the answer.                                                   |
| 4         | Consistency and standards       | 2         | `Button` defaults to `secondary`, so `/try`'s "Start Drill" is a pale outline while the header's "Try a Drill" is filled. Case tokens used on drill chrome. |
| 5         | Error prevention                | 1         | Global Enter/Space handlers submit blank answers from the header search (verified). Blank answers are accepted and graded.                                  |
| 6         | Recognition rather than recall  | 2         | Article table has no gender/number columns, so the learner must remember what each chip slot means.                                                         |
| 7         | Flexibility and efficiency      | 3         | Keyboard-first drill loop, generous phonetic matching, auto-advance after a correct answer.                                                                 |
| 8         | Aesthetic and minimalist design | 2         | `/reference/cases` is close to the editorial brief. Landing and essentials index are generic icon-card grids. Debug chips on the drill.                     |
| 9         | Error recovery                  | 1         | Root error boundary prints raw SQL and drops the app shell. 404 renders the literal text `notfound`. (The drill's own Incorrect state is good.)             |
| 10        | Help and documentation          | 2         | `/try` keyboard hints are stale ("Space to start each question") and shown on mobile. Cases page hand-off to Articles/Pronouns/Nouns is good.               |
| **Total** |                                 | **19/40** | **Poor band (12 to 19), but only just.** Two fixable bugs (key handlers, error boundary) cost about four points on their own.                               |

---

## Anti-patterns verdict

**Design review.** `/reference/cases` does not read as AI-made. The serif hero ("One word, many roles."), the Doer/Target/Owner cards with real Greek, and the "Picked the case. Now what?" hand-off feel like the university-press study guide PRODUCT.md describes. The other pages do read as template:

- Landing: centred hero, then a three-up grid of identical cards (icon in a tinted circle, heading, two lines). This is the "identical card grid" absolute ban and the "rounded icons above every heading" anti-reference from PRODUCT.md.
- `/learn/essentials`: five cards with coloured icon tiles and rainbow tints (ocean, ocean, honey, olive, rose) that carry no meaning, under a honey hero box with a drop shadow. The Greek is limited to one grey line ("ένα, δύο, τρία...").
- `/try`: a white card with a lightning-bolt icon circle, "Try a Speed Drill", "Let's see what you've got." It is the most app-like screen in the product, and it is the one new visitors see first.

**Deterministic scan** (grep-based stand-in, full list in `detector-scan.md`): no side-stripe borders and no gradient text. It found 2 decorative `backdrop-blur` Button variants, 7 em dashes in learner-facing copy, 2 identical card grids, 7 example phrases with false case-colour claims, 2 global key handlers, 6 debug strings shown to users and 8 emoji or exclamation hits. The two reviews agree on every overlap; the scan added the SelectorButton opacity-on-`-text`-token issue and the `text-white` vs `text-cream` drift.

---

## Overall impression

The pedagogy surface is the strongest thing here: the cases reference is genuinely good and close to the brief. The front door is the weakest. A new visitor sees a generic landing grid (including a streaks card that PRODUCT.md forbids), then a `/try` drill that shows debug chips, promises 8 questions and asks 10, and ends on "🎉 Excellent!". **Single biggest opportunity:** make the drill screen and the reference tables carry the same scholarly voice as the cases hero, starting with the article table as a real paradigm grid.

## What's working

1. **Doer / Target / Owner teaching cards** (`cases-section.tsx:75-94`). Plain-English handle first, grammar term as a small pill, a real Greek example, English gloss subordinate. This is the metalanguage principle done right.
2. **The drill's Incorrect state** (`shells.tsx` FeedbackDisplay). "Incorrect", then the Greek answer large with the pronunciation gloss, then "Press Enter or tap to continue". Honest, proportionate, no punishment. Matches the voice guide exactly.
3. **Hero demo on the landing** (`DrillDemo.tsx`). It types `kalimera` and resolves it into καλημέρα with a check, which explains the core mechanic (type Latin, get graded as Greek) in three seconds with no copy.

---

## Priority issues

### [P1] Enter and Space are captured globally during a drill (verified)

- **What:** `useForwardKeyboard` (`src/routes/practice/components/engines/drill-hooks.ts:76-82`) listens on `window` and submits on any Enter. The feedback handler (`drill.tsx:175-185`) advances on any Enter or Space and calls `preventDefault()`. Neither checks `e.target`. The header search sits above every drill.
- **Why it matters:** pressing Enter in the search box submits a blank answer, marks it Incorrect and queues a remediation. On logged-in drills this likely writes a false miss into the SRS history, which is the data the whole product is built on. Typing a space in the search during feedback is swallowed and skips the card.
- **Fix:** ignore events whose target is an editable element other than the drill input (or scope the handlers to the drill container). The form already submits on Enter, so `useForwardKeyboard` may be removable entirely. Also consider hiding the header search while a drill is active (a focus mode), which fits "feel like practice, not like an app".
- **Suggested command:** `/impeccable harden`

### [P1] Root error boundary leaks SQL; 404 is a placeholder

- **What:** `src/routes/__root.tsx:132-155` renders `error.message` in a `<pre>`; for Drizzle errors that is the full SQL. It also shows `error.cause.message`. `notFoundComponent` at `__root.tsx:61` is `<p>notfound</p>`. Because the error is caught at the root, the header and bottom nav disappear and "Go Home" is the only way out.
- **Why it matters:** in production this exposes schema and query shape to anyone who hits a database hiccup (information disclosure), and it gives the learner a wall of SQL instead of the voice guide's "Couldn't load this section. Try refreshing.". A 404 reading `notfound` looks broken.
- **Fix:** show the raw message only in dev (`import.meta.env.DEV`), send details to `/api/errors` instead. Add route-level `errorComponent`s (at least for `learn/*` and `reference/*`) so the shell survives. Write a real not-found page with navigation.
- **Suggested command:** `/impeccable harden`, then `/impeccable clarify` for the copy.

### [P1] Case colour is applied to whole phrases, so the colour teaches false grammar

- **What:** `cases-section.tsx:87` colours each teaching card's entire example with the case token, and `:176-182` does the same for trigger examples. False claims: είναι in "ο καφές είναι ζεστός"; θέλω in "θέλω τον καφέ"; η μυρωδιά in "η μυρωδιά του καφέ" (nominative, coloured genitive); πηγαίνω in "πηγαίνω στο σπίτι"; με / από in "με τον φίλο", "από το σπίτι"; το σπίτι in "το σπίτι μου" and η αδερφή in "η αδερφή της" (coloured genitive, but only μου / της are genitive).
- **Related content issue:** the Owner trigger "Before μου / σου / του / της" (my, your, his, her) implies the word _before_ μου becomes genitive. It doesn't; μου itself is the genitive. Worth a check with the `greek-curriculum-expert` skill before rewording.
- **Why it matters:** CLAUDE.md's colour rule says a case colour around Greek asserts that Greek's case, and PRODUCT.md says colour is how learners come to "feel" cases. Colouring a verb or a nominative noun olive trains the wrong association on the page whose whole job is to teach the association.
- **Fix:** colour only the case-bearing span (article plus noun, or the possessive pronoun), and leave the rest of the phrase in neutral foreground. That needs the example data to mark spans, for example `{ before: "θέλω ", marked: "τον καφέ", after: "" }`, rendered through `<GreekText tone=…>` on the marked part only.
- **Suggested command:** `/impeccable colorize` (scoped to "colour only the case-bearing words"), with `greek-curriculum-expert` for the μου wording.

### [P1] The `/try` conversion flow contradicts itself and the brand

- **What:**
  - The intro says "8 questions" but the session is 10: `buildWeightedDeck` pads to `sessionSize` (default 10) by repeating items (`deck.ts:66-70`, `drill-store.ts:134`).
  - The intro says "Space to start each question", but the input is auto-focused and there is no Space step (`try.tsx:53-56`). The keyboard hints also show on mobile.
  - "Start Drill" uses `<Button size="lg">` without a variant, and `defaultVariants.variant` is `secondary` (`button.tsx:39`), so the primary action is a pale outline. Meanwhile the header "Try a Drill" is filled terracotta on the page you're already on.
  - The drill header shows internal state to the learner: the bucket chip (`shells.tsx:263-265`, shows "—" here) and "remediation ×1" in amber monospace (`:266-270`).
  - The end screen uses 🎉 / 💪 / 🌱 at `text-5xl` with "Excellent!", "Good effort!" and "Great start!", the last for scores under 50% (`try.tsx:66-90`). PRODUCT.md uses "Amazing! 🎉" as its example of what not to do.
- **Why it matters:** this is the first drill a prospective user ever does. By the peak-end rule the ending sets their memory of the product, and the ending is the most off-brand screen in the app.
- **Fix:** derive the count from the deck (or pass `sessionSize={8}`); delete the Space hint and hide key hints on touch devices; `variant="primary"` on Start Drill and hide the header CTA on `/try`; remove the debug chips (or gate them behind a dev flag); end with the honest voice ("6 of 8 correct.", then the misses with their answers) and no emoji.
- **Suggested command:** `/impeccable clarify`, then `/impeccable distill`.

### [P2] The landing page sells streaks that PRODUCT.md forbids (needs a decision)

- **What:** the landing feature grid includes "Daily Streaks" with a flame icon and "A week of practice earns a freeze" (`LandingPage.tsx:94-107`). The app ships `WeekStreak`, `StreakCalendar`, `FreezeIndicator` ("Streak protected!") and `/progress` shows a streak calendar. PRODUCT.md says: "**No streaks.** ... Not now, not ever." CLAUDE.md lists "streaks as manipulation" as an anti-reference.
- **Why it matters:** either the product rule is out of date or the feature breaks it. Either way Impeccable (and any agent) reads PRODUCT.md as the source of truth and will keep flagging or undoing this.
- **Fix:** Mike and Chrys decide. If streaks stay, rewrite the PRODUCT.md rule to describe the kind that's allowed (for example, a quiet weekly calendar with no loss framing). If they go, remove the landing card first. Separately, replace the identical three-card grid with something structural (a short numbered list, or one worked drill example per feature).
- **Suggested command:** `/impeccable distill` on the landing once the decision is made.

### [P2] The article table is a list of chips, not a paradigm

- **What:** "Article for each case" (`cases-section.tsx:115-150`) shows rows of chips: nominative ο η το οι τα, accusative τον την το τους τις τα, genitive του της των. There are no masculine/feminine/neuter or singular/plural columns, so the chips do not line up, and the genitive row collapses to three.
- **Why it matters:** "Structure is pedagogy. The table is the lesson." A real 3 × 6 grid would show at a glance that neuter never changes between Doer and Target, that feminine only gains -ν, and that genitive plural is one form for everything. The current layout hides exactly the patterns a learner needs to see.
- **Fix:** a proper paradigm table, columns masc/fem/neut × sg/pl, rows labelled Doer / Target / Owner with the Greek term as a small secondary label. Keep horizontal scroll on mobile (PRODUCT.md forbids stacking paradigm cells).
- **Suggested command:** `/impeccable layout`

---

## Persona red flags

**Mike, between tutoring sessions** (primary user; shaky metalanguage; sits and studies):

- On `/reference/cases` the article table and both trigger panels lead with ACCUSATIVE / GENITIVE in the pill, with "Target triggers" as grey secondary text. That is the reverse of the rule he needs.
- The note "After είναι, both sides stay nominative ... so accusative never applies" is written entirely in metalanguage.
- Whole-phrase colouring teaches him that θέλω "feels" like a Target word.

**First-time visitor from organic search** (lands on `/`, taps Try a Drill):

- Sees a streaks card with a flame, which reads as Duolingo.
- The `/try` primary button looks disabled next to the header button.
- Gets told 8 and gets 10, sees "remediation ×1" after a miss, and ends on an emoji.

**Keyboard power user** (rapid drilling, never touches the mouse):

- Tabbing to the search and pressing Enter burns a card.
- The timer bar has no label, so under time pressure it is unclear whether it is time or progress.
- The exit arrow is 12px stone-300 with no accessible name (`shells.tsx:252`).

---

## Minor observations

- **Em dashes in learner copy:** 7 of them, listed in `detector-scan.md`. Both CLAUDE.md house style and Impeccable ban them.
- **Timer bar colour:** the drill timer bar uses case-role tokens on chrome (`drill.tsx:71-77`, `themeFor`), and so do the Speed/Filter selectors. That asserts a case where there is no Greek.
- **Opacity on a `-text` token:** `SelectorButton` combines `disabled:opacity-40` with a `-text` token (`shells.tsx:32`), which CLAUDE.md forbids.
- **Low-contrast informative text:** `stone-300` / `stone-400` is used for the drill counter, the exit arrow, "enter to check" and the `/try` key hints. That is below the AAA bar the design guidelines set.
- **Small touch targets:** under 44px on the drill back links, "Sign in" on `/try` and mobile "Sign In" (about 32px).
- **Looping landing demo:** `DrillDemo` loops forever and ignores `prefers-reduced-motion`. The only reduced-motion handling in the app is in `src/lib/theme.ts`. Given the memory/attention profile in the `visual-memory-design` skill, stop it after one or two cycles and respect reduced motion.
- **Unmarked Greek in the demo:** `DrillDemo` renders καλημέρα in `font-mono` and outside `<GreekText>`, so it has no `lang="el"`.
- **Decorative blur on buttons:** the `secondary` and `ghost` Button variants use `backdrop-blur-sm` purely decoratively.
- **Palette drift:** there is `text-white` in about 9 places where the palette uses `text-cream`, and `bg-amber-100 text-amber-600` on the remediation chip, which is Tailwind default, not a token.
- **Copy nits:**
  - "Greeklish ." has a stray space.
  - "2-3 minutes" should use an en dash.
  - "Why I Built This" is title case while the rest of the site uses sentence case.
  - "These ones drill producing it" reads awkwardly.
- **Hue collision on base-palette cards:** the essentials index tints Numbers ocean and Frequency olive. They are base-palette tokens, so they break no rule, but a learner who "feels" ocean as Doer and olive as Owner will read those cards as grammatical.
- **Clipped sign-in link:** on mobile the landing's "Already have an account? Sign in" sits half under the bottom nav at first paint.

## Questions to consider

- What if the drill screen had a focus mode, with no header search, no nav and a single labelled timer, so it feels like a flashcard on a desk rather than a web page?
- What if every reference table were a real paradigm grid, and the Greek, not coloured boxes, carried the case colour?
- What does the landing look like if it shows one real drill round instead of describing features in cards?
- Is `/try` the right first drill at all? It mixes pronouns and verbs, is untimed-looking, and says "Speed Drill".

---

## Not yet done (the critique's "Ask the user" step)

The critique flow ends by asking the user a few targeted questions before recommending commands. The session was interrupted before that, so these are still open for Mike / Chrys:

1. **Streaks:** keep them (and rewrite the PRODUCT.md rule) or remove them? This decides the landing work.
2. **Priority:** start with bugs and hardening (key handlers, error boundary, 404), the pedagogy surface (case colouring, paradigm table, metalanguage-first labels), or the front door (landing, `/try`)?
3. **Scope:** P1s only, or P1 and P2?
4. **Off-limits:** anything that should stay as it is? The cases hero and teaching cards are the obvious candidates to preserve.

Draft action plan, assuming "bugs first, then pedagogy, then front door":

1. `/impeccable harden`: scope the drill key handlers; dev-only error details; route-level error components; a real 404.
2. `/impeccable colorize`: colour only case-bearing spans on `/reference/cases`; stop using case tokens on drill chrome.
3. `/impeccable layout`: turn the article table into a masc/fem/neut × sg/pl paradigm with Doer/Target/Owner row labels.
4. `/impeccable clarify`: fix `/try` copy (count, key hints, end screen voice), remove em dashes, and put metalanguage second on reference labels.
5. `/impeccable distill`: redo the landing feature grid and essentials index once the streaks decision is made.
6. `/impeccable polish`: final pass, then re-run `/impeccable critique` to compare against 19/40.
