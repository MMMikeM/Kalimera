import { createInsertSchema } from "drizzle-orm/zod";
import type z from "zod/v4";

import { db } from "../index";
import { milestonesAchieved } from "../schema";

const milestoneAchievedInsertSchema = createInsertSchema(milestonesAchieved);
export type MilestoneAchievedInsert = z.infer<typeof milestoneAchievedInsertSchema>;

export const getUserMilestones = async (userId: number) => {
	return await db.query.milestonesAchieved.findMany({
		where: { userId },
		columns: { milestone: true, achievedAt: true, streakAtAchievement: true },
		orderBy: { milestone: "asc" },
	});
};

export const recordMilestone = async (data: MilestoneAchievedInsert) => {
	const [row] = await db.insert(milestonesAchieved).values(data).onConflictDoNothing().returning();

	return row;
};
