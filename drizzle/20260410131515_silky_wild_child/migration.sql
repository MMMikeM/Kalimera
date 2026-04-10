CREATE TABLE `notification_logs` (
	`id` integer PRIMARY KEY AUTOINCREMENT,
	`user_id` integer NOT NULL,
	`sent_at` integer,
	`type` text NOT NULL,
	`tapped_action` text,
	`tapped_at` integer,
	CONSTRAINT `fk_notification_logs_user_id_users_id_fk` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE
);
--> statement-breakpoint
CREATE INDEX `idx_notification_logs_user` ON `notification_logs` (`user_id`);--> statement-breakpoint
CREATE INDEX `idx_notification_logs_sent_at` ON `notification_logs` (`sent_at`);