/** @format */
import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  TimeScale,
  Tooltip,
  Title,
} from "chart.js";
import {
  CandlestickController,
  CandlestickElement,
} from "chartjs-chart-financial";
import { Chart } from "react-chartjs-2";
import "chartjs-adapter-date-fns";

ChartJS.register(
  CategoryScale,
  LinearScale,
  TimeScale,
  Tooltip,
  Title,
  CandlestickController,
  CandlestickElement
);

const CryptoChart = ({ chartData }) => {
  const options = {
    responsive: true,
    scales: {
      x: {
        type: "time",
        time: {
          unit: "minute",
        },
      },
      y: {
        title: {
          display: true,
          text: "Price",
        },
      },
    },
  };

  const datasetWithColors = {
    ...chartData.datasets[0],
    borderColor: chartData.datasets[0].data.map((candle) =>
      candle.c > candle.o ? "rgba(0, 200, 0, 1)" : "rgba(255, 0, 0, 1)"
    ),
    backgroundColor: chartData.datasets[0].data.map((candle) =>
      candle.c > candle.o ? "rgba(0, 200, 0, 0.5)" : "rgba(255, 0, 0, 0.5)"
    ),
  };

  return (
    <div>
      <Chart
        type="candlestick"
        data={{ ...chartData, datasets: [datasetWithColors] }}
        options={options}
      />
    </div>
  );
};

export default CryptoChart;
