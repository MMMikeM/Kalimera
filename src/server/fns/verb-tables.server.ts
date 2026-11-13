import type { PersonNumber, VerbTense } from "@/server/db/enums";
import { getVerbsByLemmaWithConjugations } from "@/server/db/queries/vocabulary";

type Paradigm = Partial<Record<VerbTense, Partial<Record<PersonNumber, string>>>>;

export interface VerbTableVerb {
	id: number;
	lemma: string;
	english: string;
	forms: Paradigm;
}

const toParadigm = (
	conjugations: Array<{ tense: VerbTense; person: PersonNumber; form: string }>,
): Paradigm => {
	const forms: Paradigm = {};
	for (const { tense, person, form } of conjugations) {
		(forms[tense] ??= {})[person] = form;
	}
	return forms;
};

export const getVerbTables = async (lemmas: string[]): Promise<VerbTableVerb[]> => {
	const verbs = await getVerbsByLemmaWithConjugations(lemmas);

	return verbs.map((verb) => ({
		id: verb.id,
		lemma: verb.greekText,
		english: verb.englishTranslation,
		forms: toParadigm(verb.verbConjugations),
	}));
};
