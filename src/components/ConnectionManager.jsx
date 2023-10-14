import React from "react";
import { socket } from "../socket";

export function ConnectionManager() {
  function connect() {
    socket.connect();
  }

  function disconnect() {
    socket.disconnect();
  }
  return (
    <>
      <button onClick={connect}>connect</button>
      <button onClick={disconnect}>disconnect</button>
    </>
  );
}
