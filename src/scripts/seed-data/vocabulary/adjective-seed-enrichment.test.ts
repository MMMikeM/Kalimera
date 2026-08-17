import { describe, expect, it } from "vitest";

import { enrichAdjective } from "./adjective-seed-enrichment";

const grid = (lemma: string) =>
	enrichAdjective({ lemma, english: "x" }).nominalForms as Record<
		string,
		{ form: string; article: string | null }
	>;

const citation = (lemma: string) => {
	const forms = enrichAdjective({ lemma, english: "x" }).nominalForms as Record<
		string,
		{ form: string }
	>;
	return {
		m: forms.nominative_singular_masculine?.form,
		f: forms.nominative_singular_feminine?.form,
		n: forms.nominative_singular_neuter?.form,
	};
};

// A Greek word carries exactly one accent. The feminine and neuter endings are
// only written accented when the stem itself is unstressed (καλός → καλή/καλό).

describe("adjective citation forms", () => {
	it.each([
		["άνετος", { m: "άνετος", f: "άνετη", n: "άνετο" }],
		["άρρωστος", { m: "άρρωστος", f: "άρρωστη", n: "άρρωστο" }],
		["κουρασμένος", { m: "κουρασμένος", f: "κουρασμένη", n: "κουρασμένο" }],
		["επικίνδυνος", { m: "επικίνδυνος", f: "επικίνδυνη", n: "επικίνδυνο" }],
		["χαρούμενος", { m: "χαρούμενος", f: "χαρούμενη", n: "χαρούμενο" }],
		["όμορφος", { m: "όμορφος", f: "όμορφη", n: "όμορφο" }],
	])("%s: stressed stem takes unaccented endings", (lemma, expected) => {
		expect(citation(lemma)).toEqual(expected);
	});

	it.each([
		["καλός", { m: "καλός", f: "καλή", n: "καλό" }],
		["ψηλός", { m: "ψηλός", f: "ψηλή", n: "ψηλό" }],
		["βαρετός", { m: "βαρετός", f: "βαρετή", n: "βαρετό" }],
	])("%s: unstressed stem keeps the accented endings", (lemma, expected) => {
		expect(citation(lemma)).toEqual(expected);
	});

	it.each([
		["τελευταίος", { m: "τελευταίος", f: "τελευταία", n: "τελευταίο" }],
		["καινούριος", { m: "καινούριος", f: "καινούρια", n: "καινούριο" }],
		["μοσχαρίσιος", { m: "μοσχαρίσιος", f: "μοσχαρίσια", n: "μοσχαρίσιο" }],
		["νότιος", { m: "νότιος", f: "νότια", n: "νότιο" }],
	])("%s: -ιος/-αίος takes -α and an unaccented neuter", (lemma, expected) => {
		expect(citation(lemma)).toEqual(expected);
	});

	it.each([
		["παλιός", { m: "παλιός", f: "παλιά", n: "παλιό" }],
		["κρύος", { m: "κρύος", f: "κρύα", n: "κρύο" }],
	])("%s: -ιος with an unstressed stem accents the ending", (lemma, expected) => {
		expect(citation(lemma)).toEqual(expected);
	});

	it("hand-authored triples are still used verbatim", () => {
		expect(citation("πολύς")).toEqual({ m: "πολύς", f: "πολλή", n: "πολύ" });
		expect(citation("δύσκολος")).toEqual({ m: "δύσκολος", f: "δύσκολη", n: "δύσκολο" });
	});

	it("neuter-cited colours infer the -ιος pattern where the stem ends in a vowel", () => {
		expect(grid("γαλάζιο").nominative_singular_feminine?.form).toBe("γαλάζια");
		expect(grid("άσπρο").nominative_singular_feminine?.form).toBe("άσπρη");
	});
});

// The article agrees with the word that follows it, which for an adjective form
// is the adjective itself: τη μαύρη πόρτα, but την κόκκινη πόρτα.

describe("adjective accusative article", () => {
	it.each([
		["κόκκινος", "την"],
		["πράσινος", "την"],
		["ξένος", "την"],
	])("%s keeps ν", (lemma, article) => {
		expect(grid(lemma).accusative_singular_feminine?.article).toBe(article);
	});

	it.each([
		["μαύρος", "τη"],
		["μεγάλος", "τη"],
		["φρέσκος", "τη"],
	])("%s drops ν", (lemma, article) => {
		expect(grid(lemma).accusative_singular_feminine?.article).toBe(article);
	});
});
