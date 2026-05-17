import { nowInstant, toEpochSeconds } from "@/lib/time";

import { db } from "../index";
import { practiceAttempts } from "../schema";
import { applyReviewStateAfterAttempt } from "./vocab-reviews";

const DRILL_RUST_WINDOW = 10;
const DRILL_RUST_THRESHOLD = 2;

export interface DrillRust {
	drillId: string;
	lastPracticedAt: number;
	daysSince: number;
	recentAccuracy: number;
	avgTime: number;
	rustScore: number;
}

export const RUST_THRESHOLD_VALUE = DRILL_RUST_THRESHOLD;

export const getSchemaRust = async (userId: number): Promise<DrillRust[]> => {
	const rows = await db.query.practiceAttempts.findMany({
		columns: {
			drillId: true,
			isCorrect: true,
			timeTaken: true,
			attemptedAt: true,
		},
		where: {
			userId,
			drillId: { isNotNull: true },
		},
		orderBy: { attemptedAt: "desc" },
		limit: 500,
	});

	const byDrill = new Map<string, typeof rows>();
	for (const row of rows) {
		if (!row.drillId) continue;
		const list = byDrill.get(row.drillId) ?? [];
		if (list.length < DRILL_RUST_WINDOW) {
			list.push(row);
			byDrill.set(row.drillId, list);
		}
	}

	const nowSec = toEpochSeconds(nowInstant());

	return [...byDrill.entries()]
		.map(([drillId, attempts]) => {
			const lastPracticedAt = attempts[0]!.attemptedAt!;
			const daysSince = (nowSec - lastPracticedAt) / 86400;
			const correctCount = attempts.filter((a) => a.isCorrect).length;
			const recentAccuracy = attempts.length > 0 ? correctCount / attempts.length : 0;
			const avgTime = attempts.reduce((s, a) => s + (a.timeTaken ?? 0), 0) / attempts.length;
			const rustScore = Math.max(0, daysSince - 1) + (1 - recentAccuracy) * 10;
			return { drillId, lastPracticedAt, daysSince, recentAccuracy, avgTime, rustScore };
		})
		.sort((a, b) => b.rustScore - a.rustScore);
};

type RecordAttemptInput = typeof practiceAttempts.$inferInsert;

export const recordAttempt = async (input: RecordAttemptInput) => {
	return await db.transaction(async (tx) => {
		const [attempt] = await tx.insert(practiceAttempts).values(input).returning();

		if (input.vocabId) {
			await applyReviewStateAfterAttempt(tx, {
				userId: input.userId,
				vocabId: input.vocabId,
				isCorrect: Boolean(input.isCorrect),
				timeTaken: input.timeTaken ?? 0,
			});
		}

		return attempt;
	});
};

export const listSessionVocabAttempts = async (sessionId: number) => {
	return await db.query.practiceAttempts.findMany({
		where: { sessionId, vocabId: { isNotNull: true } },
		columns: { vocabId: true, isCorrect: true, attemptedAt: true, drillId: true },
		orderBy: { attemptedAt: "asc" },
	});
};
