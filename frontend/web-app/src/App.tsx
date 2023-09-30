import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { httpBatchLink } from "@trpc/client";
import { useState } from "react";
import { trpc } from "./utils/trpc";
import { Theme } from "@radix-ui/themes";
import { IndexPage } from "./pages/index/IndexPage";
import { KindeProvider } from "@kinde-oss/kinde-auth-react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./pages/error/ErrorPage";

export function App() {
  const backendUrl = import.meta.env.VITE_BACKEND_URL as string;
  const kindeClientId = import.meta.env.VITE_KINDE_CLIENT_ID as string;
  const kindeDomain = import.meta.env.VITE_KINDE_DOMAIN as string;
  const kindeRedirectUri = import.meta.env.VITE_KINDE_REDIRECT_URI as string;
  const kindeLogoutUri = import.meta.env.VITE_KINDE_LOGOUT_URI as string;

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

  const router = createBrowserRouter([
    {
      path: "/",
      element: <IndexPage />,
      errorElement: <ErrorPage />,
    },
  ]);

  return (
    <KindeProvider
      clientId={kindeClientId}
      domain={kindeDomain}
      logoutUri={kindeLogoutUri}
      redirectUri={kindeRedirectUri}
      isDangerouslyUseLocalStorage={import.meta.env.DEV}
    >
      <trpc.Provider client={trpcClient} queryClient={queryClient}>
        <QueryClientProvider client={queryClient}>
          <Theme>
            <RouterProvider router={router} />
          </Theme>
        </QueryClientProvider>
      </trpc.Provider>
    </KindeProvider>
  );
}
