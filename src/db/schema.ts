import type {
	ColumnType,
	Generated,
	Insertable,
	Selectable,
	Updateable,
} from "kysely";

export interface Database {
	vocabulary: VocabularyTable;
	tags: TagsTable;
	vocabulary_tags: VocabularyTagsTable;
	noun_details: NounDetailsTable;
	verb_details: VerbDetailsTable;
	practice_sessions: PracticeSessionsTable;
	practice_attempts: PracticeAttemptsTable;
	weak_areas: WeakAreasTable;
	vocabulary_skills: VocabularySkillsTable;
	grammar_patterns: GrammarPatternsTable;
	example_sentences: ExampleSentencesTable;
}

// Vocabulary Table
export interface VocabularyTable {
	id: Generated<number>;
	greek_text: string;
	english_translation: string;
	pronunciation: string | null;
	word_type:
		| "noun"
		| "verb"
		| "adjective"
		| "adverb"
		| "phrase"
		| "preposition"
		| null;
	category: string | null;
	example_greek: string | null;
	example_english: string | null;
	status: "unprocessed" | "processed";
	difficulty_level: ColumnType<number, number | undefined, number>;
	is_problem_word: ColumnType<boolean, boolean | undefined, boolean>;
	mistake_count: ColumnType<number, number | undefined, number>;
	review_count: ColumnType<number, number | undefined, number>;
	last_reviewed: ColumnType<Date, string | undefined, string> | null;
	created_at: ColumnType<Date, string | undefined, never>;
	gender: "masculine" | "feminine" | "neuter" | null;
	metadata: ColumnType<
		Record<string, unknown> | null,
		Record<string, unknown> | undefined,
		Record<string, unknown>
	>;
	// SRS fields
	next_review_at: ColumnType<Date, string | undefined, string> | null;
	interval_days: ColumnType<number, number | undefined, number>;
	ease_factor: ColumnType<number, number | undefined, number>;
}

export type Vocabulary = Selectable<VocabularyTable>;
export type NewVocabulary = Insertable<VocabularyTable>;
export type VocabularyUpdate = Updateable<VocabularyTable>;

// Tags Table
export interface TagsTable {
	id: Generated<number>;
	slug: string;
	name: string;
	description: string | null;
	is_system: ColumnType<boolean, boolean | undefined, boolean>;
	created_at: ColumnType<Date, string | undefined, never>;
}

export type Tag = Selectable<TagsTable>;
export type NewTag = Insertable<TagsTable>;
export type TagUpdate = Updateable<TagsTable>;

// Vocabulary Tags Join Table (many-to-many)
export interface VocabularyTagsTable {
	vocabulary_id: number;
	tag_id: number;
}

export type VocabularyTag = Selectable<VocabularyTagsTable>;
export type NewVocabularyTag = Insertable<VocabularyTagsTable>;
export type VocabularyTagUpdate = Updateable<VocabularyTagsTable>;

// Noun Details Table
export interface NounDetailsTable {
	vocab_id: number;
	gender: "masculine" | "feminine" | "neuter";
	nominative_singular: string;
	accusative_singular: string | null;
	genitive_singular: string | null;
	nominative_plural: string | null;
	accusative_plural: string | null;
	genitive_plural: string | null;
	notes: string | null;
}

export type NounDetails = Selectable<NounDetailsTable>;
export type NewNounDetails = Insertable<NounDetailsTable>;
export type NounDetailsUpdate = Updateable<NounDetailsTable>;

// Verb Details Table
export interface VerbDetailsTable {
	vocab_id: number;
	infinitive: string;
	conjugation_family: string;
	notes: string | null;
	present_ego: string | null;
	present_esy: string | null;
	present_aftos: string | null;
	present_emeis: string | null;
	present_eseis: string | null;
	present_aftoi: string | null;
	past_ego: string | null;
	past_esy: string | null;
	past_aftos: string | null;
	past_emeis: string | null;
	past_eseis: string | null;
	past_aftoi: string | null;
	future_ego: string | null;
	future_esy: string | null;
	future_aftos: string | null;
	future_emeis: string | null;
	future_eseis: string | null;
	future_aftoi: string | null;
}

export type VerbDetails = Selectable<VerbDetailsTable>;
export type NewVerbDetails = Insertable<VerbDetailsTable>;
export type VerbDetailsUpdate = Updateable<VerbDetailsTable>;

// Practice Sessions Table
export interface PracticeSessionsTable {
	id: Generated<number>;
	session_type:
		| "vocab_quiz"
		| "case_drill"
		| "conjugation_drill"
		| "weak_area_focus"
		| null;
	category: string | null;
	word_type_filter: string | null;
	total_questions: number | null;
	correct_answers: number | null;
	focus_area: string | null;
	started_at: ColumnType<Date, string | undefined, never>;
	completed_at: ColumnType<Date, string | undefined, string> | null;
}

export type PracticeSession = Selectable<PracticeSessionsTable>;
export type NewPracticeSession = Insertable<PracticeSessionsTable>;
export type PracticeSessionUpdate = Updateable<PracticeSessionsTable>;

// Practice Attempts Table
export interface PracticeAttemptsTable {
	id: Generated<number>;
	session_id: number;
	vocabulary_id: number;
	question_text: string;
	correct_answer: string;
	user_answer: string | null;
	is_correct: boolean | null;
	time_taken: number | null;
	attempted_at: ColumnType<Date, string | undefined, never>;
}

export type PracticeAttempt = Selectable<PracticeAttemptsTable>;
export type NewPracticeAttempt = Insertable<PracticeAttemptsTable>;
export type PracticeAttemptUpdate = Updateable<PracticeAttemptsTable>;

// Weak Areas Table
export interface WeakAreasTable {
	id: Generated<number>;
	area_type: "case" | "gender" | "verb_family";
	area_identifier: string;
	mistake_count: ColumnType<number, number | undefined, number>;
	last_mistake_at: ColumnType<Date, string | undefined, string>;
	needs_focus: ColumnType<boolean, boolean | undefined, boolean>;
}

export type WeakArea = Selectable<WeakAreasTable>;
export type NewWeakArea = Insertable<WeakAreasTable>;
export type WeakAreaUpdate = Updateable<WeakAreasTable>;

// Vocabulary Skills Table (recognition vs production tracking)
export interface VocabularySkillsTable {
	vocabulary_id: number;
	skill_type: "recognition" | "production";
	next_review_at: ColumnType<Date, string | undefined, string> | null;
	interval_days: ColumnType<number, number | undefined, number>;
	ease_factor: ColumnType<number, number | undefined, number>;
	review_count: ColumnType<number, number | undefined, number>;
	last_reviewed_at: ColumnType<Date, string | undefined, string> | null;
}

export type VocabularySkill = Selectable<VocabularySkillsTable>;
export type NewVocabularySkill = Insertable<VocabularySkillsTable>;
export type VocabularySkillUpdate = Updateable<VocabularySkillsTable>;

// Grammar Patterns Table (case usage examples with SRS)
export interface GrammarPatternsTable {
	id: Generated<number>;
	case_type: "accusative" | "genitive" | "nominative" | "vocative";
	context: string;
	greek: string;
	english: string;
	explanation: string | null;
	why_this_case: string | null;
	// SRS fields
	next_review_at: ColumnType<Date, string | undefined, string> | null;
	interval_days: ColumnType<number, number | undefined, number>;
	ease_factor: ColumnType<number, number | undefined, number>;
	review_count: ColumnType<number, number | undefined, number>;
	created_at: ColumnType<Date, string | undefined, never>;
}

export type GrammarPattern = Selectable<GrammarPatternsTable>;
export type NewGrammarPattern = Insertable<GrammarPatternsTable>;
export type GrammarPatternUpdate = Updateable<GrammarPatternsTable>;

// Example Sentences Table (multiple examples per vocabulary item)
export interface ExampleSentencesTable {
	id: Generated<number>;
	vocabulary_id: number;
	greek_text: string;
	english_text: string;
	audio_url: string | null;
	source: string | null;
	grammar_pattern_id: number | null;
	created_at: ColumnType<Date, string | undefined, never>;
}

export type ExampleSentence = Selectable<ExampleSentencesTable>;
export type NewExampleSentence = Insertable<ExampleSentencesTable>;
export type ExampleSentenceUpdate = Updateable<ExampleSentencesTable>;
