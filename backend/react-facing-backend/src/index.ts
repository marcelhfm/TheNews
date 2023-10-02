import { health } from "./routes/health/health";
import cors from "cors";
import { news } from "./routes/news/news";
import { inferAsyncReturnType, initTRPC } from "@trpc/server";
import { logRequest } from "./middleware/loggerMiddleware";

import * as trpcExpress from "@trpc/server/adapters/express";
import express from "express";
import { auth } from "express-oauth2-jwt-bearer";

const createContext = ({
  req,
  res,
}: trpcExpress.CreateExpressContextOptions) => ({});

type Context = inferAsyncReturnType<typeof createContext>;

const PORT = Number(process.env.PORT) || 3000;

const t = initTRPC.context<Context>().create();
const middleware = t.middleware;
const publicProcedure = t.procedure;
const router = t.router;

const loggerMiddleware = middleware(async (opts) => {
  const result = await opts.next();
  logRequest(opts, result);
  return result;
});

const loggedProcedure = publicProcedure.use(loggerMiddleware);

const appRouter = router({
  health: loggedProcedure.query(async () => await health()),
  news: loggedProcedure.query(async () => await news()),
});

const app = express();
app.use(cors());

app.use(
  auth({
    audience: process.env.AUDIENCE,
    issuerBaseURL: process.env.ISSUER_BASE_URL,
    tokenSigningAlg: "RS256",
  })
);

app.use(
  "/",
  trpcExpress.createExpressMiddleware({
    router: appRouter,
    createContext,
  })
);

console.log(`Server running on port ${PORT}`);
app.listen(PORT);

export type AppRouter = typeof appRouter;
