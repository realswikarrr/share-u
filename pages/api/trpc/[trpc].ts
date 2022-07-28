import * as trpc from "@trpc/server";
import * as trpcNext from "@trpc/server/adapters/next";
import { z } from "zod";
import superjson from "superjson";
import { prisma } from "../../../db/client";

export const appRouter = trpc
  .router()
  .transformer(superjson)
  .query("getLinks", {
    async resolve() {
      return await prisma.user.findMany({
        include: {
          links: true,
        },
      });
    },
  });

// export type definition of API
export type AppRouter = typeof appRouter;

// export API handler
export default trpcNext.createNextApiHandler({
  router: appRouter,
  createContext: () => null,
});
