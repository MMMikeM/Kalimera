import { beforeEach, describe, expect, it, vi } from "vite-plus/test";

import type { DrillBucket } from "@/lib/drill/types";
import { typedEntries } from "@/lib/object";
import { getDrillVocabPool } from "@/server/db/queries/drill-pool";
import {
	type VerbWithConjugations,
	getVerbsWithConjugationsForTense,
} from "@/server/db/queries/vocabulary";

import { type ConjugationDrill, getVerbConjugationQuestions } from "./verbs.server";

// ─── Mocks (hoisted by Vitest — order relative to imports doesn't matter) ─────

vi.mock("@/server/db/queries/drill-pool", () => ({
	getDrillVocabPool: vi.fn(),
}));

vi.mock("@/server/db/queries/vocabulary", () => ({
	getVerbsWithConjugationsForTense: vi.fn(),
}));

// ─── Helpers ──────────────────────────────────────────────────────────────────

const ALL_PERSONS = ["sg1", "sg2", "sg3", "pl1", "pl2", "pl3"];

const mockBuckets = (buckets: Partial<Record<DrillBucket, number[]>>) => {
	const entries = typedEntries(buckets).map(([bucket, ids = []]) => [bucket, ids] as const);
	vi.mocked(getDrillVocabPool).mockResolvedValue({
		allIds: entries.flatMap(([, ids]) => ids),
		bucketMap: new Map(entries.flatMap(([bucket, ids]) => ids.map((id) => [id, bucket] as const))),
	});
};

const mockPool = (ids: number[]) => mockBuckets({ new: ids });

const ask = (limit: number, kind: ConjugationDrill["kind"], tense: ConjugationDrill["tense"] = "present") =>
	getVerbConjugationQuestions(1, "test-drill", limit, { tense, idPrefix: "pfx-", kind });

const mockVerb = (
	id: number,
	english: string,
	persons: string[] = ALL_PERSONS,
): VerbWithConjugations =>
	({
		id,
		englishTranslation: english,
		cefrLevel: "A1",
		frequencyRank: 100,
		verbConjugations: persons.map((person) => ({
			id: id * 100 + persons.indexOf(person),
			vocabId: id,
			person: person as VerbWithConjugations["verbConjugations"][number]["person"],
			form: `form-${id}-${person}`,
			tense: "present" as const,
			stem: null,
		})),
	}) as VerbWithConjugations;

// 30 generic verbs — enough to satisfy the default limit
const VERB_POOL = Array.from({ length: 30 }, (_, i) => mockVerb(i + 1, `I verb${i + 1}`));
const VERB_POOL_IDS = VERB_POOL.map((v) => v.id);

const useFullPool = () => {
	mockPool(VERB_POOL_IDS);
	vi.mocked(getVerbsWithConjugationsForTense).mockResolvedValue(VERB_POOL);
};

// ─── Tests ────────────────────────────────────────────────────────────────────

describe("getVerbConjugationQuestions", () => {
	beforeEach(() => vi.clearAllMocks());

	describe("kind", () => {
		it("vocabulary asks only for the first person", async () => {
			useFullPool();
			const questions = await ask(30, "vocabulary");
			expect(questions).toHaveLength(30);
			for (const q of questions) expect(q.id).toMatch(/-sg1$/);
		});

		it("conjugation asks for the five other persons of each verb", async () => {
			mockBuckets({ inProgress: VERB_POOL_IDS });
			vi.mocked(getVerbsWithConjugationsForTense).mockResolvedValue(VERB_POOL);
			const questions = await ask(30, "conjugation");
			expect(questions).toHaveLength(30 * 5);
			for (const q of questions) expect(q.id).not.toMatch(/-sg1$/);
		});
	});

	describe("prompts", () => {
		it("vocabulary prompts with the English meaning", async () => {
			useFullPool();
			const questions = await ask(30, "vocabulary");
			expect(questions[0]!.prompt).toBe("I verb1");
		});

		it("future vocabulary turns 'I am' into 'I will be'", async () => {
			const pool = [...VERB_POOL];
			pool[0] = mockVerb(1, "I am tired");
			mockPool(VERB_POOL_IDS);
			vi.mocked(getVerbsWithConjugationsForTense).mockResolvedValue(pool);

			const questions = await ask(30, "vocabulary", "future");
			expect(questions[0]!.prompt).toBe("I will be tired");
		});

		it("conjugation prompts with the Greek first person and the pronoun, never the English", async () => {
			useFullPool();
			const questions = await ask(30, "conjugation");
			const pl2 = questions.find((q) => q.id === "pfx-1-pl2");
			expect(pl2!.prompt).toBe("form-1-sg1 → you all");
		});
	});

	describe("met verbs first", () => {
		it("conjugation leaves out unmet verbs when met ones fill the pool", async () => {
			mockBuckets({ inProgress: VERB_POOL_IDS.slice(0, 10), new: VERB_POOL_IDS.slice(10) });
			vi.mocked(getVerbsWithConjugationsForTense).mockResolvedValue(VERB_POOL);

			const questions = await ask(30, "conjugation");
			expect(questions).toHaveLength(10 * 5);
			for (const q of questions) expect(q.bucket).toBe("inProgress");
		});

		it("conjugation tops up with unmet verbs only as far as the limit", async () => {
			mockBuckets({ inProgress: [1, 2], new: VERB_POOL_IDS.slice(2) });
			vi.mocked(getVerbsWithConjugationsForTense).mockResolvedValue(VERB_POOL);

			const questions = await ask(30, "conjugation");
			expect(questions).toHaveLength(30);
			expect(questions.filter((q) => q.bucket === "inProgress")).toHaveLength(10);
		});
	});

	describe("bucket assignment", () => {
		it("questions inherit bucket from pool", async () => {
			const rest = VERB_POOL_IDS.slice(2);
			mockBuckets({
				tier1: [1],
				tier2: [2],
				tier3: [],
				inProgress: rest,
				new: [],
			});
			vi.mocked(getVerbsWithConjugationsForTense).mockResolvedValue(VERB_POOL);

			const questions = await ask(30, "vocabulary");
			const buckets = Object.fromEntries(questions.map((q) => [q.vocabId, q.bucket]));
			expect(buckets[1]).toBe("tier1");
			expect(buckets[2]).toBe("tier2");
			expect(buckets[3]).toBe("inProgress");
		});
	});

	describe("pool composition", () => {
		it("only new bucket — returns questions for all new words", async () => {
			mockPool(VERB_POOL_IDS);
			vi.mocked(getVerbsWithConjugationsForTense).mockResolvedValue(VERB_POOL);

			const questions = await ask(30, "vocabulary");
			expect(questions).toHaveLength(30);
			for (const q of questions) expect(q.bucket).toBe("new");
		});

		it("only inProgress bucket — returns questions for all inProgress words", async () => {
			mockBuckets({
				tier1: [],
				tier2: [],
				tier3: [],
				inProgress: VERB_POOL_IDS,
				new: [],
			});
			vi.mocked(getVerbsWithConjugationsForTense).mockResolvedValue(VERB_POOL);

			const questions = await ask(30, "vocabulary");
			expect(questions).toHaveLength(30);
			for (const q of questions) expect(q.bucket).toBe("inProgress");
		});

		it("only tier buckets (SRS review session) — returns questions with correct bucket labels", async () => {
			const tier1Ids = VERB_POOL_IDS.slice(0, 10);
			const tier2Ids = VERB_POOL_IDS.slice(10, 20);
			const tier3Ids = VERB_POOL_IDS.slice(20, 30);
			mockBuckets({
				tier1: tier1Ids,
				tier2: tier2Ids,
				tier3: tier3Ids,
				inProgress: [],
				new: [],
			});
			vi.mocked(getVerbsWithConjugationsForTense).mockResolvedValue(VERB_POOL);

			const questions = await ask(30, "vocabulary");
			expect(questions).toHaveLength(30);
			const buckets = questions.map((q) => q.bucket);
			expect(buckets.filter((b) => b === "tier1")).toHaveLength(10);
			expect(buckets.filter((b) => b === "tier2")).toHaveLength(10);
			expect(buckets.filter((b) => b === "tier3")).toHaveLength(10);
		});

		it("all buckets empty — throws", async () => {
			mockBuckets({
				tier1: [],
				tier2: [],
				tier3: [],
				inProgress: [],
				new: [],
			});
			vi.mocked(getVerbsWithConjugationsForTense).mockResolvedValue([]);

			await expect(ask(30, "vocabulary")).rejects.toThrow("Insufficient questions");
		});
	});

	describe("insufficient questions", () => {
		it("throws when questions returned < limit", async () => {
			mockPool([1, 2]); // pool returns 2 IDs
			vi.mocked(getVerbsWithConjugationsForTense).mockResolvedValue([
				mockVerb(1, "I want", ["sg1"]),
				mockVerb(2, "I have", ["sg1"]),
			]);

			// limit=10, only 2 questions produced → throw
			await expect(ask(10, "vocabulary")).rejects.toThrow("Insufficient questions");
		});

		it("throws when pool empty", async () => {
			mockPool([]);
			vi.mocked(getVerbsWithConjugationsForTense).mockResolvedValue([]);

			await expect(ask(10, "vocabulary")).rejects.toThrow("Insufficient questions");
		});

		it("does not throw when questions === limit", async () => {
			const ids = Array.from({ length: 10 }, (_, i) => i + 1);
			mockPool(ids);
			vi.mocked(getVerbsWithConjugationsForTense).mockResolvedValue(
				ids.map((id) => mockVerb(id, `I verb${id}`, ["sg1"])),
			);

			await expect(ask(10, "vocabulary")).resolves.toHaveLength(10);
		});
	});
});
