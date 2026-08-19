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
			nounDetails: { columns: { gender: true } },
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
						with: {
							nounDetails: { columns: { gender: true } },
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

export type VerbWithConjugations = Awaited<
	ReturnType<typeof getVerbsWithConjugationsForTense>
>[number];

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

export const getVerbsWithConjugationsForTenses = async (
	vocabIds: number[],
	tenses: Array<"present" | "aorist" | "past_continuous" | "future">,
) => {
	if (vocabIds.length === 0) return [];
	return await db.query.vocabulary.findMany({
		where: { id: { in: vocabIds } },
		with: { verbConjugations: { where: { tense: { in: tenses } } } },
		orderBy: { cefrLevel: "asc", frequencyRank: "asc" },
	});
};

/** Verbs with just the sg1 present and aorist — enough to classify how each forms its past. */
export const fetchVerbsForInventory = async () => {
	return await db.query.vocabulary.findMany({
		where: { wordType: "verb" },
		columns: { id: true, greekText: true, englishTranslation: true, frequencyRank: true },
		with: {
			verbDetails: { columns: { conjugationFamily: true } },
			verbConjugations: {
				where: { person: "sg1", tense: { in: ["present", "aorist", "future"] } },
				columns: { tense: true, form: true },
			},
		},
	});
};

export type VerbInventoryRow = Awaited<ReturnType<typeof fetchVerbsForInventory>>[number];

/** Full three-tense paradigms for a named set of verbs — the irregulars, which need every person. */
export const fetchVerbParadigms = async (vocabIds: number[]) => {
	if (vocabIds.length === 0) return [];
	return await db.query.vocabulary.findMany({
		where: { id: { in: vocabIds } },
		columns: { id: true },
		with: {
			verbConjugations: {
				where: { tense: { in: ["present", "aorist", "future"] } },
				columns: { tense: true, person: true, form: true },
			},
		},
	});
};
