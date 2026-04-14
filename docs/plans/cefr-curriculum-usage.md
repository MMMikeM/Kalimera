# CEFR Level Strategy for Drill Sequencing

Strategic framework for using `cefrLevel` in vocabulary to sequence drills, manage learner progression, and fill content gaps.

## Executive Summary

The vocabulary seed now includes CEFR levels (A1–C2) for ~190 items (verbs, nouns, adjectives, adverbs). This data should drive **progressive difficulty gating in the drill queue**, not just learner proficiency labelling. CEFR assignments align with the app's Phase-based learning sequence, but only partially: A1 fills Phase 1, A2 scaffolds Phase 2, and B1+ are expansion content. The hard gate (don't unlock until phase complete) is more pedagogically sound than soft weighting for this learner profile.

---

## 1. CEFR-Driven Drill Sequencing

### 1.1 Map CEFR to Phase Milestones

Use these mappings to unlock content as the learner progresses through the timed production drills:

| Phase | CEFR Levels | Duration | Learner Milestone | Unlock Rule |
|-------|------------|----------|-------------------|------------|
| **Phase 1: Survival Production** | A1 only | Weeks 1–6 | Produces present-tense sentences with 15 core verbs (κάνω, έχω, θέλω, etc.) and nominative/accusative articles | `cefrLevel = 'A1'` OR (`cefrLevel IS NULL` AND `wordType = 'phrase'`) |
| **Phase 2: Past Narrative** | A1 + A2 | Weeks 7–16 | Produces aorist narratives, uses weak pronouns, tells stories | `cefrLevel IN ('A1', 'A2')` |
| **Phase 3: Expansion** | A1 + A2 + B1 | Weeks 17–26 | Produces future/imperative/adjectives, narrates with detail | `cefrLevel IN ('A1', 'A2', 'B1')` |
| **Phase 4+: Fluency** | All levels | Week 27+ | Handles conditionals, passive, relative clauses, formal register | No gate; all `cefrLevel` values available |

**Why this sequencing works for your learner:**
- A1 items (είμαι, έχω, σπίτι, πάντα) are survival minimum. Drilling these first prevents cognitive overload and builds automaticity quickly.
- A2 adds communicative range without overwhelming: past tense (aorist), more nouns, adverbs. The learner can now tell stories.
- B1 is expansion content (ενθουσιασμένος, σχεδιάζω, ανάμεσα). It doesn't block survival; it enables nuance.
- B2/C1/C2 are genuinely rare in casual speech and deferred per your curriculum philosophy (cut aggressively).

### 1.2 Drill Queue Filtering: Hard Gate vs. Soft Weighting

**Recommendation: Hard gate (unlock/don't unlock), not soft weighting.**

Reasoning:
- Your learner is at the procedural plateau, not a beginner. They have explicit knowledge already. Soft weighting (randomizing mix, boosting frequency) creates noise and cognitive tax without payoff.
- Timed production drills are high-pressure. Mixing A1 + B1 items in the same session causes mental friction: the learner's attention splits between automatising core forms (κάνω) and learning rare forms (σχεδιάζω). Both suffer.
- The research backbone (DeKeyser, Skill Acquisition Theory) is explicit: move through stages sequentially. Procedural fluency requires focused practice.

**Implementation:**

```typescript
// Drill queue query (pseudocode)
async function getDrillVocab(learnerId, mode: 'production' | 'recall') {
  const phase = await getCurrentPhase(learnerId);
  
  const cefrFilter = {
    1: ['A1'],
    2: ['A1', 'A2'],
    3: ['A1', 'A2', 'B1'],
    4: ['A1', 'A2', 'B1', 'B2', 'C1', 'C2']
  }[phase] ?? ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];
  
  return db.query.vocabulary.findMany({
    where: {
      and: [
        { cefrLevel: { in: cefrFilter } },
        { wordType: drillableWordTypes(mode) },
        // ... other filters (tag, recentPerf, etc.)
      ]
    }
  });
}
```

**Measurement of phase completion:**
- A learner is "Phase 1 complete" when they produce A1 verbs + articles in <5 seconds with 85%+ accuracy over 3 consecutive sessions.
- Phase gates can also be time-based (minimum 3 weeks before Phase 2) if you want to enforce a floor.

---

## 2. Content Gaps and Missing CEFR Assignments

### 2.1 Immediate Gaps at Each Level

#### **A1 (Survival)** — Mostly complete. Minor gaps:

| Gap | Current | Missing | Payoff |
|-----|---------|---------|--------|
| **Verbs** | 13/15 core verbs assigned | `πίνω` (drink), `τρώω` (eat) should be A1, are A1 ✓ | High: daily routine |
| **Nouns** | ~80 nouns, mixed levels | No dedicated A1 core noun list | Medium: need explicit 30-noun Phase 1 anchor |
| **Chunks** | None seeded | "Με λένε...", "Θα ήθελα...", "Πού είναι...?" | High: atomic units for early production |
| **Articles** | Not as vocabulary | τον, την, το patterns implicit | Medium: drillable as explicit forms |
| **Pronouns** | Scattered | Objective pronouns (με, σε, τον) not tagged as Phase-1 core | High: needed for accusative drills |

**Action:** Create a `Phrase` or `Chunk` table or tag vocabulary items as `is_core_chunk: bool`. Seed the 20 Tier 1 Chunks from `frequency-core.md` with A1 label.

#### **A2 (Past Narrative)** — 60% complete. Significant gaps:

| Gap | Current | Missing | Payoff |
|-----|---------|---------|--------|
| **Verbs** | 13 verbs assigned A2 | ~10 more phase-2 verbs need labels: έρχομαι, παίρνω, λέω, φεύγω, βρίσκω, δίνω, γράφω, διαβάζω, μαθαίνω, αγοράζω | High: Phase 2 narrative core |
| **Nouns** | ~50 assigned A2 | Possession-marked nouns (parent, sibling, family), objects for past tense (book, letter, gift) | High: needed for "I gave my mother a..." |
| **Adverbs** | 18/31 assigned A2 | Frequency adverbs (συχνά, συνήθως, καμιά φορά) mostly done. Position adverbs (μπροστά, πίσω, δίπλα) mostly done. Good coverage. | Low: mostly complete |
| **Adjectives** | 14/29 assigned A2 | Basic descriptors: όμορφος (beautiful), σκληρός (hard), μαλακός (soft), αργός (slow), γρήγορος (fast) | Medium: needed for descriptive narratives |
| **Genitive pronouns** | Not explicit | μου, σου, του as vocabulary items with A2 label | High: essential for "my house", "his car" |

**Action:** Audit the Phase 2 verb list (learning-sequence.md lines 76–98) and ensure all 20+ verbs are assigned A2. Add 15–20 everyday nouns missing from current seed. Tag possession/family nouns explicitly.

#### **B1 (Expansion)** — Sparse. Gaps are acceptable; this is optional polish:

| Gap | Current | Missing | Payoff |
|-----|---------|---------|--------|
| **Verbs** | 5 assigned B1 (νευριάζω, χαλαρώνω, σχεδιάζω, φταίω, προτιμώ) | None critical; Phase 3 is for expansion. Not production-blocking. | Low: can defer |
| **Nouns** | ~15 assigned B1 | Geographic/formal terms (πολιτεία, περιοχή), abstract nouns (ευκαιρία, πρόσκληση) | Low: intermediate enrichment |
| **Adjectives** | 3 assigned B1 (ενθουσιασμένος, οργανωμένος, μεγαλόνος) | Missing: σίγουρος (sure), δύσκολος (difficult), εύκολος (easy), ωραίος (nice) | Medium: useful for description |
| **Adverbs** | 10+ assigned B1 | Indefinite adverbs (κάπως, οπωσδήποτε) and indefinite place (παντού, κάπου) covered. Adequate. | Low: complete |

**Action:** No urgent action. If you add more nouns/adjectives in future lessons, apply B1 to mid-frequency items that don't block earlier phases.

---

## 3. Cautions and Edge Cases

### 3.1 Where CEFR Assignments May Mislead

#### **Suppletive verbs are harder than CEFR suggests**
- τρώω (eat) → έφαγα (aorist) is labelled A1, which is correct *for present tense*.
- But aorist έφαγα is **suppletive and irregular**—it should be A2 when drilled in past tense.
- **Solution:** Store `cefrLevel` *per tense* for verbs (cefrLevelPresent, cefrLevelAorist), or create a drill-time override: "If tense = aorist AND isSuppletive, treat as A2."

#### **Chunks vs. decomposed forms**
- "Θα ήθελα" (I would like) is labelled A1, which is correct as a *chunk*.
- But if decomposed into "θα (future marker) + ήθελα (imperfect)", it's arguably A2 or B1 because imperfect isn't Phase 1.
- **Solution:** Tag chunks as `is_frozen_phrase: true` and don't decompose them in drill questions. Drill as atomic units.

#### **Adjective agreement complexity**
- Colours (άσπρο, κόκκινο) are labelled A2, which is fine for nominative agreement.
- But accusative agreement (ωραίο vs. ωραία vs. ωραίος) is a full paradigm that requires understanding gender *and* case.
- **Solution:** Phase 3 adds adjective agreement. Keep A2 colours as nominative-only practice; push accusative agreement to B1.

#### **Stative verbs (ξέρω, έχω) have no true aorist**
- ξέρω (know) and έχω (have) don't have aorist forms; they use imperfect (ήξερα, είχα) for past.
- Both are labelled A1, which is correct for present. But past-tense drills should not expect learner to produce *aorist* of these.
- **Solution:** Mark these verbs as `useImperfectForPast: true` in verb_details, and don't include them in aorist-drilling phases.

#### **Pronouns, articles, adverbs with no word type**
- Objective pronouns (με, σε, τον) might be stored as phrases or have wordType = 'pronoun', which isn't enumerated.
- Articles (ο, η, το) are not vocabulary items in the current seed; they're implicit in declension tables.
- **Solution:** Create wordType = 'article' and 'pronoun' if these are drillable; otherwise, leave them as reference material (not vocab items).

### 3.2 Learner-specific risks

#### **Procedural plateau learner may over-rely on explicit CEFR**
- Your learner already *knows* (explicitly) that είμαι is A1 and φταίω is B1.
- The risk: they read CEFR as a comprehensibility label, not a production-priority label.
- They might say: "I understand B1, so I can skip A2 practice." But procedural fluency doesn't work that way.
- **Mitigation:** Label drill sessions by *phase*, not CEFR. Never expose CEFR levels in the UI. Use CEFR only server-side for gating.

#### **Late-bloomer nouns (e.g., καπέλο = hat at A2)**
- Learners might not encounter hats daily, so A2 feels wrong (should be B1 or optional).
- But CEFR is based on communicative frequency in *typical* European contexts, not this learner's life.
- **Mitigation:** Allow manual overrides per learner or learning path. Example: "If learner's job is fashion, boost clothing nouns to A1; if software engineer, keep them A2."

#### **Mixed-depth nouns within semantic groups**
- Τρένο (train) = A2, αεροπλάνο (airplane) = A2, but only train is high-frequency in casual Greek speech.
- **Mitigation:** Add a `frequencyRank` field (already in schema). Weight by frequency within each phase, not just CEFR. A2 items with frequencyRank 1–50 get drilled harder than frequencyRank 200–300.

---

## 4. Implementation Roadmap

### Phase 0: Validate Current Assignments (Now)
1. **Audit A1 verbs:** Ensure all 15 core verbs from frequency-core.md have `cefrLevel = 'A1'`. ✓ Already done.
2. **Audit A2 verbs:** Map Phase 2 verbs (lines 76–98 in learning-sequence.md) to A2 assignments. Some are missing.
3. **Add suppletive/stative flags:** Update verb_details table schema to include `useImperfectForPast`, `isSuppletive`. (Already has `isSuppletive`; use it.)

### Phase 1: Chunk Seeding (Week 1)
1. Create `wordType = 'phrase'` or tag all Tier 1 Chunks with `cefrLevel = 'A1'`.
2. Seed 20 chunks from frequency-core.md lines 89–115.
3. Tag with `is_core_chunk: true` or `is_frozen: true`.

### Phase 2: Drill Queue Gating (Weeks 2–3)
1. Update `getDrillVocab()` query to filter by phase-based CEFR gate (see 1.2).
2. Add phase-progression logic: track when learner completes Phase 1 (3 consecutive 85%+ sessions).
3. Log to DB when phase gates unlock (for analytics).

### Phase 3: UI Separation (Week 3)
1. Never show `cefrLevel` to learner. Replace with phase labels ("Essential", "Building", "Expanding").
2. Show phase completion % (e.g., "You've mastered 14/15 Phase 1 verbs").

### Phase 4: A2 Noun/Adjective Completion (Week 4)
1. Add ~20 missing A2 nouns (family, objects, actions).
2. Audit adjectives: ensure basic descriptors (όμορφος, δύσκολος, εύκολος) are A2.

### Phase 5: Optional—Frequency Weighting (Post-MVP)
1. Once all vocabulary is seeded with `frequencyRank`, update drill query to prefer high-frequency items within each CEFR gate.
2. Example: "From A2 pool, 70% chance of frequencyRank 1–100, 30% chance of 101–300."

---

## 5. Drill Query Examples

### Example 1: Phase 1 Production Drill
```sql
SELECT vocabulary.*, verbDetails.*, nominalForms.*
FROM vocabulary
LEFT JOIN verbDetails ON vocabulary.id = verbDetails.vocabId
LEFT JOIN nominalForms ON vocabulary.id = nominalForms.vocabId
WHERE vocabulary.cefrLevel = 'A1'
  AND vocabulary.wordType IN ('verb', 'noun', 'phrase')
  AND (
    -- Include past-tense forms for A1 verbs only if present tense is mastered
    nominalForms.grammaticalCase IN ('nominative', 'accusative')
    OR verbDetails.conjugationFamily IS NOT NULL
  )
ORDER BY RANDOM()
LIMIT 20;
```

### Example 2: Phase 2 Narrative Drill (with suppletive override)
```sql
SELECT vocabulary.*, verbDetails.*
FROM vocabulary
LEFT JOIN verbDetails ON vocabulary.id = verbDetails.vocabId
WHERE vocabulary.cefrLevel IN ('A1', 'A2')
  AND vocabulary.wordType = 'verb'
  -- For aorist, treat suppressives and statives as A2, not A1
  AND (
    verbDetails.aoristStem IS NOT NULL
    OR (verbDetails.isSuppletive = true AND vocabulary.cefrLevel = 'A2')
    OR (verbDetails.conjugationFamily = 'irregular' AND vocabulary.cefrLevel IN ('A1', 'A2'))
  )
ORDER BY frequencyRank ASC, RANDOM()
LIMIT 20;
```

### Example 3: Phase 3 with B1 Adjectives
```sql
SELECT vocabulary.*
FROM vocabulary
WHERE vocabulary.cefrLevel IN ('A1', 'A2', 'B1')
  AND vocabulary.wordType IN ('adjective', 'verb', 'noun')
ORDER BY vocabulary.cefrLevel ASC, frequencyRank ASC
LIMIT 30;
```

---

## 6. Summary Checklist for Developers

- [ ] **Schema:** Verify `vocabulary.cefrLevel` is indexed and nullable. Verify `verb_details.isSuppletive` exists.
- [ ] **Seed data:** All 15 Phase 1 core verbs have `cefrLevel = 'A1'`. All Phase 2 verbs have `cefrLevel = 'A2'`.
- [ ] **Chunks:** 20 Tier 1 chunks from frequency-core.md are seeded as `wordType = 'phrase'` with `cefrLevel = 'A1'`.
- [ ] **Drill query:** Filter by `cefrLevel IN [gate]` where gate depends on learner's current phase.
- [ ] **Phase tracking:** Add DB column to learner profile: `currentPhase INT` (1–4), `phaseCompletedAt TIMESTAMP`.
- [ ] **UI:** Never expose raw CEFR values. Use phase labels ("Essential", "Building", "Expanding").
- [ ] **Testing:** Verify that Phase 1 drills include only A1, Phase 2 includes A1+A2, etc.
- [ ] **Monitoring:** Log which items learner struggles with at each phase; flag if many B1 items appear in Phase 2 drills (query error).

---

## References

- Learning Sequence: `/docs/learning-progression.md` and `/.claude/skills/greek-curriculum-expert/references/learning-sequence.md`
- Frequency Core: `/.claude/skills/greek-curriculum-expert/references/frequency-core.md`
- CEFR Standard: A1–C2 as per Common European Framework of Reference
