import { Box, Container, Heading, Text } from "@radix-ui/themes";
import { trpc } from "../../utils/trpc";
import { PageWrapper } from "../../components/PageWrapper";
import { ArticleCard } from "./components/ArticleCard";
import * as Progress from "@radix-ui/react-progress";

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
            // <Progress.Root
            //   className="relative overflow-hidden bg-blackA9 rounded-full w-[300px] h-[25px]"
            //   style={{
            //     // Fix overflow clipping in Safari
            //     // https://gist.github.com/domske/b66047671c780a238b51c51ffde8d3a0
            //     transform: "translateZ(0)",
            //   }}
            //   value={0}
            // >
            //   <Progress.Indicator
            //     className="bg-white w-full h-full transition-transform duration-[660ms] ease-[cubic-bezier(0.65, 0, 0.35, 1)]"
            //     style={{ transform: `translateX(-${100 - 0}%)` }}
            //   />
            // </Progress.Root>
            <Text>Loading</Text>
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
