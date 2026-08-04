# Question-words progressive hub

## Context

`/practice/blocks/question-words` is currently one flat 19-item drill. The ποιος/πόσος items drill decoding of metalinguistic labels ("which? (he-word, after a verb)") rather than the real skill — gender agreement with a noun. The cases section (`/practice/cases`) already models the fix: a hub of small drills building up isolated form → agreement in context → mixed review. Restructure question-words the same way: small chunks, incrementing difficulty.

User decisions: **forms first, then phrases** (mirror cases' article → phrase ladder), and **do the Owner ("whose?") forms properly now** — full ποιανού/ποιανής/ποιανών, not a lone token item.

## New structure

`git mv src/routes/practice/blocks/question-words.tsx src/routes/practice/blocks/question-words/index.tsx`, then rewrite as hub. Add leaf files. File-based nesting needs no layout route; use absolute `backTo="/practice/blocks/question-words/"` everywhere (trailing slash — index-route path, matching `backTo={"/practice/cases/"}` in `cases/accusative/phrase.tsx`), explicit `from={Route.fullPath}` on DrillButtons — never `..` or `prefix()`. Typegen will confirm whether `blocks/index.tsx`'s `to:"/practice/blocks/question-words"` key survives the move; adjust to whatever `FileRoutesByTo` generates.

### Motivation constraints (intrinsic-motivation-design review)
The drill engine already conforms — `SummaryScreen` is informational (score, avg time, struggle reframe "These caught you…", fork of Drill mistakes / Practice again / back). Add **no** new completion UI, praise, badges, or per-drill progress markers. Specifically:
- **No gating.** All six drills open from day one; phase ordering communicates the ladder, locks would violate autonomy.
- **Honest minutes.** Per-drill estimates reflect item counts (below), not aspiration.
- **Difficulty acknowledged, once.** Only the review drill carries an interleaving note (see review.tsx); forms/phrase drills need no framing.

### Data-shape constraints (engine facts)
- **No Greek question mark `;` in item `greek` fields.** `matchPhonetic`/`greekToPhonetic` do no punctuation stripping — a `;` in `greek` would require the learner to type it. `;` may appear in hub previews and labels only.
- **`label` is the forward-mode prompt** (English cue); reverse modes display `greek`. Do not copy the cases-phrase oddity of `label` = Greek.

### `question-words/index.tsx` — hub
Copy `cases/index.tsx` pattern: `GroupSection title="Question words"` + `PhaseSection`s + `DrillButton from={Route.fullPath}`. **Do not copy `returnTo={Route.fullPath}`** — in `cases/index.tsx` that makes the "← back" link point at itself (pre-existing bug); use `returnTo="/practice/blocks"` so back lands on the blocks hub. Phases (neutral tint — do NOT extend PHASE_TINT; Doer/Target/Owner tints are a cases mnemonic; unknown phase keys already fall back to neutral styling):

| Phase | Drills | Minutes |
|---|---|---|
| Basics | basics | 1 |
| Which? (ποιος) | which-forms → which-phrase | 2 → 2 |
| How much? (πόσος) | how-many-forms → how-many-phrase | 1 → 2 |
| Review | review | 2 |

Entries follow the `Drill` type from `components/group-section.tsx` (`{id, to, title, greek, minutes}`); e.g. `{id:"blocks-qw-which-phrase", to:"/practice/blocks/question-words/which-phrase", title:"Which + noun", greek:"ποιον καφέ · ποια μέρα · ποιο σπίτι", minutes:2}`.

### `basics.tsx` — 5 invariables
`drillId="blocks-qw-basics"`. Existing τι, πού, πότε, πώς, γιατί (keep accents — πού/πώς vs relative που/πως). Self-assess reverse, no categories. Reuse the `item()` helper + `greekToPhonetic`.

### `which-forms.tsx` — isolated ποιος paradigm
`drillId="blocks-qw-which-forms"`, ~12 items. Full paradigm including Owner:
- Doer: ποιος / ποια / ποιο ("which? (he-word)" etc.)
- Target: ποιον (he-word; ποια/ποιο unchanged — include ποιον only)
- Owner: ποιανού (he-/it-word), ποιανής (she-word), ποιανών (plural)
- Owner usage: ποιανού είναι; ("whose is it?") — lives here, not in which-phrase, because standalone ποιανού is ambiguously m/n and self-assess reverse asks no gender question
- Plural: ποιοι / ποιες / ποια

**No `acceptAlso: "τίνος"`.** The engine renders `acceptAlso` as the big "full form" and relabels `greek` as "ending" in `FeedbackDisplay` (`shells.tsx` ~325) and `SummaryScreen` mistake cards — every ποιανού answer would show "τίνος" prominently over "ending ποιανού", which is wrong. Instead teach τίνος as a one-line footnote under the paradigm table in `configExtras` ("τίνος — common colloquial equivalent of ποιανού").

Categories: `[{id:"doer",label:"Doer"},{id:"target",label:"Target"},{id:"owner",label:"Owner"},{id:"plural",label:"Plural"}]`. Move the existing `Paradigm` table here as `configExtras`, extended with an Owner column (ποιανού / ποιανής / ποιανού; plural ποιανών as a fourth-column entry or footnote) + the τίνος footnote. Self-assess reverse.

### `which-phrase.tsx` — agreement with real nouns
`drillId="blocks-qw-which-phrase"` (fresh ids are fine — current drill has no `vocabId`s, so only `practiceAttempts` history exists; SRS cost of splitting is ~zero). ~16 authored phrase items, data shape copied from `cases/accusative/phrase.tsx` (`greek`, `greeklish`, `english`, `label`, `category`, `dimension`):
- Doer: ποιος καφές;, ποια μέρα;, ποια τσάντα;, ποιο σπίτι;, ποιο παιδί;
- Target: ποιον καφέ;, ποιον άντρα;, ποια ταινία;, ποιο βιβλίο; (label cues like "which coffee? (you want it)")
- Owner: ποιανού φίλου;, ποιανής γυναίκας; (ποιανού είναι; moved to which-forms — no single gender for the reverse selector)
- Plural: ποιοι φίλοι;, ποιες μέρες;, ποια παιδιά;
Every item needs a defensible single `dimension` (plural items keep `category:"plural"` + gender dimension, per the cases phrase precedent). Reverse: `{kind:"single-select", options: GENDER_DIMENSION_OPTIONS, getCorrectId: (i) => String(i.dimension ?? "")}`, `reverseLabel="Greek → gender"`.

### `how-many-forms.tsx` — isolated πόσος paradigm
`drillId="blocks-qw-how-many-forms"`, ~7 items: πόσος / πόση / πόσο (how much, by gender), πόσοι / πόσες / πόσα (how many), adverbial πόσο ("how much? (cost, degree)"). Self-assess, paradigm table as `configExtras`.

### `how-many-phrase.tsx` — with real nouns
`drillId="blocks-qw-how-many-phrase"`, ~15 items: πόσος καιρός, πόσος κόσμος, πόση ζάχαρη, πόση ώρα, πόσο γάλα, πόσο ψωμί, πόσοι φίλοι, πόσοι άνθρωποι, πόσες μέρες, πόσες ώρες, πόσα παιδιά, πόσα χρόνια, plus πόσο κάνει ("how much does it cost?", `dimension:"invariable"`).

**Target coverage:** add πόσο καιρό ("how long? — for how much time") and πόσο χρόνο ("how much time? (you need it)"), both `dimension:"masculine"`, `category:"masculine"`. Masculine singular is the only πόσος form that visibly changes case (πόσος → πόσο(ν)), and πόσο καιρό vs πόσο γάλα is the m/n discrimination in reverse mode. Feminine/neuter Target forms are identical to Doer — drilling them separately would be redundant. **Genitive πόσου/πόσης is deliberately excluded** — rare in modern speech.

Categories: `GENDER_PLURAL_CATEGORIES` (πόσο κάνει carries no category — appears under "All" only). Reverse: single-select with `[...GENDER_DIMENSION_OPTIONS, {id:"invariable", label:"Doesn't change", selectorBg:"bg-stone-100", selectorText:"text-stone-800"}]`.

### `review.tsx` — mixed discrimination
`drillId="blocks-qw-review"`. Export item arrays from siblings (precedent: `PHRASES` export in `cases/accusative/phrase.tsx`), concatenate with categories `basics | which | how-many`. `sessionSize: 20` — the `SessionSize` type is `10 | 20 | 30` (`deck.ts`), so "~15" is not representable; the config screen still lets the user pick. Self-assess reverse (invariables have no gender). Forward typing across the mixed deck is the discrimination test.

Acknowledge the difficulty jump (desirable-difficulty: interleaving must be explained or it reads as failure) with one informational sentence in the config `subtitle`, e.g. `"mixed ποιος · πόσος · invariables — mixing is harder, and sticks better"`. Plain text only; no banner, no new UI.

### `blocks/index.tsx` — minimal edit
Keep `to:"/practice/blocks/question-words"` (now the hub); update `minutes` to 10 (honest sum of the six drills) and `greek` preview (`τι · ποιον καφέ · πόση ζάχαρη`). Do not restructure the blocks hub itself.

## Files
- Move: `blocks/question-words.tsx` → `blocks/question-words/index.tsx` (git mv, then rewrite)
- New: `blocks/question-words/{basics,which-forms,which-phrase,how-many-forms,how-many-phrase,review}.tsx`
- Edit: `blocks/index.tsx` (one entry)
- Patterns to copy: `cases/index.tsx` (hub), `cases/accusative/phrase.tsx` (phrase items + single-select reverse), `components/engines/drill-constants.ts` (GENDER_DIMENSION_OPTIONS)

## Verification
1. `pnpm dev` — routeTree regenerates; no collision errors; `/practice/blocks/question-words` loads as hub.
2. `pnpm typecheck`, `pnpm lint`.
3. Click-through: blocks → Question words hub (back link goes to `/practice/blocks`, not itself) → each of 6 drills: config screen (back link to hub; paradigm tables + τίνος footnote on which-forms), forward mode (typed Greek incl. accents), reverse mode (gender chips on phrase drills incl. "Doesn't change" for πόσο κάνει;; self-assess on which-forms so ποιανού είναι; needs no gender), complete a session, return navigation.
