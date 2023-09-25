import { Clerk, verifyToken } from "@clerk/backend";
import { Context, HonoRequest, Next } from "hono";
import { getCookie } from "hono/cookie";
import { fromPromise } from "../utils/try-catch";

export async function sessionMiddleware(c: Context, next: Next) {
  if (["/login", "/signup"].includes(c.req.path)) {
    await next();
    return;
  }

  const sessionToken = getCookie(c, "__session");

  if (!sessionToken) {
    return c.json({ message: "Unauthorized" }, 401);
  }

  const authorizedParties = c.env.AUTHORIZED_PARTIES.split(",")

  const authCheckResult = await fromPromise(
    verifyToken(sessionToken, {
      secretKey: c.env.CLERK_SECRET_KEY,
      authorizedParties,
      issuer: `https://${c.env.PUBLIC_CLERK_URL}`,
      skipJwksCache: true,
    }),
  );

  if (authCheckResult.isErr()) {
    console.log("authCheckResult", authCheckResult.unwrapErr());
    return c.json({ message: "Unauthorized" }, 401);
  }

  const jwt = authCheckResult.unwrap();

  const clerk = Clerk({
    secretKey: c.env.CLERK_SECRET_KEY,
  });

  const user = await clerk.users.getUser(jwt.sub);

  c.set("user", user);
  c.set("clerk", clerk);

  await next();
}
