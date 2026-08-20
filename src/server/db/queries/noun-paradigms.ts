import { db } from "../index";

/**
 * Every noun with its declension pattern and stored forms, for the public nouns
 * reference. Deliberately takes no `userId`: `/reference` is not auth-gated, and
 * the drill-side readers (`getDrillVocabPool`) both require a user and throw on
 * an empty result, which is correct for a drill and fatal for a reference page.
 */
export const getNounsForParadigmReference = async () =>
	await db.query.vocabulary.findMany({
		where: { wordType: "noun" },
		columns: {
			greekText: true,
			englishTranslation: true,
			cefrLevel: true,
			frequencyRank: true,
		},
		with: {
			nounDetails: { columns: { gender: true, declensionPattern: true } },
			nominalForms: {
				columns: { grammaticalCase: true, number: true, form: true, article: true },
			},
		},
	});

export type NounParadigmRow = Awaited<ReturnType<typeof getNounsForParadigmReference>>[number];
