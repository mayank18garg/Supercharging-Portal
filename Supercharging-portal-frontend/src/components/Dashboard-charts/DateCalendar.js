import React from 'react';
import { DateRangePicker, CustomProvider } from 'rsuite';
// import "rsuite/dist/rsuite.min.css";
// import { DateRangePicker } from 'rsuite';
import { addMonths, differenceInMonths } from 'date-fns';
const {allowedMaxDays} = DateRangePicker;

const { startOfWeek, subWeeks } = require('date-fns');
const { zonedTimeToUtc, utcToZonedTime } = require('date-fns-tz');

export const DateCalendar = ({dateData, setdateData, sidebarVisible, setSidebarVisible}) => {
    
    // console.log(dateData.start_date);
    // console.log(dateData.end_date);






    return(
    <CustomProvider theme="lite">
    <div className='field'>
        <DateRangePicker 
        cleanable={false}
        // hoverRange="week"
        ranges={[]}
        placeholder="Select Date Range" 
        onOk={(value) => {setdateData( {start_date: value[0], end_date: value[1]} ); setSidebarVisible(!sidebarVisible) }}
        isoWeek={true}
        // disabledDate={allowedMaxDays(56)}
        defaultValue={[dateData.start_date, dateData.end_date]}
        // style={{fontFamily: "Gotham"}} 
        placement='autoVerticalEnd'
        />
    </div>
    </CustomProvider>
    );
    
}


