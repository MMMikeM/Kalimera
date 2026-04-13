import type { NounDeclensionPattern } from "../../../db.server/enums";
import { nounDeclensionPatterns } from "../../../db.server/enums";
import {
	getArticle,
	type Case,
	type Gender,
	type GrammaticalNumber,
} from "../../../lib/greek-grammar";
import type { NominalFormCellSeed, NounNominalFormsSeed, NounSeed } from "../../../types/seed";

type CaseNumberKey = `${Case}_${GrammaticalNumber}`;

/** Lean noun row in data files; enrichment fills declension + nominal forms. */
export type NounSeedInput = {
	lemma: string;
	gender: Gender;
	english: string;
	metadata?: Record<string, unknown>;
	declensionPattern?: NounDeclensionPattern;
	/** Merged over inferred nominative singular baseline. */
	nominalForms?: Partial<Record<CaseNumberKey, NominalFormCellSeed>>;
};

const DECLENSION_BY_LEMMA: Record<string, NounDeclensionPattern> = {
	// Pluralia / irregular citation forms
	διακοπές: "fem-a",
	ρούχα: "neut-o",
	ψώνια: "neut-o",
};

export function inferNounDeclensionPattern(lemma: string, gender: Gender): NounDeclensionPattern {
	const override = DECLENSION_BY_LEMMA[lemma];
	if (override) return override;

	const low = lemma.normalize("NFC").toLowerCase();

	if (gender === "neuter") {
		if (low.endsWith("μα")) return "neut-ma";
		if (low.endsWith("ι") || low.endsWith("ϊ")) return "neut-i";
		return "neut-o";
	}

	if (gender === "feminine") {
		if (low.endsWith("α") && !low.endsWith("μα")) return "fem-a";
		// -ση/-ξη also end in -η; classify before the generic -η branch
		if (low.endsWith("ση") || low.endsWith("ξη")) return "fem-si";
		if (low.endsWith("η") || low.endsWith("ή")) return "fem-i";
		return "fem-a";
	}

	if (low.endsWith("ας") || low.endsWith("άς")) return "masc-as";
	if (low.endsWith("ης") || low.endsWith("ής")) return "masc-is";
	if (low.endsWith("ες") || low.endsWith("ές")) return "masc-es";
	return "masc-os";
}

function coerceNounDeclensionPattern(
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

	return inferNounDeclensionPattern(lemma, gender);
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

export function enrichNoun(input: NounSeedInput): NounSeed {
	const pattern = coerceNounDeclensionPattern(
		input.declensionPattern,
		input.lemma,
		input.gender,
		input.english,
	);
	const base = baselineNounForms(input.lemma, input.gender);
	const merged: NounNominalFormsSeed = input.nominalForms
		? { ...base, ...input.nominalForms }
		: base;

	const out: NounSeed = {
		lemma: input.lemma,
		gender: input.gender,
		english: input.english,
		declensionPattern: pattern,
		nominalForms: merged,
	};
	if (input.metadata !== undefined) {
		out.metadata = input.metadata;
	}
	return out;
}

export function enrichNounsRecord(
	raw: Record<string, readonly NounSeedInput[]>,
): Record<string, NounSeed[]> {
	return Object.fromEntries(
		Object.entries(raw).map(([theme, list]) => [theme, list.map(enrichNoun)]),
	);
}
