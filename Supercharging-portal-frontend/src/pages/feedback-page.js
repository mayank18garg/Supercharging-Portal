import React, { useEffect, useState } from "react";

import { PageLayout } from "../components/page-layout";

import { FormThemeProvider } from 'react-component-form'
import { Navigate, useLocation } from "react-router-dom";
import { SideNavBar } from "../components/navigation/side-bar/side-nav-bar";
import { Mixpanel } from "../Mixpanel";
import { useAuth0 } from "@auth0/auth0-react";
import { FeedbackForm } from "../components/FeedbackForm";


export const FeedbackFormPage = () => {
  const location = useLocation();

  const {user} = useAuth0();
  useEffect(() => {
    Mixpanel.identify(user.email);
    Mixpanel.track('Feedback_Page');
    Mixpanel.people.set({$email: user.email});
  },[]);


  if(location.state == null || location.state.site_id == null){
    return <Navigate replace to="/" />;
  }
  const trt_id = location.state ? location.state.site_id : "";
  const site_name = location.state ? location.state.site_name : "";
  return (
    <PageLayout site_id={location.state.site_id} site_name={location.state.site_name} userEmail={location.state.userEmail}>
      <SideNavBar site_id={location.state.site_id} site_name={location.state.site_name} userEmail={location.state.userEmail}/>
      <div className="content-layout">
      <h2 id="page-title" className="content__title" style={{textAlign: 'center'}}> Feedback Form</h2>
      <div className="form-grid-container">
        <div className="reportIssueForm">
          <FeedbackForm trt_id={trt_id} site_name={site_name} userEmail={location.state.userEmail} />
          </div>
      </div>   
      </div>
    </PageLayout>
  );
};
