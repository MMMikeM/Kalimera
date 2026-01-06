CREATE TABLE `verb_conjugations` (
	`id` integer PRIMARY KEY AUTOINCREMENT,
	`vocab_id` integer NOT NULL,
	`tense` text NOT NULL,
	`person` text NOT NULL,
	`form` text NOT NULL,
	`stem` text,
	`ending` text,
	CONSTRAINT `fk_verb_conjugations_vocab_id_vocabulary_id_fk` FOREIGN KEY (`vocab_id`) REFERENCES `vocabulary`(`id`) ON DELETE CASCADE
);
--> statement-breakpoint
CREATE TABLE `verb_imperatives` (
	`id` integer PRIMARY KEY AUTOINCREMENT,
	`vocab_id` integer NOT NULL,
	`aspect` text NOT NULL,
	`number` text NOT NULL,
	`form` text NOT NULL,
	CONSTRAINT `fk_verb_imperatives_vocab_id_vocabulary_id_fk` FOREIGN KEY (`vocab_id`) REFERENCES `vocabulary`(`id`) ON DELETE CASCADE
);
--> statement-breakpoint
ALTER TABLE `verb_details` ADD `present_stem` text;--> statement-breakpoint
ALTER TABLE `verb_details` ADD `aorist_stem` text;--> statement-breakpoint
ALTER TABLE `verb_details` ADD `future_stem` text;--> statement-breakpoint
ALTER TABLE `verb_details` ADD `is_suppletive` integer;--> statement-breakpoint
CREATE INDEX `idx_verb_conjugations_vocab` ON `verb_conjugations` (`vocab_id`);--> statement-breakpoint
CREATE INDEX `idx_verb_conjugations_vocab_tense` ON `verb_conjugations` (`vocab_id`,`tense`);--> statement-breakpoint
CREATE UNIQUE INDEX `idx_verb_conjugations_unique` ON `verb_conjugations` (`vocab_id`,`tense`,`person`);--> statement-breakpoint
CREATE INDEX `idx_verb_imperatives_vocab` ON `verb_imperatives` (`vocab_id`);--> statement-breakpoint
CREATE UNIQUE INDEX `idx_verb_imperatives_unique` ON `verb_imperatives` (`vocab_id`,`aspect`,`number`);