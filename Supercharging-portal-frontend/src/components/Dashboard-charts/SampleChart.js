import React from "react";
import { Bar } from "react-chartjs-2";
import {Chart as ChartJS} from "chart.js/auto";
export const SampleChart = () => {
  const data = {
    labels: ["January", "February", "March", "April", "May"],
    datasets: [
      {
        label: "Sales",
        data: [12, 19, 3, 5, 2],
        backgroundColor: "rgba(75,192,192,0.4)",
        borderColor: "rgba(75,192,192,1)",
        borderWidth: 1,
      },
      {
        label: "Expenses",
        data: [5, 6, 7, 8, 9],
        backgroundColor: "rgba(255,99,132,0.4)",
        borderColor: "rgba(255,99,132,1)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
            fontColor: "#9e9e9e",
          },
          gridLines: {
            display: true,
            color: "#9e9e9e",
          },
        },
      ],
      xAxes: [
        {
          ticks: {
            fontColor: "#9e9e9e",
          },
          gridLines: {
            display: false,
          },
        },
      ],
    },
    legend: {
      labels: {
        fontColor: "#9e9e9e",
      },
    },
  };

  return (<Bar data={data} options={options} width={500} height={300} />);
}