import { useAuth0 } from "@auth0/auth0-react";
import { Box, Button, Heading, Text } from "@radix-ui/themes";

export const UnauthenticatedContent = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <>
      <Box>
        <Box>
          <Heading size="5">
            One place for all your favorite news sources
          </Heading>
          <Text>Create your account now</Text>
          <Box
            style={{
              marginTop: "24px",
            }}
          >
            <Button onClick={() => loginWithRedirect()} color="blue" size="3">
              Register Now
            </Button>
          </Box>
        </Box>
      </Box>
    </>
  );
};
