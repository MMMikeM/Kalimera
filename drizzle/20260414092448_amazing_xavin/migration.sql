CREATE TABLE `adjective_details` (
	`vocab_id` integer PRIMARY KEY,
	`pattern` text NOT NULL,
	CONSTRAINT `fk_adjective_details_vocab_id_vocabulary_id_fk` FOREIGN KEY (`vocab_id`) REFERENCES `vocabulary`(`id`) ON DELETE CASCADE
);
--> statement-breakpoint
ALTER TABLE `vocabulary` RENAME COLUMN `difficulty_level` TO `cefr_level`;--> statement-breakpoint
ALTER TABLE `vocabulary` ADD `frequency_rank` integer;--> statement-breakpoint
PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_noun_details` (
	`vocab_id` integer PRIMARY KEY,
	`gender` text NOT NULL,
	`declension_pattern` text NOT NULL,
	CONSTRAINT `fk_noun_details_vocab_id_vocabulary_id_fk` FOREIGN KEY (`vocab_id`) REFERENCES `vocabulary`(`id`) ON DELETE CASCADE
);
--> statement-breakpoint
INSERT INTO `__new_noun_details`(`vocab_id`, `gender`, `declension_pattern`) SELECT `vocab_id`, `gender`, `declension_pattern` FROM `noun_details`;--> statement-breakpoint
DROP TABLE `noun_details`;--> statement-breakpoint
ALTER TABLE `__new_noun_details` RENAME TO `noun_details`;--> statement-breakpoint
PRAGMA foreign_keys=ON;--> statement-breakpoint
PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_vocabulary` (
	`id` integer PRIMARY KEY AUTOINCREMENT,
	`greek_text` text NOT NULL,
	`english_translation` text NOT NULL,
	`word_type` text NOT NULL,
	`cefr_level` text,
	`frequency_rank` integer,
	`created_at` integer DEFAULT (unixepoch()) NOT NULL,
	`metadata` text
);
--> statement-breakpoint
INSERT INTO `__new_vocabulary`(`id`, `greek_text`, `english_translation`, `word_type`, `cefr_level`, `created_at`, `metadata`) SELECT `id`, `greek_text`, `english_translation`, `word_type`, `cefr_level`, `created_at`, `metadata` FROM `vocabulary`;--> statement-breakpoint
DROP TABLE `vocabulary`;--> statement-breakpoint
ALTER TABLE `__new_vocabulary` RENAME TO `vocabulary`;--> statement-breakpoint
PRAGMA foreign_keys=ON;--> statement-breakpoint
DROP INDEX IF EXISTS `idx_vocabulary_difficulty`;--> statement-breakpoint
CREATE INDEX `idx_vocabulary_word_type` ON `vocabulary` (`word_type`);--> statement-breakpoint
CREATE INDEX `idx_vocabulary_cefr` ON `vocabulary` (`cefr_level`);--> statement-breakpoint
CREATE UNIQUE INDEX `idx_vocabulary_greek_text` ON `vocabulary` (`greek_text`);