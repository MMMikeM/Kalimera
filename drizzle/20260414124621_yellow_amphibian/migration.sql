CREATE TABLE `user_progress` (
	`user_id` integer PRIMARY KEY,
	`current_cefr_level` text DEFAULT 'A1' NOT NULL,
	`updated_at` integer,
	CONSTRAINT `fk_user_progress_user_id_users_id_fk` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE
);
