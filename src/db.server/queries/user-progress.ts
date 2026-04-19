import { and, avg, count, eq, isNotNull, sql } from "drizzle-orm";

import { db } from "../index";
import { type CefrLevel, type WordType } from "../enums";
import { practiceAttempts, userProgress, vocabulary } from "../schema";

const NEXT_LEVEL: Partial<Record<CefrLevel, CefrLevel>> = {
	A1: "A2",
	A2: "B1",
	B1: "B2",
	B2: "C1",
	C1: "C2",
};

const MASTERY_THRESHOLDS: Partial<
	Record<CefrLevel, { maxAvgMs: number; minAccuracy: number; minAttempts: number }>
> = {
	A1: { maxAvgMs: 2500, minAccuracy: 0.9, minAttempts: 15 },
	A2: { maxAvgMs: 4000, minAccuracy: 0.85, minAttempts: 15 },
	B1: { maxAvgMs: 5000, minAccuracy: 0.8, minAttempts: 10 },
};

const getUserProgress = async (userId: number) => {
	const row = await db.query.userProgress.findFirst({
		where: { userId },
	});
	return row ?? null;
};

export const ensureUserProgress = async (userId: number) => {
	const existing = await getUserProgress(userId);
	if (existing) return existing;

	const rows = await db
		.insert(userProgress)
		.values({ userId, currentCefrLevel: "A1" })
		.returning();
	const created = rows[0];
	if (!created) throw new Error(`Failed to create user progress for userId ${userId}`);
	return created;
};

interface DrillVocabOptions {
	userId: number;
	currentCefrLevel: CefrLevel;
	wordTypes: WordType[];
	limit?: number;
}

const getDrillVocab = async (opts: DrillVocabOptions) => {
	const { currentCefrLevel, wordTypes, limit = 20 } = opts;
	const nextLevel = NEXT_LEVEL[currentCefrLevel];
	const cefrPool: CefrLevel[] = nextLevel ? [currentCefrLevel, nextLevel] : [currentCefrLevel];

	return await db.query.vocabulary.findMany({
		where: {
			cefrLevel: { in: cefrPool },
			wordType: { in: wordTypes },
		},
		orderBy: {
			cefrLevel: "asc",
			frequencyRank: "asc",
		},
		limit,
	});
};

const getCefrMasteryStatus = async (userId: number, cefrLevel: CefrLevel) => {
	const thresholds = MASTERY_THRESHOLDS[cefrLevel];
	if (!thresholds) {
		return { mastered: false, avgMs: 0, accuracy: 0, attempts: 0 };
	}

	const [result] = await db
		.select({
			attempts: count(),
			avgMs: avg(practiceAttempts.timeTaken),
			correct: sql<number>`sum(case when ${practiceAttempts.isCorrect} = 1 then 1 else 0 end)`,
		})
		.from(practiceAttempts)
		.innerJoin(vocabulary, eq(practiceAttempts.vocabularyId, vocabulary.id))
		.where(
			and(
				eq(practiceAttempts.userId, userId),
				eq(vocabulary.cefrLevel, cefrLevel),
				isNotNull(practiceAttempts.isCorrect),
				isNotNull(practiceAttempts.timeTaken),
			),
		);

	const attempts = result?.attempts ?? 0;
	const avgMs = Number(result?.avgMs ?? 0);
	const correct = result?.correct ?? 0;
	const accuracy = attempts > 0 ? correct / attempts : 0;

	const mastered =
		attempts >= thresholds.minAttempts &&
		avgMs <= thresholds.maxAvgMs &&
		accuracy >= thresholds.minAccuracy;

	return { mastered, avgMs, accuracy, attempts };
};

const advanceUserCefrLevel = async (userId: number) => {
	const progress = await getUserProgress(userId);
	const current = (progress?.currentCefrLevel ?? "A1") as CefrLevel;
	const next = NEXT_LEVEL[current];
	if (!next) return null;

	await db
		.insert(userProgress)
		.values({ userId, currentCefrLevel: next })
		.onConflictDoUpdate({
			target: userProgress.userId,
			set: { currentCefrLevel: next, updatedAt: new Date() },
		});

	return next;
};
