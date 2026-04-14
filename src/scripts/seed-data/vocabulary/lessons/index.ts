// Aggregate all lesson vocabulary exports
// Add new lesson imports here as they're created

import { formatNounWithArticle } from "../../../../lib/greek-grammar";
import {
	nounDetailFromSeed,
	pickAdjectiveDetails,
	pickAdjectiveNominalForms,
	pickNounNominalForms,
	type VocabWithTags,
} from "../../../seed-pipeline";
import { enrichAdjective } from "../adjective-seed-enrichment";
import { enrichNoun } from "../noun-seed-enrichment";
// 2023 lessons
import { LESSON_2023_10_30 } from "./2023-10-30-basic-nouns";
import { LESSON_2023_11_08 } from "./2023-11-08-articles-places";
import { LESSON_2023_12_09 } from "./2023-12-09-past-intro";
import { LESSON_2023_12_31 } from "./2023-12-31-advanced-vocab";
// 2024 lessons
import { LESSON_2024_03_25 } from "./2024-03-25-intro-weather";
import { LESSON_2024_04_04 } from "./2024-04-04-abstract-vocab";
import { LESSON_2024_04_15 } from "./2024-04-15-pets-actions";
import { LESSON_2024_04_22 } from "./2024-04-22-questions-comparisons";
import { LESSON_2024_04_29 } from "./2024-04-29-frequency-adverbs";
import { LESSON_2024_05_06 } from "./2024-05-06-daily-activities";
import { LESSON_2024_06_05 } from "./2024-06-05-summer-vacation";
import { LESSON_2024_06_10 } from "./2024-06-10-quantity-pronouns";
import { LESSON_2024_06_17 } from "./2024-06-17-giving-kissing";
import { LESSON_2024_06_26 } from "./2024-06-26-shopping-sleeping";
import { LESSON_2024_07_01 } from "./2024-07-01-daily-verbs";
import { LESSON_2024_07_08 } from "./2024-07-08-likes-dislikes";
import { LESSON_2024_07_15 } from "./2024-07-15-directions-positions";
import { LESSON_2024_07_29 } from "./2024-07-29-deponent-verbs";
import { LESSON_2024_08_05 } from "./2024-08-05-together-noone";
import { LESSON_2024_08_12 } from "./2024-08-12-forgetting-slang";
import { LESSON_2024_09_10 } from "./2024-09-10-living-abroad";
import { LESSON_2024_10_15 } from "./2024-10-15-work-vocab";
import { LESSON_2024_11_11 } from "./2024-11-11-time-schedules";
import { LESSON_2024_11_28 } from "./2024-11-28-masculine-os";
import { LESSON_2024_12_02 } from "./2024-12-02-family-routines";
import { LESSON_2024_12_09 } from "./2024-12-09-countries-languages";
import { LESSON_2024_12_16 } from "./2024-12-16-comparatives-housing";
import { LESSON_2024_12_30 } from "./2024-12-30-entertainment-events";

export {
	// 2023
	LESSON_2023_10_30,
	LESSON_2023_11_08,
	LESSON_2023_12_09,
	LESSON_2023_12_31,
	// 2024
	LESSON_2024_03_25,
	LESSON_2024_04_04,
	LESSON_2024_04_15,
	LESSON_2024_04_22,
	LESSON_2024_04_29,
	LESSON_2024_05_06,
	LESSON_2024_06_05,
	LESSON_2024_06_10,
	LESSON_2024_06_17,
	LESSON_2024_06_26,
	LESSON_2024_07_01,
	LESSON_2024_07_08,
	LESSON_2024_07_15,
	LESSON_2024_07_29,
	LESSON_2024_08_05,
	LESSON_2024_08_12,
	LESSON_2024_09_10,
	LESSON_2024_10_15,
	LESSON_2024_11_11,
	LESSON_2024_11_28,
	LESSON_2024_12_02,
	LESSON_2024_12_09,
	LESSON_2024_12_16,
	LESSON_2024_12_30,
};

export const LESSONS = {
	// 2023
	"2023-10-30": LESSON_2023_10_30,
	"2023-11-08": LESSON_2023_11_08,
	"2023-12-09": LESSON_2023_12_09,
	"2023-12-31": LESSON_2023_12_31,
	// 2024
	"2024-03-25": LESSON_2024_03_25,
	"2024-04-04": LESSON_2024_04_04,
	"2024-04-15": LESSON_2024_04_15,
	"2024-04-22": LESSON_2024_04_22,
	"2024-04-29": LESSON_2024_04_29,
	"2024-05-06": LESSON_2024_05_06,
	"2024-06-05": LESSON_2024_06_05,
	"2024-06-10": LESSON_2024_06_10,
	"2024-06-17": LESSON_2024_06_17,
	"2024-06-26": LESSON_2024_06_26,
	"2024-07-01": LESSON_2024_07_01,
	"2024-07-08": LESSON_2024_07_08,
	"2024-07-15": LESSON_2024_07_15,
	"2024-07-29": LESSON_2024_07_29,
	"2024-08-05": LESSON_2024_08_05,
	"2024-08-12": LESSON_2024_08_12,
	"2024-09-10": LESSON_2024_09_10,
	"2024-10-15": LESSON_2024_10_15,
	"2024-11-11": LESSON_2024_11_11,
	"2024-11-28": LESSON_2024_11_28,
	"2024-12-02": LESSON_2024_12_02,
	"2024-12-09": LESSON_2024_12_09,
	"2024-12-16": LESSON_2024_12_16,
	"2024-12-30": LESSON_2024_12_30,
} as const;

function buildLessonSeedCategories(): Array<{ name: string; items: VocabWithTags[] }> {
	console.log("\nSeeding lessons...");
	const categories: Array<{ name: string; items: VocabWithTags[] }> = [];

	for (const [date, lesson] of Object.entries(LESSONS)) {
		console.log(`  Lesson ${date}: ${lesson.meta.topic}`);
		const lessonTag = `lesson-${date}`;
		const lessonItems: VocabWithTags[] = [];

		for (const verb of lesson.verbs ?? []) {
			lessonItems.push({
				vocab: {
					greekText: verb.lemma,
					englishTranslation: verb.english,
					wordType: "verb",
					cefrLevel: verb.cefrLevel ?? null,
					metadata: { lessonDate: date },
				},
				tags: [lessonTag],
				verbDetail: {
					conjugationFamily: verb.conjugationFamily,
				},
			});
		}

		for (const nounInput of lesson.nouns ?? []) {
			const noun = enrichNoun(nounInput);
			const displayText = formatNounWithArticle(noun.lemma, noun.gender);
			lessonItems.push({
				vocab: {
					greekText: displayText,
					englishTranslation: noun.english,
					wordType: "noun",
					cefrLevel: noun.cefrLevel ?? null,
					metadata: { lessonDate: date },
				},
				tags: [lessonTag],
				nounDetail: nounDetailFromSeed(noun),
				...pickNounNominalForms(noun),
			});
		}

		for (const adverb of lesson.adverbs ?? []) {
			lessonItems.push({
				vocab: {
					greekText: adverb.lemma,
					englishTranslation: adverb.english,
					wordType: "adverb",
					cefrLevel: adverb.cefrLevel ?? null,
					metadata: { lessonDate: date },
				},
				tags: [lessonTag],
			});
		}

		for (const adjInput of lesson.adjectives ?? []) {
			const adj = enrichAdjective(adjInput);
			lessonItems.push({
				vocab: {
					greekText: adj.lemma,
					englishTranslation: adj.english,
					wordType: "adjective",
					cefrLevel: adj.cefrLevel ?? null,
					metadata: { lessonDate: date },
				},
				tags: [lessonTag],
				...pickAdjectiveNominalForms(adj),
				...pickAdjectiveDetails(adj),
			});
		}

		for (const phrase of lesson.phrases ?? []) {
			lessonItems.push({
				vocab: {
					greekText: phrase.text,
					englishTranslation: phrase.english,
					wordType: "phrase",
					cefrLevel: phrase.cefrLevel ?? null,
					metadata: { ...phrase.metadata, lessonDate: date },
				},
				tags: [lessonTag],
			});
		}

		categories.push({ name: `lesson ${date}`, items: lessonItems });
	}

	return categories;
}

export const LESSON_SEED_CATEGORIES = buildLessonSeedCategories();
