import { describe, expect, it } from "vitest";

import { groupNounsByPattern } from "./noun-paradigm-groups";

type Row = Parameters<typeof groupNounsByPattern>[0][number];

const row = (
	greekText: string,
	declensionPattern: string | null,
	extra: Partial<Row> = {},
): Row => ({
	greekText,
	englishTranslation: `${greekText}-en`,
	cefrLevel: "A1",
	frequencyRank: null,
	nounDetails: declensionPattern === null ? null : { declensionPattern },
	nominalForms: [
		{ grammaticalCase: "nominative", number: "singular", form: greekText, article: "ο" },
		{ grammaticalCase: "genitive", number: "plural", form: `${greekText}ων`, article: "των" },
	],
	...extra,
});

describe("groupNounsByPattern", () => {
	it("groups by declension pattern and counts every member", () => {
		const grouped = groupNounsByPattern([
			row("φίλος", "masc-os"),
			row("κόσμος", "masc-os"),
			row("βιβλίο", "neut-o"),
		]);

		expect(grouped["masc-os"]?.count).toBe(2);
		expect(grouped["neut-o"]?.count).toBe(1);
	});

	// Days, months and numbers ("ο Ιανουάριος") have no noun_details row and carry
	// their article inside greek_text, so they must not reach the paradigm tables.
	it("drops rows with no noun_details from both examples and counts", () => {
		const grouped = groupNounsByPattern([row("φίλος", "masc-os"), row("ο Ιανουάριος", null)]);

		expect(grouped["masc-os"]?.count).toBe(1);
		expect(Object.values(grouped).flatMap((g) => g.examples.map((e) => e.lemma))).toEqual(["φίλος"]);
	});

	it("counts every member but caps example candidates", () => {
		const grouped = groupNounsByPattern(
			["α", "β", "γ", "δ", "ε", "ζ", "η", "θ"].map((lemma) => row(lemma, "masc-os")),
		);

		expect(grouped["masc-os"]?.count).toBe(8);
		expect(grouped["masc-os"]?.examples).toHaveLength(6);
	});

	it("orders examples by CEFR level, then by frequency rank", () => {
		const grouped = groupNounsByPattern([
			row("rare", "masc-os", { cefrLevel: "A1", frequencyRank: 900 }),
			row("later", "masc-os", { cefrLevel: "B1", frequencyRank: 1 }),
			row("common", "masc-os", { cefrLevel: "A1", frequencyRank: 2 }),
		]);

		expect(grouped["masc-os"]?.examples.map((e) => e.lemma)).toEqual(["common", "rare", "later"]);
	});

	// 190 rows in the vocabulary table store cefr_level as "0". Sorting the raw
	// string puts every one of them ahead of A1, because "0" < "A" lexically —
	// which buried άνθρωπος under όπλο on the live page.
	it("sorts unrecognised CEFR values last, not first", () => {
		const grouped = groupNounsByPattern([
			row("junk", "masc-os", { cefrLevel: "0", frequencyRank: 1 }),
			row("άνθρωπος", "masc-os", { cefrLevel: "A1", frequencyRank: 342 }),
		]);

		expect(grouped["masc-os"]?.examples.map((e) => e.lemma)).toEqual(["άνθρωπος", "junk"]);
	});

	it("sorts a null CEFR level last too", () => {
		const grouped = groupNounsByPattern([
			row("unknown", "masc-os", { cefrLevel: null, frequencyRank: 1 }),
			row("classified", "masc-os", { cefrLevel: "B2", frequencyRank: 900 }),
		]);

		expect(grouped["masc-os"]?.examples.map((e) => e.lemma)).toEqual(["classified", "unknown"]);
	});

	// A null rank must sort last, not first — the drill pool guards this the same way.
	it("sinks unranked nouns below ranked ones at the same level", () => {
		const grouped = groupNounsByPattern([
			row("unranked", "masc-os", { frequencyRank: null }),
			row("ranked", "masc-os", { frequencyRank: 500 }),
		]);

		expect(grouped["masc-os"]?.examples.map((e) => e.lemma)).toEqual(["ranked", "unranked"]);
	});

	it("keys stored forms as case_number so the table can look them up", () => {
		const grouped = groupNounsByPattern([row("φίλος", "masc-os")]);

		expect(grouped["masc-os"]?.examples[0]?.forms).toMatchObject({
			nominative_singular: { form: "φίλος", article: "ο" },
			genitive_plural: { form: "φίλοςων", article: "των" },
		});
	});

	it("returns an empty map rather than throwing when there are no nouns", () => {
		expect(groupNounsByPattern([])).toEqual({});
	});
});
