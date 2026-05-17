# Practice Schema Audit

## Tables — status

### ✅ Keep

**`practiceAttempts`** — every column read and written. Core to mastery calculation and analytics.

**`vocabDailyResults`** — first-try result per (user, vocab, drill, day). Core to SRS-lite mastery.

**`vocabMastery`** — tier + nextReviewAt per (user, vocab, drill). Drives pool scheduling in `getDrillVocabPool`.

**`vocabularySkills`** — global SM-2 per (user, vocab, skill type). Drives home dashboard CTAs (`PracticeCTA`, `AllCaughtUpCTA`, `LapsedUserCTA`, `StatsSummary`) via `getSkillStats`/`getItemsDueTomorrow`, and push-notification copy. **Not the same system as `vocabMastery`.** Two intentional scheduling surfaces:

|           | `vocabularySkills`             | `vocabMastery`                           |
| --------- | ------------------------------ | ---------------------------------------- |
| Scope     | Global per vocab               | Per drill                                |
| Algorithm | SM-2 (ease × interval)         | Day-based tiers (3/4, 6/7, 9/10)         |
| Consumer  | Dashboard + push notifications | `getDrillVocabPool` (drill session seed) |

---

### ✅ Cleaned up

**`practiceSessions`** — `sessionType`, `category`, `wordTypeFilter`, `focusArea` were written on every session but never queried back. Dropped from schema, server fn, and drill engine. Only `totalQuestions`, `correctAnswers`, `startedAt`, `completedAt` remain.

**`getPracticeDataFn` + `getItemsDueForReview`** — vestigial from old practice layout (pre-`29c4f95`) that had `/practice/review` and `/practice/vocabulary` tabs. The practice route loader was never cleaned up after those tabs were removed. Both deleted; equivalent data flows through `getDashboardDataFn` and `getProgressDataFn`.

**`weakAreas`** — written on every attempt via `applyWeakAreaSideEffect`, never surfaced to any UI. Removed: table, query file, `lib/weak-area.ts`, side-effect call in `recordAttempt`, `weakAreaType`/`weakAreaIdentifier` from `recordAttemptFn` and all drill engine log payloads.

**`milestonesAchieved`** — API endpoint existed (`/api/milestones`) but had zero UI consumer and zero client POST. Removed: table, query file, API route.

**`areaTypes`/`AreaType`** and **`sessionTypes`/`SessionType`** — removed from `enums.ts` (last consumers gone).

---

### 🚧 Incomplete / placeholder

**`userProgress.currentCefrLevel`** — always "A1". Read by pool queries (cases/noun/verbs server fns) via `adjacentCefrPool` but never updated — no CEFR progression mechanism exists. Kept as placeholder; wire up advancement logic when curriculum progression is built.

---

## Action order — completed

1. ~~Trace `getItemsDueForReview` — live or dead?~~ Dead caller only. Removed.
2. ~~Remove `getPracticeDataFn` + `getItemsDueForReview`~~
3. ~~Remove `weakAreas` + `applyWeakAreaSideEffect`~~
4. ~~Drop stale `practiceSessions` columns~~
5. ~~Remove `milestonesAchieved`~~
6. Decide `userProgress` fate — kept as placeholder.

## Pending

- Run `make db-push` after reviewing the generated migration SQL.
