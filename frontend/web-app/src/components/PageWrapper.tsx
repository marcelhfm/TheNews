import { TopBar } from "./TopBar";

interface IPageWrapper {
  children: React.ReactNode;
}

export const PageWrapper = ({ children }: IPageWrapper) => {
  return (
    <div>
      <TopBar />
      {children}
    </div>
  );
};
