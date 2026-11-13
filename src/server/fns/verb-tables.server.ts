import type { GrammaticalNumber, PersonNumber, VerbTense } from "@/server/db/enums";
import { getVerbsByLemmaWithConjugations } from "@/server/db/queries/vocabulary";

type Paradigm = Partial<Record<VerbTense, Partial<Record<PersonNumber, string>>>>;

/** Commands by aspect, then by how many people are told. */
export type Commands = Partial<Record<"perfective" | "imperfective", Partial<Record<GrammaticalNumber, string>>>>;

export interface VerbTableVerb {
	id: number;
	lemma: string;
	english: string;
	forms: Paradigm;
	commands: Commands;
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

const toCommands = (
	imperatives: Array<{ aspect: "perfective" | "imperfective"; number: GrammaticalNumber; form: string }>,
): Commands => {
	const commands: Commands = {};
	for (const { aspect, number, form } of imperatives) {
		(commands[aspect] ??= {})[number] = form;
	}
	return commands;
};

export const getVerbTables = async (lemmas: string[]): Promise<VerbTableVerb[]> => {
	const verbs = await getVerbsByLemmaWithConjugations(lemmas);

	return verbs.map((verb) => ({
		id: verb.id,
		lemma: verb.greekText,
		english: verb.englishTranslation,
		forms: toParadigm(verb.verbConjugations),
		commands: toCommands(verb.verbImperatives),
	}));
};
