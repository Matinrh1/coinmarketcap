import React from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, LineElement, PointElement, CategoryScale, LinearScale } from "chart.js";

ChartJS.register(LineElement, PointElement, CategoryScale, LinearScale);

const LineChart = ({ sparklineData, isPositive }) => {
  const data = {
    labels: sparklineData.map((_, index) => index), // Generating labels based on array length
    datasets: [
      {
        data: sparklineData,
        borderColor: isPositive ? "green" : "red",
        backgroundColor: "transparent",
        pointRadius: 0, // Hide points
        borderWidth: 1.5,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: { x: { display: false }, y: { display: false } },
    elements: { line: { tension: 0.2 } },
  };

  return <Line data={data} options={options} style={{width:'100px',height:'50px'}}/>;
};

export default LineChart;
