CREATE TABLE IF NOT EXISTS `games` (
	`game_id` integer PRIMARY KEY NOT NULL,
	`week_id` integer NOT NULL,
	`home_team_id` integer NOT NULL,
	`home_team_score` integer,
	`away_team_id` integer NOT NULL,
	`away_team_score` integer,
	`game_time` integer DEFAULT (strftime('%s', 'now')) NOT NULL,
	`spread` integer,
	`created_at` integer DEFAULT (strftime('%s', 'now')),
	`updated_at` integer DEFAULT (strftime('%s', 'now'))
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS `picks` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`user_id` text NOT NULL,
	`week_id` integer NOT NULL,
	`game_id` integer NOT NULL,
	`team_id` integer NOT NULL,
	`spread` integer NOT NULL,
	`created_at` integer DEFAULT (strftime('%s', 'now')),
	`updated_at` integer DEFAULT (strftime('%s', 'now'))
);
--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS `picks_user_id_week_id_unique` ON `picks` (`user_id`,`week_id`);
