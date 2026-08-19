import { describe, expect, it } from "vitest";

import corpus from "@/lib/__fixtures__/pronunciation-corpus.json";
import { greekToPronunciation } from "@/lib/greek-phonetic";
import { matchPhonetic } from "@/lib/greek-transliteration";

/**
 * The contract between the two conventions: a learner who types exactly what the
 * pronunciation gloss shows them must be graded correct.
 *
 * These are separate modules with separate jobs — `greek-phonetic.ts` decides
 * what is displayed, `greek-transliteration.ts` decides what is accepted — and
 * nothing structurally keeps them in agreement. Showing a spelling we then
 * reject is worse than showing the wrong spelling, so it is asserted here.
 */

/**
 * Empty, and it should stay that way.
 *
 * It once held 40 words, all failing for two reasons that turned out to be
 * mechanical rather than fundamental:
 *
 * 1. `toPhoneticCanonical` protected "ph" from the h→i step, on the belief that
 *    φ renders "ph". It does not — φ maps to "f" — so the only thing that rule
 *    ever matched was π followed by η, which is exactly what it broke. αγάπη
 *    keyed as "agaph" and a typed "agapi" was rejected.
 * 2. The canonical rules are applied in sequence and were not confluent:
 *    collapsing οι→i creates an "ει" that the earlier ει→i rule has already
 *    passed. Running to a fixed point removed the order dependence.
 */
const KNOWN_UNTYPEABLE = new Set<string>([]);

const singleWords = Object.keys(corpus as Record<string, string>).filter((word) =>
	/^[Ͱ-Ͽἀ-῿]+$/.test(word),
);

describe("the gloss must be typeable", () => {
	it("accepts what it displays, for every word not known to be broken", () => {
		const regressions = singleWords
			.filter((word) => !KNOWN_UNTYPEABLE.has(word))
			.filter((word) => !matchPhonetic(greekToPronunciation(word), word).isCorrect)
			.map((word) => `${word} → shown "${greekToPronunciation(word)}", rejected`);

		expect(regressions).toEqual([]);
	});

	// γ renders "gh" in the gloss; the matcher must collapse it back to "g"
	it("accepts the gh spelling the gloss uses for γ", () => {
		expect(matchPhonetic("ghala", "γάλα").isCorrect).toBe(true);
		expect(matchPhonetic("sighnomi", "Συγγνώμη").isCorrect).toBe(true);
		expect(matchPhonetic("oghdonda", "ογδόντα").isCorrect).toBe(true);
	});

	// …without losing the plainer spelling a learner might reach for first
	it("still accepts the plain g spelling", () => {
		expect(matchPhonetic("gala", "γάλα").isCorrect).toBe(true);
		expect(matchPhonetic("signomi", "Συγγνώμη").isCorrect).toBe(true);
	});
});

describe("collisions in the matching key", () => {
	// φ maps to "f", so "ph" in the key can only ever be π followed by η.
	// Guarding it as if it were φ silently broke every πη word.
	it("accepts πη words spelled as they sound", () => {
		expect(matchPhonetic("agapi", "αγάπη").isCorrect).toBe(true);
		expect(matchPhonetic("pigha", "πήγα").isCorrect).toBe(true);
		expect(matchPhonetic("laspi", "λάσπη").isCorrect).toBe(true);
		expect(matchPhonetic("evropi", "Ευρώπη").isCorrect).toBe(true);
	});

	// τη and θ both key as "th" — deliberately not disambiguated, both accepted
	it("still accepts either reading of th", () => {
		expect(matchPhonetic("afti", "αυτή").isCorrect).toBe(true);
		expect(matchPhonetic("thelo", "θέλω").isCorrect).toBe(true);
	});

	// Sequential rules are not confluent: οι→i creates an "ει" the ει→i rule
	// has already passed. Only a fixed point makes these agree.
	it("accepts vowel collapses regardless of rule order", () => {
		expect(matchPhonetic("nei", "νέοι").isCorrect).toBe(true);
		expect(matchPhonetic("klei", "κλαίει").isCorrect).toBe(true);
	});
});
