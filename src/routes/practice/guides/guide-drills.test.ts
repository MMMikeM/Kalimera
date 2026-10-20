import { describe, expect, it } from "vite-plus/test";

import { greekToPhonetic, matchPhonetic } from "@/lib/greek-transliteration";
import { GUIDES } from "@/routes/guides/guides.data";

import type { SimpleListItem } from "../components/engines/deck";
import { GUIDE_DRILLS } from "./drills.data";

const ITEM_FILES = import.meta.glob<{ ITEMS: SimpleListItem[]; OPTIONS?: string[] }>(
	["./*/*.data.ts", "!./*/drills.data.ts"],
	{ eager: true },
);

const itemSets = Object.entries(ITEM_FILES).map(([path, module]) => ({
	path,
	items: module.ITEMS,
	options: module.OPTIONS,
}));

describe("guide drill items", () => {
	it("finds the item files", () => {
		expect(itemSets.length).toBeGreaterThan(0);
	});

	it.each(itemSets)("$path exports enough cards", ({ items }) => {
		expect(items.length).toBeGreaterThanOrEqual(12);
	});

	it.each(itemSets)("$path has unique ids", ({ items }) => {
		expect(new Set(items.map((item) => item.id)).size).toBe(items.length);
	});

	it.each(itemSets)("$path gives every card a prompt and an answer", ({ items }) => {
		for (const item of items) {
			expect(item.label.trim(), item.id).not.toBe("");
			expect(item.greek.trim(), item.id).not.toBe("");
			expect(item.greek, item.id).not.toContain("___");
		}
	});

	it.each(itemSets)("$path never asks the same card twice", ({ items }) => {
		const prompts = items.map((item) => `${item.context ?? ""}|${item.label}`);
		expect(new Set(prompts).size).toBe(items.length);
	});

	const typedSets = itemSets.filter(({ options }) => !options);
	const choiceSets = itemSets.filter(({ options }) => options);

	it.each(typedSets)("$path accepts its own answers, typed in Latin", ({ items }) => {
		for (const item of items) {
			expect(matchPhonetic(greekToPhonetic(item.greek), item.greek).isCorrect, item.id).toBe(true);
		}
	});

	it.each(typedSets)("$path uses acceptAlso only for an answer the grader would reject", ({ items }) => {
		for (const item of items.filter((card) => card.acceptAlso)) {
			const typed = greekToPhonetic(item.acceptAlso ?? "");
			expect(matchPhonetic(typed, item.greek).isCorrect, item.id).toBe(false);
		}
	});

	it.each(choiceSets)("$path gives every choice card a gap and a listed answer", ({ items, options }) => {
		for (const item of items) {
			expect(item.reverseGreek, item.id).toContain("___");
			expect(options, item.id).toContain(item.dimension);
		}
	});
});

describe("guide drill entries", () => {
	const entries = Object.entries(GUIDE_DRILLS).flatMap(([slug, drills]) => drills.map((drill) => ({ slug, drill })));

	it("keys every list by a real guide", () => {
		const slugs = new Set(GUIDES.map((guide) => guide.slug));
		expect(Object.keys(GUIDE_DRILLS).filter((slug) => !slugs.has(slug))).toEqual([]);
	});

	it("routes each drill under its guide", () => {
		expect(entries.filter(({ slug, drill }) => !drill.to.startsWith(`/practice/guides/${slug}/`))).toEqual([]);
	});

	it("links each drill from a section of its guide", () => {
		const linked = (slug: string, id: string) =>
			GUIDES.find((guide) => guide.slug === slug)?.sections.some((section) => section.drills.includes(id));
		expect(entries.filter(({ slug, drill }) => !linked(slug, drill.id)).map(({ drill }) => drill.id)).toEqual([]);
	});
});
