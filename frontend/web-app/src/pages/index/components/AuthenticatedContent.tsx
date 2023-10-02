import { trpc } from "../../../utils/trpc";
import { ArticleCard } from "./ArticleCard";
import { LoadingSpinner } from "../../../components/LoadingSpinner";
import { Text } from "@radix-ui/themes";
import { Pagination } from "../../../components/Pagination";
import { useState } from "react";

export const AuthenticatedContent = () => {
  const newsQuery = trpc.news.useQuery();
  const [currentPage, setCurrentPage] = useState<number>(1);

  const onPageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  // Set the number of items to display per page
  const itemsPerPage = 10; // Adjust this based on your preference

  // Calculate the start and end indices for the current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  return (
    <>
      {newsQuery.isLoading ? (
        <LoadingSpinner />
      ) : (
        <>
          {newsQuery.data?.slice(startIndex, endIndex).map((el) => (
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
            </ArticleCard>
          ))}
          <Pagination
            currentPage={currentPage}
            onPageChange={onPageChange}
            totalPages={
              Math.ceil(newsQuery.data?.length || 0 / itemsPerPage) || 1
            }
          />
        </>
      )}
    </>
  );
};
