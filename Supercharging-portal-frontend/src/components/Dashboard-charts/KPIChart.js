import React, { useState, useEffect } from "react";
import { getKPIData } from "../../services/message.service";
import { Bar, Line} from "react-chartjs-2";
import {Chart as ChartJS} from "chart.js/auto";

export const KPIChart = ({dateData, trt_Id}) => {

    const [message, setMessage] = useState([]);

    useEffect(() => {
        let isMounted = true;
        const getMessage = async () => {
        const { data, error } = await getKPIData({dateData, trt_Id});

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
        labels: message.map((data) => data.hour),
        datasets:[{
            label: "Total_Sessions",
            type: "bar",
            data: message.map((data) => data.cummulative_sessions),
            // barPercentage: 0.5,
            // borderRadius: 5
            fill: false,
            backgroundColor: "#71B37C",
            borderColor: "#71B37C",
            hoverBackgroundColor: "#71B37C",
            hoverBorderColor: "#71B37C",
        },
        {
            label: "Total_Kwhs", 
            type: "line",
            data: message.map((data) => data.cummulative_kwhs),
            fill: false,
            borderColor: "#EC932F",
            backgroundColor: "#EC932F",
            pointBorderColor: "#EC932F",
            pointBackgroundColor: "#EC932F",
            pointHoverBackgroundColor: "#EC932F",
            pointHoverBorderColor: "#EC932F",
        }]
    };

    const options = {
        scales: {
            x: {
                grid: {
                  offset: true,
                },
                // stacked: true,
                ticks:{
                    color: "White",
                    // backdropColor: "white"
                }
            },
            y: {
                // stacked: true,
                ticks:{
                    color: "White"
                }
            }
        },
        plugins: {
            legend: {
                labels: {
                    font: {
                        family: "Monospace",
                    },
                    color: "white"
                }
            },
            colors:{
                faceOverride: true
            }

        }

    };
    
    if(!message.length) return <></>;
    return (<>
            {/* <Line data={userData} options={options} /> */}
            <Bar data={userData} options={options} />;
        </>);

};