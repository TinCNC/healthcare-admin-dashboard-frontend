import React from "react";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from "recharts";

import "./index.css";

interface DataProps {
  data?: unknown[];
}

export const YourDiseasesStatisticsChart: React.FC<DataProps> = ({ data }) => {
  return (
    <ResponsiveContainer width="85%" height={256}>
      <BarChart
        width={500}
        height={300}
        data={data}
        margin={{
          top: 20,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        {/* <CartesianGrid strokeDasharray="3 3" /> */}
        <XAxis dataKey="name" />
        <YAxis />
        {/* <Tooltip /> */}
        {/* <Legend /> */}
        <Bar dataKey="pv" stackId="a" fill="#8884d8" radius={20} barSize={6} />
        <Bar dataKey="uv" stackId="a" fill="#82ca9d" radius={20} barSize={6} />
        {/* <Bar dataKey="uv" stackId="a" fill="#82ca9d" radius={20} barSize={10} /> */}
      </BarChart>
    </ResponsiveContainer>
  );
};
