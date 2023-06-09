import { Auth0Provider } from "@auth0/auth0-react";
import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { App } from "./app";
import "rsuite/dist/rsuite.min.css";
import "./styles/styles.css";
import { Auth0ProviderWithNavigate } from "./auth0-provider-with-navigate";
import ReactGA from "react-ga4";

ReactGA.initialize("G-BEF4WKS30Z");
const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Auth0ProviderWithNavigate>
        <App />
      </Auth0ProviderWithNavigate>
    </BrowserRouter>
  </React.StrictMode>
);
