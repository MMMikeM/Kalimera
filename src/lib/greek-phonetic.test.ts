import { describe, expect, it } from "vitest";

import { greekToPronunciation, greekToPronunciationTokens } from "@/lib/greek-phonetic";
import { greekToPhonetic } from "@/lib/greek-transliteration";

describe("greekToPronunciation", () => {
	describe("vowels render as sounds, not letters", () => {
		// The contrast with greek-transliteration.ts, which emits "h" and "w"
		it("renders η as i", () => {
			expect(greekToPronunciation("Καλημέρα")).toBe("kalimera");
		});

		it("renders ω as o", () => {
			expect(greekToPronunciation("Θέλω")).toBe("thelo");
		});

		it("renders πώς as pos, never pws", () => {
			expect(greekToPronunciation("πώς")).toBe("pos");
		});

		it("renders ζωή as zoi", () => {
			expect(greekToPronunciation("ζωή")).toBe("zoi");
		});

		it("collapses αι to e", () => {
			expect(greekToPronunciation("Δεν καταλαβαίνω")).toBe("den katalaveno");
		});

		it("collapses ει to i", () => {
			expect(greekToPronunciation("Πού είναι")).toBe("pou ine");
		});
	});

	describe("αυ/ευ voice by context", () => {
		it("devoices ευ before a voiceless consonant", () => {
			expect(greekToPronunciation("Ευχαριστώ")).toBe("efcharisto");
		});

		it("devoices ευ in Δευτέρα", () => {
			expect(greekToPronunciation("Δευτέρα")).toBe("deftera");
		});

		it("keeps ευ voiced before a vowel", () => {
			expect(greekToPronunciation("Παρασκευή")).toBe("paraskevi");
		});
	});

	describe("γ", () => {
		// [ɣ] before back vowels — a fricative, not English hard [g]
		it("renders γ as gh before a back vowel", () => {
			expect(greekToPronunciation("γάλα")).toBe("ghala");
		});

		// [ʝ] before front vowels
		it("renders γ as y before ι", () => {
			expect(greekToPronunciation("γιατί")).toBe("yiati");
		});

		it("renders γ as y before ε", () => {
			expect(greekToPronunciation("λέγεται")).toBe("leyete");
		});

		// Regression: ει→i once fired first, yielding "gia sou" while γιατί gave
		// "yiati" — same sound after γ, two different renderings
		it("renders γει as yi, consistently with γι", () => {
			expect(greekToPronunciation("Γεια σου")).toBe("yia sou");
		});

		it("renders γγ as ng", () => {
			expect(greekToPronunciation("αγγλικά")).toBe("anglika");
		});

		// συγγνώμη is [siɣnomi]: γγ before ν carries no nasal
		it("drops the nasal in γγν", () => {
			expect(greekToPronunciation("Συγγνώμη")).toBe("sighnomi");
		});
	});

	describe("stop clusters", () => {
		it("voices word-initial μπ to b", () => {
			expect(greekToPronunciation("μπύρα")).toBe("bira");
		});

		it("renders medial ντ as nd", () => {
			expect(greekToPronunciation("ο άντρας")).toBe("o andras");
		});

		it("renders medial ντ as nd in τριάντα", () => {
			expect(greekToPronunciation("τριάντα")).toBe("trianda");
		});
	});

	it("is case- and accent-insensitive", () => {
		expect(greekToPronunciation("ΚΑΛΗΜΈΡΑ")).toBe(greekToPronunciation("καλημερα"));
	});

	// Guard against the two conventions being silently swapped at a call site.
	// If this ever passes, one module has drifted into the other's job.
	it("does not agree with the keyboard transliteration", () => {
		for (const word of ["πώς", "ζωή", "Θέλω", "γάλα"]) {
			expect(greekToPronunciation(word)).not.toBe(greekToPhonetic(word));
		}
	});
});

describe("digraph breaks", () => {
	// A diaeresis or a first-vowel accent means two sounds, not one. Both
	// signals are diacritics, so a naive strip destroys them before the
	// digraph rules run — ταΐζω would read as the αι sound and give "tezo".
	it("keeps ταΐζω as two vowels", () => {
		expect(greekToPronunciation("ταΐζω")).toBe("taizo");
	});

	it("keeps τάϊσα as two vowels", () => {
		expect(greekToPronunciation("τάϊσα")).toBe("taisa");
	});

	it("keeps τρόλεϊ as two vowels", () => {
		expect(greekToPronunciation("τρόλεϊ")).toBe("trolei");
	});

	it("keeps Μάιος as two vowels, on the accent alone", () => {
		expect(greekToPronunciation("Μάιος")).toBe("maios");
	});

	// The diaeresis also has to defeat the γ-fronting rule, not just the vowels
	it("does not front γ across a broken pair", () => {
		expect(greekToPronunciation("γαϊδούρι")).toBe("ghaidouri");
	});

	it("still collapses a genuine digraph", () => {
		expect(greekToPronunciation("καταλαβαίνω")).toBe("katalaveno");
		expect(greekToPronunciation("είναι")).toBe("ine");
	});
});

describe("greekToPronunciationTokens", () => {
	const render = (greek: string) =>
		greekToPronunciationTokens(greek)
			.map((token) => (token.stressed ? `[${token.text}]` : token.text))
			.join("");

	it("marks the stressed vowel", () => {
		expect(render("καλημέρα")).toBe("kalim[e]ra");
	});

	// The acute sits on the second element of ού, but the digraph is one sound
	it("marks a whole vowel digraph, not a fragment", () => {
		expect(render("γαϊδούρι")).toBe("ghaid[ou]ri");
	});

	// stressStart must skip the consonant the γ-fronting rule contributes
	it("excludes the consonant from a fronted γ", () => {
		expect(render("γή")).toBe("y[i]");
	});

	it("marks stress across a digraph break", () => {
		expect(render("Μάιος")).toBe("m[a]ios");
		expect(render("ταΐζω")).toBe("ta[i]zo");
	});

	it("marks one run per word", () => {
		expect(render("Θέλω καφέ")).toBe("th[e]lo kaf[e]");
	});

	// Callers must not synthesise a stress mark when the source has no accent
	it("yields no stressed token for unaccented words", () => {
		for (const word of ["τι", "με", "και", "σου"]) {
			expect(greekToPronunciationTokens(word).some((t) => t.stressed)).toBe(false);
		}
	});

	it("yields no stressed token for uppercase set without tonos", () => {
		expect(greekToPronunciationTokens("ΘΕΛΩ").some((t) => t.stressed)).toBe(false);
	});

	it("joins back to the plain gloss", () => {
		for (const word of ["καλημέρα", "γαϊδούρι", "συγγνώμη", "Ευχαριστώ", "Θέλω καφέ"]) {
			expect(greekToPronunciationTokens(word).map((t) => t.text).join("")).toBe(
				greekToPronunciation(word),
			);
		}
	});
});
