import {trpc} from "../../../utils/trpc";
import {ArticleCard} from "./ArticleCard";
import {LoadingSpinner} from "../../../components/LoadingSpinner";
import {Text, Callout} from "@radix-ui/themes";
import {Pagination} from "../../../components/Pagination";
import {useState} from "react";
import {useAuth0} from "@auth0/auth0-react";
import {InfoCircledIcon} from "@radix-ui/react-icons";
import {useTranslation} from "react-i18next";

export const AuthenticatedContent = () => {
    const newsQuery = trpc.news.useQuery();
    const {t} = useTranslation()
    const [currentPage, setCurrentPage] = useState<number>(1);
    const {user} = useAuth0();
    const newsSettingsQuery = trpc.newsSettings.useQuery({
        userId: user?.sub || "",
    });

    console.log(newsSettingsQuery);

    const onPageChange = (newPage: number) => {
        setCurrentPage(newPage);
    };

    // Set the number of items to display per page
    const itemsPerPage = 5; // Adjust this based on your preference

    // Calculate the start and end indices for the current page
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    if (newsQuery.error) {
        return (<>
            <Callout.Root color="red">
                <Callout.Icon>
                    <InfoCircledIcon/>
                </Callout.Icon>
                <Callout.Text>
                    {t("IndexPage.Authenticated.Error")}
                </Callout.Text>
            </Callout.Root>
        </>);
    }

    return (
        <>
            {newsQuery.isLoading ? (
                <LoadingSpinner/>
            ) : (
                <>
                    {newsQuery.data?.slice(startIndex, endIndex).map((el) => (
                        <ArticleCard
                            date={el.date}
                            key={el.id}
                            headingText={el.title}
                            detailsLink={el.detailsLink}
                            detailsRequestUrl={el.detailsRequestUrl}
                            source={el.source}
                        >
                            {el.firstSentence && (
                                <Text weight="regular" size="3">
                                    <div style={{textAlign: "justify", textAlignLast: "left"}}>
                                        {el.firstSentence}
                                    </div>
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
