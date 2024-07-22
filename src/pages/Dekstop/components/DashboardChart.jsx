import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "Jan", memberMobil: 4000, memberMotor: 2400 },
  { name: "Feb", memberMobil: 3000, memberMotor: 1398 },
  { name: "Mar", memberMobil: 2000, memberMotor: 9800 },
  { name: "Apr", memberMobil: 2780, memberMotor: 3908 },
  { name: "May", memberMobil: 1890, memberMotor: 4800 },
  { name: "Jun", memberMobil: 2390, memberMotor: 3800 },
  { name: "Jul", memberMobil: 3490, memberMotor: 4300 },
  { name: "Aug", memberMobil: 4000, memberMotor: 2400 },
  { name: "Sep", memberMobil: 3000, memberMotor: 1398 },
  { name: "Oct", memberMobil: 2000, memberMotor: 9800 },
  { name: "Nov", memberMobil: 2780, memberMotor: 3908 },
  { name: "Dec", memberMobil: 1890, memberMotor: 4800 },
];

const DashboardChart = () => {
  return (
    <div className="p-2 rounded-lg shadow w-full bg-white">
      <h2 className="text-sm text-start font-semibold mb-2">Type Member</h2>
      <ResponsiveContainer
        width="100%"
        height={275}
        className={"text-xs bg-white"}
      >
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="4 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="memberMobil"
            stroke="#8884d8"
            fill="#8884d8"
          />
          <Line
            type="monotone"
            dataKey="memberMotor"
            stroke="#82ca9d"
            fill="#82ca9d"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default DashboardChart;
