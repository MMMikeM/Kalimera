import { createFuzzySearch } from "ekrina";
import { describe, expect, it } from "vitest";

import { type SearchableVocabulary, vocabularySearchFields } from "./vocabulary-search-fields";

const vocab = (
	greekText: string,
	englishTranslation: string,
	tagNames: string[] = [],
): SearchableVocabulary => ({
	greekText,
	englishTranslation,
	vocabularyTags: tagNames.map((name) => ({ tag: { name } })),
});

const POOL: SearchableVocabulary[] = [
	vocab("ξυπνάω", "I wake up", ["Daily Routine"]),
	vocab("καλοκαίρι", "summer", ["Summer", "Seasons"]),
	vocab("χειμώνας", "winter", ["Seasons"]),
	vocab("παγωτό", "ice cream", ["Summer", "Food"]),
	vocab("τρέχω", "I run", []),
	vocab("τραπέζι", "table", ["Furniture"]),
];

const search = createFuzzySearch(POOL, vocabularySearchFields);
const greekResults = (query: string) => search(query).map((r) => r.item.greekText);

describe("vocabulary search fields", () => {
	it("matches Greek text", () => {
		expect(greekResults("τρέχω")).toContain("τρέχω");
	});

	it("matches Greek text without accents", () => {
		expect(greekResults("ξυπναω")).toContain("ξυπνάω");
	});

	it("matches English translations", () => {
		expect(greekResults("wake")).toContain("ξυπνάω");
	});

	it("matches tag names", () => {
		const results = greekResults("summer");
		expect(results).toContain("καλοκαίρι");
		expect(results).toContain("παγωτό");
		expect(results).not.toContain("χειμώνας");
	});

	it("does not match every tagged item via object stringification", () => {
		// Regression: joining tag objects produced "[object Object]", making
		// queries like "object" match everything that had any tag at all.
		expect(greekResults("object")).toEqual([]);
	});

	it("ranks an exact Greek match above a fuzzy one", () => {
		const results = greekResults("τρέχω");
		expect(results[0]).toBe("τρέχω");
	});

	it("skips items whose tag list is empty rather than matching empty text", () => {
		const untagged = search("τρέχω").find((r) => r.item.greekText === "τρέχω");
		expect(untagged).toBeDefined();
		// The tag field (index 2) must be skipped, not matched, for untagged items
		expect(untagged?.fields[2]).toBeNull();
	});
});
