import { createContext, useContext, useState } from "react";
import PropTypes from "prop-types";
export const ChatContext = createContext();

export const ChatContextProvider = ({ children }) => {
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [messages, setMessages] = useState([]);
  const [isConnected, setIsConnected] = useState(false);
  const [receiver, setReceiver] = useState();

  return (
    <>
      <ChatContext.Provider
        value={{
          messages,
          setMessages,
          onlineUsers,
          setOnlineUsers,
          isConnected,
          setIsConnected,
          receiver,
          setReceiver,
        }}
      >
        {children}
      </ChatContext.Provider>
    </>
  );
};

ChatContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

// eslint-disable-next-line react-refresh/only-export-components
export const useChat = () => useContext(ChatContext);
