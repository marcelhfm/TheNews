import { Container, Heading } from "@radix-ui/themes";
import { PageWrapper } from "../../components/PageWrapper";
import { useAuth0 } from "@auth0/auth0-react";
import { AuthenticatedContent } from "./components/AuthenticatedContent";
import { UnauthenticatedContent } from "./components/UnauthenticatedContent";
import { useTranslation } from "react-i18next";

export const IndexPage = () => {
  const { isAuthenticated } = useAuth0();
  const { t } = useTranslation();

  return (
    <PageWrapper>
      <Container>
        <Heading size="8">{t("IndexPage.MainHeading")}</Heading>
        <Heading size="6" style={{ marginBottom: "24px" }}>
          {t("IndexPage.SubHeading")}
        </Heading>
        {isAuthenticated && <AuthenticatedContent />}
        {!isAuthenticated && <UnauthenticatedContent />}
      </Container>
    </PageWrapper>
  );
};
