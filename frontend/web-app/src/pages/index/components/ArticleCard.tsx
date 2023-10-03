import { Avatar, Card, Flex, Heading, Separator, Text } from "@radix-ui/themes";
import { NewsSources } from "../../../../../../backend/react-facing-backend/src/routes/news/news";
import { useTranslation } from "react-i18next";

interface IArticleCard {
  headingText: string;
  children?: React.ReactNode;
  detailLink: string;
  source: NewsSources;
  date: string;
}

enum SourceLogo {
  "tagesschau" = "/TagesschauLogo.jpg",
}

export const ArticleCard = ({
  headingText,
  children,
  detailLink,
  source,
  date,
}: IArticleCard) => {
  const sourceLogo = SourceLogo[source];
  const { t } = useTranslation();

  function formatDate(date: Date): string {
    const minutesText = t("IndexPage.Authenticated.MinutesAgo");

    const now = new Date();
    const diffInMilliseconds = now.getTime() - date.getTime();

    if (diffInMilliseconds < 60 * 60 * 1000) {
      // Less than an hour ago
      const minutesAgo = Math.floor(diffInMilliseconds / (60 * 1000));
      return minutesText.replace("XXX", minutesAgo.toString());
    } else if (
      now.getDate() === date.getDate() &&
      now.getMonth() === date.getMonth() &&
      now.getFullYear() === date.getFullYear()
    ) {
      // Today
      const formatter = new Intl.DateTimeFormat("de-DE", {
        hour: "2-digit",
        minute: "2-digit",
      });
      return formatter.format(date);
    } else {
      // Older than today
      const formatter = new Intl.DateTimeFormat("de-DE", {
        day: "numeric",
        month: "short",
        hour: "2-digit",
        minute: "2-digit",
      });
      return formatter.format(date);
    }
  }

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
      <Text size="2" color="gray">
        {formatDate(new Date(date))} | via {source}
      </Text>

      {children && <Separator my="3" size="4" />}
      {children}
    </Card>
  );
};
