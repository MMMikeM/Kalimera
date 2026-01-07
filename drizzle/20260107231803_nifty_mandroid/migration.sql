CREATE TABLE `milestones_achieved` (
	`id` integer PRIMARY KEY AUTOINCREMENT,
	`user_id` integer NOT NULL,
	`milestone` integer NOT NULL,
	`achieved_at` integer DEFAULT (unixepoch()) NOT NULL,
	`streak_at_achievement` integer NOT NULL,
	CONSTRAINT `fk_milestones_achieved_user_id_users_id_fk` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE
);
--> statement-breakpoint
CREATE UNIQUE INDEX `idx_milestones_user_milestone` ON `milestones_achieved` (`user_id`,`milestone`);