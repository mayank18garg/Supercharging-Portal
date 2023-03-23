import React from "react";
import { SideNavBarTab } from "./side-nav-bar-tab";

export const SideNavBar = ({site_id, site_name, viewSiteEnable, isAdmin}) => {

    return ( 
        viewSiteEnable ? 
        <div className="side-nav-bar__container">
            <SideNavBarTab path="/" label="Site Selection"  />
            {   isAdmin ?
                    <SideNavBarTab path="/onboarding" label="Onboarding" isAdmin={isAdmin} />
                    : null
            }
        </div> :
        <div className="side-nav-bar__container">
            <SideNavBarTab path="/home" label="Home" site_id={site_id} site_name={site_name} />
            <SideNavBarTab path="/dashboard" label="Dashboard" site_id={site_id} site_name={site_name} />
            <SideNavBarTab path="/reportIssue" label="Issue a New Request" site_id={site_id} site_name={site_name} />
            <SideNavBarTab path="/protected" label="Contact Information" site_id={site_id} site_name={site_name} />
            <SideNavBarTab path="/siteInfo" label="Site Information" site_id={site_id} site_name={site_name} />
        </div>
    );
}