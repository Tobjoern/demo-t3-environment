import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const ExampleDeleteInput = z.object({
  id: z.string(),
});

export const exampleRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.example.findMany();
  }),
  deleteSingle: publicProcedure
    .input(ExampleDeleteInput)
    .mutation(({ ctx, input }) => {
      return ctx.prisma.example.delete({
        where: {
          id: input.id,
        },
      });
    }),
});
