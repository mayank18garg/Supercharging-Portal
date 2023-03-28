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
    </div>
    </PageLayout>);
};
