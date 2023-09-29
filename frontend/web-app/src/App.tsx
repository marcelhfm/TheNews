import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { httpBatchLink } from "@trpc/client";
import { useState } from "react";
import { trpc } from "./utils/trpc";
import { Theme } from "@radix-ui/themes";
import { IndexPage } from "./pages/IndexPage";

export function App() {
  const backendUrl = import.meta.env.VITE_BACKEND_URL as string;

  const [queryClient] = useState(() => new QueryClient());
  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        httpBatchLink({
          url: backendUrl,

          // headers() {
          //   return {
          //     "Access-Control-Allow-Origin": "*",
          //   };
          // },
        }),
      ],
    })
  );

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <Theme>
          <IndexPage />
        </Theme>
      </QueryClientProvider>
    </trpc.Provider>
  );
}
