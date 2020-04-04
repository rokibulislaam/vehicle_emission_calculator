import React, { useEffect, useState, Fragment, useRef } from "react";
import io from "socket.io-client";

function useTimeout(callback, delay) {
  const savedCallback = useRef();

  // Remember the latest function.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setTimeout(tick, delay);
      return () => clearTimeout(id);
    }
  }, [delay]);
}

export default function SocketCounter() {
  const [count, setCount] = useState(0);
  const [message, setmessage] = useState("");
  const ENDPOINT = "localhost";
  useTimeout(() => {
    const socket = io(ENDPOINT);
    socket.on("currentCount", ({ currentCount }) => {
      console.log(`currentCount: ${currentCount}`);
      setCount(currentCount);
    });
    return () => {
      socket.disconnect();
      socket.off();
    };
  }, [ENDPOINT]);
  return (
    <Fragment>
      <div>
        <p>currentCount is : {count}</p>
      </div>
    </Fragment>
  );
}
