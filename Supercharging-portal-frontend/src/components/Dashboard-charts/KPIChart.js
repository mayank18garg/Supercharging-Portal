import React, { useState, useEffect } from "react";
import { getKPIData } from "../../services/message.service";
import { Bar, Line} from "react-chartjs-2";
import ChartDataLabels from 'chartjs-plugin-datalabels';
import {Chart as ChartJS, scales} from "chart.js/auto";

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

const placeholderData = [
    { cummulative_kwhs: 0, cummulative_sessions: 0, hour: '' },
    { cummulative_kwhs: 0, cummulative_sessions: 0, hour: '' },
    { cummulative_kwhs: 0, cummulative_sessions: 0, hour: '' },
    { cummulative_kwhs: 0, cummulative_sessions: 0, hour: '' }
]

export const KPIChart = ({dateData, trt_Id, data1, setData1}) => {
    // ChartJS.register(ChartDataLabels);
    const [message, setMessage] = useState(placeholderData);

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
            label: "Total Kwhs",
            type: "line",
            data: message.map((data) => data.cummulative_kwhs),
            fill: false,
            borderColor: "#66666A",
            backgroundColor: "#66666A",
            pointBorderColor: "#66666A",
            pointBackgroundColor: "#66666A",
            pointHoverBackgroundColor: "#66666A",
            pointHoverBorderColor: "#66666A",
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
                    family: "Gotham Light"
                },
                offset: 5,
                // clamp: true
            }
        },
        {
            label: "Total Sessions",
            type: "bar",
            data: message.map((data) => data.cummulative_sessions),
            // barPercentage: 0.5,
            borderRadius: 5,
            fill: false,
            backgroundColor: ["#ACACB0", "#E8E8EC"],
            // borderColor: "#71B37C",
            hoverBackgroundColor: ["#ACACB0", "#E8E8EC"],
            // hoverBorderColor: "#71B37C",
            yAxisID: 'B',
            datalabels:{
                anchor: 'center',
                // align: 'top',
                color: 'black',
                font: {
                    // weight: 'bold',
                    size: 14,
                    family: "Gotham Light"
                    // color: 'black'
                },
            },
            order: 2,
            barPercentage: 1.0,
            categoryPercentage: 1.0
        }
        ]
    };

    const options = {
        events: [],
        scales: {
            x: {
                title:{
                    text: "24-hour time",
                    color: "black",
                    display: true,
                    font:{
                        style: 'normal',
                        size: 14,
                        family: 'Gotham Book'
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
                        style: 'normal',
                        size: 12,
                        family: 'Gotham Light'
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
                        family: "Gotham Light",
                        size: 16,
                        style: "normal"
                    },
                    // paddingBottom: 5000,
                    color: "black",
                    margin: 100
                }
            },
            colors:{
                // faceOverride: true
            }
        },
        // layout:{
        //     padding: 20
        // },

    };
    
    if(!message.length) return <></>;
    setData1(message);
    return (<div>
            {/* <Line data={userData} options={options} /> */}
            <Bar data={userData} options={options} plugins={[ChartDataLabels,plugin]} />
            <div className="csv-link" />
        </div>);

};