import { Theme } from "@radix-ui/themes";
import { IndexPage } from "./pages/index/IndexPage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./pages/error/ErrorPage";
import { Auth0Provider } from "@auth0/auth0-react";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import deTranslation from "./locales/de.json";
import enTranslation from "./locales/en.json";
import { TrpcWrapper } from "./utils/trpc";

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
  const authClientId = import.meta.env.VITE_AUTH_CLIENT_ID as string;
  const authDomain = import.meta.env.VITE_AUTH_DOMAIN as string;
  const authRedirectUri = import.meta.env.VITE_AUTH_REDIRECT_URI as string;

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
        audience: `https://${authDomain}/api/v2/`,
        scope: "read:news",
      }}
    >
      <TrpcWrapper>
        <Theme>
          <RouterProvider router={router} />
        </Theme>
      </TrpcWrapper>
    </Auth0Provider>
  );
}
