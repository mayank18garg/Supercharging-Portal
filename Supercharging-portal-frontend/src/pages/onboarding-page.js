import React, { useContext } from "react";

import { PageLayout } from "../components/page-layout";

import { useLocation} from "react-router-dom";
import { Navigate } from "react-router-dom";
import { SideNavBar } from "../components/navigation/side-bar/side-nav-bar";
import { OnBoardingForm } from "../components/admin-components/onboardingForm";

// import {  } from "react-router-dom";
export const OnboardingPage = () => {
  const location = useLocation();
  // console.log(location);


//   if(location.state == null || location.state.site_id == null){
//     return <Navigate replace to="/" />;
//   }

    return ( <PageLayout viewSiteEnable={true}> 
    <SideNavBar viewSiteEnable={true} isAdmin={location.state.isAdmin}/>
    <div className="content-layout">
      <h2 id="page-title" className="content__title" style={{textAlign: 'center'}}> Onboarding</h2>
      <OnBoardingForm />
    </div>
    </PageLayout>);
};
