/**
 * Greek to Latin transliteration for phonetic matching.
 *
 * This converts Greek text to a normalized phonetic Latin representation,
 * allowing users to type answers using a standard keyboard while testing
 * their knowledge of Greek sounds.
 */

// Strip Greek diacritics (accents, breathing marks)
const stripGreekDiacritics = (text: string): string => {
	return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
};

// Digraphs must be processed before single letters (order matters)
const DIGRAPH_MAP: [RegExp, string][] = [
	// Vowel combinations first
	[/ου/gi, "ou"],
	[/αι/gi, "e"],
	[/ει/gi, "i"],
	[/οι/gi, "i"],
	[/υι/gi, "i"],

	// αυ/ευ - voiced before vowels/voiced consonants, unvoiced otherwise
	// Simplified: use 'av'/'ev' as default (most common in speech)
	[/αύ/gi, "av"],
	[/αυ/gi, "av"],
	[/εύ/gi, "ev"],
	[/ευ/gi, "ev"],

	// Consonant clusters
	[/γγ/gi, "ng"],
	[/γκ/gi, "g"], // word-initial typically 'g', medial 'ng' - simplified to 'g'
	[/μπ/gi, "b"], // word-initial typically 'b', medial 'mb' - simplified to 'b'
	[/ντ/gi, "d"], // word-initial typically 'd', medial 'nd' - simplified to 'd'
	[/τσ/gi, "ts"],
	[/τζ/gi, "dz"],

	// γ before ι/ε sounds like 'y'
	[/γι/gi, "yi"],
	[/γη/gi, "yi"],
	[/γε/gi, "ye"],
	[/γαι/gi, "ye"],
];

const SINGLE_LETTER_MAP: Record<string, string> = {
	// Vowels
	α: "a",
	ε: "e",
	η: "i",
	ι: "i",
	ο: "o",
	υ: "i",
	ω: "o",

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
 * Convert Greek text to Latin phonetic representation.
 *
 * @example
 * greekToPhonetic("Θέλω καφέ") // "thelo kafe"
 * greekToPhonetic("ευχαριστώ") // "efcharisto"
 * greekToPhonetic("μπύρα") // "bira"
 */
export const greekToPhonetic = (greek: string): string => {
	// Lowercase and strip diacritics
	let result = stripGreekDiacritics(greek.toLowerCase());

	// Apply digraph replacements first (order matters)
	for (const [pattern, replacement] of DIGRAPH_MAP) {
		result = result.replace(pattern, replacement);
	}

	// Apply single letter replacements
	let output = "";
	for (const char of result) {
		output += SINGLE_LETTER_MAP[char] ?? char;
	}

	return output;
};

/**
 * Normalize user input for comparison.
 * - Lowercase
 * - Trim whitespace
 * - Collapse multiple spaces
 */
export const normalizeInput = (input: string): string => {
	return input.toLowerCase().trim().replace(/\s+/g, " ");
};

export interface PhoneticMatchResult {
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
export const matchPhonetic = (
	userInput: string,
	correctGreek: string,
): PhoneticMatchResult => {
	const userPhonetic = normalizeInput(userInput);
	const correctPhonetic = greekToPhonetic(correctGreek);

	// Check exact match first
	if (userPhonetic === correctPhonetic) {
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
		if (userPhonetic === phoneticWithoutArticle) {
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

/**
 * Calculate similarity between two phonetic strings (for partial credit / fuzzy matching).
 * Returns a value between 0 and 1.
 */
const phoneticSimilarity = (a: string, b: string): number => {
	const s1 = normalizeInput(a);
	const s2 = normalizeInput(b);

	if (s1 === s2) return 1;
	if (s1.length === 0 || s2.length === 0) return 0;

	// Levenshtein distance
	const matrix: number[][] = Array.from({ length: s1.length + 1 }, (_, i) =>
		Array.from({ length: s2.length + 1 }, (_, j) => (i === 0 ? j : j === 0 ? i : 0)),
	);

	for (let i = 1; i <= s1.length; i++) {
		for (let j = 1; j <= s2.length; j++) {
			const cost = s1[i - 1] === s2[j - 1] ? 0 : 1;
			const deletion = (matrix[i - 1]?.[j] ?? 0) + 1;
			const insertion = (matrix[i]?.[j - 1] ?? 0) + 1;
			const substitution = (matrix[i - 1]?.[j - 1] ?? 0) + cost;
			const row = matrix[i];
			if (row) row[j] = Math.min(deletion, insertion, substitution);
		}
	}

	const distance = matrix[s1.length]?.[s2.length] ?? 0;
	const maxLength = Math.max(s1.length, s2.length);

	return 1 - distance / maxLength;
};
