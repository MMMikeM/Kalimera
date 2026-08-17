import { describe, expect, it } from "vitest";

import { declineNoun } from "./noun-declension";

// ─── Helpers ──────────────────────────────────────────────────────────────────

const accSingular = (lemma: string, pattern: Parameters<typeof declineNoun>[1]) =>
	declineNoun(lemma, pattern).find((f) => f.case === "accusative" && f.number === "singular")!;

const nouns = (lemma: string, pattern: Parameters<typeof declineNoun>[1]) =>
	Object.fromEntries(
		declineNoun(lemma, pattern).map((f) => [`${f.case}_${f.number}`, f.noun]),
	) as Record<string, string>;

// ─── Feminine accusative article: the ν keep-list ─────────────────────────────

describe("feminine accusative article", () => {
	it.each([
		["πόρτα", "την"],
		["ταβέρνα", "την"],
		["καρέκλα", "την"],
		["ξαπλώστρα", "την"],
		["ψυχραιμία", "την"],
	])("keeps ν before a single-letter keeper: %s", (lemma, article) => {
		expect(accSingular(lemma, "fem-a").article).toBe(article);
	});

	it.each([
		["ντομάτα", "την"],
		["μπανιέρα", "την"],
		["τσάντα", "την"],
		["γκαλερί", "την"],
	])("keeps ν before a two-letter cluster: %s", (lemma, article) => {
		expect(accSingular(lemma, "fem-a").article).toBe(article);
	});

	it.each([
		["Αθήνα", "την"],
		["Ελλάδα", "την"],
	])("keeps ν before a vowel, including capitals: %s", (lemma, article) => {
		expect(accSingular(lemma, "fem-a").article).toBe(article);
	});

	it.each([
		["θάλασσα", "τη"],
		["ζέστη", "τη"],
		["νύχτα", "τη"],
		["μέρα", "τη"],
		["γειτονιά", "τη"],
		["βροχή", "τη"],
	])("drops ν before every other consonant: %s", (lemma, article) => {
		expect(accSingular(lemma, "fem-a").article).toBe(article);
	});

	it("renders the full phrase with the resolved article", () => {
		expect(accSingular("πόρτα", "fem-a").full).toBe("την πόρτα");
		expect(accSingular("θάλασσα", "fem-a").full).toBe("τη θάλασσα");
	});
});

// ─── Capital accented initials ────────────────────────────────────────────────

describe("lemmas starting with an accented capital", () => {
	it("Έλληνας keeps a single accent throughout", () => {
		expect(nouns("Έλληνας", "masc-as")).toEqual({
			nominative_singular: "Έλληνας",
			accusative_singular: "Έλληνα",
			genitive_singular: "Έλληνα",
			nominative_plural: "Έλληνες",
			accusative_plural: "Έλληνες",
			genitive_plural: "Ελλήνων",
		});
	});

	it("Άγγλος keeps a single accent throughout", () => {
		expect(nouns("Άγγλος", "masc-os")).toMatchObject({
			nominative_singular: "Άγγλος",
			accusative_singular: "Άγγλο",
			nominative_plural: "Άγγλοι",
		});
	});
});

// ─── -ση / -ξη / -ψη feminines ────────────────────────────────────────────────

describe("feminine -ση/-ξη/-ψη nouns", () => {
	it("declines -ση nouns (unchanged behaviour)", () => {
		expect(nouns("ερώτηση", "fem-si")).toEqual({
			nominative_singular: "ερώτηση",
			accusative_singular: "ερώτηση",
			genitive_singular: "ερώτησης",
			nominative_plural: "ερωτήσεις",
			accusative_plural: "ερωτήσεις",
			genitive_plural: "ερωτήσεων",
		});
	});

	it("keeps ξ in -ξη nouns", () => {
		expect(nouns("απόδειξη", "fem-ksi")).toEqual({
			nominative_singular: "απόδειξη",
			accusative_singular: "απόδειξη",
			genitive_singular: "απόδειξης",
			nominative_plural: "αποδείξεις",
			accusative_plural: "αποδείξεις",
			genitive_plural: "αποδείξεων",
		});
	});

	it("keeps ψ in -ψη nouns", () => {
		expect(nouns("άποψη", "fem-psi")).toEqual({
			nominative_singular: "άποψη",
			accusative_singular: "άποψη",
			genitive_singular: "άποψης",
			nominative_plural: "απόψεις",
			accusative_plural: "απόψεις",
			genitive_plural: "απόψεων",
		});
	});
});
