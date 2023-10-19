/* eslint-disable react/prop-types */
import React, { useEffect, useRef, useState } from "react";
import { socket } from "../socket";
import { Link } from "react-router-dom";

const Chat = ({ user }) => {
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [isConnected, setIsConnected] = useState(false);
  const [receiver, setReceiver] = useState();
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const chatBoxRef = useRef();

  const sendMessage = () => {
    if (!receiver) {
      return alert("Please select a user to start chating");
    }
    setMessages([...messages, { sender: user.userName, receiver, message }]);
    socket.emit("send-message", user.userName, receiver, message, () => {
      setMessage("");
    });
  };

  useEffect(() => {
    // no-op if the socket is already connected
    socket.connect();
    console.log("socket connected");
    return () => {
      socket.disconnect();
      console.log("socket disconnected");
    };
  }, []);

  useEffect(() => {
    function onConnect() {
      setIsConnected(true);
      console.log("connect event");
    }

    function onDisconnect() {
      setIsConnected(false);
    }

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
    };
  }, []);

  useEffect(() => {
    socket.emit("new-online-user", user.userName, (error) => {
      if (error) {
        return alert(error);
      }
    });

    socket.on("get-online-users", (users) => {
      console.log(users);
      setOnlineUsers(users.filter((user0) => user0.userName !== user.userName));
    });

    socket.on("send-message", (sender, message) => {
      setMessages((previous) => [
        ...previous,
        { sender, receiver: user.userName, message },
      ]);
      console.log(sender, message);
    });

    return () => {
      socket.off("get-online-users");
      socket.off("send-message");
      socket.off("new-online-user");
    };
  }, [user]);

  const scrollToBottom = () => {
    if (chatBoxRef.current)
      chatBoxRef.current.scrollTo({
        top: chatBoxRef.current.scrollHeight, // Scroll to the bottom of the page
        behavior: "smooth", // Use smooth scrolling animation
      });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    // Tab has focus
    // const handleFocus = async () => {
    //   socket.emit("new-user-add", user.userName);
    //   socket.on("get-users", (users) => {
    //     setOnlineUsers(users);
    //   });
    // };
    // // Tab closed
    // const handleBlur = () => {
    //   if (user) {
    //     socket.emit("offline");
    //   }
    // };
    // Track if the user changes the tab to determine when they are online
    // window.addEventListener("focus", handleFocus);
    // window.addEventListener("blur", handleBlur);
    // return () => {
    //   window.removeEventListener("focus", handleFocus);
    //   window.removeEventListener("blur", handleBlur);
    // };
  }, [user]);

  return (
    <>
      {/* <!-- component --> */}
      {/* <!-- This is an example component --> */}
      <div className='container mx-auto shadow-lg rounded-lg'>
        {/* <!-- headaer --> */}
        <div className='px-5 py-5 flex justify-between items-center bg-white border-b-2'>
          <div className='font-semibold text-2xl'>GoingChat</div>
          <div className='w-1/2'>
            <input
              type='text'
              name=''
              id=''
              placeholder='search IRL'
              className='rounded-2xl bg-gray-100 py-3 px-5 w-full'
            />
          </div>
          <div className='flex items-center gap-2'>
            <div className='flex flex-col'>
              <p className='text-lg font-semibold'>{user.fullName}</p>
              <div className='text-xs flex items-center gap-1'>
                <p>{isConnected ? "Online" : "Offline"}</p>
                {isConnected ? (
                  <p className='w-2 h-2 bg-green-500 rounded-full' />
                ) : (
                  <p className='w-2 h-2 bg-red-500 rounded-full' />
                )}
              </div>
            </div>
            <Link className="cursor-pointer" to='/profile'>
              <img
                src={`https://api.multiavatar.com/${user.userName}.svg`}
                className='object-cover h-10 w-10 rounded-full'
                alt=''
              />
            </Link>
          </div>
        </div>
        {/* <!-- end header --> */}
        {/* <!-- Chatting --> */}
        <div className='flex flex-row justify-between bg-white'>
          {/* <!-- chat list --> */}
          <div className='flex flex-col w-2/5 border-r-2 overflow-y-auto'>
            {/* <!-- search compt --> */}
            <div className='border-b-2 py-4 px-2'>
              <input
                type='text'
                placeholder='search chatting'
                className='py-2 px-2 border-2 border-gray-200 rounded-2xl w-full'
              />
            </div>
            {/* <!-- end search compt --> */}
            {/* <!-- user list --> */}
            {onlineUsers.length !== 0 ? (
              onlineUsers.map((user) => (
                <div
                  onClick={() => setReceiver(user.userName)}
                  key={user.userName}
                  className='flex flex-row py-4 px-2 justify-center items-center border-b-2 hover:cursor-pointer'
                >
                  <div className='w-1/4'>
                    <img
                      src={`https://api.multiavatar.com/${user.userName}.svg`}
                      className='object-cover h-10 w-10 rounded-full'
                      alt=''
                    />
                  </div>
                  <div className='w-full'>
                    <div className='text-lg font-semibold'>{user.userName}</div>
                    {/* <span className='text-gray-500'>Pick me at 9:00 Am</span> */}
                  </div>
                </div>
              ))
            ) : (
              <p className='py-4 flex justify-center'>Nobody is online</p>
            )}

            {/* <!-- end user list --> */}
          </div>
          {/* <!-- end chat list --> */}
          <div className='w-full flex flex-col'>
            {onlineUsers.find((user) => user.userName === receiver) &&
              receiver && (
                <div className='px-5 py-2 flex items-center gap-2 border-b-2'>
                  <img
                    src={`https://api.multiavatar.com/${receiver}.svg`}
                    className='object-cover h-10 w-10 rounded-full'
                    alt=''
                  />
                  <p className='text-lg font-semibold'>{receiver}</p>
                </div>
              )}
            {/* <!-- message --> */}
            {onlineUsers.find((user) => user.userName === receiver) &&
            receiver ? (
              <div className='w-full h-full px-5 flex flex-col justify-between'>
                <div
                  ref={chatBoxRef}
                  className='h-[55vh] flex flex-col mt-5 overflow-y-scroll'
                >
                  {messages
                    .filter(
                      (message) =>
                        (message.sender === user.userName &&
                          message.receiver === receiver) ||
                        (message.sender === receiver &&
                          message.receiver === user.userName)
                    )
                    .map((message, i) =>
                      message.sender === user.userName ? (
                        <div key={i} className='flex justify-end mb-4'>
                          <div>
                            <div className='mr-2 py-3 px-4 bg-blue-400 rounded-bl-3xl rounded-tl-3xl rounded-tr-xl text-white'>
                              {message.message}
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div key={i} className='flex justify-start mb-4'>
                          <div className='ml-2 py-3 px-4 bg-gray-400 rounded-br-3xl rounded-tr-3xl rounded-tl-xl text-white'>
                            {message.message}
                          </div>
                        </div>
                      )
                    )}
                </div>
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
              </div>
            ) : (
              <p className='h-full text-xl flex justify-center items-center'>
                👈 Select a user to start chatting.
              </p>
            )}
          </div>
          {/* <!-- end message --> */}
          <div className='w-2/5 border-l-2 px-5'>
            <div className='flex flex-col'>
              <div className='font-semibold text-xl py-4'>Public Group</div>
              <img
                src={
                  "https://img.freepik.com/free-photo/friends-looking-each-other-holding-chat-bubble_23-2148342087.jpg?size=626&ext=jpg&ga=GA1.1.1413502914.1697328000&semt=ais"
                }
                className='border object-cover rounded-xl h-64'
                alt=''
              />
              <Link href='/' className='font-semibold py-4'>
                Explore groups
              </Link>
              <div className=''>
                Create a global or public group for asking questions, gaining
                knowledge, and sharing your experiences to help others.
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Chat;
