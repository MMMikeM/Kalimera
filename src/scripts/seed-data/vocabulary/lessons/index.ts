import { readdirSync } from "node:fs";
import { createRequire } from "node:module";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

import type { Lesson } from "@/types/lesson-seed";

import {
	type VocabWithTags,
	nounDetailFromSeed,
	pickAdjectiveDetails,
	pickAdjectiveNominalForms,
	pickNounNominalForms,
} from "../../../seed-pipeline";
import { enrichAdjective } from "../adjective-seed-enrichment";
import { enrichNoun } from "../noun-seed-enrichment";

const _require = createRequire(import.meta.url);
const _dir = dirname(fileURLToPath(import.meta.url));

const lessonFiles = readdirSync(_dir)
	.filter((f) => /^\d{4}-\d{2}-\d{2}.*\.ts$/.test(f))
	.sort();

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
			lessonItems.push({
				vocab: {
					greekText: noun.lemma,
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

export const LESSONS: Record<string, Lesson> = Object.fromEntries(
	lessonFiles.map((f) => {
		const date = f.slice(0, 10);
		const exportName = `LESSON_${date.replace(/-/g, "_")}`;
		const mod = _require(join(_dir, f));
		return [date, mod[exportName] as Lesson];
	}),
);

export const LESSON_SEED_CATEGORIES = buildLessonSeedCategories();
