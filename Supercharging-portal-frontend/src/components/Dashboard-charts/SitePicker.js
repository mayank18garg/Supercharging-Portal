import React from "react";
import { SelectPicker } from 'rsuite';
// import "rsuite/dist/rsuite.min.css";

export const SitePicker = ({settrt_Id}) => {
    const trtIdList = [1888, 7322, 5434, 1345, 1333];
    const data = trtIdList.map( item => ({label: item, value: item}));
    // return(<ButtonToolbar>
    return(
        <>
            <SelectPicker cleanable={false} label="Site_ID" data={data} defaultValue = {trtIdList[0]} onSelect={ (value) => {settrt_Id(value) } }  />
        </>
    
    );

}