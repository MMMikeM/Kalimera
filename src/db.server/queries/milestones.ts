import { eq } from "drizzle-orm";
import { db } from "../index";
import { milestonesAchieved } from "../schema";
import type { MilestoneAchieved } from "../types";

export type UserMilestone = Pick<
	MilestoneAchieved,
	"milestone" | "achievedAt" | "streakAtAchievement"
>;

export const getUserMilestones = async (
	userId: number,
): Promise<UserMilestone[]> => {
	return db.query.milestonesAchieved.findMany({
		where: { userId },
		columns: { milestone: true, achievedAt: true, streakAtAchievement: true },
		orderBy: { milestone: "asc" },
	});
};

export const recordMilestone = async (
	userId: number,
	milestone: number,
	streak: number,
): Promise<MilestoneAchieved | null> => {
	const [row] = await db
		.insert(milestonesAchieved)
		.values({
			userId,
			milestone,
			streakAtAchievement: streak,
		})
		.onConflictDoNothing()
		.returning();

	return row ?? null;
};
