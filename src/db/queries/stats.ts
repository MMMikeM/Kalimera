import { count } from "drizzle-orm";
import { db } from "../index";
import { users, vocabulary } from "../schema";

/**
 * Get app-wide statistics for the home page.
 */
export async function getAppStats() {
	const [userCount] = await db.select({ count: count() }).from(users);
	const [vocabCount] = await db.select({ count: count() }).from(vocabulary);

	return {
		users: userCount?.count ?? 0,
		vocabulary: vocabCount?.count ?? 0,
	};
}

/** Type for app statistics */
export type AppStats = Awaited<ReturnType<typeof getAppStats>>;
