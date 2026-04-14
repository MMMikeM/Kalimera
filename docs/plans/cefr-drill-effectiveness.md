# CEFR-Driven Drill Effectiveness Analysis

**Date:** April 2026  
**Criterion:** Does CEFR-level data build retrieval speed for production drills?  
**Learner Profile:** Adult intermediate plateau (knows grammar, stuck on speed)

---

## Executive Summary

CEFR levels are a 🟡 **partial tool** for drill design. They provide legitimate sequencing signals when combined with **response time data** and **error tracking**, but blocking practice by CEFR level alone violates interleaving research and reduces the variation needed for durable retrieval. 

**Verdict:** Use CEFR as a _difficulty weighting_ in adaptive algorithms, not as hard curriculum gates. Interleave across levels within sessions. Separate speed targets by level but don't lock learners into "master A1 first" workflows.

---

## 1. CEFR as Drill Pool Filter: 🟡 Partial Support with Caution

### Analysis

CEFR levels (A1/A2/B1) are an externally-imposed classification system that group vocabulary by perceived difficulty for learners of that language. For production drills, this creates a tension:

**What CEFR does well:**
- **Provides a learning progression signal.** A1 words (είμαι, έχω, θέλω) are foundational; A2 words add structural variety; B1 words require faster retrieval under pressure.
- **Aligns with communicative expectations.** A1 enables basic conversation; A2 enables simple narratives; B1 enables sustained discourse.
- **Enables adaptive filtering.** A learner stuck on speed can focus on A1/A2 to build automaticity in high-frequency forms before tackling B1 complexity.

**What CEFR fails to signal:**
- **Morphological complexity.** "dog" and "cat" (both A1 in English learning) have identical inflectional patterns; "friend" (A2) and "woman" (A1) have different declension patterns. CEFR doesn't encode _form complexity_, only vocabulary frequency.
- **Form-specific demands.** A1 noun might be easy lemma but hard case (nominative vs accusative); A2 verb might require rapid conjugation retrieval under time pressure. CEFR classifies the word, not the retrieval task.
- **Individual learner gaps.** The user might know all A1 vocabulary but struggle with A1 case declensions in real time. A blanket A1 session doesn't target the actual gap.

### Specific Caution: The "Master A1 First" Trap

If drills are blocked by CEFR level—"complete all A1 production before touching A2"—the user will:

1. Drill the same forms repeatedly in the same contexts
2. Build rote memory for specific prompts, not generalizable retrieval
3. Enter A2 with procedurally brittle knowledge (can do forms in isolation, not under interference from new material)

This violates **two core principles** from the learning theory docs:

- **Interleaving:** "Mixing different grammar topics within sessions improves transfer and long-term retention" (Serfaty & Serrano 2022)
- **Spacing:** "3-4 day intervals optimal during initial learning of morphological rules" with expanding intervals later

A1-only sessions create massed practice (same forms, same level) rather than spaced, interleaved practice.

### Recommendation: Filter, Don't Block

🟢 **Use CEFR as a _weighting_, not a gate.**

- Default session pulls from mixed CEFR levels (e.g., 60% A1, 30% A2, 10% B1)
- Learner can _choose_ "A1 focus" if they want concentration on basics
- Algorithm tracks mastery (speed + accuracy) per level; adapts weighting dynamically
- Never lock progression: A1 drills remain in rotation even after A2/B1 introduced

---

## 2. Interleaving vs Blocking: The Research Is Clear

### Research Summary

From the learning theory doc (Serfaty & Serrano 2022, Suzuki et al. 2019):

> "Interleaving beats blocking. Mixing different grammar topics within sessions improves transfer and long-term retention. Desirable difficulties include spacing, interleaving, retrieval practice, and generation."

From anti-patterns reference:

> "Curriculum Creep" (organized learning paths, skill trees, prerequisites) "doesn't make retrieval faster. It just feels productive to the developer."

### What This Means for CEFR-Based Sessions

**Blocked Approach (A1-only until "mastered"):**
- Session 1-10: A1 nouns, A1 verbs, A1 articles only
- Clear progress to user, easy to gamify
- **Result:** Forms become automatized in isolation but fail to transfer when mixed with A2/B1 (interference effect)
- **Speed doesn't improve in conversation** where forms are interleaved with unfamiliar material

**Interleaved Approach (mix levels in every session):**
- Every session mixes A1, A2, B1 (by weighting, not equally)
- Harder initially (lower accuracy, more errors)
- Errors are useful (Serfaty & Serrano): "emotionally salient errors aid memory"
- **Result:** Forms proceduralize in realistic, mixed contexts; transfer to conversation

### Specific Recommendation for This User

The user **already has knowledge** (knows rules, can apply with time). They don't need carefully sequenced introduction; they need **retrieval under interference**.

**Session Design (Example 15-minute drill):**

1. **Warm-up (2 min):** 2-3 A1 forms they're fast at (confidence building)
2. **Mixed focus (10 min):** 
   - 60% A1 production drills (2-3 sec)
   - 25% A2 production drills (3-4 sec)
   - 15% B1 production drills (4-5 sec)
   - **Randomized order, not blocked**
3. **Closing (3 min):** 1-2 challenging B1 forms with feedback

**Why this works:**
- A1 drills remain fast and build confidence
- A2/B1 introduce retrieval difficulty without blocking A1
- Interleaving forces the brain to distinguish contexts
- Errors on A2/B1 signal where proceduralization is incomplete

**Mastery Criterion (not CEFR progression):**
- A1 level: < 2.5 sec average + > 90% accuracy
- A2 level: < 4 sec average + > 85% accuracy
- B1 level: < 5 sec average + > 80% accuracy

Once A1 items hit mastery across 3+ sessions, they remain in drills but at lower proportion (to allow A2/B1 focus).

### Flag: Avoid the "Learning Path" Illusion

🔴 **Do NOT build a visible "path" like:**
- "A1 Nouns (5/5 complete) → A1 Verbs (2/7) → A1 Articles (0/6)"
- "Unlock A2 once A1 complete"
- Progress bars per CEFR level

This gamifies curriculum, not retrieval speed. The user doesn't need gamification; they need massive retrieval reps.

---

## 3. Adaptive Difficulty via CEFR + Response Time

### Mechanism

The goal: use CEFR + response time data to **automatically adjust the difficulty weighting** in future sessions without requiring user intervention.

### Query Logic: Mastery Tracking

```typescript
// Query: For each CEFR level, summarize recent performance
interface CefrLevelStats {
  cefrLevel: "A1" | "A2" | "B1";
  avgResponseTime: number; // ms
  accuracyRate: number; // 0-1
  sampleCount: number; // attempts in last 3 sessions
  lastReviewAt: Date;
}

// Pseudo-SQL
SELECT
  v.cefr_level,
  AVG(pa.time_taken) as avg_response_time,
  SUM(CASE WHEN pa.is_correct THEN 1 ELSE 0 END) / COUNT(*) as accuracy_rate,
  COUNT(*) as sample_count,
  MAX(pa.attempted_at) as last_review_at
FROM practice_attempts pa
JOIN vocabulary v ON pa.vocabulary_id = v.id
WHERE
  pa.user_id = ?
  AND pa.attempted_at > NOW() - INTERVAL '3 days'
  AND pa.session_type IN ('conjugation_drill', 'case_drill', 'noun_declension_drill')
GROUP BY v.cefr_level;
```

### Mastery Thresholds

Define "mastery" per CEFR level:

| Level | Target Speed | Min Accuracy | Min Samples |
|-------|--------------|--------------|-------------|
| A1    | < 2.5 sec    | 90%          | 15 attempts |
| A2    | < 4 sec      | 85%          | 15 attempts |
| B1    | < 5 sec      | 80%          | 10 attempts |

When a level hits mastery thresholds _consistently_ (across 2+ sessions), mark it as "proficient" in that session type.

### Session Weighting Trigger

```typescript
// Pseudocode: next session weight calculation

const getMixWeights = (cefrStats: CefrLevelStats[]): Record<CefrLevel, number> => {
  const weights = { A1: 0.6, A2: 0.3, B1: 0.1 }; // default
  
  for (const stat of cefrStats) {
    const isMastered = 
      stat.avgResponseTime < targetSpeed[stat.cefrLevel] &&
      stat.accuracyRate > minAccuracy[stat.cefrLevel] &&
      stat.sampleCount >= minSamples[stat.cefrLevel];
    
    if (isMastered) {
      // Drop proficient level to maintenance weight
      weights[stat.cefrLevel] *= 0.5;
      // Reallocate to struggling levels
    } else if (stat.avgResponseTime > targetSpeed[stat.cefrLevel] * 1.5) {
      // User is slow; increase weight for this level
      weights[stat.cefrLevel] *= 1.3;
    }
  }
  
  // Normalize to 1.0
  const total = Object.values(weights).reduce((a, b) => a + b, 0);
  return Object.fromEntries(
    Object.entries(weights).map(([k, v]) => [k, v / total])
  );
};
```

### What Triggers Difficulty Increase?

A learner moves from "A1-heavy" to "A1+A2+B1 mixed" when:

1. **A1 items hit mastery threshold** (< 2.5 sec, > 90% accuracy) for 2+ consecutive sessions
2. **User has attempted at least 20 A1 production items** across sessions
3. **Time since last A1 mastery check > 3 days** (spacing enforces durability)

Then: reduce A1 proportion from 60% → 45%, increase A2 from 30% → 40%.

### What Triggers Difficulty Decrease?

If a learner's accuracy drops or response times spike:

1. **Accuracy falls below min threshold** (A1 < 85%, A2 < 80%, B1 < 70%) in a session
2. **Error spike detected:** > 50% of a level's items wrong in consecutive 5-item blocks
3. **Response time creeps up:** avg time > target + 2 sec

Then: revert to heavier weighting on that level. Example: A2 slipping → increase A2 proportion, reduce B1.

### 🟢 Key Advantage: Learner-Driven Progression

This mechanism is **transparent and learner-visible**:

- Dashboard shows: "A1: proficient (2.2 sec avg) | A2: developing (4.1 sec avg) | B1: new (5.8 sec avg)"
- User sees weighting change happen naturally as they improve
- No artificial "unlock" gates; just data-driven focusing

---

## 4. Specific Drill Designs by CEFR Level

All drills are **English → Greek production**, **timed**, **no hints**, **error = useful data**.

### A1 Production Drills (Foundational Speed)

**Target Vocabulary Examples:**  
είμαι (be), έχω (have), θέλω (want), πηγαίνω (go), βλέπω (see), το παιδί (child), η γυναίκα (woman), ο φίλος (friend)

#### Drill A1.1: Copula Conjugation

**What:** Present tense of είμαι under time pressure  
**Why:** Copula is essential; must be instant

| Prompt            | Expected Response | Timer |
|-------------------|-------------------|-------|
| I am              | είμαι             | 2 sec |
| You (sg) are      | είσαι             | 2 sec |
| She is            | είναι             | 2 sec |
| We are            | είμαστε           | 2 sec |
| They are          | είναι             | 2 sec |

**Progression:**
- Weeks 1-2: Present only, 2 sec timer
- Week 3+: Mix with embedded use (see drill A1.3)

**Mastery:** < 1.8 sec average, > 95% accuracy

---

#### Drill A1.2: High-Frequency Action Verb Conjugation

**What:** Present tense, first 5 core verbs (είμαι, έχω, θέλω, πηγαίνω, βλέπω)  
**Why:** Verb forms must be automatic for any sentence production

| Prompt              | Expected Response |
|---------------------|-------------------|
| they (έχω)          | έχουν             |
| I (θέλω)            | θέλω              |
| she (πηγαίνω)       | πηγαίνει          |
| we (βλέπω)          | βλέπουμε          |
| you sg (έχω)        | έχεις             |

**Timer:** 2-3 sec (faster for high-frequency words)

**Rotation:** Randomize verb and person; don't repeat same verb twice in a row.

**Mastery:** < 2.5 sec average, > 90% accuracy

---

#### Drill A1.3: Nominative ↔ Accusative Article Pair

**What:** Produce article + definite form for nominative/accusative  
**Why:** Articles are constant friction; must become instant

| Prompt                         | Expected Response |
|--------------------------------|-------------------|
| the child (nominative)         | το παιδί          |
| the child (accusative)         | το παιδί          |
| the friend (nominative, masc)  | ο φίλος           |
| the friend (accusative, masc)  | τον φίλο          |
| the woman (nominative, fem)    | η γυναίκα         |
| the woman (accusative, fem)    | την γυναίκα       |

**Timer:** 2-3 sec

**Mastery:** < 2.5 sec average, > 90% accuracy

---

#### Drill A1.4: Simple Sentence Production (Integrated)

**What:** Full sentence English → Greek, using high-frequency verbs + nouns  
**Why:** Integrates verb + noun + article under time pressure (real speaking)

| Prompt                   | Expected Response           |
|--------------------------|---------------------------|
| I have the book          | Έχω το βιβλίο              |
| She sees the child       | Βλέπει το παιδί            |
| We want coffee           | Θέλουμε καφέ               |
| They go to school        | Πηγαίνουν στο σχολείο      |
| You have the friend (sg) | Έχεις τον φίλο             |

**Timer:** 4-5 sec (longer: multiple retrievals)

**Mastery:** < 5 sec average, > 85% accuracy

---

### A2 Production Drills (Complexity & Speed)

**Target Vocabulary Examples:**  
Nouns: ο καφές (coffee), η ζωή (life), το όνομα (name), η πόλη (city), ο άνθρωπος (person)  
Verbs: αγαπώ (love), λέω (say), δίνω (give), παίρνω (take)  
Adjectives: καλός (good), μεγάλος (big), ωραίος (beautiful)

#### Drill A2.1: Genitive Case Production

**What:** Transform nominative NP to genitive (possession, origin)  
**Why:** Genitive is structurally complex; more forms to retrieve; slows learners

| Prompt                      | Expected Response |
|-----------------------------|-------------------|
| the friend's (of the friend) | του φίλου         |
| the woman's (of the woman)  | της γυναίκας      |
| the child's (of the child)  | του παιδιού       |
| the city's (of the city)    | της πόλης         |
| the name's (of the name)    | του ονόματος      |

**Timer:** 3-4 sec

**Mastery:** < 4 sec average, > 85% accuracy

---

#### Drill A2.2: Verb + Genitive/Dative Integration

**What:** Produce verb phrase with correct case-marked object  
**Why:** Combines verb retrieval + case selection; higher complexity

| Prompt                    | Expected Response         |
|---------------------------|---------------------------|
| I give (to the woman)     | Δίνω στη γυναίκα          |
| She loves (the life)      | Αγαπάει τη ζωή            |
| They take (of the friend) | Παίρνουν του φίλου... [+obj] |

**Timer:** 4-5 sec

**Mastery:** < 5 sec average, > 80% accuracy

---

#### Drill A2.3: Adjective Agreement + Case

**What:** Produce adjective-noun agreement in required case  
**Why:** Adjective forms vary by gender/number/case; high cognitive load

| Prompt                                | Expected Response   |
|---------------------------------------|---------------------|
| big (masculine accusative): the man   | τον μεγάλο άνθρωπο  |
| beautiful (feminine nominative): life | η ωραία ζωή         |
| good (neuter accusative): name        | το καλό όνομα       |

**Timer:** 4-5 sec

**Mastery:** < 5 sec average, > 80% accuracy

---

#### Drill A2.4: Preposition + Case Obligatory Forms

**What:** Produce preposition + correct case form  
**Why:** Each preposition has case constraints; must be automatic

| Prompt                   | Expected Response |
|--------------------------|-------------------|
| to (στο) + the school    | στο σχολείο       |
| from (από) + the city    | από την πόλη      |
| with (με) + the woman    | με τη γυναίκα     |
| in (σε) + the house      | στο σπίτι         |

**Timer:** 3-4 sec

**Mastery:** < 4 sec average, > 85% accuracy

---

### B1 Production Drills (Fluency & Integration)

**Target Vocabulary Examples:**  
Nouns: το ταξίδι (trip), η κουζίνα (kitchen), ο κάτοικος (resident), η δυσκολία (difficulty)  
Verbs: χρησιμοποιώ (use), αναγνωρίζω (recognize), διαφωνώ (disagree), επιτρέπω (allow)  
Adjectives: δύσκολος (difficult), σημαντικός (important), ιστορικός (historical)

#### Drill B1.1: Complex Sentence with Mixed Cases

**What:** English → Greek for sentence with multiple case requirements  
**Why:** B1 requires handling multiple form retrievals simultaneously

| Prompt                                      | Expected Response                      |
|---------------------------------------------|----------------------------------------|
| The trip to the city is difficult          | Το ταξίδι στην πόλη είναι δύσκολο      |
| He uses the woman's kitchen                | Χρησιμοποιεί την κουζίνα της γυναίκας |
| They recognize the historical significance | Αναγνωρίζουν τη σημαντική ιστορία...  |

**Timer:** 6-7 sec

**Mastery:** < 7 sec average, > 75% accuracy

---

#### Drill B1.2: Tense Switching Under Pressure

**What:** Conjugate verb in specified tense (present, aorist, future)  
**Why:** Tense switching requires rapid morphological access

| Prompt              | Expected Response |
|---------------------|-------------------|
| they use (present)  | χρησιμοποιούν     |
| they used (aorist)  | χρησιμοποίησαν    |
| they will use       | θα χρησιμοποιήσουν |

**Timer:** 4-5 sec

**Mastery:** < 5 sec average, > 75% accuracy

---

#### Drill B1.3: Argumentation Phrases (Opinion + Case Agreement)

**What:** Produce opinion phrase with case-correct objects  
**Why:** B1 involves expressing agreement/disagreement with structured morphology

| Prompt                                        | Expected Response                        |
|-----------------------------------------------|------------------------------------------|
| I disagree with the man's opinion            | Διαφωνώ με τη γνώμη του άνδρα            |
| The difficulty of this problem is important | Η δυσκολία αυτού του προβλήματος είναι... |

**Timer:** 6-7 sec

**Mastery:** < 7 sec average, > 75% accuracy

---

#### Drill B1.4: High-Frequency Idiomatic Combinations

**What:** Produce common fixed phrases (verbal collocations, formulaic sequences)  
**Why:** B1 learners gain fluency through lexical chunks, not individual morpheme retrieval

| Prompt                       | Expected Response              |
|------------------------------|--------------------------------|
| What's your name?            | Ποιό είναι το όνομά σας;       |
| I don't have time            | Δεν έχω χρόνο                  |
| That's not a big deal        | Δεν είναι μεγάλο πρόβλημα      |

**Timer:** 3-4 sec (faster because rote-learned chunks)

**Mastery:** < 4 sec average, > 85% accuracy

---

### Drill Rotation Strategy

**Per 15-minute session (when fully calibrated):**

1. **Weeks 1-4 (A1 Focus):**
   - A1.1 (Copula) - 3 min
   - A1.2 (Verb conjugation) - 4 min
   - A1.3 (Article pair) - 4 min
   - A1.4 (Simple sentence) - 4 min
   - A1 weakness area (tracked) - 2 min

2. **Weeks 5-8 (A1 Maintain + A2 Build):**
   - A1.4 (maintenance, faster) - 2 min
   - A2.1 (Genitive intro) - 4 min
   - A2.2 (Verb + case) - 4 min
   - A1.2 mixed with A2.1 - 3 min
   - Weakness focus - 2 min

3. **Weeks 9+ (All Three Levels Interleaved):**
   - Randomize drill type from available A1/A2/B1 drills
   - 60% A1 content, 30% A2 content, 10% B1 content
   - Weighting adjusts based on mastery (see Section 3)

---

## 5. Limits of CEFR Data: Where It Fails

### 5.1 CEFR ≠ Morphological Complexity

**Problem:** CEFR classifies _vocabulary frequency_, not _inflectional load_.

**Example:**
- "dog" and "school" are both A1 frequency
- In Greek, κύνος (dog) follows masc-os pattern (ο κύνος → τον κύνο → του κύνου)
- But σχολείο (school) follows neut-o pattern (το σχολείο → το σχολείο → του σχολείου)
- CEFR says both are A1; drills should treat them similarly
- But retrieval demands are different (3 distinct forms vs. 1 distinct nominative-oblique form)

**Fix:** Track not just CEFR level but also:
- **declension_pattern** (already in schema: `noun_declension_patterns`)
- **conjugation_family** (already in schema: `verb_details.conjugation_family`)
- **Form count:** How many distinct inflected forms exist for this item?

**Query addition:**
```typescript
// When selecting drills, also track:
SELECT 
  v.id, 
  v.cefr_level,
  nd.declension_pattern,
  vd.conjugation_family,
  COUNT(DISTINCT nf.form) as form_count
FROM vocabulary v
LEFT JOIN noun_details nd ON v.id = nd.vocab_id
LEFT JOIN verb_details vd ON v.id = vd.vocab_id
LEFT JOIN nominal_forms nf ON v.id = nf.vocab_id
WHERE v.cefr_level = 'A1'
GROUP BY v.id;
```

This lets the drill engine balance **frequency + morphological complexity**.

---

### 5.2 CEFR ≠ Individual Learner Gap

**Problem:** CEFR provides no signal about _which specific forms_ a learner struggles with.

**Example:**
- User might know all A1 noun lemmas but struggle with nominative vs. accusative distinction under time pressure
- CEFR says "A1 nouns are learned"
- Drills based on CEFR alone won't target the gap

**Fix:** Couple CEFR with **weak areas** (already in schema):

```typescript
export const weakAreas = sqliteTable("weak_areas", {
  userId: ...,
  areaType: oneOf("area_type", ["case", "gender", "verb_family"]),
  areaIdentifier: string(), // e.g., "accusative", "feminine", "θέλω family"
  mistakeCount: integer(),
  lastMistakeAt: createdAt(),
  needsFocus: bool(),
});
```

**Next step:** When building a session, filter by CEFR level _and_ cross-check against weak areas:

```typescript
// Pseudocode: prioritize content matching user's weak areas

const getSessionContent = (userId: string, cefrWeights: Record<CefrLevel, number>) => {
  const weakAreas = await getWeakAreas(userId);
  
  // If user has weak area "accusative", prioritize accusative drills
  // If user has weak area "perfective-aorist", prioritize aorist verbs
  
  const candidates = await getVocabByMixedCriteria({
    cefrWeights, // from adaptive algorithm
    weakAreaFilters: weakAreas.filter(a => a.needsFocus),
  });
  
  return candidates;
};
```

---

### 5.3 CEFR ≠ Context-Dependent Retrieval

**Problem:** CEFR treats "know a word" as binary. But retrieval is context-dependent.

**Example:**
- User might produce "ο φίλος" (the friend) instantly in a sentence
- But in a standalone case transformation drill ("nominative → accusative"), takes 5 seconds
- Same word; different retrieval contexts require different drill exposure

**Fix:** Track **form-specific response patterns**:

```typescript
// Add to practiceAttempts queries:
SELECT 
  v.greek_text,
  pa.question_text, // e.g., "article for masculine accusative"
  AVG(pa.time_taken) as avg_time,
  SUM(CASE WHEN pa.is_correct THEN 1 ELSE 0 END) / COUNT(*) as accuracy
FROM practice_attempts pa
JOIN vocabulary v ON pa.vocabulary_id = v.id
WHERE pa.user_id = ?
GROUP BY v.id, pa.question_text;
```

This shows: "φίλος is fast in full sentences (2.1 sec) but slow in case isolation drills (4.3 sec)."

**Action:** If a form is fast in sentences but slow in isolation, schedule more isolation drills. If fast in isolation but slow in sentences, schedule more integrated drills.

---

### 5.4 CEFR Misses Frequency Within the Level

**Problem:** CEFR groups A1, A2, B1 but doesn't rank within the level. Some A1 words appear 50x more often than others.

**Example:**
- κι/και (and) appears ~500x per million words in Greek corpora
- φαγητό (food) appears ~5x per million
- Both are A1
- But "and" needs far more drilling for automaticity

**Solution:** Rank drills by **frequencyRank** (already in schema):

```typescript
// When selecting from A1 level, prefer high-frequency items
ORDER BY vocabulary.frequency_rank ASC -- 1 = most frequent
LIMIT 10;
```

---

### 5.5 CEFR Doesn't Encode Learner-Specific Declarative Knowledge Gaps

**Problem:** Some learners know (explicitly) why a form is correct but can't retrieve it fast. Others don't understand the rule at all.

**Example:**
- User can explain: "Accusative changes ο→τον because it's direct object"
- But in a 2-second drill, freezes up
- vs. User doesn't understand accusative function at all

**CEFR alone can't distinguish.** The first learner needs faster drilling; the second needs a learning resource first.

**Fix:** Track **learner interaction type** in weak areas:

```typescript
// Extended weak areas schema (future)
const weakAreas = {
  ...existing,
  gapType: oneOf("declarative_gap" | "procedural_gap" | "mixed"),
  // "declarative": user explained it wrong
  // "procedural": user knows it but slow
  // "mixed": both
};
```

If gap type is "declarative," the app should offer a brief rule reminder before drills.  
If gap type is "procedural," skip explanation; more drills.

---

## 6. Additional Signals Beyond CEFR

### What Would Make the Drill Engine Smarter?

1. **Morphological Complexity Ranking** (per vocab item)
   - Count distinct inflected forms
   - Mark syncretism (forms that look identical)
   - Use to weight drills: more time, more repetitions for high-complexity items

2. **Form-Specific Error Patterns** (per (vocab + case/tense combination))
   - Track not just "got it wrong" but _which forms_ are problematic
   - Example: User confuses nominative/accusative but nails genitive
   - Drill the confusion, not the whole case system

3. **Contextual Retrieval Speed** (isolated vs. integrated)
   - Track performance on same form in:
     - Isolation (article selection, case transformation)
     - Sentence context (full sentence production)
   - If gap between contexts is large, use both drill types

4. **Response Time Distribution** (not just average)
   - Is response time: 2.1, 2.2, 2.0, 2.1 sec? (Consistent, proceduralized)
   - Or: 1.8, 4.2, 2.9, 3.5 sec? (Inconsistent, still declarative)
   - Standard deviation > 1 sec indicates proceduralization incomplete

5. **Cross-Item Interference** (learning from confusions)
   - When user confuses "τον" with "το", drill both forms back-to-back
   - Current design can't see this; adds to weak areas ad-hoc

6. **Session Type Effectiveness** (drill type→level success mapping)
   - Does this user improve faster with "conjugation drills" or "full sentences"?
   - Adapt session type weighting based on historical improvement rate

---

## 7. Recommendations: Implementation Roadmap

### Phase 1: Use CEFR as Data (Current, No New Code)

🟢 **Now:** CEFR is in schema. It's available for filtering.

- **Update drill selection query:** Add CEFR weighting to vocabulary selection
- **Track by level:** Add CEFR to practice_attempts queries so you can see "A1 avg 2.3 sec, A2 avg 4.1 sec"
- **No UI changes:** Just use the data in backend

---

### Phase 2: Implement Adaptive Weighting (2-week task)

🟢 **Next:** Build the adaptive algorithm (Section 3).

1. Add `getCefrLevelStats(userId)` query → returns performance per level
2. Implement `getMixWeights(stats)` function → calculates session weighting
3. Store weighting in `practiceSessions` table (or in-memory cache)
4. Update drill selection to use weights: `WHERE cefr_level IN (SELECT ... WHERE probability >= random())`

**Benefit:** Sessions automatically adapt as learner improves. Mastery in A1 naturally shifts load to A2/B1.

---

### Phase 3: Couple with Weak Areas (2-week task)

🟢 **Later:** Enrich CEFR with learner-specific gap targeting.

1. Query weak areas at session start
2. When building drill content, filter: `WHERE cefr_level IN weights AND (form, case) IN weakAreas`
3. Surface weak areas in drill UI: "You're slow at accusative forms; practicing those today"

**Benefit:** Drills target the actual bottleneck, not just the level.

---

### Phase 4: Track Morphological Complexity (1-week task)

🟡 **Nice to have:** Balance vocab selection by form count.

```typescript
// In getVocabByMixedCriteria:
const formCounts = await db.query.nominalForms.findMany({
  where: { vocabId: inList(candidateIds) },
  groupBy: "vocabId"
  // count distinct forms per vocab
});

// Mix high-complexity (more forms) with low-complexity for variety
candidateIds.sort((a, b) => {
  const complexityDiff = formCounts[a] - formCounts[b];
  // Interleave: pick from alternating complexity levels
});
```

**Benefit:** Prevents learner from drilling only "simple" A1 nouns; ensures exposure to morphologically complex items within level.

---

## Summary Table: CEFR Signals by Use Case

| Use Case | CEFR Signal | Confidence | What To Do |
|----------|------------|-----------|-----------|
| Session pool filtering | Good | 🟢 High | Use as primary weighting; mix levels |
| Blocking/sequencing | Poor | 🔴 Low | Avoid; use as soft guide only |
| Adaptive difficulty | Good | 🟢 High | Pair with response time for triggers |
| Targeting weak forms | Partial | 🟡 Medium | Couple with weak area tracking |
| Morphological complexity | Poor | 🔴 Low | Add form count as secondary signal |
| Form-specific drilling | N/A | 🔴 N/A | Track form + context, not just vocab |
| Learner gap diagnosis | N/A | 🔴 N/A | Use error patterns + response time |

---

## Conclusion

**CEFR is a weighting signal, not a curriculum gate.**

For this learner (adult, knows rules, stuck on speed):

- ✅ Use CEFR to weight drill pools: default 60% A1, 30% A2, 10% B1
- ✅ Adapt weighting using response time data: promote A2/B1 as A1 speeds improve
- ✅ Interleave all levels within sessions; avoid "master A1 first" blocking
- ✅ Couple CEFR with weak area tracking for targeted drilling
- ❌ Don't create visible "learning paths" by CEFR level
- ❌ Don't require mastery at one level before unlocking next
- ❌ Don't assume CEFR classification predicts learner-specific retrieval speed

**The signal you actually need:** Response time + accuracy per form per context. CEFR is context-free; real learning is context-rich. Use CEFR to structure the initial pool; use performance data to keep the learner in the zone of proximal challenge.

