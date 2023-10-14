/* eslint-disable react/prop-types */
import React from "react";
import Message from "../Message/Message";

const Messages = ({ typing: { status, name: typerName }, messages, name }) => {
  return (
    <div>
      {messages.map((message, i) => (
        <div key={i}>
          <Message message={message} name={name} />
        </div>
      ))}
      {status && <p style={{ color: "white" }}>{typerName} is typing ...✏️</p>}
    </div>
  );
};

export default Messages;
