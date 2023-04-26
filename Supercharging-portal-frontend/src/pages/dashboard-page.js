import React, { useState, useEffect } from "react";
import { PageLayout } from "../components/page-layout";
import { SessionChart } from "../components/Dashboard-charts/SessionChart";
import { KPIChart } from "../components/Dashboard-charts/KPIChart";
import { DateCalendar } from "../components/Dashboard-charts/DateCalendar";
import { useLocation} from "react-router-dom";
import { Navigate } from "react-router-dom";
import { SideNavBar } from "../components/navigation/side-bar/side-nav-bar";
import { Mixpanel } from "../Mixpanel";
import { useAuth0 } from "@auth0/auth0-react";
import { MedianStallOccChart } from "../components/Dashboard-charts/MedianStallOccChart";
import { UptimePercChart } from "../components/Dashboard-charts/UptimePercChart";
import { Sidebar } from "../components/Dashboard-charts/Sidebar";

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
function formatDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export const DashboardPage = () => {
  const location = useLocation();

  const {user} = useAuth0();
  useEffect(() => {
    Mixpanel.identify(user.email);
    Mixpanel.track('Dashboard_Page');
    Mixpanel.people.set({$email: user.email});
  },[]);

  const [dateData, setdateData] = useState({
    start_date: getStartDate(), 
    end_date: getEndDate()
  });
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [data1, setData1] = useState([]);
  const [data2, setData2] = useState([]);
  const [data3, setData3] = useState([]);
  const [data4, setData4] = useState([]);

  if(location.state == null || location.state.site_id == null){
    return <Navigate replace to="/" />;
  }

  

  const handleSidebarToggle = () => {
    setSidebarVisible(!sidebarVisible);
  };

  return (
    <PageLayout site_id={location.state.site_id} site_name={location.state.site_name} userEmail={location.state.userEmail}>
      <SideNavBar site_id={location.state.site_id} site_name={location.state.site_name} userEmail={location.state.userEmail} />
      <div className="content-layout">
        
        <h2 id="page-title" className="content__title" style={{textAlign: 'center'}}> Dashboard</h2>
        
        
          <div className="chart-grid-date">
            {/* <DateCalendar dateData = {dateData} setdateData = {setdateData} /> */}
            <span> Date: {formatDate(dateData.start_date)} ~ {formatDate(dateData.end_date)} </span>
            <button onClick={handleSidebarToggle}>Calendar</button>
            
            {/* {sidebarVisible && <div className="overlay" onClick={handleSidebarToggle}></div>} */}
            <Sidebar sidebarVisible={sidebarVisible} setSidebarVisible={setSidebarVisible} dateData= {dateData} setdateData={setdateData} data1={data1} data2={data2} data3={data3} data4={data4} />
          </div>
        
        <div className="charts-container">
          <div className= "chart-grid-kpi" >
            <KPIChart dateData={dateData} trt_Id={location.state.site_id} data1={data1} setData1={setData1} />
          </div>

          <div className="chart-grid-session" >
            <SessionChart dateData={dateData} trt_Id={location.state.site_id} data2={data2} setData2={setData2} />
          </div>

          <div className= "chart-grid-kpi">
            <MedianStallOccChart dateData={dateData} trt_Id={location.state.site_id} data3={data3} setData3={setData3} />
          </div>

          <div className= "chart-grid-kpi">
            <UptimePercChart dateData={dateData} trt_Id={location.state.site_id} data4={data4} setData4={setData4} />
          </div>
        </div>
      </div>
    </PageLayout>
  );

};
