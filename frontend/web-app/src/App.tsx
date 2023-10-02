import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { httpBatchLink } from "@trpc/client";
import { useState } from "react";
import { trpc } from "./utils/trpc";
import { Theme } from "@radix-ui/themes";
import { IndexPage } from "./pages/index/IndexPage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./pages/error/ErrorPage";
import { Auth0Provider } from "@auth0/auth0-react";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import deTranslation from "./locales/de.json";
import enTranslation from "./locales/en.json";

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: enTranslation,
    },
    de: {
      translation: deTranslation,
    },
  },
  lng: "en", // Set the default language here
  fallbackLng: "en", // Fallback language if a translation is missing
  interpolation: {
    escapeValue: false, // React already escapes values, so no need to escape again
  },
});

export function App() {
  const backendUrl = import.meta.env.VITE_BACKEND_URL as string;
  const authClientId = import.meta.env.VITE_AUTH_CLIENT_ID as string;
  const authDomain = import.meta.env.VITE_AUTH_DOMAIN as string;
  const authRedirectUri = import.meta.env.VITE_AUTH_REDIRECT_URI as string;

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
    <Auth0Provider
      domain={authDomain}
      clientId={authClientId}
      authorizationParams={{
        redirect_uri: authRedirectUri,
      }}
    >
      <trpc.Provider client={trpcClient} queryClient={queryClient}>
        <QueryClientProvider client={queryClient}>
          <Theme>
            <RouterProvider router={router} />
          </Theme>
        </QueryClientProvider>
      </trpc.Provider>
    </Auth0Provider>
  );
}
