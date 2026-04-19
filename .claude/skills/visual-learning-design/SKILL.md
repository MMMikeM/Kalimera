---
name: visual-memory-design
description: Design visual properties — colour, spatial layout, typography, contrast, grouping, motion — so they support memory encoding and retrieval in a language learning app. Use whenever deciding how content should look on screen, how to lay out cards or drills, whether to use colour or weight to mark grammatical features, whether an animation or transition earns its place, how many items belong on a screen, whether a scaffold should be added or faded, or how to present content so it actually sticks rather than just looks engaging. Also use when reviewing an existing screen for memory-relevant issues, or when rejecting a commonly-cited design "best practice" that has failed to replicate (Sans Forgetica, disfluent fonts, warm-colours-aid-memory, 7±2 working memory, redundancy-strip-the-captions). Do NOT use for motivation design, gamification, general UI/UX polish, brand or visual identity work, or accessibility concerns unrelated to memory.
---

# Visual memory design

Skill: design visual properties so language content encode + retrieve, not just engage.

Assume primary user may have ADHD, temporal lobe epilepsy, or both. Where universal rule bend for these profiles, bend called out inline under relevant principle. Few memory supports ND-specific, not modifications — live in own section near end.

## The core frame

Most visual design for learning apps optimise for attention + engagement. Attention necessary but not sufficient — attention without encoding = entertainment. Skill about what **visual layer** do to move material from working memory to long-term memory, and how avoid visual moves that cost encoding capacity without paying back.

Three principles shape every decision:

1. **Working memory tighter than folk psychology assume.** Realistic ceiling for new L2 content = 4 items per screen, not 7±2. For ADHD users, tighter — treat 3 as ceiling.
2. **Salience zero-sum.** Every emphasised element compete with every other emphasised element for encoding resources. One focal point per screen = operational rule.
3. **Scaffolds help novices, hurt experts.** Every visual aid — colour coding, signalling, worked examples, integrated captions — become noise as proficiency grow. Design fade path same time as scaffold. Non-negotiable for grammatical colour coding.

## The levers that work

Ranked by evidence strength + reliability of transfer to mobile, self-paced learning context. Invest design effort here first.

### 1. Layout consistency across sessions

**Biggest under-appreciated lever.** Returning users build implicit spatial associations over weeks — operate below awareness, survive working-memory load, subsidise content encoding rather than compete. Disrupting learned layout produce performance _below_ baseline during re-learning.

**Do:**

- Hold UI element positions stable across versions. "Next" button, progress indicator, card layout, drill mechanic live where lived day 1.
- Paged card presentation over infinite scroll. Position = retrieval cue; scroll destroy it.

**Don't:**

- Run A/B tests on element position for established users
- "Refresh" UI as feature
- Use adaptive menus or reorder by frequency
- Switch card layouts between drill types unless type genuinely differ

**ADHD note:** Rule matter more — top-down re-orientation expensive, stable layout spare that cost. Scrolling worse for same location-memory reason plus attention-drift during scroll.

**TLE note:** Contextual cueing work via extra-hippocampal systems, likely more valuable here, not less.

### 2. Spatial contiguity — co-locate what belongs together

**Do:** Put every element of single learning unit inside one bounded card. Vocabulary item: word, pronunciation, image, example sentence, translation, all visible in same perceptual region. Grammar pattern: rule, example, contrast with related form.

**Don't:**

- Put translation on different screen from word
- Require tap to reveal example
- Show pronunciation only via play button with no visible IPA
- Split explanation from example

**Modest gutter beats overlap:** Clear 1–2° visual angle between elements (~8–16px mobile) outperform cramming. Related elements feel contained, not crushed.

**ADHD note:** Containment need harder — visible border or background-colour delineation separate card from everything else, not just whitespace.

**TLE note:** Critical for **errorless first exposure** — see ND-specific section below. No gated reveals on first encounter.

### 3. Chunk to four, not seven

**Do:** Cap new L2 content at 4 items per screen. Use Gestalt cues — proximity, common region (bordered cards), similarity — make chunks visually obvious. Proximity strongest cue; bordered card (common region) often override everything else.

**Don't:**

- Put 10-item conjugation table in front of beginner
- Use 7±2 as design rule — wrong in 1956, still wrong
- Rely on colour or typography alone for chunking without reinforcing with spatial grouping

**Review content can go higher.** Familiar items chunk semantically, stop counting against ceiling.

**ADHD ceiling: 3 items for new content.** Visuospatial working memory deficits in ADHD meta-analytically robust. 4 already ceiling for typical learners; ADHD = one fewer.

### 4. One salient focal point per screen

**Do:** Pick one element per screen to be visually loudest — target word, active drill field, new form introduced. Everything else at lower visual weight.

**Don't:**

- Emphasise correct-answer feedback, streak indicators, target word simultaneously
- Use more than one accent colour for "attention" on single screen
- Design UI chrome (buttons, navigation) with same salience as content

**Why zero-sum:** Boosting one item's salience measurably reduce memory for everything else on screen. Cost, not neutral decision.

**ADHD note: one focal point not enough constraint.** Background must be actively quieter than typical-learner design. Means:

- No decorative illustrations in content areas
- No animated backgrounds or ambient motion of any kind
- No secondary information (progress, stats, navigation) at comparable visual weight to target
- Hard visual boundaries (full-width rules, card borders with real contrast) between content + everything else. Subtle divider not enough; use explicit containment.

Common mistake: read "ADHD-friendly" as "calm and minimal with pale everything." Wrong — target content need loud enough to survive top-down suppression failures. Rule: **loud target, quiet everything else.**

### 5. Colour as structure, never decoration

**Core rule:** Colour earn place when encode something learner need to internalise. Fail when affective, decorative, or layered on top of another signal already conveying same info.

Rest of section long because colour = where most apps go wrong. Treat subsections as checklist — each catch specific failure mode.

#### 5a. Axis planning (upstream of any colour decisions)

Before assigning single colour, map grammatical axes you'll teach + pages they appear on.

- **Axes appearing on 3+ pages = global.** Need reserved palette tokens with fixed meaning across whole app.
- **Axes on 1–2 pages = local.** Can use page-specific colours chosen to not collide with globals.

For Greek, globals almost certainly **case** + **gender** — recur wherever nouns, articles, adjectives, pronouns do. When tense built out on Verbs, probably becomes third global. Aspect may follow. Page-specific axes (contraction behaviour on Prepositions, conjugation pattern family on Verbs, sentence construction type on Patterns) = local.

Analysis done **once**, at start of design system. Not re-done per page.

#### 5b. Reserved tokens for global axes

Every global axis value get named token in design system. Tokens keyed to grammatical role, not colour. Enforce discipline — design file literally cannot apply nominative token to masculine field because token doesn't allow it.

For Greek, reserved tokens:

- `--case-nominative-*` (full tonal scale)
- `--case-accusative-*`
- `--case-genitive-*`
- `--gender-masculine-*`
- `--gender-feminine-*`
- `--gender-neuter-*`

Any page teaching case use case tokens. Any page teaching gender use gender tokens. Same colour, same meaning, every time.

**Intensity variants your friend.** Full tonal scale let you express same grammatical role at subtle intensity (background tints, table cell washes), default intensity (labels, chips, concept cards), strong intensity (focus states, errors, ADHD-mode signalling). Role stay constant; intensity vary by context.

#### 5c. Where grammar colours can and cannot appear

Hard rule: **grammar colour used as fill, background, or border around Greek grammatical content assert that content's grammatical value.** If assertion true, fine. If false, colour lying to user and actively break system.

**Forbidden:**

- Feminine-rose card background behind Greek example not feminine
- Nominative-blue tint on concept card containing non-nominative example
- Genitive-green border around grammar explanation card about something else
- Any grammar colour used "because looks nice with content" rather than matching content's grammatical value

**Fine:**

- Any grammar colour on navigation, buttons, branding, illustrations, empty states, error toasts, loading spinners, marketing pages — anything not wrapped around Greek grammatical content
- Brand CTA in accusative-terracotta, as long as not inside grammar card
- Grammar colour as link colour, accent on decorative dividers, or icon fill far from grammatical examples

**Context test for ambiguous cases:** would user plausibly interpret colour as encoding grammatical value of nearby content? If yes, don't. If no, fine.

**Consequence:** Brand palette not diminished by reserving tokens. _Grammatical application_ disciplined. Outside grammatical-content contexts, just colours.

One specific collision: if grammar card contain CTA, and CTA use grammar colour, CTA read as part of grammatical system. Either make CTA different colour, or make neutral when inside coloured grammar card.

#### 5d. Per-axis palette cap

~4 discriminable values per axis. Case has three (nom/acc/gen), optionally four if vocative taught. Gender has three. More than that within single axis = values stop being easily distinguishable.

Cap **per-axis, not per-app**. App as whole can have many more colours, distributed across axes that never co-occur on same screen. Six case-and-gender tokens plus however many local-axis colours = legitimate system.

#### 5e. Intersection pages: deploying two global axes at once

When page's job = teach intersection of two global axes (classic case: articles by case × gender), both axes deployed on that page. Payoff for having global tokens — don't waste by going neutral to avoid "complexity."

Mechanisms for combining two axes on one element or table:

- **Row × column separation** (safest): one axis on rows, one on columns. Coloured row headers, coloured column headers, cells themselves neutral. User's eye learn to read "this cell = intersection of row-colour + column-colour."
- **Background + text**: one axis as cell background tint (subtle intensity), other as text colour (default intensity). Work if two palettes have enough contrast against each other.
- **Avoid**: layering two saturated colours on same element. Muddy both, break signal.

Pick one mechanism, use consistently for every intersection view in app.

#### 5f. Colour follows the concept, not the label

When section has different display names for same grammatical fact (e.g. "Accusative" vs "Target Triggers" as tab toggle), colour stay same. Colour bound to grammatical role, not wording. Switching label switch wording, not colour.

Seem obvious but easy to violate when building toggles, tabs, alternative views of same content.

#### 5g. When NOT to colour

Not every page should deploy colour, even if global tokens exist.

- **Page teaches relationship, not axis.** Agreement (Adjectives) = relation between article, adjective, noun — not grammatical value. Default to neutral paradigms with colour only on relationship-demonstration block (e.g. "Doer / Target" example trio where seeing three words share case = point).
- **Page = catalogue of unrelated material.** If content = "here are some useful patterns" without unifying structural axis, colour can't mean anything. Go fully neutral.
- **Two axes co-occur on same element and can't separate cleanly.** Better to neutralise and rely on spatial structure (column/row labels) than fake mechanism that muddy both axes.

Test: **can you state what colour means on this page in one sentence?** If yes, colour it. If no, don't.

#### 5h. Von Restorff isolation = legitimate variant

Instead of colouring all N values of axis, colour only outlier(s). Work well when one value = teaching difficulty (feminine noun variants that decline differently, or single irregular verb shown against pattern-based system).

Still count as "colour axis page teach" — just with narrower palette application. Axis = gender; gender's palette exist; this page happen to only deploy feminine token because = point of page.

Don't mix: within page, either colour all values of axis or only isolated outlier. Not "two of three, because third hard to pick colour for."

#### 5i. Per-page key required

Wherever axis deployed, establish key visibly near top of page. User shouldn't have to infer colour-to-role mapping from context in middle of content.

Good examples from current app: Cases establish key via three concept cards at top (Doer/Target/Owner, each with case colour + label). Verbs establish pattern-family key via "Which Pattern?" selector before any paradigm tables. Pronouns establish case colours via coloured section headers before tables.

Less good: putting key at bottom of page (Prepositions currently do this for contraction-behaviour). By time user see legend, already confused by colour usage above.

**Per-page key, near top, always.**

#### 5j. The fade protocol (critical, often skipped)

Colour coding = scaffold. Without fade path, learners become dependent — perform worse when colour absent, = every real-world encounter with language. Build fade into schedule:

- **Stage 1 (introduction):** Full colour coding on all instances.
- **Stage 2 (consolidation):** Colour coding on new instances only; review items shown in neutral.
- **Stage 3 (production):** Colour appears only on errors, as corrective signal.
- **Stage 4 (mastery):** Colour absent by default; available on user demand.

Not fading = not neutral — actively weaken learner.

**Fade per-axis, not per-app.** User can be Stage 4 on case (cases fully internalised, colour fades across Cases + Pronouns) while still Stage 1 on verb conjugation patterns. Each axis has own maturity.

Reference surfaces (lookup tables, paradigm references) can legitimately keep full colour indefinitely — not where learning happen, where user check work. Practice surfaces = where fade matter.

#### 5k. ADHD adaptation within the colour system

**Commit harder, decorate less.** Do not invent additional palettes for ADHD mode. Use existing reserved tokens at heavier intensity variants on task-relevant features (target word, active morpheme, answer field), while stripping decorative colour — especially decorative non-reserved colour — from surrounding UI.

For any screen likely used by ADHD user, signalling intensity go up, not down. Calm minimalism wrong. Loud target, quiet surround.

### 6. Typography is legibility, not desirable difficulty

**Do:**

- Choose fonts for legibility at target reading sizes
- Use systematic weight or italic for signalling (stressed syllables in bold, loanwords in italic, target morpheme in heavier weight)
- Keep typographic palette small + consistent

**Don't:**

- Use Sans Forgetica or any "desirable difficulty" font — effect doesn't replicate, across multiple independent labs + thousands of participants
- Use harder-to-read fonts thinking aiding retention — aiding frustration
- Assume larger font size improve memory beyond legibility threshold — doesn't, just feel like should
- Use typography as decoration competing with content

### 7. Motion has one good use

**Only motion that reliably aid memory = procedural or kinematic.** Means:

- Mouth + tongue position for pronunciation
- Stroke order for non-Latin scripts
- Morphological transformations shown as continuous change (infinitive → conjugated form animating across field)

**Everywhere else, motion pay cognitive rent without producing memory gains.** Transitions, micro-interactions, UI polish motion, decorative animation — all attention-capture without encoding benefit.

**When you do use procedural animation:**

- Allow learner pacing (pause, replay, scrub)
- Segment long sequences into discrete chunks
- Don't stack procedural animation with voiceover narration + on-screen text all at once

**ADHD note: zero decorative motion.** Treat non-procedural motion as actively harmful, not neutral. No ambient background motion, no interface transitions beyond bare minimum needed for affordance signalling.

### 8. Multimodal rules — and where redundancy reverses

**General rule:** Don't duplicate same information in multiple modalities simultaneously. Voiceover + identical on-screen text in user's L1 = redundant, measurably hurt low-prior-knowledge learners.

**Critical exception for L2 content:** Target-language audio + target-language captions _not_ redundant — one of largest reliable multimedia effects in language learning. Always pair L2 audio with L2 text. Naive "strip captions" rule wrong here.

**Other exception:** Concrete imagery paired with L2 word. Dual coding, works, as long as image distinctive + carry non-redundant semantic load. Generic icon next to word = decoration; meaningful referent = encoding infrastructure.

**TLE note:** Dual-coding with concrete imagery standard practice, but for TLE users payoff larger. Abstract + function words = hardest cases — always pair with concrete image or contextual anchor.

## ND-specific memory supports (additions, not modifications)

Few design patterns don't modify universal rule — exist specifically for ADHD or TLE memory profiles, would be neutral or slightly negative for typical learners.

### Novelty timing (ADHD)

**Novel contextual elements introduced between encoding blocks** — during gap before consolidation, not during encoding — boost 24-hour recall for ADHD users. Same intervention slightly hurt typical learners. If want leverage:

- Introduce variation **between** drill blocks, not within:
  - New background imagery for review screen
  - Different card styling when consolidation cycle start
  - Fresh visual context when moving from drill to reflection
- NOT: novel elements inside single drill, or motion interrupting encoding

Mental model: novelty **during** encoding split attention. Novelty **between** encoding + consolidation tag material in way that hypodopaminergic brain retain better.

### Short initial spaced-repetition intervals (TLE)

Signature memory phenomenon in TLE = **accelerated long-term forgetting** — standard 30-minute delayed recall can look normal while retention collapse over hours to weeks. Default spaced-repetition intervals (next-day first review) too long.

- First review at 1–4 hours, not 24 hours
- Adaptive tightening: items that fail short-interval review get much shorter intervals before next attempt
- Second review still within same day for items rocky first time
- Intervals widen on same curve shape as standard SRS, but starting from shorter base

Mean many more reviews for same material. Budget for it.

### Errorless first exposure (TLE)

Typical flashcard flow (show prompt → wait for attempted recall → reveal answer) = worst case for TLE users: generate errors on weakly-encoded traces that then compete with correct form at retrieval.

Structure exposure in stages:

1. **First exposure:** word + translation + image + example + pronunciation all visible at once, zero retrieval demand
2. **Second exposure:** cued recall (prompt with image, fill in word)
3. **Third exposure:** recognition (choose correct among plausible alternatives)
4. **Free recall** only after multiple successful cued/recognition rounds

### Recognition before free recall (TLE)

Accept recognition success as meaningful progress. Free-recall metrics under-represent what TLE users actually know — lean on familiarity (preserved) more than recollection (compromised).

- Offer recognition + cued-recall drill modes alongside free recall
- Track progress across all modes, not just hardest
- Don't hide recognition success behind free-recall milestones

### Semantic grouping, never arbitrary order (TLE)

Group new vocabulary by theme, cognate family, semantic network. Random batches of unrelated words = exact pattern hippocampus normally bind — can't be counted on here.

- Introduce vocabulary in coherent sets (kitchen items, travel verbs, emotion words)
- Avoid alphabetical or pure-frequency ordering without semantic clustering
- If introducing function word, anchor to concrete contextual example

### Progress UI honesty (TLE)

Standard SRS apps often display streak or "remembered" counts in ways implying consolidation happening faster than actually is. 7-day streak might be 7-day streak of "re-encountered at interval too short to measure actual long-term retention." Don't inflate progress display — build schedule around realistic forgetting, UI around realistic retention. Otherwise user learn to trust metric quietly misleading them about what they'll remember next month.

### Avoid method-of-loci with new spaces (TLE)

Spatial map-building depend on most-compromised system. If any spatial-mnemonic metaphor offered, lean on **overlearned familiar environments** (user's home, commute) stored semantically, don't require new map construction. Prefer keyword-imagery mnemonics over spatial.

## What to build (prioritised)

If designing new learning screen, work down list:

1. **Axis planning done once up front.** Identify global vs local axes. Reserve tokens for globals.
2. **One canonical card template** with fixed internal positions for word, IPA, image, example, translation. Every vocabulary encounter use it. Containment via visible border for ADHD users.
3. **Frozen element positions** across sessions for all returning users.
4. **Paged card presentation** over infinite scroll.
5. **Four-item ceiling** for new content (three for ADHD); relax for review.
6. **Global axes deployed via reserved tokens.** Case + gender get locked tokens; every page teaching those axes use those tokens identically. Intersection pages (case × gender) deploy both axes via row × column or background + text separation.
7. **Per-page colour key near top** whenever axis deployed.
8. **Planned fade protocol per axis.** Reference surfaces may hold full colour indefinitely; practice surfaces fade.
9. **One focal point per screen.** Everything else quieter. For ADHD, much quieter, with higher signalling intensity on focal element.
10. **L2 captions on L2 audio.** Concrete imagery on new vocabulary (mandatory for TLE).
11. **Procedural animation** for pronunciation, script, morphology — nothing else move.
12. **Short initial review intervals** (TLE) — first review at hours, not days.
13. **Errorless first exposure + recognition modes** (TLE) — show everything before asking, accept recognition as progress.

## What to skip (anti-patterns with replication problems)

Sound good, cited in design blogs for years, but underlying research either failed to replicate or only held in conditions not matching mobile learning app:

- **Sans Forgetica / deliberately disfluent fonts.** Multiple independent lab failures.
- **"Warm colours / red boost memory via arousal".** Repeatedly failed replication.
- **7±2 working memory.** Use Cowan's 4 for new content. Three for ADHD.
- **Decorative motion "keeps attention".** Attention yes, encoding no.
- **Strip captions under L2 audio.** Wrong for L2 — captions stay.
- **"Larger = more memorable".** Metamemory illusion. Above legibility, size doesn't help.
- **"Handwriting beats typing for notes".** Encoding-difference claim partly hold; performance claim doesn't replicate.
- **Micro-interactions as mnemonics.** No peer-reviewed evidence.
- **A/B testing layout on returning users.** Disrupt contextual cueing.
- **"Calm minimalist pale everything" for ADHD.** Invert actual recommendation — loud target, quiet surround.
- **Using grammar colours as decoration around non-matching grammatical content.** Break entire colour system — colour becomes lie.
- **Per-page colour keys at bottom of page.** User already confused before seeing them.
- **Going neutral on intersection pages to avoid "complexity".** Waste investment in global tokens.
- **Flashcard flows with retrieval on first exposure** for TLE users.
- **Arbitrary-order vocabulary introduction** for TLE users.
- **Method of loci with new constructed spaces** for TLE users.
- **Progress metrics only counting free recall** for TLE users.

## Speculative moves worth experimenting with (not defaults)

Plausible mechanisms but thin direct evidence for language app. Worth trying with measurement; not worth claiming as best practice:

- **2D conceptual maps** arranging grammar on orthogonal axes (e.g., tense × formality). Biologically motivated by entorhinal grid-code research; not validated in UI.
- **Spatial "map" metaphors for unit structure.** Capture fraction of method-of-loci benefit without requiring VR, but only if learner generate imagery — passive layouts don't trigger. For TLE users, only with overlearned familiar spaces.
- **Scheduled novelty between encoding blocks** as ADHD feature — mechanism solid, product-scale validation thin.

## Before shipping any visual design decision, ask:

1. Does this element need to be this visually loud, given salience zero-sum?
2. Is every decoration doing encoding work, or just there?
3. **Is this colour making grammatical claim about content wrapping?** If yes, claim accurate? If no, is colour a grammar token misused as brand decoration?
4. **If deploying global axis, am I using reserved token at right intensity, not inventing new colour?**
5. **Is there per-page colour key visible near top?**
6. Will layout be identical for this user on day 30 as day 1?
7. More than 4 new items in perceptual frame? (Three for ADHD.)
8. If motion involved: is it procedural? If not, cut.
9. For TLE: does first exposure demand retrieval, or show everything first?
10. What's fade path for any scaffold on this screen?
11. If answer to "why is this here" = "because looks nicer": decoration. Reconsider.

## Fallback posture when evidence is thin

For any design decision where evidence thin or unsure:

1. **Do universal rule.** Evidence-backed for most users.
2. **Offer toggle** for features diverging significantly (e.g., "short review intervals", "errorless mode", "high-contrast signalling").
3. **Track outcomes per-mode.** If offering adaptive feature, let user see whether actually helping — don't ship as vibe.
4. **Don't claim clinical validation.** Adaptations motivated by literature but most haven't been tested at product scale. Frame as "designed for" not "proven to help."