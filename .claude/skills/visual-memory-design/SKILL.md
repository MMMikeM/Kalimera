---
name: visual-memory-design
description: Design visual and interaction properties, colour, spatial layout, typography, chunking, motion, drill staging and review scheduling, so they support memory encoding and retrieval in a Greek language-learning app built for a user with temporal lobe epilepsy and likely ADHD. Use whenever deciding how content should look on screen, how to lay out cards or drills, whether and where a grammar colour token may appear, how many items belong on a screen, how a paradigm table should align, weight and group its rows, whether an animation or transition earns its place, how first exposure and drill flows should be staged for this memory profile, or how review intervals and progress displays should behave. Also use when reviewing an existing screen for memory-relevant issues, or when rejecting a commonly-cited design "best practice" that has failed to replicate (Sans Forgetica, disfluent fonts, warm-colours-aid-memory, 7±2 working memory). Do NOT use for motivation design, gamification, general UI/UX polish, brand or visual identity work, or accessibility concerns unrelated to memory.
---

# Visual memory design

This file governs visual and interaction decisions in the Greek learning app: colour, layout, typography, chunking, motion, drill staging and review scheduling, designed so content encodes into long-term memory rather than merely engaging attention.

Read it as the implementer. The app has one learner, who has temporal lobe epilepsy (not drug-resistant) and likely ADHD. Every rule below is already adjusted for that profile; apply rules directly rather than treating profile notes as an optional mode. Where a rule rests on thin evidence, the thinness is marked inline, and the evidence posture at the end says how to hold such rules. The baseline assumption throughout: poor memory consolidation, meaning standard-interval spaced repetition and retrieval on first exposure both plausibly underperform. That assumption is an inference from the clinical literature, not a tested fact about this individual.

Two principles sit under every rule:

1. **Working memory is tighter than folk psychology assumes.** Cap genuinely new content at 3 learning units per screen. A learning unit is a vocabulary card or a paradigm row being introduced, not every visual element; the elements inside one bounded card count as a single chunk. Cowan's 4 is the general ceiling, and 3 is a stipulated safety margin for this profile, not a derived constant; it is cheap to honour because an under-filled screen costs a tap while an overloaded one costs encoding. Review content is exempt, since familiar items chunk semantically. In paradigm tables the ceiling counts deviations, not cells (see the tables section).
2. **Salience is zero-sum.** Every emphasised element competes with every other for encoding resources, and boosting one measurably reduces memory for everything else on screen. Emphasis is spent, not free. One focal point per screen.

## The numbers

- New learning units per screen: **3** (review exempt; tables count deviations, not cells).
- Discriminable colour values per grammatical axis: **~4**.
- Gutter between elements inside a card: **8-16px** (a working default; the visual-angle derivation often attached to this figure does not survive the arithmetic).
- Focal points per screen: **1**.
- First spaced-repetition review: **1-4 hours** after exposure, not next day (stipulated, and currently blocked on a schema change rather than a constant to tune; see scheduling).
- Weights in a paradigm table: **3** (deviating, anchor, receded).

## Layout and salience

### Consistency across sessions beats almost everything

The learner builds implicit spatial associations over weeks. These operate below awareness, survive working-memory load, and subsidise content encoding. Disrupting a learned layout drops performance below baseline during relearning, so moved furniture is a real cost, never neutral.

In a personal app under active development the threat is not a redesign initiative; it is drift. Rules:

- A refactor of a shipped screen must render established elements in their established positions. Treat position as part of the component's contract.
- Never restyle or rearrange a shipped screen as a side effect of unrelated work. When a layout change is genuinely worth its relearning cost, batch such changes and make them rarely and deliberately.
- Never reorder content by frequency or recency on learning surfaces.
- Paged card presentation, not infinite scroll. Position is a retrieval cue; scrolling destroys it and adds attention drift.

Evidence note (contested): do not assume contextual cueing runs on extra-hippocampal systems and is therefore robust for this profile. Classic amnesia work found it impaired with broad medial temporal damage, later work found it intact when damage was confined to the hippocampus proper, and TLE typically involves the wider medial temporal lobe. Hold layout consistency as cheap insurance, not compensation.

### Contiguity: one learning unit, one bounded region

Put every element of a learning unit inside one visibly bounded card: word, transliteration (this app uses greeklish, not IPA), example sentence, translation, and image when present. Containment must be explicit for this profile: a visible border or background delineation, not just whitespace.

- No translation on a different screen from its word.
- No tap-to-reveal on a first encounter with an item. A gated reveal is a retrieval demand, and first exposure must be errorless (see drill flow).
- No pronunciation carried only by an audio affordance with no visible transliteration.
- 8-16px of clear space between elements inside the card. Contained, not crushed.

Contiguity applies within table rows too: a gloss pushed to the far margin by `justify-between` is the same failure as a translation on another screen (see tables).

### One focal point, quiet surround

Pick the single visually loudest element per screen: the target word, the active drill field, the form being introduced. Then make the surround actively quiet, quieter than a typical-learner design would bother with, because the target has to survive top-down suppression failures:

- No decorative illustration in content areas. A semantic image inside a vocabulary card is content, not decoration; the ban covers imagery outside the learning unit.
- No ambient or background motion of any kind.
- Progress, stats and navigation never at a visual weight comparable to the target.
- Hard boundaries between content and everything else: full-width rules, borders at real contrast. Subtle dividers are not enough.
- Never emphasise answer feedback, streak indicators and the target simultaneously. Never use more than one accent-for-attention colour on a screen. Never give chrome the salience of content.

"ADHD-friendly means calm, minimal and pale" inverts the requirement. Loud target, quiet everything else.

## The colour system

Colour earns its place when it encodes something the learner must internalise. It fails when it is affective, decorative, or layered on a signal that already carries the same information. Work through these subsections as a checklist; each catches a specific failure mode.

### Axis planning, once

Map the grammatical axes to be taught and the pages they appear on, once, at the start of the design system.

- Axes appearing on 3 or more pages are global and get reserved tokens with fixed meaning app-wide.
- Axes on 1-2 pages are local and use page-specific colours chosen not to collide with the globals.

For Greek: case and gender are global, recurring wherever nouns, articles, adjectives and pronouns do. Tense probably becomes the third global when Verbs is built out; aspect may follow. Contraction behaviour (Prepositions), conjugation pattern family (Verbs) and construction type (Patterns) are local.

### Reserved tokens for global axes

Every value of a global axis gets a named token keyed to the grammatical role, not the colour:

- `--case-nominative-*` (full tonal scale), `--case-accusative-*`, `--case-genitive-*`
- `--gender-masculine-*`, `--gender-feminine-*`, `--gender-neuter-*`

Same colour, same meaning, every time, on every page that teaches the axis. Role-keyed naming does not mechanically prevent misuse (a token is just a named value unless a lint rule enforces it), but it makes misapplication conspicuous in review, which is most of its value.

Use the tonal scale for intensity: subtle (background tints, cell washes), default (labels, chips, concept cards), strong (focus states, errors, focal signalling). Role constant, intensity contextual. Signalling intensity on task-relevant features goes up for this profile, never down, and always via heavier variants of the reserved tokens; never invent extra palettes, and strip decorative non-reserved colour from the surround.

### Where grammar colours may appear

Hard rule: a grammar colour used as fill, background or border around Greek grammatical content asserts that content's grammatical value. True assertion, fine. False assertion, the colour is lying and breaking the system.

Forbidden: a feminine-rose background behind a non-feminine example; a nominative-blue tint on a card holding a non-nominative example; a genitive-green border around an explanation of something else; any grammar colour applied because it looks nice with the content.

Fine: grammar colours on navigation, buttons, illustrations, empty states, error toasts and loading spinners, anything not wrapped around Greek grammatical content; a grammar colour as a link colour or an icon fill far from grammatical examples.

Context test for ambiguous cases: would the learner plausibly read the colour as encoding the grammatical value of nearby content? If yes, don't.

One specific collision: a CTA inside a grammar card that uses a grammar colour reads as part of the grammatical system. Give it a different colour, or make it neutral whenever it sits inside a coloured grammar card.

### Per-axis cap: roughly 4

Case has three values (four if the vocative is taught); gender has three. Beyond about four values within one axis, discriminability collapses. The cap is per axis, not per app: axes that never co-occur on a screen can each carry their own palette.

### Intersection pages: two global axes at once

When a page teaches the intersection of two globals (articles by case × gender), deploy both. This is the payoff for reserving tokens. Mechanisms, in fixed order of preference:

1. **Row × column separation (safest):** one axis on row headers, one on column headers, cells neutral. The eye learns to read a cell as the intersection of its row colour and column colour.
2. **Background + text:** one axis as a subtle cell tint, the other as text colour at default intensity, valid only when the palettes contrast cleanly.
3. **Neutral**, relying on spatial labels alone: the correct fallback when neither mechanism separates the axes cleanly, and an anti-pattern whenever one of them would have.

Never layer two saturated colours on one element; it muddies both. Pick one mechanism and use it for every intersection view in the app.

### Colour follows the concept, not the label

Different display names for the same grammatical fact ("Accusative" versus "Target Triggers" as a tab toggle) keep the same colour. Colour binds to the role, not the wording. Easy to violate when building toggles, tabs and alternative views.

### When not to colour

- The page teaches a relationship, not an axis. Agreement (Adjectives) is a relation between article, adjective and noun; default to neutral paradigms with colour only on the relationship-demonstration block (a "Doer / Target" trio where three words sharing a case is the point).
- The page is a catalogue with no unifying structural axis. Colour cannot mean anything there; go fully neutral.
- Two axes co-occur and neither intersection mechanism separates them cleanly (see above).

Test: can you state what colour means on this page in one sentence? If yes, colour it. If no, don't.

### Von Restorff isolation is a legitimate variant

Colouring only the outlier of an axis (the feminine variants that decline differently, the one irregular verb against a pattern-based system) still counts as colouring the axis the page teaches, with a narrower application. Within a page, colour all values or only the isolated outlier, never "two of three because the third is hard to pick a colour for". Tables apply this cell-wise (see tables).

### Per-page key, near the top, always

Wherever an axis is deployed, establish the colour-to-role key visibly near the top. Good examples in the app: the Cases concept cards (Doer, Target, Owner, each with its colour), the "Which Pattern?" selector on Verbs before any paradigm tables, the coloured section headers on Pronouns. Bad: the bottom-of-page legend Prepositions currently uses, seen only after the confusion it should have prevented. The key sits at default intensity and never outranks the screen's focal element; on drill screens keep it compact.

## Typography

Legibility, not desirable difficulty. Choose fonts for legibility at target sizes, keep the typographic palette small, and use weight and italics as systematic signals: stressed syllables bold, loanwords italic, the target morpheme heavier. Sans Forgetica and disfluent fonts failed to replicate across multiple independent labs; harder-to-read aids frustration, not retention. Size above the legibility threshold buys nothing except the feeling of importance.

## Motion

One good use: procedural animation of morphology, an infinitive animating into its conjugated form. Give it pause, replay and scrub, and segment long sequences into chunks. All other motion, transitions, micro-interactions, polish, is attention capture without encoding benefit, and for this profile is actively harmful rather than neutral. No interface motion beyond the bare minimum needed for affordance signalling, and no ambient motion ever.

A live example of the failure: the streak indicator in `WeekStreak.tsx` currently pulses via `animate-pulse`, decorative motion on a progress metric, tripping this rule and progress-display honesty at once. Strip it.

## Imagery (dual coding): the highest-value missing support

A distinctive, semantically loaded image paired with an L2 word is encoding infrastructure; a generic icon is decoration. The payoff is larger for this profile, and abstract and function words, the hardest cases, benefit most from a concrete image or contextual anchor.

Status: the current card template carries no image. When images are added, start with abstract and function words, hold the distinctive-referent bar rather than shipping an icon pack, and slot the image into the errorless stages (visible at first exposure, then serving as the stage-two recall cue).

## Paradigm tables: the primary teaching surface

The levers above are written around a card. This app's main teaching artefact is the paradigm table, and where card guidance and table guidance conflict on a table, this section wins.

### A table's job is the column, not the cell

The reason to use a table rather than a list is vertical comparison: running the eye down one column to see a pattern across many words. Anything that makes columns ragged destroys the only thing a table is for.

- Fixed column widths, not flex rows. A row built with `justify-between` or wrapping flex children aligns nothing, and the table degrades to a list with extra markup.
- Decide which column is being scanned and give it the strongest weight. On a verb list where the past is the thing you cannot derive, the past column is the target and the present is context.
- A sub-row that interrupts a column (an expansion, an annotation) breaks the quietest column, never the scanned one.

### Contiguity within a row

Keep the gloss in its own column adjacent to the Greek; send only chrome (expand toggles, counts) to the margin. A gloss pushed to the far edge by `justify-between` is the translation-on-another-screen failure at smaller scale.

### Three weights, not two

A paradigm grid needs an anchor even when nothing in it is surprising.

- **Deviating cells:** heaviest. The forms you would get wrong.
- **The anchor cell** (usually 1sg): mid weight. The form you already know and derive the rest from.
- **Everything predictable:** receded.

With only two weights, a fully regular paradigm greys out entirely and the eye has nowhere to land; the table reads as disabled rather than as "learn row one, the rest follow".

### The ceiling counts surprises, not cells

A 6×3 paradigm is 18 cells, which looks like a flagrant breach of the 3-unit ceiling. It is not, provided the derivable cells are visibly receded: the learning units are the pattern (one chunk) plus the cells that deviate from it. Keep the deviations at or under the ceiling and the grid is legitimate. This is Von Restorff isolation applied cell-wise, and it is why a table may carry more on screen than a card may.

Corollary: never encode the same fact twice. If the grid already bolds the irregular forms, do not also list them above it. Two channels for one fact read as two facts, and the redundancy spends exactly the salience the focal-point rule is rationing.

### Long tables need named sub-groups, not scrolling

Once a table exceeds roughly one viewport, break it into labelled semantic blocks rather than letting it run. Twenty-seven rows is twenty-seven things to hold; the same rows under four honest headings is four. The ceiling applies to the groups, not the rows.

- The labels must be true. A "Greetings" heading over a block that is half courtesies is worse than no heading; semantic grouping is a memory support for this profile (see drill flow), not decoration.
- A grouping driven by a hand-authored list must render every unmatched row under a catch-all. Silently dropping rows is a worse failure than an ungrouped table.

### Colour must survive vertical scanning

A colour chip inside a cell is invisible while the eye moves down the table. A row-level grammatical value worth encoding (gender on a noun list) goes on a full-height row edge, a left border at real contrast, so it reads in peripheral vision during the scan.

Section headers are containment, not salience: hard-edged but low-chroma. A saturated header bar competes with the axis the table exists to teach.

## Drill flow and review scheduling

Built around the two documented risks of this profile: accelerated long-term forgetting (recall can look normal at 30 minutes while retention collapses over hours to weeks; well documented in TLE) and error learning (errors generated on weak traces later compete with the correct form at retrieval; errorless learning has a real track record in memory-impaired populations). The specific parameters below are stipulated design responses to those risks, not clinically validated prescriptions.

### Errorless first exposure

Never demand retrieval on a first encounter. Stage every new item:

1. **First exposure:** the full card visible at once (word, transliteration, translation, example; image when available), zero retrieval demand.
2. **Second exposure:** cued recall. Prompt with the translation or a gapped example sentence (the image, once images exist); produce the word.
3. **Third exposure:** recognition. Choose the correct form among plausible alternatives.
4. **Free recall** only after multiple successful cued and recognition rounds.

### Recognition counts as progress

Free-recall metrics under-represent what this learner knows, because the profile leans on familiarity (relatively preserved) more than recollection (compromised). Offer recognition and cued-recall drill modes alongside free recall, track progress across all modes, and never gate progress display behind free-recall milestones alone.

### Short initial intervals

- First review 1-4 hours after exposure, not next day (stipulated window; the ALF literature motivates "much sooner than standard", not the specific hours).
- Items that fail a short-interval review get much shorter intervals before the next attempt.
- A second same-day review for items that were rocky the first time.
- Intervals widen on the standard SRS curve shape, from the shorter base.

This means many more reviews per item. Budget for it.

Implementation status: the current scheduler (`src/server/srs.ts`) stores intervals in whole days with a minimum of one, so the 1-4 hour first review is a schema change to sub-day granularity, not a constant tweak. Until that lands, this rule is aspiration, not configuration.

### Semantic grouping, never arbitrary order

Random batches of unrelated words demand exactly the arbitrary hippocampal binding that cannot be counted on here, while wasting the semantic scaffolding that still works. Introduce vocabulary in coherent sets (kitchen items, travel verbs, emotion words), never alphabetically or by raw frequency without semantic clustering, and anchor every function word to a concrete contextual example.

### Progress display honesty

A streak can be seven days of re-encounters at intervals too short to measure real retention. Do not display streaks or "remembered" counts in ways that imply consolidation is happening faster than it is. Build the schedule around realistic forgetting and the display around realistic retention; otherwise the learner comes to trust a metric that quietly misleads them about what they will remember next month.

## Anti-patterns

**Popular claims that failed to replicate or never had evidence:**

- **Sans Forgetica and disfluent fonts.** Multiple independent lab failures.
- **"Warm colours / red boost memory via arousal".** Repeatedly failed replication.
- **7±2 working memory.** Use Cowan's 4; 3 here.
- **Decorative motion "keeps attention".** Attention yes, encoding no.
- **"Larger = more memorable".** A metamemory illusion; above legibility, size does not help.
- **Micro-interactions as mnemonics.** No peer-reviewed evidence.

**Moves that break this app or this profile:**

- **Layout drift.** Refactors that move established elements, restyles folded into unrelated work, frequency-based reordering. Disrupts the spatial associations doing silent work.
- **"Calm minimalist pale everything" as ADHD-friendly.** Inverts the requirement: loud target, quiet surround.
- **Grammar colours as decoration around non-matching content.** The colour becomes a lie and the system breaks.
- **Flex rows where a table is meant.** Ragged columns destroy the vertical comparison that is the only reason to use a table.
- **Encoding the same fact twice** (bolding the irregular cells and listing them above the table). Two channels for one fact read as two facts.
- **Colour keys at the bottom of the page.** Seen only after the confusion they should have prevented.
- **Going neutral on an intersection page while a clean separation mechanism is available.** Wastes the global tokens; neutral as a genuine last resort is correct.
- **Retrieval on first exposure.** The worst case for this profile; see errorless first exposure.
- **Arbitrary-order vocabulary introduction.** Demands the binding that is compromised while wasting the semantic scaffolding that works.
- **Progress metrics counting only free recall.** Under-reports what this learner actually knows.

## Before shipping any screen, ask:

1. Does this element need to be this visually loud, given that salience is zero-sum?
2. Is every decoration doing encoding work, or is it just there?
3. Is this colour making a grammatical claim about the content it wraps? If yes, is the claim accurate? If it is not making a claim, is it a grammar token misused as decoration near grammatical content?
4. If a global axis is deployed, is it the reserved token at the right intensity, not an invented colour?
5. Is the colour key visible near the top of the page?
6. Will this layout be identical for the learner next month?
7. Are there more than 3 new learning units in the perceptual frame?
8. If it is a table: do the columns align, is there an anchor cell, and are derivable cells receded so only deviations count against the ceiling?
9. If motion is involved: is it procedural? If not, cut it.
10. Does the first exposure demand retrieval, or show everything first?
11. If the answer to "why is this here" is "because it looks nicer": it is decoration. Reconsider.

## Evidence posture

For any decision where the evidence is thin or unmarked:

1. **Default to the universal, evidence-backed rule.**
2. **Put costly divergences behind toggles** (short intervals, errorless mode, high-intensity signalling). With one learner, a toggle is not market segmentation; it is the instrument for comparing modes on the same person.
3. **Track outcomes per mode**, so the comparison is measured rather than vibes.
4. **Never claim clinical validation.** These adaptations are motivated by the literature, not tested at product scale. "Designed for", never "proven to help".

## Editing this file

Two failure modes have already occurred during edits to this skill; check for both on every future edit:

1. **Propagate removals to their dependents.** Cutting a rule, field or section must be followed by a scan for everything that referenced it. The imagery cut left the errorless stages cueing on an image that did not exist; the novelty cut had to take the lever-1 tiebreak with it.
2. **Keep the epistemic markers.** "Contested", "stipulated", "an inference, not a tested fact" sit on exactly the claims an agent would otherwise apply with false confidence. Concision pressure eats qualifiers first; here they are load-bearing and survive every rewrite.
