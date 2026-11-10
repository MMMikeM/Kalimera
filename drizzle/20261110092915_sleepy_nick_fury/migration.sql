CREATE TABLE `step_progress` (
	`user_id` integer NOT NULL,
	`step_id` text NOT NULL,
	`passed_days` integer DEFAULT 0 NOT NULL,
	`last_passed_on` text,
	`ticked_at` text,
	`brush_ups` integer DEFAULT 0 NOT NULL,
	`next_brush_up_at` text,
	CONSTRAINT `step_progress_pk` PRIMARY KEY(`user_id`, `step_id`),
	CONSTRAINT `fk_step_progress_user_id_users_id_fk` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE
);
