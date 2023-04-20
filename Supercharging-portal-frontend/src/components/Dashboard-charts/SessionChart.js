import React, { useState, useEffect } from "react";
import { getSessionData } from "../../services/message.service";
import { Bar } from "react-chartjs-2";
import {Chart as ChartJS} from "chart.js/auto";
import { Colors } from "chart.js/auto";
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { CSVLink } from "react-csv";

const placeholderData = [
    { new_user: 0, returning_user: 0, week: '' },
    { new_user: 0, returning_user: 0, week: '' },
    { new_user: 0, returning_user: 0, week: '' },
    { new_user: 0, returning_user: 0, week: '' }
]
export const SessionChart = ({dateData, trt_Id}) => {
    // ChartJS.register(Colors);
    const [message, setMessage] = useState(placeholderData);

    useEffect(() => {
        let isMounted = true;
        const getMessage = async () => {
        const { data, error } = await getSessionData({dateData, trt_Id});

        if (!isMounted) {
            return;
        }

        if (data) {
            setMessage(data);
            // setMessage(JSON.stringify(data, null, 2));
        }

        if (error) {
            setMessage(data)
            // setMessage(JSON.stringify(error, null, 2));
        }
        };

        getMessage();

        return () => {
        isMounted = false;
        };
    }, [dateData, trt_Id]);
    
    const userData = {
        labels: message.map((data) => data.week),
        datasets:[{
            label: "New_User",
            data: message.map((data) => data.new_user),
            // backgroundColor: ["#7538EC"],
            barPercentage: 1,
            categoryPercentage: 1,
            borderRadius: 5,
            fill: false,
            backgroundColor: "#E31937",
            borderColor: "#E31937",
            hoverBackgroundColor: "#E31937",
            hoverBorderColor: "#E31937"
        },
        {
            label: "Returning_User", 
            data: message.map((data) => data.returning_user),
            // backgroundColor: "#800517",
            barPercentage: 1,
            categoryPercentage: 1,
            borderRadius: 5,
            fill: false,
            backgroundColor: "#E8E8EC",
            borderColor: "#E8E8EC",
            hoverBackgroundColor: "#E8E8EC",
            hoverBorderColor: "#E8E8EC",
        }]
    };

    const options = {
        events: [],
        scales: {
            x: {
                grid: {
                  offset: true,
                  display: false
                },
                // stacked: true,
                ticks:{
                    color: "black",
                    font:{
                        style: 'normal',
                        size: 12,
                        family: 'Gotham'
                    }
                    // backdropColor: "white"
                },
                title:{
                    text: 'Starting date of a week',
                    display: true,
                    color: 'black',
                    font:{
                        style: 'normal',
                        size: 14,
                        family: 'Gotham'
                    }
                }
            },
            y: {
                // stacked: true,
                ticks:{
                    color: "black"
                },
                grid:{
                    display: false
                },
                display: false
            }
        },
        plugins: {
            legend: {
                labels: {
                    font: {
                        family: "Gotham",
                        size: 16,
                        style: "normal"
                    },
                    color: "black"
                }
            },
            colors:{
                faceOverride: true
            },
            customCanvasBackgroundColor: {
                color: 'lightGreen',
            },
            datalabels:{
                anchor: 'center',
                color: 'black',
                font:{
                    // weight: 'bold',
                    size: 14,
                    family: "Gotham"
                    // color: 'yellow'
                }
            }
        },
        // layout:{
        //     padding: 20
        // }

    };
    
    if(!message.length) return <></>;
    return <div>
            <Bar data={userData} options={options} plugins={[ChartDataLabels]} />
            <CSVLink className="csv-link" data={message} style={{color: "black"}}>Download CSV</CSVLink>
        </div>;

};