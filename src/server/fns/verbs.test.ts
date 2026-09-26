import { beforeEach, describe, expect, it, vi } from "vite-plus/test";

import type { DrillBucket } from "@/lib/drill/types";
import { typedEntries } from "@/lib/object";
import type { PersonNumber } from "@/server/db/enums";
import { getDrillVocabPool } from "@/server/db/queries/drill-pool";
import {
	type VerbWithConjugations,
	getVerbsWithConjugationsForTense,
} from "@/server/db/queries/vocabulary";

import { getVerbConjugationQuestions } from "./verbs.server";

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

const ask = (limit: number, persons?: PersonNumber[]) =>
	getVerbConjugationQuestions(1, "test-drill", limit, {
		tense: "present",
		idPrefix: "pfx-",
		persons,
	});

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

	describe("persons filter", () => {
		it("when persons=['sg1'], only sg1 questions returned", async () => {
			useFullPool();
			const questions = await ask(30, ["sg1"]);
			expect(questions).toHaveLength(30);
			for (const q of questions) expect(q.id).toMatch(/-sg1$/);
		});

		it("'we want' / 'you all want' / 'they want' never appear in sg1 drill", async () => {
			useFullPool();
			const questions = await ask(30, ["sg1"]);
			const prompts = questions.map((q) => q.prompt);
			for (const prompt of prompts) {
				expect(prompt).not.toMatch(/^we |^you all |^they /);
			}
		});

		it("without persons filter, all 6 conjugations per verb returned", async () => {
			useFullPool();
			const questions = await ask(30);
			expect(questions).toHaveLength(30 * 6);
		});
	});

	describe("English prompt construction", () => {
		it("sg1 prompt uses full english translation", async () => {
			useFullPool();
			const questions = await ask(30, ["sg1"]);
			expect(questions[0]!.prompt).toBe("I verb1");
		});

		it("non-sg1 prompt uses person label + stem", async () => {
			useFullPool();
			const questions = await ask(30);
			const pl1 = questions.find((q) => q.id === "pfx-1-pl1");
			expect(pl1!.prompt).toBe("we verb1");
		});

		it("'I am' verb normalises 'are' for pl1, 'is' for sg3", async () => {
			const pool = [...VERB_POOL];
			pool[0] = mockVerb(1, "I am");
			mockPool(VERB_POOL_IDS);
			vi.mocked(getVerbsWithConjugationsForTense).mockResolvedValue(pool);

			const questions = await ask(30);
			const byPerson = Object.fromEntries(
				questions.filter((q) => q.vocabId === 1).map((q) => [q.id.split("-").at(-1), q.prompt]),
			);
			expect(byPerson["sg1"]).toBe("I am");
			expect(byPerson["pl1"]).toBe("we are");
			expect(byPerson["sg3"]).toBe("he/she is");
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

			const questions = await ask(30, ["sg1"]);
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

			const questions = await ask(30, ["sg1"]);
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

			const questions = await ask(30, ["sg1"]);
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

			const questions = await ask(30, ["sg1"]);
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

			await expect(ask(30, ["sg1"])).rejects.toThrow("Insufficient questions");
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
			await expect(ask(10, ["sg1"])).rejects.toThrow("Insufficient questions");
		});

		it("throws when pool empty", async () => {
			mockPool([]);
			vi.mocked(getVerbsWithConjugationsForTense).mockResolvedValue([]);

			await expect(ask(10, ["sg1"])).rejects.toThrow("Insufficient questions");
		});

		it("does not throw when questions === limit", async () => {
			const ids = Array.from({ length: 10 }, (_, i) => i + 1);
			mockPool(ids);
			vi.mocked(getVerbsWithConjugationsForTense).mockResolvedValue(
				ids.map((id) => mockVerb(id, `I verb${id}`, ["sg1"])),
			);

			await expect(ask(10, ["sg1"])).resolves.toHaveLength(10);
		});
	});
});
