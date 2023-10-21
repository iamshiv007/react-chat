import React, { useEffect, useRef } from "react";
import { useChat } from "../../context/ChatContext";
import { useSelector } from "react-redux";
import InputBox from "./InputBox";
import SelectedUser from "./SelectedUser";

const ChatBox = () => {
  const chatBoxRef = useRef();

  const { receiver, messages } = useChat();
  const { user } = useSelector((state) => state.user);
  const { users } = useSelector((state) => state.users);

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

  return (
    <>
      <div className='w-full flex flex-col'>
        <SelectedUser />
        {users?.find((user) => user.userName === receiver) && receiver ? (
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
            <InputBox />
          </div>
        ) : (
          <p className='h-full text-xl flex justify-center items-center'>
            👈 Select a user to start chatting.
          </p>
        )}
      </div>
    </>
  );
};

export default ChatBox;
