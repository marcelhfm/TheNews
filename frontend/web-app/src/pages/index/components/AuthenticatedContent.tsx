import { trpc } from "../../../utils/trpc";
import { ArticleCard } from "./ArticleCard";
import { LoadingSpinner } from "../../../components/LoadingSpinner";
import { Text } from "@radix-ui/themes";

export const AuthenticatedContent = () => {
  const newsQuery = trpc.news.useQuery();

  return (
    <>
      {newsQuery.isLoading ? (
        <LoadingSpinner />
      ) : (
        newsQuery.data?.map((el) => (
          <ArticleCard
            key={el.id}
            headingText={el.title}
            detailLink={el.detailsLink}
            source={el.source}
          >
            {el.firstSentence && (
              <Text weight="regular" size="3">
                {el.firstSentence}
              </Text>
            )}
            {}
          </ArticleCard>
        ))
      )}
    </>
  );
};
