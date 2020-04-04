import React, { Fragment, useState, useEffect } from "react";
import Dashboard from "./components/Dashboard";
import io from "socket.io-client";
import { toast } from "react-toastify";

function createData(time, amount) {
  return { time, amount };
}

toast.configure({
  autoClose: 1000,
  draggable: true
});

function App() {
  const toastClick = () => {
    toast("vehicle entered");
  };
  const [Count, setCount] = useState(0);
  const [chartData, setchartData] = useState([
    createData(`${new Date().getHours()} : ${new Date().getMinutes()}`, 0)
  ]);

  const ENDPOINT = "localhost";
  useEffect(() => {
    const socket = io(ENDPOINT);
    socket.on("currentCount", ({ currentCount }) => {
      // console.log(`currentCount: ${currentCount}`);
      setCount(currentCount);
      setchartData([
        ...chartData,
        createData(
          `${new Date().getHours()} : ${new Date().getMinutes()} : ${new Date().getSeconds()} `,
          Count
        )
      ]);
      toastClick();
    });
    return () => {
      socket.disconnect();
      socket.off();
    };
  }, [ENDPOINT]);
  return (
    <Fragment>
      <Dashboard
        toastClick={toastClick}
        currentCount={Count}
        ChartData={chartData}
      />
    </Fragment>
  );
}

export default App;
