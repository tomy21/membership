import React from "react";
import Chart from "react-apexcharts";

export default function ChartPie() {
  const options = {
    chart: {
      type: "donut",
    },
    labels: ["Blue", "Green", "Orange", "Red", "Purple"], // Nama kategori
    colors: ["#1E90FF", "#28A745", "#FFC107", "#DC3545", "#6F42C1"], // Warna kategori
    dataLabels: {
      enabled: true,
      formatter: function (val) {
        return `${val.toFixed(1)}%`; // Format label menjadi persen
      },
    },
    legend: {
      position: "bottom",
    },
    title: {
      text: "Donut Chart Example",
      align: "center",
    },
  };

  const series = [25.6, 32.0, 23.8, 9.9, 8.7];
  return (
    <div className=" border border-slate-300 rounded-md p-2 min-h-[40vh] max-h-[40vh] w-[30%]">
      <Chart
        options={options}
        series={series}
        type="donut"
        height={350}
        className="mt-3"
      />
    </div>
  );
}
