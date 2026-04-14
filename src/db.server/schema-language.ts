import {
	index,
	primaryKey,
	sqliteTable,
	text,
	uniqueIndex,
} from "drizzle-orm/sqlite-core";

import {
	cascadeFk,
	createdAt,
	json,
	nullableBool,
	nullableInt,
	nullableOneOf,
	nullableString,
	oneOf,
	pk,
	string,
} from "./columns";
import {
	nounDeclensionPatterns,
	cefrLevels,
	displaySections,
	genders,
	grammaticalCases,
	grammaticalNumbers,
	imperativeAspects,
	personNumbers,
	verbTenses,
	wordTypes,
	adjectiveDeclensionPatterns,
} from "./enums";
import type { VocabMetadata } from "./metadata";

export const vocabulary = sqliteTable(
	"vocabulary",
	{
		id: pk(),
		greekText: string("greek_text"),
		englishTranslation: string("english_translation"),
		wordType: oneOf("word_type", wordTypes),
		cefrLevel: nullableOneOf("cefr_level", cefrLevels),
		frequencyRank: nullableInt("frequency_rank"), // 1 = most frequent in spoken Greek
		createdAt: createdAt(),
		metadata: json<VocabMetadata>("metadata"), // Sparse, tag-specific data (timeRange, numericValue, etc.)
	},
	(table) => [
		index("idx_vocabulary_word_type").on(table.wordType),
		index("idx_vocabulary_cefr").on(table.cefrLevel),
		uniqueIndex("idx_vocabulary_greek_text").on(table.greekText),
	],
);

export const nounDetails = sqliteTable("noun_details", {
	vocabId: cascadeFk("vocab_id", () => vocabulary.id).primaryKey(),
	gender: oneOf("gender", genders),
	declensionPattern: oneOf("declension_pattern", nounDeclensionPatterns),
});


export const adjectiveDetails = sqliteTable("adjective_details", {
	vocabId: cascadeFk("vocab_id", () => vocabulary.id).primaryKey(),
	pattern: oneOf("pattern", adjectiveDeclensionPatterns),
});

// Sparse inflected forms. `gender` stays null for nouns (lexical gender is on noun_details).
// `gender_key` is the uniqueness slot: '' for noun rows, otherwise masculine|feminine|neuter.
// One non-partial unique so SQLite UPSERT / ON CONFLICT works (partial uniques do not).
export const nominalForms = sqliteTable(
	"nominal_forms",
	{
		id: pk(),
		vocabId: cascadeFk("vocab_id", () => vocabulary.id),
		grammaticalCase: oneOf("grammatical_case", grammaticalCases),
		number: oneOf("number", grammaticalNumbers),
		form: string("form"),
		article: nullableString("article"),
		gender: nullableOneOf("gender", genders),
		genderKey: text("gender_key").notNull().default(""),
	},
	(table) => [
		index("idx_nominal_forms_vocab").on(table.vocabId),
		uniqueIndex("idx_nominal_forms_unique").on(
			table.vocabId,
			table.grammaticalCase,
			table.number,
			table.genderKey,
		),
	],
);

export const verbDetails = sqliteTable("verb_details", {
	vocabId: cascadeFk("vocab_id", () => vocabulary.id).primaryKey(),
	conjugationFamily: string("conjugation_family"),
	notes: nullableString("notes"),
	presentStem: nullableString("present_stem"),
	aoristStem: nullableString("aorist_stem"),
	futureStem: nullableString("future_stem"),
	isSuppletive: nullableBool("is_suppletive"),
});

export const verbConjugations = sqliteTable(
	"verb_conjugations",
	{
		id: pk(),
		vocabId: cascadeFk("vocab_id", () => vocabulary.id),
		tense: oneOf("tense", verbTenses),
		person: oneOf("person", personNumbers),
		form: string("form"),
		stem: nullableString("stem"),
		ending: nullableString("ending"),
	},
	(table) => [
		index("idx_verb_conjugations_vocab").on(table.vocabId),
		index("idx_verb_conjugations_vocab_tense").on(table.vocabId, table.tense),
		uniqueIndex("idx_verb_conjugations_unique").on(table.vocabId, table.tense, table.person),
	],
);

export const verbImperatives = sqliteTable(
	"verb_imperatives",
	{
		id: pk(),
		vocabId: cascadeFk("vocab_id", () => vocabulary.id),
		aspect: oneOf("aspect", imperativeAspects),
		number: oneOf("number", grammaticalNumbers),
		form: string("form"),
	},
	(table) => [
		index("idx_verb_imperatives_vocab").on(table.vocabId),
		uniqueIndex("idx_verb_imperatives_unique").on(table.vocabId, table.aspect, table.number),
	],
);

export const tags = sqliteTable(
	"tags",
	{
		id: pk(),
		slug: string("slug"),
		name: string("name"),
		description: nullableString("description"),
		section: nullableOneOf("section", displaySections), // Null for non-curriculum tags
		sectionDisplayOrder: nullableInt("section_display_order"),
		createdAt: createdAt(),
	},
	(table) => [
		uniqueIndex("idx_tags_slug").on(table.slug),
		index("idx_tags_section_order").on(table.section, table.sectionDisplayOrder),
	],
);

export const vocabularyTags = sqliteTable(
	"vocabulary_tags",
	{
		vocabularyId: cascadeFk("vocabulary_id", () => vocabulary.id),
		tagId: cascadeFk("tag_id", () => tags.id),
		displayOrder: nullableInt("display_order"),
	},
	(table) => [
		primaryKey({ columns: [table.vocabularyId, table.tagId] }),
		index("idx_vocabulary_tags_tag").on(table.tagId),
		index("idx_vocabulary_tags_tag_order").on(table.tagId, table.displayOrder),
	],
);
