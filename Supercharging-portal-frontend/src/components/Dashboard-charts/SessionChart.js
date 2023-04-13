import React, { useState, useEffect } from "react";
import { getSessionData } from "../../services/message.service";
import { Bar } from "react-chartjs-2";
import {Chart as ChartJS} from "chart.js/auto";
import { Colors } from "chart.js/auto";
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { CSVLink } from "react-csv";

export const SessionChart = ({dateData, trt_Id}) => {
    // ChartJS.register(Colors);
    const [message, setMessage] = useState([]);

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
            barPercentage: 0.5,
            borderRadius: 5,
            fill: false,
            backgroundColor: "#EC932F",
            borderColor: "#EC932F",
            hoverBackgroundColor: "#EC932F",
            hoverBorderColor: "#EC932F"
        },
        {
            label: "Returning_User", 
            data: message.map((data) => data.returning_user),
            // backgroundColor: "#800517",
            barPercentage: 0.5,
            borderRadius: 5,
            fill: false,
            backgroundColor: "#71B37C",
            borderColor: "#71B37C",
            hoverBackgroundColor: "#71B37C",
            hoverBorderColor: "#71B37C",
        }]
    };

    const options = {
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
                        style: 'normal'
                    }
                    // backdropColor: "white"
                },
                title:{
                    text: 'Start of week',
                    display: true,
                    color: 'black',
                    font:{
                        style: 'normal',
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
                        family: "Helvetica",
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
                    // color: 'yellow'
                }
            }
        },
        layout:{
            padding: 20
        }

    };
    
    if(!message.length) return <></>;
    return <>
            <Bar data={userData} options={options} plugins={[ChartDataLabels]} />
            <CSVLink data={message} style={{color: "black"}}>Download CSV</CSVLink>
        </>;

};