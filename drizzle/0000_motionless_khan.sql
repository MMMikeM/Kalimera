CREATE TABLE `example_sentences` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`vocabulary_id` integer NOT NULL,
	`greek_text` text NOT NULL,
	`english_text` text NOT NULL,
	`audio_url` text,
	`source` text,
	`grammar_pattern_id` integer,
	`created_at` integer DEFAULT (unixepoch()) NOT NULL,
	FOREIGN KEY (`vocabulary_id`) REFERENCES `vocabulary`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`grammar_pattern_id`) REFERENCES `grammar_patterns`(`id`) ON UPDATE no action ON DELETE set null
);
--> statement-breakpoint
CREATE INDEX `idx_example_sentences_vocab` ON `example_sentences` (`vocabulary_id`);--> statement-breakpoint
CREATE TABLE `grammar_patterns` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`case_type` text NOT NULL,
	`context` text NOT NULL,
	`greek` text NOT NULL,
	`english` text NOT NULL,
	`explanation` text,
	`why_this_case` text,
	`next_review_at` integer,
	`interval_days` integer DEFAULT 1,
	`ease_factor` real DEFAULT 2.5,
	`review_count` integer DEFAULT 0,
	`created_at` integer DEFAULT (unixepoch()) NOT NULL
);
--> statement-breakpoint
CREATE INDEX `idx_grammar_patterns_case` ON `grammar_patterns` (`case_type`);--> statement-breakpoint
CREATE INDEX `idx_grammar_patterns_review` ON `grammar_patterns` (`next_review_at`);--> statement-breakpoint
CREATE TABLE `noun_details` (
	`vocab_id` integer PRIMARY KEY NOT NULL,
	`gender` text NOT NULL,
	`nominative_singular` text NOT NULL,
	`accusative_singular` text,
	`genitive_singular` text,
	`nominative_plural` text,
	`accusative_plural` text,
	`genitive_plural` text,
	`notes` text,
	FOREIGN KEY (`vocab_id`) REFERENCES `vocabulary`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `practice_attempts` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`session_id` integer,
	`vocabulary_id` integer,
	`question_text` text NOT NULL,
	`correct_answer` text NOT NULL,
	`user_answer` text,
	`is_correct` integer,
	`time_taken` integer,
	`attempted_at` integer DEFAULT (unixepoch()) NOT NULL,
	FOREIGN KEY (`session_id`) REFERENCES `practice_sessions`(`id`) ON UPDATE no action ON DELETE set null,
	FOREIGN KEY (`vocabulary_id`) REFERENCES `vocabulary`(`id`) ON UPDATE no action ON DELETE set null
);
--> statement-breakpoint
CREATE TABLE `practice_sessions` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`session_type` text,
	`category` text,
	`word_type_filter` text,
	`total_questions` integer,
	`correct_answers` integer,
	`focus_area` text,
	`started_at` integer DEFAULT (unixepoch()) NOT NULL,
	`completed_at` integer
);
--> statement-breakpoint
CREATE TABLE `tags` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`slug` text NOT NULL,
	`name` text NOT NULL,
	`description` text,
	`is_system` integer DEFAULT true NOT NULL,
	`created_at` integer DEFAULT (unixepoch()) NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `tags_slug_unique` ON `tags` (`slug`);--> statement-breakpoint
CREATE INDEX `idx_tags_is_system` ON `tags` (`is_system`);--> statement-breakpoint
CREATE TABLE `verb_details` (
	`vocab_id` integer PRIMARY KEY NOT NULL,
	`infinitive` text NOT NULL,
	`conjugation_family` text NOT NULL,
	`notes` text,
	`present_ego` text,
	`present_esy` text,
	`present_aftos` text,
	`present_emeis` text,
	`present_eseis` text,
	`present_aftoi` text,
	`past_ego` text,
	`past_esy` text,
	`past_aftos` text,
	`past_emeis` text,
	`past_eseis` text,
	`past_aftoi` text,
	`future_ego` text,
	`future_esy` text,
	`future_aftos` text,
	`future_emeis` text,
	`future_eseis` text,
	`future_aftoi` text,
	FOREIGN KEY (`vocab_id`) REFERENCES `vocabulary`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `vocabulary` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`greek_text` text NOT NULL,
	`english_translation` text NOT NULL,
	`pronunciation` text,
	`word_type` text,
	`category` text,
	`example_greek` text,
	`example_english` text,
	`status` text DEFAULT 'unprocessed' NOT NULL,
	`difficulty_level` integer DEFAULT 0 NOT NULL,
	`is_problem_word` integer DEFAULT false NOT NULL,
	`mistake_count` integer DEFAULT 0,
	`review_count` integer DEFAULT 0,
	`last_reviewed` integer,
	`created_at` integer DEFAULT (unixepoch()) NOT NULL,
	`gender` text,
	`metadata` text,
	`next_review_at` integer,
	`interval_days` integer DEFAULT 1,
	`ease_factor` real DEFAULT 2.5
);
--> statement-breakpoint
CREATE INDEX `idx_vocabulary_category` ON `vocabulary` (`category`);--> statement-breakpoint
CREATE INDEX `idx_vocabulary_word_type` ON `vocabulary` (`word_type`);--> statement-breakpoint
CREATE INDEX `idx_vocabulary_difficulty` ON `vocabulary` (`difficulty_level`);--> statement-breakpoint
CREATE INDEX `idx_vocabulary_review` ON `vocabulary` (`next_review_at`);--> statement-breakpoint
CREATE UNIQUE INDEX `idx_vocabulary_greek_text` ON `vocabulary` (`greek_text`);--> statement-breakpoint
CREATE TABLE `vocabulary_skills` (
	`vocabulary_id` integer NOT NULL,
	`skill_type` text NOT NULL,
	`next_review_at` integer,
	`interval_days` integer DEFAULT 1,
	`ease_factor` real DEFAULT 2.5,
	`review_count` integer DEFAULT 0,
	`last_reviewed_at` integer,
	PRIMARY KEY(`vocabulary_id`, `skill_type`),
	FOREIGN KEY (`vocabulary_id`) REFERENCES `vocabulary`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE INDEX `idx_vocabulary_skills_review` ON `vocabulary_skills` (`next_review_at`);--> statement-breakpoint
CREATE TABLE `vocabulary_tags` (
	`vocabulary_id` integer NOT NULL,
	`tag_id` integer NOT NULL,
	PRIMARY KEY(`vocabulary_id`, `tag_id`),
	FOREIGN KEY (`vocabulary_id`) REFERENCES `vocabulary`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`tag_id`) REFERENCES `tags`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE INDEX `idx_vocabulary_tags_tag_id` ON `vocabulary_tags` (`tag_id`);--> statement-breakpoint
CREATE TABLE `weak_areas` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`area_type` text NOT NULL,
	`area_identifier` text NOT NULL,
	`mistake_count` integer DEFAULT 1 NOT NULL,
	`last_mistake_at` integer DEFAULT (unixepoch()) NOT NULL,
	`needs_focus` integer DEFAULT true NOT NULL
);
