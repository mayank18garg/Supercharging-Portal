import React, { useEffect } from "react";
import { PageLayout } from "../components/page-layout";
import { Navigate, useLocation } from "react-router-dom";
import { SideNavBar } from "../components/navigation/side-bar/side-nav-bar";
import { ContactInformation } from "../components/contact-information/contactInformation";


function usePageViews() {
  let location = useLocation();
  useEffect(() => {
    if(!window.GA_INITIALIZED){
      ReactGA.initialize("G-TW2E53VBE0");
      window.GA_INITIALIZED = true;
    }
    // ReactGA.set({ page: location.pathname });
    // ReactGA.pageview(location.pathname);
    ReactGA.send({ hitType: "pageview", page: location.pathname, title: "Contact_Information" });
  }, [location]);
}

export const ProtectedPage = () => {
  const location = useLocation();
  console.log("location_new:", location);
  if(location.state == null || location.state.site_id == null){
    return <Navigate replace to="/" />;
  }
  usePageViews();
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
