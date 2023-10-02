import { Box, Container, Heading } from "@radix-ui/themes";
import { PageWrapper } from "../../components/PageWrapper";
import { useAuth0 } from "@auth0/auth0-react";
import { AuthenticatedContent } from "./components/AuthenticatedContent";
import { UnauthenticatedContent } from "./components/UnauthenticatedContent";

export const IndexPage = () => {
  const { isAuthenticated } = useAuth0();
  return (
    <PageWrapper>
      <div className="md:ml-72 md:mr-72">
        <Box style={{ padding: "24px" }}>
          <Container>
            <Heading size="8">Your News</Heading>
            <Heading size="6" style={{ marginBottom: "24px" }}>
              Handpicked For You
            </Heading>
            {isAuthenticated && <AuthenticatedContent />}
            {!isAuthenticated && <UnauthenticatedContent />}
          </Container>
        </Box>
      </div>
    </PageWrapper>
  );
};
