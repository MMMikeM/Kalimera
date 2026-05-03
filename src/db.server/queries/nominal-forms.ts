import { db } from "../index";

/** Vocabulary rows joined to their nominal_forms, filtered by word type and (optionally) vocab ids. */
export const getVocabularyWithNominalForms = async (
	wordType: "noun" | "adjective",
	vocabIds?: number[],
) => {
	if (vocabIds && vocabIds.length === 0) return [];

	return await db.query.vocabulary.findMany({
		where: vocabIds ? { wordType, id: { in: vocabIds } } : { wordType },
		with: { nominalForms: true },
		limit: 200,
	});
};

export type VocabularyWithNominalForms = Awaited<
	ReturnType<typeof getVocabularyWithNominalForms>
>[number];
