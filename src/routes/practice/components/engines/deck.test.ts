import { describe, expect, it } from "vitest";

import { buildWeightedDeck } from "./deck";
import type { DrillForm } from "./deck";

const form = (id: string, bucket: DrillForm["bucket"] = "new"): DrillForm => ({
	id,
	greek: id,
	greeklish: id,
	label: id,
	bucket,
});

const ids = (deck: DrillForm[]) => deck.map((f) => f.id);
const uniqueIds = (deck: DrillForm[]) => [...new Set(ids(deck))];

// ─── Size ──────────────────────────────────────────────────────────────────────

describe("deck size", () => {
	it("returns exactly sessionSize cards when pool is large enough", () => {
		const forms = Array.from({ length: 20 }, (_, i) => form(`w${i}`, "inProgress"));
		expect(buildWeightedDeck(forms, 10)).toHaveLength(10);
		expect(buildWeightedDeck(forms, 20)).toHaveLength(20);
	});

	it("throws when pool has fewer unique words than sessionSize", () => {
		const forms = [form("a"), form("b"), form("c")];
		expect(() => buildWeightedDeck(forms, 10)).toThrow();
	});

	it("throws when pool is empty", () => {
		expect(() => buildWeightedDeck([], 10)).toThrow();
	});
});

// ─── Re-introductions ─────────────────────────────────────────────────────────

describe("new word re-introductions", () => {
	it("inProgress words are never re-introduced", () => {
		const forms = Array.from({ length: 10 }, (_, i) => form(`w${i}`, "inProgress"));
		const deck = buildWeightedDeck(forms, 10);
		expect(deck).toHaveLength(10);
		expect(uniqueIds(deck)).toHaveLength(10);
	});

	it("new words may appear twice when pool size > sessionSize and drawn early", () => {
		// 20 new words, sessionSize=10: first few new words drawn early get re-intros queued,
		// but deck fills before re-intros are drawn — so no duplicates in this case
		const forms = Array.from({ length: 20 }, (_, i) => form(`w${i}`));
		const deck = buildWeightedDeck(forms, 10);
		expect(deck).toHaveLength(10);
		// No back-to-back duplicates
		for (let i = 0; i < deck.length - 1; i++) {
			expect(deck[i]!.id).not.toBe(deck[i + 1]!.id);
		}
	});
});

// ─── Bucket weighting ─────────────────────────────────────────────────────────

describe("bucket priority", () => {
	it("tier1 words appear before new words", () => {
		const forms = [form("tier1-a", "tier1"), form("new-a", "new"), form("new-b", "new")];
		const deck = buildWeightedDeck(forms, 3);
		expect(ids(deck)[0]).toBe("tier1-a");
	});

	it("cascades to lower bucket when preferred is empty", () => {
		// Only new bucket filled — all slots cascade to new
		const forms = [form("a", "new"), form("b", "new")];
		const deck = buildWeightedDeck(forms, 2);
		expect(uniqueIds(deck)).toContain("a");
		expect(uniqueIds(deck)).toContain("b");
	});

	it("mixes buckets across a 10-card session", () => {
		const forms = [
			...Array.from({ length: 3 }, (_, i) => form(`t1-${i}`, "tier1")),
			...Array.from({ length: 3 }, (_, i) => form(`ip-${i}`, "inProgress")),
			...Array.from({ length: 4 }, (_, i) => form(`new-${i}`, "new")),
		];
		const deck = buildWeightedDeck(forms, 10);
		expect(deck).toHaveLength(10);
		// All three bucket types should appear
		expect(deck.some((f) => f.bucket === "tier1")).toBe(true);
		expect(deck.some((f) => f.bucket === "inProgress")).toBe(true);
		expect(deck.some((f) => f.bucket === "new")).toBe(true);
	});
});

// ─── Small pool edge cases (the recurring bug source) ─────────────────────────

describe("small pool behaviour", () => {
	it("throws with 3 words for sessionSize=10", () => {
		expect(() => buildWeightedDeck([form("a"), form("b"), form("c")], 10)).toThrow();
	});

	it("throws with 4 words for sessionSize=10", () => {
		expect(() =>
			buildWeightedDeck([form("a"), form("b"), form("c"), form("d")], 10),
		).toThrow();
	});

	it("throws with 5 words for sessionSize=10", () => {
		expect(() =>
			buildWeightedDeck([form("a"), form("b"), form("c"), form("d"), form("e")], 10),
		).toThrow();
	});

	it("all unique words in pool appear in deck", () => {
		const forms = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j"].map((s) => form(s));
		const deck = buildWeightedDeck(forms, 10);
		for (const f of forms) {
			expect(ids(deck)).toContain(f.id);
		}
	});
});
