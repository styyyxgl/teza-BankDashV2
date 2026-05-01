import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { AuthProvider } from "./context/auth-context";
import { RouterProvider } from "./routes/router-provider";
import { ProtectedRoute } from "./routes/protected-route";
import { PublicRoute } from "./routes/public-route";
import { NotFoundRoute } from "./routes/not-found-route";
import { AppRoute } from "./enums/app-route";
import { Layout } from "./components/layout/layout";

import { Auth } from "./pages/auth/auth";
import { Landing } from "./pages/landing/landing";
import { Dashboard } from "./pages/dashboard/dashboard";
import { Transactions } from "./pages/transactions/transactions";
import { CreditCards } from "./pages/credit-cards/credit-cards";
import { Investments } from "./pages/investments/investments";

import { ToastProvider } from "./context/toast-context";
import { ThemeProvider } from "./context/theme-context";

import "./assets/css/styles.css";

const queryClient = new QueryClient({});

createRoot(document.getElementById("root") as HTMLElement).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ThemeProvider>
          <ToastProvider>
            <RouterProvider
              routes={[
                {
                  element: <PublicRoute />,
                  children: [
                    {
                      element: <Landing />,
                      path: AppRoute.ROOT,
                    },
                    {
                      element: <Auth />,
                      path: AppRoute.SIGN_IN,
                    },
                    {
                      element: <Auth />,
                      path: AppRoute.SIGN_UP,
                    },
                  ],
                },

                {
                  element: <ProtectedRoute />,
                  children: [
                    {
                      element: <Layout />,
                      children: [
                        {
                          element: <Dashboard />,
                          path: AppRoute.DASHBOARD,
                          handle: { title: "Overview" },
                        },
                        {
                          element: <Transactions />,
                          path: AppRoute.TRANSACTIONS,
                          handle: { title: "Transactions" },
                        },
                        {
                          element: <CreditCards />,
                          path: AppRoute.CARDS,
                          handle: { title: "Credit Cards" },
                        },
                        {
                          element: <Investments />,
                          path: AppRoute.INVESTMENTS,
                          handle: { title: "Investments" },
                        },
                      ],
                    },
                  ],
                },

                {
                  path: "*",
                  element: <NotFoundRoute />,
                },
              ]}
            />
          </ToastProvider>
        </ThemeProvider>
      </AuthProvider>
    </QueryClientProvider>
  </StrictMode>,
);
