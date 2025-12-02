import { db } from "../db";
import type { NewVocabulary, NewVocabularyTag } from "../db/schema";
import { formatNounWithArticle } from "../lib/greek-grammar";
import {
	ADJECTIVES,
	COLORS,
	COMMANDS,
	DAILY_PATTERNS,
	FREQUENCY_ADVERBS,
	LESSONS,
	LIKES_CONSTRUCTION,
	NOUNS,
	NUMBERS,
	POSITION_ADVERBS,
	SYSTEM_TAGS,
	TIME_PHRASES,
	TRANSPORT_VERBS,
	USEFUL_EXPRESSIONS,
	VERBS,
} from "./seed-data";

async function seed() {
	console.log("Seeding database (additive mode)...");

	await db.transaction().execute(async (trx) => {
		// Upsert system tags (update name if slug exists, insert if new)
		console.log("Upserting system tags...");
		const tagValues = Object.values(SYSTEM_TAGS).map((tag) => ({
			slug: tag.slug,
			name: tag.name,
			is_system: true,
		}));

		const insertedTags = await trx
			.insertInto("tags")
			.values(tagValues)
			.onConflict((oc) =>
				oc.column("slug").doUpdateSet({
					name: (eb) => eb.ref("excluded.name"),
				}),
			)
			.returningAll()
			.execute();
		console.log(`Upserted ${insertedTags.length} system tags.`);

		const tagMap = new Map(insertedTags.map((t) => [t.slug, t.id]));

		// Track vocabulary IDs for tag linking
		const vocabTagLinks: NewVocabularyTag[] = [];
		let insertedCount = 0;
		let skippedCount = 0;

		// Insert vocabulary with conflict handling (skip if exists)
		const insertVocab = async (vocab: NewVocabulary): Promise<number> => {
			const [result] = await trx
				.insertInto("vocabulary")
				.values(vocab)
				.onConflict((oc) => oc.column("greek_text").doNothing())
				.returning(["id"])
				.execute();

			if (result) {
				insertedCount++;
				return result.id;
			}

			// Already existed - fetch existing ID
			skippedCount++;
			const existing = await trx
				.selectFrom("vocabulary")
				.select("id")
				.where("greek_text", "=", vocab.greek_text)
				.executeTakeFirst();
			return existing!.id;
		};

		const linkTag = (vocabId: number, tagSlug: string) => {
			const tagId = tagMap.get(tagSlug);
			if (tagId) {
				vocabTagLinks.push({ vocabulary_id: vocabId, tag_id: tagId });
			}
		};

		// Seed nouns (with article derived from gender)
		console.log("Seeding nouns...");
		for (const [theme, nouns] of Object.entries(NOUNS)) {
			for (const noun of nouns) {
				const displayText = formatNounWithArticle(noun.lemma, noun.gender);
				const vocabId = await insertVocab({
					greek_text: displayText,
					english_translation: noun.english,
					word_type: "noun",
					gender: noun.gender,
					status: "processed",
					metadata: noun.metadata,
				});

				// Link to theme tag
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
				if (themeTagMap[theme]) {
					linkTag(vocabId, themeTagMap[theme]);
				}
				linkTag(vocabId, "noun");
			}
		}

		// Seed verbs
		console.log("Seeding verbs...");
		for (const verb of VERBS) {
			const vocabId = await insertVocab({
				greek_text: verb.lemma,
				english_translation: verb.english,
				word_type: "verb",
				status: "processed",
			});
			linkTag(vocabId, "verb");

			await trx
				.insertInto("verb_details")
				.values({
					vocab_id: vocabId,
					infinitive: verb.lemma,
					conjugation_family: verb.conjugationFamily,
				})
				.onConflict((oc) => oc.column("vocab_id").doNothing())
				.execute();
		}

		// Seed transport verbs/actions
		console.log("Seeding transport actions...");
		for (const action of TRANSPORT_VERBS) {
			const wordType = action.english.startsWith("I ") ? "verb" : "phrase";
			const vocabId = await insertVocab({
				greek_text: action.text,
				english_translation: action.english,
				word_type: wordType,
				status: "processed",
			});
			linkTag(vocabId, "transport-action");
			if (wordType === "verb") {
				linkTag(vocabId, "verb");
			}
		}

		// Seed frequency adverbs
		console.log("Seeding frequency adverbs...");
		for (const adverb of FREQUENCY_ADVERBS) {
			const vocabId = await insertVocab({
				greek_text: adverb.lemma,
				english_translation: adverb.english,
				word_type: "adverb",
				status: "processed",
			});
			linkTag(vocabId, "frequency");
			linkTag(vocabId, "adverb");
		}

		// Seed position adverbs
		console.log("Seeding position adverbs...");
		for (const adverb of POSITION_ADVERBS) {
			const vocabId = await insertVocab({
				greek_text: adverb.lemma,
				english_translation: adverb.english,
				word_type: "adverb",
				status: "processed",
			});
			linkTag(vocabId, "position");
			linkTag(vocabId, "adverb");
		}

		// Seed likes construction
		console.log("Seeding likes construction...");
		for (const like of LIKES_CONSTRUCTION.singular) {
			const vocabId = await insertVocab({
				greek_text: like.text,
				english_translation: like.english,
				word_type: "phrase",
				status: "processed",
			});
			linkTag(vocabId, "likes-singular");
			linkTag(vocabId, "phrase");
		}
		for (const like of LIKES_CONSTRUCTION.plural) {
			const vocabId = await insertVocab({
				greek_text: like.text,
				english_translation: like.english,
				word_type: "phrase",
				status: "processed",
			});
			linkTag(vocabId, "likes-plural");
			linkTag(vocabId, "phrase");
		}

		// Seed useful expressions
		console.log("Seeding useful expressions...");
		for (const expr of USEFUL_EXPRESSIONS) {
			const vocabId = await insertVocab({
				greek_text: expr.text,
				english_translation: expr.english,
				word_type: "phrase",
				status: "processed",
			});
			// Tag question words separately
			if (expr.english.includes("?")) {
				linkTag(vocabId, "question");
			} else {
				linkTag(vocabId, "expression");
			}
			linkTag(vocabId, "phrase");
		}

		// Seed commands
		console.log("Seeding commands...");
		for (const cmd of COMMANDS) {
			const vocabId = await insertVocab({
				greek_text: cmd.text,
				english_translation: cmd.english,
				word_type: "phrase",
				status: "processed",
			});
			linkTag(vocabId, "command");
			linkTag(vocabId, "phrase");
		}

		// Seed time phrases
		console.log("Seeding time phrases...");
		for (const phrase of TIME_PHRASES) {
			const vocabId = await insertVocab({
				greek_text: phrase.text,
				english_translation: phrase.english,
				word_type: "phrase",
				status: "processed",
			});
			linkTag(vocabId, "time-expression");
		}

		// Seed colors
		console.log("Seeding colors...");
		for (const color of COLORS) {
			const vocabId = await insertVocab({
				greek_text: color.lemma,
				english_translation: color.english,
				word_type: "adjective",
				status: "processed",
			});
			linkTag(vocabId, "color");
			linkTag(vocabId, "adjective");
		}

		// Seed adjectives
		console.log("Seeding adjectives...");
		for (const adj of ADJECTIVES) {
			const vocabId = await insertVocab({
				greek_text: adj.lemma,
				english_translation: adj.english,
				word_type: "adjective",
				status: "processed",
			});
			linkTag(vocabId, "adjective");
		}

		// Seed numbers
		console.log("Seeding numbers...");
		for (const num of NUMBERS) {
			const vocabId = await insertVocab({
				greek_text: num.lemma,
				english_translation: String(num.value),
				word_type: "noun",
				status: "processed",
				metadata: { numericValue: num.value },
			});
			linkTag(vocabId, "number");
		}

		// Seed daily patterns (grammar examples)
		console.log("Seeding daily patterns...");
		const patternTagMap: Record<string, string> = {
			coffee: "daily-coffee",
			house: "daily-house",
			time: "daily-time",
			family: "daily-family",
		};

		for (const [category, patterns] of Object.entries(DAILY_PATTERNS)) {
			for (const pattern of patterns) {
				const vocabId = await insertVocab({
					greek_text: pattern.greek,
					english_translation: pattern.english,
					word_type: "phrase",
					status: "processed",
					metadata: {
						explanation: pattern.explanation,
						whyThisCase: pattern.whyThisCase,
					},
				});
				linkTag(vocabId, patternTagMap[category]);
			}
		}

		// Seed lessons
		console.log("Seeding lessons...");
		for (const [date, lesson] of Object.entries(LESSONS)) {
			const lessonTag = `lesson-${date}`;
			console.log(`  Lesson ${date}: ${lesson.meta.topic}`);

			// Seed lesson verbs
			for (const verb of lesson.verbs) {
				const vocabId = await insertVocab({
					greek_text: verb.lemma,
					english_translation: verb.english,
					word_type: "verb",
					status: "processed",
					metadata: { lessonDate: date },
				});
				linkTag(vocabId, "verb");
				linkTag(vocabId, lessonTag);

				await trx
					.insertInto("verb_details")
					.values({
						vocab_id: vocabId,
						infinitive: verb.lemma,
						conjugation_family: verb.conjugationFamily,
					})
					.onConflict((oc) => oc.column("vocab_id").doNothing())
					.execute();
			}

			// Seed lesson nouns
			for (const noun of lesson.nouns) {
				const displayText = formatNounWithArticle(noun.lemma, noun.gender);
				const vocabId = await insertVocab({
					greek_text: displayText,
					english_translation: noun.english,
					word_type: "noun",
					gender: noun.gender,
					status: "processed",
					metadata: { lessonDate: date },
				});
				linkTag(vocabId, "noun");
				linkTag(vocabId, lessonTag);
			}

			// Seed lesson adverbs
			for (const adverb of lesson.adverbs) {
				const vocabId = await insertVocab({
					greek_text: adverb.lemma,
					english_translation: adverb.english,
					word_type: "adverb",
					status: "processed",
					metadata: { lessonDate: date },
				});
				linkTag(vocabId, "adverb");
				linkTag(vocabId, lessonTag);
			}

			// Seed lesson adjectives
			if ("adjectives" in lesson) {
				for (const adj of lesson.adjectives) {
					const vocabId = await insertVocab({
						greek_text: adj.lemma,
						english_translation: adj.english,
						word_type: "adjective",
						status: "processed",
						metadata: { lessonDate: date },
					});
					linkTag(vocabId, "adjective");
					linkTag(vocabId, lessonTag);
				}
			}

			// Seed lesson phrases
			for (const phrase of lesson.phrases) {
				const vocabId = await insertVocab({
					greek_text: phrase.text,
					english_translation: phrase.english,
					word_type: "phrase",
					status: "processed",
					metadata: { ...phrase.metadata, lessonDate: date },
				});
				linkTag(vocabId, "phrase");
				linkTag(vocabId, lessonTag);
			}
		}

		// Insert vocabulary-tag links (with conflict handling)
		console.log("Creating vocabulary-tag associations...");
		if (vocabTagLinks.length > 0) {
			const uniqueLinks = new Map<string, NewVocabularyTag>();
			for (const link of vocabTagLinks) {
				const key = `${link.vocabulary_id}-${link.tag_id}`;
				if (!uniqueLinks.has(key)) {
					uniqueLinks.set(key, link);
				}
			}

			const linksArray = Array.from(uniqueLinks.values());

			// Use onConflict to skip existing links
			await trx
				.insertInto("vocabulary_tags")
				.values(linksArray)
				.onConflict((oc) =>
					oc.columns(["vocabulary_id", "tag_id"]).doNothing(),
				)
				.execute();
			console.log(`Processed ${linksArray.length} vocabulary-tag associations.`);
		}

		console.log(
			`Vocabulary: ${insertedCount} inserted, ${skippedCount} skipped (already exist)`,
		);
	});

	console.log("Seeding complete.");
	process.exit(0);
}

seed().catch((err) => {
	console.error("Seeding failed:", err);
	process.exit(1);
});
