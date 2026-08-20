import { describe, expect, it } from "vitest";

import { NOUN_SUBJECT_BY_LEMMA, subjectTagsFor } from "./noun-subjects";

const DAYS = ["Δευτέρα", "Τρίτη", "Τετάρτη", "Πέμπτη", "Παρασκευή", "Σάββατο", "Κυριακή"];
const MONTHS = [
	"Ιανουάριος", "Φεβρουάριος", "Μάρτιος", "Απρίλιος", "Μάιος", "Ιούνιος",
	"Ιούλιος", "Αύγουστος", "Σεπτέμβριος", "Οκτώβριος", "Νοέμβριος", "Δεκέμβριος",
];
const NUMERALS = ["μηδέν", "ένα", "δύο", "πέντε", "δέκα", "είκοσι", "εκατό", "χιλιάδα"];

describe("noun subjects", () => {
	// /learn/essentials owns numbers and teaches them by composition (unit↔ten,
	// τρι-/πεν-/εξ-, the teen pattern). Numerals also have no declension, so a
	// browser row for them cannot expand — it is length without teaching.
	it.each(NUMERALS)("leaves the numeral %s out of the browser", (lemma) => {
		expect(subjectTagsFor(lemma)).toEqual([]);
	});

	// Days and months belong to the essentials time subtab, which teaches their
	// usage (την Τρίτη, κάθε Τρίτη). Listing them in the browser too duplicates it.
	it.each([...DAYS, ...MONTHS])("leaves the calendar name %s out of the browser", (lemma) => {
		expect(subjectTagsFor(lemma)).toEqual([]);
	});

	it("keeps the ordinary time nouns that essentials does not cover", () => {
		for (const lemma of ["ώρα", "μέρα", "εβδομάδα", "πρωί", "βράδυ", "χειμώνας"]) {
			expect(subjectTagsFor(lemma)).toEqual(["time-calendar"]);
		}
	});

	it("assigns every lemma exactly one subject", () => {
		const values = Object.values(NOUN_SUBJECT_BY_LEMMA);
		expect(values.every((v) => typeof v === "string" && v.length > 0)).toBe(true);
	});
});
