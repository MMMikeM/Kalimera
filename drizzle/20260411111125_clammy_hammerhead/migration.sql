CREATE TABLE `noun_details` (
	`vocab_id` integer PRIMARY KEY,
	`gender` text NOT NULL,
	`declension_pattern` text,
	CONSTRAINT `fk_noun_details_vocab_id_vocabulary_id_fk` FOREIGN KEY (`vocab_id`) REFERENCES `vocabulary`(`id`) ON DELETE CASCADE
);
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS `idx_vocabulary_tags_tag_order` ON `vocabulary_tags` (`tag_id`,`display_order`);--> statement-breakpoint
ALTER TABLE `vocabulary` DROP COLUMN `gender`;--> statement-breakpoint
ALTER TABLE `vocabulary` DROP COLUMN `declension_pattern`;