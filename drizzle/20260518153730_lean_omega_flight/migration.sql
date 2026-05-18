ALTER TABLE `vocab_daily_results` RENAME TO `drill_daily_results`;--> statement-breakpoint
ALTER TABLE `vocab_mastery` RENAME TO `drill_progress`;--> statement-breakpoint
ALTER TABLE `vocabulary_reviews` RENAME TO `vocabulary_progress`;--> statement-breakpoint
DROP INDEX IF EXISTS `idx_vocab_daily_user_drill`;--> statement-breakpoint
DROP INDEX IF EXISTS `idx_vocab_mastery_review`;--> statement-breakpoint
DROP INDEX IF EXISTS `idx_vocabulary_reviews_user_review`;--> statement-breakpoint
CREATE INDEX `idx_drill_daily_user_drill` ON `drill_daily_results` (`user_id`,`drill_id`);--> statement-breakpoint
CREATE INDEX `idx_drill_progress_review` ON `drill_progress` (`user_id`,`drill_id`,`next_review_at`);--> statement-breakpoint
CREATE INDEX `idx_vocabulary_progress_user_review` ON `vocabulary_progress` (`user_id`,`next_review_at`);