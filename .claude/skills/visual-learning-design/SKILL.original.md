---
name: visual-memory-design
description: Design visual properties — colour, spatial layout, typography, contrast, grouping, motion — so they support memory encoding and retrieval in a language learning app. Use whenever deciding how content should look on screen, how to lay out cards or drills, whether to use colour or weight to mark grammatical features, whether an animation or transition earns its place, how many items belong on a screen, whether a scaffold should be added or faded, or how to present content so it actually sticks rather than just looks engaging. Also use when reviewing an existing screen for memory-relevant issues, or when rejecting a commonly-cited design "best practice" that has failed to replicate (Sans Forgetica, disfluent fonts, warm-colours-aid-memory, 7±2 working memory, redundancy-strip-the-captions). Do NOT use for motivation design, gamification, general UI/UX polish, brand or visual identity work, or accessibility concerns unrelated to memory.
---

# Visual memory design

A skill for designing visual properties so they help language content encode and retrieve, rather than just engage.

This skill assumes the primary user may have ADHD, temporal lobe epilepsy, or both. Where the evidence-backed universal rule bends for these profiles, the bend is called out inline under the relevant principle. A few memory supports are ND-specific rather than modifications of universal rules — those live in their own section near the end.

## The core frame

Most visual design for learning apps optimises for attention and engagement. Attention is necessary but not sufficient — attention without encoding is entertainment. This skill is about what the **visual layer** can do to move material from working memory to long-term memory, and how to avoid visual moves that cost encoding capacity without paying it back.

Three principles shape every decision:

1. **Working memory is tighter than folk psychology assumes.** The realistic ceiling for new L2 content is 4 items per screen, not 7±2. For users with ADHD, tighter still — treat 3 as the ceiling.
2. **Salience is zero-sum.** Every emphasised element competes with every other emphasised element for encoding resources. One focal point per screen is the operational rule.
3. **Scaffolds help novices and hurt experts.** Every visual aid — colour coding, signalling, worked examples, integrated captions — becomes noise as proficiency grows. Design the fade path at the same time you design the scaffold. This is non-negotiable for grammatical colour coding.

## The levers that work

Ranked by evidence strength and how reliably they transfer to a mobile, self-paced learning context. Invest design effort here first.

### 1. Layout consistency across sessions

**The single biggest under-appreciated lever.** Returning users build implicit spatial associations over weeks — these operate below awareness, survive working-memory load, and subsidise content encoding rather than competing with it. Disrupting a learned layout produces performance _below_ baseline during re-learning.

**Do:**

- Hold UI element positions stable across versions. The "next" button, progress indicator, card layout, drill mechanic all live where they lived on day 1.
- Paged card presentation over infinite scroll. Position is a retrieval cue; scrolling destroys it.

**Don't:**

- Run A/B tests on element position for established users
- "Refresh" the UI as a feature
- Use adaptive menus or reorder based on frequency
- Switch card layouts between drill types unless the type genuinely differs

**ADHD note:** If anything, this rule matters more — top-down re-orientation is expensive, and a stable layout spares that cost. Scrolling is worse for the same location-memory reason plus attention-drift during scroll.

**TLE note:** Contextual cueing works via extra-hippocampal systems and is likely more valuable here, not less.

### 2. Spatial contiguity — co-locate what belongs together

**Do:** Put every element of a single learning unit inside one bounded card. For a vocabulary item: word, pronunciation, image, example sentence, translation, all visible within the same perceptual region. For a grammar pattern: rule, example, contrast with related form.

**Don't:**

- Put the translation on a different screen from the word
- Require a tap to reveal the example
- Show pronunciation only via a play button with no visible IPA
- Split an explanation from its example

**Modest gutter beats overlap:** A clear 1–2° of visual angle between elements (roughly 8–16px on mobile) outperforms cramming. Related elements should feel contained, not crushed.

**ADHD note:** Containment needs to be harder — a visible border or background-colour delineation that separates card from everything else, not just whitespace.

**TLE note:** Critical for **errorless first exposure** — see the ND-specific section below. No gated reveals on first encounter.

### 3. Chunk to four, not seven

**Do:** Cap new L2 content at 4 items per screen. Use Gestalt cues — proximity, common region (bordered cards), similarity — to make the chunks visually obvious. Proximity is the strongest cue; a bordered card (common region) often overrides everything else.

**Don't:**

- Put a 10-item conjugation table in front of a beginner
- Use 7±2 as a design rule — it was wrong in 1956 and it's still wrong
- Rely on colour or typography alone to signal chunking without reinforcing with spatial grouping

**Review content can go higher.** Familiar items chunk semantically and stop counting against the ceiling.

**ADHD ceiling: 3 items for new content.** Visuospatial working memory deficits in ADHD are meta-analytically robust. 4 is already a ceiling for typical learners; for ADHD, assume one fewer.

### 4. One salient focal point per screen

**Do:** Pick one element per screen to be visually loudest — the target word, the active drill field, the new form being introduced. Everything else sits at lower visual weight.

**Don't:**

- Emphasise correct-answer feedback, streak indicators, and the target word simultaneously
- Use more than one accent colour for "attention" on a single screen
- Design UI chrome (buttons, navigation) with the same salience as content

**Why this is zero-sum:** Boosting one item's salience measurably reduces memory for everything else on the screen. This is a cost, not a neutral decision.

**ADHD note: one focal point isn't enough of a constraint.** The background must be actively quieter than for a typical-learner design. That means:

- No decorative illustrations in content areas
- No animated backgrounds or ambient motion of any kind
- No secondary information (progress, stats, navigation) at comparable visual weight to the target
- Hard visual boundaries (full-width rules, card borders with real contrast) between content and everything else. A subtle divider is not enough; use explicit containment.

The common mistake is to read "ADHD-friendly" as "calm and minimal with pale everything." That's wrong — the target content needs to be loud enough to survive top-down suppression failures. The rule is **loud target, quiet everything else.**

### 5. Colour as structure, never decoration

**Core rule:** Colour earns its place when it encodes something the learner needs to internalise. It fails when it's affective, decorative, or layered on top of another signal that already conveys the same information.

The rest of this section is long because colour is where most apps go wrong. Treat the subsections as a checklist — each one catches a specific failure mode.

#### 5a. Axis planning (upstream of any colour decisions)

Before assigning a single colour, map the grammatical axes you'll teach and the pages they appear on.

- **Axes that appear on 3+ pages are global.** They need reserved palette tokens with fixed meaning across the whole app.
- **Axes that appear on 1–2 pages are local.** They can use page-specific colours chosen to not collide with the globals.

For Greek, the globals are almost certainly **case** and **gender** — they recur wherever nouns, articles, adjectives, or pronouns do. When tense is built out on Verbs, it'll probably become the third global. Aspect may follow. Page-specific axes (contraction behaviour on Prepositions, conjugation pattern family on Verbs, sentence construction type on Patterns) are local.

This analysis is done **once**, at the start of the design system. It's not re-done per page.

#### 5b. Reserved tokens for global axes

Every global axis value gets a named token in the design system. The tokens are keyed to the grammatical role, not the colour. This enforces discipline — a design file literally cannot apply the nominative token to a masculine field because the token doesn't allow it.

For Greek, the reserved tokens are:

- `--case-nominative-*` (full tonal scale)
- `--case-accusative-*`
- `--case-genitive-*`
- `--gender-masculine-*`
- `--gender-feminine-*`
- `--gender-neuter-*`

Any page that teaches case uses the case tokens. Any page that teaches gender uses the gender tokens. Same colour, same meaning, every time.

**Intensity variants are your friend.** The full tonal scale lets you express the same grammatical role at subtle intensity (background tints, table cell washes), default intensity (labels, chips, concept cards), and strong intensity (focus states, errors, ADHD-mode signalling). The role stays constant; the intensity varies by context.

#### 5c. Where grammar colours can and cannot appear

The hard rule: **a grammar colour used as fill, background, or border around Greek grammatical content is asserting that content's grammatical value.** If that assertion is true, fine. If false, the colour is lying to the user and actively breaks the system.

**Forbidden:**

- Feminine-rose card background behind a Greek example that isn't feminine
- Nominative-blue tint on a concept card containing a non-nominative example
- Genitive-green border around a grammar explanation card that's about something else
- Any grammar colour used "because it looks nice with the content" rather than because it matches the content's grammatical value

**Fine:**

- Any grammar colour on navigation, buttons, branding, illustrations, empty states, error toasts, loading spinners, marketing pages — anything not wrapped around Greek grammatical content
- A brand CTA in accusative-terracotta, as long as it's not inside a grammar card
- A grammar colour as a link colour, accent on decorative dividers, or icon fill far from grammatical examples

**The context test for ambiguous cases:** would a user plausibly interpret this colour as encoding the grammatical value of nearby content? If yes, don't. If no, fine.

**Consequence:** The brand palette is not diminished by reserving these tokens. Their _grammatical application_ is disciplined. Anywhere outside grammatical-content contexts, they're just colours.

One specific collision to watch: if a grammar card contains a CTA, and the CTA uses a grammar colour, the CTA reads as part of the grammatical system. Either make the CTA a different colour, or make it neutral when it's inside a coloured grammar card.

#### 5d. Per-axis palette cap

~4 discriminable values per axis. Case has three (nom/acc/gen), optionally four if vocative is taught. Gender has three. More than that within a single axis and the values stop being easily distinguishable.

The cap is **per-axis, not per-app**. The app as a whole can have many more colours, distributed across axes that never co-occur on the same screen. Six case-and-gender tokens plus however many local-axis colours you need is a legitimate system.

#### 5e. Intersection pages: deploying two global axes at once

When a page's job is to teach the intersection of two global axes (the classic case: articles by case × gender), both axes get deployed on that page. This is the payoff for having global tokens — don't waste it by going neutral to avoid the "complexity."

Mechanisms for combining two axes on one element or table:

- **Row × column separation** (safest): one axis on rows, one on columns. Coloured row headers, coloured column headers, cells themselves neutral. The user's eye learns to read "this cell is the intersection of row-colour and column-colour."
- **Background + text**: one axis as cell background tint (subtle intensity), other as text colour (default intensity). Works if the two palettes have enough contrast against each other.
- **Avoid**: layering two saturated colours on the same element. Muddies both, breaks the signal.

Pick one mechanism and use it consistently for every intersection view in the app.

#### 5f. Colour follows the concept, not the label

When a section has different display names for the same grammatical fact (e.g. "Accusative" vs "Target Triggers" as a tab toggle), the colour stays the same. The colour is bound to the grammatical role, not to the wording. Switching the label switches wording, not colour.

This seems obvious but is easy to violate when building toggles, tabs, or alternative views of the same content.

#### 5g. When NOT to colour

Not every page should deploy colour, even if global tokens exist.

- **The page teaches a relationship, not an axis.** Agreement (Adjectives) is a relation between article, adjective, noun — not a grammatical value. Default to neutral paradigms with colour only on the relationship-demonstration block (e.g. the "Doer / Target" example trio where seeing the three words share a case is the point).
- **The page is a catalogue of unrelated material.** If the content is "here are some useful patterns" without a unifying structural axis, colour can't mean anything. Go fully neutral.
- **Two axes co-occur on the same element and you can't separate them cleanly.** Better to neutralise and rely on spatial structure (column/row labels) than to fake a mechanism that muddies both axes.

The test: **can you state what the colour means on this page in one sentence?** If yes, colour it. If no, don't.

#### 5h. Von Restorff isolation is a legitimate variant

Instead of colouring all N values of an axis, colour only the outlier(s). Works well when one value is the teaching difficulty (the feminine noun variants that decline differently, or a single irregular verb shown against a pattern-based system).

Still counts as "colour the axis the page is teaching" — just with a narrower palette application. The axis is gender; gender's palette exists; this page happens to only deploy the feminine token because that's the point of the page.

Don't mix: within a page, either colour all values of the axis or only the isolated outlier. Not "two of three, because the third one is hard to pick a colour for."

#### 5i. Per-page key required

Wherever an axis is being deployed, establish its key visibly near the top of the page. The user shouldn't have to infer the colour-to-role mapping from context in the middle of the content.

Good examples from the current app: Cases establishes the key via the three concept cards at the top (Doer/Target/Owner, each with its case colour and label). Verbs establishes the pattern-family key via the "Which Pattern?" selector before any paradigm tables. Pronouns establishes case colours via coloured section headers before the tables.

Less good: putting the key at the bottom of the page (Prepositions currently does this for contraction-behaviour). By the time the user sees the legend, they've already been confused by the colour usage above.

**Per-page key, near the top, always.**

#### 5j. The fade protocol (critical, often skipped)

Colour coding is a scaffold. Without a fade path, learners become dependent on it — they perform worse when the colour is absent, which is every real-world encounter with the language. Build the fade into the schedule:

- **Stage 1 (introduction):** Full colour coding on all instances.
- **Stage 2 (consolidation):** Colour coding on new instances only; review items shown in neutral.
- **Stage 3 (production):** Colour appears only on errors, as a corrective signal.
- **Stage 4 (mastery):** Colour absent by default; available on user demand.

Not fading is not neutral — it actively weakens the learner.

**Fade is per-axis, not per-app.** A user can be Stage 4 on case (cases fully internalised, colour fades across Cases and Pronouns) while still Stage 1 on verb conjugation patterns. Each axis has its own maturity.

Reference surfaces (lookup tables, paradigm references) can legitimately keep full colour indefinitely — they're not where the learning happens, they're where the user checks their work. Practice surfaces are where the fade matters.

#### 5k. ADHD adaptation within the colour system

**Commit harder, decorate less.** Do not invent additional palettes for ADHD mode. Instead, use the existing reserved tokens at heavier intensity variants on task-relevant features (the target word, the active morpheme, the answer field), while stripping decorative colour — and especially decorative non-reserved colour — from the surrounding UI.

For any screen likely to be used by an ADHD user, signalling intensity goes up, not down. Calm minimalism is wrong. Loud target, quiet surround.

### 6. Typography is legibility, not desirable difficulty

**Do:**

- Choose fonts for legibility at target reading sizes
- Use systematic weight or italic for signalling (stressed syllables in bold, loanwords in italic, target morpheme in heavier weight)
- Keep the typographic palette small and consistent

**Don't:**

- Use Sans Forgetica or any "desirable difficulty" font — the effect doesn't replicate, across multiple independent labs and thousands of participants
- Use harder-to-read fonts thinking you're aiding retention — you're aiding frustration
- Assume larger font size improves memory beyond the legibility threshold — it doesn't, it just feels like it should
- Use typography as decoration competing with the content

### 7. Motion has one good use

**The only motion that reliably aids memory is procedural or kinematic.** That means:

- Mouth and tongue position for pronunciation
- Stroke order for non-Latin scripts
- Morphological transformations shown as continuous change (infinitive → conjugated form animating across the field)

**Everywhere else, motion pays cognitive rent without producing memory gains.** Transitions, micro-interactions, UI polish motion, decorative animation — all of these are attention-capture without encoding benefit.

**When you do use procedural animation:**

- Allow learner pacing (pause, replay, scrub)
- Segment long sequences into discrete chunks
- Don't stack procedural animation with voiceover narration and on-screen text all at once

**ADHD note: zero decorative motion.** Treat non-procedural motion as actively harmful, not just neutral. No ambient background motion, no interface transitions beyond the bare minimum needed for affordance signalling.

### 8. Multimodal rules — and where redundancy reverses

**The general rule:** Don't duplicate the same information in multiple modalities simultaneously. Voiceover + identical on-screen text in the user's L1 is redundant and measurably hurts low-prior-knowledge learners.

**The critical exception for L2 content:** Target-language audio + target-language captions is _not_ redundant — it is one of the largest reliable multimedia effects in language learning. Always pair L2 audio with L2 text. The naive "strip the captions" rule is wrong here.

**The other exception:** Concrete imagery paired with an L2 word. This is dual coding and it works, as long as the image is distinctive and carries non-redundant semantic load. A generic icon next to a word is decoration; a meaningful referent is encoding infrastructure.

**TLE note:** Dual-coding with concrete imagery is standard practice, but for TLE users the payoff is larger. Abstract and function words are the hardest cases — always pair them with a concrete image or a contextual anchor.

## ND-specific memory supports (additions, not modifications)

A few design patterns don't modify a universal rule — they exist specifically for ADHD or TLE memory profiles, and would be neutral or slightly negative for typical learners.

### Novelty timing (ADHD)

**Novel contextual elements introduced between encoding blocks** — during the gap before consolidation, not during encoding itself — boost 24-hour recall for ADHD users. The same intervention slightly hurts typical learners. If you want to leverage this:

- Introduce variation **between** drill blocks, not within them:
  - New background imagery for the review screen
  - A different card styling when a consolidation cycle starts
  - A fresh visual context when moving from drill to reflection
- NOT: novel elements inside a single drill, or motion interrupting encoding

The mental model: novelty **during** encoding splits attention. Novelty **between** encoding and consolidation tags the material in a way that a hypodopaminergic brain retains better.

### Short initial spaced-repetition intervals (TLE)

The signature memory phenomenon in TLE is **accelerated long-term forgetting** — standard 30-minute delayed recall can look normal while retention collapses over hours to weeks. Default spaced-repetition intervals (next-day first review) are too long.

- First review at 1–4 hours, not 24 hours
- Adaptive tightening: items that fail short-interval review get much shorter intervals before the next attempt
- Second review still within the same day for items that were rocky the first time
- Intervals widen on the same curve shape as standard SRS, but starting from a shorter base

This will mean many more reviews for the same material. Budget for it.

### Errorless first exposure (TLE)

A typical flashcard flow (show prompt → wait for attempted recall → reveal answer) is the worst case for TLE users: it generates errors on weakly-encoded traces that then compete with the correct form at retrieval.

Structure exposure in stages:

1. **First exposure:** word + translation + image + example + pronunciation all visible at once, with zero retrieval demand
2. **Second exposure:** cued recall (prompt with image, fill in word)
3. **Third exposure:** recognition (choose correct among plausible alternatives)
4. **Free recall** only after multiple successful cued/recognition rounds

### Recognition before free recall (TLE)

Accept recognition success as meaningful progress. Free-recall metrics under-represent what TLE users actually know — they lean on familiarity (preserved) more than recollection (compromised).

- Offer recognition and cued-recall drill modes alongside free recall
- Track progress across all modes, not just the hardest one
- Don't hide recognition success behind free-recall milestones

### Semantic grouping, never arbitrary order (TLE)

Group new vocabulary by theme, cognate family, or semantic network. Random batches of unrelated words are the exact pattern the hippocampus normally binds — and can't be counted on here.

- Introduce vocabulary in coherent sets (kitchen items, travel verbs, emotion words)
- Avoid alphabetical or pure-frequency ordering without semantic clustering
- If introducing a function word, anchor it to a concrete contextual example

### Progress UI honesty (TLE)

Standard SRS apps often display streak or "remembered" counts in ways that imply consolidation is happening faster than it actually is. A 7-day streak might be a 7-day streak of "re-encountered at an interval too short to measure actual long-term retention." Don't inflate the progress display — build the schedule around realistic forgetting, and the UI around realistic retention. Otherwise the user learns to trust a metric that's quietly misleading them about what they'll remember next month.

### Avoid method-of-loci with new spaces (TLE)

Spatial map-building depends on the most-compromised system. If any spatial-mnemonic metaphor is offered, lean on **overlearned familiar environments** (the user's home, commute) that are stored semantically and don't require new map construction. Prefer keyword-imagery mnemonics over spatial ones.

## What to build (prioritised)

If designing a new learning screen, work down this list:

1. **Axis planning done once up front.** Identify global vs local axes. Reserve tokens for globals.
2. **One canonical card template** with fixed internal positions for word, IPA, image, example, translation. Every vocabulary encounter uses it. Containment via visible border for ADHD users.
3. **Frozen element positions** across sessions for all returning users.
4. **Paged card presentation** over infinite scroll.
5. **Four-item ceiling** for new content (three for ADHD); relax for review.
6. **Global axes deployed via reserved tokens.** Case and gender get locked tokens; every page teaching those axes uses those tokens identically. Intersection pages (case × gender) deploy both axes via row × column or background + text separation.
7. **Per-page colour key near the top** whenever an axis is deployed.
8. **Planned fade protocol per axis.** Reference surfaces may hold full colour indefinitely; practice surfaces fade.
9. **One focal point per screen.** Everything else quieter. For ADHD, much quieter, with higher signalling intensity on the focal element.
10. **L2 captions on L2 audio.** Concrete imagery on new vocabulary (mandatory for TLE).
11. **Procedural animation** for pronunciation, script, morphology — nothing else moves.
12. **Short initial review intervals** (TLE) — first review at hours, not days.
13. **Errorless first exposure and recognition modes** (TLE) — show everything before asking, accept recognition as progress.

## What to skip (anti-patterns with replication problems)

These sound good and have been cited in design blogs for years, but the underlying research either failed to replicate or only held in conditions that don't match a mobile learning app:

- **Sans Forgetica / deliberately disfluent fonts.** Multiple independent lab failures.
- **"Warm colours / red boosts memory via arousal".** Repeatedly failed replication.
- **7±2 working memory.** Use Cowan's 4 for new content. Three for ADHD.
- **Decorative motion "keeps attention".** Attention yes, encoding no.
- **Strip captions under L2 audio.** Wrong for L2 — captions stay.
- **"Larger = more memorable".** Metamemory illusion. Above legibility, size doesn't help.
- **"Handwriting beats typing for notes".** The encoding-difference claim partly holds; the performance claim doesn't replicate.
- **Micro-interactions as mnemonics.** No peer-reviewed evidence.
- **A/B testing layout on returning users.** Disrupts contextual cueing.
- **"Calm minimalist pale everything" for ADHD.** Inverts the actual recommendation — loud target, quiet surround.
- **Using grammar colours as decoration around non-matching grammatical content.** Breaks the entire colour system — the colour becomes a lie.
- **Per-page colour keys at the bottom of the page.** User already confused before seeing them.
- **Going neutral on intersection pages to avoid "complexity".** Wastes the investment in global tokens.
- **Flashcard flows with retrieval on first exposure** for TLE users.
- **Arbitrary-order vocabulary introduction** for TLE users.
- **Method of loci with new constructed spaces** for TLE users.
- **Progress metrics that only count free recall** for TLE users.

## Speculative moves worth experimenting with (not defaults)

Plausible mechanisms but thin direct evidence for a language app. Worth trying with measurement; not worth claiming as best practice:

- **2D conceptual maps** arranging grammar on orthogonal axes (e.g., tense × formality). Biologically motivated by entorhinal grid-code research; not validated in UI.
- **Spatial "map" metaphors for unit structure.** Capture a fraction of the method-of-loci benefit without requiring VR, but only if the learner generates the imagery — passive layouts don't trigger it. For TLE users, only with overlearned familiar spaces.
- **Scheduled novelty between encoding blocks** as an ADHD feature — mechanism is solid, product-scale validation thin.

## Before shipping any visual design decision, ask:

1. Does this element need to be this visually loud, given salience is zero-sum?
2. Is every decoration doing encoding work, or is it just there?
3. **Is this colour making a grammatical claim about the content it's wrapping?** If yes, is the claim accurate? If no, is the colour a grammar token being misused as brand decoration?
4. **If deploying a global axis, am I using the reserved token at the right intensity, not inventing a new colour?**
5. **Is there a per-page colour key visible near the top?**
6. Is the layout going to be identical for this user on day 30 as on day 1?
7. Are there more than 4 new items in the perceptual frame? (Three for ADHD.)
8. If motion is involved: is it procedural? If not, cut it.
9. For TLE: does the first exposure demand retrieval, or does it show everything first?
10. What's the fade path for any scaffold on this screen?
11. If the answer to "why is this here" is "because it looks nicer": it's decoration. Reconsider.

## Fallback posture when evidence is thin

For any design decision where the evidence is thin or you're not sure:

1. **Do the universal rule.** It's evidence-backed for most users.
2. **Offer a toggle** for features that diverge significantly (e.g., "short review intervals", "errorless mode", "high-contrast signalling").
3. **Track outcomes per-mode.** If you're offering an adaptive feature, let the user see whether it's actually helping them — don't ship it as a vibe.
4. **Don't claim clinical validation.** These adaptations are motivated by the literature but most haven't been tested at product scale. Frame them as "designed for" not "proven to help."
