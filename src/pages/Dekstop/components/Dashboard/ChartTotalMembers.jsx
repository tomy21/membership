import React from "react";
import Chart from "react-apexcharts";

export default function ChartTotalMembers() {
  const options = {
    chart: {
      type: "area",
      height: 300,
    },
    xaxis: {
      categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"], // Kategori waktu (sumbu X)
    },
    dataLabels: {
      enabled: false, // Nonaktifkan label data pada titik
    },
    stroke: {
      curve: "smooth", // Garis halus
    },
    title: {
      text: "Statistic Membership",
      align: "left",
    },
    colors: ["#1E90FF"], // Warna untuk seri data
  };

  const series = [
    {
      name: "Total Membership", // Nama seri
      data: [10, 40, 35, 50, 80, 100, 90], // Data untuk grafik
    },
  ];
  return (
    <div className="w-[70%] border border-slate-300 rounded-md p-2 max-h-[40vh]">
      <Chart options={options} series={series} type="area" height={400} />
    </div>
  );
}
