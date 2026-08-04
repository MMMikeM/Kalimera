# Question-words progressive hub

## Context

`/practice/blocks/question-words` is currently one flat 19-item drill. The ποιος/πόσος items drill decoding of metalinguistic labels ("which? (he-word, after a verb)") rather than the real skill — gender agreement with a noun. The cases section (`/practice/cases`) already models the fix: a hub of small drills building up isolated form → agreement in context → mixed review. Restructure question-words the same way: small chunks, incrementing difficulty.

User decisions: **forms first, then phrases** (mirror cases' article → phrase ladder), and **do the Owner ("whose?") forms properly now** — full ποιανού/ποιανής/ποιανών, not a lone token item.

## New structure

`git mv src/routes/practice/blocks/question-words.tsx src/routes/practice/blocks/question-words/index.tsx`, then rewrite as hub. Add leaf files. File-based nesting needs no layout route; use absolute `backTo="/practice/blocks/question-words"` everywhere, explicit `from={Route.fullPath}` on DrillButtons — never `..` or `prefix()`.

### `question-words/index.tsx` — hub
Copy `cases/index.tsx` pattern: `GroupSection title="Question words" returnTo={Route.fullPath}` + `PhaseSection`s + `DrillButton`. Phases (neutral tint — do NOT extend PHASE_TINT; Doer/Target/Owner tints are a cases mnemonic):

| Phase | Drills |
|---|---|
| Basics | basics |
| Which? (ποιος) | which-forms → which-phrase |
| How much? (πόσος) | how-many-forms → how-many-phrase |
| Review | review |

Entries follow the `Drill` type from `components/group-section.tsx` (`{id, to, title, greek, minutes}`); e.g. `{id:"blocks-qw-which-phrase", to:"/practice/blocks/question-words/which-phrase", title:"Which + noun", greek:"ποιον καφέ · ποια μέρα · ποιο σπίτι", minutes:2}`.

### `basics.tsx` — 5 invariables
`drillId="blocks-qw-basics"`. Existing τι, πού, πότε, πώς, γιατί (keep accents — πού/πώς vs relative που/πως). Self-assess reverse, no categories. Reuse the `item()` helper + `greekToPhonetic`.

### `which-forms.tsx` — isolated ποιος paradigm
`drillId="blocks-qw-which-forms"`, ~11 items. Full paradigm including Owner:
- Doer: ποιος / ποια / ποιο ("which? (he-word)" etc.)
- Target: ποιον (he-word; ποια/ποιο unchanged — include ποιον only)
- Owner: ποιανού (he-/it-word), ποιανής (she-word), ποιανών (plural) — `acceptAlso: "τίνος"` on ποιανού (common colloquial equivalent)
- Plural: ποιοι / ποιες / ποια
Categories: `[{id:"doer",label:"Doer"},{id:"target",label:"Target"},{id:"owner",label:"Owner"},{id:"plural",label:"Plural"}]`. Move the existing `Paradigm` table here as `configExtras`, extended with an Owner column/row. Self-assess reverse.

### `which-phrase.tsx` — agreement with real nouns
`drillId="blocks-qw-which-phrase"` (fresh ids are fine — current drill has no `vocabId`s, so only `practiceAttempts` history exists; SRS cost of splitting is ~zero). ~16 authored phrase items, data shape copied from `cases/accusative/phrase.tsx` (`greek`, `greeklish`, `english`, `label`, `category`, `dimension`):
- Doer: ποιος καφές;, ποια μέρα;, ποια τσάντα;, ποιο σπίτι;, ποιο παιδί;
- Target: ποιον καφέ;, ποιον άντρα;, ποια ταινία;, ποιο βιβλίο; (label cues like "which coffee? (you want it)")
- Owner: ποιανού φίλου;, ποιανής γυναίκας;, plus usage item ποιανού είναι; ("whose is it?")
- Plural: ποιοι φίλοι;, ποιες μέρες;, ποια παιδιά;
Reverse: `{kind:"single-select", options: GENDER_DIMENSION_OPTIONS, getCorrectId: (i) => String(i.dimension ?? "")}`, `reverseLabel="Greek → gender"`.

### `how-many-forms.tsx` — isolated πόσος paradigm
`drillId="blocks-qw-how-many-forms"`, ~7 items: πόσος / πόση / πόσο (how much, by gender), πόσοι / πόσες / πόσα (how many), adverbial πόσο ("how much? (cost, degree)"). Self-assess, paradigm table as `configExtras`.

### `how-many-phrase.tsx` — with real nouns
`drillId="blocks-qw-how-many-phrase"`, ~13 items: πόσος καιρός;, πόσος κόσμος;, πόση ζάχαρη;, πόση ώρα;, πόσο γάλα;, πόσο ψωμί;, πόσοι φίλοι;, πόσοι άνθρωποι;, πόσες μέρες;, πόσες ώρες;, πόσα παιδιά;, πόσα χρόνια;, plus πόσο κάνει; ("how much does it cost?", `dimension:"invariable"`). Reverse: single-select with `[...GENDER_DIMENSION_OPTIONS, {id:"invariable", label:"Doesn't change", selectorBg:"bg-stone-100", selectorText:"text-stone-800"}]`.

### `review.tsx` — mixed discrimination
`drillId="blocks-qw-review"`. Export item arrays from siblings (precedent: `PHRASES` export in `cases/accusative/phrase.tsx`), concatenate with categories `basics | which | how-many`. `sessionSize` ~15. Self-assess reverse (invariables have no gender). Forward typing across the mixed deck is the discrimination test.

### `blocks/index.tsx` — minimal edit
Keep `to:"/practice/blocks/question-words"` (now the hub); update `minutes` (~7) and `greek` preview (`τι · ποιον καφέ · πόση ζάχαρη`). Do not restructure the blocks hub itself.

## Files
- Move: `blocks/question-words.tsx` → `blocks/question-words/index.tsx` (git mv, then rewrite)
- New: `blocks/question-words/{basics,which-forms,which-phrase,how-many-forms,how-many-phrase,review}.tsx`
- Edit: `blocks/index.tsx` (one entry)
- Patterns to copy: `cases/index.tsx` (hub), `cases/accusative/phrase.tsx` (phrase items + single-select reverse), `components/engines/drill-constants.ts` (GENDER_DIMENSION_OPTIONS)

## Verification
1. `pnpm dev` — routeTree regenerates; no collision errors; `/practice/blocks/question-words` loads as hub.
2. `pnpm typecheck`, `pnpm lint`.
3. Click-through: blocks → Question words hub → each of 6 drills: config screen (back link to hub; paradigm tables on forms drills), forward mode (typed Greek incl. accents; τίνος accepted for ποιανού), reverse mode (gender chips on phrase drills incl. "Doesn't change" for πόσο κάνει;), complete a session, return navigation.
