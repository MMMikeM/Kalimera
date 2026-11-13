import { describe, expect, it } from "vite-plus/test";

import { isPublicRow } from "./search-visibility";

const row = (wordType: string, ...slugs: string[]) => ({
	wordType,
	vocabularyTags: slugs.map((slug) => ({ tag: { slug } })),
});

describe("which rows the search sends to everyone", () => {
	it("keeps a phrase with a public tag", () => {
		expect(isPublicRow(row("phrase", "survival"))).toBe(true);
		expect(isPublicRow(row("phrase", "lesson-2024-03-01", "survival"))).toBe(true);
	});

	it("holds back a phrase with only lesson tags or none", () => {
		expect(isPublicRow(row("phrase", "lesson-2024-03-01"))).toBe(false);
		expect(isPublicRow(row("phrase"))).toBe(false);
		expect(isPublicRow({ wordType: "phrase", vocabularyTags: [{ tag: null }] })).toBe(false);
	});

	it("keeps every other word, tagged or not", () => {
		expect(isPublicRow(row("noun"))).toBe(true);
		expect(isPublicRow(row("verb", "lesson-2024-03-01"))).toBe(true);
	});
});
