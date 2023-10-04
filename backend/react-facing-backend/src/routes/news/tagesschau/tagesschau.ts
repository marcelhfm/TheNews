import { Option } from "../../../utils/Option";
import { NewsSources } from "../news";
import { IContentPart, INewsDetails, INewsPreview } from "../types";

interface ITagesschauNewsRes {
  externalId: string;
  title: string;
  date: string;
  firstSentence: string;
  detailsweb: string;
  details: string;
}

interface IContentRes {
  value?: string;
  type?: "text" | "headline" | "quotation" | "image";
  gallery?: { imageVariants: Record<string, string> };
  quotation?: {
    text: string;
  };
}

export class Tagesschau {
  private static instance: Tagesschau | null = null; // Singleton instance
  private endpoint: string;

  private constructor() {
    this.endpoint = process.env.TAGESSCHAU_ENDPOINT || "";
  }

  public static getInstance(): Tagesschau {
    if (Tagesschau.instance === null) {
      Tagesschau.instance = new Tagesschau();
    }
    return Tagesschau.instance;
  }

  private removeHtmlTags(input: string): string {
    // Define a regular expression to match HTML tags
    const htmlTagsRegex = /<[^>]*>/g;

    // Use the replace method to remove all HTML tags from the input string
    const result = input.replace(htmlTagsRegex, "");

    return result;
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
          detailsRequestUrl: el.details,
        };
      });

      const filteredNews = news.filter(
        (el) => el.firstSentence && el.detailsLink
      );

      return Option.Some(filteredNews);
    } catch (error) {
      console.log("An error occurred while fetching Tagesschau News", error);
      return Option.None(error as Error);
    }
  }

  public async getDetailsNews(
    detailsUrl: string
  ): Promise<Option<INewsDetails, Error>> {
    try {
      const response = await fetch(detailsUrl);
      const body = await response.json();
      const content: IContentPart[] = [];

      body.content.forEach((el: IContentRes) => {
        if (el.gallery) {
          content.push({
            type: "image",
            value: el?.gallery?.imageVariants,
          });
        } else if (el.quotation) {
          content.push({
            type: "quotation",
            value: el.quotation.text,
          });
        } else if (el.value && el.type) {
          content.push({
            value: this.removeHtmlTags(el.value),
            type: el.type,
          });
        }
      });

      const formattedResponse: INewsDetails = {
        title: body.title,
        content,
        source: NewsSources.Tagesschau,
        date: body.date,
      };

      return Option.Some(formattedResponse);
    } catch (error) {
      console.log(
        "An error occurred while fetching Tagesschau news details",
        error
      );
      return Option.None(error as Error);
    }
  }
}
