import { describe, expect, it } from "vite-plus/test";

import { PATTERNS } from "@/routes/practice/path/patterns.data";
import { UNITS, UNIT_PATH } from "@/routes/practice/path/units.data";

import {
	type UnitStage,
	type WordForms,
	isNoun,
	lemmaOf,
	negateEnglish,
	patternsSoFar,
	scrambled,
	unitStageItems,
	unitStageSize,
} from "./units";

const STAGES: UnitStage[] = ["meet", "recognise", "recall", "pattern", "sentences", "check"];

/** Stand-in forms: the shape the vocabulary table gives, without the DB. */
const fakeForms = () =>
	new Map<string, WordForms>(
		UNITS.flatMap((u) => u.words).map((word, i) => [
			lemmaOf(word),
			isNoun(word)
				? { vocabId: i, english: "thing", noun: { name: word.greek, target: `τον ${lemmaOf(word)}` } }
				: { vocabId: i, english: "I do", present: { sg1: word.greek, sg2: "x", sg3: "y" } },
		]),
	);

describe("unit stages", () => {
	it("drill exactly as many items as the server expects, so every stage can be passed", () => {
		const forms = fakeForms();
		UNITS.forEach((_, index) => {
			for (const stage of STAGES.filter((s) => s !== "meet")) {
				expect(unitStageItems(UNITS, index, stage, forms)).toHaveLength(unitStageSize(UNITS, index, stage));
			}
		});
	});

	it("carry earlier patterns forward onto a later unit's words", () => {
		expect(patternsSoFar(UNITS, 2)).toEqual(["persons-singular", "target-form", "saying-no"]);
		const ids = unitStageItems(UNITS, 2, "pattern", fakeForms()).map((item) => item.id);
		expect(ids).toContain("wanting-knowing:sg2:θέλω");
		expect(ids).toContain("wanting-knowing:target:σπίτι");
		expect(ids).toContain("wanting-knowing:no:θέλω");
	});

	it("give each sentence's words out of order, and leave them out of the check", () => {
		expect(scrambled("Πού πας;")).toBe("πας · Πού");
		const [sentence] = unitStageItems(UNITS, 0, "sentences", fakeForms());
		expect(sentence?.detail).toBe(scrambled(sentence!.greek));
		const check = unitStageItems(UNITS, 0, "check", fakeForms());
		expect(check.find((item) => item.id === sentence!.id)?.detail).toBeUndefined();
	});

	it("say no in English the way people do", () => {
		expect(negateEnglish("I want")).toBe("I don't want");
		expect(negateEnglish("I can")).toBe("I can't");
	});
});

describe("unit content", () => {
	it("keeps each unit to two screens of new words", () => {
		for (const unit of UNITS) expect(unit.words.length).toBeLessThanOrEqual(6);
	});

	it("marks at most three breaks in any pattern table", () => {
		for (const unit of UNITS) {
			for (const id of patternsSoFar(UNITS, UNITS.indexOf(unit))) {
				const marked = unit.words.filter((w) => PATTERNS[id].breaks[w.greek]);
				expect(marked.length).toBeLessThanOrEqual(3);
			}
		}
	});

	const bare = (word: string) => word.toLowerCase().normalize("NFD").replace(/\p{M}/gu, "");
	/** Words any sentence may use: the little words, names, and nouns the meet examples show. */
	const FREE = new Set(
		"πού δεν τώρα αύριο στο στη στην στον τον την τη το να σπίτι νερό μαρία νίκο αθήνα πάρκο"
			.split(" ")
			.map(bare),
	);

	it("builds sentences only from words the unit or an earlier one has shown", () => {
		UNITS.forEach((unit, index) => {
			const seen = UNITS.slice(0, index + 1).flatMap((u) => u.words.map((w) => bare(lemmaOf(w))));
			for (const sentence of unit.sentences) {
				for (const word of sentence.greek.replace(/[;;?!.,]/g, "").split(/\s+/)) {
					const known =
						FREE.has(bare(word)) ||
						seen.some((lemma) => bare(word).startsWith(lemma.slice(0, Math.min(3, lemma.length - 1))));
					expect(known, `${unit.id}: "${word}" in "${sentence.greek}"`).toBe(true);
				}
			}
		});
	});
});

describe("unit steps", () => {
	const step = (id: string) => UNIT_PATH.find((s) => s.id === id)!;

	it("opens a unit once the last one is typed, and never with two units unfinished", () => {
		expect(step("unit:giving-taking:meet").requires).toEqual(["unit:coming-going:recall"]);
		expect(step("unit:wanting-knowing:meet").requires).toEqual([
			"unit:giving-taking:recall",
			"unit:coming-going:check",
		]);
	});

	it("waits a night before the forms and before the check", () => {
		expect(step("unit:coming-going:pattern").heldUntilNextDay).toBe(true);
		expect(step("unit:coming-going:check").heldUntilNextDay).toBe(true);
		expect(step("unit:coming-going:check").gate).toBeUndefined();
	});
});
