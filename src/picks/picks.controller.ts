import { Context } from "hono";
import { games, picks, teams } from "../db.schema";
import { eq } from "drizzle-orm";
import { picksPostSchema } from "./picks.schema";
import { fromZodError } from "zod-validation-error";
import { fromPromise } from "../utils/try-catch";
import { LibsqlError } from "@libsql/client";
import { Ok, Result } from "@sniptt/monads";

type AllPicksQuery = { games: any; picks: any; teams: any };

export class PicksController {
  static async post(c: Context) {
    const parseJsonResult = await fromPromise(c.req.json());

    if (parseJsonResult.isErr()) {
      return c.json({ message: parseJsonResult.unwrapErr() }, 400);
    }

    const validated = await picksPostSchema.safeParseAsync(
      parseJsonResult.unwrap(),
    );

    if (!validated.success) {
      return c.json({ message: fromZodError(validated.error) }, 400);
    }

    const user = c.get("user");
    const db = c.get("db");
    const weekId = c.get("weekId");
    const { game_id, team_id, spread } = validated.data;

    const addPickResult = await fromPromise(
      db.insert(picks).values({
        userId: user.id,
        weekId,
        gameId: game_id,
        teamId: team_id,
        spread,
      }),
    );

    if (addPickResult.isErr()) {
      const err = addPickResult.unwrapErr();

      if (err instanceof LibsqlError && err.message.includes("UNIQUE")) {
        return c.json(
          { message: "You already picked this week", code: "ALREADY_PICKED" },
          400,
        );
      }

      return c.json({ message: err }, 400);
    }

    return c.json(undefined, 201);
  }

  static async all(c: Context) {
    const db = c.get("db");
    const clerk = c.get("clerk");

    const userList: any[] = await clerk.users.getUserList();

    const userMap = userList.reduce((acc, user) => {
      acc[user.id] = `${user.firstName} ${user.lastName}`;
      return acc;
    }, {});

    const picksQuery = await fromPromise<AllPicksQuery[]>(
      db
        .select()
        .from(picks)
        .innerJoin(teams, eq(picks.teamId, teams.teamId))
        .innerJoin(games, eq(picks.gameId, games.gameId))
        .orderBy(picks.weekId)
        .all(),
    );

    return picksQuery
      .andThen((p) => buildScoreboard(p, userMap))
      .match({
        ok: (scoreboard) => c.json(scoreboard),
        err: (err) => c.json({ message: err }, 400),
      });
  }

  static async get(c: Context) {
    console.log("get picks");
    const db = c.get("db");
    const user = c.get("user");

    const picksQuery = await fromPromise(
      db
        .select()
        .from(picks)
        .innerJoin(teams, eq(picks.teamId, teams.teamId))
        .innerJoin(games, eq(picks.gameId, games.gameId))
        .where(eq(picks.userId, user.id))
        .orderBy(picks.weekId)
        .all(),
    );

    return picksQuery.match({
      ok: (picks) => c.json(picks),
      err: (err) => c.json({ message: err }, 400),
    });
  }
}

function buildScoreboard(
  picks: { games: any; picks: any; teams: any }[],
  users: any[],
): Result<unknown, Error> {
  const scoreboard = picks.reduce((acc, pick) => {
    const { games, picks } = pick;

    if (!acc[picks.userId]) {
      const name = users[picks.userId];

      acc[picks.userId] = {
        name,
        wins: 0,
        losses: 0,
        ties: 0,
      };
    }

    const teamId = picks.teamId;
    const spread = picks.spread;

    const homeTeamId = games.homeTeamId;
    const awayTeamId = games.awayTeamId;

    const homeTeamScore = games.homeTeamScore;
    const awayTeamScore = games.awayTeamScore;

    if (teamId === homeTeamId) {
      if (homeTeamScore + spread > awayTeamScore) {
        acc[picks.userId].wins = acc[picks.userId].wins
          ? acc[picks.userId].wins + 1
          : 1;
      }

      if (homeTeamScore + spread === awayTeamScore) {
        acc[picks.userId].ties = acc[picks.userId].ties
          ? acc[picks.userId].ties + 1
          : 1;
      }

      acc[picks.userId].losses = acc[picks.userId].losses
        ? acc[picks.userId].losses + 1
        : 1;
    }

    if (teamId === awayTeamId) {
      if (awayTeamScore + spread > homeTeamScore) {
        acc[picks.userId].wins = acc[picks.userId].wins
          ? acc[picks.userId].wins + 1
          : 1;
      }

      if (awayTeamScore + spread === homeTeamScore) {
        acc[picks.userId].ties = acc[picks.userId].ties
          ? acc[picks.userId].ties + 1
          : 1;
      }

      acc[picks.userId].losses = acc[picks.userId].losses
        ? acc[picks.userId].losses + 1
        : 1;
    }

    return acc;
  }, {});

  return Ok(Object.values(scoreboard));
}
