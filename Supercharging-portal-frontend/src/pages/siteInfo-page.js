import React, { useEffect, useState } from "react";

import { PageLayout } from "../components/page-layout";

import { useLocation} from "react-router-dom";
import { Navigate } from "react-router-dom";
import { SideNavBar } from "../components/navigation/side-bar/side-nav-bar";
import { SiteInfoForm } from "../components/site-information/siteInfoForm";
import { Mixpanel } from "../Mixpanel";
import { useAuth0 } from "@auth0/auth0-react";

export const SiteInfoPage = () => {
  const location = useLocation();

  const {user} = useAuth0();
  useEffect(() => {
    Mixpanel.identify(user.email);
    Mixpanel.track('SiteInformation_Page');
    Mixpanel.people.set({$email: user.email});
  },[]);

  const [site_name, setSite_name] = useState((location.state == null || location.state.site_id == null) ? "" : location.state.site_name);
  if(location.state == null || location.state.site_id == null){
    return <Navigate replace to="/" />;
  }

    return ( <PageLayout site_id={location.state.site_id} site_name={site_name} userEmail={location.state.userEmail} > 
    <SideNavBar site_id={location.state.site_id} site_name={site_name} userEmail={location.state.userEmail} />
    <div className="content-layout">
      <h2 id="page-title" className="content__title" style={{textAlign: 'center'}}> Site Information</h2>
      <SiteInfoForm trt_id={location.state.site_id} setSite_name={setSite_name} userEmail={location.state.userEmail} />
    </div>
    </PageLayout>);
};
