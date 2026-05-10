import { Outlet, createFileRoute, redirect } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

import { getDrillStats } from "@/db.server/queries/analytics/drill-stats";
import { listCompletedPracticeSessionsForStreak } from "@/db.server/queries/practice-sessions";
import { getUserById } from "@/db.server/queries/users";
import { getNewVocabularyItems } from "@/db.server/queries/vocabulary";
import { getItemsDueForReview, getSkillStats } from "@/db.server/queries/vocabulary-skills";
import { streakLengthFromCompletedSessionDates } from "@/lib/practice-streak";
import { fromEpochSeconds, toEpochSeconds } from "@/lib/time";
import { requireAuth } from "@/lib/auth-session.server";

type PracticeStats = Awaited<ReturnType<typeof getSkillStats>> & { streak: number };
export type PracticeData = {
	reviewItems: { id: number; greekText: string; englishTranslation: string }[];
	newVocabItems: Awaited<ReturnType<typeof getNewVocabularyItems>>;
	stats: PracticeStats;
	userId: number;
	userName: string | null;
	drillStats: DrillStatSerialized[];
};
export type DrillStatSerialized = {
	drillId: string;
	attempts: number;
	correct: number;
	accuracy: number;
	avgTimeMs: number | null;
	lastAttemptAt: number | null;
};

const getPracticeStats = async (userId: number): Promise<PracticeStats> => {
	const [skill, completedSessions] = await Promise.all([
		getSkillStats(userId),
		listCompletedPracticeSessionsForStreak(userId),
	]);
	const completedDates = completedSessions.map((s) => fromEpochSeconds(s.completedAt!));
	return { ...skill, streak: streakLengthFromCompletedSessionDates(completedDates) };
};

export const getPracticeDataFn = createServerFn({ method: "GET" })
	.inputValidator(z.object({ limit: z.number().default(20) }))
	.handler(async ({ data }) => {
		const { userId } = requireAuth();
		const limit = data.limit;
		const [user, reviews, newItems, practiceStats, drills] = await Promise.all([
			getUserById(userId),
			getItemsDueForReview(userId, "recognition", limit),
			getNewVocabularyItems(userId, 20),
			getPracticeStats(userId),
			getDrillStats(userId),
		]);
		return {
			reviewItems: reviews.map((r) => ({
				id: r.vocabularyId,
				greekText: r.vocabulary?.greekText ?? "",
				englishTranslation: r.vocabulary?.englishTranslation ?? "",
			})),
			newVocabItems: newItems,
			stats: practiceStats,
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

export const Route = createFileRoute("/practice/_layout")({
	beforeLoad: async ({ context }) => {
		if (!context.auth?.userId) throw redirect({ to: "/" });
	},
	loader: async ({ location }) => {
		const limitParam = new URLSearchParams(location.search).get("limit");
		const limit = limitParam ? Math.min(Math.max(parseInt(limitParam, 10), 1), 100) : 20;
		return getPracticeDataFn({ data: { limit } });
	},
	component: () => <Outlet />,
});
