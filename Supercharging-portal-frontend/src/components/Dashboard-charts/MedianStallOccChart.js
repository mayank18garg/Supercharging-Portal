import React, { useState, useEffect } from "react";
import { getMedianStallOccData } from "../../services/message.service";
import { Bar } from "react-chartjs-2";
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
const placeholderData = [
    { stallOccupancy: 0, median: 0, week: '' },
    { stallOccupancy: 0, median: 0, week: '' },
    { stallOccupancy: 0, median: 0, week: '' },
    { stallOccupancy: 0, median: 0, week: '' }
]
export const MedianStallOccChart = ({dateData, trt_Id}) => {
    // ChartJS.register(ChartDataLabels);
    const [message, setMessage] = useState(placeholderData);

    useEffect(() => {
        let isMounted = true;
        const getMessage = async () => {
        const { data, error } = await getMedianStallOccData({dateData, trt_Id});

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
        datasets:[
        {
            label: "Stall Occupancy %", 
            type: "line",
            data: message.map((data) => data.stallOccupancy),
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
                    // family: "Gotham"
                },
                offset: 5,
                // clamp: true
            }
        },
        {
            label: "Median",
            type: "bar",
            data: message.map((data) => data.median),
            barPercentage: 1,
            categoryPercentage: 1,
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
                    // family: "Gotham"
                    // color: 'black'
                },
            },
            order: 2
        }
        ]
    };

    const options = {
        events: [],
        scales: {
            x: {
                title:{
                    text: "Starting date of a week",
                    color: "black",
                    display: true,
                    font:{
                        style: 'normal',
                        size: 14,
                        // family: 'Gotham'
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
                        // family: 'Gotham'
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
                suggestedMax: 80,
            },
            barPercentage: 0.2
        },
        plugins: {
            legend: {
                labels: {
                    font: {
                        // family: "Gotham",
                        size: 16,
                        style: "normal"
                    },
                    // paddingBottom: 5000,
                    color: "black"
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
    return (<div>
            {/* <Line data={userData} options={options} /> */}
            <Bar data={userData} options={options} plugins={[ChartDataLabels,plugin]} />
            <CSVLink className="csv-link" data={message} style={{color: "black"}}>Download CSV</CSVLink>
        </div>);

};