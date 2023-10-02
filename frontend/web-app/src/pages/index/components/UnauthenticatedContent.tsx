import { useAuth0 } from "@auth0/auth0-react";
import { Box, Button, Heading, Text } from "@radix-ui/themes";
import { useTranslation } from "react-i18next";

export const UnauthenticatedContent = () => {
  const { loginWithRedirect } = useAuth0();
  const { t } = useTranslation();

  return (
    <>
      <Box>
        <Box>
          <Heading size="5">{t("IndexPage.Unauthenticated.Heading")}</Heading>
          <Text>{t("IndexPage.Unauthenticated.SubHeading")}</Text>
          <Box
            style={{
              marginTop: "24px",
            }}
          >
            <Button onClick={() => loginWithRedirect()} color="blue" size="3">
              {t("IndexPage.Unauthenticated.RegisterButton")}
            </Button>
          </Box>
        </Box>
      </Box>
    </>
  );
};
