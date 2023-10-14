/* eslint-disable react/prop-types */
import React from "react";

export function Events({ events }) {
  return (
    <ul id='messages'>
      {events.map((event, index) => (
        <li key={index}>{event}</li>
      ))}
    </ul>
  );
}
