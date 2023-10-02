import { Box, Container, Heading, Text } from "@radix-ui/themes";
import { trpc } from "../../utils/trpc";
import { PageWrapper } from "../../components/PageWrapper";
import { ArticleCard } from "./components/ArticleCard";
import { LoadingSpinner } from "../../components/LoadingSpinner";

export const IndexPage = () => {
  const newsQuery = trpc.news.useQuery();

  return (
    <PageWrapper>
      <Box style={{ padding: "24px" }}>
        <Container>
          <Heading size="8">Your News</Heading>
          <Heading size="6" style={{ marginBottom: "24px" }}>
            Handpicked For You
          </Heading>
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
        </Container>
      </Box>
    </PageWrapper>
  );
};
