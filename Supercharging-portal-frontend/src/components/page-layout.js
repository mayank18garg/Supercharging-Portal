import React from "react";
import { NavBar } from "./navigation/desktop/nav-bar";
import { MobileNavBar } from "./navigation/mobile/mobile-nav-bar";
import { PageFooter } from "./page-footer";

export const PageLayout = ({ children, site_id, site_name, viewSiteEnable }) => {
  return (
    <div className="page-layout">
      <NavBar site_id={site_id} site_name={site_name} viewSiteEnable={viewSiteEnable} />
      <div className="page-layout__content">{children}</div>
    </div>
  );
};
