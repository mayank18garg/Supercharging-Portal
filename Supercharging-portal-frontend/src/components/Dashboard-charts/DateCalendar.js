import React from 'react';
import { DateRangePicker, CustomProvider } from 'rsuite';
// import "rsuite/dist/rsuite.min.css";

export const DateCalendar = ({dateData, setdateData}) => {

    return(
    <CustomProvider theme="dark">
    <div className='field'>
        <DateRangePicker cleanable={false} defaultValue={[new Date(dateData.start_date), new Date(dateData.end_date)]} hoverRange="week" ranges={[]} placeholder="Select Date Range" onOk={(value) => {setdateData( {start_date: value[0].toISOString().split('T')[0], end_date: value[1].toISOString().split('T')[0]} ) }}  />
    </div>
    </CustomProvider>
    );
    
}


