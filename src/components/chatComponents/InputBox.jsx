import React, { useState } from "react";
import { useChat } from "../../context/ChatContext";
import { useSelector } from "react-redux";
import { socket } from "../../socket";

const InputBox = () => {
  const [message, setMessage] = useState("");
  const { receiver, setMessages } = useChat();
  const { user } = useSelector((state) => state.user);

  const sendMessage = () => {
    if (!receiver) {
      return alert("Please select a user to start chating");
    }
    setMessages((previous) => [
      ...previous,
      { sender: user.userName, receiver, message },
    ]);
    socket.emit("send-message", user.userName, receiver, message, () => {
      setMessage("");
    });
  };

  return (
    <div className='py-5'>
      <input
        onChange={(e) => setMessage(e.target.value)}
        value={message}
        className='w-full bg-gray-300 py-5 px-3 rounded-xl'
        type='text'
        placeholder='type your message here...'
        onKeyDown={(event) =>
          event.key === "Enter" ? sendMessage(message) : null
        }
      />
      <button onClick={sendMessage}>send</button>
    </div>
  );
};

export default InputBox;
