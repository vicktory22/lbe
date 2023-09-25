import { Context } from "hono";
import { fromPromise } from "../utils/try-catch";
import { Ok, Result } from "@sniptt/monads";

type User = {
  id: string;
  firstName: string;
  lastName: string;
};

export class PlayersController {
  static async get(c: Context) {
    const clerk = c.get("clerk");

    const users = await fromPromise<User[]>(clerk.users.getUserList());

    return users.andThen(mapNames).match({
      ok: (picks) => c.json(picks),
      err: (err) => c.json({ message: err }, 400),
    });
  }
}

function mapNames(users: User[]): Result<string[], Error> {
  return Ok(users.map((user) => `${user.firstName} ${user.lastName}`));
}
