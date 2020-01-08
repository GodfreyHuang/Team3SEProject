import React, { useEffect } from "react";
import { Line } from "react-chartjs-2";
const LineChart = ({ labels, dataset }) => {
  const data = {
    labels: labels || [],
    datasets: dataset
      ? dataset.map(e => {
          return {
            label: e.name,
            fill: false,
            lineTension: 0.1,
            backgroundColor: e.color,
            borderColor: e.color,
            borderCapStyle: "butt",
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: "miter",
            pointBorderColor: e.color,
            pointBackgroundColor: "#fff",
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: e.color,
            pointHoverBorderColor: e.color,
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: e.data
          };
        })
      : []
  };
  return <Line data={data} />;
};

export default LineChart;
