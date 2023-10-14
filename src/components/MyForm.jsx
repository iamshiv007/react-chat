import React, { useState } from "react";
import { socket } from "../socket";

export function MyForm() {
  const [value, setValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  function onSubmit(event) {
    event.preventDefault();
    setIsLoading(true);

    setValue("");
    socket.emit("foo", value, () => {
      setIsLoading(false);
    });
  }
  return (
    <>
      <ul id='messages'></ul>
      <form id='form' onSubmit={onSubmit} action=''>
        <input
          id='input'
          onChange={(e) => setValue(e.target.value)}
          autoComplete='off'
          value={value}
        />
        <button disabled={isLoading}>Send</button>
      </form>
    </>
  );
}
