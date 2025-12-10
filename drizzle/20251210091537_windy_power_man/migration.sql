CREATE TABLE `practice_attempts` (
	`id` integer PRIMARY KEY AUTOINCREMENT,
	`user_id` integer NOT NULL,
	`session_id` integer,
	`vocabulary_id` integer,
	`question_text` text NOT NULL,
	`correct_answer` text NOT NULL,
	`user_answer` text,
	`is_correct` integer,
	`time_taken` integer,
	`attempted_at` integer DEFAULT (unixepoch()) NOT NULL,
	CONSTRAINT `fk_practice_attempts_user_id_users_id_fk` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE cascade,
	CONSTRAINT `fk_practice_attempts_session_id_practice_sessions_id_fk` FOREIGN KEY (`session_id`) REFERENCES `practice_sessions`(`id`) ON DELETE set null,
	CONSTRAINT `fk_practice_attempts_vocabulary_id_vocabulary_id_fk` FOREIGN KEY (`vocabulary_id`) REFERENCES `vocabulary`(`id`) ON DELETE set null
);
--> statement-breakpoint
CREATE TABLE `practice_sessions` (
	`id` integer PRIMARY KEY AUTOINCREMENT,
	`user_id` integer NOT NULL,
	`session_type` text,
	`category` text,
	`word_type_filter` text,
	`total_questions` integer,
	`correct_answers` integer,
	`focus_area` text,
	`started_at` integer DEFAULT (unixepoch()) NOT NULL,
	`completed_at` integer,
	CONSTRAINT `fk_practice_sessions_user_id_users_id_fk` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `tag_sections` (
	`tag_id` integer PRIMARY KEY,
	`section` text NOT NULL,
	`display_order` integer DEFAULT 0,
	CONSTRAINT `fk_tag_sections_tag_id_tags_id_fk` FOREIGN KEY (`tag_id`) REFERENCES `tags`(`id`) ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `tags` (
	`id` integer PRIMARY KEY AUTOINCREMENT,
	`slug` text NOT NULL UNIQUE,
	`name` text NOT NULL,
	`description` text,
	`created_at` integer DEFAULT (unixepoch()) NOT NULL
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` integer PRIMARY KEY AUTOINCREMENT,
	`code` text NOT NULL,
	`display_name` text NOT NULL,
	`created_at` integer DEFAULT (unixepoch()) NOT NULL
);
--> statement-breakpoint
CREATE TABLE `verb_details` (
	`vocab_id` integer PRIMARY KEY,
	`conjugation_family` text NOT NULL,
	`notes` text,
	CONSTRAINT `fk_verb_details_vocab_id_vocabulary_id_fk` FOREIGN KEY (`vocab_id`) REFERENCES `vocabulary`(`id`) ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `vocabulary` (
	`id` integer PRIMARY KEY AUTOINCREMENT,
	`greek_text` text NOT NULL,
	`english_translation` text NOT NULL,
	`pronunciation` text,
	`word_type` text NOT NULL,
	`example_greek` text,
	`example_english` text,
	`status` text DEFAULT 'unprocessed' NOT NULL,
	`difficulty_level` integer DEFAULT 0 NOT NULL,
	`created_at` integer DEFAULT (unixepoch()) NOT NULL,
	`gender` text,
	`metadata` text
);
--> statement-breakpoint
CREATE TABLE `vocabulary_skills` (
	`user_id` integer NOT NULL,
	`vocabulary_id` integer NOT NULL,
	`skill_type` text NOT NULL,
	`next_review_at` integer,
	`interval_days` integer DEFAULT 1,
	`ease_factor` real DEFAULT 2.3,
	`review_count` integer DEFAULT 0,
	`last_reviewed_at` integer,
	CONSTRAINT `vocabulary_skills_pk` PRIMARY KEY(`user_id`, `vocabulary_id`, `skill_type`),
	CONSTRAINT `fk_vocabulary_skills_user_id_users_id_fk` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE cascade,
	CONSTRAINT `fk_vocabulary_skills_vocabulary_id_vocabulary_id_fk` FOREIGN KEY (`vocabulary_id`) REFERENCES `vocabulary`(`id`) ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `vocabulary_tags` (
	`vocabulary_id` integer NOT NULL,
	`tag_id` integer NOT NULL,
	CONSTRAINT `vocabulary_tags_pk` PRIMARY KEY(`vocabulary_id`, `tag_id`),
	CONSTRAINT `fk_vocabulary_tags_vocabulary_id_vocabulary_id_fk` FOREIGN KEY (`vocabulary_id`) REFERENCES `vocabulary`(`id`) ON DELETE cascade,
	CONSTRAINT `fk_vocabulary_tags_tag_id_tags_id_fk` FOREIGN KEY (`tag_id`) REFERENCES `tags`(`id`) ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `weak_areas` (
	`id` integer PRIMARY KEY AUTOINCREMENT,
	`user_id` integer NOT NULL,
	`area_type` text NOT NULL,
	`area_identifier` text NOT NULL,
	`mistake_count` integer DEFAULT 1 NOT NULL,
	`last_mistake_at` integer DEFAULT (unixepoch()) NOT NULL,
	`needs_focus` integer DEFAULT 1 NOT NULL,
	CONSTRAINT `fk_weak_areas_user_id_users_id_fk` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE cascade
);
--> statement-breakpoint
CREATE INDEX `idx_practice_attempts_user` ON `practice_attempts` (`user_id`);--> statement-breakpoint
CREATE INDEX `idx_practice_sessions_user` ON `practice_sessions` (`user_id`);--> statement-breakpoint
CREATE UNIQUE INDEX `idx_users_code` ON `users` (`code`);--> statement-breakpoint
CREATE INDEX `idx_vocabulary_word_type` ON `vocabulary` (`word_type`);--> statement-breakpoint
CREATE INDEX `idx_vocabulary_difficulty` ON `vocabulary` (`difficulty_level`);--> statement-breakpoint
CREATE UNIQUE INDEX `idx_vocabulary_greek_text` ON `vocabulary` (`greek_text`);--> statement-breakpoint
CREATE INDEX `idx_vocabulary_skills_review` ON `vocabulary_skills` (`next_review_at`);--> statement-breakpoint
CREATE INDEX `idx_vocabulary_skills_user` ON `vocabulary_skills` (`user_id`);--> statement-breakpoint
CREATE INDEX `idx_weak_areas_user` ON `weak_areas` (`user_id`);--> statement-breakpoint
CREATE UNIQUE INDEX `idx_weak_areas_user_area` ON `weak_areas` (`user_id`,`area_type`,`area_identifier`);