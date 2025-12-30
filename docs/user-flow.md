# User Flow Analysis and Information Architecture Proposal

## Executive Summary

The current navigation has 7 items that overflow on mobile. After analyzing content overlap and user goals, this document proposes consolidating to 4 primary nav items by:

1. Merging Conversations, Phrases, and Vocabulary into a single "Learn" section
2. Elevating Practice as the primary destination (aligns with app objectives)
3. Keeping Reference as grammar lookup
4. Converting Search to a universal search bar (not a nav item)

---

## Part 1: Current State Analysis

### Current Navigation Structure (7 items)

| Nav Item | Path | Sub-tabs | Primary Content |
|----------|------|----------|-----------------|
| Home | `/` | - | Landing page, daily phrase, pattern demos |
| Practice | `/practice` | Speed, Pronouns, Articles, Verbs, Vocabulary, Review | Timed production drills (the core loop) |
| Conversations | `/conversations` | Arriving, Food, Smalltalk, Requests | Situational dialogues with Greek/English |
| Reference | `/quick-reference` | Cases-Pronouns, Nouns-Articles, Adjectives, Prepositions, Verbs | Grammar lookup tables (paradigms) |
| Vocabulary | `/vocabulary` | Nouns, Verbs, Reference | Word lists by type |
| Phrases | `/phrases` | Survival, Responses, Requests, Opinions, Connectors, Time, Constructions | Discourse markers, expressions |
| Search | `/search` | - | Fuzzy search across vocabulary |

### Mobile Overflow Problem

At 375px viewport width, 7 nav items cannot fit comfortably:
- Each icon + label needs ~53px minimum
- 7 items = 371px (edge to edge, no padding)
- Result: cramped, labels truncated, poor UX

---

## Part 2: User Journey Mapping

### Primary User Journey: Build Retrieval Speed

From `app-objectives.md`:
> "The app's job is to make you faster at producing correct Greek, not to teach you more Greek."

**The Core Loop:**
```
See English prompt -> Timer starts -> Produce Greek -> See correct answer -> Repeat
```

This is exclusively served by `/practice`. Everything else is secondary.

### Current User Journeys

#### Journey 1: Daily Practice (Primary Goal)

```
Home -> Practice -> Speed Drill -> Complete session -> View stats (future)
```

**Effectiveness:** HIGH - Direct path to core loop

#### Journey 2: Learn New Content

```
Home -> Conversations (or Phrases or Vocabulary) -> Browse content -> Maybe practice?
```

**Effectiveness:** LOW - No clear path from browsing to drilling

#### Journey 3: Reference Lookup

```
Home -> Reference -> Find paradigm table -> Use for external study
```

**Effectiveness:** MEDIUM - Serves purpose but doesn't build speed

#### Journey 4: Quick Search

```
Home -> Search -> Type query -> Find word
```

**Effectiveness:** MEDIUM - Useful utility, but full nav item is overkill

---

## Part 3: Content Overlap Analysis

### High Overlap: Conversations, Phrases, Vocabulary

| Section | Content Type | Example |
|---------|--------------|---------|
| Conversations | Dialogues with phrases | "Arriving: Greetings, asking for directions" |
| Phrases | Isolated expressions | "Survival phrases: basic greetings" |
| Vocabulary | Word lists | "Nouns by situation" |

**Problem:** A user looking for "how to order coffee" might check all three:
- Conversations/Food: Full dialogue about ordering
- Phrases/Requests: "Can I have...?" pattern
- Vocabulary/Nouns: Coffee, sugar, milk

**Solution:** Merge into single "Learn" section with content-type sub-tabs.

### Medium Overlap: Vocabulary (nav) vs Vocabulary (Practice tab)

- `/vocabulary` = Word lists for browsing
- `/practice/vocabulary` = SRS vocabulary drill

**Problem:** Confusing. "Vocabulary" appears in two nav contexts.

**Solution:**
- Keep drill at `/practice/vocabulary`
- Move word browsing to `/learn/words`

### Low Overlap: Practice vs Reference

These serve distinct purposes:
- Practice = Active retrieval under time pressure
- Reference = Passive lookup for external study

**Decision:** Keep separate.

---

## Part 4: Proposed Information Architecture

### New Navigation (4 items)

| Nav Item | Path | Description | Mobile Icon |
|----------|------|-------------|-------------|
| Practice | `/practice` | Timed production drills | Zap |
| Learn | `/learn` | Browse content (conversations, phrases, words) | BookOpen |
| Reference | `/reference` | Grammar lookup tables | FileText |
| Search | (universal) | Search bar in header, not nav | Search |

### Rationale

#### 1. Practice as Primary

Per app objectives, practice should be the most prominent destination. Current home page already funnels to Practice first.

**Sub-tabs (unchanged):**
- Speed Drill (default)
- Pronouns
- Articles
- Verbs
- Vocabulary (SRS drill)
- Review (due items)

#### 2. Learn as Content Hub

Merges three sections that all answer: "What Greek should I learn?"

**Proposed sub-tabs:**
| Tab | Content | Source |
|-----|---------|--------|
| Conversations | Situational dialogues | Current `/conversations` |
| Phrases | Expressions, discourse markers | Current `/phrases` |
| Words | Vocabulary by category | Current `/vocabulary` |

**User benefit:** Single destination for "I want to learn X"

#### 3. Reference for Grammar Lookup

Unchanged from current `/quick-reference`. Grammar tables aren't "learning content" - they're reference material.

**Sub-tabs (unchanged):**
- Cases & Pronouns
- Nouns & Articles
- Adjectives
- Prepositions
- Verbs

#### 4. Search as Universal Utility

Search doesn't warrant a primary nav slot. Convert to:
- Search icon in header (mobile)
- Search bar in header (desktop)
- Opens modal or inline results

**Benefit:** One fewer nav item, always accessible.

---

## Part 5: URL Structure

### Current vs Proposed

| Current | Proposed |
|---------|----------|
| `/practice/*` | `/practice/*` (unchanged) |
| `/conversations/*` | `/learn/conversations/*` |
| `/phrases/*` | `/learn/phrases/*` |
| `/vocabulary/*` | `/learn/words/*` |
| `/quick-reference/*` | `/reference/*` |
| `/search` | Modal/overlay from any page |

### Redirects Needed

```
/conversations/* -> /learn/conversations/*
/phrases/* -> /learn/phrases/*
/vocabulary/* -> /learn/words/*
/quick-reference/* -> /reference/*
```

---

## Part 6: Mobile Navigation Layout

### Current (7 items)

```
[Home][Practice][Convo][Ref][Vocab][Phrase][Search]
  44px   44px    44px  44px  44px   44px   44px = 308px (cramped)
```

### Proposed (4 items + Search in header)

```
           [Search icon in header]

[Practice]  [Learn]  [Reference]  [Home]
    75px      75px       75px       75px = 300px (comfortable)
```

**Or with Home in header as logo:**

```
           [Logo: Home]  [Search icon]

     [Practice]  [Learn]  [Reference]
        100px      100px      100px = 300px (spacious)
```

---

## Part 7: Learning Rationale

### Why This Structure Works

#### 1. Practice-First Hierarchy

The user is "stuck at procedural" - they need drills, not more content. Making Practice the first nav item (after Home logo) emphasizes this.

#### 2. Clear Content vs Drill Distinction

- **Learn** = Input (passive, browsing)
- **Practice** = Output (active, timed)

This matches the app's philosophy: "Comprehensible input for content, timed production for skills."

#### 3. Reference is Separate from Learning

Grammar tables aren't learning content - they're tools for when you've forgotten a form. Keeping them separate prevents users from "studying" instead of "drilling."

#### 4. Search is Utility, Not Destination

Search serves all sections equally. It shouldn't compete for attention with Practice.

---

## Part 8: Implementation Path

### Phase 1: URL Structure Changes

1. Create `/learn` layout with tabs (Conversations, Phrases, Words)
2. Move content from current sections
3. Add redirects for old URLs
4. Update internal links

### Phase 2: Navigation Update

1. Update `root.tsx` NAV_ITEMS array
2. Update mobile nav layout
3. Add search icon/bar to header

### Phase 3: Home Page Alignment

1. Update "Start learning" cards to point to new structure
2. Simplify secondary links section
3. Consider removing Home from nav (logo serves this purpose)

---

## Part 9: Alternative Considered

### Option B: 5-Item Nav with Search

```
[Home] [Practice] [Learn] [Reference] [Search]
```

**Pros:** Keeps Search highly visible for discovery
**Cons:** 5 items still tight on small phones (320px)

**Decision:** Recommend 4-item nav with search in header. Modern apps (Duolingo, Instagram) use this pattern successfully.

---

## Appendix: Content Inventory

### Conversations Content
- Arriving & Leaving
- Food & Hospitality
- Small Talk
- Quick Requests

### Phrases Content
- Survival (basic expressions)
- Responses (reactions, agreements)
- Requests (asking for things)
- Opinions (expressing views)
- Connectors (discourse markers)
- Time (temporal expressions)
- Constructions (grammar patterns in context)

### Vocabulary Content
- Nouns (by situation)
- Verbs (by usage)
- Reference (lookup)

### Reference Content
- Cases & Pronouns (paradigms)
- Nouns & Articles (declension)
- Adjectives (agreement)
- Prepositions (usage patterns)
- Verbs (conjugation tables)
