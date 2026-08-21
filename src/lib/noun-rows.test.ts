import { describe, expect, it } from "vitest";

import type { BrowsableNoun } from "./noun-filters";
import { toNounRows } from "./noun-rows";

const n = (lemma: string): BrowsableNoun => ({
	id: lemma.length + lemma.charCodeAt(0),
	lemma,
	english: `${lemma}-en`,
	gender: "neuter",
	cefrLevel: "A1",
	frequencyRank: 1,
	forms: {},
});

const PAIRS: Array<[string, string]> = [
	["πατέρας", "μητέρα"],
	["μπαμπάς", "μαμά"],
	["αγόρι", "κορίτσι"],
];

const lemmas = (rows: ReturnType<typeof toNounRows>) =>
	rows.map((r) => (r.kind === "pair" ? `${r.left.lemma}|${r.right.lemma}` : r.noun.lemma));

describe("toNounRows", () => {
	it("pairs counterparts into one row", () => {
		expect(lemmas(toNounRows([n("πατέρας"), n("μητέρα")], PAIRS))).toEqual(["πατέρας|μητέρα"]);
	});

	it("leaves a noun single when its counterpart is absent", () => {
		expect(lemmas(toNounRows([n("πατέρας"), n("παιδί")], PAIRS))).toEqual(["πατέρας", "παιδί"]);
	});

	// The incoming order is CEFR then frequency. Collecting every pair into a
	// block ahead of the singles threw that away.
	it("keeps the incoming order, placing a pair where its first member sat", () => {
		const rows = toNounRows([n("παιδί"), n("μπαμπάς"), n("μωρό"), n("μαμά")], PAIRS);
		expect(lemmas(rows)).toEqual(["παιδί", "μπαμπάς|μαμά", "μωρό"]);
	});

	it("never repeats a noun that was consumed by a pair", () => {
		const rows = toNounRows([n("μαμά"), n("μπαμπάς")], PAIRS);
		expect(rows).toHaveLength(1);
		expect(lemmas(rows)).toEqual(["μπαμπάς|μαμά"]);
	});

	it("orients the pair as defined, whichever member comes first", () => {
		const rows = toNounRows([n("κορίτσι"), n("αγόρι")], PAIRS);
		expect(lemmas(rows)).toEqual(["αγόρι|κορίτσι"]);
	});

	it("returns plain singles when the subject defines no pairs", () => {
		expect(lemmas(toNounRows([n("γάτα"), n("σκύλος")], []))).toEqual(["γάτα", "σκύλος"]);
	});
});
