# CEFR progression: the open work

What remains of the April 2026 CEFR plan. The pool side is built; nothing yet moves a learner up a level.

## What exists

- `user_progress.current_cefr_level` (`src/server/db/schema-practice.ts`), created at A1 by `ensureUserProgress` (`src/server/db/queries/user-progress.ts`). Nothing ever raises it.
- The drill pool is the current level plus the next (`adjacentCefrPool` in `src/lib/cefr.ts`, used by `src/server/db/queries/drill-pool.ts`), ordered by `frequencyRank` within a level.
- Seed data covers A1 and A2 well enough for that pool to be usable.

## What to build: mastery check and level advancement

Run a check when a session completes (`completeSession` in `src/server/db/queries/practice-sessions.ts`, reached through `completeSessionFn`). Aggregate the learner's attempts on vocabulary at their current level, joining `practice_attempts` to `vocabulary` and grouping by `cefrLevel`:

```typescript
const getCefrMasteryStatus = async (
	userId: number,
	cefrLevel: CefrLevel,
): Promise<{ mastered: boolean; avgMs: number; accuracy: number; attempts: number }>
```

| Level | Max avg response | Min accuracy | Min attempts |
| ----- | ---------------- | ------------ | ------------ |
| A1    | 2,500 ms         | 90%          | 15           |
| A2    | 4,000 ms         | 85%          | 15           |
| B1    | 5,000 ms         | 80%          | 10           |

If the level is mastered and the learner has spent at least three sessions at it, advance `current_cefr_level` by one. The pool then becomes the new level plus the one above; the mastered level leaves rotation, and item-level spacing (`vocabulary_progress`) keeps reviewing its words.

## Constraints

- CEFR levels are internal. Never show a level label or badge to the learner.
- The transition is silent. No modal, no celebration; a progress page may state the facts if the learner goes looking.
- The mix shifts gradually rather than jumping: more of the new level each day, not a cliff.

## Known limits

- Morphological difficulty isn't captured: a consonant-stem noun is harder than an ο-stem at the same level.
- A verb's level is per lemma, not per tense; the aorist of an A1 verb is harder than its present.
