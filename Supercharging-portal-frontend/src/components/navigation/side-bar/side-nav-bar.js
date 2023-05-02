import React from "react";
import { SideNavBarTab } from "./side-nav-bar-tab";

export const SideNavBar = ({site_id, site_name, viewSiteEnable, userEmail, isAdmin}) => {

    return ( 
        viewSiteEnable ? 
        <div className="side-nav-bar__container">
            <SideNavBarTab path="/" label="Homepage"  />
            {   isAdmin ?
                    <SideNavBarTab path="/onboarding" label="Onboarding" isAdmin={isAdmin} />
                    : null
            }
        </div> :
        <div className="side-nav-bar__container">
            {/* <SideNavBarTab path="/home" label="Home" site_id={site_id} site_name={site_name} userEmail={userEmail} /> */}
            <SideNavBarTab path="/dashboard" label="Dashboard" site_id={site_id} site_name={site_name} userEmail={userEmail} />
            <SideNavBarTab path="/reportIssue" label="Report an Issue" site_id={site_id} site_name={site_name} userEmail={userEmail} />
            <SideNavBarTab path="/protected" label="Contact Information" site_id={site_id} site_name={site_name} userEmail={userEmail} />
            <SideNavBarTab path="/siteInfo" label="Site Information" site_id={site_id} site_name={site_name} userEmail={userEmail} />
        </div>
    );
}