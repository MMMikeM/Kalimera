ALTER TABLE `users` ADD `freeze_count` integer DEFAULT 0 NOT NULL;--> statement-breakpoint
ALTER TABLE `users` ADD `last_freeze_used_at` integer;--> statement-breakpoint
ALTER TABLE `users` ADD `freeze_used_for_date` text;--> statement-breakpoint
ALTER TABLE `users` ADD `consecutive_days_at_earn` integer DEFAULT 0 NOT NULL;