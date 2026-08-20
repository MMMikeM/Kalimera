import { describe, expect, it } from "vitest";

import { NOUNS } from "./nouns";
import { enrichNoun, inferDeclensionPattern } from "./noun-seed-enrichment";

const allNouns = Object.values(NOUNS).flat();

const formsOf = (lemma: string, gender: "masculine" | "feminine" | "neuter") =>
	Object.fromEntries(
		Object.entries(enrichNoun({ lemma, gender, english: "x" }).nominalForms).map(([k, cell]) => [
			k,
			cell?.form,
		]),
	) as Record<string, string>;

// Stem and ending colliding leaves a vowel run Greek does not have (*μέροου,
// *πόλες came through this way). Cheaper and broader than asserting every form.
const VOWEL_COLLISION = /(οο|αα|ωο|ιι|εε|ηη|υυ)/;

describe("seeded noun forms", () => {
	it("seeds at least one form for every noun", () => {
		expect(allNouns.length).toBeGreaterThan(0);
	});

	it("never generates a vowel-collision artefact", () => {
		const bad = allNouns.flatMap((noun) =>
			Object.entries(noun.nominalForms)
				.filter(([, cell]) => cell && VOWEL_COLLISION.test(cell.form))
				.map(([key, cell]) => `${noun.lemma} (${noun.declensionPattern}) ${key}=${cell?.form}`),
		);
		expect(bad).toEqual([]);
	});

	it("fills all six case/number cells", () => {
		const incomplete = allNouns
			.filter(
				(noun) =>
					!(
						noun.nominalForms.nominative_singular &&
						noun.nominalForms.accusative_singular &&
						noun.nominalForms.genitive_singular &&
						noun.nominalForms.nominative_plural &&
						noun.nominalForms.accusative_plural &&
						noun.nominalForms.genitive_plural
					),
			)
			.map((noun) => noun.lemma);
		expect(incomplete).toEqual([]);
	});
});

describe("pattern inference", () => {
	it.each([
		["ερώτηση", "fem-si"],
		["κατάσταση", "fem-si"],
		["απόδειξη", "fem-ksi"],
		["άνοιξη", "fem-ksi"],
		["έναρξη", "fem-ksi"],
		["άποψη", "fem-psi"],
	])("routes %s to %s", (lemma, pattern) => {
		expect(inferDeclensionPattern(lemma, "feminine")).toBe(pattern);
	});

	it("leaves plain -η feminines on fem-i", () => {
		expect(inferDeclensionPattern("ζωή", "feminine")).toBe("fem-i");
		expect(inferDeclensionPattern("βροχή", "feminine")).toBe("fem-i");
	});

	it.each([
		["μέρος", "neuter", "neut-os"],
		["τέλος", "neuter", "neut-os"],
		["κρέας", "neuter", "neut-as"],
		["όνομα", "neuter", "neut-ma"],
		["βιβλίο", "neuter", "neut-o"],
		["παιδί", "neuter", "neut-i"],
	] as const)("classifies neuter %s as %s", (lemma, gender, pattern) => {
		expect(inferDeclensionPattern(lemma, gender)).toBe(pattern);
	});

	// -ος/-ας must be tested before the -ο fallthrough, and only for neuters:
	// the masculine branch owns -ας (πατέρας) and -ος (φίλος).
	it.each([
		["πατέρας", "masc-as"],
		["φίλος", "masc-os"],
	] as const)("leaves masculine %s on %s", (lemma, pattern) => {
		expect(inferDeclensionPattern(lemma, "masculine")).toBe(pattern);
	});

	it("routes archaic -η via the override list, not the ending", () => {
		expect(inferDeclensionPattern("πόλη", "feminine")).toBe("fem-i-archaic");
		expect(inferDeclensionPattern("αγάπη", "feminine")).toBe("fem-i");
	});
});

describe("sibilant -ξη / -ψη stems", () => {
	it("keeps ξ across the -ξη paradigm", () => {
		expect(formsOf("απόδειξη", "feminine")).toMatchObject({
			nominative_singular: "απόδειξη",
			genitive_singular: "απόδειξης",
			nominative_plural: "αποδείξεις",
			genitive_plural: "αποδείξεων",
		});
	});

	it("keeps ψ across the -ψη paradigm", () => {
		expect(formsOf("άποψη", "feminine")).toMatchObject({
			nominative_singular: "άποψη",
			genitive_singular: "άποψης",
			nominative_plural: "απόψεις",
		});
	});
});

describe("lemmas no paradigm generates", () => {
	it.each([
		["σπορ"],
		["πικνίκ"],
	])("keeps indeclinable %s invariant in every cell", (lemma) => {
		const forms = formsOf(lemma, "neuter");
		expect(new Set(Object.values(forms))).toEqual(new Set([lemma]));
	});

	it("gives φως its -τ- stem", () => {
		expect(formsOf("φως", "neuter")).toMatchObject({
			nominative_singular: "φως",
			genitive_singular: "φωτός",
			nominative_plural: "φώτα",
			genitive_plural: "φώτων",
		});
	});

	it("gives περιβάλλον its -ντ- stem", () => {
		expect(formsOf("περιβάλλον", "neuter")).toMatchObject({
			nominative_singular: "περιβάλλον",
			accusative_singular: "περιβάλλον",
			genitive_singular: "περιβάλλοντος",
			nominative_plural: "περιβάλλοντα",
			genitive_plural: "περιβαλλόντων",
		});
	});

	// παππούς is seeded from two lesson files and batchUpsertNominalForms is
	// last-write-wins, so these forms have to come from the central map rather
	// than a per-site override.
	it("adds the syllable back for imparisyllable παππούς", () => {
		expect(formsOf("παππούς", "masculine")).toMatchObject({
			nominative_singular: "παππούς",
			accusative_singular: "παππού",
			genitive_singular: "παππού",
			nominative_plural: "παππούδες",
			genitive_plural: "παππούδων",
		});
	});
});
