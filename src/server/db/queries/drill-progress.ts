import { nowInstant, nowIso, toISOString } from "@/lib/time";

import { db } from "../index";
import { drillProgress } from "../schema";

const MASTERY_WINDOWS = [4, 7, 10, 10] as const;
const MASTERY_THRESHOLDS = [3, 6, 9, 9] as const;
const MASTERY_INTERVAL_DAYS = [3, 6, 9, 9] as const;
// While window isn't full yet, schedule next review for tomorrow so the word
// doesn't flood every session until the promotion window fills.
const LEARNING_INTERVAL_DAYS = 1;

/**
 * Promote drill mastery tier for each practiced vocab if windowed accuracy threshold is met.
 * Called once per session after daily results are written.
 */
export const promoteDrillProgress = async ({
	userId,
	drillId,
	practicedIds,
}: {
	userId: number;
	drillId: string;
	practicedIds: number[];
}) => {
	if (practicedIds.length === 0) return;

	const [allDailyRows, progressRows] = await Promise.all([
		db.query.drillDailyResults.findMany({
			where: { userId, drillId, vocabId: { in: practicedIds } },
			columns: { vocabId: true, practicedDate: true, correctFirstTry: true },
			orderBy: { practicedDate: "desc" },
		}),
		db.query.drillProgress.findMany({
			where: { userId, drillId, vocabId: { in: practicedIds } },
			columns: { vocabId: true, tier: true },
		}),
	]);

	const dailyByVocab = new Map<number, typeof allDailyRows>();
	for (const row of allDailyRows) {
		const list = dailyByVocab.get(row.vocabId) ?? [];
		list.push(row);
		dailyByVocab.set(row.vocabId, list);
	}
	const progressByVocab = new Map(progressRows.map((p) => [p.vocabId, p]));
	const now = nowIso();

	const upsertTier = async (vocabId: number, newTier: number, intervalDays?: number) => {
		const days = intervalDays ?? MASTERY_INTERVAL_DAYS[Math.min(newTier, 3) as 0 | 1 | 2 | 3]!;
		const nextReviewAt = toISOString(nowInstant().add({ hours: days * 24 }));
		await db
			.insert(drillProgress)
			.values({ userId, vocabId, drillId, tier: newTier, masteredAt: now, nextReviewAt })
			.onConflictDoUpdate({
				target: [drillProgress.userId, drillProgress.vocabId, drillProgress.drillId],
				set: { tier: newTier, masteredAt: now, nextReviewAt },
			});
	};

	for (const vocabId of practicedIds) {
		const currentTier = progressByVocab.get(vocabId)?.tier ?? 0;
		const recentRows = (dailyByVocab.get(vocabId) ?? []).slice(0, 3);

		// Demotion: tier ≥ 2 and 2+ wrong in last 3 days → drop a tier
		if (currentTier >= 2 && recentRows.length >= 3) {
			const wrongs = recentRows.filter((r) => !r.correctFirstTry).length;
			if (wrongs >= 2) {
				await upsertTier(vocabId, currentTier - 1);
				continue;
			}
		}

		// Promotion: windowed accuracy threshold
		const tierIdx = Math.min(currentTier, 3) as 0 | 1 | 2 | 3;
		const window = MASTERY_WINDOWS[tierIdx]!;
		const threshold = MASTERY_THRESHOLDS[tierIdx]!;
		const rows = (dailyByVocab.get(vocabId) ?? []).slice(0, window);
		if (rows.length < window) {
			// Window not full — come back tomorrow to keep building the window.
			await upsertTier(vocabId, currentTier, LEARNING_INTERVAL_DAYS);
			continue;
		}
		const correctCount = rows.filter((r) => r.correctFirstTry).length;
		if (correctCount < threshold) {
			// Window full but threshold not met — keep tier, retry tomorrow.
			await upsertTier(vocabId, currentTier, LEARNING_INTERVAL_DAYS);
			continue;
		}
		await upsertTier(vocabId, Math.min(currentTier + 1, 3));
	}
};
