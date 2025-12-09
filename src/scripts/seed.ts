import { inArray, sql } from "drizzle-orm";
import { db } from "../db";
import { tags, verbDetails, vocabulary, vocabularyTags } from "../db/schema";
import type { NewVocabulary, NewVocabularyTag } from "../db/types";
import { formatNounWithArticle } from "../lib/greek-grammar";
import {
	ADJECTIVES,
	ARRIVING_PHRASES,
	COLORS,
	COMMANDS,
	COMMON_RESPONSES,
	DAILY_PATTERNS,
	DAYS_OF_WEEK,
	DISCOURSE_FILLERS,
	DISCOURSE_MARKERS,
	ESSENTIAL_PHRASES,
	FOOD_PHRASES,
	FREQUENCY_ADVERBS,
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
	SYSTEM_TAGS,
	TIME_PHRASES,
	TIME_TELLING,
	TRANSPORT_VERBS,
	VERBS,
} from "./seed-data";

const BATCH_SIZE = 100;

type VerbDetailRecord = {
	vocabId: number;
	infinitive: string;
	conjugationFamily: string;
};

type VocabWithTags = {
	vocab: NewVocabulary;
	tags: string[];
	verbDetail?: { infinitive: string; conjugationFamily: string };
};

/**
 * Batch insert vocabulary items and return a map of greekText -> id
 * Handles conflicts by fetching existing IDs in batch
 */
async function batchInsertVocab(
	items: NewVocabulary[],
): Promise<Map<string, number>> {
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
	const missingTexts = items
		.map((item) => item.greekText)
		.filter((text) => !resultMap.has(text));

	if (missingTexts.length > 0) {
		for (let i = 0; i < missingTexts.length; i += BATCH_SIZE) {
			const batch = missingTexts.slice(i, i + BATCH_SIZE);
			const existing = await db
				.select({ id: vocabulary.id, greekText: vocabulary.greekText })
				.from(vocabulary)
				.where(inArray(vocabulary.greekText, batch));

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
		await db
			.insert(verbDetails)
			.values(batch)
			.onConflictDoNothing({ target: verbDetails.vocabId });
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
				vocabTagLinks.push({ vocabularyId: vocabId, tagId });
			}
		}

		// Collect verb details for batch insert
		if (item.verbDetail) {
			verbDetailsToInsert.push({
				vocabId,
				infinitive: item.verbDetail.infinitive,
				conjugationFamily: item.verbDetail.conjugationFamily,
			});
		}
	}

	return verbDetailsToInsert;
}

async function seed() {
	console.log("Seeding database (additive mode with batching)...\n");

	// Upsert system tags
	console.log("Upserting system tags...");
	const tagValues = Object.values(SYSTEM_TAGS).map((tag) => ({
		slug: tag.slug,
		name: tag.name,
		isSystem: true,
	}));

	const insertedTags = await db
		.insert(tags)
		.values(tagValues)
		.onConflictDoUpdate({
			target: tags.slug,
			set: { name: sql`excluded.name` },
		})
		.returning();
	console.log(`Upserted ${insertedTags.length} system tags.\n`);

	const tagMap = new Map(insertedTags.map((t) => [t.slug, t.id]));
	const vocabTagLinks: NewVocabularyTag[] = [];
	const allVerbDetails: VerbDetailRecord[] = [];

	// ============================================
	// NOUNS
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
			const itemTags = ["noun"];
			if (themeTagMap[theme]) itemTags.push(themeTagMap[theme]);

			nounItems.push({
				vocab: {
					greekText: displayText,
					englishTranslation: noun.english,
					wordType: "noun",
					gender: noun.gender,
					status: "processed",
					metadata: "metadata" in noun ? noun.metadata : undefined,
				},
				tags: itemTags,
			});
		}
	}
	allVerbDetails.push(
		...(await processCategory("nouns", nounItems, tagMap, vocabTagLinks)),
	);

	// ============================================
	// VERBS
	// ============================================
	const verbItems: VocabWithTags[] = VERBS.map((verb) => ({
		vocab: {
			greekText: verb.lemma,
			englishTranslation: verb.english,
			wordType: "verb" as const,
			status: "processed" as const,
		},
		tags: ["verb"],
		verbDetail: {
			infinitive: verb.lemma,
			conjugationFamily: verb.conjugationFamily,
		},
	}));
	allVerbDetails.push(
		...(await processCategory("verbs", verbItems, tagMap, vocabTagLinks)),
	);

	// ============================================
	// PHRASES (collected in bulk)
	// ============================================
	const phraseCategories: Array<{
		name: string;
		items: Array<{ text: string; english: string; metadata?: unknown }>;
		tags: string[];
	}> = [
		{ name: "essential phrases", items: ESSENTIAL_PHRASES, tags: ["essential", "phrase"] },
		{ name: "survival phrases", items: SURVIVAL_PHRASES, tags: ["survival", "phrase"] },
		{ name: "request phrases", items: REQUEST_PHRASES, tags: ["request", "phrase"] },
		{ name: "discourse fillers", items: DISCOURSE_FILLERS, tags: ["discourse-filler", "expression", "phrase"] },
		{ name: "social phrases", items: SOCIAL_PHRASES, tags: ["social-phrase", "expression", "phrase"] },
		{ name: "question words", items: QUESTION_WORDS, tags: ["question", "phrase"] },
		{ name: "commands", items: COMMANDS, tags: ["command", "phrase"] },
		{ name: "time phrases", items: TIME_PHRASES, tags: ["time-expression"] },
		{ name: "name construction", items: NAME_CONSTRUCTION, tags: ["name-construction", "phrase"] },
		{ name: "discourse markers", items: DISCOURSE_MARKERS, tags: ["discourse-markers", "phrase"] },
		{ name: "common responses", items: COMMON_RESPONSES, tags: ["responses", "phrase"] },
		{ name: "opinion phrases", items: OPINION_PHRASES, tags: ["opinions", "phrase"] },
		{ name: "arriving phrases", items: ARRIVING_PHRASES, tags: ["conversation-arriving", "phrase"] },
		{ name: "food phrases", items: FOOD_PHRASES, tags: ["conversation-food", "phrase"] },
		{ name: "small talk phrases", items: SMALLTALK_PHRASES, tags: ["conversation-smalltalk", "phrase"] },
	];

	for (const category of phraseCategories) {
		const items: VocabWithTags[] = category.items.map((phrase) => ({
			vocab: {
				greekText: phrase.text,
				englishTranslation: phrase.english,
				wordType: "phrase" as const,
				status: "processed" as const,
			},
			tags: category.tags,
		}));
		await processCategory(category.name, items, tagMap, vocabTagLinks);
	}

	// ============================================
	// TIME-TELLING (with metadata)
	// ============================================
	const timeTellingItems: VocabWithTags[] = TIME_TELLING.map((phrase) => ({
		vocab: {
			greekText: phrase.text,
			englishTranslation: phrase.english,
			wordType: "phrase" as const,
			status: "processed" as const,
			metadata: phrase.metadata,
		},
		tags: ["time-telling", "phrase"],
	}));
	await processCategory("time-telling phrases", timeTellingItems, tagMap, vocabTagLinks);

	// ============================================
	// DAYS & MONTHS
	// ============================================
	const dayItems: VocabWithTags[] = DAYS_OF_WEEK.map((day) => ({
		vocab: {
			greekText: day.text,
			englishTranslation: day.english,
			wordType: "noun" as const,
			status: "processed" as const,
		},
		tags: ["days-of-week", "noun"],
	}));
	await processCategory("days of week", dayItems, tagMap, vocabTagLinks);

	const monthItems: VocabWithTags[] = MONTHS.map((month) => ({
		vocab: {
			greekText: month.text,
			englishTranslation: month.english,
			wordType: "noun" as const,
			status: "processed" as const,
		},
		tags: ["months", "noun"],
	}));
	await processCategory("months", monthItems, tagMap, vocabTagLinks);

	// ============================================
	// TRANSPORT VERBS/ACTIONS
	// ============================================
	const transportItems: VocabWithTags[] = TRANSPORT_VERBS.map((action) => {
		const wordType = action.english.startsWith("I ") ? "verb" : "phrase";
		const itemTags = ["transport-action"];
		if (wordType === "verb") itemTags.push("verb");
		return {
			vocab: {
				greekText: action.text,
				englishTranslation: action.english,
				wordType: wordType as "verb" | "phrase",
				status: "processed" as const,
			},
			tags: itemTags,
		};
	});
	await processCategory("transport actions", transportItems, tagMap, vocabTagLinks);

	// ============================================
	// ADVERBS
	// ============================================
	const frequencyItems: VocabWithTags[] = FREQUENCY_ADVERBS.map((adverb) => ({
		vocab: {
			greekText: adverb.lemma,
			englishTranslation: adverb.english,
			wordType: "adverb" as const,
			status: "processed" as const,
		},
		tags: ["frequency", "adverb"],
	}));
	await processCategory("frequency adverbs", frequencyItems, tagMap, vocabTagLinks);

	const positionItems: VocabWithTags[] = POSITION_ADVERBS.map((adverb) => ({
		vocab: {
			greekText: adverb.lemma,
			englishTranslation: adverb.english,
			wordType: "adverb" as const,
			status: "processed" as const,
		},
		tags: ["position", "adverb"],
	}));
	await processCategory("position adverbs", positionItems, tagMap, vocabTagLinks);

	// ============================================
	// LIKES CONSTRUCTION
	// ============================================
	const likesSingularItems: VocabWithTags[] = LIKES_CONSTRUCTION.singular.map((like) => ({
		vocab: {
			greekText: like.text,
			englishTranslation: like.english,
			wordType: "phrase" as const,
			status: "processed" as const,
		},
		tags: ["likes-singular", "phrase"],
	}));
	await processCategory("likes construction (singular)", likesSingularItems, tagMap, vocabTagLinks);

	const likesPluralItems: VocabWithTags[] = LIKES_CONSTRUCTION.plural.map((like) => ({
		vocab: {
			greekText: like.text,
			englishTranslation: like.english,
			wordType: "phrase" as const,
			status: "processed" as const,
		},
		tags: ["likes-plural", "phrase"],
	}));
	await processCategory("likes construction (plural)", likesPluralItems, tagMap, vocabTagLinks);

	// ============================================
	// COLORS & ADJECTIVES
	// ============================================
	const colorItems: VocabWithTags[] = COLORS.map((color) => ({
		vocab: {
			greekText: color.lemma,
			englishTranslation: color.english,
			wordType: "adjective" as const,
			status: "processed" as const,
		},
		tags: ["color", "adjective"],
	}));
	await processCategory("colors", colorItems, tagMap, vocabTagLinks);

	const adjectiveItems: VocabWithTags[] = ADJECTIVES.map((adj) => ({
		vocab: {
			greekText: adj.lemma,
			englishTranslation: adj.english,
			wordType: "adjective" as const,
			status: "processed" as const,
		},
		tags: ["adjective"],
	}));
	await processCategory("adjectives", adjectiveItems, tagMap, vocabTagLinks);

	// ============================================
	// NUMBERS
	// ============================================
	const numberItems: VocabWithTags[] = NUMBERS.map((num) => ({
		vocab: {
			greekText: num.lemma,
			englishTranslation: String(num.value),
			wordType: "noun" as const,
			status: "processed" as const,
			metadata: { numericValue: num.value },
		},
		tags: ["number"],
	}));
	await processCategory("numbers", numberItems, tagMap, vocabTagLinks);

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
					status: "processed",
					metadata: {
						explanation: pattern.explanation,
						whyThisCase: pattern.whyThisCase,
					},
				},
				tags: itemTags,
			});
		}
	}
	await processCategory("daily patterns", patternItems, tagMap, vocabTagLinks);

	// ============================================
	// LESSONS
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
					status: "processed",
					metadata: { lessonDate: date },
				},
				tags: ["verb", lessonTag],
				verbDetail: {
					infinitive: verb.lemma,
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
					gender: noun.gender,
					status: "processed",
					metadata: { lessonDate: date },
				},
				tags: ["noun", lessonTag],
			});
		}

		// Lesson adverbs
		for (const adverb of lesson.adverbs) {
			lessonItems.push({
				vocab: {
					greekText: adverb.lemma,
					englishTranslation: adverb.english,
					wordType: "adverb",
					status: "processed",
					metadata: { lessonDate: date },
				},
				tags: ["adverb", lessonTag],
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
						status: "processed",
						metadata: { lessonDate: date },
					},
					tags: ["adjective", lessonTag],
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
					status: "processed",
					metadata: { ...phrase.metadata, lessonDate: date },
				},
				tags: ["phrase", lessonTag],
			});
		}

		const lessonVerbDetails = await processCategory(
			`lesson ${date}`,
			lessonItems,
			tagMap,
			vocabTagLinks,
		);
		allVerbDetails.push(...lessonVerbDetails);
	}

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
			await db.insert(vocabularyTags).values(batch).onConflictDoNothing();
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
