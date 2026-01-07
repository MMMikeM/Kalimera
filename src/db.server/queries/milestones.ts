import { eq } from "drizzle-orm";
import { db } from "../index";
import { milestonesAchieved } from "../schema";
import type { MilestoneAchieved } from "../types";

export type UserMilestone = Pick<MilestoneAchieved, "milestone" | "achievedAt" | "streakAtAchievement">;

export const getUserMilestones = async (userId: number): Promise<UserMilestone[]> => {
	const results = await db
		.select({
			milestone: milestonesAchieved.milestone,
			achievedAt: milestonesAchieved.achievedAt,
			streakAtAchievement: milestonesAchieved.streakAtAchievement,
		})
		.from(milestonesAchieved)
		.where(eq(milestonesAchieved.userId, userId))
		.orderBy(milestonesAchieved.milestone);

	return results;
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
