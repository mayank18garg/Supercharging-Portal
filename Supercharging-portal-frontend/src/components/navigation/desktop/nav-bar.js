import React from "react";
import { NavBarBrand } from "./nav-bar-brand";
import { NavBarButtons } from "./nav-bar-buttons";
import { NavBarTabs } from "./nav-bar-tabs";
import { NavBarBackButtons } from "./nav-bar-back-buttons";
export const NavBar = ({site_id, site_name, userEmail, viewSiteEnable}) => {
  return (
    <div className="nav-bar__container">
      <nav className="nav-bar">
        <NavBarBrand site_id={site_id} site_name={site_name} userEmail={userEmail}  />
        {/* <NavBarTabs site_id={site_id} site_name={site_name} /> */}
        {/* <h4 id="page-title" className="content__title" >{site_name}</h4> */}
        <div className="nav-bar__tabs">
          <span className="nav-bar__tab" style={{fontSize: 25}}> | </span>
          <span className="nav-bar__tab">Supercharging Portal</span>
          <span className="nav-bar__tab">{site_name}</span>
        </div>
        <div className="nav-bar__buttoncont">
        {viewSiteEnable ? null : <NavBarBackButtons />}
        <NavBarButtons />
        </div>
      </nav>
    </div>
  );
};
