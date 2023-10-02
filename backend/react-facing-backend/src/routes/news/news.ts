import { Tagesschau } from "./tagesschau/tagesschau";
import { INewsPreview } from "./types";

export enum NewsSources {
  Tagesschau = "tagesschau",
}

export const news = async (): Promise<INewsPreview[]> => {
  const tagesschau = new Tagesschau();

  try {
    const tagesschauNewsOption = await tagesschau.getLatestNews();
    const tagesschauNews = tagesschauNewsOption.unwrap();

    return tagesschauNews;
  } catch (error) {
    console.log(`An error occurred while fetching news: ${error}`);
    throw error;
  }
};
