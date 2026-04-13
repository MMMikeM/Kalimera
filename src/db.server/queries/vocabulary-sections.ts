import { db } from "../index";
import { type WordType } from "../schema";

type VocabSection = "nouns" | "verbs" | "phrases" | "reference";

export const getVocabBySlug = async (section: VocabSection, wordTypes: WordType[]) => {
	const rows = await db.query.tags.findMany({
		columns: { slug: true, section: true },
		where: {
			section,
		},
		with: {
			vocabularyTags: {
				columns: {},
				with: {
					vocabulary: {
						where: {
							wordType: {
								in: wordTypes,
							},
						},
					},
				},
			},
		},
	});

	return rows;
};
