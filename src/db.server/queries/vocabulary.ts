import { eq, inArray } from "drizzle-orm";
import { db } from "../index";
import type { DisplaySection } from "../enums";
import { vocabulary, vocabularyTags, tags, tagSections } from "../schema";

// ═══════════════════════════════════════════════════════════════════════════════
// VOCABULARY BY TAGS
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * Fetch vocabulary items filtered by tag slugs.
 * Used by vocabulary/, phrases/, and other routes that need tagged vocab.
 */
async function getVocabByTags(tagSlugs: readonly string[]) {
	return db
		.select({
			id: vocabulary.id,
			greek: vocabulary.greekText,
			english: vocabulary.englishTranslation,
			wordType: vocabulary.wordType,
			metadata: vocabulary.metadata,
			tagSlug: tags.slug,
		})
		.from(vocabulary)
		.innerJoin(vocabularyTags, eq(vocabularyTags.vocabularyId, vocabulary.id))
		.innerJoin(tags, eq(tags.id, vocabularyTags.tagId))
		.where(inArray(tags.slug, [...tagSlugs]))
		.orderBy(vocabulary.greekText);
}

// ═══════════════════════════════════════════════════════════════════════════════
// VOCABULARY BY SECTION (using tag_sections lookup table)
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * Fetch vocabulary items for a specific UI section (nouns, verbs, phrases, reference).
 * Uses the tag_sections lookup table to determine which tags belong to which section.
 */
export async function getVocabBySection(section: DisplaySection) {
	return db
		.select({
			id: vocabulary.id,
			greek: vocabulary.greekText,
			english: vocabulary.englishTranslation,
			wordType: vocabulary.wordType,
			metadata: vocabulary.metadata,
			tagSlug: tags.slug,
			tagName: tags.name,
			displayOrder: tagSections.displayOrder,
		})
		.from(vocabulary)
		.innerJoin(vocabularyTags, eq(vocabularyTags.vocabularyId, vocabulary.id))
		.innerJoin(tags, eq(tags.id, vocabularyTags.tagId))
		.innerJoin(tagSections, eq(tagSections.tagId, tags.id))
		.where(eq(tagSections.section, section))
		.orderBy(tagSections.displayOrder, vocabulary.greekText);
}

/** Type for a vocabulary item with section info */
export type VocabItemWithSection = Awaited<ReturnType<typeof getVocabBySection>>[number];

// ═══════════════════════════════════════════════════════════════════════════════
// VERBS WITH PATTERNS
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * Fetch all verbs with their conjugation patterns using RQB v2.
 */
export async function getVerbsWithPatterns() {
	const results = await db.query.vocabulary.findMany({
		where: { wordType: "verb" },
		with: { verbDetails: true },
	});

	return results.map((v) => ({
		id: v.id,
		greek: v.greekText,
		english: v.englishTranslation,
		pattern: v.verbDetails?.conjugationFamily ?? null,
	}));
}

/** Type for a verb with its conjugation pattern */
export type VerbWithPattern = Awaited<
	ReturnType<typeof getVerbsWithPatterns>
>[number];

// ═══════════════════════════════════════════════════════════════════════════════
// SEARCH VOCABULARY
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * Fetch all processed vocabulary with tags for search functionality using RQB v2.
 */
export async function searchVocabulary() {
	const results = await db.query.vocabulary.findMany({
		where: { wordType: { ne: "phrase" } },
		with: {
			verbDetails: true,
			vocabularyTags: {
				with: { tag: true },
			},
		},
	});

	return results.map((v) => ({
		id: v.id,
		greek: v.greekText,
		english: v.englishTranslation,
		type: v.wordType,
		family: v.verbDetails?.conjugationFamily ?? null,
		tags: v.vocabularyTags.map((vt) => vt.tag?.name).filter(Boolean) as string[],
	}));
}

/** Type for a searchable vocabulary item */
export type SearchVocabItem = Awaited<
	ReturnType<typeof searchVocabulary>
>[number];

// ═══════════════════════════════════════════════════════════════════════════════
// VERB CONJUGATIONS
// ═══════════════════════════════════════════════════════════════════════════════

type ParadigmForms = {
	sg1: string;
	sg2: string;
	sg3: string;
	pl1: string;
	pl2: string;
	pl3: string;
};

type VerbWithConjugations = {
	id: number;
	greekText: string;
	englishTranslation: string;
	verbDetails: {
		conjugationFamily: string;
		presentStem: string | null;
		aoristStem: string | null;
		futureStem: string | null;
		isSuppletive: boolean | null;
		notes: string | null;
	} | null;
	conjugations: Record<string, ParadigmForms>;
	imperatives: {
		imperfective: { singular: string; plural: string } | null;
		perfective: { singular: string; plural: string } | null;
	};
};

/**
 * Get a single verb with all its conjugations and imperatives.
 * Uses a single query with relations to fetch everything efficiently.
 */
export async function getVerbWithConjugations(
	vocabId: number,
): Promise<VerbWithConjugations | null> {
	const result = await db.query.vocabulary.findFirst({
		where: { id: vocabId, wordType: "verb" },
		with: {
			verbDetails: true,
			verbConjugations: true,
			verbImperatives: true,
		},
	});

	if (!result) return null;

	const conjugations: Record<string, ParadigmForms> = {};
	for (const conj of result.verbConjugations) {
		const tenseKey = conj.tense;
		if (!conjugations[tenseKey]) {
			conjugations[tenseKey] = {
				sg1: "",
				sg2: "",
				sg3: "",
				pl1: "",
				pl2: "",
				pl3: "",
			};
		}
		const paradigm = conjugations[tenseKey];
		if (paradigm) {
			paradigm[conj.person as keyof ParadigmForms] = conj.form;
		}
	}

	let imperfective: { singular: string; plural: string } | null = null;
	let perfective: { singular: string; plural: string } | null = null;

	for (const imp of result.verbImperatives) {
		const entry = { singular: "", plural: "" };
		if (imp.number === "singular") {
			entry.singular = imp.form;
		} else {
			entry.plural = imp.form;
		}

		if (imp.aspect === "imperfective") {
			if (!imperfective) imperfective = { singular: "", plural: "" };
			if (imp.number === "singular") {
				imperfective.singular = imp.form;
			} else {
				imperfective.plural = imp.form;
			}
		} else {
			if (!perfective) perfective = { singular: "", plural: "" };
			if (imp.number === "singular") {
				perfective.singular = imp.form;
			} else {
				perfective.plural = imp.form;
			}
		}
	}

	return {
		id: result.id,
		greekText: result.greekText,
		englishTranslation: result.englishTranslation,
		verbDetails: result.verbDetails
			? {
					conjugationFamily: result.verbDetails.conjugationFamily,
					presentStem: result.verbDetails.presentStem,
					aoristStem: result.verbDetails.aoristStem,
					futureStem: result.verbDetails.futureStem,
					isSuppletive: result.verbDetails.isSuppletive,
					notes: result.verbDetails.notes,
				}
			: null,
		conjugations,
		imperatives: { imperfective, perfective },
	};
}

type VerbSummary = {
	id: number;
	greekText: string;
	englishTranslation: string;
	conjugationFamily: string | null;
	isSuppletive: boolean | null;
	hasConjugations: boolean;
};

/**
 * Get all verbs that have full conjugation data.
 * Returns a summary list for navigation/selection purposes.
 */
async function getVerbsWithConjugationData(): Promise<VerbSummary[]> {
	const results = await db.query.vocabulary.findMany({
		where: { wordType: "verb" },
		with: {
			verbDetails: true,
			verbConjugations: {
				limit: 1,
			},
		},
		orderBy: { greekText: "asc" },
	});

	return results.map((v) => ({
		id: v.id,
		greekText: v.greekText,
		englishTranslation: v.englishTranslation,
		conjugationFamily: v.verbDetails?.conjugationFamily ?? null,
		isSuppletive: v.verbDetails?.isSuppletive ?? null,
		hasConjugations: v.verbConjugations.length > 0,
	}));
}

export type { VerbWithConjugations, VerbSummary, ParadigmForms };
