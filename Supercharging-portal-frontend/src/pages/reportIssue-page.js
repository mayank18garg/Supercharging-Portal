import React, { useEffect, useState } from "react";
import { CodeSnippet } from "../components/code-snippet";
import { PageLayout } from "../components/page-layout";

import { FormThemeProvider } from 'react-component-form'
import { FormComp } from "../components/Issue-Ticket/FormComp";
import IssueTictable from "../components/Issue-Ticket/IssueTictable";
import { Navigate, useLocation } from "react-router-dom";
import { SideNavBar } from "../components/navigation/side-bar/side-nav-bar";

export const ReportIssuePage = () => {
//   const [message, setMessage] = useState("");
  const location = useLocation();
  console.log(location);


  const [issueTicketData, setissueTicketData] = useState(false);

  if(location.state == null || location.state.site_id == null){
    return <Navigate replace to="/" />;
  }
  const trt_id = location.state ? location.state.site_id : "";
  const site_name = location.state ? location.state.site_name : "";
  return (
    <PageLayout site_id={location.state.site_id} site_name={location.state.site_name}>
      <SideNavBar site_id={location.state.site_id} site_name={location.state.site_name} />
      <div className="content-layout">
      <h2 id="page-title" className="content__title" style={{textAlign: 'center'}}> Report a New Issue</h2>
      <div className="form-grid-container">
        <IssueTictable trt_id={trt_id} issueTicketData={issueTicketData} />
        
          <FormComp trt_id={trt_id} site_name={site_name} issueTicketData={issueTicketData} setissueTicketData={setissueTicketData} />
          
        {/* <div className="content__body">
          <p id="page-description">
            <span>
              This page retrieves a <strong>public message</strong> from an
              external API.
            </span>
            <span>
              <strong>Any visitor can access this page.</strong>
            </span>
          </p>
          <CodeSnippet title="Public Message" code={message} />
        </div> */}
      </div>   
      </div>
    </PageLayout>
  );
};
