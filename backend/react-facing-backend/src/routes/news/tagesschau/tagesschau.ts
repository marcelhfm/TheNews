import { Option } from "../../../utils/Option";
import { NewsSources } from "../news";
import { INewsPreview } from "../types";

interface ITagesschauNewsRes {
  externalId: string;
  title: string;
  date: string;
  firstSentence: string;
  detailsweb: string;
}

export class Tagesschau {
  private endpoint: string;
  constructor() {
    this.endpoint = process.env.TAGESSCHAU_ENDPOINT || "";
  }

  public async getLatestNews(): Promise<Option<INewsPreview[], Error>> {
    try {
      const response = await fetch(this.endpoint + "/api2/news");

      const body = await response.json();

      const news: INewsPreview[] = body.news.map((el: ITagesschauNewsRes) => {
        return {
          id: el.externalId,
          title: el.title,
          date: el.date,
          firstSentence: el.firstSentence,
          detailsLink: el.detailsweb,
          source: NewsSources.Tagesschau,
        };
      });

      const filteredNews = news.filter(
        (el) => el.firstSentence && el.detailsLink
      );

      return Option.Some(filteredNews);
    } catch (error) {
      return Option.None(error as Error);
    }
  }
}
