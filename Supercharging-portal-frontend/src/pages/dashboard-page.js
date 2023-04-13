import React, { useState, useEffect } from "react";
import { CodeSnippet } from "../components/code-snippet";
import { PageLayout } from "../components/page-layout";
import { SessionChart } from "../components/Dashboard-charts/SessionChart";
import { KPIChart } from "../components/Dashboard-charts/KPIChart";
import { DateCalendar } from "../components/Dashboard-charts/DateCalendar";
import { SitePicker } from "../components/Dashboard-charts/SitePicker";
import { useLocation} from "react-router-dom";
import { Navigate } from "react-router-dom";
import { SideNavBar } from "../components/navigation/side-bar/side-nav-bar";
import ReactGA from 'react-ga4';

const getStartDate = () => {
  const now = new Date();
  const previousMonth = new Date(now.getFullYear(), now.getMonth() - 1);
  const firstWeekDate = new Date(previousMonth.getFullYear(), previousMonth.getMonth(), 1);
  const dayOfWeek = firstWeekDate.getDay();

  let diff = firstWeekDate.getDate() - dayOfWeek + (dayOfWeek === 0 ? -5:0);
  console.log(firstWeekDate);
  if (diff > 7) {
    diff += 7;
  }
  const startingDateOfFirstFullWeek = new Date(firstWeekDate.setDate(diff));
  // console.log(startingDateOfFirstFullWeek);
  return startingDateOfFirstFullWeek;
}
const getEndDate = () => {
  const now = new Date(); // create a new date object for the current date and time
const previousMonth = new Date(now.getFullYear(), now.getMonth() - 1); // create a new date object for the previous month
const lastDayOfPreviousMonth = new Date(previousMonth.getFullYear(), previousMonth.getMonth() + 1, 0); // create a new date object for the last day of the previous month
const lastSundayOfPreviousMonth = new Date(lastDayOfPreviousMonth); // create a new date object for the last day of the previous month
lastSundayOfPreviousMonth.setDate(lastSundayOfPreviousMonth.getDate() - (lastSundayOfPreviousMonth.getDay() + 1) % 7); // set the date to the last Sunday of the previous month

// console.log(lastSundayOfPreviousMonth); // prints the date of the last Sunday of the previous month to the console
return lastSundayOfPreviousMonth;

}

function usePageViews() {
  let location = useLocation();
  useEffect(() => {
    if(!window.GA_INITIALIZED){
      ReactGA.initialize("G-TW2E53VBE0");
      window.GA_INITIALIZED = true;
    }
    // ReactGA.set({ page: location.pathname });
    // ReactGA.pageview(location.pathname);
    ReactGA.send({ hitType: "pageview", page: location.pathname, title: "Dashboard" });
  }, [location]);
}

export const DashboardPage = () => {
  const location = useLocation();
  const [dateData, setdateData] = useState({
    start_date: getStartDate(), 
    end_date: getEndDate()
  });
  // usePageViews();
  console.log("location_new:", location);
  if(location.state == null || location.state.site_id == null){
    return <Navigate replace to="/" />;
  }

  return (
    <PageLayout site_id={location.state.site_id} site_name={location.state.site_name} userEmail={location.state.userEmail}>
      <SideNavBar site_id={location.state.site_id} site_name={location.state.site_name} userEmail={location.state.userEmail} />
      <div className="content-layout">
        
        <h2 id="page-title" className="content__title" style={{textAlign: 'center'}}> Dashboard</h2>
        
        {/* <div className="chart-grid-input"> */}
          <div className="chart-grid-date">
            <DateCalendar dateData = {dateData} setdateData = {setdateData} />
          </div>
        {/* </div> */}
        
        <div className= "chart-grid-kpi" style={{width:800}}>
          <KPIChart dateData={dateData} trt_Id={location.state.site_id} />
        </div>

        <div className="chart-grid-session" style={{width:800}}>
          <SessionChart dateData={dateData} trt_Id={location.state.site_id} />
        </div>
        
      </div>
    </PageLayout>
  );

};
