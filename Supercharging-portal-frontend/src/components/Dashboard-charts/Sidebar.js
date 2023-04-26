import React from 'react';
// import './Sidebar.css';
import { DateCalendar } from './DateCalendar';
import { FaTimes } from 'react-icons/fa';


export const Sidebar = ({sidebarVisible, setSidebarVisible, dateData, setdateData}) => {
  return (
    <div className={`sidebar ${sidebarVisible ? 'visible' : ''}`}>
      <FaTimes size={30} style={{alignSelf:'end'}} onClick={() => {setSidebarVisible(!sidebarVisible)}} />
      <p>Dates could only be selected in weeks.</p>
      <DateCalendar dateData = {dateData} setdateData = {setdateData} sidebarVisible={sidebarVisible} setSidebarVisible={setSidebarVisible} />
    </div>
  );
}

// export default Sidebar;