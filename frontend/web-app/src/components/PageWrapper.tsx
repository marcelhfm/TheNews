import { Box } from "@radix-ui/themes";
import { TopBar } from "./TopBar";

interface IPageWrapper {
  children: React.ReactNode;
}

export const PageWrapper = ({ children }: IPageWrapper) => {
  return (
    <div className="md:ml-72 md:mr-72">
      <TopBar />
      <Box style={{ padding: "24px" }}>{children}</Box>
    </div>
  );
};
