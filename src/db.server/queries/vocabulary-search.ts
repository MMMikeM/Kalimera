import { db } from "../index";

export async function fetchVocabularyRowsForSearch() {
	return await db.query.vocabulary.findMany({
		where: { wordType: { ne: "phrase" } },
		with: {
			verbDetails: true,
			vocabularyTags: {
				with: { tag: true },
			},
		},
	});
}

export type VocabularySearchGraphRow = Awaited<
	ReturnType<typeof fetchVocabularyRowsForSearch>
>[number];
