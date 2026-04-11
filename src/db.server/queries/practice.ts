/**
 * Practice-related queries split by table (`vocabulary-skills`, `weak-areas`, `practice-sessions`,
 * `practice-attempts`, `vocabulary`). Re-exported here so existing imports stay stable.
 */

export {
	applyVocabularySkillSideEffect,
	getItemsDueForReview,
	getItemsDueTomorrow,
	getPracticeStats,
	getVocabularyProgress,
} from "./vocabulary-skills";
export { getWeakAreas } from "./weak-areas";
export { getNewVocabularyItems } from "./vocabulary";
export {
	completeSession,
	getCompletedPracticeAtDatesForStreak,
	getLastPracticeDate,
	startSession,
	type CompleteSessionInput,
	type CompleteSessionPatch,
	type PracticeSessionInsert,
	type StartSessionInput,
} from "./practice-sessions";
export {
	recordAttempt,
	recordAttemptInputSchema,
	type PracticeAttemptInsert,
	type RecordAttemptInput,
} from "./practice-attempts";

import type { Vocabulary } from "../types";
import { getPracticeStats, getVocabularyProgress } from "./vocabulary-skills";
import { getWeakAreas } from "./weak-areas";

export type PracticeStats = Awaited<ReturnType<typeof getPracticeStats>>;
export type VocabularyProgress = Awaited<ReturnType<typeof getVocabularyProgress>>;
/** Drill list row: always vocabulary id + text fields (review loader maps skill rows onto this shape). */
export type VocabItemWithSkill = Pick<Vocabulary, "id" | "greekText" | "englishTranslation">;
export type WeakAreaInfo = Awaited<ReturnType<typeof getWeakAreas>>[number];
