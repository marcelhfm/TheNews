import { PrismaClient, Prisma } from "@prisma/client";
import { DefaultArgs } from "@prisma/client/runtime/library";
import { TRPCError } from "@trpc/server";

export const newsSettings = async (
  opts: { input: { userId: string } },
  prisma: PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs>
) => {
  try {
    const { input } = opts;
    const allUserSettings = await prisma.userNewsSettings.findMany({
      where: { userId: { equals: input.userId } },
    });

    if (allUserSettings.length === 0) {
      console.log(`No news settings found for ${input.userId}`);
      throw new TRPCError({ code: "NOT_FOUND" });
    }
  } catch (error) {
    if (error instanceof TRPCError) {
      if (error.code === "NOT_FOUND") {
        throw error;
      }
    }

    console.log(
      `Error fetching news settings for user ${opts.input.userId}: ${error}`
    );

    throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
  }
};
