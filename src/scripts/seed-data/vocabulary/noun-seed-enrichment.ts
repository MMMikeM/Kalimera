import type { CefrLevel, NounDeclensionPattern } from "@/server/db/enums";
import { nounDeclensionPatterns } from "@/server/db/enums";
import type { JsonValue } from "@/server/db/metadata";

import {
	type Case,
	type Gender,
	type GrammaticalNumber,
	getArticle,
} from "../../../lib/greek-grammar";
import { declineNoun } from "../../../lib/noun-declension";
import type { NominalFormCellSeed, NounNominalFormsSeed, NounSeed } from "../../../types/seed";

type CaseNumberKey = `${Case}_${GrammaticalNumber}`;

/** Lean noun row in data files; enrichment fills declension + nominal forms. */
export type NounSeedInput = {
	lemma: string;
	gender: Gender;
	english: string;
	cefrLevel: CefrLevel;
	metadata?: Record<string, JsonValue>;
	declensionPattern?: NounDeclensionPattern;
	/** Merged over inferred nominative singular baseline. */
	nominalForms?: Partial<Record<CaseNumberKey, NominalFormCellSeed>>;
};

const DECLENSION_BY_LEMMA: Record<string, NounDeclensionPattern> = {
	// Pluralia / irregular citation forms
	διακοπές: "fem-a",
	ρούχα: "neut-o",
	ψώνια: "neut-o",
	// Archaic -η: takes -εις in the plural. Not inferable — πόλη gives πόλεις but
	// αγάπη gives αγάπες, and the two are indistinguishable by ending.
	πόλη: "fem-i-archaic",
	δύναμη: "fem-i-archaic",
	πίστη: "fem-i-archaic",
};

const PLURAL_CITATIONS = new Set(["διακοπές", "ρούχα", "ψώνια"]);

/** Nouns cited in the plural, which take οι or τα rather than the singular article. */
export const isPluralCitation = (lemma: string): boolean => PLURAL_CITATIONS.has(lemma);

/** Indeclinable loanwords: every cell is the citation form. */
const INDECLINABLE = new Set([
	"σπορ",
	"πικνίκ",
	"μπαρ",
	"σκι",
	"σινεμά",
	"μίνι μάρκετ",
	"ταξί",
	"τρόλεϊ",
	"κάρυ",
	"ραντεβού",
	"πάρτι",
	"χόμπι",
	"μαγιό",
	"γκαλερί",
]);

/**
 * Lemmas whose forms no paradigm generates. Kept central rather than at the seed
 * site because a lemma may be seeded from several lessons (παππούς appears in
 * two), and `batchUpsertNominalForms` is last-write-wins — a per-site override
 * would be silently clobbered by whichever file seeds last.
 */
const IRREGULAR_FORMS: Record<string, Partial<Record<CaseNumberKey, NominalFormCellSeed>>> = {
	// -τ- stems: no paradigm covers a class of one.
	φως: {
		accusative_singular: { form: "φως", article: "το" },
		genitive_singular: { form: "φωτός", article: "του" },
		nominative_plural: { form: "φώτα", article: "τα" },
		accusative_plural: { form: "φώτα", article: "τα" },
		genitive_plural: { form: "φώτων", article: "των" },
	},
	περιβάλλον: {
		nominative_singular: { form: "περιβάλλον", article: "το" },
		accusative_singular: { form: "περιβάλλον", article: "το" },
		genitive_singular: { form: "περιβάλλοντος", article: "του" },
		nominative_plural: { form: "περιβάλλοντα", article: "τα" },
		accusative_plural: { form: "περιβάλλοντα", article: "τα" },
		genitive_plural: { form: "περιβαλλόντων", article: "των" },
	},
	// The generator rebuilds these from a stem the noun does not have: *γάλο, *βράδι, *ρολοιού.
	γάλα: {
		accusative_singular: { form: "γάλα", article: "το" },
		genitive_singular: { form: "γάλακτος", article: "του" },
		nominative_plural: { form: "γάλατα", article: "τα" },
		accusative_plural: { form: "γάλατα", article: "τα" },
		genitive_plural: { form: "γαλάτων", article: "των" },
	},
	βράδυ: { accusative_singular: { form: "βράδυ", article: "το" } },
	ρολόι: {
		genitive_singular: { form: "ρολογιού", article: "του" },
		nominative_plural: { form: "ρολόγια", article: "τα" },
		accusative_plural: { form: "ρολόγια", article: "τα" },
		genitive_plural: { form: "ρολογιών", article: "των" },
	},
	// Two-word lemmas: the generator declines the whole phrase as one noun.
	"παιδικός σταθμός": {
		accusative_singular: { form: "παιδικό σταθμό", article: "τον" },
		genitive_singular: { form: "παιδικού σταθμού", article: "του" },
		nominative_plural: { form: "παιδικοί σταθμοί", article: "οι" },
		accusative_plural: { form: "παιδικούς σταθμούς", article: "τους" },
		genitive_plural: { form: "παιδικών σταθμών", article: "των" },
	},
	"ουράνιο τόξο": {
		genitive_singular: { form: "ουράνιου τόξου", article: "του" },
		nominative_plural: { form: "ουράνια τόξα", article: "τα" },
		accusative_plural: { form: "ουράνια τόξα", article: "τα" },
		genitive_plural: { form: "ουράνιων τόξων", article: "των" },
	},
	// Cited in the plural, so the -ες ending must not be added to a form that already has it.
	διακοπές: {
		nominative_plural: { form: "διακοπές", article: "οι" },
		accusative_plural: { form: "διακοπές", article: "τις" },
		genitive_plural: { form: "διακοπών", article: "των" },
	},
	// Imparisyllable feminines: -ά nouns add a syllable rather than taking -ες.
	γιαγιά: {
		nominative_plural: { form: "γιαγιάδες", article: "οι" },
		accusative_plural: { form: "γιαγιάδες", article: "τις" },
		genitive_plural: { form: "γιαγιάδων", article: "των" },
	},
	μαμά: {
		nominative_plural: { form: "μαμάδες", article: "οι" },
		accusative_plural: { form: "μαμάδες", article: "τις" },
		genitive_plural: { form: "μαμάδων", article: "των" },
	},
	// Genitive-plural stress in -α feminines is lexical outside the -άδα, -ίδα and
	// -τητα suffixes the paradigm handles. It takes the oxytone majority (γυναικών,
	// θαλασσών, ωρών); these keep the stem stress instead.
	εικόνα: { genitive_plural: { form: "εικόνων", article: "των" } },
	// The reverse in masc-as: most keep the stem stress (πατέρων), these move it.
	μήνας: { genitive_plural: { form: "μηνών", article: "των" } },
	άντρας: { genitive_plural: { form: "αντρών", article: "των" } },
	// Imparisyllable masculines: a stressed -άς and the -τζής trade suffix add a
	// syllable in the plural. Their singular is regular, so the pattern stays
	// masc-as / masc-is and only the plural is written out.
	μπαμπάς: {
		nominative_plural: { form: "μπαμπάδες", article: "οι" },
		accusative_plural: { form: "μπαμπάδες", article: "τους" },
		genitive_plural: { form: "μπαμπάδων", article: "των" },
	},
	ταξιτζής: {
		nominative_plural: { form: "ταξιτζήδες", article: "οι" },
		accusative_plural: { form: "ταξιτζήδες", article: "τους" },
		genitive_plural: { form: "ταξιτζήδων", article: "των" },
	},
	// Unstressed -ης splits: εργάτης → εργάτες, but τεμπέλης → τεμπέληδες. The
	// paradigm adds the syllable for the -άρης suffix only.
	τεμπέλης: {
		nominative_plural: { form: "τεμπέληδες", article: "οι" },
		accusative_plural: { form: "τεμπέληδες", article: "τους" },
		genitive_plural: { form: "τεμπέληδων", article: "των" },
	},
	μπαρμπέρης: {
		nominative_plural: { form: "μπαρμπέρηδες", article: "οι" },
		accusative_plural: { form: "μπαρμπέρηδες", article: "τους" },
		genitive_plural: { form: "μπαρμπέρηδων", article: "των" },
	},
	// Imparisyllable -ούς: adds a syllable in the plural.
	παππούς: {
		accusative_singular: { form: "παππού", article: "τον" },
		genitive_singular: { form: "παππού", article: "του" },
		nominative_plural: { form: "παππούδες", article: "οι" },
		accusative_plural: { form: "παππούδες", article: "τους" },
		genitive_plural: { form: "παππούδων", article: "των" },
	},
};

/** Vocative is omitted throughout the seed, matching `declineToFormsSeed`. */
const SEEDED_CASES: readonly Case[] = ["nominative", "accusative", "genitive"];
const SEEDED_NUMBERS: readonly GrammaticalNumber[] = ["singular", "plural"];

const irregularFormsFor = (
	lemma: string,
	gender: Gender,
): Partial<Record<CaseNumberKey, NominalFormCellSeed>> | undefined => {
	if (!INDECLINABLE.has(lemma)) return IRREGULAR_FORMS[lemma];
	return Object.fromEntries(
		SEEDED_CASES.flatMap((grammaticalCase) =>
			SEEDED_NUMBERS.map((number) => [
				`${grammaticalCase}_${number}`,
				{ form: lemma, article: getArticle(gender, number, grammaticalCase) },
			]),
		),
	) as Partial<Record<CaseNumberKey, NominalFormCellSeed>>;
};

export function inferDeclensionPattern(lemma: string, gender: Gender): NounDeclensionPattern {
	const override = DECLENSION_BY_LEMMA[lemma];
	if (override) return override;

	const low = lemma.normalize("NFC").toLowerCase();

	if (gender === "neuter") {
		if (low.endsWith("μα")) return "neut-ma";
		// Neuter -ος/-ας decline on a longer stem (μέρος -> μέρους/μέρη,
		// κρέας -> κρέατος/κρέατα). Without these they fell through to
		// neut-o and produced *μέροου / *κρέαου.
		if (low.endsWith("ος")) return "neut-os";
		if (low.endsWith("ας")) return "neut-as";
		if (
			low.endsWith("ι") ||
			low.endsWith("ί") ||
			low.endsWith("ϊ") ||
			low.endsWith("ΐ") ||
			low.endsWith("υ") ||
			low.endsWith("ύ")
		)
			return "neut-i";
		return "neut-o";
	}

	if (gender === "feminine") {
		if (low.endsWith("α") && !low.endsWith("μα")) return "fem-a";
		// -ση/-ξη/-ψη also end in -η; classify before the generic -η branch
		if (low.endsWith("ση")) return "fem-si";
		if (low.endsWith("ξη")) return "fem-ksi";
		if (low.endsWith("ψη")) return "fem-psi";
		if (low.endsWith("η") || low.endsWith("ή")) return "fem-i";
		return "fem-a";
	}

	if (low.endsWith("ας") || low.endsWith("άς")) return "masc-as";
	if (low.endsWith("ης") || low.endsWith("ής")) return "masc-is";
	if (low.endsWith("ες") || low.endsWith("ές")) return "masc-es";
	return "masc-os";
}

function coerceDeclensionPattern(
	value: string | undefined,
	lemma: string,
	gender: Gender,
	english: string,
): NounDeclensionPattern {
	const allowed = nounDeclensionPatterns as readonly string[];
	if (value != null && allowed.includes(value)) {
		return value as NounDeclensionPattern;
	}

	if (value != null) {
		console.warn(
			`[seed] Invalid declensionPattern "${value}" for noun "${lemma}" (${english}) — falling back to inferred pattern.`,
		);
	}

	return inferDeclensionPattern(lemma, gender);
}

function baselineNounForms(lemma: string, gender: Gender): NounNominalFormsSeed {
	const article = getArticle(gender, "singular", "nominative");
	return {
		nominative_singular: {
			form: lemma,
			article: article || null,
		},
	};
}

/** Run runtime declension to populate nominative + accusative + genitive (sg + pl). Vocative skipped. */
function declineToFormsSeed(lemma: string, pattern: NounDeclensionPattern): NounNominalFormsSeed {
	const declined = declineNoun(lemma, pattern);
	const seed: Partial<Record<CaseNumberKey, NominalFormCellSeed>> = {};
	for (const f of declined) {
		const key = `${f.case}_${f.number}` as CaseNumberKey;
		seed[key] = { form: f.noun, article: f.article || null };
	}
	return seed as NounNominalFormsSeed;
}

export function enrichNoun(input: NounSeedInput): NounSeed {
	const pattern = coerceDeclensionPattern(
		input.declensionPattern,
		input.lemma,
		input.gender,
		input.english,
	);
	const base = baselineNounForms(input.lemma, input.gender);
	let declined: NounNominalFormsSeed;
	try {
		declined = declineToFormsSeed(input.lemma, pattern);
	} catch {
		declined = base;
	}
	// A hand-written override that disagrees with the generator is the signature of
	// a missing paradigm, not a one-off irregular. That mismatch is how μέρος and
	// τέλος quietly papered over the absent neut-os pattern while every other
	// -ος noun seeded *μέροου-shaped garbage.
	if (input.nominalForms) {
		for (const [key, cell] of Object.entries(input.nominalForms)) {
			const generated = declined[key as CaseNumberKey];
			if (generated && cell && generated.form !== cell.form) {
				console.warn(
					`[seed] "${input.lemma}" (${pattern}) overrides ${key}: generator says "${generated.form}", seed says "${cell.form}". If more nouns of this class exist, the pattern is missing.`,
				);
			}
		}
	}

	const irregular = irregularFormsFor(input.lemma, input.gender);
	const merged: NounNominalFormsSeed = {
		...base,
		...declined,
		...irregular,
		...input.nominalForms,
	};

	// The citation form is the lemma by definition. Stem-plus-ending does not
	// round-trip for irregulars (φως rebuilt as *φωό, παππούς as *παπποός), so the
	// generated cell must never win here.
	merged.nominative_singular =
		input.nominalForms?.nominative_singular ??
		irregular?.nominative_singular ??
		base.nominative_singular;

	const out: NounSeed = {
		lemma: input.lemma,
		gender: input.gender,
		english: input.english,
		cefrLevel: input.cefrLevel,
		declensionPattern: pattern,
		nominalForms: merged,
	};
	if (input.metadata !== undefined) out.metadata = input.metadata;
	return out;
}

export function enrichNounsRecord(
	raw: Record<string, readonly NounSeedInput[]>,
): Record<string, NounSeed[]> {
	return Object.fromEntries(
		Object.entries(raw).map(([theme, list]) => [theme, list.map(enrichNoun)]),
	);
}
