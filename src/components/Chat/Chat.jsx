import React, { useEffect, useState } from "react";
import queryString from "query-string";
import { io } from "socket.io-client";
import "./Chat.css";
import TextContainer from "../TextContainer/TextContainer";
import Input from "../Input/Input";
import Infobar from "../Infobar/Infobar";
import Messages from "../Messages/Messages";

var connectionOptions = {
  "force new connection": true,
  reconnectionAttempts: 2,
  timeout: 10000,
  transports: ["websocket"],
};

const socket = io.connect(import.meta.env.VITE_BASE_URL, connectionOptions);

const Chat = () => {
  const [name, setName] = useState();
  const [room, setRoom] = useState();
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [typing, setTyping] = useState({});

  useEffect(() => {
    const { name, room } = queryString.parse(location.search);

    setName(name);
    setRoom(room);

    socket.emit("join", { name, room }, (error) => {
      if (error) {
        return error;
      }
    });

    return () => {
      socket.off("join");
    };
  }, []);

  useEffect(() => {
    socket.on("message", (message) => {
      setMessages([...messages, message]);
    });

    socket.on("roomData", ({ users }) => {
      setUsers(users);
    });

    return () => {
      socket.off("message");
      socket.off("roomData");
    };
  }, [messages, users]);

  const sendMessage = (event) => {
    event.preventDefault();
    if (message) {
      socket.emit("sendMessage", message, () => {
        setMessage("");
      });
    }
  };

  useEffect(() => {
    if (message) {
      socket.emit("typing", true, name, room);
    } else {
      socket.emit("typing", false, name, room);
    }

    socket.on("typing", (status, name) => {
      setTyping({ status: status, name });
    });

    return () => {
      socket.off("typing");
    };
  }, [message, name, room]);

  return (
    <div className='outerContainer'>
      <div className='container'>
        <Infobar room={room} />
        <Messages typing={typing} messages={messages} name={name} />
        <Input
          message={message}
          setMessage={setMessage}
          sendMessage={sendMessage}
        />
      </div>
      <TextContainer users={users} />
    </div>
  );
};

export default Chat;
