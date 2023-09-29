import { createHTTPServer } from "@trpc/server/adapters/standalone";
import { health } from "./routes/health/health";
import { publicProcedure, router } from "./trpc";
import cors from "cors";

const PORT = Number(process.env.PORT) || 3000;

const appRouter = router({
  health: publicProcedure.query(health),
});

const server = createHTTPServer({
  router: appRouter,
  middleware: cors(),
});

console.log(`Server running on port ${PORT}`);
server.listen(PORT);

export type AppRouter = typeof appRouter;
