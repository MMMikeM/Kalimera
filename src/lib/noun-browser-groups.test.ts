import { describe, expect, it } from "vitest";

import { groupNounsBySubject } from "./noun-browser-groups";

type Row = Parameters<typeof groupNounsBySubject>[0][number];

const row = (greekText: string, slug: string, extra: Partial<Row> = {}): Row => ({
	id: greekText.length,
	greekText,
	englishTranslation: `${greekText}-en`,
	cefrLevel: "A1",
	frequencyRank: 100,
	nounDetails: { gender: "feminine" },
	nominalForms: [
		{ grammaticalCase: "nominative", number: "singular", form: greekText, article: "η" },
	],
	vocabularyTags: [
		{ tag: { slug, name: slug.toUpperCase(), section: "nouns", sectionDisplayOrder: 1 } },
	],
	...extra,
});

describe("groupNounsBySubject", () => {
	// The subject page filters on these, so they have to survive grouping.
	it("carries cefrLevel and frequencyRank onto each noun", () => {
		const [group] = groupNounsBySubject([
			row("ώρα", "time-calendar", { cefrLevel: "A2", frequencyRank: 115 }),
		]);

		expect(group?.nouns[0]).toMatchObject({ cefrLevel: "A2", frequencyRank: 115 });
	});

	it("keeps an unlevelled or unranked noun rather than dropping it", () => {
		const [group] = groupNounsBySubject([
			row("κάτι", "core-nouns", { cefrLevel: "0", frequencyRank: null }),
		]);

		expect(group?.nouns[0]).toMatchObject({ cefrLevel: "0", frequencyRank: null });
	});

	it("ignores tags outside the nouns section", () => {
		const lessonTagged = row("σπίτι", "household", {
			vocabularyTags: [
				{ tag: { slug: "lesson-2024-04-22", name: "Lesson", section: null, sectionDisplayOrder: null } },
			],
		});

		expect(groupNounsBySubject([lessonTagged])).toEqual([]);
	});
});
