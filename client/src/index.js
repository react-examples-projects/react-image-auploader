import React from "react";
import ReactDOM from "react-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { ErrorBoundary } from "react-error-boundary";

import Routers from "./Components/Routers";
import UserProvider from "./Components/Context/User/UserProvider";
import PageError from "./Components/Elements/ErrorBoundaries/PageError";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Style/App.scss";
import ImagesProvider from "./Components/Context/Images/ImagesProvider";

const client = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      retry: 0,
    },
  },
});

ReactDOM.render(
  <React.StrictMode>
    <ErrorBoundary FallbackComponent={PageError}>
      <QueryClientProvider client={client}>
        <UserProvider>
          <ImagesProvider>
            <Routers />
          </ImagesProvider>
        </UserProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  </React.StrictMode>,
  document.getElementById("root")
);

// dev branch
