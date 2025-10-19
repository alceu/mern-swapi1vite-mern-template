import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import ErrorBoundary from "@pwa/components/ErrorBoundary";
import { routes } from "@pwa/pages";
import store from "@pwa/store";

const router = createBrowserRouter(routes);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <ErrorBoundary>
        <RouterProvider router={router} />
      </ErrorBoundary>
    </Provider>
  </React.StrictMode>
);
