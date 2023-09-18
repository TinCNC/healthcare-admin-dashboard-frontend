// import * as React from "react";
// import Paper from "@mui/material/Paper";
// import {
//   Chart,
//   ArgumentAxis,
//   ValueAxis,
//   BarSeries,
// } from "@devexpress/dx-react-chart-material-ui";

// import { scaleBand } from "@devexpress/dx-chart-core";
// import { ArgumentScale, Stack, ValueScale } from "@devexpress/dx-react-chart";

// interface IDataItem {
//   year: string;
//   population: number;
//   population2: number;
// }

// const graphData: IDataItem[] = [
//   { year: "1950", population: 2.525, population2: 2.525 },
//   { year: "1960", population: 3.018, population2: 2.525 },
//   { year: "1970", population: 3.682, population2: 2.525 },
//   { year: "1980", population: 4.44, population2: 2.525 },
//   { year: "1990", population: 5.31, population2: 2.525 },
//   { year: "2000", population: 6.127, population2: 2.525 },
//   { year: "2010", population: 6.93, population2: 2.525 },
// ];

// interface IProps {}

// interface IState {
//   data?: IDataItem[];
// }

// export class Demo extends React.PureComponent<IProps, IState> {
//   constructor(props: IProps) {
//     super(props);

//     this.state = {
//       data: graphData,
//     };
//   }

//   render() {
//     const { data: chartData } = this.state;

//     return (
//       <Paper>
//         <Chart data={chartData}>
//           <ArgumentScale factory={scaleBand} />
//           <ArgumentAxis />
//           <ValueScale name="population" />
//           <ValueScale name="population2" />
//           <ValueAxis
//             scaleName="population"
//             showGrid={false}
//             showLine={true}
//             showTicks={true}
//           />
//           <ValueAxis
//             scaleName="population2"
//             position="right"
//             showGrid={false}
//             showLine={true}
//             showTicks={true}
//           />

//           <BarSeries valueField="young" argumentField="state" name="Young" />
//           <BarSeries valueField="middle" argumentField="state" name="Middle" />
//           <BarSeries valueField="older" argumentField="state" name="Older" />
//           <Stack />
//         </Chart>
//       </Paper>
//     );
//   }
// }

import React from "react";
import {
  BarChart,
  Bar,
  // Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

import "./index.css";

interface IDataItem {
  age: string;
  combined: number;
  female: number;
}

interface ageJSONStatisticsValue {
  combined: number;
  female: number;
}

interface DataProps {
  data?: object;
}

function jsonToGraphArray(json?: Object) {
  console.log(JSON.stringify(json));
  const map = new Map(Object.entries(JSON.parse(JSON.stringify(json))));
  let graphArray = new Array<IDataItem>();
  map.forEach((value, key) => {
    graphArray.push({
      age: key,
      combined: (value as ageJSONStatisticsValue).combined,
      female: (value as ageJSONStatisticsValue).female,
    });
  });
  console.log(map);
  console.log(graphArray);
  return graphArray;
}

export const DiseasesGroupStatistics: React.FC<DataProps> = ({ data }) => {
  return (
    <ResponsiveContainer width="85%" height={400}>
      <BarChart
        data={jsonToGraphArray(data)}
        height={360}
        margin={{
          top: 20,
          right: 30,
          left: 20,
          bottom: 10,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="age" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="combined" fill="#8884d8" />
        <Bar dataKey="female" fill="#82ca9d" />
      </BarChart>
    </ResponsiveContainer>
  );
};
