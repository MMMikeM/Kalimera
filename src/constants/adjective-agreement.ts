// Adjective declension paradigms.
// Each paradigm provides suffix tables in two stress variants:
//   - "stressed":  suffix carries the tonos (e.g. καλ-ός → stem unstressed)
//   - "unstressed": suffix has no tonos  (e.g. όμορφ-ος → stem already stressed)
// At runtime we detect whether the stem retains any tonos char; if yes, use the
// unstressed variant; else use the stressed variant. Single tonos per word.

import type { AdjectiveDeclensionPattern } from "@/db.server/enums";

export type Case = "nominative" | "accusative" | "genitive";
export type Num = "singular" | "plural";
export type Gender = "masculine" | "feminine" | "neuter";

type GenderTriple = Record<Gender, string>;
type CaseSuffix = Record<Num, GenderTriple>;
type SuffixTable = Record<Case, CaseSuffix>;

interface AdjectiveParadigm {
	id: AdjectiveDeclensionPattern;
	example: string;
	stripChars: number; // chars to slice off lemma to get stem
	stressed: SuffixTable;
	unstressed: SuffixTable;
}

// ─── -ος / -η / -ο ────────────────────────────────────────────────────
// καλός · καλή · καλό  (suffix-stressed)
// όμορφος · όμορφη · όμορφο  (stem-stressed)
const OS_I_O: AdjectiveParadigm = {
	id: "os-i-o",
	example: "καλός / καλή / καλό",
	stripChars: 2,
	stressed: {
		nominative: {
			singular: { masculine: "ός", feminine: "ή", neuter: "ό" },
			plural: { masculine: "οί", feminine: "ές", neuter: "ά" },
		},
		accusative: {
			singular: { masculine: "ό", feminine: "ή", neuter: "ό" },
			plural: { masculine: "ούς", feminine: "ές", neuter: "ά" },
		},
		genitive: {
			singular: { masculine: "ού", feminine: "ής", neuter: "ού" },
			plural: { masculine: "ών", feminine: "ών", neuter: "ών" },
		},
	},
	unstressed: {
		nominative: {
			singular: { masculine: "ος", feminine: "η", neuter: "ο" },
			plural: { masculine: "οι", feminine: "ες", neuter: "α" },
		},
		accusative: {
			singular: { masculine: "ο", feminine: "η", neuter: "ο" },
			plural: { masculine: "ους", feminine: "ες", neuter: "α" },
		},
		genitive: {
			singular: { masculine: "ου", feminine: "ης", neuter: "ου" },
			plural: { masculine: "ων", feminine: "ων", neuter: "ων" },
		},
	},
};

// ─── -ος / -α / -ο ────────────────────────────────────────────────────
// νέος · νέα · νέο  (stem-stressed when applied to most lemmas)
// ωραίος · ωραία · ωραίο  (also stem-stressed)
const OS_IA_O: AdjectiveParadigm = {
	id: "os-ia-o",
	example: "νέος / νέα / νέο",
	stripChars: 2,
	stressed: {
		nominative: {
			singular: { masculine: "ός", feminine: "ά", neuter: "ό" },
			plural: { masculine: "οί", feminine: "ές", neuter: "ά" },
		},
		accusative: {
			singular: { masculine: "ό", feminine: "ά", neuter: "ό" },
			plural: { masculine: "ούς", feminine: "ές", neuter: "ά" },
		},
		genitive: {
			singular: { masculine: "ού", feminine: "άς", neuter: "ού" },
			plural: { masculine: "ών", feminine: "ών", neuter: "ών" },
		},
	},
	unstressed: {
		nominative: {
			singular: { masculine: "ος", feminine: "α", neuter: "ο" },
			plural: { masculine: "οι", feminine: "ες", neuter: "α" },
		},
		accusative: {
			singular: { masculine: "ο", feminine: "α", neuter: "ο" },
			plural: { masculine: "ους", feminine: "ες", neuter: "α" },
		},
		genitive: {
			singular: { masculine: "ου", feminine: "ας", neuter: "ου" },
			plural: { masculine: "ων", feminine: "ων", neuter: "ων" },
		},
	},
};

// ─── -ύς / -ιά / -ύ ───────────────────────────────────────────────────
// βαρύς · βαριά · βαρύ
// Always suffix-stressed in modern Greek.
const US_IA_U: AdjectiveParadigm = {
	id: "us-ia-u",
	example: "βαρύς / βαριά / βαρύ",
	stripChars: 2,
	stressed: {
		nominative: {
			singular: { masculine: "ύς", feminine: "ιά", neuter: "ύ" },
			plural: { masculine: "ιοί", feminine: "ιές", neuter: "ιά" },
		},
		accusative: {
			singular: { masculine: "ύ", feminine: "ιά", neuter: "ύ" },
			plural: { masculine: "ιούς", feminine: "ιές", neuter: "ιά" },
		},
		genitive: {
			singular: { masculine: "ιού", feminine: "ιάς", neuter: "ιού" },
			plural: { masculine: "ιών", feminine: "ιών", neuter: "ιών" },
		},
	},
	// Stem-stressed -ύς adjectives are vanishingly rare; use stressed variants regardless.
	unstressed: {
		nominative: {
			singular: { masculine: "ύς", feminine: "ιά", neuter: "ύ" },
			plural: { masculine: "ιοί", feminine: "ιές", neuter: "ιά" },
		},
		accusative: {
			singular: { masculine: "ύ", feminine: "ιά", neuter: "ύ" },
			plural: { masculine: "ιούς", feminine: "ιές", neuter: "ιά" },
		},
		genitive: {
			singular: { masculine: "ιού", feminine: "ιάς", neuter: "ιού" },
			plural: { masculine: "ιών", feminine: "ιών", neuter: "ιών" },
		},
	},
};

// ─── -ής / -ής / -ές  (3rd-declension type) ──────────────────────────
// διεθνής · διεθνής · διεθνές · ακριβής · ακριβής · ακριβές
// Genitive sg ends -ούς (διεθνούς) for all three genders.
const IS_IS_ES: AdjectiveParadigm = {
	id: "is-is-es",
	example: "διεθνής / διεθνής / διεθνές",
	stripChars: 2,
	stressed: {
		nominative: {
			singular: { masculine: "ής", feminine: "ής", neuter: "ές" },
			plural: { masculine: "είς", feminine: "είς", neuter: "ή" },
		},
		accusative: {
			singular: { masculine: "ή", feminine: "ή", neuter: "ές" },
			plural: { masculine: "είς", feminine: "είς", neuter: "ή" },
		},
		genitive: {
			singular: { masculine: "ούς", feminine: "ούς", neuter: "ούς" },
			plural: { masculine: "ών", feminine: "ών", neuter: "ών" },
		},
	},
	unstressed: {
		nominative: {
			singular: { masculine: "ης", feminine: "ης", neuter: "ες" },
			plural: { masculine: "εις", feminine: "εις", neuter: "η" },
		},
		accusative: {
			singular: { masculine: "η", feminine: "η", neuter: "ες" },
			plural: { masculine: "εις", feminine: "εις", neuter: "η" },
		},
		genitive: {
			singular: { masculine: "ους", feminine: "ους", neuter: "ους" },
			plural: { masculine: "ων", feminine: "ων", neuter: "ων" },
		},
	},
};

// ─── indeclinable ────────────────────────────────────────────────────
// Loan-words and a few colours: μπλε, γκρι, μωβ, ροζ
// Lemma passes through for all (case × number × gender).
const INDECLINABLE: AdjectiveParadigm = {
	id: "indeclinable",
	example: "μπλε",
	stripChars: 0,
	stressed: {
		nominative: {
			singular: { masculine: "", feminine: "", neuter: "" },
			plural: { masculine: "", feminine: "", neuter: "" },
		},
		accusative: {
			singular: { masculine: "", feminine: "", neuter: "" },
			plural: { masculine: "", feminine: "", neuter: "" },
		},
		genitive: {
			singular: { masculine: "", feminine: "", neuter: "" },
			plural: { masculine: "", feminine: "", neuter: "" },
		},
	},
	unstressed: {
		nominative: {
			singular: { masculine: "", feminine: "", neuter: "" },
			plural: { masculine: "", feminine: "", neuter: "" },
		},
		accusative: {
			singular: { masculine: "", feminine: "", neuter: "" },
			plural: { masculine: "", feminine: "", neuter: "" },
		},
		genitive: {
			singular: { masculine: "", feminine: "", neuter: "" },
			plural: { masculine: "", feminine: "", neuter: "" },
		},
	},
};

export const ADJECTIVE_PARADIGMS: Record<AdjectiveDeclensionPattern, AdjectiveParadigm> = {
	"os-i-o": OS_I_O,
	"os-ia-o": OS_IA_O,
	"us-ia-u": US_IA_U,
	"is-is-es": IS_IS_ES,
	indeclinable: INDECLINABLE,
};

// Tonos detection — is the stem already stressed?
const TONOS_CHARS = /[άέήίόύώΐΰ]/;

export const isStemStressed = (stem: string): boolean => TONOS_CHARS.test(stem);
