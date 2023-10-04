import { TRPCError } from "@trpc/server";
import { Tagesschau } from "./tagesschau/tagesschau";
import { INewsDetails } from "./types";

export const newsDetail = async (opts: {
  input: any;
}): Promise<INewsDetails> => {
  const { input } = opts;
  const tagesschau = Tagesschau.getInstance();

  try {
    const tagesschauDetails = await tagesschau.getDetailsNews(
      input.detailsRequestUrl
    );

    return tagesschauDetails.unwrap();
  } catch (error) {
    throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
  }
};
