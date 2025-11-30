import type {
	ColumnType,
	Generated,
	Insertable,
	Selectable,
	Updateable,
} from "kysely";

export interface Database {
	vocabulary: VocabularyTable;
	noun_details: NounDetailsTable;
	verb_details: VerbDetailsTable;
	// verb_conjugations: VerbConjugationsTable; // TODO: Define this table
	practice_sessions: PracticeSessionsTable;
	practice_attempts: PracticeAttemptsTable;
	weak_areas: WeakAreasTable;
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
}

export type Vocabulary = Selectable<VocabularyTable>;
export type NewVocabulary = Insertable<VocabularyTable>;
export type VocabularyUpdate = Updateable<VocabularyTable>;

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
