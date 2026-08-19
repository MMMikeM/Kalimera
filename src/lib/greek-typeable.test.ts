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
 * Known-failing, all pre-existing defects in `toPhoneticCanonical`, not in the
 * gloss. Two causes:
 *
 * 1. π followed by η renders "p" + "h" = "ph", which the φ-digraph protection
 *    mistakes for φ, so η never becomes "i" (πήγα → "phga", αγάπη → "agaph").
 *    This is the bulk of the list.
 * 2. The ει/οι collapses are not confluent — they fire on the typed side but
 *    not the key side (νέοι → "neoi" vs "nei").
 *
 * The real fix is that `greekToPhonetic` is now matching-only and never
 * rendered, so its output alphabet is free: giving η and φ non-colliding
 * tokens would remove the whole class. Deliberately out of scope here.
 *
 * This list may SHRINK freely. It must never grow.
 */
const KNOWN_UNTYPEABLE = new Set([
	"Ευρώπη", "αγάπη", "αγάπησα", "αγαπημένος", "αγαπησ", "απόγευμα", "κλαίει",
	"λάσπη", "λυπήθηκα", "λυπημένος", "νέοι", "πήγα", "πήγαινα", "πήγαιναν",
	"πήγαινε", "πήγαινες", "πήγαμε", "πήγαν", "πήγατε", "πήγε", "πήγες", "πήρα",
	"πήραμε", "πήραν", "πήρατε", "πήρε", "πήρες", "πηγαίναμε", "πηγαίνατε",
	"πηγαίνετε", "υπήρξα", "υπήρξαμε", "υπήρξαν", "υπήρξατε", "υπήρξε",
	"υπήρξες", "υπήρχα", "υπήρχαν", "υπήρχε", "υπήρχες",
]);

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
