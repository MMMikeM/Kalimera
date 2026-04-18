ALTER TABLE `practice_attempts` ADD `drill_id` text;--> statement-breakpoint
CREATE INDEX `idx_practice_attempts_drill` ON `practice_attempts` (`user_id`,`drill_id`,`attempted_at`);