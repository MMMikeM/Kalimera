import { type PersonNumber, type VerbTense, verbTenses } from "@/server/db/enums";
import { getUnitWords, getVerbsWithConjugationsForTenses } from "@/server/db/queries/vocabulary";

type Paradigm = Partial<Record<VerbTense, Partial<Record<PersonNumber, string>>>>;

export interface ReferenceVerb {
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

export const getReferenceVerbs = async (lemmas: string[]): Promise<ReferenceVerb[]> => {
	const words = await getUnitWords(lemmas);
	const verbs = await getVerbsWithConjugationsForTenses(
		words.map((word) => word.id),
		[...verbTenses],
	);
	const formsById = new Map(verbs.map((verb) => [verb.id, toParadigm(verb.verbConjugations)]));

	return words.map((word) => ({
		lemma: word.greekText,
		english: word.englishTranslation,
		forms: formsById.get(word.id) ?? {},
	}));
};
