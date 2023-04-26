import React, { useEffect, useRef, useState } from 'react';
// import './Sidebar.css';
import { DateCalendar } from './DateCalendar';
import { FaTimes, FaBeer, FaTimesCircle, FaWindowClose, FaAngleDoubleLeft, FaAngleDoubleRight } from 'react-icons/fa';
import {CSVLink} from "react-csv";

export const Sidebar = ({sidebarVisible, setSidebarVisible, dateData, setdateData, data1, data2, data3, data4}) => {
  // console.log(data1);
  // const [data, setData] = useState([]);
  const csvLinkRef1 = useRef(null);
  const csvLinkRef2 = useRef(null);
  const csvLinkRef3 = useRef(null);
  const csvLinkRef4 = useRef(null);

  const handleExport = () => {
    csvLinkRef1.current.link.click();
    csvLinkRef2.current.link.click();
    csvLinkRef3.current.link.click();
    csvLinkRef4.current.link.click();
  };

  return (
    <div className={`sidebar ${sidebarVisible ? 'visible' : ''}`}>
      <FaTimes size={25} style={{alignSelf:'end', marginBottom: '60px', marginTop: '20px', marginRight: '10px'}} onClick={() => {setSidebarVisible(!sidebarVisible)}} />
      <p>Dates could only be selected in weeks.</p>
      <DateCalendar dateData = {dateData} setdateData = {setdateData} sidebarVisible={sidebarVisible} setSidebarVisible={setSidebarVisible} />
      
      <button onClick={handleExport} style={{marginTop: '60px'}}>Export Data to CSV</button>
      <CSVLink data={data1} ref={csvLinkRef1} />
      <CSVLink data={data2} ref={csvLinkRef2} />
      <CSVLink data={data3} ref={csvLinkRef3} />
      <CSVLink data={data4} ref={csvLinkRef4} /> 
    </div>
  );
}

// export default Sidebar;