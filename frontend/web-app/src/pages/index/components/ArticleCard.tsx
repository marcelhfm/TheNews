import { Avatar, Card, Flex, Heading, Separator } from "@radix-ui/themes";
import { NewsSources } from "../../../../../../backend/react-facing-backend/src/routes/news/news";

interface IArticleCard {
  headingText: string;
  children?: React.ReactNode;
  detailLink: string;
  source: NewsSources;
}

enum SourceLogo {
  "tagesschau" = "/TagesschauLogo.jpg",
}

export const ArticleCard = ({
  headingText,
  children,
  detailLink,
  source,
}: IArticleCard) => {
  const sourceLogo = SourceLogo[source];

  return (
    <Card
      style={{ marginBottom: "24px", cursor: "pointer" }}
      onClick={() => window.location.replace(detailLink)}
    >
      <Flex align={"center"} justify={"between"}>
        <Heading weight="bold" size="5">
          {headingText}
        </Heading>
        <Flex align={"center"} style={{ marginLeft: "10px" }}>
          <Avatar
            size="2"
            fallback="T"
            src={sourceLogo}
            alt="Tagesschau Logo"
            style={{ height: "50px", width: "50px" }}
          />
        </Flex>
      </Flex>
      {children && <Separator my="3" size="4" />}
      {children}
    </Card>
  );
};
