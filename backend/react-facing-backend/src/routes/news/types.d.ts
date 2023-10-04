import { NewsSources } from "./news";

export interface INewsPreview {
  id: string;
  title: string;
  source: NewsSources;
  date: string;
  firstSentence: string;
  detailsLink?: string;
  detailsRequestUrl?: string;
}

export interface IContentPart {
  value: string | Record<string, string>;
  type: "text" | "headline" | "quotation" | "image";
}

export interface INewsDetails {
  title: string;
  content: IContentPart[];
  source: NewsSources;
  date: string;
}
