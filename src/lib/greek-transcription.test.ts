import { describe, expect, it } from "vitest";

import {
	TRANSCRIPTION_UNITS,
	matchesGreek,
	transcribe,
} from "@/lib/greek-transcription";

/**
 * The hard rules for the Latin string a learner types.
 *
 * SKIPPED until `greek-transcription.ts` is implemented — this file is the
 * specification, written first and reviewed before the table is built. Remove
 * the `.skip` as each block is satisfied.
 *
 * Every rule below is either forced by evidence or forced by a defect we have
 * already been bitten by. Rules that are still open — the ει/οι/αι digraphs —
 * are deliberately absent, and listed at the bottom as todos so their absence
 * is visible rather than assumed.
 *
 * Evidence base: a sample of real Greek/Cypriot social-media greeklish. Where
 * that sample is unanimous, the rule is hard. Where it is split, there is no
 * rule here yet.
 */

// Real greeklish, with the Greek reverse-engineered from it. Used to keep the
// spec anchored to observed usage rather than to a standards document alone.
const OBSERVED: [greek: string, written: string][] = [
	["εγώ", "ego"],
	["γίνεται", "ginete"],
	["γεμώσεις", "gemosis"],
	["Αυγούστου", "avgoustou"],
	["όμως", "omos"],
	["σωστά", "sosta"],
	["ζητάτε", "zitate"],
	["δηλαδή", "diladi"],
	["που", "pou"],
	["Τούρκους", "tourkous"],
	["βρίσκει", "vriski"],
	["κάθεται", "kathete"],
];

describe.skip("greek transcription — hard rules", () => {
	describe("output shape", () => {
		// A DELIBERATE DEVIATION from ISO 843, not a consequence of it.
		// Type 1 renders Θέλω as "Thélō" (macrons and accents); Type 2 drops the
		// macrons but KEEPS the tonos — σωστά is "sostá", πρόσφυγες is
		// "prósfyges". Neither is typeable on an English keyboard, and the
		// observed corpus drops accents entirely (sosta, prosfiges, omos).
		// So the typing target is Type 2 minus accents, and that is a choice.
		it("emits ASCII only — no diacritics, ever", () => {
			for (const [greek] of OBSERVED) {
				expect(transcribe(greek)).toMatch(/^[a-z ]+$/);
			}
		});

		it("is lowercase regardless of input case", () => {
			expect(transcribe("ΚΑΛΗΜΕΡΑ")).toBe(transcribe("καλημέρα"));
		});

		it("ignores accents on the input", () => {
			expect(transcribe("καλημέρα")).toBe(transcribe("καλημερα"));
		});

		it("is deterministic", () => {
			expect(transcribe("Συγγνώμη")).toBe(transcribe("Συγγνώμη"));
		});
	});

	describe("the table must be unambiguous", () => {
		// The defect class that produced two separate bugs already: φ and π+η
		// both yielding "ph", and χ→x colliding with ξ→x. Two Greek units that
		// render alike make the transcription unreadable back, and make any
		// normalisation step guess. Checked as a property, not per-case.
		it("never renders two different Greek units the same way", () => {
			const seen = new Map<string, string>();
			const collisions: string[] = [];

			for (const unit of TRANSCRIPTION_UNITS) {
				const previous = seen.get(unit.latin);
				if (previous && previous !== unit.greek) {
					collisions.push(`${previous} and ${unit.greek} both render "${unit.latin}"`);
				}
				seen.set(unit.latin, unit.greek);
			}

			expect(collisions).toEqual([]);
		});

		// χ→"x" is only available if ξ takes something else, and vice versa.
		it("does not let χ and ξ share a rendering", () => {
			const chi = TRANSCRIPTION_UNITS.find((u) => u.greek === "χ")?.latin;
			const xi = TRANSCRIPTION_UNITS.find((u) => u.greek === "ξ")?.latin;

			expect(chi).not.toBe(xi);
		});

		// A single letter must not produce a string that a sequence of other
		// letters could also produce — the π+η → "ph" trap.
		it("never renders a single letter as a sequence another pair could make", () => {
			const singles = TRANSCRIPTION_UNITS.filter((u) => u.greek.length === 1);
			const renderings = new Set(singles.map((u) => u.latin));
			const conflicts: string[] = [];

			for (const a of singles) {
				for (const b of singles) {
					const concatenated = a.latin + b.latin;
					if (renderings.has(concatenated)) {
						conflicts.push(`${a.greek}+${b.greek} renders "${concatenated}", same as a single letter`);
					}
				}
			}

			expect(conflicts).toEqual([]);
		});
	});

	describe("letters where the evidence is unanimous", () => {
		// Written "g" even before front vowels, where it is pronounced [ʝ].
		// This is the clearest split between transcription and pronunciation:
		// γίνεται is said "yinete" and written "ginete".
		it("renders γ as g everywhere, including before front vowels", () => {
			expect(transcribe("εγώ")).toBe("ego");
			expect(transcribe("γίνεται")).toContain("gin");
			expect(transcribe("γεμώσεις")).toContain("gem");
		});

		it("renders ω as o, never w", () => {
			expect(transcribe("όμως")).toBe("omos");
			expect(transcribe("σωστά")).toBe("sosta");
			expect(transcribe("εγώ")).toBe("ego");
		});

		it("renders η as i", () => {
			expect(transcribe("ζητάτε")).toBe("zitate");
			expect(transcribe("δηλαδή")).toBe("diladi");
		});

		it("renders ου as ou", () => {
			expect(transcribe("που")).toBe("pou");
			expect(transcribe("Τούρκους")).toBe("tourkous");
		});

		it("renders β as v and θ as th", () => {
			expect(transcribe("βρίσκει")).toContain("vrisk");
			expect(transcribe("κάθεται")).toContain("kath");
		});
	});

	describe("context-dependent rules", () => {
		// The one place the standard is not purely letter-for-letter.
		it("voices αυ and ευ before a vowel or voiced consonant", () => {
			expect(transcribe("Αυγούστου")).toBe("avgoustou");
		});

		it("devoices αυ and ευ before a voiceless consonant", () => {
			expect(transcribe("ευχαριστώ")).toBe("efcharisto");
		});
	});

	describe("matching is strict", () => {
		it("accepts the exact transcription", () => {
			expect(matchesGreek("kalimera", "Καλημέρα")).toBe(true);
		});

		it("accepts the Greek word itself", () => {
			expect(matchesGreek("Καλημέρα", "Καλημέρα")).toBe(true);
		});

		it("accepts Greek typed without accents", () => {
			expect(matchesGreek("καλημερα", "Καλημέρα")).toBe(true);
		});

		// No tolerated variants. Tightening happens by refining the table, not
		// by widening what is accepted.
		it("rejects a near-miss", () => {
			expect(matchesGreek("kalimerra", "Καλημέρα")).toBe(false);
			expect(matchesGreek("kalhmera", "Καλημέρα")).toBe(false);
		});

		it("rejects the pronunciation form when it differs from the transcription", () => {
			// γίνεται is said "yinete" but written "ginete"
			expect(matchesGreek("yinete", "γίνεται")).toBe(false);
		});

		it("ignores surrounding whitespace and case", () => {
			expect(matchesGreek("  KaliMera  ", "Καλημέρα")).toBe(true);
		});

		it("does not require terminal punctuation", () => {
			expect(matchesGreek(transcribe("Τι κάνεις"), "Τι κάνεις;")).toBe(true);
		});
	});

	describe("agrees with observed usage", () => {
		it("reproduces how real writers spell these", () => {
			const mismatches = OBSERVED.filter(([greek, written]) => transcribe(greek) !== written).map(
				([greek, written]) => `${greek}: expected "${written}", got "${transcribe(greek)}"`,
			);

			expect(mismatches).toEqual([]);
		});
	});
});

/**
 * Deliberately undecided. The evidence is split, so there is no hard rule yet:
 *
 *   ει → "ei" ×4 (Eseis, eipan, eixa) vs "i" ×8 (Emis, theli, erthi, dosi)
 *   οι → "oi" ×3 (oloi, Opoios)      vs "i" ×1 (kitaksete)
 *   αι → "ai" ×3 (kai, kairo)        vs "e" ×6 (fantazome, ginete, kathete)
 *
 * The same author writes "Eseis" and "Emis", and one sentence contains both
 * "ke" and "kairo". Native usage is not self-consistent, so matching real
 * writing was never an achievable target — this has to be decided, not derived.
 *
 * Likewise υ (ELOT says "y", observed usage says "i") and ξ, whose rendering is
 * constrained by whatever χ takes.
 */
describe.todo("digraphs ει / οι / αι — undecided, see plan");
describe.todo("υ — ELOT says y, observed usage says i");
describe.todo("ξ and χ — renderings are mutually constrained");
