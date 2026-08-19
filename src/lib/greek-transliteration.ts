/**
 * Greek \u2192 Latin keyboard transliteration, for answer matching.
 *
 * Letter-faithful and reversible: \u03b7\u2192"h", \u03c9\u2192"w", \u03b1\u03b9\u2192"ai", so the Greek spelling
 * survives the round trip. That makes it the right basis for comparing what a
 * learner typed, and the wrong thing to ever show them \u2014 it emits strings like
 * "pws" and "thelw" that nobody says.
 *
 * For anything learner-facing use `greekToPronunciation` from
 * `greek-phonetic.ts`. The two conventions are deliberately different systems.
 */

import { DIGRAPH_BREAK, applyWordInitialClusters, stripGreekDiacritics } from "@/lib/greek-letters";

// Digraphs must be processed before single letters (order matters)
const DIGRAPH_MAP: [RegExp, string][] = [
	// Vowel combinations first
	[/ου/gi, "ou"],
	[/αι/gi, "ai"],
	[/ει/gi, "i"],
	[/οι/gi, "oi"],
	[/υι/gi, "i"],

	// αυ/ευ - voiced before vowels/voiced consonants, unvoiced otherwise
	// Simplified: 'av'/'ev' as default (most common in speech)
	// Note: accented variants (αύ/εύ) are already stripped before this map runs
	[/αυ/gi, "av"],
	[/ευ/gi, "ev"],

	// Consonant clusters
	[/γγ/gi, "ng"],
	// γκ, μπ, ντ: word-initial vs medial handled in greekToPhonetic before this map
	[/γκ/gi, "ng"], // medial only (word-initial already replaced)
	[/μπ/gi, "mb"], // medial only
	[/ντ/gi, "nd"], // medial only
	[/τσ/gi, "ts"],
	[/τζ/gi, "dz"],

	// γ before ι/υ/ε sounds like 'y'
	[/γυ/gi, "yi"],
	[/γι/gi, "yi"],
	[/γη/gi, "yi"],
	[/γε/gi, "ye"],
	[/γαι/gi, "ye"],
];

const SINGLE_LETTER_MAP: Record<string, string> = {
	// Vowels
	α: "a",
	ε: "e",
	η: "h",
	ι: "i",
	ο: "o",
	υ: "i",
	ω: "w",

	// Consonants
	β: "v",
	γ: "g",
	δ: "d",
	ζ: "z",
	θ: "th",
	κ: "k",
	λ: "l",
	μ: "m",
	ν: "n",
	ξ: "ks",
	π: "p",
	ρ: "r",
	σ: "s",
	ς: "s", // final sigma
	τ: "t",
	φ: "f",
	χ: "ch",
	ψ: "ps",
};

/**
 * Convert Greek text to its Latin keyboard transliteration.
 *
 * Output is a matching key, not a gloss — do not render it.
 *
 * @example
 * greekToPhonetic("Θέλω καφέ") // "thelw kafe"
 * greekToPhonetic("ευχαριστώ") // "evcharistw"
 * greekToPhonetic("μπύρα") // "bira"
 * greekToPhonetic("ο άντρας") // "o andras"
 */
export const greekToPhonetic = (greek: string): string => {
	// Lowercase and strip diacritics
	let result = stripGreekDiacritics(greek.toLowerCase());

	// Word-initial clusters first, then medial via DIGRAPH_MAP
	result = applyWordInitialClusters(result);

	for (const [pattern, replacement] of DIGRAPH_MAP) {
		result = result.replace(pattern, replacement);
	}

	// Apply single letter replacements
	let output = "";
	for (const char of result) {
		output += SINGLE_LETTER_MAP[char] ?? char;
	}

	return output.replaceAll(DIGRAPH_BREAK, "");
};


/**
 * Normalize user input for comparison.
 * - Lowercase
 * - Trim whitespace
 * - Collapse multiple spaces
 */
const normalizeInput = (input: string): string => {
	return input.toLowerCase().trim().replace(/\s+/g, " ");
};

// Terminal punctuation is display, not sound. Stripped on both sides of a comparison so drill
// content can carry the authentic Greek question mark (Τι κάνεις;) without demanding the user
// type it. Deliberately NOT done in greekToPhonetic, which also feeds rendered pronunciation.
const stripTerminalPunctuation = (text: string): string => text.replace(/[;;?!.]+$/, "");

interface PhoneticMatchResult {
	isCorrect: boolean;
	userPhonetic: string;
	correctPhonetic: string;
	correctGreek: string;
}

// Greek definite articles (ο, η, το and their case forms)
const GREEK_ARTICLE_PATTERN = /^(ο|η|το|τον|την|του|της|οι|τα|τους|τις|των)\s+/i;

/**
 * Strip the Greek definite article from the beginning of a phrase.
 * Returns the phrase without the article prefix.
 */
const stripGreekArticle = (greek: string): string => {
	return greek.replace(GREEK_ARTICLE_PATTERN, "");
};

/**
 * Compare user's Latin input against the correct Greek answer.
 * Accepts the answer with or without the definite article.
 *
 * @example
 * matchPhonetic("thelo kafe", "Θέλω καφέ")
 * // { isCorrect: true, ... }
 *
 * // Article is optional for nouns:
 * matchPhonetic("kalokeri", "το καλοκαίρι")
 * // { isCorrect: true, ... }
 * matchPhonetic("to kalokeri", "το καλοκαίρι")
 * // { isCorrect: true, ... }
 */
// Collapse variant spellings on both sides so either form accepts.
// ει→i, αι→e, οι→i, υ→u→i: user can type letter-faithful ("kaneis") or phonetic ("kanis").
// nt→nd, mp→mb, nk→ng: letter-faithful cluster spellings ("pente", "ogdonta")
// accepted alongside voiced pronunciations ("pende", "ogdonda").
// η→h, ω→w (Greek Greeklish convention): protect "ch" before normalising h→i.
// "th" is NOT protected — τη→"th" and θ→"th" both canonicalise to "ti", so typing
// "ti" or "th" is accepted for either. w→o accepts old-style "o" for ω.
const toPhoneticCanonical = (text: string): string =>
	text
		.replace(/ngn/g, "gn") // γγν: συγγνώμη is [siɣnomi] — the nasal is not pronounced
		// γ renders "gh" in the pronunciation gloss (greek-phonetic.ts). A learner
		// typing what the gloss shows must be accepted, so collapse it to "g" —
		// and do it before h→i fires, or "ghala" canonicalises to "giala".
		.replace(/gh/g, "g")
		.replace(/nt/g, "nd")
		.replace(/mp/g, "mb")
		.replace(/nk/g, "ng")
		.replace(/ei/g, "i")
		.replace(/ai/g, "e")
		.replace(/u/g, "i") // υ sounds like "i"; user may type either
		.replace(/g(?=[ei])/g, "y") // γ before front vowels is [ʝ]: "legetai" ≡ "leyetai"
		.replace(/y/g, "i") // υ as letter-faithful "y" ("kyriaki") also accepted
		.replace(/ks/g, "x") // ξ = "ks"; user may type "x"
		.replace(/w/g, "o") // ω (as w) → o
		.replace(/ch/g, "") // protect χ digraph before h→i fires
		.replace(/h/g, "i") // η (as h) → i BEFORE oi→i: "zwh"→"zoh"→"zoi"→"zi" matches "zoi"→"zoi"→"zi"
		.replace(/oi/g, "i")
		.replace(/ev/g, "ef") // ευ → ef/ev both accepted (voicing context varies)
		.replace(/av/g, "af") // αυ likewise: the gloss devoices by context, the key does not
		.replace(//g, "x") // χ canonical = x (accepts both "ch" and "x")
		.replace(/x/g, "x") // x already canonical — noop but documents intent
		.replace(/d/g, "ti"); // δ (voiced "th") ≈ θ: canonical both as "ti" — "doulia"≡"thoulia"

/**
 * The rules above are applied in sequence, which is not confluent: collapsing
 * οι→i can create an "ει" that the earlier ει→i rule has already passed. νέοι
 * ("neoi") settles at "nei" while a typed "nei" goes straight to "ni". Running
 * to a fixed point makes the result independent of rule order.
 */
const canonicalFixedPoint = (text: string): string => {
	let current = text;
	for (let pass = 0; pass < 3; pass++) {
		const next = toPhoneticCanonical(current);
		if (next === current) break;
		current = next;
	}

	return current;
};

const phoneticEquals = (user: string, correct: string): boolean => {
	const u = stripTerminalPunctuation(user);
	const c = stripTerminalPunctuation(correct);

	return u === c || canonicalFixedPoint(u) === canonicalFixedPoint(c);
};

export const matchPhonetic = (userInput: string, correctGreek: string): PhoneticMatchResult => {
	const userPhonetic = normalizeInput(userInput);
	const correctPhonetic = greekToPhonetic(correctGreek);

	if (phoneticEquals(userPhonetic, correctPhonetic)) {
		return {
			isCorrect: true,
			userPhonetic,
			correctPhonetic,
			correctGreek,
		};
	}

	// Check match without article (for nouns stored with articles)
	const greekWithoutArticle = stripGreekArticle(correctGreek);
	if (greekWithoutArticle !== correctGreek) {
		const phoneticWithoutArticle = greekToPhonetic(greekWithoutArticle);
		if (phoneticEquals(userPhonetic, phoneticWithoutArticle)) {
			return {
				isCorrect: true,
				userPhonetic,
				correctPhonetic,
				correctGreek,
			};
		}
	}

	return {
		isCorrect: false,
		userPhonetic,
		correctPhonetic,
		correctGreek,
	};
};
