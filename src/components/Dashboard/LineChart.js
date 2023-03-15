import React from "react";
import { Line } from "react-chartjs-2";

export default function LineChart(chart) {
  const data = {
    labels: [
      "Januari",
      "Februari",
      "Maret",
      "April",
      "Mei",
      "Juni",
      "Juli",
      "Agustus",
      "September",
      "Oktober",
      "November",
      "Desember",
    ],
    datasets: [
      {
        label: "Refund",
        data: chart?.chart?.data.refund,
        fill: false,
        backgroundColor: "rgba(75,192,192,0.2)",
        borderColor: "rgba(75,192,192,1)",
      },
      {
        label: "Target",
        data: chart?.chart?.data.target,
        fill: false,
        backgroundColor: "#742774",
        borderColor: "#742774",
      },
      {
        label: "Income",
        data: chart?.chart?.data.total,
        fill: false,
        backgroundColor: "red",
        borderColor: "red",
      },
    ],
  };
  return (
    <div className="bg-white mt-10 rounded-lg md:p-20 p-5 overflow-scroll">
      <p className="mb-10 md:text-2xl md:font-bold text-xl font-semibold">
        Sales Achievement
      </p>
      <Line data={data} />
    </div>
  );
}
