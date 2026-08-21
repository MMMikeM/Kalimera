import { describe, expect, it } from "vitest";

import {
	type BrowsableNoun,
	INITIAL_VISIBLE,
	LEVELS,
	PER_GROUP_VISIBLE,
	filterNouns,
} from "./noun-filters";

const noun = (
	lemma: string,
	cefrLevel: string | null,
	frequencyRank: number | null,
): BrowsableNoun => ({
	id: lemma.length,
	lemma,
	english: "x",
	gender: "feminine",
	cefrLevel,
	frequencyRank,
	forms: {},
});

const NOUNS = [
	noun("common", "A1", 100),
	noun("mid", "A2", 1200),
	noun("rare", "B1", 9000),
	noun("junk", "0", 300),
	noun("nullLevel", null, 400),
	noun("unranked", "A1", null),
];

describe("filterNouns", () => {
	it("returns everything when no level is selected", () => {
		expect(filterNouns(NOUNS, [])).toHaveLength(NOUNS.length);
	});

	it("filters by a single level", () => {
		expect(filterNouns(NOUNS, ["A1"]).map((n) => n.lemma)).toEqual(["common", "unranked"]);
	});

	// A learner working through A1 and A2 wants both at once; the levels are
	// cumulative in practice, not mutually exclusive.
	it("shows several levels at the same time", () => {
		expect(filterNouns(NOUNS, ["A1", "A2"]).map((n) => n.lemma)).toEqual([
			"common",
			"mid",
			"unranked",
		]);
	});

	// 0 of 460 nouns are unlevelled now, but the column has no CHECK constraint,
	// so a junk value must not make a word unreachable.
	it("treats a junk or null level as unlevelled rather than hiding it", () => {
		expect(filterNouns(NOUNS, ["unlevelled"]).map((n) => n.lemma)).toEqual(["junk", "nullLevel"]);
	});

	it("preserves the incoming order, which is already CEFR then frequency", () => {
		expect(filterNouns(NOUNS, []).map((n) => n.lemma)).toEqual(NOUNS.map((n) => n.lemma));
	});

	it("exposes the levels the UI offers, without an 'all' pseudo-level", () => {
		expect(LEVELS).toContain("A1");
		expect(LEVELS).toContain("unlevelled");
		expect(LEVELS).not.toContain("all");
	});

	// Frequency is no longer a control: the list is ordered commonest-first and
	// cut off, so a 49-word subject opens as a 10-word one.
	it("caps the initial view at a readable number", () => {
		expect(INITIAL_VISIBLE).toBeLessThanOrEqual(12);
		expect(INITIAL_VISIBLE).toBeGreaterThan(0);
	});

	// A subject with named sub-groups cuts off within each one, so every group
	// shows its commonest few rather than one global slice landing arbitrarily —
	// which left "People & pets" showing a single word.
	it("caps each named sub-group more tightly than a flat list", () => {
		expect(PER_GROUP_VISIBLE).toBeLessThan(INITIAL_VISIBLE);
		expect(PER_GROUP_VISIBLE).toBeGreaterThan(0);
	});
});
