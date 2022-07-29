import * as trpc from "@trpc/server";
import * as trpcNext from "@trpc/server/adapters/next";
import { z } from "zod";
import superjson from "superjson";
import { prisma } from "../../../db/client";

// const [id, setId] = useState<string | undefined>(session?.user?.name);

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
      return await prisma.user.findMany({
        where: {
          id: input?.userId,
        },
        include: {
          links: true,
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
  });

// export type definition of API
export type AppRouter = typeof appRouter;

// export API handler
export default trpcNext.createNextApiHandler({
  router: appRouter,
  createContext: () => null,
});
