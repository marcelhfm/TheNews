import { Box, Container, Heading, Text } from "@radix-ui/themes";
import { trpc } from "../../utils/trpc";
import { PageWrapper } from "../../components/PageWrapper";
import { ArticleCard } from "./components/ArticleCard";

export const IndexPage = () => {
  const healthQuery = trpc.health.useQuery();

  return (
    <PageWrapper>
      <Box style={{ padding: "24px" }}>
        <Container>
          <Heading size="8">Your News</Heading>
          <Heading size="6" style={{ marginBottom: "24px" }}>
            Handpicked For You
          </Heading>
          <ArticleCard headingText="Test Article">
            <Text weight="regular" size="3">
              {healthQuery.data?.server}
            </Text>
          </ArticleCard>
        </Container>
      </Box>
    </PageWrapper>
  );
};
