ALTER TABLE `tags` ADD `section` text;--> statement-breakpoint
ALTER TABLE `tags` ADD `section_display_order` integer;--> statement-breakpoint
ALTER TABLE `vocabulary_tags` ADD `display_order` integer;--> statement-breakpoint
CREATE INDEX `idx_tags_section_order` ON `tags` (`section`,`section_display_order`);--> statement-breakpoint
CREATE INDEX `idx_vocabulary_tags_tag_order` ON `vocabulary_tags` (`tag_id`,`display_order`);--> statement-breakpoint
UPDATE `tags`
SET
	`section` = (
		SELECT `tag_sections`.`section`
		FROM `tag_sections`
		WHERE `tag_sections`.`tag_id` = `tags`.`id`
	),
	`section_display_order` = (
		SELECT `tag_sections`.`display_order`
		FROM `tag_sections`
		WHERE `tag_sections`.`tag_id` = `tags`.`id`
	)
WHERE EXISTS (
	SELECT 1
	FROM `tag_sections`
	WHERE `tag_sections`.`tag_id` = `tags`.`id`
);--> statement-breakpoint
DROP TABLE `tag_sections`;