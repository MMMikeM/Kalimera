CREATE TABLE `vocabulary_opposites` (
	`word_a_id` integer NOT NULL,
	`word_b_id` integer NOT NULL,
	CONSTRAINT `vocabulary_opposites_pk` PRIMARY KEY(`word_a_id`, `word_b_id`),
	CONSTRAINT `fk_vocabulary_opposites_word_a_id_vocabulary_id_fk` FOREIGN KEY (`word_a_id`) REFERENCES `vocabulary`(`id`) ON DELETE CASCADE,
	CONSTRAINT `fk_vocabulary_opposites_word_b_id_vocabulary_id_fk` FOREIGN KEY (`word_b_id`) REFERENCES `vocabulary`(`id`) ON DELETE CASCADE
);
--> statement-breakpoint
CREATE UNIQUE INDEX `idx_vocabulary_opposites_a` ON `vocabulary_opposites` (`word_a_id`);--> statement-breakpoint
CREATE UNIQUE INDEX `idx_vocabulary_opposites_b` ON `vocabulary_opposites` (`word_b_id`);