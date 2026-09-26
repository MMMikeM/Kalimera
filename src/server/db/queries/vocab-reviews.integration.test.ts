import { beforeAll, describe, expect, it, vi } from "vitest";

import { users, vocabProgress, vocabulary } from "@/server/db/schema";
import { createTestDb, runMigrations } from "@/test/db";
import { seedTestUser } from "@/test/seed-verbs";

let testDb: ReturnType<typeof createTestDb>["db"];

vi.mock("@/server/db", () => ({
	get db() {
		return testDb;
	},
}));

const { getReviewStats } = await import("./vocab-reviews");

beforeAll(async () => {
	testDb = createTestDb().db;
	await runMigrations(testDb);
	await seedTestUser(testDb);
	await testDb.insert(users).values({ id: 2, code: "idle", displayName: "Idle User" });
	const words = await testDb
		.insert(vocabulary)
		.values(
			["σπίτι", "νερό", "ψωμί", "δρόμος"].map((greekText) => ({
				greekText,
				englishTranslation: greekText,
				wordType: "noun" as const,
			})),
		)
		.returning({ id: vocabulary.id });
	await testDb.insert(vocabProgress).values([
		{ userId: 1, vocabId: words[0]!.id, intervalDays: 30, nextReviewAt: "2000-01-01T00:00:00Z" },
		{ userId: 1, vocabId: words[1]!.id, intervalDays: 2, nextReviewAt: "2999-01-01T00:00:00Z" },
	]);
}, 60_000);

describe("getReviewStats", () => {
	it("counts mastered, due, learned and unseen words as numbers", async () => {
		await expect(getReviewStats(1)).resolves.toEqual({
			itemsMastered: 1,
			dueCount: 1,
			totalLearned: 2,
			newAvailable: 2,
		});
	});

	it("returns zeros for a user with no reviews", async () => {
		await expect(getReviewStats(2)).resolves.toEqual({
			itemsMastered: 0,
			dueCount: 0,
			totalLearned: 0,
			newAvailable: 4,
		});
	});
});
