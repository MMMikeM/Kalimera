import { sql } from "drizzle-orm";

import { NEXT_LEVEL } from "@/lib/cefr";

import type { CefrLevel, WordType } from "../enums";
import { db } from "../index";

const DEFAULT_POOL_SIZE = 10;
const ATTEMPT_WINDOW = 4;
const MASTERY_THRESHOLD = 3;

interface DrillPoolOptions {
	userId: number;
	drillId: string;
	wordType: WordType | WordType[];
	cefrPool: CefrLevel[];
	poolSize?: number;
}

interface DrillPoolResult {
	vocabularyIds: number[];
	masteredIds: Set<number>;
}

/**
 * Rolling vocab pool for DB-driven drills.
 *
 * Mastery rule: ≥3 correct in last 4 attempts on this lemma in this drill.
 * Mastered lemmas exit the pool; the next-frequency lemma enters in their place.
 *
 * Pool ordering: cefrLevel ASC, frequencyRank ASC. A1 must exhaust before A2 enters.
 *
 * NOTE: mastery aggregates across all persons/forms of a lemma. A learner who only
 * ever sees sg1 four times can theoretically master a verb. Acceptable for v1 —
 * shuffle distribution makes this unlikely in practice.
 */
const getDrillVocabPool = async (opts: DrillPoolOptions): Promise<DrillPoolResult> => {
	const poolSize = opts.poolSize ?? DEFAULT_POOL_SIZE;
	const wordTypes = Array.isArray(opts.wordType) ? opts.wordType : [opts.wordType];

	const candidates = await db.query.vocabulary.findMany({
		where: {
			wordType: { in: wordTypes },
			cefrLevel: { in: opts.cefrPool },
		},
		columns: { id: true },
		orderBy: (t) =>
			sql`${t.cefrLevel} asc, CASE WHEN ${t.frequencyRank} IS NULL THEN 999999 ELSE ${t.frequencyRank} END asc`,
		limit: poolSize * 4,
	});

	if (candidates.length === 0) {
		return { vocabularyIds: [], masteredIds: new Set() };
	}

	const candidateIds = candidates.map((c) => c.id);

	const attempts = await db.query.practiceAttempts.findMany({
		where: {
			userId: opts.userId,
			drillId: opts.drillId,
			vocabularyId: { in: candidateIds },
		},
		columns: { vocabularyId: true, isCorrect: true, attemptedAt: true },
		orderBy: { attemptedAt: "desc" },
	});

	const recentByVocab = new Map<number, boolean[]>();
	for (const a of attempts) {
		if (a.vocabularyId == null) continue;
		const list = recentByVocab.get(a.vocabularyId) ?? [];
		if (list.length < ATTEMPT_WINDOW) {
			list.push(Boolean(a.isCorrect));
			recentByVocab.set(a.vocabularyId, list);
		}
	}

	const masteredIds = new Set<number>();
	for (const [vocabId, last] of recentByVocab) {
		const correct = last.filter(Boolean).length;
		if (correct >= MASTERY_THRESHOLD) masteredIds.add(vocabId);
	}

	const active: number[] = [];
	for (const id of candidateIds) {
		if (masteredIds.has(id)) continue;
		active.push(id);
		if (active.length >= poolSize) break;
	}

	return { vocabularyIds: active, masteredIds };
};

/**
 * Pool with CEFR-bump fallback. If the active pool is empty (every candidate in the
 * current cefrPool is mastered), bump one level up and retry. If still empty after
 * bumping through to C2, fall back to the most-recently-mastered lemmas at the
 * highest cefr we tried — gives the learner a refresh deck rather than nothing.
 */
export const getDrillVocabPoolWithFallback = async (
	opts: DrillPoolOptions,
): Promise<DrillPoolResult> => {
	let cefrPool = opts.cefrPool;
	let lastResult: DrillPoolResult = { vocabularyIds: [], masteredIds: new Set() };

	for (let i = 0; i < 6; i++) {
		const result = await getDrillVocabPool({ ...opts, cefrPool });
		if (result.vocabularyIds.length > 0) return result;
		lastResult = result;

		const top = cefrPool[cefrPool.length - 1];
		const next = top ? NEXT_LEVEL[top] : undefined;
		if (!next) break;
		cefrPool = [...cefrPool, next];
	}

	if (lastResult.masteredIds.size > 0) {
		const mastered = Array.from(lastResult.masteredIds).slice(
			0,
			opts.poolSize ?? DEFAULT_POOL_SIZE,
		);
		return { vocabularyIds: mastered, masteredIds: lastResult.masteredIds };
	}

	return lastResult;
};
