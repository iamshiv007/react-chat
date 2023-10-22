import React, { useEffect, useRef } from "react";
import { useChat } from "../../context/ChatContext";
import { useSelector } from "react-redux";
import InputBox from "./InputBox";
import SelectedUser from "./SelectedUser";
import Loader from "../../layout/loading/Loader";

const ChatBox = () => {
  const chatBoxRef = useRef();

  const { receiver, messages } = useChat();
  const { user } = useSelector((state) => state.user);
  const { users } = useSelector((state) => state.users);
  const { loading } = useSelector((state) => state.messages);

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
              {loading ? (
                <Loader height={"50vh"} />
              ) : messages.length !== 0 ? (
                messages.map((message, i) => {
                  const originalTimestamp = message.createdAt;
                  const date = new Date(originalTimestamp);

                  const hours = date.getHours();
                  const minutes = date.getMinutes();
                  const period = hours >= 12 ? "PM" : "AM";

                  const formattedHours = hours % 12 || 12; // Convert to 12-hour format

                  const formattedTime = `${formattedHours}:${minutes} ${period}`;
                  return message.sender === user.userName ? (
                    <div key={i} className='flex justify-end mb-4'>
                      <div>
                        <div className='mr-3 py-3 px-4 bg-blue-400 rounded-bl-3xl rounded-tl-3xl rounded-tr-xl text-white'>
                          {message.message}
                        </div>
                        <p className='text-sm text-right mr-3'>
                          {formattedTime}
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div key={i} className='flex justify-start mb-4'>
                      <div>
                        <div className='ml-2 py-3 px-4 bg-gray-400 rounded-br-3xl rounded-tr-3xl rounded-tl-xl text-white'>
                          {message.message}
                        </div>
                        <p className='text-sm ml-2'>{formattedTime}</p>
                      </div>
                    </div>
                  );
                })
              ) : (
                <p className='text-xl h-full flex justify-center items-center'>
                  No Chat history
                </p>
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
