import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { MultiSitePage } from "./pages/multiSite-page";
import { HomePage } from "./pages/home-page";
import { NotFoundPage } from "./pages/not-found-page";
import { DashboardPage } from "./pages/dashboard-page";
import { ProtectedPage } from "./pages/protected-page";
import { ReportIssuePage } from "./pages/reportIssue-page";
import { CallbackPage } from "./pages/callback-page";
import { SiteInfoPage } from "./pages/siteInfo-page";
import {AuthenticationGuard} from "./components/authentication-guard";
import { PageLoader } from "./components/page-loader";
import { useAuth0 } from "@auth0/auth0-react";
import { NavBarTab } from "./components/navigation/desktop/nav-bar-tab";
import { PrivateRoute } from "./utils/private-route";

import {Chart as ChartJS} from "chart.js/auto";
import { Colors } from "chart.js/auto";
import { OnboardingPage } from "./pages/onboarding-page";

export const App = () => {
  ChartJS.register(Colors);
  ChartJS.defaults.font.size = 18;
  ChartJS.defaults.font.style = 'oblique';
  ChartJS.defaults.color = "Green";

  const { isLoading } = useAuth0();

  if (isLoading) {
    return (
      <div className="page-layout">
        <PageLoader />
      </div>
    );
  }
  return (
    <Routes>
      <Route 
        exact path="/home"
        // element={< Navigate replace to="/profile" />}
        element={<HomePage/>}
      />
      <Route 
        path="/dashboard"
        element={<AuthenticationGuard component={DashboardPage} />}
      />
      <Route path="/reportIssue" element={<ReportIssuePage />} />
      <Route path="/protected" element={<ProtectedPage />} />
      <Route element={<PrivateRoute /> }>
        <Route path="/onboarding" exact element={<OnboardingPage />} />
      </Route>
      <Route
        path="/"
        element={<AuthenticationGuard component={MultiSitePage} />}
      />
      <Route
        path="/siteInfo"
        element={<AuthenticationGuard component={SiteInfoPage} />}
      />
      <Route path="*" element={<NotFoundPage />} />
      <Route path="/callback" element={<CallbackPage />} />
    </Routes>
  );
};
