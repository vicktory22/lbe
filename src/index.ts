import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { logger } from 'hono/logger';
import { PicksController } from './picks/picks.controller';
import { GamesController } from './games/games.controller';
import { sessionMiddleware } from './middleware/session.middleware';
import { dbMiddleware } from './middleware/db.middleware';
import { weekMiddleware } from './middleware/week.middleware';
import { PlayersController } from './players/players.controller';

const app = new Hono();

app.use("*", async (c, next) => {
  const handler = cors({ origin: c.env?.CORS_ORIGIN as string, credentials: true });
  await handler(c, next);
});
app.use("*", logger());
app.use("*", sessionMiddleware);
app.use("*", dbMiddleware);
app.use("*", weekMiddleware);

app.get('/players', PlayersController.get);
app.get('/picks', PicksController.get);
app.get('/picks/all', PicksController.all);
app.post('/picks', PicksController.post);
app.get('/games', GamesController.get);

export default app;
