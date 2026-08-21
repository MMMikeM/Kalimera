import { describe, expect, it } from "vitest";

import { cefrLevels } from "@/server/db/enums";

import { NOUN_ITEMS } from "./nouns";
import { NUMBER_ITEMS } from "./numbers";
import { DAY_ITEMS, MONTH_ITEMS } from "./phrases";

const VALID = new Set<string>(cefrLevels);
const ITEMS = [...NOUN_ITEMS, ...DAY_ITEMS, ...MONTH_ITEMS, ...NUMBER_ITEMS];

/**
 * The seed types now require cefrLevel, which is what covers the lesson files —
 * they are loaded through createRequire at runtime, so they cannot be imported
 * here, but their literals are typed and the typecheck enforces the field.
 *
 * This guards the assembled vocabulary rows instead. The column has no CHECK
 * constraint, which is how 138 rows came to hold the string "0" — a value no
 * seed produces and which the upsert never clears, because it keeps the
 * existing level whenever the incoming one is null.
 */
describe("CEFR levels on assembled vocabulary", () => {
	it("gives every noun a level", () => {
		const missing = ITEMS.filter((i) => !i.vocab.cefrLevel).map((i) => i.vocab.greekText);
		expect(missing).toEqual([]);
	});

	it("never emits a level outside the CEFR enum", () => {
		const bad = ITEMS.filter((i) => !VALID.has(String(i.vocab.cefrLevel))).map(
			(i) => `${i.vocab.greekText}=${i.vocab.cefrLevel}`,
		);
		expect(bad).toEqual([]);
	});

	// Counting is first-lesson material whatever the corpus rank says: ένα is
	// ranked 51 but δεκαεννέα is 37,818, and both belong in the same lesson.
	it("levels the numerals as A1 regardless of corpus rank", () => {
		expect(NUMBER_ITEMS.every((n) => n.vocab.cefrLevel === "A1")).toBe(true);
	});

	it("levels the calendar nouns, which the frequency corpus does not rank", () => {
		expect([...DAY_ITEMS, ...MONTH_ITEMS].every((i) => i.vocab.cefrLevel === "A1")).toBe(true);
	});
});
