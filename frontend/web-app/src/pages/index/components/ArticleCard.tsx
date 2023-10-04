import { Avatar, Card, Flex, Heading, Separator, Text } from "@radix-ui/themes";
import { NewsSources } from "../../../../../../backend/react-facing-backend/src/routes/news/news";
import { useNavigate } from "react-router-dom";
import { formatDate } from "../../../utils/formatDate";

interface IArticleCard {
  headingText: string;
  children?: React.ReactNode;
  detailsRequestUrl?: string;
  detailsLink?: string;
  source: NewsSources;
  date: string;
}

enum SourceLogo {
  "tagesschau" = "/TagesschauLogo.jpg",
}

export const ArticleCard = ({
  headingText,
  children,
  detailsLink,
  detailsRequestUrl,
  source,
  date,
}: IArticleCard) => {
  const sourceLogo = SourceLogo[source];
  const navigate = useNavigate();

  const onCardClick = () => {
    if (!detailsRequestUrl && detailsLink) {
      window.location.replace(detailsLink);
    }

    navigate(`/news/${encodeURIComponent(detailsRequestUrl || "")}`);
  };

  return (
    <Card
      style={{ marginBottom: "24px", cursor: "pointer" }}
      onClick={() => onCardClick()}
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
      <Text size="2" color="gray">
        {formatDate(new Date(date))} | via {source}
      </Text>
      {children && <Separator my="3" size="4" />}
      {children}
    </Card>
  );
};
