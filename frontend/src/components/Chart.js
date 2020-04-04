import React, { useEffect, useState, useRef } from "react";
import { useTheme } from "@material-ui/core/styles";
import io from "socket.io-client";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Label,
  ResponsiveContainer,
  CartesianGrid
} from "recharts";
import Title from "./Title";

// Generate Sales Data
function createData(time, amount) {
  return { time, amount };
}
// const data = [
//   createData('00:00', 0),
//   createData('03:00', 3),
//   createData('06:00', 6),
//   createData('09:00', 8),
//   createData('12:00', 15),
//   createData('15:00', 60),
//   createData('18:00', 80),
//   createData('21:00', 90),
//   createData('24:00', undefined),
// ];

export default function Chart() {
  const [Count, setCount] = useState(0);
  const [chartData, setchartData] = useState([]);

  const ENDPOINT = "localhost";
  useEffect(() => {
    const socket = io(ENDPOINT);
    socket.on("currentCount", ({ currentCount }) => {
      console.log(`currentCount: ${currentCount}`);
      setCount(currentCount);
      setchartData(prevArray => [
        ...prevArray,
        createData(
          `${new Date().getHours()} : ${new Date().getMinutes()}`,
          currentCount
        )
      ]);
      // setchartData([
      //   ...chartData,

      // ]);
    });
    // return () => {
    //   // socket.disconnect();
    //   // socket.off();
    // };
  }, [ENDPOINT]);

  console.log(chartData);
  const theme = useTheme();
  return (
    <React.Fragment>
      <Title>Today</Title>
      <ResponsiveContainer margin={"1em"}>
        <LineChart
          data={chartData}
          margin={{
            top: 16,
            right: 16,
            bottom: 0,
            left: 24
          }}
        >
          <XAxis dataKey="time" stroke={theme.palette.text.secondary}>
            <Label
              // angle={0}
              position="bottom"
              style={{ textAnchor: "middle", fill: theme.palette.text.primary }}
            >
              Vehicle Count
            </Label>
          </XAxis>
          <YAxis stroke={theme.palette.text.secondary}>
            <Label
              angle={270}
              position="left"
              style={{ textAnchor: "middle", fill: theme.palette.text.primary }}
            >
              Vehicle Count
            </Label>
          </YAxis>
          <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
          {/* <Line type="monotone" dataKey="amount" stroke="#82ca9d" /> */}
          <Line
            type="monotone"
            dataKey="amount"
            stroke={theme.palette.primary.main}
            dot={true}
          />
        </LineChart>
      </ResponsiveContainer>
    </React.Fragment>
  );
}
