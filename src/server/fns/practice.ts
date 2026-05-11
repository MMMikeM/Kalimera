import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

import { streakLengthFromCompletedSessionDates } from "@/lib/practice-streak";
import { fromEpochSeconds, toEpochSeconds } from "@/lib/time";
import { requireAuth } from "@/server/auth/session";
import { getDrillStats } from "@/server/db/queries/analytics/drill-stats";
import { listCompletedPracticeSessionsForStreak } from "@/server/db/queries/practice-sessions";
import { getUserById } from "@/server/db/queries/users";
import { getNewVocabularyItems } from "@/server/db/queries/vocabulary";
import { getItemsDueForReview, getSkillStats } from "@/server/db/queries/vocabulary-skills";

export const getPracticeDataFn = createServerFn({ method: "GET" })
	.inputValidator(z.object({ limit: z.number().default(20) }))
	.handler(async ({ data }) => {
		const { userId } = requireAuth();
		const limit = data.limit;
		const [user, reviews, newItems, drills, skill, completedSessions] = await Promise.all([
			getUserById(userId),
			getItemsDueForReview(userId, "recognition", limit),
			getNewVocabularyItems(userId, 20),
			getDrillStats(userId),
			getSkillStats(userId),
			listCompletedPracticeSessionsForStreak(userId),
		]);
		const completedDates = completedSessions.map((s) => fromEpochSeconds(s.completedAt!));
		const stats = { ...skill, streak: streakLengthFromCompletedSessionDates(completedDates) };

		return {
			reviewItems: reviews.map((r) => ({
				id: r.vocabularyId,
				greekText: r.vocabulary?.greekText ?? "",
				englishTranslation: r.vocabulary?.englishTranslation ?? "",
			})),
			newVocabItems: newItems,
			stats,
			userId,
			userName: user?.displayName ?? null,
			drillStats: drills.map((d) => ({
				drillId: d.drillId,
				attempts: d.attempts,
				correct: d.correct,
				accuracy: d.accuracy,
				avgTimeMs: d.avgTimeMs,
				lastAttemptAt: d.lastAttemptAt ? toEpochSeconds(d.lastAttemptAt) : null,
			})),
		};
	});
