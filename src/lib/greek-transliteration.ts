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

// Word-initial γκ/μπ/ντ are realised as g/b/d; medial as ng/mb/nd.
// Replace word-initial first so the DIGRAPH_MAP catches only medial instances.
const applyWordInitialClusters = (text: string): string =>
	text
		.replace(/(^|[\s])γκ/gi, "$1g")
		.replace(/(^|[\s])μπ/gi, "$1b")
		.replace(/(^|[\s])ντ/gi, "$1d");

/**
 * Convert Greek text to Latin phonetic representation.
 *
 * @example
 * greekToPhonetic("Θέλω καφέ") // "thelo kafe"
 * greekToPhonetic("ευχαριστώ") // "efcharisto"
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

	return output;
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
// ει→i, αι→e, οι→i: user can type letter-faithful ("kaneis") or phonetic ("kanis").
// nd→d, mb→b, ng→g: user can type simplified cluster ("adras") or accurate ("andras").
const toPhoneticCanonical = (text: string): string =>
	text
		.replace(/ei/g, "i")
		.replace(/ai/g, "e")
		.replace(/oi/g, "i")
		.replace(/nd/g, "d")
		.replace(/mb/g, "b")
		.replace(/ng/g, "g");

const phoneticEquals = (user: string, correct: string): boolean =>
	user === correct || toPhoneticCanonical(user) === toPhoneticCanonical(correct);

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
