import { db } from "../index";
import { type WordType } from "../schema";

/** Vocabulary the user has not started practising (no `vocabulary_reviews` row for this user). */
export const getNewVocabularyItems = async (userId: number, limit = 20) => {
	return await db.query.vocabulary.findMany({
		where: {
			NOT: {
				vocabProgress: {
					userId,
				},
			},
		},
		orderBy: { frequencyRank: "asc" },
		limit,
	});
};

export const fetchVocabularyRowsForSearch = async () => {
	return await db.query.vocabulary.findMany({
		where: { wordType: { ne: "phrase" } },
		with: {
			verbDetails: true,
			vocabularyTags: {
				with: { tag: true },
			},
		},
	});
};

export type VocabularySearchGraphRow = Awaited<
	ReturnType<typeof fetchVocabularyRowsForSearch>
>[number];

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

export const fetchVerbsWithVerbDetails = async () => {
	return await db.query.vocabulary.findMany({
		where: { wordType: "verb" },
		with: { verbDetails: true },
	});
};

export type VerbVocabularyWithDetailsRow = Awaited<
	ReturnType<typeof fetchVerbsWithVerbDetails>
>[number];

export const fetchVerbWithConjugationRelations = async (vocabId: number) => {
	return await db.query.vocabulary.findFirst({
		where: { id: vocabId, wordType: "verb" },
		with: {
			verbDetails: true,
			verbConjugations: true,
			verbImperatives: true,
		},
	});
};

export type VerbConjugationGraphRow = NonNullable<
	Awaited<ReturnType<typeof fetchVerbWithConjugationRelations>>
>;

export type VerbWithConjugations = Awaited<ReturnType<typeof getVerbsWithConjugationsForTense>>[number];

export const getVerbsWithConjugationsForTense = async (
	vocabIds: number[],
	tense: "present" | "aorist" | "past_continuous" | "future",
) => {
	if (vocabIds.length === 0) return [];
	return await db.query.vocabulary.findMany({
		where: { id: { in: vocabIds } },
		with: { verbConjugations: { where: { tense } } },
		orderBy: { cefrLevel: "asc", frequencyRank: "asc" },
	});
};
