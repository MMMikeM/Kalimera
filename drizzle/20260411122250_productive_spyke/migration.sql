ALTER TABLE `nominal_forms` ADD `gender_key` text DEFAULT '' NOT NULL;--> statement-breakpoint
UPDATE `nominal_forms` SET `gender_key` = `gender` WHERE `gender` IS NOT NULL;--> statement-breakpoint
DROP INDEX IF EXISTS `idx_nominal_forms_unique_lexeme`;--> statement-breakpoint
DROP INDEX IF EXISTS `idx_nominal_forms_unique_gendered`;--> statement-breakpoint
CREATE UNIQUE INDEX `idx_nominal_forms_unique` ON `nominal_forms` (`vocab_id`,`grammatical_case`,`number`,`gender_key`);