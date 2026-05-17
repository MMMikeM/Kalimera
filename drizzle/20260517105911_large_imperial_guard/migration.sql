CREATE TABLE `vocab_daily_results` (
	`user_id` integer NOT NULL,
	`vocab_id` integer NOT NULL,
	`drill_id` text NOT NULL,
	`practiced_date` text NOT NULL,
	`correct_first_try` integer NOT NULL,
	`created_at` integer DEFAULT (unixepoch()) NOT NULL,
	CONSTRAINT `vocab_daily_results_pk` PRIMARY KEY(`user_id`, `vocab_id`, `drill_id`, `practiced_date`),
	CONSTRAINT `fk_vocab_daily_results_user_id_users_id_fk` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE,
	CONSTRAINT `fk_vocab_daily_results_vocab_id_vocabulary_id_fk` FOREIGN KEY (`vocab_id`) REFERENCES `vocabulary`(`id`) ON DELETE CASCADE
);
--> statement-breakpoint
CREATE TABLE `vocab_mastery` (
	`user_id` integer NOT NULL,
	`vocab_id` integer NOT NULL,
	`drill_id` text NOT NULL,
	`tier` integer DEFAULT 1 NOT NULL,
	`mastered_at` integer,
	`next_review_at` integer,
	CONSTRAINT `vocab_mastery_pk` PRIMARY KEY(`user_id`, `vocab_id`, `drill_id`),
	CONSTRAINT `fk_vocab_mastery_user_id_users_id_fk` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE,
	CONSTRAINT `fk_vocab_mastery_vocab_id_vocabulary_id_fk` FOREIGN KEY (`vocab_id`) REFERENCES `vocabulary`(`id`) ON DELETE CASCADE
);
--> statement-breakpoint
ALTER TABLE `vocabulary_skills` RENAME TO `vocabulary_reviews`;--> statement-breakpoint
ALTER TABLE `practice_attempts` RENAME COLUMN `vocabulary_id` TO `vocab_id`;--> statement-breakpoint
ALTER TABLE `vocabulary_reviews` RENAME COLUMN `vocabulary_id` TO `vocab_id`;--> statement-breakpoint
PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_vocabulary_reviews` (
	`user_id` integer NOT NULL,
	`vocab_id` integer NOT NULL,
	`next_review_at` integer,
	`interval_days` integer DEFAULT 1,
	`ease_factor` real DEFAULT 2.3,
	`review_count` integer DEFAULT 0,
	`last_reviewed_at` integer,
	CONSTRAINT `vocabulary_reviews_pk` PRIMARY KEY(`user_id`, `vocab_id`),
	CONSTRAINT `fk_vocabulary_skills_user_id_users_id_fk` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE,
	CONSTRAINT `fk_vocabulary_skills_vocabulary_id_vocabulary_id_fk` FOREIGN KEY (`vocab_id`) REFERENCES `vocabulary`(`id`) ON DELETE CASCADE
);
--> statement-breakpoint
INSERT INTO `__new_vocabulary_reviews`(`user_id`, `vocab_id`, `next_review_at`, `interval_days`, `ease_factor`, `review_count`, `last_reviewed_at`) SELECT `user_id`, `vocab_id`, `next_review_at`, `interval_days`, `ease_factor`, `review_count`, `last_reviewed_at` FROM `vocabulary_reviews`;--> statement-breakpoint
DROP TABLE `vocabulary_reviews`;--> statement-breakpoint
ALTER TABLE `__new_vocabulary_reviews` RENAME TO `vocabulary_reviews`;--> statement-breakpoint
PRAGMA foreign_keys=ON;--> statement-breakpoint
PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_practice_sessions` (
	`id` integer PRIMARY KEY AUTOINCREMENT,
	`user_id` integer NOT NULL,
	`total_questions` integer DEFAULT 0 NOT NULL,
	`correct_answers` integer DEFAULT 0 NOT NULL,
	`started_at` integer DEFAULT (unixepoch()) NOT NULL,
	`completed_at` integer,
	CONSTRAINT `fk_practice_sessions_user_id_users_id_fk` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE
);
--> statement-breakpoint
INSERT INTO `__new_practice_sessions`(`id`, `user_id`, `total_questions`, `correct_answers`, `started_at`, `completed_at`) SELECT `id`, `user_id`, COALESCE(`total_questions`, 0), COALESCE(`correct_answers`, 0), `started_at`, `completed_at` FROM `practice_sessions`;--> statement-breakpoint
DROP TABLE `practice_sessions`;--> statement-breakpoint
ALTER TABLE `__new_practice_sessions` RENAME TO `practice_sessions`;--> statement-breakpoint
PRAGMA foreign_keys=ON;--> statement-breakpoint
DROP INDEX IF EXISTS `idx_vocabulary_skills_review`;--> statement-breakpoint
DROP INDEX IF EXISTS `idx_vocabulary_skills_user`;--> statement-breakpoint
DROP INDEX IF EXISTS `idx_milestones_user_milestone`;--> statement-breakpoint
DROP INDEX IF EXISTS `idx_practice_attempts_user`;--> statement-breakpoint
DROP INDEX IF EXISTS `idx_practice_sessions_user`;--> statement-breakpoint
DROP INDEX IF EXISTS `idx_weak_areas_user`;--> statement-breakpoint
DROP INDEX IF EXISTS `idx_weak_areas_user_area`;--> statement-breakpoint
CREATE INDEX `idx_vocabulary_reviews_user_review` ON `vocabulary_reviews` (`user_id`,`next_review_at`);--> statement-breakpoint
CREATE INDEX `idx_practice_sessions_user_completed` ON `practice_sessions` (`user_id`,`completed_at`);--> statement-breakpoint
CREATE INDEX `idx_vocab_daily_user_drill` ON `vocab_daily_results` (`user_id`,`drill_id`);--> statement-breakpoint
CREATE INDEX `idx_vocab_mastery_review` ON `vocab_mastery` (`user_id`,`drill_id`,`next_review_at`);--> statement-breakpoint
DROP TABLE `milestones_achieved`;--> statement-breakpoint
DROP TABLE `weak_areas`;