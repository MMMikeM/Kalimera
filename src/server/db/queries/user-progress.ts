import { db } from "../index";
import { userProgress } from "../schema";

export const ensureUserProgress = async (userId: number) => {
	const existing = await db.query.userProgress.findFirst({ where: { userId } });
	if (existing) return existing;

	const rows = await db.insert(userProgress).values({ userId, currentCefrLevel: "A1" }).returning();
	const created = rows[0];
	if (!created) throw new Error(`Failed to create user progress for userId ${userId}`);
	return created;
};
