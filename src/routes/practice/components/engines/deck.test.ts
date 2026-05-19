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

	it("returns fewer cards than sessionSize when pool is exhausted", () => {
		const forms = [form("a"), form("b"), form("c")];
		// 3 new words → 3 + up to 3 re-intros = 6 max
		const deck = buildWeightedDeck(forms, 10);
		expect(deck.length).toBeLessThan(10);
		expect(deck.length).toBeGreaterThan(0);
	});

	it("handles empty pool without throwing", () => {
		expect(buildWeightedDeck([], 10)).toHaveLength(0);
	});
});

// ─── Re-introductions ─────────────────────────────────────────────────────────

describe("new word re-introductions", () => {
	it("each new word appears twice when pool small enough for re-intros to fit", () => {
		const forms = [form("a"), form("b"), form("c")];
		const deck = buildWeightedDeck(forms, 10);
		// Each word should appear exactly twice (first + re-intro)
		for (const id of ["a", "b", "c"]) {
			expect(ids(deck).filter((x) => x === id)).toHaveLength(2);
		}
	});

	it("re-intro is spaced ~5 slots after first appearance when pool has other words", () => {
		// Need enough other words to fill the slots between first and re-intro
		const forms = Array.from({ length: 6 }, (_, i) => form(`w${i}`));
		const deck = buildWeightedDeck(forms, 10);
		// Find first word's two appearances
		const firstId = ids(deck)[0]!;
		const first = ids(deck).indexOf(firstId);
		const second = ids(deck).lastIndexOf(firstId);
		// Re-intro should be at least 4 positions later
		expect(second - first).toBeGreaterThanOrEqual(4);
	});

	it("does not re-introduce when reintroAt >= sessionSize", () => {
		// Single word, sessionSize=1: deck=[a], reintroAt=5 >= 1 → no re-intro
		const deck = buildWeightedDeck([form("a")], 1);
		expect(deck).toHaveLength(1);
		expect(ids(deck).filter((x) => x === "a")).toHaveLength(1);
	});

	it("inProgress words are NOT re-introduced", () => {
		const forms = [form("a", "inProgress"), form("b", "inProgress"), form("c", "inProgress")];
		const deck = buildWeightedDeck(forms, 10);
		// inProgress words have no re-intro; deck capped at 3
		expect(deck).toHaveLength(3);
		expect(uniqueIds(deck)).toHaveLength(3);
	});
});

// ─── Bucket weighting ─────────────────────────────────────────────────────────

describe("bucket priority", () => {
	it("tier1 words appear before new words", () => {
		const forms = [
			form("tier1-a", "tier1"),
			form("new-a", "new"),
			form("new-b", "new"),
		];
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
	it("3 new words with sessionSize=10 gives 6 cards (3 + 3 re-intros)", () => {
		const deck = buildWeightedDeck([form("a"), form("b"), form("c")], 10);
		expect(deck).toHaveLength(6);
	});

	it("4 new words with sessionSize=10 gives 8 cards", () => {
		const deck = buildWeightedDeck(
			[form("a"), form("b"), form("c"), form("d")],
			10,
		);
		expect(deck).toHaveLength(8);
	});

	it("5 new words with sessionSize=10 gives 10 cards", () => {
		const deck = buildWeightedDeck(
			[form("a"), form("b"), form("c"), form("d"), form("e")],
			10,
		);
		expect(deck).toHaveLength(10);
	});

	it("all unique words in pool appear in deck", () => {
		const forms = [form("a"), form("b"), form("c")];
		const deck = buildWeightedDeck(forms, 10);
		for (const f of forms) {
			expect(ids(deck)).toContain(f.id);
		}
	});
});
