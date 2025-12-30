PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_tags` (
	`id` integer PRIMARY KEY AUTOINCREMENT,
	`slug` text NOT NULL,
	`name` text NOT NULL,
	`description` text,
	`created_at` integer DEFAULT (unixepoch()) NOT NULL
);
--> statement-breakpoint
INSERT INTO `__new_tags`(`id`, `slug`, `name`, `description`, `created_at`) SELECT `id`, `slug`, `name`, `description`, `created_at` FROM `tags`;--> statement-breakpoint
DROP TABLE `tags`;--> statement-breakpoint
ALTER TABLE `__new_tags` RENAME TO `tags`;--> statement-breakpoint
PRAGMA foreign_keys=ON;--> statement-breakpoint
PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_weak_areas` (
	`id` integer PRIMARY KEY AUTOINCREMENT,
	`user_id` integer NOT NULL,
	`area_type` text NOT NULL,
	`area_identifier` text NOT NULL,
	`mistake_count` integer DEFAULT 1 NOT NULL,
	`last_mistake_at` integer DEFAULT (unixepoch()) NOT NULL,
	`needs_focus` integer DEFAULT true NOT NULL,
	CONSTRAINT `fk_weak_areas_user_id_users_id_fk` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE
);
--> statement-breakpoint
INSERT INTO `__new_weak_areas`(`id`, `user_id`, `area_type`, `area_identifier`, `mistake_count`, `last_mistake_at`, `needs_focus`) SELECT `id`, `user_id`, `area_type`, `area_identifier`, `mistake_count`, `last_mistake_at`, `needs_focus` FROM `weak_areas`;--> statement-breakpoint
DROP TABLE `weak_areas`;--> statement-breakpoint
ALTER TABLE `__new_weak_areas` RENAME TO `weak_areas`;--> statement-breakpoint
PRAGMA foreign_keys=ON;--> statement-breakpoint
PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_practice_attempts` (
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
	CONSTRAINT `fk_practice_attempts_user_id_users_id_fk` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE,
	CONSTRAINT `fk_practice_attempts_session_id_practice_sessions_id_fk` FOREIGN KEY (`session_id`) REFERENCES `practice_sessions`(`id`) ON DELETE SET NULL,
	CONSTRAINT `fk_practice_attempts_vocabulary_id_vocabulary_id_fk` FOREIGN KEY (`vocabulary_id`) REFERENCES `vocabulary`(`id`) ON DELETE SET NULL
);
--> statement-breakpoint
INSERT INTO `__new_practice_attempts`(`id`, `user_id`, `session_id`, `vocabulary_id`, `question_text`, `correct_answer`, `user_answer`, `is_correct`, `time_taken`, `attempted_at`) SELECT `id`, `user_id`, `session_id`, `vocabulary_id`, `question_text`, `correct_answer`, `user_answer`, `is_correct`, `time_taken`, `attempted_at` FROM `practice_attempts`;--> statement-breakpoint
DROP TABLE `practice_attempts`;--> statement-breakpoint
ALTER TABLE `__new_practice_attempts` RENAME TO `practice_attempts`;--> statement-breakpoint
PRAGMA foreign_keys=ON;--> statement-breakpoint
PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_practice_sessions` (
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
	CONSTRAINT `fk_practice_sessions_user_id_users_id_fk` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE
);
--> statement-breakpoint
INSERT INTO `__new_practice_sessions`(`id`, `user_id`, `session_type`, `category`, `word_type_filter`, `total_questions`, `correct_answers`, `focus_area`, `started_at`, `completed_at`) SELECT `id`, `user_id`, `session_type`, `category`, `word_type_filter`, `total_questions`, `correct_answers`, `focus_area`, `started_at`, `completed_at` FROM `practice_sessions`;--> statement-breakpoint
DROP TABLE `practice_sessions`;--> statement-breakpoint
ALTER TABLE `__new_practice_sessions` RENAME TO `practice_sessions`;--> statement-breakpoint
PRAGMA foreign_keys=ON;--> statement-breakpoint
PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_push_subscriptions` (
	`id` integer PRIMARY KEY AUTOINCREMENT,
	`user_id` integer NOT NULL,
	`endpoint` text NOT NULL,
	`p256dh` text NOT NULL,
	`auth` text NOT NULL,
	`created_at` integer DEFAULT (unixepoch()) NOT NULL,
	CONSTRAINT `fk_push_subscriptions_user_id_users_id_fk` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE
);
--> statement-breakpoint
INSERT INTO `__new_push_subscriptions`(`id`, `user_id`, `endpoint`, `p256dh`, `auth`, `created_at`) SELECT `id`, `user_id`, `endpoint`, `p256dh`, `auth`, `created_at` FROM `push_subscriptions`;--> statement-breakpoint
DROP TABLE `push_subscriptions`;--> statement-breakpoint
ALTER TABLE `__new_push_subscriptions` RENAME TO `push_subscriptions`;--> statement-breakpoint
PRAGMA foreign_keys=ON;--> statement-breakpoint
PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_tag_sections` (
	`tag_id` integer PRIMARY KEY,
	`section` text NOT NULL,
	`display_order` integer DEFAULT 0,
	CONSTRAINT `fk_tag_sections_tag_id_tags_id_fk` FOREIGN KEY (`tag_id`) REFERENCES `tags`(`id`) ON DELETE CASCADE
);
--> statement-breakpoint
INSERT INTO `__new_tag_sections`(`tag_id`, `section`, `display_order`) SELECT `tag_id`, `section`, `display_order` FROM `tag_sections`;--> statement-breakpoint
DROP TABLE `tag_sections`;--> statement-breakpoint
ALTER TABLE `__new_tag_sections` RENAME TO `tag_sections`;--> statement-breakpoint
PRAGMA foreign_keys=ON;--> statement-breakpoint
PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_verb_details` (
	`vocab_id` integer PRIMARY KEY,
	`conjugation_family` text NOT NULL,
	`notes` text,
	CONSTRAINT `fk_verb_details_vocab_id_vocabulary_id_fk` FOREIGN KEY (`vocab_id`) REFERENCES `vocabulary`(`id`) ON DELETE CASCADE
);
--> statement-breakpoint
INSERT INTO `__new_verb_details`(`vocab_id`, `conjugation_family`, `notes`) SELECT `vocab_id`, `conjugation_family`, `notes` FROM `verb_details`;--> statement-breakpoint
DROP TABLE `verb_details`;--> statement-breakpoint
ALTER TABLE `__new_verb_details` RENAME TO `verb_details`;--> statement-breakpoint
PRAGMA foreign_keys=ON;--> statement-breakpoint
PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_vocabulary_skills` (
	`user_id` integer NOT NULL,
	`vocabulary_id` integer NOT NULL,
	`skill_type` text NOT NULL,
	`next_review_at` integer,
	`interval_days` integer DEFAULT 1,
	`ease_factor` real DEFAULT 2.3,
	`review_count` integer DEFAULT 0,
	`last_reviewed_at` integer,
	CONSTRAINT `vocabulary_skills_pk` PRIMARY KEY(`user_id`, `vocabulary_id`, `skill_type`),
	CONSTRAINT `fk_vocabulary_skills_user_id_users_id_fk` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE,
	CONSTRAINT `fk_vocabulary_skills_vocabulary_id_vocabulary_id_fk` FOREIGN KEY (`vocabulary_id`) REFERENCES `vocabulary`(`id`) ON DELETE CASCADE
);
--> statement-breakpoint
INSERT INTO `__new_vocabulary_skills`(`user_id`, `vocabulary_id`, `skill_type`, `next_review_at`, `interval_days`, `ease_factor`, `review_count`, `last_reviewed_at`) SELECT `user_id`, `vocabulary_id`, `skill_type`, `next_review_at`, `interval_days`, `ease_factor`, `review_count`, `last_reviewed_at` FROM `vocabulary_skills`;--> statement-breakpoint
DROP TABLE `vocabulary_skills`;--> statement-breakpoint
ALTER TABLE `__new_vocabulary_skills` RENAME TO `vocabulary_skills`;--> statement-breakpoint
PRAGMA foreign_keys=ON;--> statement-breakpoint
PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_vocabulary_tags` (
	`vocabulary_id` integer NOT NULL,
	`tag_id` integer NOT NULL,
	CONSTRAINT `vocabulary_tags_pk` PRIMARY KEY(`vocabulary_id`, `tag_id`),
	CONSTRAINT `fk_vocabulary_tags_vocabulary_id_vocabulary_id_fk` FOREIGN KEY (`vocabulary_id`) REFERENCES `vocabulary`(`id`) ON DELETE CASCADE,
	CONSTRAINT `fk_vocabulary_tags_tag_id_tags_id_fk` FOREIGN KEY (`tag_id`) REFERENCES `tags`(`id`) ON DELETE CASCADE
);
--> statement-breakpoint
INSERT INTO `__new_vocabulary_tags`(`vocabulary_id`, `tag_id`) SELECT `vocabulary_id`, `tag_id` FROM `vocabulary_tags`;--> statement-breakpoint
DROP TABLE `vocabulary_tags`;--> statement-breakpoint
ALTER TABLE `__new_vocabulary_tags` RENAME TO `vocabulary_tags`;--> statement-breakpoint
PRAGMA foreign_keys=ON;--> statement-breakpoint
CREATE UNIQUE INDEX `idx_tags_slug` ON `tags` (`slug`);--> statement-breakpoint
CREATE INDEX `idx_weak_areas_user` ON `weak_areas` (`user_id`);--> statement-breakpoint
CREATE UNIQUE INDEX `idx_weak_areas_user_area` ON `weak_areas` (`user_id`,`area_type`,`area_identifier`);--> statement-breakpoint
CREATE INDEX `idx_practice_attempts_user` ON `practice_attempts` (`user_id`);--> statement-breakpoint
CREATE INDEX `idx_practice_attempts_session` ON `practice_attempts` (`session_id`);--> statement-breakpoint
CREATE INDEX `idx_practice_attempts_vocab` ON `practice_attempts` (`vocabulary_id`);--> statement-breakpoint
CREATE INDEX `idx_practice_sessions_user` ON `practice_sessions` (`user_id`);--> statement-breakpoint
CREATE INDEX `idx_practice_sessions_user_completed` ON `practice_sessions` (`user_id`,`completed_at`);--> statement-breakpoint
CREATE INDEX `idx_push_subscriptions_user` ON `push_subscriptions` (`user_id`);--> statement-breakpoint
CREATE UNIQUE INDEX `idx_push_subscriptions_endpoint` ON `push_subscriptions` (`endpoint`);--> statement-breakpoint
CREATE INDEX `idx_vocabulary_skills_review` ON `vocabulary_skills` (`next_review_at`);--> statement-breakpoint
CREATE INDEX `idx_vocabulary_skills_user` ON `vocabulary_skills` (`user_id`);--> statement-breakpoint
CREATE INDEX `idx_vocabulary_tags_tag` ON `vocabulary_tags` (`tag_id`);