import React from "react";
import { useChat } from "../../context/ChatContext";

const UserList = () => {
  const { onlineUsers, setReceiver } = useChat();

  return (
    <div className='flex flex-col w-2/5 border-r-2 overflow-y-auto'>
      {onlineUsers?.length !== 0 ? (
        onlineUsers?.map((user) => (
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
    </div>
  );
};

export default UserList;
