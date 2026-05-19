import type { ConjugationFamily } from "../lib/greek-grammar";
import type { VerbConjugationSeed } from "../types/seed";

// ─── Greek accent utilities ────────────────────────────────────────────────────

const ACUTE: Record<string, string> = {
	α: "ά", ε: "έ", η: "ή", ι: "ί", ο: "ό", υ: "ύ", ω: "ώ",
};

const stripAccents = (s: string): string =>
	s
		.replace(/ά/g, "α").replace(/έ/g, "ε").replace(/ή/g, "η")
		.replace(/ί/g, "ι").replace(/ό/g, "ο").replace(/ύ/g, "υ").replace(/ώ/g, "ω");

/**
 * Syllable nuclei character positions (left to right).
 * Diphthongs αι/ει/οι/αυ/ευ/ου → index of their SECOND vowel (which takes written accent).
 * Input must be unaccented (stripAccents first).
 */
const nucleiPositions = (plain: string): number[] => {
	const pos: number[] = [];
	let i = 0;
	while (i < plain.length) {
		const ch = plain[i]!;
		const next = plain[i + 1] ?? "";
		const pair = ch + next;
		if (/^(αι|ει|οι|αυ|ευ|ου)$/.test(pair)) {
			pos.push(i + 1); // accent written on trailing vowel of diphthong
			i += 2;
		} else if (/[αεηιοωυ]/.test(ch)) {
			pos.push(i);
			i++;
		} else {
			i++;
		}
	}
	return pos;
};

/** Accent the kth nucleus from start (0-indexed) in an unaccented string. */
const accentAt = (plain: string, k: number): string => {
	const npos = nucleiPositions(plain);
	if (k < 0 || k >= npos.length) return plain;
	const idx = npos[k]!;
	const ch = plain[idx]!.toLowerCase();
	return plain.slice(0, idx) + (ACUTE[ch] ?? ch) + plain.slice(idx + 1);
};

/**
 * Accent the antepenult (3rd nucleus from end).
 * If fewer than 3 nuclei, prefix "ε" (augment) and retry.
 */
const accentAntepenult = (plain: string): string => {
	const npos = nucleiPositions(plain);
	if (npos.length < 3) return accentAntepenult("ε" + plain);
	return accentAt(plain, npos.length - 3);
};

/**
 * Find which nucleus index (from start, 0-indexed) is accented in the accented string.
 * Since stripAccents is a 1-to-1 char mapping, indices align.
 */
const accentedNucleusIndex = (accented: string): number => {
	const plain = stripAccents(accented);
	const npos = nucleiPositions(plain);
	for (let k = 0; k < npos.length; k++) {
		if (/[άέήίόύώ]/.test(accented[npos[k]!]!)) return k;
	}
	return 0;
};

// ─── Conjugation builders ─────────────────────────────────────────────────────

type Forms = { sg1: string; sg2: string; sg3: string; pl1: string; pl2: string; pl3: string };

// ── -ω ─────────────────────────────────────────────────────────────────────────

const conjugateOmega = (lemma: string, aoristStem: string): VerbConjugationSeed[] => {
	// Present stem = lemma strip -ω
	const presentStemAccented = lemma.replace(/ω$/, "");
	const presentStem = stripAccents(presentStemAccented);
	const aStem = stripAccents(aoristStem);

	// Future: accent on same nucleus as in the lemma (present sg1)
	const fNuc = accentedNucleusIndex(lemma);

	return [
		{
			tense: "present",
			forms: {
				sg1: presentStemAccented + "ω",
				sg2: presentStemAccented + "εις",
				sg3: presentStemAccented + "ει",
				pl1: presentStemAccented + "ουμε",
				pl2: presentStemAccented + "ετε",
				pl3: presentStemAccented + "ουν",
			},
		},
		{
			tense: "aorist",
			forms: {
				sg1: accentAntepenult(aStem + "α"),
				sg2: accentAntepenult(aStem + "ες"),
				sg3: accentAntepenult(aStem + "ε"),
				pl1: accentAntepenult(aStem + "αμε"),
				pl2: accentAntepenult(aStem + "ατε"),
				pl3: accentAntepenult(aStem + "αν"),
			},
		},
		{
			tense: "past_continuous",
			forms: {
				sg1: accentAntepenult(presentStem + "α"),
				sg2: accentAntepenult(presentStem + "ες"),
				sg3: accentAntepenult(presentStem + "ε"),
				pl1: accentAntepenult(presentStem + "αμε"),
				pl2: accentAntepenult(presentStem + "ατε"),
				pl3: accentAntepenult(presentStem + "αν"),
			},
		},
		{
			tense: "future",
			forms: {
				sg1: "θα " + accentAt(aStem + "ω", fNuc),
				sg2: "θα " + accentAt(aStem + "εις", fNuc),
				sg3: "θα " + accentAt(aStem + "ει", fNuc),
				pl1: "θα " + accentAt(aStem + "ουμε", fNuc),
				pl2: "θα " + accentAt(aStem + "ετε", fNuc),
				pl3: "θα " + accentAt(aStem + "ουν", fNuc),
			},
		},
	];
};

// ── -άω/-ώ ─────────────────────────────────────────────────────────────────────

const conjugateAo = (lemma: string, aoristStem: string): VerbConjugationSeed[] => {
	// lemma ends in "άω" (-άω type) or "ώ" (-ώ contracted type)
	const isAoType = lemma.endsWith("άω");
	const rootStripped = isAoType
		? stripAccents(lemma).replace(/αω$/, "") // "ρωτα" → "ρωτ"
		: stripAccents(lemma).replace(/ω$/, ""); // "προσπαθω" → "προσπαθ"

	const aStem = stripAccents(aoristStem);

	// Present forms
	const presentForms: Forms = isAoType
		? {
				sg1: rootStripped + "άω",
				sg2: rootStripped + "άς",
				sg3: rootStripped + "άει",
				pl1: rootStripped + "άμε",
				pl2: rootStripped + "άτε",
				pl3: rootStripped + "άνε",
			}
		: {
				sg1: rootStripped + "ώ",
				sg2: rootStripped + "είς",
				sg3: rootStripped + "εί",
				pl1: rootStripped + "ούμε",
				pl2: rootStripped + "είτε",
				pl3: rootStripped + "ούν",
			};

	// Past continuous: -ούσα suffix carries the accent
	const pcRoot = rootStripped;
	const pcForms: Forms = {
		sg1: pcRoot + "ούσα",
		sg2: pcRoot + "ούσες",
		sg3: pcRoot + "ούσε",
		pl1: pcRoot + "ούσαμε",
		pl2: pcRoot + "ούσατε",
		pl3: pcRoot + "ούσαν",
	};

	// Future: accent on same nucleus as in lemma
	const fNuc = accentedNucleusIndex(lemma);
	const futureForms: Forms = {
		sg1: "θα " + accentAt(aStem + "ω", fNuc),
		sg2: "θα " + accentAt(aStem + "εις", fNuc),
		sg3: "θα " + accentAt(aStem + "ει", fNuc),
		pl1: "θα " + accentAt(aStem + "ουμε", fNuc),
		pl2: "θα " + accentAt(aStem + "ετε", fNuc),
		pl3: "θα " + accentAt(aStem + "ουν", fNuc),
	};

	return [
		{ tense: "present", forms: presentForms },
		{
			tense: "aorist",
			forms: {
				sg1: accentAntepenult(aStem + "α"),
				sg2: accentAntepenult(aStem + "ες"),
				sg3: accentAntepenult(aStem + "ε"),
				pl1: accentAntepenult(aStem + "αμε"),
				pl2: accentAntepenult(aStem + "ατε"),
				pl3: accentAntepenult(aStem + "αν"),
			},
		},
		{ tense: "past_continuous", forms: pcForms },
		{ tense: "future", forms: futureForms },
	];
};

// ── -άμαι ───────────────────────────────────────────────────────────────────────

const conjugateAmai = (lemma: string, aoristStem: string): VerbConjugationSeed[] => {
	// lemma ends in "άμαι": rootStem = strip "άμαι"
	const rootStem = stripAccents(lemma).replace(/αμαι$/, "");

	// aoristStem convention: pass root before -ήθηκα (e.g. "κοιμ" → κοιμήθηκα)
	const aRoot = stripAccents(aoristStem);

	return [
		{
			tense: "present",
			forms: {
				sg1: rootStem + "άμαι",
				sg2: rootStem + "άσαι",
				sg3: rootStem + "άται",
				pl1: rootStem + "όμαστε",
				pl2: rootStem + "άστε",
				pl3: rootStem + "ούνται",
			},
		},
		{
			tense: "aorist",
			forms: {
				sg1: aRoot + "ήθηκα",
				sg2: aRoot + "ήθηκες",
				sg3: aRoot + "ήθηκε",
				pl1: aRoot + "ηθήκαμε",
				pl2: aRoot + "ηθήκατε",
				pl3: aRoot + "ήθηκαν",
			},
		},
		{
			tense: "past_continuous",
			forms: {
				sg1: rootStem + "όμουν",
				sg2: rootStem + "όσουν",
				sg3: rootStem + "όταν",
				pl1: rootStem + "όμαστε",
				pl2: rootStem + "όσαστε",
				pl3: rootStem + "όνταν",
			},
		},
		{
			tense: "future",
			forms: {
				sg1: "θα " + aRoot + "ηθώ",
				sg2: "θα " + aRoot + "ηθείς",
				sg3: "θα " + aRoot + "ηθεί",
				pl1: "θα " + aRoot + "ηθούμε",
				pl2: "θα " + aRoot + "ηθείτε",
				pl3: "θα " + aRoot + "ηθούν",
			},
		},
	];
};

// ─── Public API ───────────────────────────────────────────────────────────────

/**
 * Generate the four-tense conjugation array for a regular Greek verb.
 *
 * @param lemma      - present sg1 form with accent (e.g. "κλείνω", "ρωτάω", "προσπαθώ", "κοιμάμαι")
 * @param aoristStem - unaccented aorist/future consonant stem (e.g. "κλεισ", "ρωτησ", "κοιμηθ")
 * @param family     - conjugation family; irregular and -ομαι need manual entries
 */
export const generateConjugations = (
	lemma: string,
	aoristStem: string,
	family: ConjugationFamily,
): VerbConjugationSeed[] => {
	switch (family) {
		case "-ω":
			return conjugateOmega(lemma, aoristStem);
		case "-άω/-ώ":
			return conjugateAo(lemma, aoristStem);
		case "-άμαι":
			return conjugateAmai(lemma, aoristStem);
		default:
			throw new Error(
				`generateConjugations: "${family}" not supported — irregular and -ομαι verbs need manual entries`,
			);
	}
};
