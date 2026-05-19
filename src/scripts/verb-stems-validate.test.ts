/**
 * Validates each VerbStem entry in verb-stems.ts against the corresponding
 * hand-written entry in FULL_VERB_CONJUGATIONS. If all pass, the stems file
 * is safe to use as the authoritative source and the hand-written conjugations
 * for regular verbs can be removed.
 */
import { describe, expect, it } from "vitest";

import { VERB_STEMS } from "./seed-data/vocabulary/verb-stems";
import { FULL_VERB_CONJUGATIONS } from "./seed-data/vocabulary/verb-conjugations";
import { generateConjugations } from "./generate-conjugations";

const TENSES = ["present", "aorist", "past_continuous", "future"] as const;
const PERSONS = ["sg1", "sg2", "sg3", "pl1", "pl2", "pl3"] as const;

describe("VERB_STEMS — generated forms match hand-written data", () => {
	for (const stem of VERB_STEMS) {
		it(`${stem.lemma} (${stem.family})`, () => {
			const handWritten = FULL_VERB_CONJUGATIONS.find((v) => v.lemma === stem.lemma);
			if (!handWritten?.conjugations) {
				// Not in hand-written file — skip (new lesson verb, no ground truth yet)
				return;
			}

			const generated = generateConjugations(stem.lemma, stem.aoristStem, stem.family);

			for (const tense of TENSES) {
				const expected = handWritten.conjugations.find((c) => c.tense === tense)?.forms;
				const actual = generated.find((c) => c.tense === tense)?.forms;
				if (!expected || !actual) continue;

				for (const person of PERSONS) {
					expect(actual[person], `${stem.lemma} ${tense} ${person}`).toBe(expected[person]);
				}
			}
		});
	}
});
