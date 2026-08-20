import { describe, expect, it } from "vitest";

import { DAY_ITEMS, MONTH_ITEMS } from "./phrases";

/**
 * Days and months are nouns. Seeding them as "η Δευτέρα" with the article inside
 * greek_text created a second vocabulary row beside the "Δευτέρα" that lessons
 * seed — so /learn/essentials/time listed every day and month twice — and left
 * them with no noun_details, which made the article-from-gender rendering on
 * that page impossible and forced a `?? "neuter"` fallback elsewhere.
 */
describe("calendar nouns", () => {
	it("seeds seven days and twelve months", () => {
		expect(DAY_ITEMS).toHaveLength(7);
		expect(MONTH_ITEMS).toHaveLength(12);
	});

	it.each([...DAY_ITEMS, ...MONTH_ITEMS])(
		"seeds $vocab.greekText as a bare lemma, no article",
		(item) => {
			expect(item.vocab.greekText).not.toMatch(/^(ο|η|το)\s/);
		},
	);

	it.each([...DAY_ITEMS, ...MONTH_ITEMS])("gives $vocab.greekText a gender", (item) => {
		expect(item.nounDetail?.gender).toBeDefined();
	});

	it("gets the genders right — Σάββατο is the only neuter day", () => {
		const genders = Object.fromEntries(
			DAY_ITEMS.map((d) => [d.vocab.greekText, d.nounDetail?.gender]),
		);
		expect(genders["Σάββατο"]).toBe("neuter");
		expect(genders["Δευτέρα"]).toBe("feminine");
		expect(genders["Κυριακή"]).toBe("feminine");
		expect(MONTH_ITEMS.every((m) => m.nounDetail?.gender === "masculine")).toBe(true);
	});

	it("declines them, so the browser and drills can use the forms", () => {
		const monday = DAY_ITEMS.find((d) => d.vocab.greekText === "Δευτέρα");
		expect(monday?.nounNominalForms?.genitive_singular?.form).toBe("Δευτέρας");
	});
});
