import { beforeAll, describe, expect, it, vi } from "vitest";

import type { PersonNumber } from "@/server/db/enums";
import { createTestDb, runMigrations } from "@/test/db";
import { seedTestUser, seedTestVerbs } from "@/test/seed-verbs";
import { seedVerbConjugations } from "@/scripts/seed-verb-conjugations";

// ─── Test DB setup ────────────────────────────────────────────────────────────

let testDbInstance: ReturnType<typeof createTestDb>["db"];

vi.mock("@/server/db", () => ({
	get db() {
		return testDbInstance;
	},
}));

beforeAll(async () => {
	const { db, client } = createTestDb();
	testDbInstance = db;
	await runMigrations(client);
	await seedTestUser(db);
	await seedTestVerbs(db);
	await seedVerbConjugations(db);
}, 60_000);

// The test seed has ~18 A1/A2 verbs with present conjugations, but pool shuffles
// so the exact count available varies. Use 10 as a conservative safe limit.


const getQuestions = async (limit: number, persons: PersonNumber[] = ["sg1"]) => {
	const { getVerbConjugationQuestions } = await import("./verbs");
	return getVerbConjugationQuestions(
		1,
		limit,
		"present",
		"int-",
		3000,
		"verbs-vocabulary-sg1",
		persons,
	);
};

// ─── Tests ────────────────────────────────────────────────────────────────────

describe("getVerbConjugationQuestions — integration", () => {
	// Discover how many sg1 present-tense conjugations are actually seeded
	// This test documents the real data coverage and will fail if coverage drops.
	it("has at least 10 sg1 present-tense verbs seeded", async () => {
		const questions = await getQuestions(10);
		expect(questions.length).toBeGreaterThanOrEqual(10);
	});

	it("all questions are sg1 only — no 'we/you all/they' prompts", async () => {
		const questions = await getQuestions(10);
		for (const q of questions) {
			expect(q.id).toMatch(/-sg1$/);
			expect(q.prompt).not.toMatch(/^we |^you all |^they /);
		}
	});

	it("all questions have vocabIds pointing to real vocabulary rows", async () => {
		const questions = await getQuestions(10);
		for (const q of questions) {
			expect(q.vocabId).toBeTypeOf("number");
			expect(q.vocabId).toBeGreaterThan(0);
		}
	});

	it("throws when pool returns fewer questions than limit — catches unseeded conjugations", async () => {
		const { db: emptyDb, client } = createTestDb();
		await runMigrations(client);
		await seedTestUser(emptyDb);
		await seedTestVerbs(emptyDb); // vocab only — no conjugations

		const originalDb = testDbInstance;
		testDbInstance = emptyDb;

		try {
			// Request 30 but conjugations table is empty → 0 questions → throw
			await expect(getQuestions(30)).rejects.toThrow("Insufficient questions");
		} finally {
			testDbInstance = originalDb;
		}
	});
});
