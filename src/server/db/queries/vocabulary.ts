import { db } from "../index";
import { type WordType } from "../schema";

export const fetchVocabularyRowsForSearch = async () => {
	return await db.query.vocabulary.findMany({
		columns: {
			id: true,
			greekText: true,
			englishTranslation: true,
			wordType: true,
			frequencyRank: true,
		},
		with: {
			nounDetails: { columns: { gender: true } },
			verbConjugations: { columns: { tense: true, person: true, form: true } },
			verbImperatives: { columns: { aspect: true, number: true, form: true } },
			nominalForms: {
				columns: { grammaticalCase: true, number: true, form: true, article: true },
			},
			vocabularyTags: {
				columns: {},
				with: { tag: { columns: { slug: true, section: true, sectionDisplayOrder: true } } },
			},
		},
	});
};

export type SearchVocabularyRow = Awaited<ReturnType<typeof fetchVocabularyRowsForSearch>>[number];

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

/** A unit's words: a verb's present I / you / he-she, a noun's singular forms with article. */
export const getUnitWords = async (greek: string[]) => {
	if (greek.length === 0) return [];
	return await db.query.vocabulary.findMany({
		where: { greekText: { in: greek } },
		columns: { id: true, greekText: true, englishTranslation: true },
		with: {
			verbConjugations: {
				where: { tense: "present", person: { in: ["sg1", "sg2", "sg3"] } },
				columns: { person: true, form: true },
			},
			nominalForms: {
				where: { number: "singular", grammaticalCase: { in: ["nominative", "accusative"] } },
				columns: { grammaticalCase: true, form: true, article: true },
			},
		},
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

export const getVerbsByLemmaWithConjugations = async (lemmas: string[]) => {
	if (lemmas.length === 0) return [];
	return await db.query.vocabulary.findMany({
		where: { greekText: { in: lemmas }, wordType: "verb" },
		columns: { id: true, greekText: true, englishTranslation: true },
		with: {
			verbConjugations: { columns: { tense: true, person: true, form: true } },
			verbImperatives: { columns: { aspect: true, number: true, form: true } },
		},
	});
};
