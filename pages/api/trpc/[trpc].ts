import * as trpc from "@trpc/server";
import * as trpcNext from "@trpc/server/adapters/next";
import { z } from "zod";
import superjson from "superjson";
import { prisma } from "../../../db/client";

export const appRouter = trpc
  .router()
  .transformer(superjson)
  .query("getUser", {
    input: z
      .object({
        userId: z.string(),
      })
      .nullish(),
    async resolve({ input }) {
      return await prisma.user.findUnique({
        where: {
          id: input?.userId,
        },
      });
    },
  })
  .query("getLinks", {
    input: z
      .object({
        userId: z.string(),
      })
      .nullish(),
    async resolve({ input }) {
      return await prisma.links.findMany({
        where: {
          userId: input?.userId,
        },
      });
    },
  })
  .mutation("createUser", {
    input: z.object({
      userId: z.string(),
      name: z.string(),
      email: z.string(),
      image: z.string(),
    }),
    async resolve({ input }) {
      return await prisma.user.create({
        data: {
          id: input?.userId!,
          name: input?.name!,
          email: input?.email!,
          image: input?.image!,
        },
      });
    },
  })
  .mutation("createLink", {
    input: z.object({
      userId: z.string(),
      text: z.string(),
      docs: z.string(),
    }),
    async resolve({ input }) {
      return await prisma.links.create({
        data: {
          userId: input?.userId!,
          text: input?.text!,
          docs: input?.docs!,
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
