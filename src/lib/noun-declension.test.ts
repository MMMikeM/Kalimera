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

// ─── Masculine -ος antepenult stress shift ───────────────────────────────────

describe("masculine -os antepenult stress shift", () => {
	it("shifts stress to penult in genitive singular, accusative plural, and genitive plural for άνθρωπος", () => {
		expect(nouns("άνθρωπος", "masc-os")).toEqual({
			nominative_singular: "άνθρωπος",
			accusative_singular: "άνθρωπο",
			genitive_singular: "ανθρώπου",
			nominative_plural: "άνθρωποι",
			accusative_plural: "ανθρώπους",
			genitive_plural: "ανθρώπων",
		});
	});

	it("renders full phrases with correct articles and shifted stress for άνθρωπος", () => {
		expect(declineNoun("άνθρωπος", "masc-os").map((f) => f.full)).toEqual([
			"ο άνθρωπος",
			"τον άνθρωπο",
			"του ανθρώπου",
			"οι άνθρωποι",
			"τους ανθρώπους",
			"των ανθρώπων",
		]);
	});

	it("shifts stress for other proparoxytone -os nouns (e.g. πρόεδρος, δήμαρχος)", () => {
		expect(nouns("πρόεδρος", "masc-os")).toEqual({
			nominative_singular: "πρόεδρος",
			accusative_singular: "πρόεδρο",
			genitive_singular: "προέδρου",
			nominative_plural: "πρόεδροι",
			accusative_plural: "προέδρους",
			genitive_plural: "προέδρων",
		});
		expect(nouns("δήμαρχος", "masc-os")).toEqual({
			nominative_singular: "δήμαρχος",
			accusative_singular: "δήμαρχο",
			genitive_singular: "δημάρχου",
			nominative_plural: "δήμαρχοι",
			accusative_plural: "δημάρχους",
			genitive_plural: "δημάρχων",
		});
	});

	it("does not shift stress for paroxytone or oxytone -os nouns (e.g. φίλος, ουρανός)", () => {
		expect(nouns("φίλος", "masc-os")).toEqual({
			nominative_singular: "φίλος",
			accusative_singular: "φίλο",
			genitive_singular: "φίλου",
			nominative_plural: "φίλοι",
			accusative_plural: "φίλους",
			genitive_plural: "φίλων",
		});
		expect(nouns("ουρανός", "masc-os")).toEqual({
			nominative_singular: "ουρανός",
			accusative_singular: "ουρανό",
			genitive_singular: "ουρανού",
			nominative_plural: "ουρανοί",
			accusative_plural: "ουρανούς",
			genitive_plural: "ουρανών",
		});
	});
});


// ─── Synizesis: unstressed ι before a vowel is a glide, not a syllable ────────

describe("-ιος nouns do not shift stress", () => {
	it("ήλιος stays put — ή-λιος is two syllables, so it is already paroxytone", () => {
		expect(nouns("ήλιος", "masc-os")).toEqual({
			nominative_singular: "ήλιος",
			accusative_singular: "ήλιο",
			genitive_singular: "ήλιου",
			nominative_plural: "ήλιοι",
			accusative_plural: "ήλιους",
			genitive_plural: "ήλιων",
		});
	});

	it("still shifts genuinely proparoxytone nouns", () => {
		expect(nouns("άνθρωπος", "masc-os")).toMatchObject({
			genitive_singular: "ανθρώπου",
			accusative_plural: "ανθρώπους",
			genitive_plural: "ανθρώπων",
		});
	});
});
