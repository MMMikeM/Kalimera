CREATE TABLE `nominal_forms` (
	`id` integer PRIMARY KEY AUTOINCREMENT,
	`vocab_id` integer NOT NULL,
	`grammatical_case` text NOT NULL,
	`number` text NOT NULL,
	`form` text NOT NULL,
	`article` text,
	`gender` text,
	CONSTRAINT `fk_nominal_forms_vocab_id_vocabulary_id_fk` FOREIGN KEY (`vocab_id`) REFERENCES `vocabulary`(`id`) ON DELETE CASCADE
);
--> statement-breakpoint
CREATE INDEX `idx_nominal_forms_vocab` ON `nominal_forms` (`vocab_id`);--> statement-breakpoint
CREATE UNIQUE INDEX `idx_nominal_forms_unique_lexeme` ON `nominal_forms` (`vocab_id`,`grammatical_case`,`number`) WHERE "nominal_forms"."gender" IS NULL;--> statement-breakpoint
CREATE UNIQUE INDEX `idx_nominal_forms_unique_gendered` ON `nominal_forms` (`vocab_id`,`grammatical_case`,`number`,`gender`) WHERE "nominal_forms"."gender" IS NOT NULL;