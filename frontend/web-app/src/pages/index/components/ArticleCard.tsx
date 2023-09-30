import { Card, Heading, Separator } from "@radix-ui/themes";

interface IArticleCard {
  headingText: string;
  children: React.ReactNode;
}

export const ArticleCard = ({ headingText, children }: IArticleCard) => {
  return (
    <Card>
      <Heading weight="bold" size="5">
        {headingText}
        <Separator my="3" size="4" />
        {children}
      </Heading>
    </Card>
  );
};
