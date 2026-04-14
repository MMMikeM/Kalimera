# CEFR Implementation Plan

Synthesised from three analysis reports (curriculum, motivation, drill effectiveness) and product decisions made April 2026.

---

## Core model: current level + next level

The drill pool is always two levels: the level you're actively working on, plus the level above it.

| Stage | Drill pool |
|-------|-----------|
| Starting out | A1 only |
| A1 mastered | A1 + A2 |
| A2 mastered | A2 + B1 |
| B1 mastered | B1 + B2 |

When a level is mastered it leaves active rotation. It doesn't disappear — `vocabularySkills` SRS handles spacing of those items — but it's no longer part of the primary drill pool.

Within each level, `frequencyRank ASC` determines priority. CEFR is the bucket; frequency rank is the order within it.

CEFR levels are internal only. They are never shown to the learner.

---

## What CEFR doesn't cover (handle separately)

- **Morphological complexity** — a C-stem noun is harder to produce than an O-stem at the same CEFR level. Post-MVP: weight by declension pattern complexity.
- **Frequency within a level** — solved by `frequencyRank`.
- **Individual gaps** — `weakAreas` handles learner-specific gaps. The drill query should intersect both.
- **Tense-level difficulty** — a verb is A1 in present tense and harder in aorist. Known limitation for now. Post-MVP: `cefrLevel` per conjugation tense.

---

## Implementation phases

### Phase 1: Track current CEFR level per user

**Goal:** Know which level a user is actively working on.

Add a single field to the user profile (or a new small table if you prefer to keep schema-auth clean):

```typescript
// Option A: column on users table
currentCefrLevel: oneOf("current_cefr_level", cefrLevels).default("A1")

// Option B: separate table
export const userProgress = sqliteTable("user_progress", {
  userId: cascadeFk("user_id", () => users.id),
  currentCefrLevel: oneOf("current_cefr_level", cefrLevels).notNull().default("A1"),
  updatedAt: createdAt("updated_at"),
}, (t) => [primaryKey({ columns: [t.userId] })]);
```

Option B is cleaner — keeps progress state out of auth tables.

**Schema migration required.**

---

### Phase 2: CEFR-filtered drill query

**Goal:** Drill pool = `currentLevel + nextLevel`, ordered by `frequencyRank ASC`.

```typescript
const NEXT_LEVEL: Partial<Record<CefrLevel, CefrLevel>> = {
  A1: "A2",
  A2: "B1",
  B1: "B2",
  B2: "C1",
  C1: "C2",
};

interface DrillVocabOptions {
  userId: number;
  currentCefrLevel: CefrLevel;
  wordTypes: WordType[];
  limit?: number;
}

const getDrillVocab = async (opts: DrillVocabOptions): Promise<Vocabulary[]>
```

Query logic:

1. Determine `[currentLevel, nextLevel]` from `NEXT_LEVEL` map
2. `WHERE cefrLevel IN (currentLevel, nextLevel)`
3. `ORDER BY cefrLevel ASC, frequencyRank ASC` — current level items come first, higher level items follow
4. Also intersect with `weakAreas` for the user to ensure known weak spots are in the pool

**No schema changes beyond Phase 1.**

---

### Phase 3: Mastery check + level progression

**Goal:** Detect when `currentCefrLevel` is mastered and advance the user.

Mastery thresholds (consistent with drill effectiveness research):

| Level | Max avg response | Min accuracy | Min attempts |
|-------|-----------------|--------------|-------------|
| A1 | 2,500ms | 90% | 15 |
| A2 | 4,000ms | 85% | 15 |
| B1 | 5,000ms | 80% | 10 |

A query that joins `practiceAttempts → vocabulary` and aggregates by `cefrLevel`:

```typescript
const getCefrMasteryStatus = async (
  userId: number,
  cefrLevel: CefrLevel,
): Promise<{ mastered: boolean; avgMs: number; accuracy: number; attempts: number }>
```

Run this check at session completion. If mastered and the user has been at this level for at least 3 sessions, advance `currentCefrLevel` to the next level.

---

### Phase 4: Seed data gap filling

**Goal:** Fill identified A2 gaps before the drill engine relies on that pool.

Missing A2 verbs (in `learning-sequence.md` but not yet seeded):

- βρίσκω (find), γράφω (write), διαβάζω (read), μαθαίνω (learn/find out)
- Audit full Phase 2 verb list in `learning-sequence.md` against `VERBS` array

Missing A2 adjectives:

- δύσκολος (difficult), εύκολος (easy), ωραίος (nice/beautiful), σίγουρος (sure)

Add to seed files, then run `make db-seed`.

---

## Query stack end-to-end

```text
drill loader
  → getUserProgress(userId)            // Phase 1: get currentCefrLevel
  → getDrillVocab({                    // Phase 2: filtered pool
       userId,
       currentCefrLevel,
       wordTypes,
     })
  → drill questions built from vocab pool
  → practiceAttempts recorded (vocabularyId + timeTaken)
  → weakAreas updated via existing side effect

on session complete:
  → getCefrMasteryStatus(userId, currentCefrLevel)   // Phase 3
  → if mastered: updateUserProgress to next level
```

---

## Existing infrastructure this builds on

| Need | Existing asset |
|------|---------------|
| CEFR field on vocabulary | `vocabulary.cefrLevel` |
| Frequency ranking | `vocabulary.frequencyRank` |
| Per-attempt timing | `practiceAttempts.timeTaken` |
| Per-attempt correctness | `practiceAttempts.isCorrect` |
| Vocabulary → attempt join | `practiceAttempts.vocabularyId` |
| Weak area tracking | `weakAreas` + `applyWeakAreaSideEffect` |
| Item-level SRS (mastered items) | `vocabularySkills` |

---

## Order of work

1. **Phase 4** — fill seed gaps so the A2 pool is usable before the engine relies on it
2. **Phase 1** — schema: `user_progress` table + migration
3. **Phase 2** — weighted drill query using `currentCefrLevel`
4. **Phase 3** — mastery check + level advancement on session complete
