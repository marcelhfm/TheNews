import { TRPCError } from "@trpc/server";
import { Tagesschau } from "./tagesschau/tagesschau";
import { INewsPreview } from "./types";

export enum NewsSources {
  Tagesschau = "tagesschau",
}

export const news = async (): Promise<INewsPreview[]> => {
  const tagesschau = Tagesschau.getInstance();

  try {
    const tagesschauNewsOption = await tagesschau.getLatestNews();
    const tagesschauNews = tagesschauNewsOption.unwrap();

    return tagesschauNews;
  } catch (error) {
    throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
  }
};
