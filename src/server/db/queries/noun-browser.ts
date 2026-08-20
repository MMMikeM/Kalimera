import { db } from "../index";

/**
 * Every noun with its gender, stored forms and subject tags, for the noun
 * browser. Public: `/learn` carries no auth requirement at the query layer, and
 * the drill readers cannot be reused here because they require a user and throw
 * on an empty pool.
 */
export const getNounsWithFormsAndSubjects = async () =>
	await db.query.vocabulary.findMany({
		where: { wordType: "noun" },
		columns: {
			id: true,
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
			vocabularyTags: {
				columns: {},
				with: {
					tag: { columns: { slug: true, name: true, section: true, sectionDisplayOrder: true } },
				},
			},
		},
	});

export type NounBrowserRow = Awaited<ReturnType<typeof getNounsWithFormsAndSubjects>>[number];
