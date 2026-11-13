import type { WordForms } from "@/lib/units";
import { getUnitWords } from "@/server/db/queries/vocabulary";

type UnitWordRow = Awaited<ReturnType<typeof getUnitWords>>[number];

const withArticle = (row: UnitWordRow, grammaticalCase: "nominative" | "accusative") => {
	const form = row.nominalForms.find((f) => f.grammaticalCase === grammaticalCase);
	return form && [form.article, form.form].filter(Boolean).join(" ");
};

const toForms = (row: UnitWordRow): WordForms => {
	const person = (p: string) => row.verbConjugations.find((c) => c.person === p)?.form;
	const [sg1, sg2, sg3] = [person("sg1"), person("sg2"), person("sg3")];
	const name = withArticle(row, "nominative");
	const target = withArticle(row, "accusative");
	return {
		vocabId: row.id,
		english: row.englishTranslation,
		...(sg1 && sg2 && sg3 && { present: { sg1, sg2, sg3 } }),
		...(name && target && { noun: { name, target } }),
	};
};

/** Each word's forms, keyed by the word as the vocabulary table spells it. */
export const getUnitWordForms = async (lemmas: string[]) =>
	new Map((await getUnitWords(lemmas)).map((row) => [row.greekText, toForms(row)]));
