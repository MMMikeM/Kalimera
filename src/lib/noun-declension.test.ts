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

// ─── Patterns the enum used to lack ──────────────────────────────────────────
// Before neut-os / neut-as / fem-i-archaic existed, inferDeclensionPattern fell
// these through to neut-o / fem-i and seeded forms like *μέροου and *πόλες
// straight into nominal_forms, where the drills read them.

describe("neuter -ος (neut-os)", () => {
	it.each([
		["μέρος", "μέρους", "μέρη", "μερών"],
		["τέλος", "τέλους", "τέλη", "τελών"],
		["ύψος", "ύψους", "ύψη", "υψών"],
	])("declines %s on the longer stem", (lemma, genSg, nomPl, genPl) => {
		expect(nouns(lemma, "neut-os")).toMatchObject({
			nominative_singular: lemma,
			accusative_singular: lemma,
			genitive_singular: genSg,
			nominative_plural: nomPl,
			accusative_plural: nomPl,
			genitive_plural: genPl,
		});
	});
});

describe("neuter -ας (neut-as)", () => {
	it("κρέας takes the -τ- stem, like -μα words", () => {
		expect(nouns("κρέας", "neut-as")).toMatchObject({
			nominative_singular: "κρέας",
			genitive_singular: "κρέατος",
			nominative_plural: "κρέατα",
			genitive_plural: "κρεάτων",
		});
	});
});

describe("archaic feminine -η (fem-i-archaic)", () => {
	it("πόλη takes -εις without moving the stress", () => {
		expect(nouns("πόλη", "fem-i-archaic")).toMatchObject({
			genitive_singular: "πόλης",
			nominative_plural: "πόλεις",
			genitive_plural: "πόλεων",
		});
	});

	it("δύναμη pulls the stress to the penult: δυνάμεις, not δύναμεις", () => {
		expect(nouns("δύναμη", "fem-i-archaic")).toMatchObject({
			genitive_singular: "δύναμης",
			nominative_plural: "δυνάμεις",
			genitive_plural: "δυνάμεων",
		});
	});

	// The archaic set is a hand-kept list, so guard the far larger regular class
	// against it leaking: both lemmas end in -η and only one takes -εις.
	it.each([
		["αγάπη", "αγάπες", "αγαπών"],
		["ζωή", "ζωές", "ζωών"],
	])("leaves regular -η nouns alone: %s", (lemma, nomPl, genPl) => {
		expect(nouns(lemma, "fem-i")).toMatchObject({
			nominative_plural: nomPl,
			genitive_plural: genPl,
		});
	});
});

// ─── Stress in the genitive plural and on lengthened stems ───────────────────

describe("genitive plural stress", () => {
	// The paradigm's own example is "των γυναικών", but the ending was stored as
	// unstressed -ων, so the generator produced *γυναίκων for all 99 fem-a nouns.
	it.each([
		["γυναίκα", "γυναικών"],
		["θάλασσα", "θαλασσών"],
		["ώρα", "ωρών"],
		["χώρα", "χωρών"],
		["γλώσσα", "γλωσσών"],
		["καρδιά", "καρδιών"],
	])("%s takes the oxytone -ών", (lemma, expected) => {
		expect(nouns(lemma, "fem-a").genitive_plural).toBe(expected);
	});
});

describe("three-syllable rule", () => {
	// Greek stress cannot sit further back than the antepenult, so a suffix that
	// adds a syllable drags it forward: όνομα -> ονόματος, not *όνοματος.
	it.each([
		["όνομα", "ονόματος", "ονόματα"],
		["πρόγραμμα", "προγράμματος", "προγράμματα"],
	])("%s moves its stress when the stem lengthens", (lemma, genSg, nomPl) => {
		expect(nouns(lemma, "neut-ma")).toMatchObject({
			genitive_singular: genSg,
			nominative_plural: nomPl,
		});
	});

	it("leaves words already inside the three-syllable window alone", () => {
		expect(nouns("πράγμα", "neut-ma")).toMatchObject({
			genitive_singular: "πράγματος",
			nominative_plural: "πράγματα",
		});
		expect(nouns("ήλιος", "masc-os")).toMatchObject({ genitive_singular: "ήλιου" });
	});
});
