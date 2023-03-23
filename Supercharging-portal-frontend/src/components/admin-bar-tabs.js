import React from "react";
// import { NavBarTab } from "./nav-bar-tab";
import { NavBarTab } from "./navigation/desktop/nav-bar-tab";
import { AdminBarTab } from "./admin-bar-tab";

export const AdminBarTabs = () => {
  return (
    <div className="admin-bar__tabs">
      {/* <h1 color="white">Mayank</h1> */}
      <AdminBarTab path="/" label="Onboarding" />
      <AdminBarTab path="/" label="View a Site" />
    </div>
  );
};