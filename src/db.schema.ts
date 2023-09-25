import { sqliteTable, integer, text, unique } from "drizzle-orm/sqlite-core";
import { sql } from "drizzle-orm";

export const games = sqliteTable("games", {
	gameId: integer("game_id").primaryKey().notNull(),
	weekId: integer("week_id").notNull(),
	homeTeamId: integer("home_team_id").notNull(),
	homeTeamScore: integer("home_team_score"),
	awayTeamId: integer("away_team_id").notNull(),
	awayTeamScore: integer("away_team_score"),
	gameTime: integer("game_time")
		.default(sql`(strftime('%s', 'now'))`)
		.notNull(),
	spread: integer("spread"),
	createdAt: integer("created_at").default(sql`(strftime('%s', 'now'))`),
	updatedAt: integer("updated_at").default(sql`(strftime('%s', 'now'))`),
});

export const picks = sqliteTable(
	"picks",
	{
		id: integer("id").primaryKey({ autoIncrement: true }).notNull(),
		userId: text("user_id").notNull(),
		weekId: integer("week_id").notNull(),
		gameId: integer("game_id").notNull(),
		teamId: integer("team_id").notNull(),
		spread: integer("spread").notNull(),
		createdAt: integer("created_at").default(sql`(strftime('%s', 'now'))`),
		updatedAt: integer("updated_at").default(sql`(strftime('%s', 'now'))`),
	},
	(t) => ({
		unq: unique().on(t.userId, t.weekId),
	}),
);

export const teams = sqliteTable("teams", {
	teamId: integer("team_id").primaryKey().notNull().unique(),
	abbreviation: text("abbreviation").notNull(),
	displayName: text("display_name").notNull(),
	shortName: text("short_name").notNull(),
	color: text("color").notNull(),
	logo: text("logo").notNull(),
});

