import React, { useEffect, useState } from "react";
import { CodeSnippet } from "../components/code-snippet";
import IssueTictable from "../components/Issue-Ticket/IssueTictable";
import { PageLayout } from "../components/page-layout";
import { getProtectedResource } from "../services/message.service";
import { Navigate, useLocation } from "react-router-dom";
import { SideNavBar } from "../components/navigation/side-bar/side-nav-bar";
import { ContactInfoForm } from "../components/contact-information/contactInfoForm";
import { ContactInformation } from "../components/contact-information/contactInformation";
export const ProtectedPage = () => {
  const location = useLocation();

  if(location.state == null || location.state.site_id == null){
    return <Navigate replace to="/" />;
  }

  return (
    <PageLayout site_id={location.state.site_id} site_name={location.state.site_name}>
       <SideNavBar site_id={location.state.site_id} site_name={location.state.site_name}  />
       <div className="content-layout">
        <h2 id="page-title" className="content__title" style={{textAlign: 'center'}}> Contact Information</h2>
        {/* <p id="page-description">
            <span>
              This page retrieves a <strong>public message</strong> from an
              external API.
            </span>
            <span>
              <strong>Any visitor can access this page.</strong>
            </span>
          </p> */}
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
