CREATE TABLE IF NOT EXISTS `teams` (
	`team_id` integer PRIMARY KEY NOT NULL,
	`abbreviation` text NOT NULL,
	`display_name` text NOT NULL,
	`short_name` text NOT NULL,
	`color` text NOT NULL,
	`logo` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS `teams_team_id_unique` ON `teams` (`team_id`);
