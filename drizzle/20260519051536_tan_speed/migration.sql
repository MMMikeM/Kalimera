PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_auth_challenges` (
	`id` integer PRIMARY KEY AUTOINCREMENT,
	`challenge` text NOT NULL,
	`type` text NOT NULL,
	`user_id` integer,
	`expires_at` text NOT NULL,
	`created_at` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%SZ','now')) NOT NULL,
	CONSTRAINT `fk_auth_challenges_user_id_users_id_fk` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE SET NULL
);
--> statement-breakpoint
INSERT INTO `__new_auth_challenges`(`id`, `challenge`, `type`, `user_id`, `expires_at`, `created_at`) SELECT `id`, `challenge`, `type`, `user_id`, strftime('%Y-%m-%dT%H:%M:%SZ', `expires_at`, 'unixepoch'), strftime('%Y-%m-%dT%H:%M:%SZ', `created_at`, 'unixepoch') FROM `auth_challenges`;--> statement-breakpoint
DROP TABLE `auth_challenges`;--> statement-breakpoint
ALTER TABLE `__new_auth_challenges` RENAME TO `auth_challenges`;--> statement-breakpoint
PRAGMA foreign_keys=ON;--> statement-breakpoint
PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_drill_daily_results` (
	`user_id` integer NOT NULL,
	`vocab_id` integer NOT NULL,
	`drill_id` text NOT NULL,
	`practiced_date` text NOT NULL,
	`correct_first_try` integer NOT NULL,
	`created_at` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%SZ','now')) NOT NULL,
	CONSTRAINT `vocab_daily_results_pk` PRIMARY KEY(`user_id`, `vocab_id`, `drill_id`, `practiced_date`),
	CONSTRAINT `fk_vocab_daily_results_user_id_users_id_fk` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE,
	CONSTRAINT `fk_vocab_daily_results_vocab_id_vocabulary_id_fk` FOREIGN KEY (`vocab_id`) REFERENCES `vocabulary`(`id`) ON DELETE CASCADE
);
--> statement-breakpoint
INSERT INTO `__new_drill_daily_results`(`user_id`, `vocab_id`, `drill_id`, `practiced_date`, `correct_first_try`, `created_at`) SELECT `user_id`, `vocab_id`, `drill_id`, `practiced_date`, `correct_first_try`, strftime('%Y-%m-%dT%H:%M:%SZ', `created_at`, 'unixepoch') FROM `drill_daily_results`;--> statement-breakpoint
DROP TABLE `drill_daily_results`;--> statement-breakpoint
ALTER TABLE `__new_drill_daily_results` RENAME TO `drill_daily_results`;--> statement-breakpoint
PRAGMA foreign_keys=ON;--> statement-breakpoint
PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_drill_progress` (
	`user_id` integer NOT NULL,
	`vocab_id` integer NOT NULL,
	`drill_id` text NOT NULL,
	`tier` integer DEFAULT 1 NOT NULL,
	`mastered_at` text,
	`next_review_at` text,
	CONSTRAINT `vocab_mastery_pk` PRIMARY KEY(`user_id`, `vocab_id`, `drill_id`),
	CONSTRAINT `fk_vocab_mastery_user_id_users_id_fk` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE,
	CONSTRAINT `fk_vocab_mastery_vocab_id_vocabulary_id_fk` FOREIGN KEY (`vocab_id`) REFERENCES `vocabulary`(`id`) ON DELETE CASCADE
);
--> statement-breakpoint
INSERT INTO `__new_drill_progress`(`user_id`, `vocab_id`, `drill_id`, `tier`, `mastered_at`, `next_review_at`) SELECT `user_id`, `vocab_id`, `drill_id`, `tier`, CASE WHEN `mastered_at` IS NULL THEN NULL ELSE strftime('%Y-%m-%dT%H:%M:%SZ', `mastered_at`, 'unixepoch') END, CASE WHEN `next_review_at` IS NULL THEN NULL ELSE strftime('%Y-%m-%dT%H:%M:%SZ', `next_review_at`, 'unixepoch') END FROM `drill_progress`;--> statement-breakpoint
DROP TABLE `drill_progress`;--> statement-breakpoint
ALTER TABLE `__new_drill_progress` RENAME TO `drill_progress`;--> statement-breakpoint
PRAGMA foreign_keys=ON;--> statement-breakpoint
PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_notification_logs` (
	`id` integer PRIMARY KEY AUTOINCREMENT,
	`user_id` integer NOT NULL,
	`sent_at` text,
	`type` text NOT NULL,
	`tapped_action` text,
	`tapped_at` text,
	CONSTRAINT `fk_notification_logs_user_id_users_id_fk` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE
);
--> statement-breakpoint
INSERT INTO `__new_notification_logs`(`id`, `user_id`, `sent_at`, `type`, `tapped_action`, `tapped_at`) SELECT `id`, `user_id`, CASE WHEN `sent_at` IS NULL THEN NULL ELSE strftime('%Y-%m-%dT%H:%M:%SZ', `sent_at`, 'unixepoch') END, `type`, `tapped_action`, CASE WHEN `tapped_at` IS NULL THEN NULL ELSE strftime('%Y-%m-%dT%H:%M:%SZ', `tapped_at`, 'unixepoch') END FROM `notification_logs`;--> statement-breakpoint
DROP TABLE `notification_logs`;--> statement-breakpoint
ALTER TABLE `__new_notification_logs` RENAME TO `notification_logs`;--> statement-breakpoint
PRAGMA foreign_keys=ON;--> statement-breakpoint
PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_passkeys` (
	`id` integer PRIMARY KEY AUTOINCREMENT,
	`user_id` integer NOT NULL,
	`credential_id` text NOT NULL,
	`public_key` text NOT NULL,
	`counter` integer DEFAULT 0 NOT NULL,
	`transports` text,
	`device_type` text,
	`backed_up` integer,
	`name` text,
	`last_used_at` text,
	`created_at` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%SZ','now')) NOT NULL,
	CONSTRAINT `fk_passkeys_user_id_users_id_fk` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE
);
--> statement-breakpoint
INSERT INTO `__new_passkeys`(`id`, `user_id`, `credential_id`, `public_key`, `counter`, `transports`, `device_type`, `backed_up`, `name`, `last_used_at`, `created_at`) SELECT `id`, `user_id`, `credential_id`, `public_key`, `counter`, `transports`, `device_type`, `backed_up`, `name`, CASE WHEN `last_used_at` IS NULL THEN NULL ELSE strftime('%Y-%m-%dT%H:%M:%SZ', `last_used_at`, 'unixepoch') END, strftime('%Y-%m-%dT%H:%M:%SZ', `created_at`, 'unixepoch') FROM `passkeys`;--> statement-breakpoint
DROP TABLE `passkeys`;--> statement-breakpoint
ALTER TABLE `__new_passkeys` RENAME TO `passkeys`;--> statement-breakpoint
PRAGMA foreign_keys=ON;--> statement-breakpoint
PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_practice_attempts` (
	`id` integer PRIMARY KEY AUTOINCREMENT,
	`user_id` integer NOT NULL,
	`session_id` integer,
	`vocab_id` integer,
	`drill_id` text,
	`question_text` text NOT NULL,
	`correct_answer` text NOT NULL,
	`user_answer` text,
	`is_correct` integer,
	`time_taken` integer,
	`attempted_at` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%SZ','now')) NOT NULL,
	CONSTRAINT `fk_practice_attempts_user_id_users_id_fk` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE,
	CONSTRAINT `fk_practice_attempts_session_id_practice_sessions_id_fk` FOREIGN KEY (`session_id`) REFERENCES `practice_sessions`(`id`) ON DELETE SET NULL,
	CONSTRAINT `fk_practice_attempts_vocabulary_id_vocabulary_id_fk` FOREIGN KEY (`vocab_id`) REFERENCES `vocabulary`(`id`) ON DELETE SET NULL
);
--> statement-breakpoint
INSERT INTO `__new_practice_attempts`(`id`, `user_id`, `session_id`, `vocab_id`, `drill_id`, `question_text`, `correct_answer`, `user_answer`, `is_correct`, `time_taken`, `attempted_at`) SELECT `id`, `user_id`, `session_id`, `vocab_id`, `drill_id`, `question_text`, `correct_answer`, `user_answer`, `is_correct`, `time_taken`, strftime('%Y-%m-%dT%H:%M:%SZ', `attempted_at`, 'unixepoch') FROM `practice_attempts`;--> statement-breakpoint
DROP TABLE `practice_attempts`;--> statement-breakpoint
ALTER TABLE `__new_practice_attempts` RENAME TO `practice_attempts`;--> statement-breakpoint
PRAGMA foreign_keys=ON;--> statement-breakpoint
PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_practice_sessions` (
	`id` integer PRIMARY KEY AUTOINCREMENT,
	`user_id` integer NOT NULL,
	`total_questions` integer DEFAULT 0 NOT NULL,
	`correct_answers` integer DEFAULT 0 NOT NULL,
	`started_at` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%SZ','now')) NOT NULL,
	`completed_at` text,
	CONSTRAINT `fk_practice_sessions_user_id_users_id_fk` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE
);
--> statement-breakpoint
INSERT INTO `__new_practice_sessions`(`id`, `user_id`, `total_questions`, `correct_answers`, `started_at`, `completed_at`) SELECT `id`, `user_id`, `total_questions`, `correct_answers`, strftime('%Y-%m-%dT%H:%M:%SZ', `started_at`, 'unixepoch'), CASE WHEN `completed_at` IS NULL THEN NULL ELSE strftime('%Y-%m-%dT%H:%M:%SZ', `completed_at`, 'unixepoch') END FROM `practice_sessions`;--> statement-breakpoint
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
	`snoozed_until` text,
	`notification_mode` text DEFAULT 'adaptive' NOT NULL,
	`taper_offer_pending` integer DEFAULT false NOT NULL,
	`created_at` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%SZ','now')) NOT NULL,
	CONSTRAINT `fk_push_subscriptions_user_id_users_id_fk` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE
);
--> statement-breakpoint
INSERT INTO `__new_push_subscriptions`(`id`, `user_id`, `endpoint`, `p256dh`, `auth`, `snoozed_until`, `notification_mode`, `taper_offer_pending`, `created_at`) SELECT `id`, `user_id`, `endpoint`, `p256dh`, `auth`, CASE WHEN `snoozed_until` IS NULL THEN NULL ELSE strftime('%Y-%m-%dT%H:%M:%SZ', `snoozed_until`, 'unixepoch') END, `notification_mode`, `taper_offer_pending`, strftime('%Y-%m-%dT%H:%M:%SZ', `created_at`, 'unixepoch') FROM `push_subscriptions`;--> statement-breakpoint
DROP TABLE `push_subscriptions`;--> statement-breakpoint
ALTER TABLE `__new_push_subscriptions` RENAME TO `push_subscriptions`;--> statement-breakpoint
PRAGMA foreign_keys=ON;--> statement-breakpoint
PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_tags` (
	`id` integer PRIMARY KEY AUTOINCREMENT,
	`slug` text NOT NULL,
	`name` text NOT NULL,
	`description` text,
	`section` text,
	`section_display_order` integer,
	`created_at` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%SZ','now')) NOT NULL
);
--> statement-breakpoint
INSERT INTO `__new_tags`(`id`, `slug`, `name`, `description`, `section`, `section_display_order`, `created_at`) SELECT `id`, `slug`, `name`, `description`, `section`, `section_display_order`, strftime('%Y-%m-%dT%H:%M:%SZ', `created_at`, 'unixepoch') FROM `tags`;--> statement-breakpoint
DROP TABLE `tags`;--> statement-breakpoint
ALTER TABLE `__new_tags` RENAME TO `tags`;--> statement-breakpoint
PRAGMA foreign_keys=ON;--> statement-breakpoint
PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_user_progress` (
	`user_id` integer PRIMARY KEY,
	`current_cefr_level` text DEFAULT 'A1' NOT NULL,
	`updated_at` text,
	CONSTRAINT `fk_user_progress_user_id_users_id_fk` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE
);
--> statement-breakpoint
INSERT INTO `__new_user_progress`(`user_id`, `current_cefr_level`, `updated_at`) SELECT `user_id`, `current_cefr_level`, CASE WHEN `updated_at` IS NULL THEN NULL ELSE strftime('%Y-%m-%dT%H:%M:%SZ', `updated_at`, 'unixepoch') END FROM `user_progress`;--> statement-breakpoint
DROP TABLE `user_progress`;--> statement-breakpoint
ALTER TABLE `__new_user_progress` RENAME TO `user_progress`;--> statement-breakpoint
PRAGMA foreign_keys=ON;--> statement-breakpoint
PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_users` (
	`id` integer PRIMARY KEY AUTOINCREMENT,
	`code` text NOT NULL,
	`username` text,
	`display_name` text NOT NULL,
	`password_hash` text,
	`created_at` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%SZ','now')) NOT NULL,
	`freeze_count` integer DEFAULT 0 NOT NULL,
	`last_freeze_used_at` text,
	`freeze_used_for_date` text,
	`consecutive_days_at_earn` integer DEFAULT 0 NOT NULL
);
--> statement-breakpoint
INSERT INTO `__new_users`(`id`, `code`, `username`, `display_name`, `password_hash`, `created_at`, `freeze_count`, `last_freeze_used_at`, `freeze_used_for_date`, `consecutive_days_at_earn`) SELECT `id`, `code`, `username`, `display_name`, `password_hash`, strftime('%Y-%m-%dT%H:%M:%SZ', `created_at`, 'unixepoch'), `freeze_count`, CASE WHEN `last_freeze_used_at` IS NULL THEN NULL ELSE strftime('%Y-%m-%dT%H:%M:%SZ', `last_freeze_used_at`, 'unixepoch') END, `freeze_used_for_date`, `consecutive_days_at_earn` FROM `users`;--> statement-breakpoint
DROP TABLE `users`;--> statement-breakpoint
ALTER TABLE `__new_users` RENAME TO `users`;--> statement-breakpoint
PRAGMA foreign_keys=ON;--> statement-breakpoint
PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_vocabulary_progress` (
	`user_id` integer NOT NULL,
	`vocab_id` integer NOT NULL,
	`next_review_at` text,
	`interval_days` integer DEFAULT 1,
	`ease_factor` real DEFAULT 2.3,
	`review_count` integer DEFAULT 0,
	`last_reviewed_at` text,
	CONSTRAINT `vocabulary_reviews_pk` PRIMARY KEY(`user_id`, `vocab_id`),
	CONSTRAINT `fk_vocabulary_skills_user_id_users_id_fk` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE,
	CONSTRAINT `fk_vocabulary_skills_vocabulary_id_vocabulary_id_fk` FOREIGN KEY (`vocab_id`) REFERENCES `vocabulary`(`id`) ON DELETE CASCADE
);
--> statement-breakpoint
INSERT INTO `__new_vocabulary_progress`(`user_id`, `vocab_id`, `next_review_at`, `interval_days`, `ease_factor`, `review_count`, `last_reviewed_at`) SELECT `user_id`, `vocab_id`, CASE WHEN `next_review_at` IS NULL THEN NULL ELSE strftime('%Y-%m-%dT%H:%M:%SZ', `next_review_at`, 'unixepoch') END, `interval_days`, `ease_factor`, `review_count`, CASE WHEN `last_reviewed_at` IS NULL THEN NULL ELSE strftime('%Y-%m-%dT%H:%M:%SZ', `last_reviewed_at`, 'unixepoch') END FROM `vocabulary_progress`;--> statement-breakpoint
DROP TABLE `vocabulary_progress`;--> statement-breakpoint
ALTER TABLE `__new_vocabulary_progress` RENAME TO `vocabulary_progress`;--> statement-breakpoint
PRAGMA foreign_keys=ON;--> statement-breakpoint
PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_vocabulary` (
	`id` integer PRIMARY KEY AUTOINCREMENT,
	`greek_text` text NOT NULL,
	`english_translation` text NOT NULL,
	`word_type` text NOT NULL,
	`cefr_level` text,
	`frequency_rank` integer,
	`created_at` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%SZ','now')) NOT NULL,
	`metadata` text
);
--> statement-breakpoint
INSERT INTO `__new_vocabulary`(`id`, `greek_text`, `english_translation`, `word_type`, `cefr_level`, `frequency_rank`, `created_at`, `metadata`) SELECT `id`, `greek_text`, `english_translation`, `word_type`, `cefr_level`, `frequency_rank`, strftime('%Y-%m-%dT%H:%M:%SZ', `created_at`, 'unixepoch'), `metadata` FROM `vocabulary`;--> statement-breakpoint
DROP TABLE `vocabulary`;--> statement-breakpoint
ALTER TABLE `__new_vocabulary` RENAME TO `vocabulary`;--> statement-breakpoint
PRAGMA foreign_keys=ON;--> statement-breakpoint
CREATE UNIQUE INDEX `idx_auth_challenges_challenge` ON `auth_challenges` (`challenge`);--> statement-breakpoint
CREATE INDEX `idx_auth_challenges_expires` ON `auth_challenges` (`expires_at`);--> statement-breakpoint
CREATE INDEX `idx_drill_daily_user_drill` ON `drill_daily_results` (`user_id`,`drill_id`);--> statement-breakpoint
CREATE INDEX `idx_drill_progress_review` ON `drill_progress` (`user_id`,`drill_id`,`next_review_at`);--> statement-breakpoint
CREATE INDEX `idx_notification_logs_user` ON `notification_logs` (`user_id`);--> statement-breakpoint
CREATE INDEX `idx_notification_logs_sent_at` ON `notification_logs` (`sent_at`);--> statement-breakpoint
CREATE UNIQUE INDEX `idx_passkeys_credential_id` ON `passkeys` (`credential_id`);--> statement-breakpoint
CREATE INDEX `idx_passkeys_user` ON `passkeys` (`user_id`);--> statement-breakpoint
CREATE INDEX `idx_practice_attempts_session` ON `practice_attempts` (`session_id`);--> statement-breakpoint
CREATE INDEX `idx_practice_attempts_vocab` ON `practice_attempts` (`vocab_id`);--> statement-breakpoint
CREATE INDEX `idx_practice_attempts_drill` ON `practice_attempts` (`user_id`,`drill_id`,`attempted_at`);--> statement-breakpoint
CREATE INDEX `idx_practice_sessions_user_completed` ON `practice_sessions` (`user_id`,`completed_at`);--> statement-breakpoint
CREATE INDEX `idx_push_subscriptions_user` ON `push_subscriptions` (`user_id`);--> statement-breakpoint
CREATE UNIQUE INDEX `idx_push_subscriptions_endpoint` ON `push_subscriptions` (`endpoint`);--> statement-breakpoint
CREATE UNIQUE INDEX `idx_tags_slug` ON `tags` (`slug`);--> statement-breakpoint
CREATE INDEX `idx_tags_section_order` ON `tags` (`section`,`section_display_order`);--> statement-breakpoint
CREATE UNIQUE INDEX `idx_users_code` ON `users` (`code`);--> statement-breakpoint
CREATE UNIQUE INDEX `idx_users_username` ON `users` (`username`);--> statement-breakpoint
CREATE INDEX `idx_vocabulary_progress_user_review` ON `vocabulary_progress` (`user_id`,`next_review_at`);--> statement-breakpoint
CREATE INDEX `idx_vocabulary_word_type` ON `vocabulary` (`word_type`);--> statement-breakpoint
CREATE INDEX `idx_vocabulary_cefr` ON `vocabulary` (`cefr_level`);--> statement-breakpoint
CREATE UNIQUE INDEX `idx_vocabulary_greek_text` ON `vocabulary` (`greek_text`);
