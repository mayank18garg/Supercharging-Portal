import React, { useEffect, useState } from "react";
import { CodeSnippet } from "../components/code-snippet";
import { PageLayout } from "../components/page-layout";
import { getAdminResource } from "../services/message.service";
import { AdminMenu } from "../components/admin-menu";
import ViewSiteAdmin from "../components/admin-components/viewSiteAdmin";
import ViewSiteUser from "../components/multiview-site";
import { useAuth0 } from "@auth0/auth0-react";
import { SideNavBar } from "../components/navigation/side-bar/side-nav-bar";
import IntroTable from "../components/IntroTable";

export const MultiSitePage = () => {
  const {isAuthenticated, getIdTokenClaims, loginWithRedirect, getAccessTokenSilently} = useAuth0();
    const [token, setToken] = useState(['']);
    // const [message, setMessage] = useState("");

    useEffect(() => {
        let isMounted = true;

        const getMessage = async () => {
            const accessToken = await getIdTokenClaims();
            // const { data, error } = await getAdminResource(accessToken);

            if (!isMounted) {
                return;
            }

            if (accessToken) {
                // setMessage(JSON.stringify(data, null, 2));
                setToken(accessToken['http://localhost:4040//roles']);
            }

            else{
                console.log("error");
                setToken(null);
            }
        };

        getMessage();

        return () => {
        isMounted = false;
        };
    }, [getAccessTokenSilently]);

    const adminRoles = ['Admin'];
    const userRoles = ['User'];
    let isAdmin = false;
    if(token?.find(role => adminRoles.includes(role))){
      isAdmin= true;
    }

  return (
    // <div>
    <PageLayout viewSiteEnable={true}>
      <SideNavBar viewSiteEnable={true} isAdmin={isAdmin} />
      <div className="content-layout">
      <h2 className="content__title" style={{textAlign: 'center'}}> Homepage</h2>
      <div className="multiSiteTable">
      {token?.find(role => adminRoles.includes(role)) ? <ViewSiteAdmin />
        : (token?.find(role => userRoles.includes(role)) ? <ViewSiteUser/>
        :
        null)
      }
      </div>
      <div className="intoContent">
      {/* <h2 id="page-title"  style={{textAlign: 'center'}}> Introduction</h2> */}
      <p id="page-description">
        <h4>Supercharger Site Host Portal</h4>
        <span>The Operations Team will be your primary point of contact after the Supercharger Station at your property officially opens to public.</span>
        <h4>Checklist</h4>
        <span>Supercharger hosts are responsible for:</span>
        <li>Keeping clean grounds.</li>
        <li>Providing access to amenities including restrooms.</li>
        <li>Reserving charging bay parking exclusively for Tesla cars.</li>
        <h4>Communication Guidelines </h4>
        <span>These are the <a target="_blank" rel="noopener noreferrer" href="https://teslamotorsinc.sharepoint.com/sites/MissioncontrolEMEA/Communication/Forms/AllItems.aspx?id=%2Fsites%2FMissioncontrolEMEA%2FCommunication%2FLandlord%20Engagement%20and%20Communications%2FSite%20host%20communication%20guidelines%2FEU%20SuC%20Communication%20Guidelines%2Epdf&parent=%2Fsites%2FMissioncontrolEMEA%2FCommunication%2FLandlord%20Engagement%20and%20Communications%2FSite%20host%20communication%20guidelines&p=true&ga=1">guidelines</a> to ensure a smooth opening and protect confidential information.</span>
        {/* <h2 style={{textAlign: 'center', fontWeight: 'bold'}}> Content in Progress</h2> */}
        <h4>Supercharger Host Amenities </h4>
        <span>Drivers can now tap the new Supercharger Host Amenities icon, in the Supercharger pop-up, to learn about the amenities offered at your
              business property. By sharing your webpage with the Supercharger network, you can help provide drivers a hospitable charging experience. Follow
              these <a target="_blank" rel="noopener noreferrer" href="https://www.tesla.com/sites/default/files/supercharger/email/Supercharger_Host_Content_Guideline_GB_Comp.pdf">content guidelines</a> and submit your webpage through this <a target="_blank" rel="noopener noreferrer" href="https://feedback.tesla.com/jfe/form/SV_9mBHIpXjb2ta4vA">form</a> to be featured in the Supercharger pop-up. </span>
        <h4>Access Codes</h4>
        <span>Please submit or update access codes for restrooms or parking barriers <a target="_blank" rel="noopener noreferrer" href="https://feedback.tesla.com/jfe/form/SV_aVSMM9FxRjuNcTc">here</a>.</span>
        <h4>Supercharger Contact Information </h4>
        <span>Below are ways you can react our team. Please note the phone and email are not for general public use and should be used only by property contacts.</span>
        <IntroTable />
      </p>
      </div>
      </div>
    </PageLayout>
    
    // </div>
  );
};
