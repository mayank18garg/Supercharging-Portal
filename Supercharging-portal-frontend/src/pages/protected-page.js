import React, { useEffect } from "react";
import { PageLayout } from "../components/page-layout";
import { Navigate, useLocation } from "react-router-dom";
import { SideNavBar } from "../components/navigation/side-bar/side-nav-bar";
import { ContactInformation } from "../components/contact-information/contactInformation";
import { Mixpanel } from "../Mixpanel";
import { useAuth0 } from "@auth0/auth0-react";


export const ProtectedPage = () => {

  const location = useLocation();

  const {user} = useAuth0();
  useEffect(() => {
    Mixpanel.identify(user.email);
    Mixpanel.track('ContactInformation_Page');
    Mixpanel.people.set({$email: user.email});
  },[]);

  if(location.state == null || location.state.site_id == null){
    return <Navigate replace to="/" />;
  }
  return (
    <PageLayout site_id={location.state.site_id} site_name={location.state.site_name} userEmail={location.state.userEmail} >
       <SideNavBar site_id={location.state.site_id} site_name={location.state.site_name}  userEmail={location.state.userEmail} />
       <div className="content-layout">
        <h2 id="page-title" className="content__title" style={{textAlign: 'center'}}> Contact Information</h2>
        <p id="page-description">
          <span> You can Reach Tesla Supercharging here</span>
          <span align="center"> 1. Email: abc@tesla.com </span>
          <span align="center"> 2. Phone: 123 456 7890 </span>
        </p>
        <ContactInformation trt_id={location.state.site_id} />

    </div>
    </PageLayout>
  );
};
