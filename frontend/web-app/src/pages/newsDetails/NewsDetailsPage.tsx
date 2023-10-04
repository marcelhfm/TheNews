import { Box, Container, Em, Flex, Heading, Text } from "@radix-ui/themes";
import { PageWrapper } from "../../components/PageWrapper";
import { useNavigate, useParams } from "react-router-dom";
import { trpc } from "../../utils/trpc";
import { useTranslation } from "react-i18next";
import { LoadingSpinner } from "../../components/LoadingSpinner";
import { formatDate } from "../../utils/formatDate";

export const NewsDetailsPage = () => {
  const { detailsData } = useParams();
  const navigate = useNavigate();
  const newsDetails = trpc.newsDetail.useQuery({
    detailsRequestUrl: detailsData || "",
  });
  const { t } = useTranslation();

  return (
    <PageWrapper>
      <Container>
        <Flex
          onClick={() => navigate("/")}
          style={{ cursor: "pointer", marginBottom: "24px" }}
          align={"center"}
        >
          <svg
            width="30"
            height="30"
            viewBox="0 0 15 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6.85355 3.14645C7.04882 3.34171 7.04882 3.65829 6.85355 3.85355L3.70711 7H12.5C12.7761 7 13 7.22386 13 7.5C13 7.77614 12.7761 8 12.5 8H3.70711L6.85355 11.1464C7.04882 11.3417 7.04882 11.6583 6.85355 11.8536C6.65829 12.0488 6.34171 12.0488 6.14645 11.8536L2.14645 7.85355C1.95118 7.65829 1.95118 7.34171 2.14645 7.14645L6.14645 3.14645C6.34171 2.95118 6.65829 2.95118 6.85355 3.14645Z"
              fill="currentColor"
              fillRule="evenodd"
              clipRule="evenodd"
            ></path>
          </svg>
          <Heading size="6">{t("Back")}</Heading>
        </Flex>
        {newsDetails.isLoading && <LoadingSpinner />}
        {newsDetails.data && (
          <>
            <Heading size="8" style={{ marginBottom: "12px" }}>
              {newsDetails.data.title}
            </Heading>
            <Box style={{ marginBottom: "10px" }}>
              <Text size="4" color="gray">
                {newsDetails.data?.date &&
                  formatDate(new Date(newsDetails.data?.date))}{" "}
                | via {newsDetails.data?.source}
              </Text>
            </Box>
            <Container>
              {newsDetails.data.content.map((el) => {
                if (el.type === "headline" && typeof el.value === "string") {
                  return (
                    <Heading
                      style={{
                        marginBottom: "12px",
                        marginTop: "12px",
                        opacity: 0.8,
                      }}
                    >
                      {el.value}
                    </Heading>
                  );
                }
                if (el.type === "text" && typeof el.value === "string") {
                  return (
                    <Text>
                      <div
                        style={{ textAlign: "justify", textAlignLast: "left" }}
                      >
                        {el.value}
                      </div>
                    </Text>
                  );
                }
                if (el.type === "quotation" && typeof el.value === "string") {
                  return (
                    <Text>
                      <Em>{el.value}</Em>
                    </Text>
                  );
                }
              })}
            </Container>
          </>
        )}
      </Container>
    </PageWrapper>
  );
};
