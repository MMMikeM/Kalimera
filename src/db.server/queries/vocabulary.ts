import { asc, eq, sql } from "drizzle-orm";
import type { Vocabulary } from "../types";
import type { DisplaySection } from "../enums";
import { db } from "../index";
import { tags, vocabulary, vocabularyTags } from "../schema";
async function fetchSectionVocabularyRows(section: DisplaySection) {
	return await db
		.select()
		.from(tags)
		.innerJoin(vocabularyTags, eq(vocabularyTags.tagId, tags.id))
		.innerJoin(vocabulary, eq(vocabulary.id, vocabularyTags.vocabularyId))
		.where(eq(tags.section, section))
		.orderBy(
			asc(tags.sectionDisplayOrder),
			sql`case when ${vocabularyTags.displayOrder} is null then 1 else 0 end`,
			asc(vocabularyTags.displayOrder),
			asc(vocabulary.greekText),
		);
}

export async function fetchSectionVocabularyByTagSlug(
	section: DisplaySection,
): Promise<Record<string, Vocabulary[]>> {
	const rows = await fetchSectionVocabularyRows(section);
	const byTagSlug: Record<string, Vocabulary[]> = {};

	for (const row of rows) {
		const tagSlug = row.tags.slug;
		const items = byTagSlug[tagSlug] ?? [];
		items.push(row.vocabulary);
		byTagSlug[tagSlug] = items;
	}

	return byTagSlug;
}

export async function fetchVerbsWithVerbDetails() {
	return await db.query.vocabulary.findMany({
		where: { wordType: "verb" },
		with: { verbDetails: true },
	});
}

export type VerbVocabularyWithDetailsRow = Awaited<
	ReturnType<typeof fetchVerbsWithVerbDetails>
>[number];

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

export async function fetchVerbWithConjugationRelations(vocabId: number) {
	return await db.query.vocabulary.findFirst({
		where: { id: vocabId, wordType: "verb" },
		with: {
			verbDetails: true,
			verbConjugations: true,
			verbImperatives: true,
		},
	});
}

export type VerbConjugationGraphRow = NonNullable<
	Awaited<ReturnType<typeof fetchVerbWithConjugationRelations>>
>;

/** Vocabulary the user has not started practising (no `vocabulary_skills` row for this user). */
export const getNewVocabularyItems = async (userId: number, limit = 20) => {
	return await db.query.vocabulary.findMany({
		where: {
			NOT: {
				vocabularySkills: {
					userId,
				},
			},
		},
		orderBy: { difficultyLevel: "asc" },
		limit,
	});
};
