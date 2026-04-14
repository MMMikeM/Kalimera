import type { AdjectiveDeclensionPattern, CefrLevel } from "../../../db.server/enums";
import type { AdjectiveNominalFormsSeed, AdjectiveSeed } from "../../../types/seed";

/** Lean adjective row; enrichment supplies pattern and nominal forms when omitted. */
export type AdjectiveSeedInput = {
	lemma: string;
	english: string;
	cefrLevel?: CefrLevel;
	pattern?: AdjectiveDeclensionPattern;
	nominalForms?: AdjectiveNominalFormsSeed;
};

const INDECLINABLE_ADJECTIVES = new Set([
	"μπλε",
	"καφέ",
	"μωβ",
	"ροζ",
	"γκρι",
	"ασημί",
	"μπεζ",
	"πορτοκαλί",
]);

function triForms(m: string, f: string, n: string): AdjectiveNominalFormsSeed {
	return {
		nominative_singular_masculine: { form: m, article: "ο" },
		nominative_singular_feminine: { form: f, article: "η" },
		nominative_singular_neuter: { form: n, article: "το" },
	};
}

/** Nominative singular citation triples for curriculum adjectives (and common irregulars). */
const CITED_ADJECTIVE_FORMS: Record<string, { m: string; f: string; n: string }> = {
	// Core list (vocabulary/adjectives.ts)
	φρέσκος: { m: "φρέσκος", f: "φρέσκη", n: "φρέσκο" },
	ίδιος: { m: "ίδιος", f: "ίδια", n: "ίδιο" },
	δυνατός: { m: "δυνατός", f: "δυνατή", n: "δυνατό" },
	ενθουσιασμένος: { m: "ενθουσιασμένος", f: "ενθουσιασμένη", n: "ενθουσιασμένο" },
	μεγάλος: { m: "μεγάλος", f: "μεγάλη", n: "μεγάλο" },
	μικρός: { m: "μικρός", f: "μικρή", n: "μικρό" },
	καλός: { m: "καλός", f: "καλή", n: "καλό" },
	κακός: { m: "κακός", f: "κακή", n: "κακό" },
	ζεστός: { m: "ζεστός", f: "ζεστή", n: "ζεστό" },
	κρύος: { m: "κρύος", f: "κρύα", n: "κρύο" },
	πολύς: { m: "πολύς", f: "πολλή", n: "πολύ" },
	λίγος: { m: "λίγος", f: "λίγη", n: "λίγο" },
	οργανωμένος: { m: "οργανωμένος", f: "οργανωμένη", n: "οργανωμένο" },
	απλός: { m: "απλός", f: "απλή", n: "απλό" },
	// Lesson lemmas (extend as new lessons add adjectives)
	κρυωμένος: { m: "κρυωμένος", f: "κρυωμένη", n: "κρυωμένο" },
	καλύτερος: { m: "καλύτερος", f: "καλύτερη", n: "καλύτερο" },
	πρώτος: { m: "πρώτος", f: "πρώτη", n: "πρώτο" },
};

const VOWELS = /[αειουάέίόύήώ]$/i;

function inferAdjectivePattern(lemma: string): AdjectiveDeclensionPattern {
	if (INDECLINABLE_ADJECTIVES.has(lemma)) return "indeclinable";
	if (lemma.endsWith("ής") || lemma.endsWith("ης")) return "is-is-es";
	if (lemma.endsWith("ύς") || lemma.endsWith("υς")) return "us-ia-u";

	if (lemma.endsWith("ος") || lemma.endsWith("ός")) {
		const cited = CITED_ADJECTIVE_FORMS[lemma];
		if (cited) {
			const f = cited.f;
			if (f.endsWith("α") || f.endsWith("ά") || f.endsWith("ια")) return "os-ia-o";
		}
		const stem = lemma.slice(0, -2);
		if (VOWELS.test(stem)) return "os-ia-o";
		return "os-i-o";
	}

	return "os-i-o";
}

function inferAdjectiveNominalForms(lemma: string): AdjectiveNominalFormsSeed {
	if (INDECLINABLE_ADJECTIVES.has(lemma)) {
		return triForms(lemma, lemma, lemma);
	}

	const cited = CITED_ADJECTIVE_FORMS[lemma];
	if (cited) {
		return triForms(cited.m, cited.f, cited.n);
	}

	// Colours and other lemmas cited in neuter (…ο, not …ος)
	if (
		(lemma.endsWith("ο") || lemma.endsWith("ό")) &&
		!lemma.endsWith("ος") &&
		!lemma.endsWith("ός")
	) {
		return {
			nominative_singular_neuter: { form: lemma, article: "το" },
		};
	}

	// Typical -ος adjectives not in the table (best-effort)
	if (lemma.endsWith("ος") || lemma.endsWith("ός")) {
		const stem = lemma.slice(0, -2);
		const fem = inferAdjectivePattern(lemma) === "os-ia-o" ? `${stem}α` : `${stem}ή`;
		return triForms(lemma, fem, `${stem}ό`);
	}

	return {
		nominative_singular_masculine: { form: lemma, article: "ο" },
	};
}

export function enrichAdjective(input: AdjectiveSeedInput): AdjectiveSeed {
	const out: AdjectiveSeed = {
		lemma: input.lemma,
		english: input.english,
		pattern: input.pattern ?? inferAdjectivePattern(input.lemma),
		nominalForms: input.nominalForms ?? inferAdjectiveNominalForms(input.lemma),
	};
	if (input.cefrLevel !== undefined) out.cefrLevel = input.cefrLevel;
	return out;
}
