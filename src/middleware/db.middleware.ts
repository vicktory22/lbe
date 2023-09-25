import { createClient } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";
import { Context, Next } from "hono";

export async function dbMiddleware(c: Context, next: Next) {
  c.set("db", drizzle(createClient({ url: c.env.DB_URL, authToken: c.env.DB_AUTH_TOKEN })));

  await next();
}
