import { sql } from "drizzle-orm";
import { db } from "../db.server";
import { declensionPatterns, type DeclensionPattern } from "../db.server/enums";
import { nounDetails, tags, verbDetails, vocabulary, vocabularyTags } from "../db.server/schema";
import type { NewNounDetails, NewVocabulary, NewVocabularyTag } from "../db.server/types";
import { formatNounWithArticle } from "../lib/greek-grammar";
import {
	ADJECTIVES,
	ARRIVING_PHRASES,
	COLORS,
	COMMANDS,
	COMMON_RESPONSES,
	CONTENT_TAGS,
	DAILY_PATTERNS,
	DAYS_OF_WEEK,
	DISCOURSE_FILLERS,
	DISCOURSE_MARKERS,
	ESSENTIAL_PHRASES,
	FOOD_PHRASES,
	FREQUENCY_ADVERBS,
	GENDERED_PRONOUNS,
	INDEFINITE_ADVERBS,
	INDEFINITE_PRONOUNS,
	LESSON_TAGS,
	LESSONS,
	LIKES_CONSTRUCTION,
	MONTHS,
	NAME_CONSTRUCTION,
	NOUNS,
	NUMBERS,
	OPINION_PHRASES,
	POSITION_ADVERBS,
	QUESTION_WORDS,
	REQUEST_PHRASES,
	SMALLTALK_PHRASES,
	SOCIAL_PHRASES,
	SURVIVAL_PHRASES,
	TIME_PHRASES,
	TIME_TELLING,
	TRANSPORT_VERBS,
	VERBS,
} from "./seed-data";

const BATCH_SIZE = 100;

type VerbDetailRecord = {
	vocabId: number;
	conjugationFamily: string;
};

type NounDetailRecord = NewNounDetails;

const isDeclensionPattern = (value: unknown): value is DeclensionPattern =>
	typeof value === "string" && (declensionPatterns as readonly string[]).includes(value);

type VocabWithTags = {
	vocab: NewVocabulary;
	tags: string[];
	nounDetail?: Omit<NounDetailRecord, "vocabId">;
	verbDetail?: { conjugationFamily: string };
};

/**
 * Batch insert vocabulary items and return a map of greekText -> id
 * Handles conflicts by fetching existing IDs in batch
 */
async function batchInsertVocab(items: NewVocabulary[]): Promise<Map<string, number>> {
	const resultMap = new Map<string, number>();
	if (items.length === 0) return resultMap;

	let insertedCount = 0;

	// Insert in chunks to avoid SQLite variable limits
	for (let i = 0; i < items.length; i += BATCH_SIZE) {
		const batch = items.slice(i, i + BATCH_SIZE);

		const inserted = await db
			.insert(vocabulary)
			.values(batch)
			.onConflictDoNothing({ target: vocabulary.greekText })
			.returning({ id: vocabulary.id, greekText: vocabulary.greekText });

		for (const row of inserted) {
			resultMap.set(row.greekText, row.id);
		}
		insertedCount += inserted.length;
	}

	// Batch-fetch IDs for items that already existed
	const missingTexts = items.map((item) => item.greekText).filter((text) => !resultMap.has(text));

	if (missingTexts.length > 0) {
		for (let i = 0; i < missingTexts.length; i += BATCH_SIZE) {
			const batch = missingTexts.slice(i, i + BATCH_SIZE);
			const existing = await db.query.vocabulary.findMany({
				where: { greekText: { in: batch } },
				columns: { id: true, greekText: true },
			});

			for (const row of existing) {
				resultMap.set(row.greekText, row.id);
			}
		}
	}

	const skippedCount = items.length - insertedCount;
	console.log(`  → ${insertedCount} inserted, ${skippedCount} skipped`);

	return resultMap;
}

/**
 * Batch insert verb details
 */
async function batchInsertVerbDetails(details: VerbDetailRecord[]) {
	if (details.length === 0) return;

	for (let i = 0; i < details.length; i += BATCH_SIZE) {
		const batch = details.slice(i, i + BATCH_SIZE);
		await db.insert(verbDetails).values(batch).onConflictDoNothing({ target: verbDetails.vocabId });
	}
}

async function batchInsertNounDetails(details: NounDetailRecord[]) {
	if (details.length === 0) return;

	for (let i = 0; i < details.length; i += BATCH_SIZE) {
		const batch = details.slice(i, i + BATCH_SIZE);
		await db.insert(nounDetails).values(batch).onConflictDoUpdate({
			target: nounDetails.vocabId,
			set: {
				gender: sql`excluded.gender`,
				declensionPattern: sql`excluded.declension_pattern`,
			},
		});
	}
}

/**
 * Process a category: collect items, batch insert, link tags
 */
async function processCategory(
	categoryName: string,
	items: VocabWithTags[],
	tagMap: Map<string, number>,
	vocabTagLinks: NewVocabularyTag[],
	tagDisplayOrderById: Map<number, number>,
	nounDetailsToInsert: NounDetailRecord[],
): Promise<VerbDetailRecord[]> {
	console.log(`Seeding ${categoryName}...`);

	const vocabItems = items.map((item) => item.vocab);
	const idMap = await batchInsertVocab(vocabItems);

	const verbDetailsToInsert: VerbDetailRecord[] = [];

	for (const item of items) {
		const vocabId = idMap.get(item.vocab.greekText);
		if (!vocabId) {
			console.warn(`  Warning: Could not find ID for ${item.vocab.greekText}`);
			continue;
		}

		// Link tags
		for (const tagSlug of item.tags) {
			const tagId = tagMap.get(tagSlug);
			if (tagId) {
				const nextDisplayOrder = tagDisplayOrderById.get(tagId) ?? 0;
				vocabTagLinks.push({ vocabularyId: vocabId, tagId, displayOrder: nextDisplayOrder });
				tagDisplayOrderById.set(tagId, nextDisplayOrder + 1);
			}
		}

		// Collect verb details for batch insert
		if (item.verbDetail) {
			verbDetailsToInsert.push({
				vocabId,
				conjugationFamily: item.verbDetail.conjugationFamily,
			});
		}

		if (item.nounDetail) {
			nounDetailsToInsert.push({
				vocabId,
				gender: item.nounDetail.gender,
				declensionPattern: item.nounDetail.declensionPattern ?? null,
			});
		}
	}

	return verbDetailsToInsert;
}

async function seed() {
	console.log("Seeding database (additive mode with batching)...\n");

	// Upsert all tags (content tags + lesson tags)
	console.log("Upserting tags...");
	const allTags = [...Object.values(CONTENT_TAGS), ...Object.values(LESSON_TAGS)];
	const tagValues = allTags.map((tag) => ({
		slug: tag.slug,
		name: tag.name,
		section: "section" in tag ? tag.section : null,
		sectionDisplayOrder: "displayOrder" in tag ? tag.displayOrder : null,
	}));

	const insertedTags = await db
		.insert(tags)
		.values(tagValues)
		.onConflictDoUpdate({
			target: tags.slug,
			set: {
				name: sql`excluded.name`,
				section: sql`excluded.section`,
				sectionDisplayOrder: sql`excluded.section_display_order`,
			},
		})
		.returning();
	console.log(`Upserted ${insertedTags.length} tags.`);

	const tagMap = new Map(insertedTags.map((t) => [t.slug, t.id]));
	console.log("Updated tag section metadata.\n");

	const vocabTagLinks: NewVocabularyTag[] = [];
	const tagDisplayOrderById = new Map<number, number>();
	const allNounDetails: NounDetailRecord[] = [];
	const allVerbDetails: VerbDetailRecord[] = [];

	// ============================================
	// NOUNS (no word-type tag - vocabulary.wordType is authoritative)
	// ============================================
	const themeTagMap: Record<string, string> = {
		summer: "summer",
		transport: "transport-vehicle",
		timeOfDay: "time-of-day",
		timeExpressions: "time-expression",
		shopping: "shopping",
		clothing: "clothing",
		household: "household",
		people: "people",
		nature: "nature",
	};

	const nounItems: VocabWithTags[] = [];
	for (const [theme, nouns] of Object.entries(NOUNS)) {
		for (const noun of nouns) {
			const displayText = formatNounWithArticle(noun.lemma, noun.gender);
			const itemTags: string[] = [];
			if (themeTagMap[theme]) itemTags.push(themeTagMap[theme]);

			nounItems.push({
				vocab: {
					greekText: displayText,
					englishTranslation: noun.english,
					wordType: "noun",
					metadata: "metadata" in noun ? noun.metadata : undefined,
				},
				tags: itemTags,
				nounDetail: {
					gender: noun.gender,
					declensionPattern:
						"declensionPattern" in noun && isDeclensionPattern(noun.declensionPattern)
							? noun.declensionPattern
							: null,
				},
			});
		}
	}
	allVerbDetails.push(
		...(
			await processCategory(
				"nouns",
				nounItems,
				tagMap,
				vocabTagLinks,
				tagDisplayOrderById,
				allNounDetails,
			)
		),
	);

	// ============================================
	// VERBS (no word-type tag)
	// ============================================
	const verbItems: VocabWithTags[] = VERBS.map((verb) => ({
		vocab: {
			greekText: verb.lemma,
			englishTranslation: verb.english,
			wordType: "verb" as const,
		},
		tags: [], // No content tags for standalone verbs
		verbDetail: {
			conjugationFamily: verb.conjugationFamily,
		},
	}));
	allVerbDetails.push(
		...(
			await processCategory(
				"verbs",
				verbItems,
				tagMap,
				vocabTagLinks,
				tagDisplayOrderById,
				allNounDetails,
			)
		),
	);

	// ============================================
	// PHRASES (no word-type tags)
	// ============================================
	const phraseCategories: Array<{
		name: string;
		items: Array<{ text: string; english: string; metadata?: unknown }>;
		tags: string[];
	}> = [
		{
			name: "essential phrases",
			items: ESSENTIAL_PHRASES,
			tags: ["essential"],
		},
		{ name: "survival phrases", items: SURVIVAL_PHRASES, tags: ["survival"] },
		{ name: "request phrases", items: REQUEST_PHRASES, tags: ["request"] },
		{
			name: "discourse fillers",
			items: DISCOURSE_FILLERS,
			tags: ["discourse-filler", "expression"],
		},
		{
			name: "social phrases",
			items: SOCIAL_PHRASES,
			tags: ["social-phrase", "expression"],
		},
		{ name: "question words", items: QUESTION_WORDS, tags: ["question"] },
		{ name: "commands", items: COMMANDS, tags: ["command"] },
		{ name: "time phrases", items: TIME_PHRASES, tags: ["time-expression"] },
		{
			name: "name construction",
			items: NAME_CONSTRUCTION,
			tags: ["name-construction"],
		},
		{
			name: "discourse markers",
			items: DISCOURSE_MARKERS,
			tags: ["discourse-markers"],
		},
		{ name: "common responses", items: COMMON_RESPONSES, tags: ["responses"] },
		{ name: "opinion phrases", items: OPINION_PHRASES, tags: ["opinions"] },
		{
			name: "arriving phrases",
			items: ARRIVING_PHRASES,
			tags: ["conversation-arriving"],
		},
		{ name: "food phrases", items: FOOD_PHRASES, tags: ["conversation-food"] },
		{
			name: "small talk phrases",
			items: SMALLTALK_PHRASES,
			tags: ["conversation-smalltalk"],
		},
	];

	for (const category of phraseCategories) {
		const items: VocabWithTags[] = category.items.map((phrase) => ({
			vocab: {
				greekText: phrase.text,
				englishTranslation: phrase.english,
				wordType: "phrase" as const,
			},
			tags: category.tags,
		}));
		await processCategory(
			category.name,
			items,
			tagMap,
			vocabTagLinks,
			tagDisplayOrderById,
			allNounDetails,
		);
	}

	// ============================================
	// TIME-TELLING (with metadata)
	// ============================================
	const timeTellingItems: VocabWithTags[] = TIME_TELLING.map((phrase) => ({
		vocab: {
			greekText: phrase.text,
			englishTranslation: phrase.english,
			wordType: "phrase" as const,
			metadata: phrase.metadata,
		},
		tags: ["time-telling"],
	}));
	await processCategory(
		"time-telling phrases",
		timeTellingItems,
		tagMap,
		vocabTagLinks,
		tagDisplayOrderById,
		allNounDetails,
	);

	// ============================================
	// DAYS & MONTHS
	// ============================================
	const dayItems: VocabWithTags[] = DAYS_OF_WEEK.map((day) => ({
		vocab: {
			greekText: day.text,
			englishTranslation: day.english,
			wordType: "noun" as const,
		},
		tags: ["days-of-week"],
	}));
	await processCategory(
		"days of week",
		dayItems,
		tagMap,
		vocabTagLinks,
		tagDisplayOrderById,
		allNounDetails,
	);

	const monthItems: VocabWithTags[] = MONTHS.map((month) => ({
		vocab: {
			greekText: month.text,
			englishTranslation: month.english,
			wordType: "noun" as const,
		},
		tags: ["months"],
	}));
	await processCategory(
		"months",
		monthItems,
		tagMap,
		vocabTagLinks,
		tagDisplayOrderById,
		allNounDetails,
	);

	// ============================================
	// TRANSPORT VERBS/ACTIONS
	// ============================================
	const transportItems: VocabWithTags[] = TRANSPORT_VERBS.map((action) => {
		const wordType = action.english.startsWith("I ") ? "verb" : "phrase";
		return {
			vocab: {
				greekText: action.text,
				englishTranslation: action.english,
				wordType: wordType as "verb" | "phrase",
			},
			tags: ["transport-action"],
		};
	});
	await processCategory(
		"transport actions",
		transportItems,
		tagMap,
		vocabTagLinks,
		tagDisplayOrderById,
		allNounDetails,
	);

	// ============================================
	// ADVERBS
	// ============================================
	const frequencyItems: VocabWithTags[] = FREQUENCY_ADVERBS.map((adverb) => ({
		vocab: {
			greekText: adverb.lemma,
			englishTranslation: adverb.english,
			wordType: "adverb" as const,
		},
		tags: ["frequency"],
	}));
	await processCategory(
		"frequency adverbs",
		frequencyItems,
		tagMap,
		vocabTagLinks,
		tagDisplayOrderById,
		allNounDetails,
	);

	const positionItems: VocabWithTags[] = POSITION_ADVERBS.map((adverb) => ({
		vocab: {
			greekText: adverb.lemma,
			englishTranslation: adverb.english,
			wordType: "adverb" as const,
		},
		tags: ["position"],
	}));
	await processCategory(
		"position adverbs",
		positionItems,
		tagMap,
		vocabTagLinks,
		tagDisplayOrderById,
		allNounDetails,
	);

	// ============================================
	// LIKES CONSTRUCTION
	// ============================================
	const likesSingularItems: VocabWithTags[] = LIKES_CONSTRUCTION.singular.map((like) => ({
		vocab: {
			greekText: like.text,
			englishTranslation: like.english,
			wordType: "phrase" as const,
		},
		tags: ["likes-singular"],
	}));
	await processCategory(
		"likes construction (singular)",
		likesSingularItems,
		tagMap,
		vocabTagLinks,
		tagDisplayOrderById,
		allNounDetails,
	);

	const likesPluralItems: VocabWithTags[] = LIKES_CONSTRUCTION.plural.map((like) => ({
		vocab: {
			greekText: like.text,
			englishTranslation: like.english,
			wordType: "phrase" as const,
		},
		tags: ["likes-plural"],
	}));
	await processCategory(
		"likes construction (plural)",
		likesPluralItems,
		tagMap,
		vocabTagLinks,
		tagDisplayOrderById,
		allNounDetails,
	);

	// ============================================
	// COLORS & ADJECTIVES
	// ============================================
	const colorItems: VocabWithTags[] = COLORS.map((color) => ({
		vocab: {
			greekText: color.lemma,
			englishTranslation: color.english,
			wordType: "adjective" as const,
		},
		tags: ["color"],
	}));
	await processCategory(
		"colors",
		colorItems,
		tagMap,
		vocabTagLinks,
		tagDisplayOrderById,
		allNounDetails,
	);

	const adjectiveItems: VocabWithTags[] = ADJECTIVES.map((adj) => ({
		vocab: {
			greekText: adj.lemma,
			englishTranslation: adj.english,
			wordType: "adjective" as const,
		},
		tags: [], // No content tags for standalone adjectives
	}));
	await processCategory(
		"adjectives",
		adjectiveItems,
		tagMap,
		vocabTagLinks,
		tagDisplayOrderById,
		allNounDetails,
	);

	// ============================================
	// PRONOUNS
	// ============================================
	const indefinitePronounItems: VocabWithTags[] = INDEFINITE_PRONOUNS.map((pronoun) => ({
		vocab: {
			greekText: pronoun.lemma,
			englishTranslation: pronoun.english,
			wordType: "pronoun" as const,
		},
		tags: [],
	}));
	await processCategory(
		"indefinite pronouns",
		indefinitePronounItems,
		tagMap,
		vocabTagLinks,
		tagDisplayOrderById,
		allNounDetails,
	);

	const genderedPronounItems: VocabWithTags[] = GENDERED_PRONOUNS.map((pronoun) => ({
		vocab: {
			greekText: pronoun.lemma,
			englishTranslation: pronoun.english,
			wordType: "pronoun" as const,
		},
		tags: [],
	}));
	await processCategory(
		"gendered pronouns",
		genderedPronounItems,
		tagMap,
		vocabTagLinks,
		tagDisplayOrderById,
		allNounDetails,
	);

	// ============================================
	// INDEFINITE ADVERBS
	// ============================================
	const indefiniteAdverbItems: VocabWithTags[] = INDEFINITE_ADVERBS.map((adverb) => ({
		vocab: {
			greekText: adverb.lemma,
			englishTranslation: adverb.english,
			wordType: "adverb" as const,
		},
		tags: [],
	}));
	await processCategory(
		"indefinite adverbs",
		indefiniteAdverbItems,
		tagMap,
		vocabTagLinks,
		tagDisplayOrderById,
		allNounDetails,
	);

	// ============================================
	// NUMBERS
	// ============================================
	const numberItems: VocabWithTags[] = NUMBERS.map((num) => ({
		vocab: {
			greekText: num.lemma,
			englishTranslation: String(num.value),
			wordType: "noun" as const,
			metadata: { numericValue: num.value },
		},
		tags: ["number"],
	}));
	await processCategory(
		"numbers",
		numberItems,
		tagMap,
		vocabTagLinks,
		tagDisplayOrderById,
		allNounDetails,
	);

	// ============================================
	// DAILY PATTERNS
	// ============================================
	const patternTagMap: Record<string, string> = {
		coffee: "daily-coffee",
		house: "daily-house",
		time: "daily-time",
		family: "daily-family",
	};

	const patternItems: VocabWithTags[] = [];
	for (const [category, patterns] of Object.entries(DAILY_PATTERNS)) {
		if (!patterns) continue;
		for (const pattern of patterns) {
			const itemTags: string[] = [];
			const tagSlug = patternTagMap[category];
			if (tagSlug) itemTags.push(tagSlug);

			patternItems.push({
				vocab: {
					greekText: pattern.greek,
					englishTranslation: pattern.english,
					wordType: "phrase",
					metadata: {
						explanation: pattern.explanation,
						whyThisCase: pattern.whyThisCase,
					},
				},
				tags: itemTags,
			});
		}
	}
	await processCategory(
		"daily patterns",
		patternItems,
		tagMap,
		vocabTagLinks,
		tagDisplayOrderById,
		allNounDetails,
	);

	// ============================================
	// LESSONS (no word-type tags)
	// ============================================
	console.log("\nSeeding lessons...");
	for (const [date, lesson] of Object.entries(LESSONS)) {
		const lessonTag = `lesson-${date}`;
		console.log(`  Lesson ${date}: ${lesson.meta.topic}`);

		const lessonItems: VocabWithTags[] = [];

		// Lesson verbs
		for (const verb of lesson.verbs) {
			lessonItems.push({
				vocab: {
					greekText: verb.lemma,
					englishTranslation: verb.english,
					wordType: "verb",
					metadata: { lessonDate: date },
				},
				tags: [lessonTag],
				verbDetail: {
					conjugationFamily: verb.conjugationFamily,
				},
			});
		}

		// Lesson nouns
		for (const noun of lesson.nouns) {
			const displayText = formatNounWithArticle(noun.lemma, noun.gender);
			lessonItems.push({
				vocab: {
					greekText: displayText,
					englishTranslation: noun.english,
					wordType: "noun",
					metadata: { lessonDate: date },
				},
				tags: [lessonTag],
				nounDetail: {
					gender: noun.gender,
					declensionPattern:
						"declensionPattern" in noun && isDeclensionPattern(noun.declensionPattern)
							? noun.declensionPattern
							: null,
				},
			});
		}

		// Lesson adverbs
		for (const adverb of lesson.adverbs) {
			lessonItems.push({
				vocab: {
					greekText: adverb.lemma,
					englishTranslation: adverb.english,
					wordType: "adverb",
					metadata: { lessonDate: date },
				},
				tags: [lessonTag],
			});
		}

		// Lesson adjectives
		if ("adjectives" in lesson) {
			for (const adj of lesson.adjectives) {
				lessonItems.push({
					vocab: {
						greekText: adj.lemma,
						englishTranslation: adj.english,
						wordType: "adjective",
						metadata: { lessonDate: date },
					},
					tags: [lessonTag],
				});
			}
		}

		// Lesson phrases
		for (const phrase of lesson.phrases) {
			lessonItems.push({
				vocab: {
					greekText: phrase.text,
					englishTranslation: phrase.english,
					wordType: "phrase",
					metadata: { ...phrase.metadata, lessonDate: date },
				},
				tags: [lessonTag],
			});
		}

		const lessonVerbDetails = await processCategory(
			`lesson ${date}`,
			lessonItems,
			tagMap,
			vocabTagLinks,
			tagDisplayOrderById,
			allNounDetails,
		);
		allVerbDetails.push(...lessonVerbDetails);
	}

	// ============================================
	// BATCH INSERT NOUN DETAILS
	// ============================================
	console.log(`\nInserting ${allNounDetails.length} noun details...`);
	await batchInsertNounDetails(allNounDetails);

	// ============================================
	// BATCH INSERT VERB DETAILS
	// ============================================
	console.log(`\nInserting ${allVerbDetails.length} verb details...`);
	await batchInsertVerbDetails(allVerbDetails);

	// ============================================
	// BATCH INSERT TAG LINKS
	// ============================================
	console.log("Creating vocabulary-tag associations...");
	if (vocabTagLinks.length > 0) {
		const uniqueLinks = new Map<string, NewVocabularyTag>();
		for (const link of vocabTagLinks) {
			const key = `${link.vocabularyId}-${link.tagId}`;
			if (!uniqueLinks.has(key)) {
				uniqueLinks.set(key, link);
			}
		}

		const linksArray = Array.from(uniqueLinks.values());

		for (let i = 0; i < linksArray.length; i += BATCH_SIZE) {
			const batch = linksArray.slice(i, i + BATCH_SIZE);
			await db
				.insert(vocabularyTags)
				.values(batch)
				.onConflictDoUpdate({
					target: [vocabularyTags.vocabularyId, vocabularyTags.tagId],
					set: { displayOrder: sql`excluded.display_order` },
				});
		}
		console.log(`Processed ${linksArray.length} vocabulary-tag associations.`);
	}

	console.log("\nSeeding complete.");
	process.exit(0);
}

seed().catch((err) => {
	console.error("Seeding failed:", err);
	process.exit(1);
});
