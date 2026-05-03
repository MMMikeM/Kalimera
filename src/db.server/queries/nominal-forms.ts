import { db } from "../index";

const CASE_LABEL: Record<string, string> = {
	nominative: "Doer",
	accusative: "Target",
	genitive: "Owner",
};

const NUMBER_LABEL: Record<string, string> = {
	singular: "sg",
	plural: "pl",
};

interface NominalFormQuestion {
	vocabId: number;
	greek: string;
	english: string;
	greekText: string; // bare lemma
	greekFull: string; // article + form
	caseHint: string; // "Doer" | "Target" | "Owner"
	numberHint: string; // "sg" | "pl"
	gender?: string | null;
}

/** Query nominal_forms joined to vocabulary, filtered by word type and (optionally) vocab ids. */
export const getNominalFormsForDrill = async (
	wordType: "noun" | "adjective",
	vocabIds?: number[],
): Promise<NominalFormQuestion[]> => {
	if (vocabIds && vocabIds.length === 0) return [];

	const rows = await db.query.vocabulary.findMany({
		where: vocabIds ? { wordType, id: { in: vocabIds } } : { wordType },
		with: { nominalForms: true },
		limit: 200,
	});

	const questions: NominalFormQuestion[] = [];
	for (const vocab of rows) {
		for (const form of vocab.nominalForms) {
			const article = form.article ?? "";
			const greekFull = article ? `${article} ${form.form}` : form.form;
			questions.push({
				vocabId: vocab.id,
				greek: form.form,
				english: vocab.englishTranslation,
				greekText: form.form,
				greekFull,
				caseHint: CASE_LABEL[form.grammaticalCase] ?? form.grammaticalCase,
				numberHint: NUMBER_LABEL[form.number] ?? form.number,
				gender: form.gender,
			});
		}
	}
	return questions;
};
