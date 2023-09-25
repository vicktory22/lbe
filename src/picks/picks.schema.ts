import { z } from "zod";

export const picksPostSchema = z.object({
  game_id: z.number(),
  team_id: z.number(),
  spread: z.number(),
});
