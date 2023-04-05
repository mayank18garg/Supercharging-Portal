import React, { useContext } from "react";

import { PageLayout } from "../components/page-layout";

import { useLocation} from "react-router-dom";
import { Navigate } from "react-router-dom";
import { SideNavBar } from "../components/navigation/side-bar/side-nav-bar";

// import {  } from "react-router-dom";
export const HomePage = () => {
  const location = useLocation();
  console.log("location_new:", location);


  if(location.state == null || location.state.site_id == null){
    return <Navigate replace to="/" />;
  }

    return ( <PageLayout site_id={location.state.site_id} site_name={location.state.site_name} userEmail={location.state.userEmail} > 
    <SideNavBar site_id={location.state.site_id} site_name={location.state.site_name} userEmail={location.state.userEmail} />
    <div className="content-layout">
      <h2 id="page-title" className="content__title" style={{textAlign: 'center'}}> Introduction</h2>
      <p id="page-description">
        <h4>Supercharger Site Host Portal</h4>
        <span>The Operations Team will be your primary point of contact after the Supercharger Station at your property officially opens to public.</span>
        <h4>Checklist</h4>
        <span>Supercharger hosts are responsible for:</span>
        <li>Keeping clean grounds.</li>
        <li>Providing access to amenities including restrooms.</li>
        <li>Reserving charging bay parking exclusively for Tesla cars.</li>
        <h4>Communication Guidelines </h4>
        <span>These are the guidelines to ensure a smooth opening and protect confidential information.</span>
        <h2 style={{textAlign: 'center', fontWeight: 'bold'}}> Content in Progress</h2>

      </p>
    </div>
    </PageLayout>);
};
