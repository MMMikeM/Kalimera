/**
 * Greek → pronunciation gloss, for anything a learner reads.
 *
 * This is the learner-facing convention: it answers "how do I say this?".
 * Its counterpart, `greek-transliteration.ts`, answers "what do I type?" and
 * is letter-faithful and reversible (η→h, ω→w). The two are deliberately
 * different systems and must not be swapped:
 *
 *   greekToPronunciation("πώς")  // "pos"   — say this
 *   greekToPhonetic("πώς")       // "pws"   — never shown to a learner
 *
 * Lossy by design: η, ι, υ, ει and οι all collapse to "i", so Greek spelling
 * cannot be recovered from the output. Never match answers against it — use
 * `matchPhonetic` from `greek-transliteration.ts` for that.
 *
 * Deliberately self-contained: it shares no code with `greek-letters.ts`,
 * because that module feeds `matchPhonetic` and drift there would silently
 * change which answers are graded correct.
 */

const ACUTE = 0x301;
const GRAVE = 0x300;
const CIRCUMFLEX = 0x342;
const DIAERESIS = 0x308;
const COMBINING_FIRST = 0x300;
const COMBINING_LAST = 0x36f;

/** Consonants before which αυ/ευ devoice: ευχαριστώ → "efcharisto". */
const VOICELESS = "θκξπσςτφχψ";

/**
 * Orthography, not sound — dropped from the gloss entirely.
 *
 * A gloss is already delimited by slashes when rendered, so "Τι κάνεις;" must
 * read /ti kanis/ and not /ti kanis;/. Hyphen is deliberately absent: bare
 * endings are drilled as "-ού" and need to keep the leading dash.
 */
const PUNCTUATION = /[;;.,!?·…()"'«»]/;

/**
 * One Greek letter with its diacritics hoisted onto it as flags.
 *
 * This is what makes stress reporting possible. The accent stops being a
 * character in the stream, so it survives arbitrary-length digraph matching
 * without anything being inserted: ού is [{ο}, {υ, accented}], and there is
 * nothing sitting between the two letters to break the ου rule.
 */
interface GreekChar {
	ch: string;
	accented: boolean;
	diaeresis: boolean;
}

const toGreekChars = (text: string): GreekChar[] => {
	const chars: GreekChar[] = [];

	for (const cp of text.toLowerCase().normalize("NFD")) {
		const code = cp.codePointAt(0) ?? 0;

		if (code >= COMBINING_FIRST && code <= COMBINING_LAST) {
			const previous = chars.at(-1);
			if (!previous) continue;
			if (code === DIAERESIS) previous.diaeresis = true;
			else if (code === ACUTE || code === GRAVE || code === CIRCUMFLEX) previous.accented = true;
			continue;
		}

		chars.push({ ch: cp, accented: false, diaeresis: false });
	}

	return chars;
};

/**
 * Is there a boundary between `i` and `i + 1` that no rule may span?
 *
 * Greek marks "these two vowels are separate sounds" two ways, and both are
 * diacritics: a diaeresis on the second vowel (ταΐζω, τρόλεϊ) or the accent on
 * the first (Μάιος). Without this, ταΐζω reads as the αι sound and glosses
 * "tezo" for a word pronounced "taizo".
 */
const isSeparated = (chars: GreekChar[], i: number): boolean => {
	const current = chars[i];
	const next = chars[i + 1];
	if (!current || !next) return false;

	return next.diaeresis || (current.accented && "ιυ".includes(next.ch));
};

interface PronunciationRule {
	greek: string;
	latin: string;
	/** Index into `latin` where the vowel's own rendering begins. */
	stressStart?: number;
	when?: (chars: GreekChar[], i: number) => boolean;
}

const atWordStart = (chars: GreekChar[], i: number): boolean =>
	i === 0 || /\s/.test(chars[i - 1]?.ch ?? " ");

const devoices = (chars: GreekChar[], i: number): boolean => {
	const following = chars[i + 2];

	return !following || VOICELESS.includes(following.ch) || /\s/.test(following.ch);
};

/**
 * Ordered: the FIRST match wins, not the longest. Order is load-bearing —
 * γγ-before-ν must beat plain γγ, and devoiced αυ must beat voiced αυ.
 */
const PRONUNCIATION_RULES: PronunciationRule[] = [
	// Word-initial stops are voiced: μπύρα → "bira", not "mbira"
	{ greek: "γκ", latin: "g", when: atWordStart },
	{ greek: "μπ", latin: "b", when: atWordStart },
	{ greek: "ντ", latin: "d", when: atWordStart },

	// γγ before ν keeps no nasal: συγγνώμη is [siɣnomi], not [siŋɡnomi]
	{ greek: "γγ", latin: "gh", when: (chars, i) => chars[i + 2]?.ch === "ν" },

	// Nasal clusters, before γ-fronting so they win over the [ʝ] rule
	{ greek: "γγ", latin: "ng" },
	{ greek: "γκ", latin: "ng" },

	// γ before a front vowel is [ʝ] ≈ "y". MUST precede the vowel digraphs
	// below, or γει collapses to γ+i and renders "gi" instead of "yi".
	// stressStart skips the consonant so γή underlines "i", not "yi".
	{ greek: "γαι", latin: "ye", stressStart: 1 },
	{ greek: "γει", latin: "yi", stressStart: 1 },
	{ greek: "γοι", latin: "yi", stressStart: 1 },
	{ greek: "γε", latin: "ye", stressStart: 1 },
	{ greek: "γι", latin: "yi", stressStart: 1 },
	{ greek: "γη", latin: "yi", stressStart: 1 },
	{ greek: "γυ", latin: "yi", stressStart: 1 },

	{ greek: "μπ", latin: "mb" },
	{ greek: "ντ", latin: "nd" },
	{ greek: "τσ", latin: "ts" },
	{ greek: "τζ", latin: "dz" },

	// αυ/ευ voice by context: ευχαριστώ → "efcharisto", εβδομάδα → "ev…"
	{ greek: "αυ", latin: "af", when: devoices },
	{ greek: "αυ", latin: "av" },
	{ greek: "ευ", latin: "ef", when: devoices },
	{ greek: "ευ", latin: "ev" },

	// Vowel digraphs collapse to the single sound they represent
	{ greek: "ου", latin: "ou" },
	{ greek: "αι", latin: "e" },
	{ greek: "ει", latin: "i" },
	{ greek: "οι", latin: "i" },
	{ greek: "υι", latin: "i" },
];

const PRONUNCIATION_LETTERS: Record<string, string> = {
	α: "a",
	ε: "e",
	η: "i",
	ι: "i",
	ο: "o",
	υ: "i",
	ω: "o",

	β: "v",
	γ: "gh", // [ɣ] before back vowels — not English hard [g]
	δ: "d",
	ζ: "z",
	θ: "th",
	κ: "k",
	λ: "l",
	μ: "m",
	ν: "n",
	ξ: "x",
	π: "p",
	ρ: "r",
	σ: "s",
	ς: "s",
	τ: "t",
	φ: "f",
	χ: "ch",
	ψ: "ps",
};

const matchesAt = (rule: PronunciationRule, chars: GreekChar[], i: number): boolean => {
	for (let k = 0; k < rule.greek.length; k++) {
		if (chars[i + k]?.ch !== rule.greek[k]) return false;
		if (k < rule.greek.length - 1 && isSeparated(chars, i + k)) return false;
	}

	return rule.when ? rule.when(chars, i) : true;
};

export interface PronunciationToken {
	text: string;
	stressed: boolean;
}

const pushToken = (tokens: PronunciationToken[], text: string, stressed: boolean): void => {
	if (!text) return;

	const previous = tokens.at(-1);
	if (previous?.stressed === stressed) previous.text += text;
	else tokens.push({ text, stressed });
};

/**
 * Convert Greek to a pronunciation gloss split into stressed and unstressed runs.
 *
 * Callers render the stressed run with emphasis. Greek stress placement is not
 * derivable from the Latin output, so this is the only way a gloss can carry it.
 *
 * Words with no written accent — unaccented monosyllables and clitics (με, το,
 * σου, και), and uppercase set without tonos (ΘΕΛΩ) — yield NO stressed token.
 * Callers must not synthesise one. A multi-word string correctly yields one
 * stressed run per accented word.
 *
 * @example
 * greekToPronunciationTokens("καλημέρα")
 * // [{text: "kalim", stressed: false}, {text: "e", stressed: true}, {text: "ra", stressed: false}]
 */
export const greekToPronunciationTokens = (greek: string): PronunciationToken[] => {
	const chars = toGreekChars(greek);
	const tokens: PronunciationToken[] = [];

	let i = 0;
	while (i < chars.length) {
		const rule = PRONUNCIATION_RULES.find((candidate) => matchesAt(candidate, chars, i));

		if (rule) {
			const consumed = chars.slice(i, i + rule.greek.length);
			const stressed = consumed.some((char) => char.accented);
			const split = stressed ? (rule.stressStart ?? 0) : rule.latin.length;

			pushToken(tokens, rule.latin.slice(0, split), false);
			pushToken(tokens, rule.latin.slice(split), stressed);
			i += rule.greek.length;
			continue;
		}

		const char = chars[i];
		if (char && !PUNCTUATION.test(char.ch)) {
			pushToken(tokens, PRONUNCIATION_LETTERS[char.ch] ?? char.ch, char.accented);
		}
		i += 1;
	}

	return tokens;
};

/**
 * Convert Greek text to a learner-facing pronunciation gloss.
 *
 * Lossy by design — η, ι, υ, ει and οι all render "i" — so it must never be
 * used for answer matching. Use `matchPhonetic` for that.
 *
 * @example
 * greekToPronunciation("Θέλω καφέ") // "thelo kafe"
 * greekToPronunciation("πώς")       // "pos"
 * greekToPronunciation("Ευχαριστώ") // "efcharisto"
 * greekToPronunciation("γάλα")      // "ghala"
 * greekToPronunciation("λέγεται")   // "leyete"
 */
export const greekToPronunciation = (greek: string): string =>
	greekToPronunciationTokens(greek)
		.map((token) => token.text)
		.join("");
