/**
 * Cross-validates generateConjugations() against every regular verb in
 * FULL_VERB_CONJUGATIONS. Any mismatch = generator bug or hand-written
 * data inconsistency — both need fixing before we can thin the seed file.
 */
import { describe, expect, it } from "vitest";

import { FULL_VERB_CONJUGATIONS } from "./seed-data/vocabulary/verb-conjugations";
import { generateConjugations } from "./generate-conjugations";

// ─── Stem derivation ──────────────────────────────────────────────────────────

const stripAccents = (s: string) =>
	s
		.replace(/ά/g, "α").replace(/έ/g, "ε").replace(/ή/g, "η")
		.replace(/ί/g, "ι").replace(/ό/g, "ο").replace(/ύ/g, "υ").replace(/ώ/g, "ω");

/**
 * Derive the unaccented aoristStem from the hand-written aorist sg1 form.
 * - Strip trailing -α
 * - If the result starts with ε but the lemma doesn't: strip the ε augment
 */
const deriveAoristStem = (lemma: string, aoristSg1: string): string => {
	const plain = stripAccents(aoristSg1);
	const withoutA = plain.endsWith("α") ? plain.slice(0, -1) : plain;
	if (withoutA.startsWith("ε") && !stripAccents(lemma).startsWith("ε")) {
		return withoutA.slice(1); // strip ε augment
	}
	return withoutA;
};

/** For -άμαι: strip -ήθηκα to get the root. */
const deriveAmaiRoot = (aoristSg1: string): string =>
	stripAccents(aoristSg1).replace(/ηθηκα$/, "");

// ─── Validation ───────────────────────────────────────────────────────────────

const GENERATABLE_FAMILIES = ["-ω", "-άω/-ώ", "-άμαι"] as const;

const TENSES = ["present", "aorist", "past_continuous", "future"] as const;
const PERSONS = ["sg1", "sg2", "sg3", "pl1", "pl2", "pl3"] as const;

describe("generateConjugations matches hand-written data", () => {
	const regularVerbs = FULL_VERB_CONJUGATIONS.filter(
		(v) =>
			GENERATABLE_FAMILIES.includes(v.conjugationFamily as (typeof GENERATABLE_FAMILIES)[number]) &&
			!v.isSuppletive &&
			v.conjugations?.length === 4, // must have all 4 tenses
	);

	for (const verb of regularVerbs) {
		it(`${verb.lemma} (${verb.conjugationFamily})`, () => {
			const family = verb.conjugationFamily as (typeof GENERATABLE_FAMILIES)[number];
			const aoristEntry = verb.conjugations!.find((c) => c.tense === "aorist");
			if (!aoristEntry) return; // skip if no aorist

			const aoristSg1 = aoristEntry.forms.sg1;
			const aoristStem =
				family === "-άμαι"
					? deriveAmaiRoot(aoristSg1)
					: deriveAoristStem(verb.lemma, aoristSg1);

			const generated = generateConjugations(verb.lemma, aoristStem, family);

			for (const tense of TENSES) {
				const expected = verb.conjugations!.find((c) => c.tense === tense)?.forms;
				const actual = generated.find((c) => c.tense === tense)?.forms;
				if (!expected || !actual) continue;

				for (const person of PERSONS) {
					expect(actual[person], `${verb.lemma} ${tense} ${person}`).toBe(expected[person]);
				}
			}
		});
	}
});
