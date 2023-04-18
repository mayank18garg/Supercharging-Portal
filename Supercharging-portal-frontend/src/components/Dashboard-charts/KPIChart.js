import React, { useState, useEffect } from "react";
import { getKPIData } from "../../services/message.service";
import { Bar, Line} from "react-chartjs-2";
import ChartDataLabels from 'chartjs-plugin-datalabels';
import {Chart as ChartJS, scales} from "chart.js/auto";
import {CSVLink} from "react-csv"
const plugin = {
    beforeInit: function (chart) {
      // Get reference to the original fit function
      const originalFit = chart.legend.fit
  
      // Override the fit function
      chart.legend.fit = function fit() {
        // Bind scope in order to use `this` correctly inside it
        originalFit.bind(chart.legend)()
        this.height += 20 // Change the height
      }
    }
  }
export const KPIChart = ({dateData, trt_Id}) => {
    // ChartJS.register(ChartDataLabels);
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
        datasets:[
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
            yAxisID: 'A',
            order:1,
            datalabels:{
                anchor: 'center',
                align: 'top',
                formatter: Math.round,
                color: 'black',
                font: {
                    // weight: 'bold',
                    size: 14,
                },
                offset: 5,
                // clamp: true
            }
        },
        {
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
            yAxisID: 'B',
            datalabels:{
                anchor: 'center',
                // align: 'top',
                color: 'black',
                font: {
                    // weight: 'bold',
                    size: 14,
                    // color: 'black'
                },
            },
            order: 2
        }
        ]
    };

    const options = {
        scales: {
            x: {
                title:{
                    text: "24-hour time",
                    color: "black",
                    display: true,
                    font:{
                        style: 'normal'
                    }
                },
                grid: {
                  offset: true,
                  display: false
                },
                stacked: true,
                ticks:{
                    color: "black",
                    // backdropColor: "white"
                    size: 12,
                    font:{
                        style: 'normal'
                    }
                },
            },
            A: {
                type: 'linear',
                display: false,
                position: 'left',
                stacked: true,
                ticks:{
                    color: "red"
                },
                grid:{
                    display: false
                },
                // grace: '5%'
            },
            B:{
                type: 'linear',
                position: 'right',
                display: false,
                stacked: true,
                grid:{
                    display: false
                },
                suggestedMax: 700,
            }
        },
        plugins: {
            legend: {
                labels: {
                    font: {
                        family: "Monospace",
                        // size: 12
                    },
                    // paddingBottom: 5000,
                    color: "black"
                }
            },
            colors:{
                // faceOverride: true
            }
        },
        layout:{
            padding: 20
        },

    };
    
    if(!message.length) return <></>;
    return (<>
            {/* <Line data={userData} options={options} /> */}
            <Bar data={userData} options={options} plugins={[ChartDataLabels,plugin]} />
            <CSVLink className="csv-link" data={message} style={{color: "black"}}>Download CSV</CSVLink>
        </>);

};