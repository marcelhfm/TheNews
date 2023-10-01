import { NewsSources } from "./news";

export interface INewsPreview {
  id: string;
  title: string;
  source: NewsSources;
  date: string;
  firstSentence: string;
  detailsLink: string;
}
