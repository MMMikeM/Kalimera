/**
 * Greek text primitives shared by the two Latin-rendering conventions.
 *
 * `greek-transliteration.ts` maps Greek to a reversible keyboard spelling for
 * answer matching; `greek-phonetic.ts` maps it to a pronunciation gloss for
 * display. Both start from the same normalisation, so it lives here rather
 * than being duplicated and left to drift.
 */

// Built from code points rather than written literally: combining marks are
// invisible in an editor, and a stray one is impossible to spot in review.
const ACUTE = String.fromCharCode(0x301);
const DIAERESIS = String.fromCharCode(0x308);
const COMBINING_MARKS = `[${String.fromCharCode(0x300)}-${String.fromCharCode(0x36f)}]`;

/**
 * Marker left between two vowels that must not be read as a digraph. Survives
 * the digraph maps (it matches nothing in them), then is dropped from output.
 */
export const DIGRAPH_BREAK = String.fromCharCode(0);

// A vowel pair is two sounds, not one, when the second vowel carries a
// diaeresis (ταΐζω, τάϊσα, τρόλεϊ) or the first carries the accent (Μάιος).
const DIAERESIS_PAIR = new RegExp(`([αεου])(${COMBINING_MARKS}*)([ιυ])${DIAERESIS}`, "g");
const ACCENTED_PAIR = new RegExp(`([αεου])${ACUTE}([ιυ])`, "g");

/**
 * Strip accents and breathing marks (Άλφα → αλφα), preserving digraph breaks.
 *
 * Both "these vowels are separate" signals live in the diacritics this throws
 * away, so they are recorded first. Strip naively and ταΐζω becomes ταιζω,
 * which the digraph rules then read as the single αι sound — giving "tezo"
 * for a word pronounced "taizo".
 *
 * Callers lowercase first, so only lowercase vowels are matched here.
 */
export const stripGreekDiacritics = (text: string): string =>
	text
		.normalize("NFD")
		.replace(DIAERESIS_PAIR, `$1${DIGRAPH_BREAK}$3`)
		.replace(ACCENTED_PAIR, `$1${DIGRAPH_BREAK}$2`)
		.replace(new RegExp(COMBINING_MARKS, "g"), "");

/**
 * Word-initial γκ/μπ/ντ are realised as g/b/d; medial as ng/mb/nd.
 * Applied before the digraph maps so those catch only medial instances.
 */
export const applyWordInitialClusters = (text: string): string =>
	text
		.replace(/(^|[\s])γκ/gi, "$1g")
		.replace(/(^|[\s])μπ/gi, "$1b")
		.replace(/(^|[\s])ντ/gi, "$1d");
