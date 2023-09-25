import { Context } from "hono";
import { games, teams } from "../db.schema";
import { eq } from "drizzle-orm";
import { alias } from "drizzle-orm/sqlite-core";

export class GamesController {
  static async get(c: Context) {
    const db = c.get("db");
    const weekId = c.get("weekId");

    const homeTeam = alias(teams, "homeTeam");
    const awayTeam = alias(teams, "awayTeam");

    const gamesQuery = await db
      .select()
      .from(games)
      .innerJoin(homeTeam, eq(games.homeTeamId, homeTeam.teamId))
      .innerJoin(awayTeam, eq(games.awayTeamId, awayTeam.teamId))
      .where(eq(games.weekId, weekId))
      .orderBy(games.gameTime)
      .all();

    console.log(gamesQuery);

    return c.json(gamesQuery);
  }
}
