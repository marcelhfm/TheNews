import type { AppRouter } from "../../../../backend/react-facing-backend/src";
import { createTRPCReact } from "@trpc/react-query";

export const trpc = createTRPCReact<AppRouter>();
